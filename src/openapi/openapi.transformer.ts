import { SwaggerDocument } from '@nestjs/swagger/interfaces';

export class OpenAPITransformer {
  createOpenAPIObject(document: SwaggerDocument, host: string) {
    const paths = Object.keys(document.paths).reduce((p, path) => {
      const content = document.paths[path];
      p[path] = this.transformPath(content);
      return p;
    }, {});

    const schemas = Object.keys(document.definitions).reduce((s, name) => {
      s[name] = this.transformDefinition(document.definitions[name]);
      return s;
    }, {});

    const obj: {[key: string]: any} = {
      openapi: '3.0.0',
      info: document.info,
      servers: [{
        url: `{scheme}://${host}${document.basePath || '/'}`,
        variables: {
          scheme: {
            description: 'The scheme for access API',
            enum: document.schemes,
            default: document.schemes[0],
          },
        },
      }],
      paths,
      components: {
        schemas,
      },
    };

    if (document.tags && document.tags.length > 0) {
      obj.tags = document.tags;
    }

    if (document.securityDefinitions) {
      obj.components.securitySchemes = document.securityDefinitions;
    }

    return obj;
  }

  private transformDefinition(definition) {
    const required = Object.keys(definition.properties)
      .filter(property => definition.properties[property].required);
    return {
      required,
      properties: Object.keys(definition.properties).reduce((obj, name) => {
        const value = definition.properties[name];
        delete value.required;

        if ('$ref' in value) {
          obj[name] = {
            $ref: this.transformDefinitionPath(value.$ref),
          };
        } else if (value.type === 'array') {
          const { items } = value;
          if ('$ref' in items) {
            items.$ref = this.transformDefinitionPath(items.$ref);
          }
          obj[name] = {
            items,
            type: 'array',
          };
        } else {
          obj[name] = value;
        }

        return obj;
      }, {}),
    };
  }

  private transformPath(content: { [key: string]: object }): object {
    return Object.keys(content).reduce((obj, method) => {
      obj[method] = this.transformMethod(content[method]);
      return obj;
    }, {});
  }

  private transformMethod(content): object {
    const obj: any = {
      summary: content.summary,
      responses: Object.keys(content.responses).reduce((o, code) => {
        o[code] = this.transformResponse(content.responses[code], content);
        return o;
      }, {}),
    };

    if ('tags' in content && content.tags) {
      obj.tags = content.tags;
    }

    if ('parameters' in content && content.parameters) {
      obj.parameters = content.parameters.filter(p => p.in !== 'body').map(this.transformParameter);
      obj.requestBody = this.transformRequestBody(content.parameters.find(p => p.in === 'body'));

    }

    if ('security' in content) {
      obj.security = content.security;
    }

    return obj;
  }

  private transformResponse(response, method) {
    const obj: any = {
      description: response.description,
    };

    if (response.type) {
      obj.content = {
        [method.produces[0]]: {
          schema: this.transformSchema(response.schema),
        },
      };
    }

    return obj;
  }

  private transformSchema(schema) {
    if (schema.type === 'array') {
      return {
        type: 'array',
        items: {
          $ref: this.transformDefinitionPath(schema.items.$ref),
        },
      };
    } else {
      return {
        $ref: this.transformDefinitionPath(schema.$ref),
      };
    }
  }

  private transformParameter(parameter) {
    return {
      name: parameter.name,
      required: !!parameter.required,
      schema: {
        type: parameter.type,
      },
      in: parameter.in,
    };
  }

  private transformRequestBody(parameter) {
    if (!parameter) {
      return parameter;
    }
    return {
      required: parameter.required,
      content: {
        'application/json': {
          schema: {
            $ref: `#/components/schemas/${parameter.name}`,
          },
        },
      },
    };
  }

  private transformDefinitionPath(ref: string): string {
    return ref.replace('definitions', 'components/schemas');
  }
}
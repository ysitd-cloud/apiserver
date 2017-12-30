import {SwaggerDocument} from '@nestjs/swagger/interfaces';

export default class SwaggerTransformer {
  createSwaggerObject(document: SwaggerDocument, host: string) {
    return {
      swagger: document.swagger,
      info: document.info,
      host,
      basePath: '/',
      schemes: document.schemes,
      securityDefinitions: document.securityDefinitions,
      paths: this.transformPaths(document.paths),
      definitions: this.transformDefinitions(document.definitions),
    };
  }

  private transformDefinitions(definitions) {
    return Object.keys(definitions).reduce((obj, name) => {
      obj[name] = this.transformDefinition(definitions[name]);
      return obj;
    }, {})
  }

  private transformDefinition(definition) {
    const required = Object.keys(definition.properties)
      .filter(property => 'required' in definition.properties[property] && definition.properties[property].required);

    const properties = Object.keys(definition.properties).reduce((obj, name) => {
      const property = definition.properties[name];
      delete property.required;
      obj[name] = property;
      return obj;
    }, {});
    const obj: {[key: string]: any} = {
      properties,
      ...definition,
    };

    if (required.length > 0) {
      obj.required = required;
    }

    return obj;

  }

  private transformPaths(paths) {
    return Object.keys(paths).reduce((obj, key) => {
      obj[key] = this.transformPath(paths[key]);
      return obj;
    }, {})
  }

  private transformPath(path) {
    return Object.keys(path).reduce((obj, method) => {
      obj[method] = this.transformOperation(path[method]);
      return obj;
    }, {});
  }

  private transformOperation(operation) {
    const obj: {[key: string]: any} = {
      summary: operation.summary,
      produces: operation.produces,
      consumes: operation.consumes,
      responses: this.transformResponses(operation.responses),
    };

    if ('tags' in operation) {
      obj.tags = operation.tags;
    }

    if ('parameters' in operation) {
      obj.parameters = operation.parameters;
    }

    if ('security' in operation) {
      obj.security = operation.security;
    }

    return obj;
  }

  private transformResponses(responses) {
    return Object.keys(responses).reduce((obj, status) => {
      obj[status] = this.transformResponse(responses[status]);
      return obj;
    }, {});
  }

  private transformResponse(response) {
    delete response.type;
    delete response.isArray;
    return response;
  }
}
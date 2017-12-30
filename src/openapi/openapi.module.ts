import { INestApplication } from '@nestjs/common';
import { SwaggerDocument } from '@nestjs/swagger/interfaces';
import { Router } from 'express';
import { safeDump } from 'js-yaml';
import { OpenAPITransformer } from './openapi.transformer';
import SwaggerTransformer from './swagger.transformer';
import { jsonFormatter } from '../app/middlewares/json.formatter.middleware';

export class OpenAPIModule {
  static setup(path: string, app: INestApplication, document: SwaggerDocument) {
    const transformer = new OpenAPITransformer();
    const swagger = new SwaggerTransformer();

    const router = Router();
    router.use(jsonFormatter);

    router.get('/', (req, res) => {
      res.json({
        path: [
          '/swagger.json',
          '/swagger.yaml',
          '/openapi.json',
          '/openapi.yaml',
        ].sort().map(path => `/openapi${path}`),
      });
      res.end();
    });

    router.get('/swagger.json', (req, res) => {
      res.json(swagger.createSwaggerObject(document, req.get('Host')));
      res.end();
    });

    router.get('/swagger.yaml', (req, res) => {
      res.contentType('text/yaml');
      const yaml = safeDump(swagger.createSwaggerObject(document, req.get('Host')));
      res.end(yaml);
    });


    router.get('/openapi.json', (req, res) => {
      res.json(transformer.createOpenAPIObject(document, req.get('Host')));
      res.end();
    });

    router.get('/openapi.yaml', (req, res) => {
      res.contentType('text/yaml');
      const yaml = safeDump(transformer.createOpenAPIObject(document, req.get('Host')));
      res.end(yaml);
    });

    app.use(path, router);
  }
}
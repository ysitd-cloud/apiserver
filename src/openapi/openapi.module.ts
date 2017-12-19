import { INestApplication } from '@nestjs/common';
import { SwaggerDocument } from '@nestjs/swagger/interfaces';
import { Router } from 'express';
import { OpenAPITransformer } from './transformer';
import { safeDump } from 'js-yaml';

export class OpenAPIModule {
  static setup(path: string, app: INestApplication, document: SwaggerDocument) {
    const transformer = new OpenAPITransformer();
    const obj = transformer.createObject(document);
    const yaml = safeDump(obj);

    const router = Router();
    router.get('/openapi.json', (req, res) => {
      res.json(obj);
      res.end();
    });

    router.get('/openapi.yaml', (req, res) => {
      res.contentType('text/yaml');
      res.end(yaml);
    });

    app.use(path, router);
  }
}
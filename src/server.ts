import * as dotenv from 'dotenv';

dotenv.config();

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { ApplicationModule } from './app/app.module';
import { OpenAPIModule } from './openapi/openapi.module';

(async () => {
  const options = new DocumentBuilder()
    .setTitle('YSITD Cloud API')
    .setDescription('YSITD Cloud API Document')
    .setVersion('1.0')
    .setSchemes(process.env.NODE_ENV === 'production' ? 'https' : 'http')
    .addBearerAuth()
    .build();

  const e = express();
  e.use(morgan('dev'));
  e.use(helmet());
  e.use(cors());

  const app = await NestFactory.create(ApplicationModule, e);
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);
  OpenAPIModule.setup('/openapi', app, document);

  await app.listen(parseInt(process.env.PORT, 10) || 8080);
})();
import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as express from 'express';

(async () => {
  const options = new DocumentBuilder()
    .setTitle('YSITD Cloud API')
    .setDescription('YSITD Cloud API Document')
    .setVersion('1.0')
    .build();

  const e = express();
  e.use(morgan('dev'));
  e.use(helmet());

  const app = await NestFactory.create(ApplicationModule, e);
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);
  await app.listen(parseInt(process.env.PORT, 10) || 8080);
})();
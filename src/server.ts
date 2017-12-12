import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

(async () => {
  const options = new DocumentBuilder()
    .setTitle('YSITD Cloud API')
    .setDescription('YSITD Cloud API Document')
    .setVersion('1.0')
    .build();
  const app = await NestFactory.create(ApplicationModule);
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/openapi', app, document);
  await app.listen(parseInt(process.env.PORT, 10) || 8080);
})();
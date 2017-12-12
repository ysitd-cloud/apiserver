import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app/app.module';

(async () => {
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(parseInt(process.env.PORT, 10) || 8080);
})();
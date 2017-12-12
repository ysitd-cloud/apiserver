import { Module } from '@nestjs/common';
import { GraphQLModule } from './graphql/graphql.module';
import { AppController } from './app.controller';

@Module({
  modules: [GraphQLModule],
  controllers: [AppController],
})
export class ApplicationModule {}
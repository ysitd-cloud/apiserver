import { MiddlewaresConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { DeployerModule } from './deployer/deployer.module';
import { GraphQLModule } from './graphql/graphql.module';
import {jsonFormatter} from './middlewares/json.formatter.middleware';

@Module({
  modules: [GraphQLModule, DeployerModule],
  controllers: [AppController],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(jsonFormatter).forRoutes(AppController);
  }
}
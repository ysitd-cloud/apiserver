import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DeployerModule } from './deployer/deployer.module';
import { GraphQLModule } from './graphql/graphql.module';

@Module({
  modules: [GraphQLModule, DeployerModule],
  controllers: [AppController],
})
export class ApplicationModule {}
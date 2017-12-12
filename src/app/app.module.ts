import { Module } from '@nestjs/common';
import {GraphQLModule} from './graphql/graphql.module';

@Module({
  modules: [GraphQLModule],
})
export class ApplicationModule {}
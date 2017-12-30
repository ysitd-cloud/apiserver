import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { GraphQLMiddleware } from './graphql.middleware';
import { GraphQLService } from './graphql.service';
import { ResolveModule } from './resolver/resolver.module';
import { TokenMiddleware } from './token.middleware';

@Module({
  modules: [ResolveModule, AccountModule],
  components: [GraphQLService],
})
export class GraphQLModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply([
      TokenMiddleware,
      GraphQLMiddleware,
    ]).forRoutes({
      path: '/graphql',
      method: RequestMethod.ALL,
    });
  }
}

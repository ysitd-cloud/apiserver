import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import {graphiqlExpress} from 'apollo-server-express';
import { GraphQLMiddleware } from './graphql.middleware';
import { GraphQLService } from './graphql.service';
import { ResolveModule } from './resolver/resolver.module';

@Module({
  modules: [ResolveModule],
  components: [GraphQLService],
})
export class GraphQLModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(graphiqlExpress({
      endpointURL: '/graphql',
    }))
      .forRoutes({
        path: '/graphiql',
        method: RequestMethod.ALL,
      });
    consumer.apply(GraphQLMiddleware).forRoutes({
      path: '/graphql',
      method: RequestMethod.ALL,
    });
  }
}

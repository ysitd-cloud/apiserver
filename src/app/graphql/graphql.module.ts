import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { GraphQLFactory } from '@nestjs/graphql';
import { ResolversExplorerService } from '@nestjs/graphql/resolvers-explorer.service';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { AccountModule } from '../account/account.module';
import { ResolveModule } from './resolver/resolver.module';
import { TokenMiddleware } from './token.middleware';

@Module({
  modules: [
    ResolveModule, AccountModule,
  ],
  components: [
    MetadataScanner, ResolversExplorerService, GraphQLFactory,
  ],
})
export class GraphQLModule implements NestModule {
  constructor(private readonly factory: GraphQLFactory) {}

  configure(consumer: MiddlewaresConsumer): void {
    const typeDefs = this.factory.mergeTypesByPaths('./src/**/*.graphql');
    const schema = this.factory.createSchema({ typeDefs });
    if (process.env.NODE_ENV !== 'production') {
      consumer
        .apply(graphiqlExpress({endpointURL: '/graphql'}))
        .forRoutes({path: '/graphiql', method: RequestMethod.GET});
      consumer.apply(graphqlExpress(req => ({ schema, rootValue: req })))
        .forRoutes({
        path: '/graphql',
        method: RequestMethod.ALL,
      });
    } else {
      consumer.apply([
        TokenMiddleware,
        graphqlExpress(req => ({ schema, rootValue: req })),
      ]).forRoutes({
        path: '/graphql',
        method: RequestMethod.ALL,
      });
    }
  }
}

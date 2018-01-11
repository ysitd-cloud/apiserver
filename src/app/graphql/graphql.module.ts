import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { AccountModule } from '../account/account.module';
import { GraphQLFactory } from './graphql.factory';
import { ResolveModule } from './resolver/resolver.module';
import { ResolversExplorerService } from './resolvers-explorer.service';
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
    consumer
      .apply(graphiqlExpress({ endpointURL: '/graphql' }))
      .forRoutes({ path: '/graphiql', method: RequestMethod.GET });
    consumer.apply([
      // TokenMiddleware,
      // GraphQLMiddleware,
      graphqlExpress(req => ({ schema, rootValue: req })),
    ]).forRoutes({
      path: '/graphql',
      method: RequestMethod.ALL,
    });
  }
}

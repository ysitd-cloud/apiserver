import { ExpressMiddleware, Middleware, NestMiddleware } from '@nestjs/common';
import { graphqlExpress } from 'apollo-server-express';
import { IS_PRODUCTION } from '../constants';
import { GraphQLService } from './graphql.service';

@Middleware()
export class GraphQLMiddleware implements NestMiddleware {
  constructor(private readonly service: GraphQLService) {}

  resolve(...args: any[]): ExpressMiddleware {
    const schema = this.service.getSchema();
    return graphqlExpress((req) => ({
      schema,
      debug: IS_PRODUCTION,
    }));
  }
}

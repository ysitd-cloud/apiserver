import { Query, Resolver } from '@nestjs/graphql';

@Resolver('Query')
export class QueryResolver {
  @Query()
  ping(): string {
    return 'pong';
  }
}
import { Query, Resolver } from '@nestjs/graphql';
import { AccountService } from '../../account/account.service';
import { User } from '../../account/interfaces';

@Resolver('Query')
export class QueryResolver {
  @Query()
  ping(): string {
    return 'pong';
  }
}
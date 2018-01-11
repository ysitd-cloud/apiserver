import { Query, Resolver } from '@nestjs/graphql';
import { AccountService } from '../../account/account.service';
import { User } from '../../account/interfaces';

@Resolver('Query')
export class QueryResolver {
  constructor(private readonly service: AccountService) {}

  @Query('user')
  getUser(_, { username }: { username: string}): Promise<User> {
     return this.service.getUserInfo(username);
  }

  @Query()
  ping(): string {
    return 'pong';
  }
}
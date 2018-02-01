import { Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { DeployerService } from '../deployer/deployer.service';
import { UserApp } from '../deployer/interfaces';
import { ResolverBase } from '../foundation/resolver.base';
import { AccountService } from './account.service';
import { User } from './interfaces';

@Resolver('User')
export class UserResolver extends ResolverBase {
  constructor(private readonly deployer: DeployerService, private readonly service: AccountService) {
    super();
  }

  @Query('user')
  user(_, { username }: { username: string}): Promise<User> {
    return this.wrap(this.service.getUserInfo(username));
  }

  @ResolveProperty()
  apps({ username }: { username: string }): Promise<UserApp[]> {
    return this.wrap(this.deployer.getAppByUser(username));
  }
}

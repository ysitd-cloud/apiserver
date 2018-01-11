import {Query, ResolveProperty, Resolver} from '@nestjs/graphql';
import { DeployerService } from '../deployer/deployer.service';
import { UserApp } from '../deployer/interfaces';
import {AccountService} from './account.service';
import {User} from './interfaces';

@Resolver('User')
export class UserResolver {
  constructor(private readonly deployer: DeployerService, private readonly service: AccountService) {}

  @Query('user')
  user(_, { username }: { username: string}): Promise<User> {
    return this.service.getUserInfo(username);
  }

  @ResolveProperty()
  apps({ username }: { username: string }): Promise<UserApp[]> {
    return this.deployer.getAppByUser(username);
  }
}

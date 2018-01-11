import { ResolveProperty, Resolver} from '@nestjs/graphql';
import { DeployerService } from '../deployer/deployer.service';
import { UserApp } from '../deployer/interfaces';

@Resolver('User')
export class UserResolver {
  constructor(private readonly deployer: DeployerService) {}

  @ResolveProperty()
  apps({ username }: { username: string }): Promise<UserApp[]> {
    return this.deployer.getAppByUser(username);
  }
}

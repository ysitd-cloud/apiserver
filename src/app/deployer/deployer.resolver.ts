import { Query, Resolver } from '@nestjs/graphql';
import { DeployerService } from './deployer.service';
import { UserApp } from './interfaces';

@Resolver('App')
export class DeployerResolver {
  constructor(private readonly service: DeployerService) {}

  @Query('app')
  async app(_, { id }: { id: string }): Promise<UserApp> {
    return this.service.getAppByID(id);
  }
}
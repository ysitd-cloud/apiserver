import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { ResolverBase } from '../foundation/resolver.base';
import { DeployerService } from './deployer.service';
import { Deployment, UserApp } from './interfaces';

@Resolver('App')
export class DeployerResolver extends ResolverBase {
  constructor(private readonly service: DeployerService) {
    super();
  }

  @Query('app')
  app(_, { id }: { id: string }): Promise<UserApp> {
    return this.wrap(this.service.getAppByID(id));
  }

  @Mutation()
  createApp(_, { app }: { app: UserApp }): Promise<boolean> {
    return this.wrap(this.service.createApplication(app));
  }

  @Mutation()
  updateImage(_, { id, deployment }: { id: string, deployment: Deployment }): Promise<boolean> {
    return this.wrap(this.service.updateDeploymentImage(id, deployment));
  }
}
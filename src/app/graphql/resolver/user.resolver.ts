import { Component } from '@nestjs/common';
import { IResolverObject } from 'graphql-tools/dist/Interfaces';
import { DeployerService } from '../../deployer/deployer.service';
import { UserApp } from '../../deployer/interfaces';
import { RootResolver } from './interfaces';

@Component()
export class UserResolver implements RootResolver {
  constructor(private readonly deployer: DeployerService) {}

  apps({ username }: { username: string }): Promise<UserApp[]> {
    return this.deployer.getAppByUser(username);
  }

  getResolver(): IResolverObject {
    return {
      apps: this.apps.bind(this),
    };
  }
}

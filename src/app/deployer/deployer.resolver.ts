import { Mutation, Query, Resolver} from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { DeployerService } from './deployer.service';
import { UserApp } from './interfaces';

@Resolver('App')
export class DeployerResolver {
  constructor(private readonly service: DeployerService) {}

  @Query('app')
  app(_, { id }: { id: string }): Observable<UserApp> {
    return this.service.getAppByID(id);
  }

  @Mutation()
  async createApp(_, { app }: { app: UserApp }): Promise<boolean> {
    return this.service.createApplication(app);
  }
}
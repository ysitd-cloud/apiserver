import { Mutation, Query, Resolver} from '@nestjs/graphql';
import { Observable } from 'rxjs/Observable';
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
  createApp(_, { app }: { app: UserApp }): Observable<boolean> {
    return this.service.createApplication(app);
  }
}
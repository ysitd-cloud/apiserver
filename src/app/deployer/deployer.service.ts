import { Component } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../foundation/config/config.service';
import { HttpService } from '../foundation/http/http.service';
import { RestServiceBase } from '../foundation/rest.service.base';
import { Environment, UserApp } from './interfaces';

@Component()
export class DeployerService extends RestServiceBase {
  constructor(
    config: ConfigService,
    http: HttpService,
  ) {
    super(config, http, 'deployer.endpoint', '/api/v1');
  }

  static fixApplication(app): UserApp {
    return {
      ...app,
      environment: DeployerService.fixEnvironment(app.environment),
    } as UserApp;
  }

  static fixEnvironment(environment: {[key: string]: string}): Environment {
    return Object.keys(environment).map(key => ({
      key,
      value: environment[key],
    }));
  }

  createApplication(app: UserApp): Observable<boolean> {
    return this.http.request$({
      baseURL: this.getBasePath(),
      method: 'post',
      url: '/application',
      data: app,
    })
      .map(resp => resp.data.success);
  }

  getAppByUser(user: string): Observable<UserApp[]> {
    return this.http.request$({
      method: 'get',
      baseURL: this.getBasePath(),
      url: `/user/${user}/application`,
    })
      .map(resp => resp.data.map(DeployerService.fixApplication));
  }

  getAppByID(id: string): Observable<UserApp> {
    return this.http.request$({
      method: 'get',
      baseURL: this.getBasePath(),
      url: `/application/${id}`,
    })
      .map(resp => DeployerService.fixApplication(resp.data));
  }
}
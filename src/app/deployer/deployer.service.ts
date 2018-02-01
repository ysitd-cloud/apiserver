import { Component } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '../foundation/config/config.service';
import { HttpService } from '../foundation/http/http.service';
import { Environment, UserApp } from './interfaces';

function fixEnvironment(environment: {[key: string]: string}): Environment {
  return Object.keys(environment).map(key => ({
    key,
    value: environment[key],
  }));
}

function fixApplication(app): UserApp {
  return {
    ...app,
    environment: fixEnvironment(app.environment),
  } as UserApp;
}

@Component()
export class DeployerService {
  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpService,
  ) {}

  createApplication(app: UserApp): Observable<boolean> {
    return this.http.request$({
      baseURL: this.getEndpoint(),
      method: 'post',
      url: '/application',
      data: app,
    })
      .map(resp => resp.data.success);
  }

  getAppByUser(user: string): Observable<UserApp[]> {
    return this.http.request$({
      method: 'get',
      baseURL: this.getEndpoint(),
      url: `/user/${user}/application`,
    })
      .map(resp => resp.data.map(fixApplication));
  }

  getAppByID(id: string): Observable<UserApp> {
    return this.http.request$({
      method: 'get',
      baseURL: this.getEndpoint(),
      url: `/application/${id}`,
    })
      .map(resp => fixApplication(resp.data));
  }

  private getEndpoint() {
    const endpoint = this.config.get('deployer.endpoint');
    return `${endpoint}/api/v1`;
  }
}
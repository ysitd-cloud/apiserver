import { Component } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '../config/config.service';
import {Environment, EnvironmentParameter, UserApp} from './interfaces';

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

function convertToRpcEnvironment(env: Environment) {
  return env.reduce((obj, e) => {
    obj[e.key] = e.value;
    return obj;
  }, {});
}

function convertToRpcApplication(app: UserApp) {
  return {
    ...app,
    environment: convertToRpcEnvironment(app.environment),
  };
}

@Component()
export class DeployerService {
  private instance: AxiosInstance;

  constructor(private readonly config: ConfigService) {}

  async createApplication(app: UserApp): Promise<boolean> {
    const resp = await this.getInstance().post('/application', convertToRpcApplication(app));
    return resp.data.success;
  }

  async getAppByUser(user: string): Promise<UserApp[]> {
    const resp = await this.getInstance().get(`/user/${user}/application`); ``;
    return resp.data.map(fixApplication) as UserApp[];
  }

  async getAppByID(id: string): Promise<UserApp> {
    const resp = await this.getInstance().get(`/application/${id}`);
    return fixApplication(resp.data);
  }

  private getInstance(): AxiosInstance {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: this.getEndpoint(),
        validateStatus(status) {
          return status >= 200 && status < 600;
        },
      });
    }

    return this.instance;
  }

  private getEndpoint() {
    const endpoint = this.config.get('deployer.endpoint');
    return `${endpoint}/api/v1`;
  }
}
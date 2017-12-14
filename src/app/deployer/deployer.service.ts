import { Component } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '../config/config.service';
import { Environment, UserApp } from './interfaces';

function fixEnvironment(environment: {[key: string]: string}): Environment {
  return Object.keys(environment).map(key => ({
    key,
    value: environment[key],
  }));
}

@Component()
export class DeployerService {
  constructor(private readonly config: ConfigService) {}

  async getAppByUser(user: string): Promise<UserApp[]> {
    const resp = await axios.get(`${this.getEndpoint()}/user/${user}/application`);
    return resp.data.map(app => ({...app, environment: fixEnvironment(app.environment)})) as UserApp[];
  }

  private getEndpoint() {
    const endpoint = this.config.get('deployer.endpoint');
    return `${endpoint}/api/v1`;
  }
}
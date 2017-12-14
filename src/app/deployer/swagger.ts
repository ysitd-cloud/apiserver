import { ApiModelProperty} from '@nestjs/swagger';
import {
  Deployment as IDeployment,
  Environment,
  EnvironmentParameter as IEnvironmentParameter,
  Network as INetwork,
  UserApp,
} from './interfaces';

class Deployment implements IDeployment {
  @ApiModelProperty({ required: true, description: 'Name of Docker Image' })
  readonly image: string;

  @ApiModelProperty({ required: true, description: 'Tag of Docker Image' })
  readonly tag: string;
}

class Network implements INetwork {
  @ApiModelProperty({required: true, description: 'Domain for exposing to internet'})
  readonly domain: string;
}

class EnvironmentParameter implements IEnvironmentParameter {
  @ApiModelProperty({required: true, description: 'Domain for exposing to internet'})
  readonly key: string;

  @ApiModelProperty({required: true, description: 'Domain for exposing to internet'})
  readonly value: string;
}

export class Application implements UserApp {
  @ApiModelProperty()
  readonly id: string;

  @ApiModelProperty({ required: true, description: 'Owner of application' })
  readonly owner: string;

  @ApiModelProperty({ required: true, description: 'Display for user to remember' })
  readonly name: string;

  @ApiModelProperty({ required: true })
  deployment: Deployment;

  @ApiModelProperty({ required: true, isArray: true, type: EnvironmentParameter })
  environment: Environment;

  @ApiModelProperty({ required: true, description: 'Network Configuration of Application' })
  network: Network;
}

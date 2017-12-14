export interface UserApp {
  id: string;
  owner: string;
  name: string;
  deployment: Deployment;
  environment: Environment;
  network: Network;
}

export interface Deployment {
  image: string;
  tag: string;
}

export interface EnvironmentParameter {
  key: string;
  value: string;
}

export type Environment = EnvironmentParameter[];

export interface Network {
  domain: string;
}
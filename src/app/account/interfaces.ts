import { Moment } from 'moment';

export interface User {
  username: string;
  displayName: string;
  email: string;
  avatarUrl: string;
}

export interface Service {
  id: string;
}

export interface Token {
  issuer: User;
  audience: Service;
  expire: Moment;
  scopes: string[];
}
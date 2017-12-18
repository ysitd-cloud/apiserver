import {
  User as IUSer,
} from './interfaces';

export class User implements IUSer {
  username: string;
  displayName: string;
  email: string;
  avatarUrl: string;
}
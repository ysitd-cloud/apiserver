import { Component } from '@nestjs/common';
import { IResolverObject } from 'graphql-tools/dist/Interfaces';
import { AccountService } from '../../account/account.service';
import { User } from '../../account/interfaces';
import { RootResolver } from './interfaces';

@Component()
export class QueryResolver implements RootResolver {

  constructor(private readonly service: AccountService) {}

  getResolver(): IResolverObject  {
    return {
      user: this.user.bind(this),
      ping: this.ping.bind(this),
    };
  }

  user(_, { username }: { username: string }): Promise<User> {
    return this.service.getUserInfo(username);
  }

  ping(): string {
    return 'pong';
  }
}
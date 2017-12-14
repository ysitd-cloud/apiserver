import { Component } from '@nestjs/common';
import { IResolverObject } from 'graphql-tools/dist/Interfaces';
import { RootResolver } from './interfaces';

@Component()
export class QueryResolver implements RootResolver {

  getResolver(): IResolverObject  {
    return {
      user: this.user.bind(this),
      ping: this.ping.bind(this),
    };
  }

  user(_, { username }: { username: string }): object {
    return { username };
  }

  ping(): string {
    return 'pong';
  }
}
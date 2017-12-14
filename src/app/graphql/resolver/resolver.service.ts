import { Component } from '@nestjs/common';
import { IResolvers } from 'graphql-tools/dist/Interfaces';
import { QueryResolver } from './query.resolver';
import { UserResolver } from './user.resolver';

@Component()
export class ResolverService {
  constructor(
    private readonly query: QueryResolver,
    private readonly user: UserResolver,
  ) {}

  getResolver(): IResolvers {
    return {
      Query: this.query.getResolver(),
      User: this.user.getResolver(),
    };
  }
}
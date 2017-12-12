import { Component } from '@nestjs/common';
import * as fs from 'fs';
import {GraphQLSchema} from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { ResolverService } from './resolver/resolver.service';

@Component()
export class GraphQLService {
  constructor(private readonly resolver: ResolverService) {}

  getSchema(): GraphQLSchema {
    const typeDefs = this.getTypeDefs();
    const resolvers = this.resolver.getResolver();

    return makeExecutableSchema({
      typeDefs,
      resolvers,
      allowUndefinedInResolve: false,
    });
  }

  private getTypeDefs(): string {
    return fs.readFileSync(`${__dirname}/graphql.graphqls`, 'utf8');
  }
}
import { Component } from '@nestjs/common';
import * as fs from 'fs';
import * as glob from 'glob';
import { makeExecutableSchema } from 'graphql-tools';
import {
  IExecutableSchemaDefinition,
  MergeInfo,
} from 'graphql-tools/dist/Interfaces';
import { groupBy, mapValues } from 'lodash';
import { mergeTypes } from 'merge-graphql-schemas';
import { ResolversExplorerService } from './resolvers-explorer.service';

@Component()
export class GraphQLFactory {
  constructor(
    private readonly resolversExplorerService: ResolversExplorerService,
  ) {}

  createSchema(
    schemaDefintion: IExecutableSchemaDefinition = { typeDefs: {} },
  ) {
    return makeExecutableSchema({
      ...schemaDefintion,
      resolvers: this.resolversExplorerService.explore(),
    });
  }

  createDelegates(): (mergeInfo: MergeInfo) => any {
    return this.resolversExplorerService.exploreDelegates();
  }

  mergeTypesByPaths(...pathsToTypes: string[]): string {
    return mergeTypes(
      ...pathsToTypes.map(pattern => this.loadFiles(pattern)),
    );
  }

  private loadFiles(pattern: string): any[] {
    const paths = glob.sync(pattern);
    return paths.map(path => fs.readFileSync(path, 'utf8'));
  }
}
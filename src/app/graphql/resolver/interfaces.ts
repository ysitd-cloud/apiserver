import { GraphQLScalarType } from 'graphql';
import { IEnumResolver, IResolverObject } from 'graphql-tools/dist/Interfaces';

export interface RootResolver {
  getResolver(): (() => any) | IResolverObject | GraphQLScalarType | IEnumResolver;
}

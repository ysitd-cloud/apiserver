import { Component } from '@nestjs/common';
import { IResolverObject, IResolvers } from 'graphql-tools/dist/Interfaces';

@Component()
export class ResolverService {
    getResolver(): IResolvers {
        return {
            Query: this.getQueryResolver(),
        };
    }

    private getQueryResolver(): IResolverObject {
        return {
            ping() { return 'pong'; },
        };
    }
}
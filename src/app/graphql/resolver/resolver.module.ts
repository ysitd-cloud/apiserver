import { Module } from '@nestjs/common';
import { ResolverService } from './resolver.service';

@Module({
    components: [ResolverService],
    exports: [ResolverService],
})
export class ResolveModule {}

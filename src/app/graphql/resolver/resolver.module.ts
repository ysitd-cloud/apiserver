import { Module } from '@nestjs/common';
import { QueryResolver } from './query.resolver';

@Module({
  components: [QueryResolver],
})
export class ResolveModule {}

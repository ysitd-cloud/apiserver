import { Module } from '@nestjs/common';
import { AccountModule } from '../../account/account.module';
import { QueryResolver } from './query.resolver';

@Module({
  components: [QueryResolver],
})
export class ResolveModule {}

import { Module } from '@nestjs/common';
import { AccountModule } from '../../account/account.module';
import { QueryResolver } from './query.resolver';

@Module({
  modules: [AccountModule],
  components: [QueryResolver],
})
export class ResolveModule {}

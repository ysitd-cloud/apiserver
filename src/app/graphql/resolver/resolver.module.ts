import { Module } from '@nestjs/common';
import { AccountModule } from '../../account/account.module';
import { DeployerModule } from '../../deployer/deployer.module';
import { QueryResolver } from './query.resolver';

@Module({
  modules: [DeployerModule, AccountModule],
  components: [QueryResolver],
})
export class ResolveModule {}

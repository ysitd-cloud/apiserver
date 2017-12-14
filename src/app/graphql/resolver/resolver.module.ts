import { Module } from '@nestjs/common';
import { DeployerModule } from '../../deployer/deployer.module';
import { QueryResolver } from './query.resolver';
import { ResolverService } from './resolver.service';
import { UserResolver } from './user.resolver';

@Module({
  modules: [DeployerModule],
  components: [ResolverService, QueryResolver, UserResolver],
  exports: [ResolverService],
})
export class ResolveModule {}

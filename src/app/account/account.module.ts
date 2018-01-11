import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { DeployerModule } from '../deployer/deployer.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { UserResolver } from './user.resolver';

@Module({
  modules: [ConfigModule, DeployerModule],
  components: [AccountService, UserResolver],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule {}
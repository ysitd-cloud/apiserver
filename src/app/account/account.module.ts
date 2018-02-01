import { Module, forwardRef } from '@nestjs/common';
import { DeployerModule } from '../deployer/deployer.module';
import { ConfigModule } from '../foundation/config/config.module';
import { HttpModule } from '../foundation/http/http.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { UserResolver } from './user.resolver';

@Module({
  modules: [ConfigModule, forwardRef(() => DeployerModule), HttpModule],
  components: [AccountService, UserResolver],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule {}
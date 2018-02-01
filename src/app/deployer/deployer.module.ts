import { Module, forwardRef } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { ConfigModule } from '../foundation/config/config.module';
import { HttpModule } from '../foundation/http/http.module';
import { DeployerController } from './deployer.controller';
import { DeployerResolver } from './deployer.resolver';
import { DeployerService } from './deployer.service';

@Module({
  modules: [ConfigModule, HttpModule, forwardRef(() => AccountModule)],
  components: [DeployerService, DeployerResolver],
  controllers: [DeployerController],
  exports: [DeployerService],
})
export class DeployerModule {}
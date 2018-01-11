import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { DeployerController } from './deployer.controller';
import { DeployerResolver } from './deployer.resolver';
import { DeployerService } from './deployer.service';

@Module({
  modules: [ConfigModule],
  components: [DeployerService, DeployerResolver],
  controllers: [DeployerController],
  exports: [DeployerService],
})
export class DeployerModule {}
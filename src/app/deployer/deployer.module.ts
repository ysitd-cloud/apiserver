import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { DeployerController } from './deployer.controller';
import { DeployerService } from './deployer.service';

@Module({
  modules: [ConfigModule],
  components: [DeployerService],
  controllers: [DeployerController],
  exports: [DeployerService],
})
export class DeployerModule {}
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigService } from './config.service';
import init from './init';

@Module({
  components: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule implements OnModuleInit {
  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    init(this.config);
  }
}

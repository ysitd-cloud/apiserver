import { Module } from '@nestjs/common';
import { ClientFactory } from './client.factory';
import { HttpService } from './http.service';

@Module({
  components: [HttpService, ClientFactory],
  exports: [HttpService],
})
export class HttpModule {}

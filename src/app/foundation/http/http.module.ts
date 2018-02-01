import { Module } from '@nestjs/common';
import { HttpService } from './http.service';

@Module({
  components: [HttpService],
  exports: [HttpService],
})
export class HttpModule {}

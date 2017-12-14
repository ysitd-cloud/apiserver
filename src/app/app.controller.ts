import { Controller, Get, Res } from '@nestjs/common';
import { ApiOperation, ApiProduces, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {

  @Get('ping')
  @ApiOperation({
    title: 'Ping',
  })
  @ApiProduces('text/plain')
  @ApiResponse({ status: 200, description: 'API Server can be connect' })
  ping(@Res() res) {
    res.contentType('text/plain');
    res.end('pong');
  }
}
import { Controller, Get, Res } from '@nestjs/common';
import { ApiModelProperty, ApiOperation, ApiProduces, ApiResponse } from '@nestjs/swagger';

class Endpoint {
  @ApiModelProperty({ required: true, type: String, isArray: true, description: 'List of API endpoint'})
  readonly path: string[];
}

@Controller()
export class AppController {

  @Get('/')
  @ApiOperation({
    title: 'List API endpoint',
  })
  @ApiResponse({ status: 200, description: 'Getting List of API endpoint', type: Endpoint })
  getPath(): { path: string[] } {
    return {
      path: [
        '/ping',

        '/graphql',
        '/swagger',

        '/app',
      ].sort(),
    };
  }

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
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { DeployerService } from './deployer.service';
import { UserApp } from './interfaces';
import { Application } from './swagger';

@ApiUseTags('apps')
@Controller('apps')
export class DeployerController {
  constructor(private readonly service: DeployerService) {}

  @Get('user/:user')
  @ApiOperation({
    title: 'Get app by username',
  })
  @ApiResponse({ status: 200, description: 'Get list of application', isArray: true, type: Application })
  async getApplications(@Param('user') username: string): Promise<UserApp[]> {
    return this.service.getAppByUser(username);
  }
}

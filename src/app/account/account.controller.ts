import { Controller, Get, Param, Response } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { DeployerService } from '../deployer/deployer.service';
import { UserApp } from '../deployer/interfaces';
import { Application } from '../deployer/swagger';
import { AccountService } from './account.service';
import { User } from './swagger';

@ApiUseTags('apps')
@Controller('user')
export class AccountController {
  constructor(
    private readonly service: AccountService,
    private readonly deployer: DeployerService,
  ) {}

  @Get(':username')
  @ApiOperation({
    title: 'Get user information',
  })
  @ApiResponse({ status: 200, description: 'Get user information', type: User })
  @ApiResponse({ status: 404, description: 'User not exists' })
  async getUserInfo(@Param('username') username: string, @Response() resp) {
    const user = await this.service.getUserInfo(username);
    if (user !== null) {
      resp.json(user);
    } else {
      resp.status(404);
    }
    resp.end();
  }

  @Get(':username/app')
  @ApiOperation({
    title: 'Get app by username',
  })
  @ApiResponse({ status: 200, description: 'Get list of application', isArray: true, type: Application })
  async getApplications(@Param('username') username: string): Promise<UserApp[]> {
    return this.deployer.getAppByUser(username);
  }
}
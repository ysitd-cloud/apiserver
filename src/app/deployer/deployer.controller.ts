import { BadGatewayException, Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UsePipes } from '@nestjs/common';
import { ApiImplicitBody, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { DeployerService } from './deployer.service';
import { UserApp } from './interfaces';
import { Application } from './swagger';
import { ValidatePipe } from './validate.pipe';

@ApiUseTags('app')
@Controller('app')
export class DeployerController {
  constructor(private readonly service: DeployerService) {}

  @Get(':app')
  @ApiOperation({
    title: 'Get Application By ID',
  })
  @ApiResponse({ status: 200, description: 'Successful get application', type: Application })
  async getAppByID(@Param('app') app: string): Promise<UserApp> {
    return this.service.getAppByID(app);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UsePipes(new ValidatePipe())
  @ApiOperation({
    title: 'Create Application',
  })
  @ApiResponse({
    status: 201,
    description: 'Successful create application',
  })
  async createApp(@Body() app: Application) {
    if (!this.service.createApplication(app)) {
      throw new BadGatewayException('Fail to create');
    }
  }

}

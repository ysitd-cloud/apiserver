import { Body, Controller, Get, HttpStatus, Param, Post, Res, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
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
  getAppByID(@Param('app') app: string): Observable<UserApp> {
    return this.service.getAppByID(app);
  }

  @Post()
  @UsePipes(new ValidatePipe())
  @ApiOperation({
    title: 'Create Application',
  })
  @ApiResponse({
    status: 201,
    description: 'Successful create application',
  })
  createApp(@Body() app: Application, @Res() res): Observable<any> {
    return this.service.createApplication(app)
      .map(result => {
        if (!result) {
          res.status(HttpStatus.BAD_GATEWAY);
        } else {
          res.status(HttpStatus.CREATED);
        }
        return Observable.of(null);
      });
  }

}

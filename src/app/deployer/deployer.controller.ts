import { Body, Controller, Get, HttpStatus, Param, Post, Put, Res, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TokenGuard } from '../account/token.guard';
import { DeployerService } from './deployer.service';
import { Deployment, UserApp } from './interfaces';
import { Application } from './swagger';
import { ValidatePipe } from './validate.pipe';

@ApiUseTags('app')
@ApiBearerAuth()
@Controller('app')
@UseGuards(TokenGuard)
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

  @Put(':app/image')
  @UsePipes(new ValidatePipe())
  @ApiOperation({
    title: 'Update Application Image',
  })
  @ApiResponse({
    status: 200,
    description: 'Successful change the image',
  })
  updateImage(
    @Param('app') id: string,
    @Body() deployment: Deployment,
    @Res() res,
  ): Observable<boolean> {
    return this.service.updateDeploymentImage(id, deployment)
      .map(result => res.status(result ? HttpStatus.OK : HttpStatus.BAD_GATEWAY));
  }

}

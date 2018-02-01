import { Controller, Get, NotFoundException, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { DeployerService } from '../deployer/deployer.service';
import { UserApp } from '../deployer/interfaces';
import { Application } from '../deployer/swagger';
import { AccountService } from './account.service';
import { User } from './swagger';
import { TokenGuard } from './token.guard';

@ApiUseTags('user')
@ApiBearerAuth()
@Controller('user')
// @UseGuards(TokenGuard)
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
  getUserInfo(@Param('username') username: string): Observable<User | ErrorObservable> {
    return this.service.getUserInfo(username)
      .map((user) => {
        if (user !== null) {
          return user;
        } else {
          return Observable.throw(new NotFoundException());
        }
      });
  }

  @Get(':username/app')
  @ApiOperation({
    title: 'Get app by username',
  })
  @ApiResponse({ status: 200, description: 'Get list of application', isArray: true, type: Application })
  getApplications(@Param('username') username: string): Observable<UserApp[]> {
    return this.deployer.getAppByUser(username);
  }
}
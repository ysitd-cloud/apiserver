import { ApiModelProperty } from '@nestjs/swagger';
import { Moment } from 'moment';
import {
  Service as IService,
  Token as IToken,
  User as IUSer,
} from './interfaces';

export class User implements IUSer {
  @ApiModelProperty({ required: true, description: 'Username' })
  username: string;

  @ApiModelProperty({ required: true, description: 'Display name of user' })
  displayName: string;

  @ApiModelProperty({ required: true, description: 'Email of user' })
  email: string;

  @ApiModelProperty({ required: false, description: 'Url for user avatar' })
  avatarUrl: string;
}

export class Service implements IService {
  id: string;
}

export class Token implements IToken {
  issuer: User;
  audience: Service;
  expire: Moment;
  scopes: string[];
}
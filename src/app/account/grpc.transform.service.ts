import { Component } from '@nestjs/common';
import * as moment from 'moment';
import { Service as GrpcService, Token as GrpcToken, User as GrpcUser } from 'ysitd-cloud-interfaces/account/models/types_pb';
import { Service as IService, Token as IToken, User as IUser } from './interfaces';
import { Service, Token, User } from './swagger';

@Component()
export class GrpcTransformService {
  decodeService(input: GrpcService): IService {
    const service = new Service();
    service.id = input.getId();
    return service;
  }

  decodeToken(input: GrpcToken): IToken {
    const token = new Token();
    token.issuer = this.decodeUser(input.getIssuer());
    token.audience = this.decodeService(input.getAudience());
    if (input.hasExpire()) {
      const timestamp = input.getExpire();
      token.expire = moment(timestamp.getSeconds() * 1000 + timestamp.getNanos());
    } else {
      token.expire = null;
    }
    token.scopes = input.getScopesList();
    return token;
  }

  decodeUser(input: GrpcUser): IUser {
    const user = new User();
    user.username = input.getUsername();
    user.displayName = input.getDisplayName();
    user.email = input.getEmail();
    user.avatarUrl = input.getAvatarUrl();
    return user;
  }
}
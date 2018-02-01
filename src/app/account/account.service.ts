import { Component } from '@nestjs/common';
import axios from 'axios';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { ConfigService } from '../foundation/config/config.service';
import { HttpService } from '../foundation/http/http.service';
import { RestServiceBase } from '../foundation/rest.service.base';
import { Token as IToken, User as IUser } from './interfaces';

@Component()
export class AccountService extends RestServiceBase {
  constructor(
    config: ConfigService,
    http: HttpService,
  ) {
    super(config, http, 'account.endpoint', '');
  }

  getUserInfo(username: string): Observable<IUser | null> {
    return this.http.request$({
      method: 'get',
      baseURL: this.getBasePath(),
      url: `/user/${username}`,
    })
      .map(resp => resp.data)
      .map((data) => {
        if (!data.exists) {
          return null;
        }

        const { user } = data;

        return {
          username: user.username,
          displayName: user.display_name,
          email: user.email,
          avatarUrl: user.avatar_url,
        };
      });
  }

  getTokenInfo(code: string): Observable<IToken | null> {
    return this.http.request$({
      method: 'get',
      baseURL: this.getBasePath(),
      url: `/token/${code}`,
    })
      .take(1)
      .map(resp => resp.data)
      .map((data) => {
        if (!data.exists) {
          return null;
        }

        const { token } = data;
        if ('expire' in token && token.expire) {
          const timestamp = token.expire;
          token.expire = moment(timestamp.seconds * 1000 + timestamp.nanos);
        }

        return token as IToken;
      });
  }
}

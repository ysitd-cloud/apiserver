import { Component } from '@nestjs/common';
import axios from 'axios';
import * as moment from 'moment';
import { ConfigService } from '../config/config.service';
import { Token as IToken, User as IUser } from './interfaces';

@Component()
export class AccountService {
  constructor(private readonly config: ConfigService) {}

  async getUserInfo(username: string): Promise<IUser | null> {
    const { data } = await axios.get(`http://${this.getHostname()}/user/${username}`);
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
  }

  async getTokenInfo(code: string): Promise<IToken | null> {
    const { data } = await axios.get(`http://${this.getHostname()}/token/${code}`);
    if (!data.exists) {
      return null;
    }

    const { token } = data;
    if ('expire' in token && token.expire) {
        const timestamp = token.expire;
        token.expire = moment(timestamp.seconds * 1000 + timestamp.nanos);
    }

    return token as IToken;
  }

  private getHostname(): string {
      return this.config.get('account.endpoint');
  }
}

import { Component } from '@nestjs/common';
import * as fs from 'fs';
import { credentials } from 'grpc';
import { GetUserInfoReply, GetUserInfoRequest } from 'ysitd-cloud-interfaces/account/actions/account_pb';
import { AccountClient } from 'ysitd-cloud-interfaces/account/grpc_grpc_pb';
import { ConfigService } from '../config/config.service';
import { User as IUser } from './interfaces';
import { User } from './swagger';

@Component()
export class AccountService {
  private client: AccountClient = null;

  constructor(private readonly config: ConfigService) {}

  async getUserInfo(username: string): Promise<IUser> {
    const client = this.getClient();
    const req = new GetUserInfoRequest();
    req.setUsername(username);
    return new Promise<IUser>((resolve, reject) => {
      client.getUserInfo(req, (e: Error | null, reply: GetUserInfoReply) => {
        if (e) {
          reject(e);
        } else {
          if (!reply.getExists()) {
            resolve(null);
          } else {
            const u = reply.getUser();
            const user = new User();
            user.username = u.getUsername();
            user.displayName = u.getDisplayName();
            user.email = u.getEmail();
            user.avatarUrl = u.getAvatarUrl();
            resolve(user);
          }
        }
      });
    });
  }

  private getClient(): AccountClient {
    if (this.client === null) {
      this.createClient();
    }

    return this.client;
  }

  private createClient() {
    const cert = fs.readFileSync(this.config.get('account.ca'));
    const cred = credentials.createSsl(cert);
    this.client = new AccountClient(this.config.get('account.endpoint'), credentials.createInsecure());
  }
}

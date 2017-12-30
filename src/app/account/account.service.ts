import { Component } from '@nestjs/common';
import { credentials } from 'grpc';
import {
  GetTokenInfoReply,
  GetTokenInfoRequest,
  GetUserInfoReply,
  GetUserInfoRequest,
} from 'ysitd-cloud-interfaces/account/actions/account_pb';
import { AccountClient } from 'ysitd-cloud-interfaces/account/grpc_grpc_pb';
import { ConfigService } from '../config/config.service';
import { GrpcTransformService } from './grpc.transform.service';
import { Token as IToken, User as IUser } from './interfaces';

@Component()
export class AccountService {
  constructor(private readonly config: ConfigService, private readonly transform: GrpcTransformService) {}

  async getUserInfo(username: string): Promise<IUser | null> {
    const client = this.getClient();
    const req = new GetUserInfoRequest();
    req.setUsername(username);
    return new Promise<IUser>((resolve, reject) => {
      client.getUserInfo(req, (e: Error | null, reply: GetUserInfoReply) => {
        client.close();
        if (e) {
          reject(e);
        } else {
          if (!reply.getExists()) {
            resolve(null);
          } else {
            resolve(this.transform.decodeUser(reply.getUser()));
          }
        }
      });
    });
  }

  async getTokenInfo(token: string): Promise<IToken | null> {
    const client = this.getClient();
    const req = new GetTokenInfoRequest();
    req.setToken(token);
    return new Promise<IToken>((resolve, reject) => {
      client.getTokenInfo(req, (e: Error | null, reply: GetTokenInfoReply) => {
        client.close();
        if (e) {
          reject(e);
          return;
        } else if (!reply.getExists()) {
          resolve(null);
        }

        resolve(this.transform.decodeToken(reply.getToken()));
      });
    });
  }

  private getClient(): AccountClient {
    return new AccountClient(this.config.get('account.endpoint'), credentials.createInsecure());
  }
}

import { CanActivate, ExecutionContext, Guard } from '@nestjs/common';
import { Request } from 'express';
import moment = require('moment');
import {AccountService} from './account.service';

@Guard()
export class TokenGuard implements CanActivate {
  constructor(private readonly service: AccountService) {}

  async canActivate(req: Request, context: ExecutionContext): Promise<boolean> {
    const header = req.get('Authorization');
    if (!header) {
      return false;
    }
    const [type, token] = header.split(' ', 2);
    if (type.toLowerCase() !== 'bearer') {
      return false;
    }

    const info = await this.service.getTokenInfo(token);
    if (info !== null && (moment().isBefore(info.expire))) {
      return true;
    }

    return false;
  }
}
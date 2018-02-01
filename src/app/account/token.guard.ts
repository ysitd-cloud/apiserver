import { CanActivate, ExecutionContext, Guard } from '@nestjs/common';
import { Request } from 'express';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';

@Guard()
export class TokenGuard implements CanActivate {
  constructor(private readonly service: AccountService) {}

  canActivate(req: Request, context: ExecutionContext): boolean | Observable<boolean> {
    const header = req.get('Authorization');
    if (!header) {
      return false;
    }
    const [type, token] = header.split(' ', 2);
    if (type.toLowerCase() !== 'bearer') {
      return false;
    }

    return this.service.getTokenInfo(token)
      .take(1)
      .map((info) => {
        if (info !== null && (moment().isBefore(info.expire))) {
          (req as any).token = info;
          return true;
        }

        return false;
      });
  }
}
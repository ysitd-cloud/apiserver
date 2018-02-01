import { ExpressMiddleware, Middleware, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import * as moment from 'moment';
import { AccountService } from '../account/account.service';

@Middleware()
export class TokenMiddleware implements NestMiddleware {
  constructor(private readonly service: AccountService) {}

  resolve(): ExpressMiddleware {
    return (req, res, next) => {
      const header = req.get('Authorization');
      if (!header) {
        next(new UnauthorizedException());
        return;
      }
      const [type, token] = header.split(' ', 2);
      if (type.toLowerCase() !== 'bearer') {
        next(new UnauthorizedException());
        return;
      }

      this.service.getTokenInfo(token)
        .take(1)
        .map(info => info !== null && (moment().isBefore(info.expire)))
        .map(result => result ? next() : next(new UnauthorizedException()));
    };
  }
}
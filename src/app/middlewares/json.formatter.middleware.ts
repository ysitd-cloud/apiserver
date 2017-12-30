import { Request, Response, NextFunction } from 'express';

export function jsonFormatter(req: Request, res: Response, next: NextFunction) {
  res.json = function (body) {
    if (!res.get('Content-Type')) {
      res.set('Content-Type', 'application/json');
    }
    res.send(JSON.stringify(body, null, 2));
    return res;
  };
  next();
}
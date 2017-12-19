import { createRouteParamDecorator } from '@nestjs/common';

export const Token = createRouteParamDecorator((data, req) => {
  return req.token;
});
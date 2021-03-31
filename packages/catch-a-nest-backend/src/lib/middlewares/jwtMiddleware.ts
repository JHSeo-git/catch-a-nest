import { Middleware } from 'koa';
import { decodeToken } from '../token/jwt';

const jwtMiddleware: Middleware = async (ctx, next) => {
  const accessToken = ctx.cookies.get('access_token');
  if (!accessToken) {
    ctx.user = null;
    return next();
  }
  try {
    const decoded = await decodeToken<UserTokenDecoded>(accessToken);
    ctx.user = {
      id: decoded.userId,
      exp: decoded.exp,
    };
  } catch (e) {
    ctx.user = null;
  }
  return next();
};

export default jwtMiddleware;

type UserTokenDecoded = {
  subject: string;
  userId: number;
  iat: number;
  exp: number;
};

declare module 'koa' {
  interface BaseContext {
    user: null | { id: number; exp: number };
  }
}

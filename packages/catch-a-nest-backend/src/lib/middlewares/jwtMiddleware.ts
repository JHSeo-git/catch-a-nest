import { Middleware } from 'koa';
import { decodeToken } from '../token/jwt';

const jwtMiddleware: Middleware = async (ctx, next) => {
  const accessToken = ctx.cookies.get('access_token');
  if (!accessToken) {
    ctx.user = null;
    return next();
  }
  try {
    // TODO: 남은 기간 보고 적게 남은 User면 re generateToken 해서 넘겨주자
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

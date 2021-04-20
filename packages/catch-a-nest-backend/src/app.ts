import Koa, { Middleware } from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import router from './router';
import jwtMiddleware from './lib/middlewares/jwtMiddleware';
import addIPAddress from './lib/middlewares/addIPAddress';
import healthCheck from './lib/middlewares/healthCheck';

const app = new Koa();

const validHosts = ['localhost:3000', 'catch-a-nest.vercel.app'];
const corsOptions: cors.Options = {
  origin: (ctx) => {
    const headerOrigin = ctx.header.origin;
    if (!headerOrigin) {
      return ctx.throw('Not valid origin');
    }
    const host = headerOrigin.split('://')[1];
    if (!validHosts.includes(host)) return ctx.throw('Not valid origin');

    return headerOrigin;
  },
  credentials: true,
};

app.proxy = true;
app.use(logger());
app.use(cors(corsOptions));
app.use(bodyParser());
app.use(addIPAddress);
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());
app.use(healthCheck);

export default app;

import Koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import router from './router';
import jwtMiddleware from './lib/middlewares/jwtMiddleware';
import addIPAddress from './lib/middlewares/addIPAddress';
import healthCheck from './lib/middlewares/healthCheck';

const app = new Koa();

app.proxy = true;
app.use(logger());
app.use(bodyParser());
app.use(addIPAddress);
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());
app.use(healthCheck);

export default app;

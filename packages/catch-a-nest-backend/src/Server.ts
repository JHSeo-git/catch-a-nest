import Koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import router from './router';

const PORT = parseInt(process.env.PORT!, 10);

export default class Server {
  app: Koa<Koa.DefaultState, Koa.DefaultContext>;

  constructor() {
    this.app = new Koa();
    this.middleware();
  }

  middleware() {
    this.app.use(logger());
    this.app.use(bodyParser());
    this.app.use(router.routes()).use(router.allowedMethods());
  }

  start() {
    this.app.listen(PORT, () => {
      console.log('✅ Server is listening to port ' + PORT);
    });
  }
}

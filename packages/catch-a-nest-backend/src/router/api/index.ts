import Router from '@koa/router';
import auth from './auth';
import me from './me';
import posts from './posts';

const api = new Router();

api.get('/', (ctx) => {
  ctx.body = 'api index';
});
api.use('/posts', posts.routes());
api.use('/auth', auth.routes());
api.use('/me', me.routes());

export default api;

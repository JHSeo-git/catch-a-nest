import Router from '@koa/router';
import checkAuth from '@src/lib/middlewares/checkAuth';
import * as postCtrl from './posts.torm.ctrl';

const posts = new Router();

posts.get('/', (ctx) => {
  ctx.body = 'posts index';
});
// TODO: add userCheck middleware
posts.post('/save', checkAuth, postCtrl.savePost);

export default posts;

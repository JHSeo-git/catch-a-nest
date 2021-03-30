import Router from '@koa/router';
import * as postCtrl from './posts.torm.ctrl';

const posts = new Router();

posts.get('/', (ctx) => {
  ctx.body = 'posts index';
});
// TODO: add userCheck middleware
posts.post('/', postCtrl.savePost);

export default posts;

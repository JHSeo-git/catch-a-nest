import Router from '@koa/router';

const posts = new Router();

posts.get('/', (ctx) => {
  ctx.body = 'posts index';
});

export default posts;

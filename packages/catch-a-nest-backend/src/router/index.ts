import Router from '@koa/router';
import posts from './api/posts';

const router = new Router();

router.get('/', (ctx) => {
  ctx.body = 'index';
});
router.use('/posts', posts.routes());

export default router;

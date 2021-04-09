import Router from '@koa/router';
import checkAuth from '@src/lib/middlewares/checkAuth';
import * as postCtrl from './posts.torm.ctrl';

const posts = new Router();

posts.get('/', postCtrl.getPosts);
posts.get('/:slug', postCtrl.getPostBySlug);
posts.put('/:slug', postCtrl.updatePost);
posts.post('/new', checkAuth, postCtrl.saveNewPost);

export default posts;

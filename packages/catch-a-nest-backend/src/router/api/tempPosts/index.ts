import Router from '@koa/router';
import checkAuth from '@src/lib/middlewares/checkAuth';
import * as tempPostsCtrl from './tempPosts.torm.ctrl';

const tempPosts = new Router();

tempPosts.get('/', checkAuth, tempPostsCtrl.getTempPosts);

export default tempPosts;

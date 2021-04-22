import Router from '@koa/router';
import checkAuth from '@src/lib/middlewares/checkAuth';
import * as tempPostsCtrl from './tempPosts.torm.ctrl';

const tempPosts = new Router();

tempPosts.get('/', checkAuth, tempPostsCtrl.getTempPosts);
tempPosts.get('/:slug', checkAuth, tempPostsCtrl.getLastTempPost);
tempPosts.put('/save', checkAuth, tempPostsCtrl.saveTempPost);

export default tempPosts;

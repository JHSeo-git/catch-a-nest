import Router from '@koa/router';
import checkAuth from '@src/lib/middlewares/checkAuth';
import * as uploadCtrl from './upload.torm.ctrl';

const upload = new Router();

upload.post('/image', checkAuth, uploadCtrl.upload);

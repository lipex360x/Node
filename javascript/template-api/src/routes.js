import { Router } from 'express';

import multer from 'multer';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

import HelloController from './app/controllers/HelloController';
import FileController from './app/controllers/FileController';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MailHelloController from './app/controllers/MailHelloController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', HelloController.index);

routes.get('/sendmail', MailHelloController.index);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/user/update', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;

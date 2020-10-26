import { Router } from 'express';
import { createUserController } from './services/CreateUser';

const router = Router();

router.post('/', (request, response) => {
  return createUserController.execute(request, response);
});

export { router };

import { Router } from 'express';

import { createUserController } from '../services/CreateUser';
import { deleteUserController } from '../services/DeleteUser';

const router = Router();

router.post('/', (request, response) => {
  return createUserController.execute(request, response);
});

router.delete('/', (request, response) => {
  return deleteUserController.execute(request, response);
});

export default router;

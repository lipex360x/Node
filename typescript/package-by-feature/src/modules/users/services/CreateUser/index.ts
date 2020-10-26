import CreateUserController from './CreateUserController';
import CreateUserService from './CreateUserService';
import LocalUsersRepository from '../../repositories/implementations/LocalUsersRepository';

const localUsersRepository = new LocalUsersRepository();
const createUserService = new CreateUserService(localUsersRepository);
const createUserController = new CreateUserController(createUserService);

export { createUserController };

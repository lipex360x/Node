import DeleteUserController from './DeleteUserController';
import DeleteUserService from './DeleteUserService';
import LocalUsersRepository from '../../repositories/implementations/LocalUsersRepository';

const localUsersRepository = new LocalUsersRepository();
const deleteUserService = new DeleteUserService(localUsersRepository);
const deleteUserController = new DeleteUserController(deleteUserService);

export { deleteUserController };

import { MailTrapMailProvider } from '../../providers/MailProviders/implementations/MailTrapMailProvider';
import { DBUsersRepository } from '../../repositories/implementations/DBUsersRepository';
import { CreateUserService } from './CreateUserService';
import { CreateUserController } from './CreateUserController';

const mailTrapMailProvider = new MailTrapMailProvider();
const dbUserRepository = new DBUsersRepository();

const createUserService = new CreateUserService(
  dbUserRepository,
  mailTrapMailProvider,
);

const createUserController = new CreateUserController(createUserService);

export { createUserService, createUserController };

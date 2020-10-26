import CreateUserController from './CreateUserController'
import CreateUserService from './CreateUserService'
import ArrayUsersRepository from '@modules/User/repositories/implementations/ArrayUsersRepository'

import MailTrap from '@shared/providers/MailProviders/implementations/MailTrap'

const arrayUsersRepository = new ArrayUsersRepository()
const mailTrap = new MailTrap()
const createUserService = new CreateUserService(arrayUsersRepository, mailTrap)
const createUserController = new CreateUserController(createUserService)

export default createUserController

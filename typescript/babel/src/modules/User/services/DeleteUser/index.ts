import DeleteUserService from './DeleteUserService'
import DeleteUserController from './DeleteUserController'
import ArrayUsersRepository from '@modules/User/repositories/implementations/ArrayUsersRepository'

const arrayUsersRepository = new ArrayUsersRepository()
const deleteUserService = new DeleteUserService(arrayUsersRepository)
const deleteUserController = new DeleteUserController(deleteUserService)

export default deleteUserController

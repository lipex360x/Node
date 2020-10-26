import FakeUsersRepository from '@modules/User/repositories/fakes/FakeUsersRepository'
import MailTrap from '@shared/providers/MailProviders/implementations/MailTrap'
import CreateUserService from '../CreateUser/CreateUserService'

import DeleteUserService from './DeleteUserService'

let fakeUsersRepository: FakeUsersRepository
let mailTrap: MailTrap
let createUserService: CreateUserService

let deleteUserService: DeleteUserService

describe('DeleteUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    mailTrap = new MailTrap()
    createUserService = new CreateUserService(fakeUsersRepository, mailTrap)
    deleteUserService = new DeleteUserService(fakeUsersRepository)
  })

  it('should able to delete a user', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456'
    })

    const deleteUser = await deleteUserService.execute({
      email: 'john@mail.com'
    })

    expect(deleteUser.status).toEqual(-1)
  })
})

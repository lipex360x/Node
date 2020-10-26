import FakeUsersRepository from '@modules/User/repositories/fakes/FakeUsersRepository'
import MailTrap from '@shared/providers/MailProviders/implementations/MailTrap'

import CreateUserService from './CreateUserService'

let fakeUsersRepository: FakeUsersRepository
let mailTrap: MailTrap
let createUserService: CreateUserService

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    mailTrap = new MailTrap()
    createUserService = new CreateUserService(fakeUsersRepository, mailTrap)
  })

  it('should able to create a new user', async () => {
    const newUser = await createUserService.execute({
      name: 'Jonh Doe',
      email: 'mail@mail.com',
      password: '123456'
    })

    expect(newUser).toHaveProperty('id')
  })
})

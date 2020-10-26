import User from '@modules/User/entities/User'
import IUsersRepository from '@modules/User/repositories/IUsersRepository'
import ICreateUserDTO from './CreateUserDTO'

import IMailProviders from '@shared/providers/MailProviders/IMailProviders'

export default class CreateUserService {
  constructor (
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProviders
  ) {}

  async execute ({ name, email, password }:ICreateUserDTO): Promise<User> {
    const getUser = await this.usersRepository.findOne({ email })

    if (getUser) throw new Error('User already exists')

    const newUser = new User({ name, email, password })
    await this.usersRepository.create({ user: newUser })

    this.mailProvider.sendMail({
      to: { name, email },
      from: { name: 'Equipe App', email: 'equipeapp@gmail.com' },
      subject: 'Bem vindo ao App',
      body: '<p>Faça login para ver tudo por dentro</p>'
    })

    return newUser
  }
}

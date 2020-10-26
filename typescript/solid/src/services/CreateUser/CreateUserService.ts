import IUsersRepository from '../../repositories/models/IUsersRepository';
import IMailProvider from '../../providers/MailProviders/IMailProvider';
import { ICreateUserDTO } from './ICreateUserDTO';
import { User } from '../../entities/User';

export class CreateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const getUser = this.usersRepository.findByEmail({ email });

    if (getUser) {
      throw new Error('User Exists');
    }

    const user = new User({ name, email, password });

    await this.usersRepository.save({ user });

    this.mailProvider.sendMail({
      to: { name, email },
      from: { name: 'Equipe App', email: 'equipeapp@gmail.com' },
      subject: 'Bem vindo ao App',
      body: '<p>Faça login para ver tudo por dentro</p>',
    });

    return user;
  }
}

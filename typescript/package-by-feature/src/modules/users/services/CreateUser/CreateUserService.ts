import IUsersRepository from '../../repositories/models/IUsersRepository';
import ICreateUserDTO from './ICreateUserDTO';
import User from '../../entities/User';
import logger from '../../../../utils/logger';

export default class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User | undefined> {
    const getUser = await this.usersRepository.findByEmail({ email });

    logger.log('teste');

    if (getUser) {
      throw new Error('User already exists');
    }

    const newUser = new User({ name, email, password });
    await this.usersRepository.save({ user: newUser });

    return newUser;
  }
}

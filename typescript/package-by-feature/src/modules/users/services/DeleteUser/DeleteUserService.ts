import IUsersRepository from 'modules/users/repositories/models/IUsersRepository';
import User from 'modules/users/entities/User';

interface IDeleteUserProps {
  email: string;
}

export default class DeleteUserService {
  constructor(private userRepository: IUsersRepository) {}

  async execute({ email }: IDeleteUserProps): Promise<User> {
    const getUser = await this.userRepository.findByEmail({ email });

    if (!getUser) {
      throw new Error('User does not exists');
    }

    getUser.status = 0;

    const deleteUser = await this.userRepository.delete({ user: getUser });

    return deleteUser;
  }
}

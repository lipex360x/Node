import IUsersRepository, {
  IFindByEmailProps,
  ISaveProps,
} from '../models/IUsersRepository';
import { User } from '../../entities/User';

export class DBUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findByEmail({ email }: IFindByEmailProps): Promise<User> {
    const getUser = this.users.find((user) => user.email === email);

    return getUser;
  }

  async save({ user }: ISaveProps): Promise<void> {
    this.users.push(user);
  }
}

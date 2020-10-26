import IUsersRepository, {
  IFindByEmailProps,
  ISaveProps,
  IDeleteProps,
} from '../models/IUsersRepository';
import User from '../../entities/User';

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findByEmail({ email }: IFindByEmailProps): Promise<User | undefined> {
    const getUser = this.users.find((user) => user.email === email);
    return getUser;
  }

  async save({ user }: ISaveProps): Promise<void> {
    this.users.push(user);
  }

  async delete({ user }: IDeleteProps): Promise<User> {
    const getIndex = this.users.findIndex((getUser) => user.id === getUser.id);
    const deleteUser = this.users[getIndex];

    this.users.splice(getIndex, 1);

    this.users.push(deleteUser);

    return deleteUser;
  }
}

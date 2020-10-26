import { User } from '../../entities/User';

export interface ISaveProps {
  user: User;
}

export interface IFindByEmailProps {
  email: string;
}

export default interface IUsersRepository {
  findByEmail(data: IFindByEmailProps): Promise<User | undefined>;
  save(data: ISaveProps): Promise<void>;
}

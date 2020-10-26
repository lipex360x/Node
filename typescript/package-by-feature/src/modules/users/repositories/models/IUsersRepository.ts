import User from '../../entities/User';

export interface IFindByEmailProps {
  email: string;
}

export interface ISaveProps {
  user: User;
}

export interface IDeleteProps {
  user: User;
}

export default interface IUsersRepository {
  findByEmail(props: IFindByEmailProps): Promise<User | undefined>;
  save(props: ISaveProps): Promise<void>;
  delete(props: IDeleteProps): Promise<User>;
}

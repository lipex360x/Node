import User from '@modules/User/entities/User'

export interface ICreateProps {
  user: User
}

export interface IFindOne{
  email: string
}

export interface IUpdateProps{
  user: User
}

export interface IDeleteProps {
  user: User
}

export default interface IUsersRepository {
  findAll(): Promise<User[]>
  findOne(props: IFindOne): Promise<User>
  create(props: ICreateProps): Promise<void>
  update(props: IUpdateProps): Promise<User>
  delete(props: IDeleteProps): Promise<User>
}

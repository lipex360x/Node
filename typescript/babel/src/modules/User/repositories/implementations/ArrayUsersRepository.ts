import User from '@modules/User/entities/User'
import IUsersRepository, { IFindOne, ICreateProps, IDeleteProps, IUpdateProps } from '../IUsersRepository'

export default class FakeUsersRepository implements IUsersRepository {
  private users: User[] = []

  async findAll (): Promise<User[]> {
    return this.users
  }

  async findOne ({ email }:IFindOne): Promise<User> {
    const getUser = this.users.find(user => user.email === email)

    return getUser
  }

  async create ({ user }:ICreateProps): Promise<void> {
    this.users.push(user)
  }

  async update ({ user }:IUpdateProps): Promise<User> {
    const getIndex = this.users.findIndex(getUser => user.id === getUser.id)
    this.users[getIndex] = user

    return user
  }

  async delete ({ user }:IDeleteProps): Promise<User> {
    const getIndex = this.users.findIndex(getUser => user.id === getUser.id)
    this.users[getIndex].status = -1

    const disableUser = this.users[getIndex]
    return disableUser
  }
}

import User from '@modules/User/entities/User'
import IUsersRepository from '@modules/User/repositories/IUsersRepository'

interface IDeleteUserProps {
  email: string
}

export default class DeleteUserService {
  constructor (private usersRepository: IUsersRepository) {}

  async execute ({ email }:IDeleteUserProps): Promise<User> {
    const getUser = await this.usersRepository.findOne({ email })
    console.log()

    if (!getUser) throw new Error('User not found')

    const deleteUser = await this.usersRepository.delete({ user: getUser })

    return deleteUser
  }
}

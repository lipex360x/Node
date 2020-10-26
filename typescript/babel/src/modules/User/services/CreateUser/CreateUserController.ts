import { Request, Response } from 'express'
import CreateUserService from './CreateUserService'

export default class CreateUserController {
  constructor (private createUserService: CreateUserService) {}

  async execute (request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    try {
      const newUser = await this.createUserService.execute({
        name, email, password
      })

      return response.status(200).json(newUser)
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }
  }
}

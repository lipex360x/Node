import DeleteUserService from './DeleteUserService';
import { Request, Response } from 'express';

export default class DeleteUserController {
  constructor(private deleteUserService: DeleteUserService) {}

  async execute(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    try {
      const deleteUser = await this.deleteUserService.execute({ email });

      return response.status(200).json(deleteUser);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

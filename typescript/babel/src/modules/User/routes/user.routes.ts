import { Router } from 'express'

import createUserService from '../services/CreateUser'
import deleteUserController from '../services/DeleteUser'

const router = Router()

router.get('/', (request, response) => {
  return response.json({ message: 'Get Module User' })
})

router.post('/', (request, response) => {
  return createUserService.execute(request, response)
})

router.delete('/', (request, response) => {
  return deleteUserController.execute(request, response)
})

export default router

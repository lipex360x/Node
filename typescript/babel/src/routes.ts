import { Router } from 'express'
import usersRouter from './modules/User/routes/user.routes'

const router = Router()

router.get('/', (request, response) => {
  return response.json({ message: 'hello world' })
})

router.use('/users', usersRouter)

export default router

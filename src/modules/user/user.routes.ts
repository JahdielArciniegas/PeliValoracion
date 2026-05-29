import express from 'express'
import { userController } from './user.controller.js'
import { validateRequest } from '../../shared/middleware/validateRequest.js'
import { userDeleteSchema, userUpdateSchema } from './user.schema.js'
import verifyToken from '../../shared/middleware/verifyToken.js'

const userRoutes = express.Router()

userRoutes.put(
  '/:id',
  validateRequest(userUpdateSchema),
  verifyToken,
  userController.update
)
userRoutes.delete(
  '/:id',
  validateRequest(userDeleteSchema),
  verifyToken,
  userController.remove
)

export default userRoutes

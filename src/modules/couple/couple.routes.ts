import { coupleControllers } from './couple.controller.js'
import express from 'express'
import { validateRequest } from '../../shared/middleware/validateRequest.js'
import {
  coupleCreateSchema,
  coupleValidateSchema,
  coupleChangeNameSchema,
  coupleRemoveSchema,
} from './couple.schema.js'
import verifyToken from '../../shared/middleware/verifyToken.js'

const coupleRouter = express.Router()

coupleRouter.post(
  '/code',
  verifyToken,
  validateRequest(coupleCreateSchema),
  coupleControllers.getCoupleCode
)
coupleRouter.put(
  '/code/validate',
  verifyToken,
  validateRequest(coupleValidateSchema),
  coupleControllers.validateCouple
)
coupleRouter.put(
  '/:id',
  verifyToken,
  validateRequest(coupleChangeNameSchema),
  coupleControllers.changeName
)
coupleRouter.get('/:id', coupleControllers.getOneCouple)
coupleRouter.delete(
  '/:id',
  verifyToken,
  validateRequest(coupleRemoveSchema),
  coupleControllers.removeCouple
)

export default coupleRouter

import type { Request, Response } from 'express'
import { userService } from './user.service.js'

const update = async (req: Request, res: Response) => {
  const { user: currentUser } = req.session
  const { email, name, coupleId } = req.body
  const userUpdate = await userService.update(currentUser?.id, {
    email,
    name,
    coupleId,
  })
  res.status(200).json(userUpdate)
}

const remove = async (req: Request, res: Response) => {
  const { user: currentUser } = req.session
  const userRemove = await userService.remove(currentUser?.id)
  res.status(204).json(userRemove)
}

const getOne = async (req: Request, res: Response) => {
  const { user: currentUser } = req.session
  const user = await userService.getOne(currentUser?.id)
  res.status(200).json(user)
}

export const userController = { update, remove, getOne }

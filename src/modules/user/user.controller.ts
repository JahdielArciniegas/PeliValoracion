import type { Request, Response } from 'express'
import { userService } from './user.service.js'

const update = async (req: Request, res: Response) => {
  const { user: currentUser } = req.session
  const { id } = req.params
  const { email, name, coupleId } = req.body
  const userUpdate = await userService.update(
    id as string,
    {
      email,
      name,
      coupleId,
    },
    currentUser?.id as string
  )
  res.status(200).json(userUpdate)
}

const remove = async (req: Request, res: Response) => {
  const { user: currentUser } = req.session
  const { id } = req.params
  const userRemove = await userService.remove(
    id as string,
    currentUser?.id as string
  )
  res.status(204).json(userRemove)
}

const getOne = async (req: Request, res: Response) => {
  const { user: currentUser } = req.session
  const { id } = req.params
  const user = await userService.getOne(id as string, currentUser?.id as string)
  res.status(200).json(user)
}

export const userController = { update, remove, getOne }

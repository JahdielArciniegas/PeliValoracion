import type { Request, Response } from 'express'
import { coupleServices } from './couple.service.js'

const getCoupleCode = async (req: Request, res: Response) => {
  const id = req.session?.user?.id
  const couple = await coupleServices.getCode(id as string)
  res.status(201).json(couple)
}

const validateCouple = async (req: Request, res: Response) => {
  const { id } = req.body
  const userId = req.session?.user?.id
  const couple = await coupleServices.validateCouple(id, userId as string)
  res.status(200).json(couple)
}

const changeName = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  const { name } = req.body as { name: string }
  const userId = req.session?.user?.id
  const couple = await coupleServices.changeName(id, name, userId as string)
  res.status(200).json(couple)
}

const getOneCouple = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  const userId = req.session?.user?.id
  const couple = await coupleServices.getOneCouple(id, userId as string)
  res.status(200).json(couple)
}

const removeCouple = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  const userId = req.session?.user?.id
  const couple = await coupleServices.removeCouple(id, userId as string)
  res.status(204).json(couple)
}

export const coupleControllers = {
  getCoupleCode,
  validateCouple,
  changeName,
  getOneCouple,
  removeCouple,
}

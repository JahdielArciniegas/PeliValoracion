import type { Request, Response } from 'express'
import { coupleServices } from './couple.service.js'

const getCoupleCode = async (req: Request, res: Response) => {
  const { id } = req.body as { id: string }
  const couple = await coupleServices.getCode(id)
  res.status(201).json(couple)
}

const validateCouple = async (req: Request, res: Response) => {
  const { id, userId } = req.body
  const couple = await coupleServices.validateCouple(id, userId)
  res.status(200).json(couple)
}

const changeName = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  const { name } = req.body as { name: string }
  const couple = await coupleServices.changeName(id, name)
  res.status(200).json(couple)
}

const getOneCouple = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  const couple = await coupleServices.getOneCouple(id)
  res.status(200).json(couple)
}

const removeCouple = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string }
  const couple = await coupleServices.removeCouple(id)
  res.status(204).json(couple)
}

export const coupleControllers = {
  getCoupleCode,
  validateCouple,
  changeName,
  getOneCouple,
  removeCouple,
}

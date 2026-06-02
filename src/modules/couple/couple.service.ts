import { coupleRepositories } from './couple.repositories.js'
import type { Couple } from './couple.js'
import { userRepositories } from '../user/user.repositories.js'
import {
  NotFoundError,
  InternalServerError,
  ValidationError,
  ForbiddenError,
} from '../../shared/utils/errors.js'
import dbConnect from '../../shared/db/connectionMongoDB.js'
import { Types } from 'mongoose'

const getCode = async (id: string) => {
  await dbConnect()
  if (!Types.ObjectId.isValid(id)) {
    throw new ValidationError('User ID is not valid')
  }
  const user = await userRepositories.getOneById(id)
  if (!user) {
    throw new NotFoundError('User not found')
  }
  if (user.coupleId) {
    const coupleExist = await coupleRepositories.getOne(
      user.coupleId.toString()
    )
    if (coupleExist?.users.length === 2) {
      throw new ValidationError('User already has a couple')
    }
    return coupleExist
  }

  const couple = await coupleRepositories.create(id)
  user.coupleId = couple._id
  await userRepositories.update(user)
  return couple
}

const validateCouple = async (id: string, userId: string) => {
  if (!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId)) {
    throw new ValidationError('IDs are not valid')
  }
  await dbConnect()
  const user = await userRepositories.getOneById(userId)
  if (!user) {
    throw new NotFoundError('User not found')
  }

  if (user.coupleId) {
    await removeCouple(user.coupleId.toString(), userId)
  }

  const couple = await coupleRepositories.getOne(id)
  if (!couple) {
    throw new NotFoundError('Couple not found')
  }

  if (couple.users.length === 2) {
    throw new ValidationError('Couple is full')
  }
  const validatedCouple = {
    name: couple.name,
    users: [couple.users[0], userId],
  }
  const newCouple = await coupleRepositories.update(
    id,
    validatedCouple as Couple
  )

  if (!newCouple) throw new InternalServerError('Error updating couple')
  user.coupleId = newCouple._id
  await userRepositories.update(user)
  return newCouple
}

const changeName = async (id: string, name: string, userId: string) => {
  if (!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId)) {
    throw new ValidationError('IDs are not valid')
  }
  await dbConnect()
  if (name === null || name === undefined) {
    throw new ValidationError('Couple name is required')
  }
  const user = await userRepositories.getOneById(userId)
  if (!user) {
    throw new NotFoundError('User not found')
  }
  if (user.coupleId?.toString() !== id) {
    throw new ForbiddenError('User does not belong to this couple')
  }
  const couple = await coupleRepositories.getOne(id)
  if (!couple) {
    throw new NotFoundError('Couple not found')
  }
  const updatedCouple = await coupleRepositories.updateName(id, name)
  return updatedCouple
}

const removeCouple = async (id: string, userId: string) => {
  if (!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId)) {
    throw new ValidationError('IDs are not valid')
  }
  await dbConnect()
  const user = await userRepositories.getOneById(userId)
  if (!user) {
    throw new NotFoundError('User not found')
  }
  if (user.coupleId?.toString() !== id) {
    throw new ForbiddenError('User does not belong to this couple')
  }
  const couple = await coupleRepositories.getOne(id)
  if (!couple) {
    throw new NotFoundError('Couple not found')
  }
  await userRepositories.clearCoupleReference(id)
  return couple
}

const getOneCouple = async (id: string, userId: string) => {
  if (!Types.ObjectId.isValid(id) || !Types.ObjectId.isValid(userId)) {
    throw new ValidationError('IDs are not valid')
  }
  await dbConnect()
  const user = await userRepositories.getOneById(userId)
  if (!user) {
    throw new NotFoundError('User not found')
  }
  if (user.coupleId?.toString() !== id) {
    throw new ForbiddenError('User does not belong to this couple')
  }
  const couple = await coupleRepositories.getOne(id)
  if (!couple) {
    throw new NotFoundError('Couple not found')
  }
  return couple
}

export const coupleServices = {
  getCode,
  validateCouple,
  changeName,
  removeCouple,
  getOneCouple,
}

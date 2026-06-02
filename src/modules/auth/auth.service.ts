import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userRepositories } from '../user/user.repositories.js'
import type { User } from '../user/user.js'
import {
  NotFoundError,
  InternalServerError,
  ValidationError,
  UnauthorizedError,
} from '../../shared/utils/errors.js'
import { JWT_SECRET } from '../../shared/config/dotenv.js'
import dbConnect from '../../shared/db/connectionMongoDB.js'

const register = async (name: string, email: string, password: string) => {
  await dbConnect()
  if (!name || !email || !password)
    throw new ValidationError('User name, email and password are required')

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const emailLower = email.toLowerCase()

  const coupleId = ''
  const userExist = await userRepositories.getOneByEmail(emailLower)
  if (userExist) throw new ValidationError('User already exists')
  const newUser: User = {
    name: name,
    email: emailLower,
    coupleId: coupleId,
    password: hashedPassword,
  }
  const userCreate = await userRepositories.create(newUser)
  return userCreate
}

const login = async (email: string, password: string) => {
  await dbConnect()
  if (!email || !password)
    throw new ValidationError('Email and password are required')
  const emailLower = email.toLowerCase()
  const user = await userRepositories.getOneByEmail(emailLower)
  if (!user) throw new NotFoundError('User not found')
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) throw new UnauthorizedError('Invalid credentials')
  const userToken = {
    id: user.id,
    name: user.name,
    coupleId: user.coupleId,
  }
  if (!JWT_SECRET) throw new InternalServerError('JWT secret not found')

  const token = jwt.sign(userToken, JWT_SECRET, { expiresIn: '1h' })
  return { user, token }
}

export const authService = { register, login }

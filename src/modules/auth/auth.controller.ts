import type { Request, Response } from 'express'
import { authService } from './auth.service.js'

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const { user, token } = await authService.login(email, password)
  res
    .cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    })
    .status(200)
    .json(user)
}

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  const user = await authService.register(name, email, password)
  res.status(201).json(user)
}

const logout = async (req: Request, res: Response) => {
  res
    .clearCookie('access_token')
    .status(200)
    .json({ message: 'Logout successful' })
}

export const authController = { login, register, logout }

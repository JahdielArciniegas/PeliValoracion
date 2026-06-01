import type { NextFunction, Request, Response } from 'express'
import type { UserData } from '../shared/types/session.js'
import { JWT_SECRET } from '../shared/config/dotenv.js'
import jwt from 'jsonwebtoken'

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token
  req.user = null
  if (!JWT_SECRET) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
  try {
    const data = jwt.verify(token, JWT_SECRET)
    req.user = data as UserData
  } catch {
    req.user = null
  }
  next()
}

export default isAuth

import type { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "../config/dotenv.js";
import jwt from "jsonwebtoken";
import type { UserData } from "../types/session.js";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  req.session = { user: null };
  if (!JWT_SECRET) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.session.user = data as UserData | null;
  } catch {}

  next();
};

export default verifyToken;

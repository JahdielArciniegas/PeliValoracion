import type { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.service.js";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user: currentUser } = req.session;
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password, currentUser?.id);
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .status(200)
      .json(user);
  } catch (error) {
    next(error);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user: currentUser } = req.session;
    const { name, email, password } = req.body;
    const user = await authService.register(name, email, password, currentUser?.id);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
};

export const authController = { login, register, logout };
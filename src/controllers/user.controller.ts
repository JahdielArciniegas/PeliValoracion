import type { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service.js";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user: currentUser } = req.session;
    const { email, password } = req.body;
    const { user, token } = await userService.getOne(email, password, currentUser?.id);
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
    const user = await userService.create(name, email, password, currentUser?.id);
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

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user: currentUser } = req.session;
    const { email, name, coupleId } = req.body;
    const userUpdate = await userService.update(currentUser?.id, {
      email,
      name,
      coupleId,
    });
    res.status(200).json(userUpdate);
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user: currentUser } = req.session;
    const userRemove = await userService.remove(currentUser?.id);
    res.status(204).json(userRemove);
  } catch (error) {
    next(error);
  }
};

export const authController = { login, logout, register, update, remove };

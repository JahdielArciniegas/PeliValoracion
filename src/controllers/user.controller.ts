import type { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service.js";

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

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user: currentUser } = req.session;
    const user = await userService.getOne(currentUser?.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const userController = { update, remove, getOne };

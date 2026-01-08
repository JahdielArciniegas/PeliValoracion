import type { Request, Response, NextFunction } from "express";
import { userService } from "../services/user.service.js";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const user = await userService.getOne(email);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body;
    const user = await userService.create(name, email);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    const { email, name, coupleId } = req.body;
    const userUpdate = await userService.update(id, { email, name, coupleId });
    res.status(200).json(userUpdate);
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    const userRemove = await userService.remove(id);
    res.status(204).json(userRemove);
  } catch (error) {
    next(error);
  }
};

export const authController = { login, register, update, remove };

import type { Request, Response } from "express";
import { userService } from "../services/user.service.js";

const login = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await userService.getOne(email);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await userService.create(name, email);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    const { email, name, coupleId } = req.body;
    const userUpdate = await userService.update(id, { email, name, coupleId });
    res.status(200).json(userUpdate);
  } catch (error) {
    console.log(error);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    const userRemove = await userService.remove(id);
    res.status(204).json(userRemove);
  } catch (error) {
    console.log(error);
  }
};

export const authController = { login, register, update, remove };

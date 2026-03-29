import type { Request, Response, NextFunction } from "express";
import { coupleServices } from "./couple.service.js";

const getCoupleCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.body;
    const couple = await coupleServices.getCode(id);
    res.status(201).json(couple);
  } catch (error) {
    next(error);
  }
};

const validateCouple = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, userId } = req.body;
    const couple = await coupleServices.validateCouple(id, userId);
    res.status(200).json(couple);
  } catch (error) {
    next(error);
  }
};

const changeName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const { name, users } = req.body;
    const coupleUpdate = { name, users };
    const couple = await coupleServices.changeName(id, coupleUpdate as any);
    res.status(200).json(couple);
  } catch (error) {
    next(error);
  }
};

const getOneCouple = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const couple = await coupleServices.getOneCouple(id);
    res.status(200).json(couple);
  } catch (error) {
    next(error);
  }
};

const removeCouple = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const couple = await coupleServices.removeCouple(id);
    res.status(204).json(couple);
  } catch (error) {
    next(error);
  }
};

export const coupleControllers = {
  getCoupleCode,
  validateCouple,
  changeName,
  getOneCouple,
  removeCouple,
};

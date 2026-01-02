import type { Request, Response } from "express";
import { coupleServices } from "../services/couple.service.js";

const createCouple = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const couple = await coupleServices.createAndAddUser(id);
    res.status(201).json(couple);
  } catch (error) {
    console.log(error);
  }
};

const validateCouple = async (req: Request, res: Response) => {
  try {
    const { id, userId } = req.body;
    const couple = await coupleServices.validateCouple(id, userId);
    res.status(200).json(couple);
  } catch (error) {
    console.log(error);
  }
};

const changeName = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const { fullCouple } = req.body;
    const couple = await coupleServices.changeName(id, fullCouple);
    res.status(200).json(couple);
  } catch (error) {
    console.log(error);
  }
};

const getOneCouple = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const couple = await coupleServices.getOneCouple(id);
    res.status(200).json(couple);
  } catch (error) {
    console.log(error);
  }
};

const removeCouple = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const couple = await coupleServices.removeCouple(id);
    res.status(204).json(couple);
  } catch (error) {
    console.log(error);
  }
};

export const coupleControllers = {
  createCouple,
  validateCouple,
  changeName,
  getOneCouple,
  removeCouple,
};

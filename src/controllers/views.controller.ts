import type { Request, Response } from "express";
const loginRegister = (req: Request, res: Response) => {
  const session = req.session;
  res.render("login-register", { session });
};

const userCouple = (req: Request, res: Response) => {
  const session = req.session;
  res.render("user-couple", { session });
};

export const viewsController = {
  loginRegister,
  userCouple,
};

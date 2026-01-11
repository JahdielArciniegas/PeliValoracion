import type { Request, Response } from "express";
const loginRegister = (req: Request, res: Response) => {
  const session = req.session;
  res.render("login-register", { session });
};

export const viewsController = {
  loginRegister,
};

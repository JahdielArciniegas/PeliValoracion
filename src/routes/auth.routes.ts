import express from "express";
import { validateRequest } from "../middleware/validateRequest.js";
import { userCreateSchema, userLoginSchema } from "../schemas/user.js";
import { authController } from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post(
  "/register",
  validateRequest(userCreateSchema),
  authController.register,
);
authRoutes.post(
  "/login",
  validateRequest(userLoginSchema),
  authController.login,
);
authRoutes.post("/logout", authController.logout);  

export default authRoutes;
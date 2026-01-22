import express from "express";
import { authController } from "../controllers/user.controller.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  userCreateSchema,
  userDeleteSchema,
  userLoginSchema,
  userUpdateSchema,
} from "../schemas/user.js";

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
authRoutes.put(":id", validateRequest(userUpdateSchema), authController.update);
authRoutes.delete(
  ":id",
  validateRequest(userDeleteSchema),
  authController.remove,
);

export default authRoutes;

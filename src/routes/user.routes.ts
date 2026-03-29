import express from "express";
import { userController } from "../controllers/user.controller.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  userDeleteSchema,
  userUpdateSchema,
} from "../schemas/user.js";

const userRoutes = express.Router();


userRoutes.put(":id", validateRequest(userUpdateSchema), userController.update);
userRoutes.delete(
  ":id",
  validateRequest(userDeleteSchema),
  userController.remove,
);

export default userRoutes;

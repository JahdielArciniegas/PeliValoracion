import express from "express";
import { userController } from "./user.controller.js";
import { validateRequest } from "@shared/middleware/validateRequest.js";
import {
  userDeleteSchema,
  userUpdateSchema,
} from "./user.schema.js";

const userRoutes = express.Router();


userRoutes.put(":id", validateRequest(userUpdateSchema), userController.update);
userRoutes.delete(
  ":id",
  validateRequest(userDeleteSchema),
  userController.remove,
);

export default userRoutes;

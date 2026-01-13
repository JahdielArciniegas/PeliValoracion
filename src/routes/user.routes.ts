import express from "express";
import { authController } from "../controllers/user.controller.js";

const authRoutes = express.Router();

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.post("/logout", authController.logout);
authRoutes.put("/:id", authController.update);
authRoutes.delete("/:id", authController.remove);

export default authRoutes;

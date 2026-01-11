import express from "express";
import { viewsController } from "../controllers/views.controller.js";

const viewsRoutes = express.Router();

viewsRoutes.get("/", viewsController.loginRegister);

export default viewsRoutes;

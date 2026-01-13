import express from "express";
import { viewsController } from "../controllers/views.controller.js";

const viewsRoutes = express.Router();

viewsRoutes.get("/", viewsController.loginRegister);
viewsRoutes.get("/home", viewsController.userCouple);

export default viewsRoutes;

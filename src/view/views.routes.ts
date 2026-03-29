import express from "express";
import { viewsController } from "./views.controller.js";
import isAuth from "@shared/middleware/verifyToken.js";

const viewsRoutes = express.Router();

viewsRoutes.get("/", viewsController.loginRegister);
viewsRoutes.get("/home", isAuth, viewsController.userCouple);
viewsRoutes.get("/movies", isAuth, viewsController.movies);
viewsRoutes.get("/coupleMovies", isAuth, viewsController.coupleMovies);
viewsRoutes.get("/rating/:movieId", isAuth, viewsController.rating);

export default viewsRoutes;

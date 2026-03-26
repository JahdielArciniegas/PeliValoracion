import express from "express";
import { viewsController } from "../controllers/views.controller.js";

const viewsRoutes = express.Router();

viewsRoutes.get("/", viewsController.loginRegister);
viewsRoutes.get("/home", viewsController.userCouple);
viewsRoutes.get("/movies", viewsController.movies);
viewsRoutes.get("/coupleMovies", viewsController.coupleMovies);
viewsRoutes.get("/rating/:movieId", viewsController.rating);

export default viewsRoutes;

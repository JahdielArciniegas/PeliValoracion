import express from "express";
import { moviesController } from "../controllers/movies.controller.js";

const movieRouter = express.Router({ mergeParams: true });

movieRouter.get("/search/:query", moviesController.searchMovies);
movieRouter.get("/nowplaying", moviesController.nowplayingMovies);
movieRouter.get("/toprated", moviesController.topRatedMovies);
movieRouter.get("/popular", moviesController.popularMovies);

export default movieRouter;

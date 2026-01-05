import express from "express";
import { coupleMoviesController } from "../controllers/coupleMovies.controller.js";

const coupleMovieRouter = express.Router();

coupleMovieRouter.post("/", coupleMoviesController.markMovieWatched);
coupleMovieRouter.get("/:id", coupleMoviesController.getMovieWatched);
coupleMovieRouter.get("/", coupleMoviesController.getAllMoviesWatched);
coupleMovieRouter.post("/rate/:movieId", coupleMoviesController.rateMovie);

export default coupleMovieRouter;

import express from "express";
import { coupleMoviesController } from "../controllers/coupleMovies.controller.js";

const coupleMovieRouter = express.Router({ mergeParams: true });

coupleMovieRouter.post("/", coupleMoviesController.markMovieWatched);
coupleMovieRouter.get("/:idcouple/:id", coupleMoviesController.getMovieWatched);
coupleMovieRouter.get("/:idcouple", coupleMoviesController.getAllMoviesWatched);
coupleMovieRouter.post(
  "/:idcouple/rate/:movieId",
  coupleMoviesController.rateMovie
);

export default coupleMovieRouter;

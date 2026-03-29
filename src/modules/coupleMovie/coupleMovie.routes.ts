import express from "express";
import { coupleMoviesController } from "./coupleMovies.controller.js";
import { validateRequest } from "@shared/middleware/validateRequest.js";
import {
  coupleMovieCreateSchema,
  coupleMovieRateSchema,
} from "./coupleMovie.schema.js";

const coupleMovieRouter = express.Router({ mergeParams: true });

coupleMovieRouter.post(
  "/",
  validateRequest(coupleMovieCreateSchema),
  coupleMoviesController.markMovieWatched,
);
coupleMovieRouter.get("/:coupleId/:movieId", coupleMoviesController.getMovieWatched);
coupleMovieRouter.get("/:coupleId", coupleMoviesController.getAllMoviesWatched);
coupleMovieRouter.post(
  "/couple/:coupleId/movie/:movieId/rating",
  validateRequest(coupleMovieRateSchema),
  coupleMoviesController.ratingMovie,
);

export default coupleMovieRouter;

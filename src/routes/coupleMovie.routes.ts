import express from "express";
import { coupleMoviesController } from "../controllers/coupleMovies.controller.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  coupleMovieCreateSchema,
  coupleMovieRateSchema,
} from "../schemas/coupleMovie.js";

const coupleMovieRouter = express.Router({ mergeParams: true });

coupleMovieRouter.post(
  "/",
  validateRequest(coupleMovieCreateSchema),
  coupleMoviesController.markMovieWatched,
);
coupleMovieRouter.get("/:idcouple/:id", coupleMoviesController.getMovieWatched);
coupleMovieRouter.get("/:idcouple", coupleMoviesController.getAllMoviesWatched);
coupleMovieRouter.post(
  "/:idcouple/rate/:movieId",
  validateRequest(coupleMovieRateSchema),
  coupleMoviesController.rateMovie,
);

export default coupleMovieRouter;

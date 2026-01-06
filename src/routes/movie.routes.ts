import express from "express";
import { moviesController } from "../controllers/movies.controller.js";

const movieRouter = express.Router({ mergeParams: true });

movieRouter.get("/search/:query", moviesController.searchMovies);

export default movieRouter;

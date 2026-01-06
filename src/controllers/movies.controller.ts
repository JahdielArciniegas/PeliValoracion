import type { Request, Response } from "express";
import { moviesService } from "../services/movies.service.js";

const searchMovies = async (req: Request, res: Response) => {
  const query = req.query.query as string;
  const movies = await moviesService.searchMovies(query);
  res.status(200).json(movies);
};

export const moviesController = {
  searchMovies,
};

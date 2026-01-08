import type { Request, Response, NextFunction } from "express";
import { coupleMovieService } from "../services/coupleMovie.service.js";

const markMovieWatched = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { coupleId, movieId, movieName, moviePoster } = req.body;

  try {
    await coupleMovieService.markMovieWatched({
      coupleId,
      movieId,
      movieName,
      moviePoster,
      ratings: [],
    });
    res.status(200).json({ message: "Movie marked as watched" });
  } catch (error) {
    next(error);
  }
};

const getMovieWatched = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const coupleId = req.params.coupleId;
  const movieId = req.params.id;

  try {
    const movies = await coupleMovieService.getMovieWatched(
      coupleId as string,
      movieId as string
    );
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

const getAllMoviesWatched = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const coupleId = req.params.coupleId;

  try {
    const movies = await coupleMovieService.getAllMoviesWatched(
      coupleId as string
    );
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

const rateMovie = async (req: Request, res: Response, next: NextFunction) => {
  const movieId = req.params.movieId;
  const coupleId = req.params.coupleId;
  const { rating, opinion, userId } = req.body;

  try {
    await coupleMovieService.ratingMovie(
      userId,
      coupleId as string,
      movieId as string,
      rating,
      opinion
    );
    res.status(200).json({ message: "Movie rated successfully" });
  } catch (error) {
    next(error);
  }
};

export const coupleMoviesController = {
  markMovieWatched,
  getMovieWatched,
  getAllMoviesWatched,
  rateMovie,
};

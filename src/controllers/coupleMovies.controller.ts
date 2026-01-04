import type { Request, Response } from "express";
import { coupleMovieService } from "../services/coupleMovie.service.js";

const markMovieWatched = async (req: Request, res: Response) => {
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
    res.status(500).json({ error: "Error marking movie as watched" });
  }
};

const getMovieWatched = async (req: Request, res: Response) => {
  const { coupleId } = req.query;
  const { movieId } = req.query;

  try {
    const movies = await coupleMovieService.getMovieWatched(
      coupleId as string,
      movieId as string
    );
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Error fetching watched movies" });
  }
};

const getAllMoviesWatched = async (req: Request, res: Response) => {
  const { coupleId } = req.query;

  try {
    const movies = await coupleMovieService.getAllMoviesWatched(
      coupleId as string
    );
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Error fetching all watched movies" });
  }
};

const rateMovie = async (req: Request, res: Response) => {
  const movieId = req.params.movieId;
  const { coupleId, rating, opinion, userId } = req.body;

  try {
    await coupleMovieService.ratingMovie(
      userId,
      coupleId,
      movieId as string,
      rating,
      opinion
    );
    res.status(200).json({ message: "Movie rated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error rating movie" });
  }
};

export const coupleMoviesController = {
  markMovieWatched,
  getMovieWatched,
  getAllMoviesWatched,
  rateMovie,
};

import { coupleMoviesRepository } from "../repositories/coupleMovies.repositories.js";
import { coupleRepositories } from "../repositories/couple.repositories.js";
import type { CoupleMovie } from "../interfaces/coupleMovie.js";
import {
  NotFoundError,
  InternalServerError,
  ValidationError,
} from "../utils/errors.js";

const markMovieWatched = async (movie: CoupleMovie) => {
  if (
    !movie.coupleId ||
    !movie.movieId ||
    !movie.movieName ||
    !movie.moviePoster
  ) {
    throw new ValidationError("Invalid movie data");
  }

  const coupleExists = await coupleRepositories.getOne(movie.coupleId);

  if (!coupleExists) {
    throw new NotFoundError("Couple not found");
  }

  const movieWatched = await coupleMoviesRepository.getOneMovie(
    movie.coupleId,
    movie.movieId
  );

  if (movieWatched) {
    throw new ValidationError("Movie already watched");
  }

  const result = await coupleMoviesRepository.markMovieWatched(movie);
  if (!result) {
    throw new InternalServerError("Error marking movie watched");
  }
  coupleExists.movies.push(result._id);
  await coupleRepositories.update(coupleExists.id, coupleExists);
  return result;
};

const ratingMovie = async (
  userId: string,
  coupleId: string,
  movieId: string,
  rating: number,
  opinion: string
) => {
  const movie = await coupleMoviesRepository.getOneMovie(coupleId, movieId);
  if (!movie) {
    throw new NotFoundError("Movie not found");
  }

  if (movie.ratings.some((rating) => rating.userId === userId)) {
    throw new ValidationError("User already rated this movie");
  }

  if (!userId || !coupleId || !movieId || !rating || !opinion) {
    throw new ValidationError("Invalid rating data");
  }

  if (rating < 1 || rating > 10) {
    throw new ValidationError("Rating must be between 1 and 10");
  }

  if (movie.ratings.length >= 2) {
    throw new ValidationError("Movie must have at least 2 ratings");
  }

  const newRating = {
    userId,
    rating,
    opinion,
  };

  const newMovie = {
    ...movie,
    ratings: [...movie.ratings, newRating],
  };

  const movieResult = await coupleMoviesRepository.updateMovie(newMovie);
  return movieResult;
};

const getMovieWatched = async (coupleId: string, movieId: string) => {
  const movie = await coupleMoviesRepository.getOneMovie(coupleId, movieId);
  return movie;
};

const getAllMoviesWatched = async (coupleId: string) => {
  const movies = await coupleMoviesRepository.getCoupleMovies(coupleId);
  return movies;
};

export const coupleMovieService = {
  markMovieWatched,
  ratingMovie,
  getMovieWatched,
  getAllMoviesWatched,
};

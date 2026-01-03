import { coupleMoviesRepository } from "../repositories/coupleMovies.repositories.js";
import type { CoupleMovie } from "../interfaces/coupleMovie.js";

const markMovieWatched = async (movie: CoupleMovie) => {
  if (
    !movie.coupleId ||
    !movie.movieId ||
    !movie.movieName ||
    !movie.moviePoster
  ) {
    throw new Error("Invalid movie data");
  }

  const movieWatched = await coupleMoviesRepository.getOneMovie(
    movie.coupleId,
    movie.movieId
  );

  if (movieWatched) {
    throw new Error("Movie already watched");
  }

  const result = await coupleMoviesRepository.markMovieWatched(movie);
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
    throw new Error("Movie not found");
  }

  if (movie.ratings.some((rating) => rating.userId === userId)) {
    throw new Error("User already rated this movie");
  }

  if (!userId || !coupleId || !movieId || !rating || !opinion) {
    throw new Error("Invalid rating data");
  }

  if (rating < 1 || rating > 10) {
    throw new Error("Rating must be between 1 and 10");
  }

  if (movie.ratings.length < 2) {
    throw new Error("Movie must have at least 2 ratings");
  }

  if (movie.ratings.length === 0) {
    movie.ratings = [];
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

export const coupleMovieService = {
  markMovieWatched,
  ratingMovie,
  getMovieWatched,
};

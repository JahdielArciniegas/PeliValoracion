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

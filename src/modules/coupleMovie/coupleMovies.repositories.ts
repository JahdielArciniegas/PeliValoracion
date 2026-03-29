import CoupleMovie from "./coupleMovie.model.js";
import type { CoupleMovie as CoupleMovieInterface } from "./coupleMovie.js";

const markMovieWatched = async (movie: CoupleMovieInterface) => {
  const markMovie = new CoupleMovie(movie);
  const result = await markMovie.save();
  return result;
};

const getCoupleMovies = async (coupleId: string) => {
  const movies = await CoupleMovie.find<CoupleMovieInterface[]>({
    coupleId: coupleId,
  });
  return movies;
};

const getOneMovie = async (coupleId: string, movieId: string) => {
  const movie = await CoupleMovie.findOne<CoupleMovieInterface>({
    movieId: movieId,
    coupleId: coupleId,
  });
  return movie;
};

const updateMovie = async (movie: CoupleMovieInterface) => {
  const result = await CoupleMovie.findOneAndUpdate({movieId: movie.movieId, coupleId: movie.coupleId}, movie, {
    new: true,
  });
  return result;
};

const desmarkMovieWatched = async (id: string) => {
  const result = await CoupleMovie.findByIdAndDelete(id);
  return result;
};

export const coupleMoviesRepository = {
  markMovieWatched,
  getCoupleMovies,
  getOneMovie,
  updateMovie,
  desmarkMovieWatched,
};

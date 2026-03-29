import { tmdb } from "../../tmdb.js";

const nowPlayingMovies = async () => {
  const result = await tmdb.movies.nowPlaying({ language: "es" });
  return result.results;
};

const popularMovies = async () => {
  const result = await tmdb.movies.popular({ language: "es" });
  return result.results;
};

const topRatedMovies = async () => {
  const result = await tmdb.movies.topRated({ language: "es" });
  return result.results;
};

const searchMovies = async (query: string) => {
  const result = await tmdb.search.multiSearch({ query, language: "es" });
  return result.results;
};

export const moviesService = {
  nowPlayingMovies,
  popularMovies,
  topRatedMovies,
  searchMovies,
};
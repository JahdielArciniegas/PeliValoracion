import { tmdb } from "../tmdb.js";

export const nowPlayingMovies = async () => {
  const result = await tmdb.movie_lists.now_playing({ language: "es" });
  return result.results;
};

export const popularMovies = async () => {
  const result = await tmdb.movie_lists.popular({ language: "es" });
  return result.results;
};

export const topRatedMovies = async () => {
  const result = await tmdb.movie_lists.top_rated({ language: "es" });
  return result.results;
};

export const searchMovies = async (query: string) => {
  const result = await tmdb.search.movies({ query, language: "es" });
  return result.results;
};

import redisClient from "@shared/config/redis.js";
import { tmdb } from "../../tmdb.js";

const nowPlayingMovies = async () => {
  const movies = await redisClient.get("now_playing_movies")
  if (movies) {
    return movies
  }
  const result = await tmdb.movies.nowPlaying({ language: "es" });
  await redisClient.set("now_playing_movies", JSON.stringify(result.results));
  return result.results;
};

const popularMovies = async () => {
  const movies = await redisClient.get("popular_movies")
  if (movies) {
    return movies
  }
  const result = await tmdb.movies.popular({ language: "es" });
  await redisClient.set("popular_movies", JSON.stringify(result.results));
  return result.results;
};

const topRatedMovies = async () => {
  const movies = await redisClient.get("top_rated_movies")
  if (movies) {
    return movies
  }
  const result = await tmdb.movies.topRated({ language: "es" });
  await redisClient.set("top_rated_movies", JSON.stringify(result.results));
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
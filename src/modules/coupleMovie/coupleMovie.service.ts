import { coupleMoviesRepository } from './coupleMovies.repositories.js'
import { coupleRepositories } from '../couple/couple.repositories.js'
import type { CoupleMovie } from './coupleMovie.js'
import {
  NotFoundError,
  InternalServerError,
  ValidationError,
} from '../../shared/utils/errors.js'
import dbConnect from '../../shared/db/connectionMongoDB.js'
import { Types } from 'mongoose'

const markMovieWatched = async (movie: CoupleMovie) => {
  if (
    !Types.ObjectId.isValid(movie.coupleId) ||
    !Types.ObjectId.isValid(movie.movieId)
  ) {
    throw new ValidationError('IDs are not valid')
  }
  await dbConnect()
  if (
    !movie.coupleId ||
    !movie.movieId ||
    !movie.movieName ||
    !movie.moviePoster
  ) {
    throw new ValidationError('Invalid movie data')
  }

  const coupleExists = await coupleRepositories.getOne(movie.coupleId)

  if (!coupleExists) {
    throw new NotFoundError('Couple not found')
  }

  const movieWatched = await coupleMoviesRepository.getOneMovie(
    movie.coupleId,
    movie.movieId
  )

  if (movieWatched) {
    throw new ValidationError('Movie already watched')
  }

  const result = await coupleMoviesRepository.markMovieWatched(movie)
  if (!result) {
    throw new InternalServerError('Error marking movie watched')
  }
  coupleExists.movies.push(result._id)
  await coupleRepositories.update(coupleExists.id as string, coupleExists)
  return result
}

const ratingMovie = async (
  userId: string,
  coupleId: string,
  movieId: string,
  rating: number,
  opinion: string
) => {
  if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(coupleId)) {
    throw new ValidationError('IDs are not valid')
  }
  await dbConnect()
  const movie = await coupleMoviesRepository.getOneMovie(coupleId, movieId)

  if (!movie) {
    throw new NotFoundError('Movie not found')
  }

  if (
    movie.ratings.some((rating: { userId: string }) => rating.userId === userId)
  ) {
    throw new ValidationError('User already rated this movie')
  }

  if (!userId || !coupleId || !movieId || !rating || !opinion) {
    throw new ValidationError('Invalid rating data')
  }

  if (rating < 1 || rating > 10) {
    throw new ValidationError('Rating must be between 1 and 10')
  }

  if (movie.ratings.length >= 2) {
    throw new ValidationError('Movie must have at least 2 ratings')
  }

  const newRating = {
    userId,
    rating,
    opinion,
  }

  const newMovie = {
    movieId: movie.movieId,
    movieName: movie.movieName,
    moviePoster: movie.moviePoster,
    coupleId: movie.coupleId,
    ratings: [...movie.ratings, newRating],
  }

  const movieResult = await coupleMoviesRepository.updateMovie(newMovie)
  return movieResult
}

const getMovieWatched = async (coupleId: string, movieId: string) => {
  if (!Types.ObjectId.isValid(coupleId)) {
    throw new ValidationError('Couple ID is not valid')
  }
  await dbConnect()
  const movie = await coupleMoviesRepository.getOneMovie(coupleId, movieId)
  return movie
}

const getAllMoviesWatched = async (coupleId: string) => {
  if (!Types.ObjectId.isValid(coupleId)) {
    throw new ValidationError('Couple ID is not valid')
  }
  await dbConnect()
  const movies = await coupleMoviesRepository.getCoupleMovies(coupleId)
  return movies
}

export const coupleMovieService = {
  markMovieWatched,
  ratingMovie,
  getMovieWatched,
  getAllMoviesWatched,
}

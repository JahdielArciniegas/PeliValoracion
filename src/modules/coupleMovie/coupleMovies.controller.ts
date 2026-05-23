import type { Request, Response } from 'express'
import { coupleMovieService } from './coupleMovie.service.js'

const markMovieWatched = async (req: Request, res: Response) => {
  const { movieId, movieName, moviePoster } = req.body
  const coupleId = req.params.coupleId as string

  await coupleMovieService.markMovieWatched({
    coupleId,
    movieId,
    movieName,
    moviePoster,
    ratings: [],
  })
  res.status(200).json({ message: 'Movie marked as watched' })
}

const getMovieWatched = async (req: Request, res: Response) => {
  const idcouple = req.params.coupleId
  const movieId = req.params.movieId

  const movies = await coupleMovieService.getMovieWatched(
    idcouple as string,
    movieId as string
  )
  res.status(200).json(movies)
}

const getAllMoviesWatched = async (req: Request, res: Response) => {
  const idcouple = req.params.coupleId

  const movies = await coupleMovieService.getAllMoviesWatched(
    idcouple as string
  )
  res.status(200).json(movies)
}

const ratingMovie = async (req: Request, res: Response) => {
  const movieId = req.params.movieId
  const idcouple = req.params.coupleId
  const { rating, opinion, userId } = req.body

  await coupleMovieService.ratingMovie(
    userId,
    idcouple as string,
    movieId as string,
    rating,
    opinion
  )
  res.status(200).json({ message: 'Movie rated successfully' })
}

export const coupleMoviesController = {
  markMovieWatched,
  getMovieWatched,
  getAllMoviesWatched,
  ratingMovie,
}

import type { Request, Response } from 'express'
import { coupleMovieService } from './coupleMovie.service.js'

const markMovieWatched = async (req: Request, res: Response) => {
  const { movieId, movieName, moviePoster } = req.body
  const coupleId = req.params.coupleId as string
  const userId = req.session?.user?.id

  await coupleMovieService.markMovieWatched(userId as string, {
    coupleId,
    movieId,
    movieName,
    moviePoster,
    ratings: [],
  })
  res.status(201).json({ message: 'Movie marked as watched' })
}

const getMovieWatched = async (req: Request, res: Response) => {
  const { coupleId, movieId } = req.params
  const userId = req.session?.user?.id

  const movie = await coupleMovieService.getMovieWatched(
    userId as string,
    coupleId as string,
    movieId as string
  )
  res.status(200).json(movie)
}

const getAllMoviesWatched = async (req: Request, res: Response) => {
  const { coupleId } = req.params
  const userId = req.session?.user?.id

  const movies = await coupleMovieService.getAllMoviesWatched(
    userId as string,
    coupleId as string
  )
  res.status(200).json(movies)
}

const ratingMovie = async (req: Request, res: Response) => {
  const { coupleId, movieId } = req.params
  const userId = req.session?.user?.id
  const { rating, opinion } = req.body

  await coupleMovieService.ratingMovie(
    userId as string,
    coupleId as string,
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

import type { Request, Response } from 'express'
import { moviesService } from './movies.service.js'

const searchMovies = async (req: Request, res: Response) => {
  const query = req.query.q as string
  const movies = await moviesService.searchMovies(query)
  res.status(200).json(movies)
}

const nowPlayingMovies = async (req: Request, res: Response) => {
  const movies = await moviesService.nowPlayingMovies()
  res.status(200).json(movies)
}

const topRatedMovies = async (req: Request, res: Response) => {
  const movies = await moviesService.topRatedMovies()
  res.status(200).json(movies)
}

const popularMovies = async (req: Request, res: Response) => {
  const movies = await moviesService.popularMovies()
  res.status(200).json(movies)
}

export const moviesController = {
  searchMovies,
  nowPlayingMovies,
  topRatedMovies,
  popularMovies,
}

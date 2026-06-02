import type { Request, Response } from 'express'
const loginRegister = (req: Request, res: Response) => {
  const user = req.user
  res.render('login-register', { user })
}

const userCouple = (req: Request, res: Response) => {
  const user = req.user
  if (!user) res.redirect('/')
  res.render('user-couple', { user })
}

const movies = (req: Request, res: Response) => {
  const user = req.user
  if (!user) res.redirect('/')
  res.render('movies', { user })
}

const coupleMovies = (req: Request, res: Response) => {
  const user = req.user
  if (!user) res.redirect('/')
  res.render('coupleMovies', { user })
}

const rating = (req: Request, res: Response) => {
  const user = req.user
  if (!user) res.redirect('/')
  const movieId = req.params.movieId
  res.render('rating', { user, movieId })
}

export const viewsController = {
  loginRegister,
  userCouple,
  movies,
  coupleMovies,
  rating,
}

import express from 'express'
import { coupleMoviesController } from './coupleMovies.controller.js'
import { validateRequest } from '../../shared/middleware/validateRequest.js'
import {
  coupleMovieCreateSchema,
  coupleMovieRateSchema,
} from './coupleMovie.schema.js'
import verifyToken from '../../shared/middleware/verifyToken.js'

const coupleMovieRouter = express.Router({ mergeParams: true })

coupleMovieRouter.post(
  '/:coupleId',
  verifyToken,
  validateRequest(coupleMovieCreateSchema),
  coupleMoviesController.markMovieWatched
)
coupleMovieRouter.get(
  '/:coupleId/movies/:movieId',
  verifyToken,
  coupleMoviesController.getMovieWatched
)
coupleMovieRouter.get(
  '/:coupleId',
  verifyToken,
  coupleMoviesController.getAllMoviesWatched
)
coupleMovieRouter.post(
  '/:coupleId/movies/:movieId/rating',
  verifyToken,
  validateRequest(coupleMovieRateSchema),
  coupleMoviesController.ratingMovie
)

export default coupleMovieRouter

import express from 'express'
import { coupleMoviesController } from './coupleMovies.controller.js'
import { validateRequest } from '../../shared/middleware/validateRequest.js'
import {
  coupleMovieCreateSchema,
  coupleMovieRateSchema,
} from './coupleMovie.schema.js'

const coupleMovieRouter = express.Router({ mergeParams: true })

coupleMovieRouter.post(
  '/:coupleId',
  validateRequest(coupleMovieCreateSchema),
  coupleMoviesController.markMovieWatched
)
coupleMovieRouter.get(
  '/:coupleId/movies/:movieId',
  coupleMoviesController.getMovieWatched
)
coupleMovieRouter.get('/:coupleId', coupleMoviesController.getAllMoviesWatched)
coupleMovieRouter.post(
  '/:coupleId/movies/:movieId/rating',
  validateRequest(coupleMovieRateSchema),
  coupleMoviesController.ratingMovie
)

export default coupleMovieRouter

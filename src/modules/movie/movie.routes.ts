import express from 'express'
import { moviesController } from './movies.controller.js'
import verifyToken from '../../shared/middleware/verifyToken.js'

const movieRouter = express.Router({ mergeParams: true })

movieRouter.get('/search', verifyToken, moviesController.searchMovies)
movieRouter.get('/now-playing', verifyToken, moviesController.nowPlayingMovies)
movieRouter.get('/top-rated', verifyToken, moviesController.topRatedMovies)
movieRouter.get('/popular', verifyToken, moviesController.popularMovies)

export default movieRouter

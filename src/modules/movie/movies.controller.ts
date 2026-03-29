import type { Request, Response, NextFunction } from "express";
import { moviesService } from "./movies.service.js";

const searchMovies = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const query = req.query.q as string;
    const movies = await moviesService.searchMovies(query);
    res.status(200).json(movies);
  }catch(error){
    next(error);
  }
};

const nowPlayingMovies = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const movies = await moviesService.nowPlayingMovies();
    res.status(200).json(movies);
  }catch(error){
    next(error);
  }
};

const topRatedMovies = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const movies = await moviesService.topRatedMovies();
    res.status(200).json(movies);
  }catch(error){
    next(error);
  }
};

const popularMovies = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const movies = await moviesService.popularMovies();
    res.status(200).json(movies);
  }catch(error){
    next(error);
  }
};

export const moviesController = {
  searchMovies,
  nowPlayingMovies,
  topRatedMovies,
  popularMovies,
};

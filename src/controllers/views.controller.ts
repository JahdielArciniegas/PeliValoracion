import type { Request, Response } from "express";
const loginRegister = (req: Request, res: Response) => {
  const session = req.session;
  res.render("login-register", { session });
};

const userCouple = (req: Request, res: Response) => {
  const session = req.session;
  res.render("user-couple", { session });
};

const movies = (req: Request, res: Response) => {
  const session = req.session;
  res.render("movies", { session });
};

const coupleMovies = (req: Request, res: Response) => {
  const session = req.session;
  res.render("coupleMovies", { session });
};

const rating = (req: Request, res: Response) => {
  const session = req.session;
  const movieId = req.params.movieId;
  res.render("rating", { session, movieId });
};

export const viewsController = {
  loginRegister,
  userCouple,
  movies,
  coupleMovies,
  rating,
};

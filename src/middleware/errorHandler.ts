import type { NextFunction, Request, Response } from "express";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "NotFoundError") {
    return res.status(404).json({ message: err.message });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: err.message });
  }

  if (err.name === "ForbiddenError") {
    return res.status(403).json({ message: err.message });
  }

  if (err.name === "InternalServerError") {
    return res.status(500).json({ message: err.message });
  }
}

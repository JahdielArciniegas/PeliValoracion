import type { NextFunction, Request, Response } from "express";
import {
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../utils/errors.js";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.message });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({ message: err.message });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(401).json({ message: err.message });
  }

  if (err instanceof ForbiddenError) {
    return res.status(403).json({ message: err.message });
  }

  if (err instanceof InternalServerError) {
    return res.status(500).json({ message: err.message });
  }
}

import type { Request, Response, NextFunction } from "express";
import { ZodObject, z } from "zod";

export const validateRequest = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.parse({ body: req.body, params: req.params });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          ok: false,
          errors: error.issues.map((e) => {
            return {
              message: e.message,
              path: e.path,
            };
          }),
        });
      }
      res.status(400).json({ ok: false, message: "Invalid request" });
    }
  };
};

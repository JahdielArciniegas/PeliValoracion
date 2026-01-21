import type { Request, Response, NextFunction } from "express";
import { ZodObject, z } from "zod";

export const validateRequest = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Validating request");
      const result = schema.parse({ body: req.body, params: req.params });
      console.log(result);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log({ error });
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
      console.log(error);
      res.status(400).json({ ok: false, message: "Invalid request" });
    }
  };
};

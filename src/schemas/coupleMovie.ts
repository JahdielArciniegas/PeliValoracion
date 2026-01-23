import { z } from "zod";

const ratingSchema = z.object({
  userId: z.string(),
  rating: z.number(),
  opinion: z.string(),
});

export const coupleMovieSchema = z.object({
  movieId: z.string(),
  movieName: z.string(),
  moviePoster: z.string(),
  coupleId: z.string(),
  rating: z.array(ratingSchema),
});

export const coupleMovieCreateSchema = z.object({
  body: coupleMovieSchema.omit({
    rating: true,
  }),
});

export const coupleMovieRateSchema = z.object({
  body: ratingSchema,
  params: z.object({
    idcouple: z.string(),
    idmovie: z.string(),
  }),
});

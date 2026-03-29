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
  ratings: z.array(ratingSchema),
});

export const coupleMovieCreateSchema = z.object({
  body: coupleMovieSchema.omit({
    ratings: true,
  }),
});

export const coupleMovieRateSchema = z.object({
  body: ratingSchema,
  params: z.object({
    coupleId: z.string(),
    movieId: z.string(),
  }),
});

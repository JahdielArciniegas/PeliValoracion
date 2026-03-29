import { z } from "zod";

export const coupleSchema = z.object({
  name: z.string(),
  users: z.array(z.string()),
  movies: z.array(z.string()),
});

export const coupleCreateSchema = z.object({
  body: z.object({
    id: z.string(),
  }),
});

export const coupleValidateSchema = z.object({
  body: z.object({
    id: z.string(),
    userId: z.string(),
  }),
});

export const coupleChangeNameSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    name: z.string(),
    users: z.string(),
  }),
});

export const coupleRemoveSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

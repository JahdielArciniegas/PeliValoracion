import { z } from "zod";

export const userSchema = z.object({
  name: z.string(),
  email: z.email(),
  coupleId: z.string(),
});

export const userLoginSchema = z.object({
  body: userSchema.pick({ email: true }),
});

export const userCreateSchema = z.object({
  body: userSchema.omit({ coupleId: true }),
});

export const userUpdateSchema = z.object({
  body: userSchema,
  params: z.object({
    id: z.string(),
  }),
});

export const userDeleteSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

import { z } from 'zod'

export const coupleSchema = z.object({
  name: z.string(),
  users: z.array(z.string()),
  movies: z.array(z.string()),
})

export const coupleValidateSchema = z.object({
  body: z.object({
    id: z.string(),
  }),
})

export const coupleChangeNameSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    name: z.string().min(3, 'Couple name must be at least 3 characters long'),
  }),
})

export const coupleRemoveSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
})

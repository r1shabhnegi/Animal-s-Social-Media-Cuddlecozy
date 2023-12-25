import z from 'zod';

export const signUpValidation = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(18, {
      message: 'Name must be less then 18 characters',
    }),
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(18, {
      message: 'Name must be less then 18 characters',
    }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Username must be at least 8 characters',
  }),
});

export const signInValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Username must be at least 8 characters',
  }),
});

export const postValidation = z.object({
  caption: z.string().min(5).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
});

export const PostValidation = z.object({
  caption: z
    .string()
    .min(5, { message: 'Minimum 5 characters.' })
    .max(2200, { message: 'Maximum 2,200 caracters' }),
  file: z.custom<File[]>(),
  location: z
    .string()
    .min(1, { message: 'This field is required' })
    .max(1000, { message: 'Maximum 1000 characters.' }),
  tags: z.string(),
});

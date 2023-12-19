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

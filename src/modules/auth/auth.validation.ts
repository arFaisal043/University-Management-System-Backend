import { z } from 'zod';

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const registerValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
    role: z.enum(['STUDENT', 'INSTRUCTOR', 'ADMIN']).optional(),
    name: z.string().optional(),
    departmentId: z.string().optional(),
  }),
});

export const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string(),
  }),
});

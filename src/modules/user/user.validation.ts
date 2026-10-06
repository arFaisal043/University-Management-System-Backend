import { z } from 'zod';

export const createUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['STUDENT', 'INSTRUCTOR', 'ADMIN']),
    name: z.string().optional(),
    departmentId: z.string().optional(),
  }),
});

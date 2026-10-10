import { z } from 'zod';

export const createSectionValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    courseId: z.string().uuid(),
    instructorId: z.string().uuid(),
    semesterId: z.string().uuid(),
  }),
});

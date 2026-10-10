import { z } from 'zod';

export const createCourseRegistrationValidationSchema = z.object({
  body: z.object({
    studentId: z.string().uuid(),
    sectionId: z.string().uuid(),
  }),
});

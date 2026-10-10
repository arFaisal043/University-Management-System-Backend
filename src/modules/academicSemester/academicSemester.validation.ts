import { z } from 'zod';

export const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    year: z.number(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
  }),
});

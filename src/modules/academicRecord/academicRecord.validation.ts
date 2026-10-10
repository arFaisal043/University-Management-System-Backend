import { z } from 'zod';

export const createAttendanceValidationSchema = z.object({
  body: z.object({
    studentId: z.string().uuid(),
    sectionId: z.string().uuid(),
    date: z.string().datetime(),
    isPresent: z.boolean(),
  }),
});

export const createExamValidationSchema = z.object({
  body: z.object({
    sectionId: z.string().uuid(),
    name: z.string(),
    date: z.string().datetime(),
    totalMarks: z.number().positive(),
  }),
});

export const createResultValidationSchema = z.object({
  body: z.object({
    studentId: z.string().uuid(),
    examId: z.string().uuid(),
    marksObtained: z.number().nonnegative(),
  }),
});

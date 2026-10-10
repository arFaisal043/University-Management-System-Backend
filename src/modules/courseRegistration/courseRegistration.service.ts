import { PrismaClient, RegistrationStatus, FeeStatus } from '@prisma/client';
import AppError from '../../errors/AppError';

const prisma = new PrismaClient();

const createCourseRegistration = async (payload: any) => {
  const { studentId, sectionId } = payload;

  const section = await prisma.section.findUnique({
    where: { id: sectionId },
    include: { course: true },
  });

  if (!section) throw new AppError(404, 'Section not found');

  const student = await prisma.student.findUnique({
    where: { id: studentId },
  });

  if (!student) throw new AppError(404, 'Student not found');

  const existingRegistration = await prisma.courseRegistration.findFirst({
    where: {
      studentId,
      sectionId,
    }
  });

  if (existingRegistration) throw new AppError(400, 'Student is already registered for this section');

  const result = await prisma.$transaction(async (tx) => {
    const registration = await tx.courseRegistration.create({
      data: {
        studentId,
        sectionId,
        status: RegistrationStatus.ENROLLED
      }
    });

    await tx.fee.create({
      data: {
        studentId,
        semesterId: section.semesterId,
        amount: 500.0,
        status: FeeStatus.UNPAID
      }
    });

    return registration;
  });

  return result;
};

export const CourseRegistrationService = {
  createCourseRegistration,
};

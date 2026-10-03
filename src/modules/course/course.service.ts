import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createCourse = async (payload: any) => {
  const result = await prisma.course.create({
    data: payload,
  });
  return result;
};

const getAllCourses = async () => {
  const result = await prisma.course.findMany({
    include: {
      program: true,
    }
  });
  return result;
};

export const CourseService = {
  createCourse,
  getAllCourses,
};

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createAcademicSemester = async (payload: any) => {
  return await prisma.academicSemester.create({ data: payload });
};

const getAllAcademicSemesters = async () => {
  return await prisma.academicSemester.findMany();
};

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllAcademicSemesters,
};

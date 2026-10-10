import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createSection = async (payload: any) => {
  return await prisma.section.create({ data: payload });
};

const getAllSections = async () => {
  return await prisma.section.findMany({
    include: {
      course: true,
      instructor: true,
      semester: true
    }
  });
};

export const SectionService = {
  createSection,
  getAllSections,
};

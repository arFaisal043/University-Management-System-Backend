import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createProgram = async (payload: any) => {
  const result = await prisma.program.create({
    data: payload,
  });
  return result;
};

const getAllPrograms = async () => {
  const result = await prisma.program.findMany({
    include: {
      department: true,
    }
  });
  return result;
};

export const ProgramService = {
  createProgram,
  getAllPrograms,
};

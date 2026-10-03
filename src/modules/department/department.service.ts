import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createDepartment = async (payload: any) => {
  const result = await prisma.department.create({
    data: payload,
  });
  return result;
};

const getAllDepartments = async () => {
  const result = await prisma.department.findMany();
  return result;
};

export const DepartmentService = {
  createDepartment,
  getAllDepartments,
};

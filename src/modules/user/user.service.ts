import { PrismaClient, User, Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../config';

const prisma = new PrismaClient();

const createUser = async (payload: any) => {
  const hashedPassword = await bcrypt.hash(payload.password, Number(config.bcrypt_salt_rounds));

  const newUser = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: payload.email,
        password: hashedPassword,
        role: payload.role,
      },
    });

    if (user.role === Role.STUDENT) {
      await tx.student.create({
        data: {
          userId: user.id,
          name: payload.name || 'Student',
          departmentId: payload.departmentId,
        },
      });
    } else if (user.role === Role.INSTRUCTOR) {
      await tx.instructor.create({
        data: {
          userId: user.id,
          name: payload.name || 'Instructor',
          departmentId: payload.departmentId,
        },
      });
    } else if (user.role === Role.ADMIN) {
      await tx.admin.create({
        data: {
          userId: user.id,
          name: payload.name || 'Admin',
        },
      });
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });

  return newUser;
};

export const UserService = {
  createUser,
};

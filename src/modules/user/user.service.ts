import { PrismaClient, User, Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../config';

const prisma = new PrismaClient();

const createUser = async (payload: any) => {
  const hashedPassword = await bcrypt.hash(payload.password, Number(config.bcrypt_salt_rounds));

  const newUser = await prisma.user.create({
    data: {
      email: payload.email,
      password: hashedPassword,
      role: payload.role,
    },
  });

  return newUser;
};

export const UserService = {
  createUser,
};

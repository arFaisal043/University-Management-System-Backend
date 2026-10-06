import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { UserService } from '../user/user.service';

const prisma = new PrismaClient();

const registerUser = async (payload: any) => {
  if (!payload.role) {
    payload.role = 'STUDENT'; // default role
  }
  const newUser = await UserService.createUser(payload);
  return newUser;
};

const loginUser = async (payload: any) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new AppError(404, 'User not found!');
  }

  const isPasswordMatched = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatched) {
    throw new AppError(401, 'Password does not match');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in as any,
  });

  const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret as string, {
    expiresIn: config.jwt_refresh_expires_in as any,
  });

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwt.verify(token, config.jwt_refresh_secret as string) as JwtPayload;
  } catch (err) {
    throw new AppError(401, 'Unauthorized');
  }

  const { email } = decodedData;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError(404, 'User not found!');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in as any,
  });

  return {
    accessToken,
  };
};

export const AuthService = {
  registerUser,
  loginUser,
  refreshToken,
};

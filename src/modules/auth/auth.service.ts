import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { UserService } from '../user/user.service';
import { OAuth2Client } from 'google-auth-library';
import crypto from 'crypto';

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

const socialLogin = async (payload: { idToken: string }) => {
  const googleClient = new OAuth2Client(config.google_client_id);
  
  const ticket = await googleClient.verifyIdToken({
    idToken: payload.idToken,
    audience: config.google_client_id,
  });
  const googlePayload = ticket.getPayload();
  if (!googlePayload || !googlePayload.email) throw new AppError(401, 'Invalid Google Token');

  const { email, name } = googlePayload;

  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    const randomPassword = crypto.randomBytes(16).toString('hex');
    user = await UserService.createUser({
      email,
      password: randomPassword,
      name: name || 'Google User',
      role: 'STUDENT',
    }) as any;
  }

  const jwtPayload = {
    email: user!.email,
    role: user!.role,
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

export const AuthService = {
  registerUser,
  loginUser,
  refreshToken,
  socialLogin,
};

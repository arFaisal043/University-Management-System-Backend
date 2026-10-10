import { Router } from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { loginValidationSchema, registerValidationSchema, refreshTokenValidationSchema, socialLoginValidationSchema } from './auth.validation';

const router = Router();

router.post('/register', validateRequest(registerValidationSchema), AuthController.registerUser);

router.post('/login', validateRequest(loginValidationSchema), AuthController.loginUser);

router.post(
  '/refresh-token',
  validateRequest(refreshTokenValidationSchema),
  AuthController.refreshToken
);

router.post(
  '/social-login',
  validateRequest(socialLoginValidationSchema),
  AuthController.socialLogin
);

export const AuthRoutes = router;

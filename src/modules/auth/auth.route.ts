import { Router } from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { loginValidationSchema } from './auth.validation';

const router = Router();

router.post('/login', validateRequest(loginValidationSchema), AuthController.loginUser);

export const AuthRoutes = router;

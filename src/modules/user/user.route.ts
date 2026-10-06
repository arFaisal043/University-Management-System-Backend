import { Router } from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createUserValidationSchema } from './user.validation';

const router = Router();

router.post(
  '/create-user',
  validateRequest(createUserValidationSchema),
  UserController.createUser
);

export const UserRoutes = router;

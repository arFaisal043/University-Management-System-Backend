import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseRegistrationController } from './courseRegistration.controller';
import { createCourseRegistrationValidationSchema } from './courseRegistration.validation';

const router = Router();

router.post('/', validateRequest(createCourseRegistrationValidationSchema), CourseRegistrationController.createCourseRegistration);

export const CourseRegistrationRoutes = router;

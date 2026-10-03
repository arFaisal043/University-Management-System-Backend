import { Router } from 'express';
import { CourseController } from './course.controller';

const router = Router();

router.post('/', CourseController.createCourse);
router.get('/', CourseController.getAllCourses);

export const CourseRoutes = router;

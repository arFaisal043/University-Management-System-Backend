import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { createAcademicSemesterValidationSchema } from './academicSemester.validation';

const router = Router();

router.post('/', validateRequest(createAcademicSemesterValidationSchema), AcademicSemesterController.createAcademicSemester);
router.get('/', AcademicSemesterController.getAllAcademicSemesters);

export const AcademicSemesterRoutes = router;

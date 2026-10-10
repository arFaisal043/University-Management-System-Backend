import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicRecordController } from './academicRecord.controller';
import { createAttendanceValidationSchema, createExamValidationSchema, createResultValidationSchema } from './academicRecord.validation';

const router = Router();

router.post('/attendances', validateRequest(createAttendanceValidationSchema), AcademicRecordController.createAttendance);
router.post('/exams', validateRequest(createExamValidationSchema), AcademicRecordController.createExam);
router.post('/results', validateRequest(createResultValidationSchema), AcademicRecordController.submitResult);
router.get('/transcripts/:studentId', AcademicRecordController.getTranscript);

export const AcademicRecordRoutes = router;

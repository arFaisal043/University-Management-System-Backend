import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AcademicRecordService } from './academicRecord.service';
import sendResponse from '../../utils/sendResponse';

const createAttendance = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicRecordService.createAttendance(req.body);
  sendResponse(res, { statusCode: 201, success: true, message: 'Attendance marked', data: result });
});

const createExam = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicRecordService.createExam(req.body);
  sendResponse(res, { statusCode: 201, success: true, message: 'Exam created', data: result });
});

const submitResult = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicRecordService.submitResult(req.body);
  sendResponse(res, { statusCode: 201, success: true, message: 'Result submitted', data: result });
});

const getTranscript = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await AcademicRecordService.generateTranscript(studentId);
  sendResponse(res, { statusCode: 200, success: true, message: 'Transcript generated successfully', data: result });
});

export const AcademicRecordController = {
  createAttendance,
  createExam,
  submitResult,
  getTranscript,
};

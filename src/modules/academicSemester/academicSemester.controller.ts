import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';
import sendResponse from '../../utils/sendResponse';

const createAcademicSemester = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.createAcademicSemester(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Academic Semester created successfully',
    data: result,
  });
});

const getAllAcademicSemesters = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.getAllAcademicSemesters();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Semesters retrieved successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
};

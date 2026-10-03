import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { CourseService } from './course.service';
import sendResponse from '../../utils/sendResponse';

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.createCourse(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseService.getAllCourses();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Courses fetched successfully',
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
};

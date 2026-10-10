import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { CourseRegistrationService } from './courseRegistration.service';
import sendResponse from '../../utils/sendResponse';

const createCourseRegistration = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseRegistrationService.createCourseRegistration(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Course registered and Fee generated successfully',
    data: result,
  });
});

export const CourseRegistrationController = {
  createCourseRegistration,
};

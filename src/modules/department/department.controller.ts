import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { DepartmentService } from './department.service';
import sendResponse from '../../utils/sendResponse';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const result = await DepartmentService.createDepartment(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Department created successfully',
    data: result,
  });
});

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const result = await DepartmentService.getAllDepartments();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Departments fetched successfully',
    data: result,
  });
});

export const DepartmentController = {
  createDepartment,
  getAllDepartments,
};

import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { ProgramService } from './program.service';
import sendResponse from '../../utils/sendResponse';

const createProgram = catchAsync(async (req: Request, res: Response) => {
  const result = await ProgramService.createProgram(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Program created successfully',
    data: result,
  });
});

const getAllPrograms = catchAsync(async (req: Request, res: Response) => {
  const result = await ProgramService.getAllPrograms();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Programs fetched successfully',
    data: result,
  });
});

export const ProgramController = {
  createProgram,
  getAllPrograms,
};

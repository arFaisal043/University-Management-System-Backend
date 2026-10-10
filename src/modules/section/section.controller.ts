import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { SectionService } from './section.service';
import sendResponse from '../../utils/sendResponse';

const createSection = catchAsync(async (req: Request, res: Response) => {
  const result = await SectionService.createSection(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Section created successfully',
    data: result,
  });
});

const getAllSections = catchAsync(async (req: Request, res: Response) => {
  const result = await SectionService.getAllSections();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Sections retrieved successfully',
    data: result,
  });
});

export const SectionController = {
  createSection,
  getAllSections,
};

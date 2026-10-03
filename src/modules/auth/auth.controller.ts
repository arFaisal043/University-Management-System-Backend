import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../utils/sendResponse';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
};

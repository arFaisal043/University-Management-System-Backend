import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { PaymentService } from './payment.service';
import sendResponse from '../../utils/sendResponse';

const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
  const { feeId } = req.body;
  const result = await PaymentService.createPaymentIntent(feeId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment intent created successfully',
    data: result,
  });
});

const handleWebhook = catchAsync(async (req: any, res: Response) => {
  const signature = req.headers['stripe-signature'] as string;
  const result = await PaymentService.handleWebhook(req.rawBody, signature);
  
  res.status(200).json(result);
});

export const PaymentController = {
  createPaymentIntent,
  handleWebhook,
};

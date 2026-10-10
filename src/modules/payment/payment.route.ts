import { Router } from 'express';
import { PaymentController } from './payment.controller';

const router = Router();

router.post('/create-payment-intent', PaymentController.createPaymentIntent);
router.post('/webhook', PaymentController.handleWebhook);

export const PaymentRoutes = router;

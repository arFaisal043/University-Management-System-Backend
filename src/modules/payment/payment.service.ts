import { PrismaClient, FeeStatus } from '@prisma/client';
import Stripe from 'stripe';
import config from '../../config';
import AppError from '../../errors/AppError';

// Ensure stripe secret key is available, else use dummy to prevent crash on boot
const stripe = new Stripe(config.stripe_secret_key || 'sk_test_dummy', {
  apiVersion: '2024-10-28.acacia' as any,
});

const prisma = new PrismaClient();

const createPaymentIntent = async (feeId: string) => {
  const fee = await prisma.fee.findUnique({
    where: { id: feeId },
  });

  if (!fee) {
    throw new AppError(404, 'Fee not found');
  }

  if (fee.status === FeeStatus.PAID) {
    throw new AppError(400, 'Fee is already paid');
  }

  const amount = Math.round(fee.amount * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    metadata: {
      feeId: fee.id,
      studentId: fee.studentId,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
};

const handleWebhook = async (payload: string, signature: string) => {
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      config.stripe_webhook_secret as string
    );
  } catch (err: any) {
    throw new AppError(400, `Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const feeId = paymentIntent.metadata.feeId;

    if (feeId) {
      await prisma.$transaction(async (tx) => {
        // Update Fee status
        await tx.fee.update({
          where: { id: feeId },
          data: { status: FeeStatus.PAID },
        });

        // Create Payment record
        await tx.payment.create({
          data: {
            feeId,
            transactionId: paymentIntent.id,
            paymentGateway: 'STRIPE',
            amount: paymentIntent.amount / 100,
          },
        });
      });
    }
  }

  return { received: true };
};

export const PaymentService = {
  createPaymentIntent,
  handleWebhook,
};

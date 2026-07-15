'use server';

import { serverMutation } from '@/lib/api/server';
import { revalidatePath } from 'next/cache';

export async function createCheckoutSessionAction(packageCredits: number) {
  try {
    const res = await serverMutation('/api/payments/create-session', 'POST', {
      packageCredits,
    });

    if (res && !res.message?.includes('failed') && !res.error) {
      revalidatePath('/dashboard/supporter/purchase');
      revalidatePath('/dashboard/supporter/history');
    }

    return res;
  } catch (error: any) {
    return { message: error.message || 'Failed to start checkout' };
  }
}

export async function confirmPaymentAction(sessionId: string) {
  try {
    const res = await serverMutation('/api/payments/confirm', 'POST', {
      sessionId,
    });

    if (res && !res.message?.includes('failed') && !res.error) {
      revalidatePath('/dashboard/supporter/home');
      revalidatePath('/dashboard/supporter/history');
    }

    return res;
  } catch (error: any) {
    return { message: error.message || 'Failed to confirm payment' };
  }
}


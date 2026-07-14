'use server';

import { serverMutation } from '@/lib/api/server';
import { revalidatePath } from 'next/cache';

export async function createWithdrawalAction(credits: number, paymentMethod: string, accountNumber: string) {
  try {
    const res = await serverMutation('/api/withdrawals', 'POST', {
      credits,
      paymentMethod,
      accountNumber,
    });

    if (res && !res.message?.includes('failed') && !res.error) {
      revalidatePath('/dashboard/creator/withdrawals');
      revalidatePath('/dashboard/creator/history');
      revalidatePath('/dashboard/creator/home');
    }

    return res;
  } catch (error: any) {
    return { message: error.message || 'Failed to request withdrawal' };
  }
}

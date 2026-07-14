'use server';

import { serverMutation, deleteMutation } from '@/lib/api/server';
import { revalidatePath } from 'next/cache';

export async function createReportAction(campaignId: string, reporterName: string, reporterEmail: string, reason: string) {
  try {
    const res = await serverMutation('/api/reports', 'POST', {
      campaignId,
      reporterName,
      reporterEmail,
      reason,
    });

    return res;
  } catch (error: any) {
    return { message: error.message || 'Failed to submit report' };
  }
}

export async function dismissReportAction(id: string) {
  try {
    const res = await deleteMutation(`/api/admin/reports/${id}`);

    if (res && !res.message?.includes('failed') && !res.error) {
      revalidatePath('/dashboard/admin/reports');
      revalidatePath('/dashboard/admin/home');
    }

    return res;
  } catch (error: any) {
    return { message: error.message || 'Failed to dismiss report' };
  }
}

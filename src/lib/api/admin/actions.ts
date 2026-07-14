'use server';

import { serverMutation } from '@/lib/api/server';
import { revalidatePath } from 'next/cache';

export async function approveCampaignAction(id: string) {
  try {
    const res = await serverMutation(`/api/admin/campaigns/${id}/approve`, 'PATCH', {});

    if (res && !res.message?.includes('failed') && !res.error) {
      revalidatePath('/dashboard/admin/campaigns-approval');
      revalidatePath('/dashboard/admin/home');
      revalidatePath('/campaigns');
    }

    return res;
  } catch (error: any) {
    return { message: error.message || 'Failed to approve campaign' };
  }
}

export async function rejectCampaignAction(id: string) {
  try {
    const res = await serverMutation(`/api/admin/campaigns/${id}/reject`, 'PATCH', {});

    if (res && !res.message?.includes('failed') && !res.error) {
      revalidatePath('/dashboard/admin/campaigns-approval');
      revalidatePath('/dashboard/admin/home');
    }

    return res;
  } catch (error: any) {
    return { message: error.message || 'Failed to reject campaign' };
  }
}

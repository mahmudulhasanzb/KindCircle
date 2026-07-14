'use server';

import { serverMutation, deleteMutation } from '@/lib/api/server';
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

export async function deleteUserAction(id: string) {
  try {
    const res = await deleteMutation(`/api/admin/users/${id}`);

    if (res && !res.message?.includes('failed') && !res.error) {
      revalidatePath('/dashboard/admin/users');
      revalidatePath('/dashboard/admin/home');
    }

    return res;
  } catch (error: any) {
    return { message: error.message || 'Failed to delete user' };
  }
}

export async function updateUserRoleAction(id: string, role: string) {
  try {
    const res = await serverMutation(`/api/admin/users/${id}/role`, 'PATCH', { role });

    if (res && !res.message?.includes('failed') && !res.error) {
      revalidatePath('/dashboard/admin/users');
      revalidatePath('/dashboard/admin/home');
    }

    return res;
  } catch (error: any) {
    return { message: error.message || 'Failed to update user role' };
  }
}

export async function deleteCampaignAction(id: string) {
  try {
    const res = await deleteMutation(`/api/admin/campaigns/${id}`);

    if (res && !res.message?.includes('failed') && !res.error) {
      revalidatePath('/dashboard/admin/campaigns');
      revalidatePath('/dashboard/admin/home');
      revalidatePath('/campaigns');
    }

    return res;
  } catch (error: any) {
    return { message: error.message || 'Failed to delete campaign' };
  }
}

export async function approveWithdrawalAction(id: string) {
  try {
    const res = await serverMutation(`/api/withdrawals/${id}/approve`, 'PATCH', {});

    if (res && !res.message?.includes('failed') && !res.error) {
      revalidatePath('/dashboard/admin/withdrawals');
      revalidatePath('/dashboard/admin/home');
    }

    return res;
  } catch (error: any) {
    return { message: error.message || 'Failed to approve withdrawal' };
  }
}

export async function rejectWithdrawalAction(id: string) {
  try {
    const res = await serverMutation(`/api/withdrawals/${id}/reject`, 'PATCH', {});

    if (res && !res.message?.includes('failed') && !res.error) {
      revalidatePath('/dashboard/admin/withdrawals');
      revalidatePath('/dashboard/admin/home');
    }

    return res;
  } catch (error: any) {
    return { message: error.message || 'Failed to reject withdrawal' };
  }
}

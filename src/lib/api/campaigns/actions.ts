'use server';

import { serverMutation, deleteMutation } from '@/lib/api/server';
import { revalidatePath } from 'next/cache';

export async function submitContributionAction(campaignId: string, amount: number) {
  try {
    const res = await serverMutation('/api/contributions', 'POST', { campaignId, amount });
    
    // Revalidate the detail page to reflect new funding totals / backer counts
    if (res && !res.message?.includes('failed') && !res.error) {
      revalidatePath(`/campaigns/${campaignId}`);
      revalidatePath('/');
    }
    
    return res;
  } catch (error: any) {
    return { message: error.message || 'Failed to submit contribution' };
  }
}

export async function createCampaignAction(data: {
  title: string;
  story: string;
  category: string;
  funding_goal: number;
  minimum_contribution: number;
  deadline: string;
  reward_info: string;
  image_url: string;
}) {
  try {
    const res = await serverMutation('/api/campaigns', 'POST', data);
    if (res && !res.message?.includes('failed') && !res.error) {
      revalidatePath('/campaigns');
      revalidatePath('/');
    }
    return res;
  } catch (error: any) {
    return { message: error.message || 'Failed to submit campaign' };
  }
}

export async function updateCampaignAction(id: string, data: {
  title?: string;
  story?: string;
  reward_info?: string;
}) {
  try {
    const res = await serverMutation(`/api/campaigns/${id}`, 'PUT', data);
    if (res && !res.message?.includes('failed') && !res.error) {
      revalidatePath(`/campaigns/${id}`);
      revalidatePath('/campaigns');
      revalidatePath('/');
    }
    return res;
  } catch (error: any) {
    return { message: error.message || 'Failed to update campaign' };
  }
}

export async function deleteCampaignAction(id: string) {
  try {
    const res = await deleteMutation(`/api/campaigns/${id}`);
    if (res && !res.message?.includes('failed') && !res.error) {
      revalidatePath('/campaigns');
      revalidatePath('/');
    }
    return res;
  } catch (error: any) {
    return { message: error.message || 'Failed to delete campaign' };
  }
}



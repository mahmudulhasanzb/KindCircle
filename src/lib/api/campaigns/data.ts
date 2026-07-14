import { baseURL } from '@/lib/api/baseUrl';
import type { Campaign, CampaignFilters } from '@/lib/types/campaign';

export async function getCampaigns(filters: CampaignFilters = {}): Promise<Campaign[]> {
  const params = new URLSearchParams();
  if (filters.category) params.set('category', filters.category);
  if (filters.search) params.set('search', filters.search);
  if (filters.sort) params.set('sort', filters.sort);

  const url = `${baseURL}/api/campaigns${params.toString() ? `?${params.toString()}` : ''}`;

  const res = await fetch(url, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch campaigns');
  return res.json();
}

export async function getCampaignDetail(id: string): Promise<Campaign> {
  const res = await fetch(`${baseURL}/api/campaigns/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    if (res.status === 404) throw new Error('Campaign not found');
    throw new Error('Failed to fetch campaign detail');
  }
  return res.json();
}

export async function getCreatorCampaigns(userId: string): Promise<Campaign[]> {
  const { serverFetch } = await import('@/lib/api/server');
  return serverFetch(`/api/campaigns/creator/${userId}`);
}

export async function getPendingContributions(creatorEmail: string): Promise<any[]> {
  const { serverFetch } = await import('@/lib/api/server');
  return serverFetch(`/api/contributions/pending/${creatorEmail}`);
}

export async function getSupporterContributions(
  email: string,
  page: number = 1,
  limit: number = 10
): Promise<{
  contributions: any[];
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}> {
  const { serverFetch } = await import('@/lib/api/server');
  return serverFetch(`/api/contributions/supporter/${email}?page=${page}&limit=${limit}`);
}

// T-15.1 — Creator dashboard stats
export async function getCreatorStats(userId: string): Promise<{
  totalCampaigns: number;
  activeCampaigns: number;
  totalRaised: number;
  campaigns?: any[];
}> {
  const { serverFetch } = await import('@/lib/api/server');
  return serverFetch(`/api/creator/stats/${userId}`);
}

// T-15.3 — Supporter dashboard stats
export async function getSupporterStats(email: string): Promise<{
  totalContributions: number;
  pendingContributions: number;
  totalApprovedAmount: number;
  approvedContributions: Array<{
    _id: string;
    campaignTitle: string;
    amount: number;
    creator_name: string;
    status: string;
    createdAt: string;
  }>;
}> {
  const { serverFetch } = await import('@/lib/api/server');
  return serverFetch(`/api/supporter/stats/${email}`);
}

import { baseURL } from '@/lib/api/baseUrl';
import type { Campaign, CampaignFilters } from '@/lib/types/campaign';

export async function getCampaigns(filters: CampaignFilters = {}): Promise<Campaign[]> {
  const params = new URLSearchParams();
  if (filters.category) params.set('category', filters.category);
  if (filters.search) params.set('search', filters.search);
  if (filters.sort) params.set('sort', filters.sort);

  const url = `${baseURL}/api/campaigns${params.toString() ? `?${params.toString()}` : ''}`;

  const res = await fetch(url, {
    cache: 'no-store', // Always fresh for filter changes
  });
  if (!res.ok) throw new Error('Failed to fetch campaigns');
  return res.json();
}

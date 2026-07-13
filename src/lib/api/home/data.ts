import { baseURL } from '@/lib/api/baseUrl';

export interface PlatformStats {
  totalUsers: number;
  totalCampaigns: number;
  totalCreditsRaised: number;
}

export interface TopCampaign {
  _id: string;
  title: string;
  image_url: string;
  amount_raised: number;
  funding_goal: number;
  category: string;
  creator_name: string;
  status: string;
}

export async function getPlatformStats(): Promise<PlatformStats> {
  const res = await fetch(`${baseURL}/api/stats/platform`, {
    next: { revalidate: 300 }, // 5-minute cache
  });
  if (!res.ok) throw new Error('Failed to fetch platform stats');
  return res.json();
}

export async function getTopFundedCampaigns(): Promise<TopCampaign[]> {
  const res = await fetch(`${baseURL}/api/campaigns/top-funded`, {
    next: { revalidate: 300 }, // 5-minute cache
  });
  if (!res.ok) throw new Error('Failed to fetch top funded campaigns');
  return res.json();
}

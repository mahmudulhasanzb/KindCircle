export interface LeaderboardSupporter {
  email: string;
  totalContributed: number;
  name: string;
  photoUrl: string;
}

export interface LeaderboardCampaign {
  _id: string;
  title: string;
  story: string;
  category: string;
  funding_goal: number;
  amount_raised: number;
  image_url: string;
  creator_name: string;
  deadline: string;
}

export interface SupporterBadge {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
}

export interface PersonalStats {
  totalContributed: number;
  rank: number | null;
  badges: SupporterBadge[];
}

export interface LeaderboardResponse {
  topSupporters: LeaderboardSupporter[];
  topCampaigns: LeaderboardCampaign[];
  personalStats: PersonalStats | null;
}

export async function getLeaderboard(): Promise<LeaderboardResponse> {
  const { serverFetch } = await import('@/lib/api/server');
  return serverFetch('/api/leaderboard');
}

// Shared Campaign interface used across client and server
export interface Campaign {
  _id: string;
  title: string;
  story: string;
  category: string;
  funding_goal: number;
  minimum_contribution: number;
  deadline: string; // ISO date string from MongoDB
  reward_info: string;
  image_url: string;
  creatorId: string;
  creator_name: string;
  creator_email: string;
  amount_raised: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export type CampaignSortOption = 'newest' | 'most-funded' | 'ending-soon';

export interface CampaignFilters {
  category?: string;
  search?: string;
  sort?: CampaignSortOption;
}

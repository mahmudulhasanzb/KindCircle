import { serverFetch } from '@/lib/api/server';

export interface AdminStats {
  totalSupporters: number;
  totalCreators: number;
  totalCredits: number;
  totalPayments: number;
}

export async function getAdminStats(): Promise<AdminStats> {
  return serverFetch('/api/admin/stats');
}

export async function getPendingCampaigns(): Promise<any[]> {
  return serverFetch('/api/admin/campaigns/pending');
}

export async function getAdminUsers(): Promise<any[]> {
  return serverFetch('/api/admin/users');
}

export async function getAdminCampaigns(): Promise<any[]> {
  return serverFetch('/api/admin/campaigns');
}

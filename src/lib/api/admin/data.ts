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

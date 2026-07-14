import { serverFetch } from '@/lib/api/server';

export async function getAdminReports(): Promise<any[]> {
  return serverFetch('/api/admin/reports');
}

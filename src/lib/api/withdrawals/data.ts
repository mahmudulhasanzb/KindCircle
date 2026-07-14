import { serverFetch } from '@/lib/api/server';

export async function getCreatorWithdrawals(email: string) {
  return serverFetch(`/api/withdrawals/creator/${email}`);
}

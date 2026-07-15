import { serverFetch } from '@/lib/api/server';

export async function getPaymentHistory(email: string) {
  return serverFetch(`/api/payments/${email}`);
}

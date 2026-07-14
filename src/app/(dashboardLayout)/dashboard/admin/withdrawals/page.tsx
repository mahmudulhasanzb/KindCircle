import React from 'react';
import { roleValidator } from '@/lib/api/session';
import { getPendingWithdrawals } from '@/lib/api/admin/data';
import WithdrawalRequestsTable from '@/components/ui/WithdrawalRequestsTable';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Withdrawal Requests — KindCircle',
  description: 'Manage creator payout requests and confirm transactions.',
};

export default async function AdminWithdrawalsPage() {
  await roleValidator('admin');

  let pendingRequests: any[] = [];
  try {
    pendingRequests = await getPendingWithdrawals();
  } catch (error) {
    console.error('Failed to load pending withdrawal requests:', error);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1.5 pb-5 border-b border-neutral-800/80">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Withdrawal Requests
        </h1>
        <p className="text-sm text-neutral-400">
          Review pending cash payout requests from creators and record completions.
        </p>
      </div>

      <WithdrawalRequestsTable requests={pendingRequests} />
    </div>
  );
}

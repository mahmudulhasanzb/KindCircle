import React from 'react';
import { roleValidator, getUser } from '@/lib/api/session';
import { getCreatorWithdrawals } from '@/lib/api/withdrawals/data';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Withdrawal History — KindCircle',
  description: 'View your credit withdrawal history.',
};

export default async function CreatorWithdrawalHistoryPage() {
  await roleValidator('creator');

  const user = await getUser();
  if (!user?.email) {
    redirect('/signin');
  }

  let withdrawals: any[] = [];
  try {
    const result = await getCreatorWithdrawals(user.email);
    withdrawals = Array.isArray(result) ? result : [];
  } catch (error) {
    console.error('Failed to load withdrawal history:', error);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1.5 pb-5 border-b border-neutral-800/80">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Withdrawal History
        </h1>
        <p className="text-sm text-neutral-400">
          Track your payout requests and status updates.
        </p>
      </div>

      {withdrawals.length === 0 ? (
        <div className="rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-10 text-center text-sm text-neutral-500">
          No withdrawal requests yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-neutral-800/70">
          <table className="w-full text-sm text-left">
            <thead className="bg-neutral-900/70">
              <tr>
                <th className="px-5 py-3 font-semibold text-neutral-400 uppercase tracking-wider text-xs">
                  Date
                </th>
                <th className="px-5 py-3 font-semibold text-neutral-400 uppercase tracking-wider text-xs">
                  Credits
                </th>
                <th className="px-5 py-3 font-semibold text-neutral-400 uppercase tracking-wider text-xs">
                  Amount (USD)
                </th>
                <th className="px-5 py-3 font-semibold text-neutral-400 uppercase tracking-wider text-xs">
                  Method
                </th>
                <th className="px-5 py-3 font-semibold text-neutral-400 uppercase tracking-wider text-xs">
                  Account Number
                </th>
                <th className="px-5 py-3 font-semibold text-neutral-400 uppercase tracking-wider text-xs">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 bg-neutral-900/30">
              {withdrawals.map((w) => (
                <tr
                  key={w._id || w.id}
                  className="hover:bg-neutral-800/30"
                >
                  <td className="px-5 py-3.5 text-neutral-300">
                    {new Date(w.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-5 py-3.5 text-white font-medium">
                    {w.withdrawal_credit || 0}
                  </td>
                  <td className="px-5 py-3.5 text-white">
                    ${(w.withdrawal_amount || 0).toFixed(2)}
                  </td>
                  <td className="px-5 py-3.5 text-neutral-300">
                    {w.payment_method}
                  </td>
                  <td className="px-5 py-3.5 text-neutral-400 font-mono text-xs">
                    {w.account_number}
                  </td>
                  <td className="px-5 py-3.5">
                    {(() => {
                      const status = (w.status || 'pending').toLowerCase();
                      if (status === 'approved' || status === 'completed') {
                        return (
                          <span className="inline-flex rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/30 capitalize">
                            {status}
                          </span>
                        );
                      } else if (status === 'pending') {
                        return (
                          <span className="inline-flex rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-400 ring-1 ring-amber-500/30 capitalize">
                            {status}
                          </span>
                        );
                      } else {
                        return (
                          <span className="inline-flex rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-semibold text-rose-400 ring-1 ring-rose-500/30 capitalize">
                            {status}
                          </span>
                        );
                      }
                    })()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

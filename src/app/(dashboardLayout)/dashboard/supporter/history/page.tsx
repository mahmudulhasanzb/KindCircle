import React from 'react';
import { roleValidator, getUser } from '@/lib/api/session';
import { getPaymentHistory } from '@/lib/api/payments/data';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Payment History — KindCircle',
  description: 'View your credit purchase history.',
};

export default async function SupporterPaymentHistoryPage() {
  await roleValidator('supporter');

  const user = await getUser();
  if (!user?.email) {
    redirect('/signin');
  }

  let payments: any[] = [];
  try {
    const result = await getPaymentHistory(user.email);
    payments = Array.isArray(result) ? result : result?.payments || [];
  } catch (error) {
    console.error('Failed to load payment history:', error);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1.5 pb-5 border-b border-neutral-800/80">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Payment History
        </h1>
        <p className="text-sm text-neutral-400">
          Track your purchased credit packages and statuses.
        </p>
      </div>

      {payments.length === 0 ? (
        <div className="rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-10 text-center text-sm text-neutral-500">
          No payment history yet.
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
                  Amount
                </th>
                <th className="px-5 py-3 font-semibold text-neutral-400 uppercase tracking-wider text-xs">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 bg-neutral-900/30">
              {payments.map(payment => (
                <tr
                  key={payment._id || payment.id}
                  className="hover:bg-neutral-800/30"
                >
                  <td className="px-5 py-3.5 text-neutral-300">
                    {new Date(payment.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-5 py-3.5 text-white">
                    {payment.credits || payment.packageCredits || 0}
                  </td>
                  <td className="px-5 py-3.5 text-white">
                    ${payment.amount || 0}
                  </td>
                  <td className="px-5 py-3.5">
                    {(() => {
                      const status = (payment.status || 'completed').toLowerCase();
                      if (status === 'completed' || status === 'succeeded' || status === 'approved') {
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

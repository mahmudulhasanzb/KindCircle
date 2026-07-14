'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Check, X } from 'lucide-react';
import { approveWithdrawalAction, rejectWithdrawalAction } from '@/lib/api/admin/actions';

interface Withdrawal {
  _id: string;
  creator_email: string;
  withdrawal_credit: number;
  withdrawal_amount: number;
  status: 'pending';
  payment_method: string;
  account_number: string;
  createdAt: string;
}

interface WithdrawalRequestsTableProps {
  requests: Withdrawal[];
}

export default function WithdrawalRequestsTable({ requests: initialRequests }: WithdrawalRequestsTableProps) {
  const router = useRouter();
  const [requests, setRequests] = useState<Withdrawal[]>(initialRequests);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  async function handleApprove(id: string) {
    setIsProcessing(id);
    const toastId = toast.loading('Approving payout...');
    try {
      const res = await approveWithdrawalAction(id);
      if (res && res.error) {
        toast.error(res.error, { id: toastId });
      } else if (res && res.message && res.message.includes('failed')) {
        toast.error(res.message, { id: toastId });
      } else {
        toast.success('Withdrawal request approved successfully!', { id: toastId });
        setRequests((prev) => prev.filter((r) => r._id !== id));
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to approve payout', { id: toastId });
    } finally {
      setIsProcessing(null);
    }
  }

  async function handleReject(id: string) {
    setIsProcessing(id);
    const toastId = toast.loading('Rejecting and refunding credits...');
    try {
      const res = await rejectWithdrawalAction(id);
      if (res && res.error) {
        toast.error(res.error, { id: toastId });
      } else if (res && res.message && res.message.includes('failed')) {
        toast.error(res.message, { id: toastId });
      } else {
        toast.success('Withdrawal request rejected and credits refunded.', { id: toastId });
        setRequests((prev) => prev.filter((r) => r._id !== id));
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to reject payout', { id: toastId });
    } finally {
      setIsProcessing(null);
    }
  }

  if (requests.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-10 text-center text-sm text-neutral-500">
        No pending withdrawal requests.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-800/70">
      <table className="w-full text-sm text-left">
        <thead className="bg-neutral-900/70">
          <tr className="border-b border-neutral-800/80">
            <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Creator</th>
            <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Credits</th>
            <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs">USD Amount</th>
            <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Method</th>
            <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Account Number</th>
            <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Date</th>
            <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800/60 bg-neutral-900/30">
          {requests.map((r) => (
            <tr key={r._id} className="hover:bg-neutral-800/20 transition-colors">
              <td className="px-5 py-4 text-white font-semibold">
                {r.creator_email}
              </td>
              <td className="px-5 py-4 text-white font-medium">
                {r.withdrawal_credit.toLocaleString()}
              </td>
              <td className="px-5 py-4 text-emerald-400 font-semibold">
                ${r.withdrawal_amount.toFixed(2)}
              </td>
              <td className="px-5 py-4 text-neutral-300">
                {r.payment_method}
              </td>
              <td className="px-5 py-4 text-neutral-400 font-mono text-xs">
                {r.account_number}
              </td>
              <td className="px-5 py-4 text-neutral-500">
                {new Date(r.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </td>
              <td className="px-5 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleApprove(r._id)}
                    disabled={isProcessing !== null}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-400 ring-1 ring-emerald-500/30 hover:bg-emerald-500/20 transition disabled:opacity-50 cursor-pointer"
                  >
                    <Check className="h-3.5 w-3.5" />
                    <span>Payment Success</span>
                  </button>
                  <button
                    onClick={() => handleReject(r._id)}
                    disabled={isProcessing !== null}
                    className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition disabled:opacity-50 cursor-pointer"
                    title="Reject Payout"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { createWithdrawalAction } from '@/lib/api/withdrawals/actions';

interface WithdrawalFormProps {
  currentCredits: number;
}

export default function WithdrawalForm({ currentCredits }: WithdrawalFormProps) {
  const router = useRouter();
  const [credits, setCredits] = useState<number | ''>('');
  const [paymentMethod, setPaymentMethod] = useState('Stripe');
  const [accountNumber, setAccountNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const usdAmount = credits ? (Number(credits) / 20).toFixed(2) : '0.00';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!credits || Number(credits) < 200) {
      toast.error('Minimum withdrawal amount is 200 credits.');
      return;
    }

    if (Number(credits) > currentCredits) {
      toast.error('Insufficient credit balance.');
      return;
    }

    if (!accountNumber.trim()) {
      toast.error('Account number/identifier is required.');
      return;
    }

    setLoading(false);
    const toastId = toast.loading('Submitting withdrawal request...');
    setLoading(true);

    try {
      const result = await createWithdrawalAction(Number(credits), paymentMethod, accountNumber);
      if (result && !result.message?.includes('failed') && !result.error) {
        toast.success('Withdrawal request submitted successfully!', { id: toastId });
        setCredits('');
        setAccountNumber('');
        router.refresh();
        router.push('/dashboard/creator/history');
      } else {
        toast.error(result?.message || 'Failed to submit withdrawal request.', { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (currentCredits < 200) {
    return (
      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-center max-w-xl mx-auto">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center text-xl font-bold">
          !
        </div>
        <h3 className="text-base font-bold text-white mb-2">Insufficient Balance</h3>
        <p className="text-sm text-neutral-400">
          You need at least <strong>200 credits</strong> to request a withdrawal. Your current balance is <strong>{currentCredits} credits</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto rounded-2xl border border-neutral-800/70 bg-neutral-900/60 p-8 shadow-sm">
      <h2 className="text-lg font-bold text-white mb-6 tracking-tight">Request Payout</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
            Withdrawal Credits
          </label>
          <div className="relative">
            <input
              type="number"
              min="200"
              max={currentCredits}
              value={credits}
              onChange={(e) => setCredits(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="Minimum 200 credits"
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-primary focus:outline-none transition-colors"
              required
            />
            <span className="absolute right-4 top-3 text-xs font-semibold text-neutral-500">
              Credits
            </span>
          </div>
          <div className="mt-2 flex justify-between text-xs text-neutral-500">
            <span>Available: {currentCredits} credits</span>
            <span>Min: 200 credits</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
            Equivalent USD (Credits / 20)
          </label>
          <div className="relative">
            <input
              type="text"
              value={`$${usdAmount}`}
              disabled
              className="w-full rounded-xl border border-neutral-800 bg-neutral-900/30 px-4 py-3 text-sm text-neutral-400 cursor-not-allowed select-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
            Payment Method
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none transition-colors appearance-none cursor-pointer"
          >
            <option value="Stripe">Stripe</option>
            <option value="Bkash">Bkash</option>
            <option value="Rocket">Rocket</option>
            <option value="Nagad">Nagad</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
            Account Number / Phone / Identifier
          </label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="e.g. email or mobile number"
            className="w-full rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-primary focus:outline-none transition-colors"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary py-3 text-sm font-bold text-white shadow-md shadow-primary/10 transition-transform hover:scale-[1.01] hover:brightness-110 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Processing...' : 'Withdraw Funds'}
        </button>
      </form>
    </div>
  );
}

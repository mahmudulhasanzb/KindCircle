'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { submitContributionAction } from '@/lib/api/campaigns/actions';

interface ContributionFormProps {
  campaignId: string;
  minimumContribution: number;
  creatorEmail: string;
  user: {
    id: string;
    email: string;
    role: string;
    credits: number;
    name?: string;
  } | null;
}

export default function ContributionForm({
  campaignId,
  minimumContribution,
  creatorEmail,
  user,
}: ContributionFormProps) {
  const router = useRouter();
  const [amount, setAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isSupporter = user?.role === 'supporter';
  const userCredits = user?.credits || 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    if (!user) {
      toast.error('Please log in to contribute');
      router.push('/signin');
      return;
    }

    if (!isSupporter) {
      setErrorMsg('Only Supporters can contribute to campaigns.');
      return;
    }

    if (user.email === creatorEmail) {
      setErrorMsg('You cannot contribute to your own campaign.');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setErrorMsg('Please enter a valid positive number');
      return;
    }

    if (numAmount < minimumContribution) {
      setErrorMsg(`Contribution must be at least ${minimumContribution} credits.`);
      return;
    }

    if (userCredits < numAmount) {
      setErrorMsg(`Insufficient balance. You have ${userCredits} credits.`);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitContributionAction(campaignId, numAmount);
      
      if (res && res.error) {
        setErrorMsg(res.error);
        toast.error(res.error);
      } else if (res && res.message && (res.message.includes('failed') || res.status === 400 || res.status === 500)) {
        setErrorMsg(res.message);
        toast.error(res.message);
      } else {
        toast.success('Contribution submitted successfully! Pending approval.');
        setAmount('');
        // Refresh the page data
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred');
      toast.error('Failed to submit contribution');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="p-5 bg-neutral-100 dark:bg-neutral-800 border border-white/5 rounded-xl flex flex-col gap-4 shadow-sm"
      style={{ borderRadius: '12px', padding: '20px' }}
    >
      <h3 className="text-lg font-semibold text-foreground" style={{ lineHeight: 1.3 }}>
        Support this Campaign
      </h3>

      {!user ? (
        <div className="text-center py-4">
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Join KindCircle to back this campaign.
          </p>
          <button
            onClick={() => router.push('/signin')}
            className="w-full py-2.5 bg-[var(--primary)] hover:bg-[#4F46E5] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
            style={{ borderRadius: '8px' }}
          >
            Log In to Contribute
          </button>
        </div>
      ) : !isSupporter ? (
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-lg p-3 text-xs leading-normal">
          You are logged in as a <strong>{user.role}</strong>. Only Supporters can contribute credits to campaigns.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* User balance info */}
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <span>Your Balance:</span>
            <span className="font-semibold text-foreground">{userCredits.toLocaleString()} credits</span>
          </div>

          {/* Amount input */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contribution-amount" className="text-xs font-semibold text-foreground">
              Contribution Amount
            </label>
            <div className="relative">
              <input
                id="contribution-amount"
                type="number"
                step="any"
                min={minimumContribution}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`Min ${minimumContribution} credits`}
                required
                disabled={isSubmitting}
                className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all duration-200"
                style={{ borderRadius: '8px' }}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[var(--text-secondary)]">
                Credits
              </span>
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs font-medium text-[var(--danger)] leading-normal" id="contribution-error">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            id="contribution-submit"
            disabled={isSubmitting}
            className={`w-full py-2.5 bg-[var(--primary)] text-white text-sm font-semibold rounded-lg hover:bg-[#4F46E5] transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{ borderRadius: '8px' }}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </>
            ) : (
              'Contribute Credits'
            )}
          </button>
        </form>
      )}

      {/* Campaign creator notification */}
      <p className="text-[11px] text-[var(--text-secondary)] text-center leading-normal">
        All contributions remain pending until approved by the creator.
      </p>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Flag } from 'lucide-react';
import { createReportAction } from '@/lib/api/reports/actions';

interface ReportCampaignButtonProps {
  campaignId: string;
  reporterName: string;
  reporterEmail: string;
}

export default function ReportCampaignButton({ campaignId, reporterName, reporterEmail }: ReportCampaignButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reason.trim()) {
      toast.error('Please provide a reason for reporting.');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Submitting report...');

    try {
      const res = await createReportAction(campaignId, reporterName, reporterEmail, reason);
      if (res && res.message && !res.message.includes('failed') && !res.error) {
        toast.success('Campaign reported successfully. Admins will review.', { id: toastId });
        setReason('');
        setIsOpen(false);
      } else {
        toast.error(res?.message || 'Failed to report campaign.', { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/40 py-2.5 text-xs font-semibold text-neutral-400 hover:text-rose-400 hover:border-rose-500/20 hover:bg-rose-500/5 transition cursor-pointer"
      >
        <Flag className="h-3.5 w-3.5" />
        <span>Report Campaign</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-rose-400">
              <Flag className="h-5 w-5" />
              <h3 className="font-bold text-base text-white">Report Campaign</h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Please explain why you believe this campaign violates platform policies. Admin staff will review this report within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Reason for Report
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Provide details about fraud, copyright violation, or inappropriate content..."
                  rows={4}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950/60 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-rose-500/40 focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={loading}
                  className="px-3.5 py-2 rounded-lg text-xs font-semibold text-neutral-400 hover:text-white transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-3.5 py-2 rounded-lg text-xs font-bold bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

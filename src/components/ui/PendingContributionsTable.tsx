'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Check, X, Eye, FileText, ArrowRight } from 'lucide-react';
import { approveContributionAction, rejectContributionAction } from '@/lib/api/campaigns/actions';

interface PendingContribution {
  _id: string;
  campaignId: string;
  campaignTitle: string;
  supporter_email: string;
  supporter_name: string;
  amount: number;
  status: 'pending';
  createdAt: string;
}

interface PendingContributionsTableProps {
  contributions: PendingContribution[];
}

export default function PendingContributionsTable({ contributions: initialContributions }: PendingContributionsTableProps) {
  const router = useRouter();
  const [contributions, setContributions] = useState<PendingContribution[]>(initialContributions);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  // View Details Modal State
  const [activeContrib, setActiveContrib] = useState<PendingContribution | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleApprove(id: string) {
    setIsProcessing(id);
    const toastId = toast.loading('Approving contribution...');
    try {
      const res = await approveContributionAction(id);
      if (res && res.error) {
        toast.error(res.error, { id: toastId });
      } else if (res && res.message && (res.message.includes('failed') || res.status === 400 || res.status === 500)) {
        toast.error(res.message, { id: toastId });
      } else {
        toast.success('Contribution approved successfully!', { id: toastId });
        setContributions((prev) => prev.filter((c) => c._id !== id));
        setIsModalOpen(false);
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to approve contribution', { id: toastId });
    } finally {
      setIsProcessing(null);
    }
  }

  async function handleReject(id: string) {
    setIsProcessing(id);
    const toastId = toast.loading('Rejecting contribution & refunding credits...');
    try {
      const res = await rejectContributionAction(id);
      if (res && res.error) {
        toast.error(res.error, { id: toastId });
      } else if (res && res.message && (res.message.includes('failed') || res.status === 400 || res.status === 500)) {
        toast.error(res.message, { id: toastId });
      } else {
        toast.success('Contribution rejected and supporter refunded.', { id: toastId });
        setContributions((prev) => prev.filter((c) => c._id !== id));
        setIsModalOpen(false);
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to reject contribution', { id: toastId });
    } finally {
      setIsProcessing(null);
    }
  }

  function openDetails(contrib: PendingContribution) {
    setActiveContrib(contrib);
    setIsModalOpen(true);
  }

  return (
    <div className="w-full">
      {contributions.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-14 text-center border border-dashed border-neutral-800 rounded-xl bg-neutral-950/10"
          style={{ borderRadius: '12px' }}
        >
          <FileText className="h-10 w-10 text-neutral-500 mb-3 opacity-40" />
          <h3 className="text-base font-bold text-neutral-200 mb-1">No pending contributions</h3>
          <p className="text-xs text-neutral-400 max-w-xs leading-normal">
            When supporters pledge credits to your campaigns, they will appear here for your review.
          </p>
        </div>
      ) : (
        <div
          className="overflow-x-auto w-full border border-neutral-800/80 rounded-xl bg-neutral-950/20"
          style={{ borderRadius: '12px' }}
        >
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-neutral-950/60 border-b border-neutral-800/80 text-neutral-400 font-semibold">
                <th className="px-6 py-4">Supporter</th>
                <th className="px-6 py-4">Campaign Title</th>
                <th className="px-6 py-4">Pledged Amount</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/40">
              {contributions.map((contrib) => (
                <tr
                  key={contrib._id}
                  className="hover:bg-[var(--primary)]/5 transition-colors duration-150"
                >
                  <td className="px-6 py-4 font-semibold text-white">
                    <div className="flex flex-col">
                      <span>{contrib.supporter_name}</span>
                      <span className="text-[10px] font-normal text-neutral-400">
                        {contrib.supporter_email}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-300 max-w-[200px] truncate">
                    {contrib.campaignTitle}
                  </td>
                  <td className="px-6 py-4 font-bold text-[var(--primary)] tabular-nums">
                    {contrib.amount.toLocaleString()} credits
                  </td>
                  <td className="px-6 py-4 text-neutral-400 text-xs">
                    {new Date(contrib.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      <button
                        onClick={() => openDetails(contrib)}
                        disabled={isProcessing !== null}
                        className="p-1.5 rounded-lg border border-neutral-700 hover:border-neutral-500 text-neutral-400 hover:text-white transition-all duration-150 cursor-pointer disabled:opacity-50"
                        style={{ borderRadius: '8px' }}
                        title="View pledge details"
                        aria-label="View details"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => handleApprove(contrib._id)}
                        disabled={isProcessing !== null}
                        className="p-1.5 rounded-lg border border-neutral-700 hover:border-[var(--success)] text-neutral-400 hover:text-[var(--success)] transition-all duration-150 cursor-pointer disabled:opacity-50"
                        style={{ borderRadius: '8px' }}
                        title="Approve pledge"
                        aria-label="Approve pledge"
                      >
                        <Check size={15} />
                      </button>
                      <button
                        onClick={() => handleReject(contrib._id)}
                        disabled={isProcessing !== null}
                        className="p-1.5 rounded-lg border border-neutral-700 hover:border-[var(--danger)] text-neutral-400 hover:text-[var(--danger)] transition-all duration-150 cursor-pointer disabled:opacity-50"
                        style={{ borderRadius: '8px' }}
                        title="Reject and refund pledge"
                        aria-label="Reject pledge"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── VIEW DETAILS MODAL ── */}
      {isModalOpen && activeContrib && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

          <div
            className="relative bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-[440px] p-6 shadow-2xl overflow-hidden animate-in fade-in scale-in-95 duration-200 z-50"
            style={{ borderRadius: '16px', padding: '24px' }}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-base font-bold text-white leading-tight">Pledge Details</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4 pt-4 text-sm">
              <div className="flex justify-between py-1.5 border-b border-neutral-800/40">
                <span className="text-neutral-400">Campaign Title</span>
                <span className="font-semibold text-white max-w-[220px] truncate text-right">
                  {activeContrib.campaignTitle}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-800/40">
                <span className="text-neutral-400">Supporter Name</span>
                <span className="font-semibold text-white text-right">
                  {activeContrib.supporter_name}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-800/40">
                <span className="text-neutral-400">Supporter Email</span>
                <span className="font-mono text-xs text-white text-right">
                  {activeContrib.supporter_email}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-800/40">
                <span className="text-neutral-400">Pledged Amount</span>
                <span className="font-bold text-[var(--primary)] text-right">
                  {activeContrib.amount.toLocaleString()} credits
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-800/40">
                <span className="text-neutral-400">Submitted On</span>
                <span className="text-white text-right">
                  {new Date(activeContrib.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Modal actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-neutral-800/50 mt-4">
              <button
                type="button"
                onClick={() => handleReject(activeContrib._id)}
                disabled={isProcessing !== null}
                className="px-4 py-2 border border-red-500/20 text-[var(--danger)] hover:bg-red-500/5 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                style={{ borderRadius: '8px' }}
              >
                Reject & Refund
              </button>
              <button
                type="button"
                onClick={() => handleApprove(activeContrib._id)}
                disabled={isProcessing !== null}
                className="px-5 py-2 bg-[var(--success)] hover:bg-[#15803D] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                style={{ borderRadius: '8px' }}
              >
                Approve Pledge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

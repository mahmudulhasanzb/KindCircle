'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Check, X, Eye, FileText } from 'lucide-react';
import { approveCampaignAction, rejectCampaignAction } from '@/lib/api/admin/actions';

interface Campaign {
  _id: string;
  title: string;
  story: string;
  category: string;
  funding_goal: number;
  minimum_contribution: number;
  deadline: string;
  image_url: string;
  creator_name: string;
  creator_email: string;
  status: 'pending';
  createdAt: string;
}

interface CampaignApprovalTableProps {
  campaigns: Campaign[];
}

export default function CampaignApprovalTable({ campaigns: initialCampaigns }: CampaignApprovalTableProps) {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  // Modal State
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleApprove(id: string) {
    setIsProcessing(id);
    const toastId = toast.loading('Approving campaign...');
    try {
      const res = await approveCampaignAction(id);
      if (res && res.error) {
        toast.error(res.error, { id: toastId });
      } else if (res && res.message && res.message.includes('failed')) {
        toast.error(res.message, { id: toastId });
      } else {
        toast.success('Campaign approved and live!', { id: toastId });
        setCampaigns((prev) => prev.filter((c) => c._id !== id));
        setIsModalOpen(false);
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to approve campaign', { id: toastId });
    } finally {
      setIsProcessing(null);
    }
  }

  async function handleReject(id: string) {
    setIsProcessing(id);
    const toastId = toast.loading('Rejecting campaign...');
    try {
      const res = await rejectCampaignAction(id);
      if (res && res.error) {
        toast.error(res.error, { id: toastId });
      } else if (res && res.message && res.message.includes('failed')) {
        toast.error(res.message, { id: toastId });
      } else {
        toast.success('Campaign rejected successfully.', { id: toastId });
        setCampaigns((prev) => prev.filter((c) => c._id !== id));
        setIsModalOpen(false);
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to reject campaign', { id: toastId });
    } finally {
      setIsProcessing(null);
    }
  }

  const openDetails = (c: Campaign) => {
    setActiveCampaign(c);
    setIsModalOpen(true);
  };

  if (campaigns.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-10 text-center text-sm text-neutral-500">
        No campaigns pending approval.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto rounded-2xl border border-neutral-800/70">
        <table className="w-full text-sm text-left">
          <thead className="bg-neutral-900/70">
            <tr className="border-b border-neutral-800/80">
              <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Campaign Info</th>
              <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Creator</th>
              <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Category</th>
              <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Goal & Min</th>
              <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800/60 bg-neutral-900/30">
            {campaigns.map((c) => (
              <tr key={c._id} className="hover:bg-neutral-800/20 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {c.image_url ? (
                      <img src={c.image_url} alt={c.title} className="h-10 w-16 object-cover rounded border border-neutral-850" />
                    ) : (
                      <div className="h-10 w-16 bg-neutral-800 rounded flex items-center justify-center text-neutral-500 text-xs">No image</div>
                    )}
                    <div className="min-w-0 max-w-[240px]">
                      <p className="font-semibold text-white truncate">{c.title}</p>
                      <p className="text-xs text-neutral-500 truncate mt-0.5">{c.story}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-neutral-300">
                  <div className="text-sm font-semibold">{c.creator_name}</div>
                  <div className="text-xs text-neutral-500 mt-0.5">{c.creator_email}</div>
                </td>
                <td className="px-5 py-4 text-neutral-400">
                  <span className="inline-flex rounded-full bg-neutral-800 px-2.5 py-0.5 text-xs font-medium text-neutral-300">
                    {c.category}
                  </span>
                </td>
                <td className="px-5 py-4 text-white">
                  <div className="text-xs font-semibold">{c.funding_goal.toLocaleString()} Credits Goal</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">Min Contribution: {c.minimum_contribution.toLocaleString()}</div>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openDetails(c)}
                      className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleApprove(c._id)}
                      disabled={isProcessing !== null}
                      className="p-2 rounded-lg text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 transition disabled:opacity-50 cursor-pointer"
                      title="Approve"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleReject(c._id)}
                      disabled={isProcessing !== null}
                      className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition disabled:opacity-50 cursor-pointer"
                      title="Reject"
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

      {/* Details Modal */}
      {isModalOpen && activeCampaign && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-neutral-900 border border-neutral-800/90 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-white">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">Campaign Review Details</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-white transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              {activeCampaign.image_url && (
                <img src={activeCampaign.image_url} alt={activeCampaign.title} className="w-full h-48 object-cover rounded-xl border border-neutral-800" />
              )}

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">Campaign Title</h4>
                <p className="text-white text-base font-bold">{activeCampaign.title}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Story / Description</h4>
                <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap">{activeCampaign.story}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-neutral-950/40 rounded-xl border border-neutral-800/60">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-0.5">Funding Goal</span>
                  <span className="text-white font-semibold text-sm">{activeCampaign.funding_goal.toLocaleString()} Credits</span>
                </div>
                <div className="p-3 bg-neutral-950/40 rounded-xl border border-neutral-800/60">
                  <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-0.5">Minimum Contribution</span>
                  <span className="text-white font-semibold text-sm">{activeCampaign.minimum_contribution.toLocaleString()} Credits</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">Creator Name</h4>
                  <p className="text-white text-sm">{activeCampaign.creator_name}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">Creator Email</h4>
                  <p className="text-white text-sm">{activeCampaign.creator_email}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-neutral-800 bg-neutral-950/20 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg text-neutral-400 hover:text-white transition cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => handleReject(activeCampaign._id)}
                disabled={isProcessing !== null}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition cursor-pointer"
              >
                Reject Campaign
              </button>
              <button
                onClick={() => handleApprove(activeCampaign._id)}
                disabled={isProcessing !== null}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition cursor-pointer"
              >
                Approve Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

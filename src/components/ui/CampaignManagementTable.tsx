'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Trash2, Eye } from 'lucide-react';
import { deleteCampaignAction } from '@/lib/api/admin/actions';

interface Campaign {
  _id: string;
  title: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  funding_goal: number;
  amount_raised: number;
  image_url: string;
  creator_name: string;
  creator_email: string;
  createdAt: string;
}

interface CampaignManagementTableProps {
  campaigns: Campaign[];
}

export default function CampaignManagementTable({ campaigns: initialCampaigns }: CampaignManagementTableProps) {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Are you sure you want to delete campaign: "${title}"? This will permanently remove it from the system.`)) {
      return;
    }

    setIsProcessing(id);
    const toastId = toast.loading('Deleting campaign...');
    try {
      const res = await deleteCampaignAction(id);
      if (res && res.error) {
        toast.error(res.error, { id: toastId });
      } else if (res && res.message && res.message.includes('failed')) {
        toast.error(res.message, { id: toastId });
      } else {
        toast.success('Campaign deleted successfully.', { id: toastId });
        setCampaigns((prev) => prev.filter((c) => c._id !== id));
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete campaign', { id: toastId });
    } finally {
      setIsProcessing(null);
    }
  }

  if (campaigns.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-10 text-center text-sm text-neutral-500">
        No campaigns found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-800/70">
      <table className="w-full text-sm text-left">
        <thead className="bg-neutral-900/70">
          <tr className="border-b border-neutral-800/80">
            <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Campaign Info</th>
            <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Creator</th>
            <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Status</th>
            <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Raised vs Goal</th>
            <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800/60 bg-neutral-900/30">
          {campaigns.map((c) => (
            <tr key={c._id} className="hover:bg-neutral-800/20 transition-colors">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  {c.image_url ? (
                    <img src={c.image_url} alt={c.title} className="h-10 w-16 object-cover rounded border border-neutral-800" />
                  ) : (
                    <div className="h-10 w-16 bg-neutral-800 rounded flex items-center justify-center text-neutral-500 text-xs">No image</div>
                  )}
                  <div className="min-w-0 max-w-[240px]">
                    <p className="font-semibold text-white truncate">{c.title}</p>
                    <p className="text-xs text-neutral-500 mt-0.5 capitalize">{c.category}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 text-neutral-300">
                <div className="text-sm font-semibold">{c.creator_name}</div>
                <div className="text-xs text-neutral-500 mt-0.5">{c.creator_email}</div>
              </td>
              <td className="px-5 py-4">
                {(() => {
                  const status = c.status || 'pending';
                  if (status === 'approved') {
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
              <td className="px-5 py-4 text-white">
                <div className="text-xs font-semibold">
                  {c.amount_raised.toLocaleString()} / {c.funding_goal.toLocaleString()} Credits
                </div>
                <div className="w-24 bg-neutral-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-primary h-full"
                    style={{ width: `${Math.min(100, (c.amount_raised / (c.funding_goal || 1)) * 100)}%` }}
                  />
                </div>
              </td>
              <td className="px-5 py-4 text-right">
                <button
                  onClick={() => handleDelete(c._id, c.title)}
                  disabled={isProcessing !== null}
                  className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition disabled:opacity-50 cursor-pointer"
                  title="Delete Campaign"
                >
                  <Trash2 className="h-4.5 w-4.5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

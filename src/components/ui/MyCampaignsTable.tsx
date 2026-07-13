'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Edit2, Trash2, X, Calendar, DollarSign, FolderHeart } from 'lucide-react';
import type { Campaign } from '@/lib/types/campaign';
import { updateCampaignAction, deleteCampaignAction } from '@/lib/api/campaigns/actions';

interface MyCampaignsTableProps {
  initialCampaigns: Campaign[];
}

export default function MyCampaignsTable({ initialCampaigns }: MyCampaignsTableProps) {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [isPending, startTransition] = useTransition();

  // Update Modal State
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);
  const [updateForm, setUpdateForm] = useState({
    title: '',
    story: '',
    reward_info: '',
  });

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<Campaign | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  function openUpdateModal(campaign: Campaign) {
    setActiveCampaign(campaign);
    setUpdateForm({
      title: campaign.title,
      story: campaign.story,
      reward_info: campaign.reward_info || '',
    });
    setIsUpdateModalOpen(true);
  }

  async function handleUpdateSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!activeCampaign) return;

    const { title, story, reward_info } = updateForm;
    if (!title.trim() || !story.trim() || !reward_info.trim()) {
      toast.error('All fields are required');
      return;
    }

    const toastId = toast.loading('Updating campaign details...');
    try {
      const res = await updateCampaignAction(activeCampaign._id, {
        title: title.trim(),
        story: story.trim(),
        reward_info: reward_info.trim(),
      });

      if (res && res.error) {
        toast.error(res.error, { id: toastId });
      } else if (res && res.message && (res.message.includes('failed') || res.status === 400 || res.status === 500)) {
        toast.error(res.message, { id: toastId });
      } else {
        toast.success('Campaign updated successfully!', { id: toastId });
        
        // Local state update
        setCampaigns((prev) =>
          prev.map((c) =>
            c._id === activeCampaign._id
              ? { ...c, title: title.trim(), story: story.trim(), reward_info: reward_info.trim() }
              : c
          )
        );
        setIsUpdateModalOpen(false);
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to update campaign', { id: toastId });
    }
  }

  function openDeleteModal(campaign: Campaign) {
    setCampaignToDelete(campaign);
    setIsDeleteModalOpen(true);
  }

  async function handleDeleteConfirm() {
    if (!campaignToDelete) return;
    setIsDeleting(true);
    const toastId = toast.loading('Deleting campaign & refunding contributors...');
    try {
      const res = await deleteCampaignAction(campaignToDelete._id);
      
      if (res && res.error) {
        toast.error(res.error, { id: toastId });
      } else if (res && res.message && (res.message.includes('failed') || res.status === 400 || res.status === 500)) {
        toast.error(res.message, { id: toastId });
      } else {
        toast.success('Campaign deleted and contributors refunded successfully!', { id: toastId });
        setCampaigns((prev) => prev.filter((c) => c._id !== campaignToDelete._id));
        setIsDeleteModalOpen(false);
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete campaign', { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="w-full">
      {/* ── Campaigns Table Wrapper ── */}
      {campaigns.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-neutral-800 rounded-xl bg-neutral-950/20" style={{ borderRadius: '12px' }}>
          <FolderHeart className="h-12 w-12 text-neutral-500 mb-4 opacity-40" />
          <h3 className="text-lg font-bold text-neutral-200 mb-1">No campaigns created yet</h3>
          <p className="text-sm text-neutral-400 mb-6 max-w-sm">
            Launch your first crowdfunding campaign to start raising credits for your project.
          </p>
          <button
            onClick={() => router.push('/dashboard/creator/add-campaign')}
            className="px-5 py-2.5 bg-[var(--primary)] text-white text-sm font-semibold rounded-lg hover:bg-[#4F46E5] transition-colors cursor-pointer"
            style={{ borderRadius: '8px' }}
          >
            Create New Campaign
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto w-full border border-neutral-800/80 rounded-xl bg-neutral-950/20" style={{ borderRadius: '12px' }}>
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-neutral-950/60 border-b border-neutral-800/80 text-neutral-400 font-semibold">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Credit Goal</th>
                <th className="px-6 py-4">Raised Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Deadline</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/40">
              {campaigns.map((campaign) => {
                const percent = campaign.funding_goal > 0
                  ? Math.min(Math.round((campaign.amount_raised / campaign.funding_goal) * 100), 100)
                  : 0;

                const statusClass = campaign.status === 'approved'
                  ? 'chip-approved'
                  : campaign.status === 'rejected'
                    ? 'chip-rejected'
                    : 'chip-pending';

                return (
                  <tr key={campaign._id} className="hover:bg-[var(--primary)]/5 transition-colors duration-150">
                    <td className="px-6 py-4.5 font-semibold text-white max-w-[200px] truncate">
                      {campaign.title}
                    </td>
                    <td className="px-6 py-4.5 capitalize text-neutral-300">
                      {campaign.category}
                    </td>
                    <td className="px-6 py-4.5 tabular-nums text-neutral-300">
                      {campaign.funding_goal.toLocaleString()}
                    </td>
                    <td className="px-6 py-4.5 tabular-nums">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-foreground">
                          {campaign.amount_raised.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-neutral-400">
                          {percent}% of goal
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4.5">
                      <span className={statusClass} style={{ fontSize: '10px', padding: '3px 10px' }}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-neutral-300">
                      {new Date(campaign.deadline).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4.5 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          onClick={() => openUpdateModal(campaign)}
                          className="p-1.5 rounded-lg border border-neutral-700 hover:border-primary text-neutral-400 hover:text-primary transition-all duration-150 cursor-pointer"
                          style={{ borderRadius: '8px' }}
                          title="Update campaign details"
                          aria-label="Edit campaign"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(campaign)}
                          className="p-1.5 rounded-lg border border-neutral-700 hover:border-danger text-neutral-400 hover:text-danger transition-all duration-150 cursor-pointer"
                          style={{ borderRadius: '8px' }}
                          title="Delete campaign"
                          aria-label="Delete campaign"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── UPDATE DETAILS MODAL ── */}
      {isUpdateModalOpen && activeCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsUpdateModalOpen(false)} />
          
          <div
            className="relative bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-[480px] p-6 shadow-2xl overflow-hidden animate-in fade-in scale-in-95 duration-200 z-50"
            style={{ borderRadius: '16px', padding: '24px' }}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-lg font-bold text-white leading-tight">
                Update Campaign Details
              </h3>
              <button
                onClick={() => setIsUpdateModalOpen(false)}
                className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4 pt-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-neutral-300">Campaign Title</label>
                <input
                  type="text"
                  value={updateForm.title}
                  onChange={(e) => setUpdateForm({ ...updateForm, title: e.target.value })}
                  required
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all duration-200"
                  style={{ borderRadius: '8px' }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-neutral-300">Campaign Story</label>
                <textarea
                  value={updateForm.story}
                  onChange={(e) => setUpdateForm({ ...updateForm, story: e.target.value })}
                  rows={4}
                  required
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all duration-200"
                  style={{ borderRadius: '8px' }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-neutral-300">Reward Details</label>
                <textarea
                  value={updateForm.reward_info}
                  onChange={(e) => setUpdateForm({ ...updateForm, reward_info: e.target.value })}
                  rows={3}
                  required
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all duration-200"
                  style={{ borderRadius: '8px' }}
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="px-4 py-2 border border-neutral-800 text-neutral-300 text-xs font-semibold rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                  style={{ borderRadius: '8px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[var(--primary)] hover:bg-[#4F46E5] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  style={{ borderRadius: '8px' }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION DIALOG MODAL ── */}
      {isDeleteModalOpen && campaignToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)} />
          
          <div
            className="relative bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-[440px] p-6 shadow-2xl animate-in fade-in scale-in-95 duration-200 z-50"
            style={{ borderRadius: '16px', padding: '24px' }}
          >
            <div className="flex items-center gap-3 text-red-500 mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
              </svg>
              <h3 className="text-lg font-bold text-white leading-tight">Delete Campaign?</h3>
            </div>

            <p className="text-sm text-neutral-300 mb-5 leading-relaxed">
              Are you sure you want to delete <strong>"{campaignToDelete.title}"</strong>? This action is permanent.
              All approved contributions will be refunded immediately, and the campaign will be deleted.
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
                className="px-4 py-2 border border-neutral-800 text-neutral-300 text-xs font-semibold rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                style={{ borderRadius: '8px' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className={`px-5 py-2 bg-[var(--danger)] text-white text-xs font-semibold rounded-lg hover:bg-[#DC2626] transition-colors flex items-center gap-2 cursor-pointer ${
                  isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                style={{ borderRadius: '8px' }}
              >
                {isDeleting ? 'Deleting...' : 'Delete and Refund'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

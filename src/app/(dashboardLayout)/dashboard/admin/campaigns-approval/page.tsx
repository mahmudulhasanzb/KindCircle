import React from 'react';
import { roleValidator } from '@/lib/api/session';
import { getPendingCampaigns } from '@/lib/api/admin/data';
import CampaignApprovalTable from '@/components/ui/CampaignApprovalTable';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Campaign Approvals — KindCircle',
  description: 'Approve or reject pending campaign submissions.',
};

export default async function AdminCampaignsApprovalPage() {
  await roleValidator('admin');

  let pendingCampaigns: any[] = [];
  try {
    pendingCampaigns = await getPendingCampaigns();
  } catch (error) {
    console.error('Failed to load pending campaigns:', error);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1.5 pb-5 border-b border-neutral-800/80">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Campaign Approvals
        </h1>
        <p className="text-sm text-neutral-400">
          Review newly submitted campaigns and make approval decisions.
        </p>
      </div>

      <CampaignApprovalTable campaigns={pendingCampaigns} />
    </div>
  );
}

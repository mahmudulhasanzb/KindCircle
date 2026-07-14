import React from 'react';
import { roleValidator } from '@/lib/api/session';
import { getAdminCampaigns } from '@/lib/api/admin/data';
import CampaignManagementTable from '@/components/ui/CampaignManagementTable';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Manage Campaigns — KindCircle',
  description: 'List or delete campaigns on KindCircle.',
};

export default async function AdminCampaignsPage() {
  await roleValidator('admin');

  let campaigns: any[] = [];
  try {
    campaigns = await getAdminCampaigns();
  } catch (error) {
    console.error('Failed to load campaigns:', error);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1.5 pb-5 border-b border-neutral-800/80">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Manage Campaigns
        </h1>
        <p className="text-sm text-neutral-400">
          View all active, pending, or rejected campaigns, and remove listings.
        </p>
      </div>

      <CampaignManagementTable campaigns={campaigns} />
    </div>
  );
}

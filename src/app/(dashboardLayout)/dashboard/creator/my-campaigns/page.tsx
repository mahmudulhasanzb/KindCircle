import React from 'react';
import MyCampaignsTable from '@/components/ui/MyCampaignsTable';
import { getCreatorCampaigns } from '@/lib/api/campaigns/data';
import { roleValidator, getUser } from '@/lib/api/session';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'My Campaigns — KindCircle Dashboard',
  description: 'Manage your campaigns on KindCircle. Update details or remove campaigns and refund contributors.',
};

export default async function MyCampaignsPage() {
  // 1. Verify creator role
  await roleValidator('creator');

  // 2. Fetch logged-in user
  const user = await getUser();
  if (!user || !user.id) {
    notFound();
  }

  // 3. Fetch campaigns for creator
  let initialCampaigns = [];
  try {
    initialCampaigns = await getCreatorCampaigns(user.id);
  } catch (error) {
    console.error('Failed to load campaigns:', error);
    initialCampaigns = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-neutral-800/80">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            My Campaigns
          </h1>
          <p className="text-sm text-neutral-400">
            View, edit, or delete campaigns you've created on KindCircle.
          </p>
        </div>
      </div>

      <MyCampaignsTable initialCampaigns={initialCampaigns} />
    </div>
  );
}

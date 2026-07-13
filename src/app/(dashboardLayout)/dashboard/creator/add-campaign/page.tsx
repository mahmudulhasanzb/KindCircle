import React from 'react';
import AddCampaignForm from '@/components/ui/AddCampaignForm';
import { roleValidator } from '@/lib/api/session';

export const metadata = {
  title: 'Add New Campaign — KindCircle Dashboard',
  description: 'Create a new fundraising campaign on KindCircle. Submit details, set a deadline and credit goal, and invite backing.',
};

export default async function AddCampaignPage() {
  // Validate that user is logged in and has the creator role
  await roleValidator('creator');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 pb-4 border-b border-neutral-800/80">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Create a New Campaign
        </h1>
        <p className="text-sm text-neutral-400">
          Set up your campaign details. It will go live after review by KindCircle moderators.
        </p>
      </div>

      <AddCampaignForm />
    </div>
  );
}

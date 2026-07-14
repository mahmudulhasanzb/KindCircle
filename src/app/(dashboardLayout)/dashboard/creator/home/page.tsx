import React from 'react';
import PendingContributionsTable from '@/components/ui/PendingContributionsTable';
import { getPendingContributions } from '@/lib/api/campaigns/data';
import { roleValidator, getUser } from '@/lib/api/session';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Creator Dashboard Home — KindCircle',
  description: 'Manage contributions to your crowdfunding campaigns and check stats.',
};

export default async function CreatorDashboardHome() {
  // 1. Verify creator role
  await roleValidator('creator');

  // 2. Fetch logged-in user details
  const user = await getUser();
  if (!user || !user.email) {
    notFound();
  }

  // 3. Fetch pending contributions to review
  let pendingContributions = [];
  try {
    pendingContributions = await getPendingContributions(user.email);
  } catch (error) {
    console.error('Failed to load pending contributions:', error);
    pendingContributions = [];
  }

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="flex flex-col gap-1.5 pb-5 border-b border-neutral-800/80">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Welcome back, {user.name || 'Creator'}!
        </h1>
        <p className="text-sm text-neutral-400">
          Here is an overview of pending support pledges awaiting your review.
        </p>
      </div>

      {/* Pending Contributions Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight">
          Contributions to Review
        </h2>
        <PendingContributionsTable contributions={pendingContributions} />
      </div>
    </div>
  );
}

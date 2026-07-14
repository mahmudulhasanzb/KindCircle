import React from 'react';
import PendingContributionsTable from '@/components/ui/PendingContributionsTable';
import DashboardStatCard from '@/components/ui/DashboardStatCard';
import CreatorStatsChart from '@/components/ui/CreatorStatsChart';
import { getPendingContributions, getCreatorStats } from '@/lib/api/campaigns/data';
import { roleValidator, getUser } from '@/lib/api/session';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Creator Dashboard Home — KindCircle',
  description: 'Manage contributions to your crowdfunding campaigns and check stats.',
};

// Lucide-style inline SVG icons (no extra dep needed)
function IconCampaigns() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconActive() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconRaised() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

export default async function CreatorDashboardHome() {
  await roleValidator('creator');

  const user = await getUser();
  if (!user || !user.email) {
    notFound();
  }

  let pendingContributions: any[] = [];
  let stats: any = { totalCampaigns: 0, activeCampaigns: 0, totalRaised: 0, campaigns: [] };

  await Promise.allSettled([
    getPendingContributions(user.email).then((d) => { pendingContributions = d; }).catch(() => {}),
    getCreatorStats(user.id).then((d) => { stats = d; }).catch(() => {}),
  ]);

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="flex flex-col gap-1.5 pb-5 border-b border-neutral-800/80">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Welcome back, {user.name || 'Creator'}!
        </h1>
        <p className="text-sm text-neutral-400">
          Here is an overview of your campaigns and pending support pledges.
        </p>
      </div>

      {/* Stats row — T-15.2 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <DashboardStatCard
          label="Total Campaigns"
          value={stats.totalCampaigns}
          icon={<IconCampaigns />}
          accent="primary"
        />
        <DashboardStatCard
          label="Active Campaigns"
          value={stats.activeCampaigns}
          icon={<IconActive />}
          accent="success"
        />
        <DashboardStatCard
          label="Total Raised (Credits)"
          value={stats.totalRaised.toLocaleString()}
          icon={<IconRaised />}
          accent="warning"
        />
      </div>

      {/* Charts Section */}
      <CreatorStatsChart campaigns={stats.campaigns || []} />

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

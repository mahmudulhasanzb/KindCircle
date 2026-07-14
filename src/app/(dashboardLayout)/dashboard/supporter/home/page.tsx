import React from 'react';
import DashboardStatCard from '@/components/ui/DashboardStatCard';
import { getSupporterStats } from '@/lib/api/campaigns/data';
import { roleValidator, getUser } from '@/lib/api/session';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Supporter Dashboard Home — KindCircle',
  description: 'Track your crowdfunding contributions and activity on KindCircle.',
};

function IconContributions() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function IconPending() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconApproved() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

type ApprovedContribution = {
  _id: string;
  campaignTitle: string;
  amount: number;
  creator_name: string;
  status: string;
  createdAt: string;
};

export default async function SupporterDashboardHome() {
  await roleValidator('supporter');

  const user = await getUser();
  if (!user || !user.email) {
    notFound();
  }

  let stats = {
    totalContributions: 0,
    pendingContributions: 0,
    totalApprovedAmount: 0,
    approvedContributions: [] as ApprovedContribution[],
  };

  try {
    stats = await getSupporterStats(user.email);
  } catch (error) {
    console.error('Failed to load supporter stats:', error);
  }

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="flex flex-col gap-1.5 pb-5 border-b border-neutral-800/80">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Welcome back, {user.name || 'Supporter'}!
        </h1>
        <p className="text-sm text-neutral-400">
          Here is an overview of your contribution activity on KindCircle.
        </p>
      </div>

      {/* Stat cards — T-15.4 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <DashboardStatCard
          label="Total Contributions"
          value={stats.totalContributions}
          icon={<IconContributions />}
          accent="primary"
        />
        <DashboardStatCard
          label="Pending Contributions"
          value={stats.pendingContributions}
          icon={<IconPending />}
          accent="warning"
        />
        <DashboardStatCard
          label="Total Approved (Credits)"
          value={stats.totalApprovedAmount.toLocaleString()}
          icon={<IconApproved />}
          accent="success"
        />
      </div>

      {/* Approved contributions table — T-15.5 */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-tight">
          Approved Contributions
        </h2>

        {stats.approvedContributions.length === 0 ? (
          <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/40 p-10 text-center">
            <p className="text-sm text-neutral-500">No approved contributions yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-neutral-800/60">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-neutral-800/80 bg-neutral-900/60">
                  <th className="px-5 py-3 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Campaign</th>
                  <th className="px-5 py-3 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Amount</th>
                  <th className="px-5 py-3 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Creator</th>
                  <th className="px-5 py-3 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Status</th>
                  <th className="px-5 py-3 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {stats.approvedContributions.map((c) => (
                  <tr key={c._id} className="bg-neutral-900/20 hover:bg-neutral-800/30 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-white">{c.campaignTitle}</td>
                    <td className="px-5 py-3.5 text-emerald-400 font-semibold">{c.amount} credits</td>
                    <td className="px-5 py-3.5 text-neutral-300">{c.creator_name}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/30">
                        Approved
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-neutral-500">
                      {new Date(c.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

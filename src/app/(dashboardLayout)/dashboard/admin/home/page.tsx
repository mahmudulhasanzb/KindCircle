import React, { Suspense } from 'react';
import { getAdminStats } from '@/lib/api/admin/data';

export const metadata = {
  title: 'Admin Dashboard — KindCircle',
  description: 'Overview of system growth, user metrics, and payment transactions.',
};

function IconSupporters() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconCreators() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function IconCredits() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  );
}

function IconPayments() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-neutral-800/70 bg-neutral-900/60 p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="h-4 bg-neutral-800 rounded w-1/2" />
            <div className="h-8 w-8 bg-neutral-800 rounded-lg" />
          </div>
          <div className="h-8 bg-neutral-800 rounded w-3/4" />
        </div>
      ))}
    </div>
  );
}

async function AdminStatsGrid() {
  let stats;
  try {
    stats = await getAdminStats();
  } catch (error) {
    console.error('Failed to fetch admin stats:', error);
    return (
      <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 text-center text-rose-400 text-sm">
        Failed to load system statistics. Please try again later.
      </div>
    );
  }

  const cardsData = [
    {
      label: 'Total Supporters',
      value: stats?.totalSupporters ?? 0,
      icon: <IconSupporters />,
      accent: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/5',
    },
    {
      label: 'Total Creators',
      value: stats?.totalCreators ?? 0,
      icon: <IconCreators />,
      accent: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5',
    },
    {
      label: 'Total System Credits',
      value: stats?.totalCredits.toLocaleString() ?? '0',
      icon: <IconCredits />,
      accent: 'border-amber-500/30 text-amber-400 bg-amber-500/5',
    },
    {
      label: 'Total Completed Payments',
      value: stats?.totalPayments ?? 0,
      icon: <IconPayments />,
      accent: 'border-rose-500/30 text-rose-400 bg-rose-500/5',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cardsData.map((card, index) => (
        <div
          key={index}
          className="rounded-2xl border border-neutral-800/70 bg-neutral-900/60 p-6 shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-neutral-400">
              {card.label}
            </span>
            <div className={`p-2 rounded-lg border ${card.accent}`}>
              {card.icon}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {card.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboardHomePage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1.5 pb-5 border-b border-neutral-800/80">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-sm text-neutral-400">
          Overview of system growth, user metrics, and payment transactions.
        </p>
      </div>

      <Suspense fallback={<StatsSkeleton />}>
        <AdminStatsGrid />
      </Suspense>
    </div>
  );
}

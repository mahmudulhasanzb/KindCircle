import React from 'react';
import SupporterContributionsTable from '@/components/ui/SupporterContributionsTable';
import { getSupporterContributions } from '@/lib/api/campaigns/data';
import { roleValidator, getUser } from '@/lib/api/session';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'My Contributions — KindCircle',
  description: 'View and track all crowdfunding pledges you have made to campaigns on KindCircle.',
};

interface SupporterContributionsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function SupporterContributionsPage({ searchParams }: SupporterContributionsPageProps) {
  // 1. Verify supporter role
  await roleValidator('supporter');

  // 2. Fetch logged-in supporter info
  const user = await getUser();
  if (!user || !user.email) {
    notFound();
  }

  // 3. Resolve search params page
  const params = await searchParams;
  const page = parseInt(params.page || '1') || 1;
  const limit = 5; // 5 contributions per page as required

  // 4. Fetch contributions data
  let data: {
    contributions: any[];
    total: number;
    totalPages: number;
    currentPage: number;
  } = {
    contributions: [],
    total: 0,
    totalPages: 1,
    currentPage: 1,
  };

  try {
    data = await getSupporterContributions(user.email, page, limit);
  } catch (error) {
    console.error('Failed to load contributions:', error);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 pb-4 border-b border-neutral-800/80">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          My Contributions
        </h1>
        <p className="text-sm text-neutral-400">
          Track and review all crowdfunding support pledges you have placed on KindCircle.
        </p>
      </div>

      <SupporterContributionsTable
        contributions={data.contributions}
        total={data.total}
        totalPages={data.totalPages}
        currentPage={data.currentPage}
      />
    </div>
  );
}

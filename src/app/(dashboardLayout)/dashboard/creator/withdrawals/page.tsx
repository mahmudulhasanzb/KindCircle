import React from 'react';
import { roleValidator, getUser } from '@/lib/api/session';
import { redirect } from 'next/navigation';
import { MongoClient } from 'mongodb';
import DashboardStatCard from '@/components/ui/DashboardStatCard';
import WithdrawalForm from '@/components/ui/WithdrawalForm';

export const metadata = {
  title: 'Withdrawals — KindCircle',
  description: 'Withdraw campaign credits to real currency.',
};

function IconCredits() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

function IconUsd() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

export default async function CreatorWithdrawalsPage() {
  await roleValidator('creator');

  const sessionUser = await getUser();
  if (!sessionUser?.email) {
    redirect('/signin');
  }

  // Fetch up-to-date credits from database directly
  const client = new MongoClient(process.env.MONGODB_URI as string);
  await client.connect();
  const db = client.db('KindCircle');
  const userDoc = await db.collection('user').findOne({ email: sessionUser.email });
  await client.close();

  const currentCredits = userDoc?.credits || 0;
  const equivalentUsd = currentCredits / 20;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1.5 pb-5 border-b border-neutral-800/80">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Withdrawals
        </h1>
        <p className="text-sm text-neutral-400">
          Request credit payouts and manage your cash balance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DashboardStatCard
          label="Available Balance"
          value={`${currentCredits.toLocaleString()} credits`}
          icon={<IconCredits />}
          accent="primary"
        />
        <DashboardStatCard
          label="Equivalent USD"
          value={`$${equivalentUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          icon={<IconUsd />}
          accent="success"
        />
      </div>

      <WithdrawalForm currentCredits={currentCredits} />
    </div>
  );
}

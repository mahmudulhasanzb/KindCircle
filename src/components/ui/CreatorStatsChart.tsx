'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface CampaignData {
  title: string;
  funding_goal: number;
  amount_raised: number;
}

interface CreatorStatsChartProps {
  campaigns: CampaignData[];
}

export default function CreatorStatsChart({ campaigns }: CreatorStatsChartProps) {
  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-10 text-center text-sm text-neutral-500">
        No campaigns yet to display trend charts.
      </div>
    );
  }

  // Map campaigns to short title for charts
  const data = campaigns.map((c) => ({
    name: c.title.length > 20 ? c.title.slice(0, 17) + '...' : c.title,
    'Funding Goal': c.funding_goal,
    'Amount Raised': c.amount_raised,
  }));

  return (
    <div className="rounded-2xl border border-neutral-800/70 bg-neutral-900/30 p-6 space-y-4">
      <div>
        <h3 className="text-base font-bold text-white">Campaign Progress Comparison</h3>
        <p className="text-xs text-neutral-400 mt-0.5">Raised vs. target goal per campaign</p>
      </div>

      <div className="w-full h-80 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
            <XAxis dataKey="name" stroke="#737373" tickLine={false} />
            <YAxis stroke="#737373" tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#171717',
                border: '1px solid #262626',
                borderRadius: '8px',
                color: '#ffffff',
              }}
            />
            <Legend wrapperStyle={{ paddingTop: 10 }} />
            <Bar dataKey="Amount Raised" fill="#a855f7" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Funding Goal" fill="#06b6d4" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

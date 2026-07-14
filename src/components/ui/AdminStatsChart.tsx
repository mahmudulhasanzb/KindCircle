'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

interface TrendData {
  date: string;
  amount: number;
}

interface AdminStatsChartProps {
  trends: TrendData[];
}

export default function AdminStatsChart({ trends }: AdminStatsChartProps) {
  if (!trends || trends.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-10 text-center text-sm text-neutral-500">
        No contribution data recorded yet.
      </div>
    );
  }

  // Format dates for display
  const formattedData = trends.map((t) => ({
    ...t,
    displayDate: new Date(t.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
  }));

  return (
    <div className="rounded-2xl border border-neutral-800/70 bg-neutral-900/30 p-6 space-y-4">
      <div>
        <h3 className="text-base font-bold text-white">Contribution Volume Trend</h3>
        <p className="text-xs text-neutral-400 mt-0.5">Daily approved platform contributions</p>
      </div>

      <div className="w-full h-80 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedData}
            margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
            <XAxis dataKey="displayDate" stroke="#737373" tickLine={false} />
            <YAxis stroke="#737373" tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#171717',
                border: '1px solid #262626',
                borderRadius: '8px',
                color: '#ffffff',
              }}
            />
            <Area type="monotone" dataKey="amount" name="Contribution (Credits)" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorAmount)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

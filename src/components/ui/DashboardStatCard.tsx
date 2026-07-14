'use client';

import React from 'react';

interface DashboardStatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent?: 'primary' | 'success' | 'warning' | 'info';
}

const accentMap: Record<string, { border: string; iconBg: string; iconText: string; valueText: string }> = {
  primary: {
    border: 'border-[--color-primary]/30',
    iconBg: 'bg-[--color-primary]/10',
    iconText: 'text-[--color-primary]',
    valueText: 'text-[--color-primary]',
  },
  success: {
    border: 'border-emerald-500/30',
    iconBg: 'bg-emerald-500/10',
    iconText: 'text-emerald-400',
    valueText: 'text-emerald-400',
  },
  warning: {
    border: 'border-amber-500/30',
    iconBg: 'bg-amber-500/10',
    iconText: 'text-amber-400',
    valueText: 'text-amber-400',
  },
  info: {
    border: 'border-sky-500/30',
    iconBg: 'bg-sky-500/10',
    iconText: 'text-sky-400',
    valueText: 'text-sky-400',
  },
};

export default function DashboardStatCard({
  label,
  value,
  icon,
  accent = 'primary',
}: DashboardStatCardProps) {
  const styles = accentMap[accent];

  return (
    <div
      className={`flex items-center gap-4 rounded-xl border ${styles.border} bg-neutral-900/60 p-5 transition-transform hover:-translate-y-0.5`}
    >
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${styles.iconBg} ${styles.iconText}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">{label}</p>
        <p className={`mt-0.5 text-2xl font-bold tracking-tight ${styles.valueText}`}>{value}</p>
      </div>
    </div>
  );
}

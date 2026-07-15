'use client';

import React from 'react';

interface DashboardStatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent?: 'primary' | 'success' | 'warning' | 'info';
  trend?: { value: number; label: string };
}

const accentMap: Record<string, {
  gradient: string;
  glow: string;
  iconBg: string;
  valueText: string;
  badge: string;
  badgeText: string;
}> = {
  primary: {
    gradient: 'from-[#6366F1] to-[#818CF8]',
    glow: 'rgba(99,102,241,0.35)',
    iconBg: 'rgba(99,102,241,0.15)',
    valueText: '#818CF8',
    badge: 'rgba(99,102,241,0.12)',
    badgeText: '#818CF8',
  },
  success: {
    gradient: 'from-[#22C55E] to-[#4ADE80]',
    glow: 'rgba(34,197,94,0.35)',
    iconBg: 'rgba(34,197,94,0.12)',
    valueText: '#4ADE80',
    badge: 'rgba(34,197,94,0.12)',
    badgeText: '#4ADE80',
  },
  warning: {
    gradient: 'from-[#F59E0B] to-[#FBBF24]',
    glow: 'rgba(245,158,11,0.35)',
    iconBg: 'rgba(245,158,11,0.12)',
    valueText: '#FBBF24',
    badge: 'rgba(245,158,11,0.12)',
    badgeText: '#FBBF24',
  },
  info: {
    gradient: 'from-[#0EA5E9] to-[#38BDF8]',
    glow: 'rgba(14,165,233,0.35)',
    iconBg: 'rgba(14,165,233,0.12)',
    valueText: '#38BDF8',
    badge: 'rgba(14,165,233,0.12)',
    badgeText: '#38BDF8',
  },
};

export default function DashboardStatCard({
  label,
  value,
  icon,
  accent = 'primary',
  trend,
}: DashboardStatCardProps) {
  const s = accentMap[accent];

  return (
    <div
      className="group relative flex flex-col gap-4 p-6 rounded-2xl border border-white/8 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.04)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${s.glow} 0%, transparent 60%)`, opacity: 0 }}
      />

      {/* Corner orb */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${s.glow}, transparent 70%)` }}
      />

      {/* Icon + label row */}
      <div className="flex items-start justify-between relative z-10">
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${s.gradient} text-white`}
          style={{ boxShadow: `0 4px 16px ${s.glow}` }}
        >
          {icon}
        </div>
        {trend && (
          <span
            className="text-[11px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: s.badge, color: s.badgeText }}
          >
            {trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}
          </span>
        )}
      </div>

      {/* Value + label */}
      <div className="relative z-10">
        <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">{label}</p>
        <p
          className="text-3xl font-black tracking-tight tabular-nums"
          style={{ color: s.valueText }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

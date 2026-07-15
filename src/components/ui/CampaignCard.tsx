'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Campaign } from '@/lib/types/campaign';

interface CampaignCardProps {
  campaign: Campaign;
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const percent =
    campaign.funding_goal > 0
      ? Math.min(Math.round((campaign.amount_raised / campaign.funding_goal) * 100), 100)
      : 0;

  const progressGradient =
    percent >= 100
      ? 'from-[#22C55E] to-[#4ADE80]'
      : percent >= 50
      ? 'from-[#6366F1] to-[#818CF8]'
      : 'from-[#0EA5E9] to-[#38BDF8]';

  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(campaign.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );

  return (
    <Link
      href={`/campaigns/${campaign._id}`}
      id={`campaign-card-${campaign._id}`}
      className="group relative flex flex-col rounded-2xl border border-white/8 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-white/15 h-full"
      style={{
        background: 'rgba(255,255,255,0.04)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
        willChange: 'transform',
      }}
      aria-label={`View campaign: ${campaign.title}`}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none -z-10"
        style={{ background: 'rgba(99,102,241,0.4)', transform: 'scale(0.9) translateY(16px)' }}
      />

      {/* Cover Image */}
      <div className="relative w-full h-[190px] bg-white/5 flex-shrink-0 overflow-hidden">
        {campaign.image_url ? (
          <Image
            src={campaign.image_url}
            alt={campaign.title}
            height={190}
            width={400}
            className="object-cover transition-transform duration-500 group-hover:scale-105 w-full h-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/8">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" opacity="0.3" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Category badge */}
        <span className="absolute top-3 left-3 chip-funded capitalize" style={{ fontSize: '10px', padding: '3px 10px' }}>
          {campaign.category}
        </span>

        {/* Days left badge */}
        <span
          className="absolute top-3 right-3 text-[10px] font-bold text-white px-2.5 py-1 rounded-full"
          style={{ background: daysLeft === 0 ? 'rgba(239,68,68,0.7)' : 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
        >
          {daysLeft === 0 ? 'Last day!' : `${daysLeft}d left`}
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-col p-5 flex-grow">
        <h3
          className="text-base font-bold text-white mb-1 line-clamp-2"
          style={{ lineHeight: 1.35 }}
        >
          {campaign.title}
        </h3>
        <p className="text-xs text-white/40 mb-5">by {campaign.creator_name}</p>

        {/* Progress bar */}
        <div
          className="w-full bg-white/8 rounded-full mb-3 overflow-hidden"
          style={{ height: '6px' }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${percent}% funded`}
        >
          <div
            className={`h-full rounded-full bg-gradient-to-r ${progressGradient}`}
            style={{ width: `${percent}%`, transition: 'width 0.8s ease' }}
          />
        </div>

        {/* Footer stats */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-lg font-black text-white tabular-nums">
              {campaign.amount_raised.toLocaleString()}
            </span>
            <span className="text-xs text-white/40 ml-1.5">credits raised</span>
          </div>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(99,102,241,0.15)', color: '#818CF8' }}
          >
            {percent}%
          </span>
        </div>
      </div>
    </Link>
  );
}

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

  const progressColor =
    percent >= 100
      ? 'var(--success)'
      : percent >= 50
      ? 'var(--primary)'
      : 'var(--secondary)';

  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(campaign.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );

  return (
    <Link
      href={`/campaigns/${campaign._id}`}
      id={`campaign-card-${campaign._id}`}
      className="group flex flex-col rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-white/5 overflow-hidden transition-all duration-200 hover:shadow-[0_4px_12px_rgba(99,102,241,0.15)] hover:-translate-y-0.5 cursor-pointer h-full"
      style={{ borderRadius: '12px', willChange: 'transform' }}
      aria-label={`View campaign: ${campaign.title}`}
    >
      {/* Cover Image */}
      <div className="relative w-full h-[180px] bg-neutral-200 dark:bg-neutral-700 flex-shrink-0 overflow-hidden">
        {campaign.image_url ? (
          <Image
            src={campaign.image_url}
            alt={campaign.title}
            height={180}
            width={400}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[var(--primary)]/10">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="1.5"
              opacity="0.4"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}

        {/* Category badge */}
        <span
          className="absolute top-3 left-3 chip-funded capitalize"
          style={{ fontSize: '10px', padding: '3px 10px' }}
        >
          {campaign.category}
        </span>

        {/* Days left badge */}
        <span
          className="absolute top-3 right-3 text-[10px] font-semibold text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full"
          style={{ borderRadius: '9999px' }}
        >
          {daysLeft === 0 ? 'Last day!' : `${daysLeft}d left`}
        </span>
      </div>

      {/* Card body */}
      <div className="flex flex-col p-5 flex-grow" style={{ padding: '20px' }}>
        <h3
          className="text-[1.125rem] font-semibold text-foreground mb-1 line-clamp-2"
          style={{ lineHeight: 1.3 }}
        >
          {campaign.title}
        </h3>
        <p className="text-xs text-[var(--text-secondary)] mb-4">by {campaign.creator_name}</p>

        {/* Progress bar */}
        <div
          className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full mb-2 overflow-hidden"
          style={{ height: '8px', borderRadius: '9999px' }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${percent}% funded`}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${percent}%`,
              backgroundColor: progressColor,
              transition: 'width 0.6s ease',
              borderRadius: '9999px',
            }}
          />
        </div>

        {/* Footer stats */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div>
            <span className="text-lg font-bold text-[var(--primary)] tabular-nums">
              {campaign.amount_raised.toLocaleString()}
            </span>
            <span className="text-xs text-[var(--text-secondary)] ml-1">credits raised</span>
          </div>
          <span className="text-xs font-semibold text-[var(--text-secondary)]">{percent}%</span>
        </div>
      </div>
    </Link>
  );
}

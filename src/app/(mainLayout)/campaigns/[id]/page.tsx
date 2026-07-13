import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCampaignDetail } from '@/lib/api/campaigns/data';
import { getUser } from '@/lib/api/session';
import ContributionForm from '@/components/ui/ContributionForm';

interface CampaignDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CampaignDetailPageProps) {
  const { id } = await params;
  try {
    const campaign = await getCampaignDetail(id);
    return {
      title: `${campaign.title} — KindCircle`,
      description: campaign.story.slice(0, 160),
    };
  } catch {
    return {
      title: 'Campaign Detail — KindCircle',
    };
  }
}

export default async function CampaignDetailPage({ params }: CampaignDetailPageProps) {
  const { id } = await params;
  
  // Fetch campaign and user in parallel
  const [campaignResult, user] = await Promise.allSettled([
    getCampaignDetail(id),
    getUser(),
  ]);

  if (campaignResult.status === 'rejected') {
    notFound();
  }

  const campaign = campaignResult.value;
  const loggedInUser = user.status === 'fulfilled' ? user.value : null;

  const percent = campaign.funding_goal > 0
    ? Math.min(Math.round((campaign.amount_raised / campaign.funding_goal) * 100), 100)
    : 0;

  const progressColor = percent >= 100 
    ? 'var(--success)' 
    : percent >= 50 
      ? 'var(--primary)' 
      : 'var(--secondary)';

  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(campaign.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );

  return (
    <div className="page-enter flex-grow w-full">
      {/* ── Breadcrumb & Category Header ── */}
      <div className="max-w-[1280px] mx-auto px-4 pt-8 pb-4">
        <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-3">
          <Link href="/" className="hover:text-foreground transition-colors duration-150">Home</Link>
          <span>/</span>
          <Link href="/campaigns" className="hover:text-foreground transition-colors duration-150">Campaigns</Link>
          <span>/</span>
          <span className="text-foreground font-medium line-clamp-1">{campaign.title}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="chip-funded capitalize" style={{ fontSize: '11px', padding: '4px 12px' }}>
            {campaign.category}
          </span>
          <p className="text-xs text-[var(--text-secondary)]">
            Created on {new Date(campaign.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* ── Campaign Title Area ── */}
      <div className="max-w-[1280px] mx-auto px-4 pb-8">
        <h1 className="text-[1.875rem] md:text-[2.5rem] font-bold text-foreground mb-2" style={{ lineHeight: 1.2 }}>
          {campaign.title}
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          by <span className="font-medium text-foreground">{campaign.creator_name}</span> ({campaign.creator_email})
        </p>
      </div>

      {/* ── Two-Column Layout ── */}
      <div className="max-w-[1280px] mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Details (Main Content) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Banner Image */}
            <div className="relative w-full aspect-[16/9] rounded-xl bg-neutral-200 dark:bg-neutral-800 overflow-hidden" style={{ borderRadius: '12px' }}>
              {campaign.image_url ? (
                <Image
                  src={campaign.image_url}
                  alt={campaign.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 840px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[var(--primary)]/10">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" opacity="0.4" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
              )}
            </div>

            {/* Campaign Story */}
            <article className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground border-b border-neutral-200 dark:border-neutral-800 pb-2">
                Campaign Story
              </h2>
              <p className="text-sm text-[var(--text-secondary)] whitespace-pre-wrap leading-relaxed" style={{ fontSize: '15px' }}>
                {campaign.story}
              </p>
            </article>

            {/* Rewards Info */}
            <div className="p-5 bg-neutral-100 dark:bg-neutral-800/40 border border-white/5 rounded-xl space-y-3" style={{ borderRadius: '12px', padding: '20px' }}>
              <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                Reward Details
              </h3>
              <p className="text-sm text-[var(--text-secondary)] whitespace-pre-wrap leading-relaxed">
                {campaign.reward_info || 'No reward details provided for this campaign.'}
              </p>
            </div>
          </div>

          {/* Right Column: Sidebar (Stats & Contribution form) */}
          <div className="space-y-6">
            
            {/* Stats Card */}
            <div className="p-5 bg-neutral-100 dark:bg-neutral-800 border border-white/5 rounded-xl space-y-5 shadow-sm" style={{ borderRadius: '12px', padding: '20px' }}>
              
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[2rem] font-bold text-foreground tabular-nums leading-none">
                    {campaign.amount_raised.toLocaleString()}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)]">credits raised</span>
                </div>
                <div className="flex justify-between text-xs text-[var(--text-secondary)] font-medium">
                  <span>Goal: {campaign.funding_goal.toLocaleString()} credits</span>
                  <span>{percent}%</span>
                </div>
                
                {/* Progress bar track */}
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden" style={{ height: '8px', borderRadius: '9999px' }}>
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
              </div>

              {/* Sidebar stats breakdown */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-neutral-200 dark:border-neutral-700/50">
                <div>
                  <p className="text-xs text-[var(--text-secondary)] font-medium">Backers</p>
                  <p className="text-lg font-bold text-foreground tabular-nums">
                    {campaign.backerCount || 0}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--text-secondary)] font-medium">Time Left</p>
                  <p className="text-lg font-bold text-foreground">
                    {daysLeft === 0 ? 'Last day!' : `${daysLeft} day${daysLeft !== 1 ? 's' : ''}`}
                  </p>
                </div>
              </div>

              {/* Status banner (e.g. expired, pending approval etc) */}
              {daysLeft === 0 && (
                <div className="bg-red-500/10 border border-red-500/20 text-[var(--danger)] text-center p-2.5 rounded-lg text-xs font-semibold">
                  This campaign has ended.
                </div>
              )}
            </div>

            {/* Contribution Form */}
            {daysLeft > 0 && (
              <ContributionForm
                campaignId={campaign._id}
                minimumContribution={campaign.minimum_contribution}
                creatorEmail={campaign.creator_email}
                user={loggedInUser}
              />
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

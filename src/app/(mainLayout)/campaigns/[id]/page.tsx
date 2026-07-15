import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCampaignDetail } from '@/lib/api/campaigns/data';
import { getUser } from '@/lib/api/session';
import ContributionForm from '@/components/ui/ContributionForm';
import ReportCampaignButton from '@/components/ui/ReportCampaignButton';

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
    return { title: 'Campaign Detail — KindCircle' };
  }
}

export default async function CampaignDetailPage({ params }: CampaignDetailPageProps) {
  const { id } = await params;

  const [campaignResult, user] = await Promise.allSettled([
    getCampaignDetail(id),
    getUser(),
  ]);

  if (campaignResult.status === 'rejected') notFound();

  const campaign = campaignResult.value;
  const loggedInUser = user.status === 'fulfilled' ? user.value : null;

  const percent = campaign.funding_goal > 0
    ? Math.min(Math.round((campaign.amount_raised / campaign.funding_goal) * 100), 100)
    : 0;

  const progressGradient =
    percent >= 100 ? 'from-[#22C55E] to-[#4ADE80]' :
    percent >= 50 ? 'from-[#6366F1] to-[#818CF8]' :
    'from-[#0EA5E9] to-[#38BDF8]';

  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(campaign.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );

  return (
    <div className="page-enter flex-grow w-full bg-neutral-950 min-h-screen">
      {/* Hero section */}
      <div className="relative overflow-hidden py-10 px-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.1) 0%, transparent 60%)' }}
        />
        <div className="relative max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/35 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/campaigns" className="hover:text-white transition-colors">Campaigns</Link>
            <span>/</span>
            <span className="text-white/60 line-clamp-1">{campaign.title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="chip-funded capitalize" style={{ fontSize: '11px', padding: '4px 12px' }}>
              {campaign.category}
            </span>
            <p className="text-xs text-white/35">
              Created on {new Date(campaign.createdAt).toLocaleDateString()}
            </p>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white mb-2" style={{ lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            {campaign.title}
          </h1>
          <p className="text-sm text-white/45">
            by <span className="font-bold text-white/70">{campaign.creator_name}</span>{' '}
            <span className="text-white/30">({campaign.creator_email})</span>
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Banner Image */}
            <div
              className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
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
                <div className="w-full h-full flex items-center justify-center">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" opacity="0.3" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
              )}
            </div>

            {/* Campaign Story */}
            <article
              className="rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <h2 className="text-base font-black text-white/80 uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-[#6366F1]" />
                Campaign Story
              </h2>
              <p className="text-sm text-white/55 whitespace-pre-wrap" style={{ lineHeight: 1.8, fontSize: '15px' }}>
                {campaign.story}
              </p>
            </article>

            {/* Rewards Info */}
            <div
              className="rounded-2xl p-6 space-y-3"
              style={{ background: 'rgba(245,158,11,0.04)', border: '1px solid rgba(245,158,11,0.15)' }}
            >
              <h3 className="text-sm font-black text-[#FBBF24]/80 uppercase tracking-widest flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                Reward Details
              </h3>
              <p className="text-sm text-white/50 whitespace-pre-wrap" style={{ lineHeight: 1.7 }}>
                {campaign.reward_info || 'No reward details provided for this campaign.'}
              </p>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-5">
            {/* Stats Card */}
            <div
              className="rounded-2xl p-6 space-y-5"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 4px 32px rgba(0,0,0,0.25)',
              }}
            >
              {/* Amount raised */}
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-black text-white tabular-nums">
                    {campaign.amount_raised.toLocaleString()}
                  </span>
                  <span className="text-sm text-white/40">credits raised</span>
                </div>
                <p className="text-xs text-white/35 mb-3">
                  of {campaign.funding_goal.toLocaleString()} credit goal
                </p>

                {/* Progress bar */}
                <div
                  className="w-full bg-white/8 rounded-full overflow-hidden"
                  style={{ height: '8px' }}
                  role="progressbar"
                  aria-valuenow={percent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${progressGradient}`}
                    style={{ width: `${percent}%`, transition: 'width 0.8s ease' }}
                  />
                </div>
                <div className="flex justify-between text-xs text-white/30 mt-1.5 font-semibold">
                  <span>Funded</span>
                  <span>{percent}%</span>
                </div>
              </div>

              {/* Backers / Time left */}
              <div className="grid grid-cols-2 gap-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <p className="text-2xl font-black text-white tabular-nums">{campaign.backerCount || 0}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mt-0.5">Backers</p>
                </div>
                <div className="text-center p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <p className="text-2xl font-black text-white">
                    {daysLeft === 0 ? '0' : daysLeft}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/35 mt-0.5">
                    {daysLeft === 0 ? 'Ended' : 'Days Left'}
                  </p>
                </div>
              </div>

              {daysLeft === 0 && (
                <div
                  className="text-center p-3 rounded-xl text-xs font-bold text-[#EF4444]"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
                >
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

            {/* Report button */}
            {loggedInUser?.role === 'supporter' && (
              <ReportCampaignButton
                campaignId={campaign._id}
                reporterName={loggedInUser.name}
                reporterEmail={loggedInUser.email}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

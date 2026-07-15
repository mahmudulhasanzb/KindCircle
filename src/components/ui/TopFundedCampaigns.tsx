'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { TopCampaign } from '@/lib/api/home/data';

interface TopFundedCampaignsProps {
  campaigns: TopCampaign[];
}

function CampaignCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden animate-pulse" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="h-[200px] bg-white/5" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-white/8 rounded w-3/4" />
        <div className="h-3 bg-white/5 rounded w-1/2" />
        <div className="h-2 bg-white/8 rounded w-full mt-4" />
        <div className="h-4 bg-white/5 rounded w-1/3" />
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function TopFundedCampaigns({ campaigns }: TopFundedCampaignsProps) {
  const isLoading = !campaigns || campaigns.length === 0;

  return (
    <section className="relative py-24 px-4 bg-neutral-900 overflow-hidden" aria-labelledby="top-funded-title">
      {/* Ambient orb */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
            style={{
              background: 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.3)',
              color: '#818CF8',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] animate-pulse" />
            Trending Now
          </span>
          <h2
            id="top-funded-title"
            className="text-3xl md:text-5xl font-black text-white mb-4"
            style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}
          >
            Top Funded{' '}
            <span style={{ background: 'linear-gradient(90deg, #6366F1, #0EA5E9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Campaigns
            </span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-lg mx-auto" style={{ lineHeight: 1.7 }}>
            Discover the campaigns that have inspired the most support from our community.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <CampaignCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {campaigns.map((campaign, idx) => {
              const percent = campaign.funding_goal > 0
                ? Math.min(Math.round((campaign.amount_raised / campaign.funding_goal) * 100), 100)
                : 0;

              const progressGradient =
                percent >= 100
                  ? 'from-[#22C55E] to-[#4ADE80]'
                  : percent >= 50
                  ? 'from-[#6366F1] to-[#818CF8]'
                  : 'from-[#0EA5E9] to-[#38BDF8]';

              return (
                <motion.div
                  key={campaign._id}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="group relative"
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'rgba(99,102,241,0.3)', transform: 'scale(0.9) translateY(12px)' }}
                  />

                  <div
                    className="relative flex flex-col rounded-2xl border border-white/8 overflow-hidden"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      boxShadow: '0 4px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)',
                    }}
                  >
                    {/* Cover Image */}
                    <div className="relative w-full h-[200px] overflow-hidden flex-shrink-0 bg-white/5">
                      {campaign.image_url ? (
                        <Image
                          src={campaign.image_url}
                          alt={campaign.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary/10">
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" opacity="0.3" aria-hidden="true">
                            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
                          </svg>
                        </div>
                      )}
                      {/* Gradient overlay on image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* Category badge */}
                      <span className="absolute top-3 left-3 chip-funded text-[10px] capitalize" style={{ fontSize: '10px', padding: '3px 10px' }}>
                        {campaign.category}
                      </span>

                      {/* Rank badge */}
                      {idx < 3 && (
                        <span
                          className="absolute top-3 right-3 flex items-center justify-center w-7 h-7 rounded-full text-xs font-black text-white"
                          style={{ background: idx === 0 ? '#F59E0B' : idx === 1 ? '#94A3B8' : '#CD7C2F' }}
                        >
                          #{idx + 1}
                        </span>
                      )}
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
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* View all CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link
            href="/campaigns"
            id="view-all-campaigns"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #6366F1, #0EA5E9)',
              boxShadow: '0 8px 32px rgba(99,102,241,0.35)',
            }}
          >
            View All Campaigns
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

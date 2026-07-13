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
    <div className="rounded-xl bg-neutral-100 dark:bg-neutral-800 overflow-hidden animate-pulse" style={{ borderRadius: '12px' }}>
      <div className="h-[180px] bg-neutral-200 dark:bg-neutral-700" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4" />
        <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2" />
        <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded w-full mt-4" />
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3" />
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

export default function TopFundedCampaigns({ campaigns }: TopFundedCampaignsProps) {
  const isLoading = !campaigns || campaigns.length === 0;

  return (
    <section className="py-16 px-4" aria-labelledby="top-funded-title">
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <h2
            id="top-funded-title"
            className="text-2xl md:text-[2rem] font-bold text-foreground mb-3"
            style={{ lineHeight: 1.2 }}
          >
            Top Funded Campaigns
          </h2>
          <p className="text-[var(--text-secondary)] text-base max-w-lg mx-auto" style={{ lineHeight: 1.6 }}>
            Discover the campaigns that have inspired the most support from our community.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CampaignCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {campaigns.map((campaign) => {
              const percent = campaign.funding_goal > 0
                ? Math.min(Math.round((campaign.amount_raised / campaign.funding_goal) * 100), 100)
                : 0;
              const progressColor = percent >= 100 ? 'var(--success)' : percent >= 50 ? 'var(--primary)' : 'var(--secondary)';

              return (
                <motion.div
                  key={campaign._id}
                  variants={itemVariants}
                  className="group flex flex-col rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-white/5 overflow-hidden transition-all duration-200 hover:shadow-[0_4px_12px_rgba(99,102,241,0.15)] hover:-translate-y-0.5 cursor-pointer"
                  style={{ borderRadius: '12px', willChange: 'transform' }}
                >
                  {/* Cover Image */}
                  <div className="relative w-full h-[180px] bg-neutral-200 dark:bg-neutral-700 overflow-hidden flex-shrink-0">
                    {campaign.image_url ? (
                      <Image
                        src={campaign.image_url}
                        alt={campaign.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[var(--primary)]/10">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" opacity="0.4" aria-hidden="true">
                          <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
                        </svg>
                      </div>
                    )}
                    {/* Category badge */}
                    <span className="absolute top-3 left-3 chip-funded text-[10px] capitalize" style={{ fontSize: '10px', padding: '3px 10px' }}>
                      {campaign.category}
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
                    <p className="text-xs text-[var(--text-secondary)] mb-4">
                      by {campaign.creator_name}
                    </p>

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
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* View all link */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link
            href="/campaigns"
            id="view-all-campaigns"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--primary)] text-[var(--primary)] text-sm font-semibold hover:bg-[var(--primary)] hover:text-white transition-all duration-150 cursor-pointer"
            style={{ borderRadius: '8px' }}
          >
            View All Campaigns
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

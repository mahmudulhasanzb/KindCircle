'use client';

import { motion } from 'framer-motion';
import CountUp from './CountUp';

interface PlatformStatsProps {
  totalUsers: number;
  totalCampaigns: number;
  totalCreditsRaised: number;
}

const stats = [
  {
    label: 'Total Credits Funded',
    sublabel: 'Fueling dreams worldwide',
    suffix: '+',
    key: 'totalCreditsRaised' as const,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    gradient: 'from-[#6366F1] to-[#818CF8]',
    glow: 'rgba(99,102,241,0.4)',
    accent: '#6366F1',
  },
  {
    label: 'Campaigns Launched',
    sublabel: 'Stories told, goals reached',
    suffix: '',
    key: 'totalCampaigns' as const,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 2L11 13" /><path d="M22 2L15 22 11 13 2 9l20-7z" />
      </svg>
    ),
    gradient: 'from-[#0EA5E9] to-[#38BDF8]',
    glow: 'rgba(14,165,233,0.4)',
    accent: '#0EA5E9',
  },
  {
    label: 'Supporters Joined',
    sublabel: 'Growing community of givers',
    suffix: '+',
    key: 'totalUsers' as const,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    gradient: 'from-[#F59E0B] to-[#FBBF24]',
    glow: 'rgba(245,158,11,0.4)',
    accent: '#F59E0B',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: 'easeOut' as const },
  },
};

function StatCard({ stat, value }: { stat: (typeof stats)[number]; value: number }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative group"
    >
      {/* Hover glow blob */}
      <div
        className="absolute inset-0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"
        style={{ background: stat.glow, transform: 'scale(0.85) translateY(12px)' }}
      />

      {/* Glass card */}
      <div
        className="relative flex flex-col gap-4 p-7 rounded-2xl border border-white/10 backdrop-blur-md overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.05)',
          boxShadow: '0 4px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        {/* Corner orb */}
        <div
          className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-[0.12] pointer-events-none"
          style={{ background: `radial-gradient(circle, ${stat.accent}, transparent 70%)` }}
        />

        {/* Icon badge */}
        <div
          className={`flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} text-white`}
          style={{ boxShadow: `0 4px 20px ${stat.glow}` }}
        >
          {stat.icon}
        </div>

        {/* Stat number + labels */}
        <div>
          <div
            className="text-5xl font-black tracking-tight text-white tabular-nums leading-none"
            style={{ textShadow: `0 0 32px ${stat.glow}` }}
          >
            <CountUp end={value} duration={1800} suffix={stat.suffix} />
          </div>
          <p className="mt-2 text-sm font-semibold text-white/90">{stat.label}</p>
          <p className="mt-0.5 text-xs text-white/45">{stat.sublabel}</p>
        </div>

        {/* Bottom gradient reveal bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        />
      </div>
    </motion.div>
  );
}

export default function PlatformImpact({ totalUsers, totalCampaigns, totalCreditsRaised }: PlatformStatsProps) {
  const values = { totalUsers, totalCampaigns, totalCreditsRaised };

  return (
    <section
      className="relative py-24 px-4 overflow-hidden"
      aria-labelledby="platform-impact-title"
    >
      {/* Deep-space background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #0f0c29 0%, #1a1040 45%, #0a1628 100%)' }}
      />

      {/* Pulsing ambient orbs */}
      <motion.div
        className="absolute -top-20 -left-20 w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)',
          filter: 'blur(48px)',
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-16 -right-16 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(14,165,233,0.2) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ scale: [1, 1.14, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[180px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)',
          filter: 'blur(64px)',
        }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-60px' }}
          className="mb-14 text-center"
        >
          {/* Live badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
            style={{
              background: 'rgba(99,102,241,0.15)',
              border: '1px solid rgba(99,102,241,0.35)',
              color: '#818CF8',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] animate-pulse" />
            Live Impact Data
          </motion.span>

          <h2
            id="platform-impact-title"
            className="text-3xl md:text-5xl font-black text-white mb-4"
            style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}
          >
            Platform Impact{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #6366F1, #0EA5E9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              in Numbers
            </span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-md mx-auto" style={{ lineHeight: 1.7 }}>
            Real numbers, real impact. See how the KindCircle community is making a difference together.
          </p>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {stats.map((s) => (
            <StatCard key={s.key} stat={s} value={values[s.key]} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

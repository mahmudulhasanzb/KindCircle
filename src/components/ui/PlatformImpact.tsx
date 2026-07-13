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
    suffix: '+',
    key: 'totalCreditsRaised' as const,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    color: 'text-[var(--primary)]',
    bg: 'bg-[var(--primary)]/10',
  },
  {
    label: 'Campaigns Launched',
    suffix: '',
    key: 'totalCampaigns' as const,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 2L11 13" /><path d="M22 2L15 22 11 13 2 9l20-7z" />
      </svg>
    ),
    color: 'text-[var(--secondary)]',
    bg: 'bg-[var(--secondary)]/10',
  },
  {
    label: 'Supporters Joined',
    suffix: '+',
    key: 'totalUsers' as const,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    color: 'text-[var(--accent)]',
    bg: 'bg-[var(--accent)]/10',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

export default function PlatformImpact({ totalUsers, totalCampaigns, totalCreditsRaised }: PlatformStatsProps) {
  const values = { totalUsers, totalCampaigns, totalCreditsRaised };

  return (
    <section
      className="py-16 px-4 bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)]"
      aria-labelledby="platform-impact-title"
    >
      <div className="max-w-[1280px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-60px' }}
          className="mb-10"
        >
          <h2
            id="platform-impact-title"
            className="text-2xl md:text-[2rem] font-bold text-white mb-3"
            style={{ lineHeight: 1.2 }}
          >
            Platform Impact in Numbers
          </h2>
          <p className="text-white/75 text-base max-w-md mx-auto" style={{ lineHeight: 1.6 }}>
            Real numbers, real impact. See how the KindCircle community is making a difference together.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {stats.map((s) => (
            <motion.div
              key={s.key}
              variants={itemVariants}
              className="flex flex-col items-center p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
              style={{ borderRadius: '12px' }}
            >
              <div
                className={`flex items-center justify-center w-12 h-12 mb-4 rounded-full ${s.bg} ${s.color}`}
                style={{ borderRadius: '9999px' }}
              >
                {s.icon}
              </div>
              <div
                className="text-[2.25rem] font-bold text-white mb-1 tabular-nums"
                style={{ lineHeight: 1.0 }}
              >
                <CountUp end={values[s.key]} duration={1500} suffix={s.suffix} />
              </div>
              <p className="text-sm font-medium text-white/80">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

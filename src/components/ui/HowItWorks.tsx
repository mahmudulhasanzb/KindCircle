'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    step: '01',
    title: 'Create Your Campaign',
    description: 'Sign up as a Creator, craft your story, set your funding goal, and define a compelling reward for your supporters.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    gradient: 'from-[#6366F1] to-[#818CF8]',
    glow: 'rgba(99,102,241,0.4)',
  },
  {
    step: '02',
    title: 'Get Funded by Supporters',
    description: 'Supporters browse campaigns, contribute credits, and help you reach your goal — one kind act at a time.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    gradient: 'from-[#0EA5E9] to-[#38BDF8]',
    glow: 'rgba(14,165,233,0.4)',
  },
  {
    step: '03',
    title: 'Succeed & Make Impact',
    description: 'Once funded, withdraw your credits and bring your vision to life. Share your success with the KindCircle community.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    gradient: 'from-[#F59E0B] to-[#FBBF24]',
    glow: 'rgba(245,158,11,0.4)',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function HowItWorks() {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-neutral-950" aria-labelledby="how-it-works-title">
      {/* Subtle ambient orb */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.2) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
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
            Simple Process
          </span>
          <h2
            id="how-it-works-title"
            className="text-3xl md:text-5xl font-black text-white mb-4"
            style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}
          >
            How It{' '}
            <span style={{ background: 'linear-gradient(90deg, #6366F1, #0EA5E9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Works
            </span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto" style={{ lineHeight: 1.7 }}>
            From idea to impact in three simple steps. KindCircle makes crowdfunding effortless and transparent.
          </p>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Connecting line (desktop) */}
          <div
            className="hidden md:block absolute top-[3.5rem] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, rgba(99,102,241,0.4), rgba(14,165,233,0.4), rgba(245,158,11,0.4))' }}
          />

          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              className="relative group"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
                style={{ background: s.glow, transform: 'scale(0.85) translateY(12px)' }}
              />

              {/* Card */}
              <div
                className="relative flex flex-col items-center text-center p-8 rounded-2xl border border-white/8 overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  boxShadow: '0 4px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
              >
                {/* Corner accent */}
                <div
                  className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${s.glow}, transparent 70%)` }}
                />

                {/* Step number */}
                <span className="absolute top-4 right-5 text-xs font-black text-white/15 select-none tracking-wider">
                  {s.step}
                </span>

                {/* Icon badge */}
                <div
                  className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${s.gradient} text-white mb-6 relative z-10`}
                  style={{ boxShadow: `0 6px 24px ${s.glow}` }}
                >
                  {s.icon}
                </div>

                <h3 className="text-lg font-bold text-white mb-3" style={{ lineHeight: 1.3 }}>
                  {s.title}
                </h3>
                <p className="text-sm text-white/50" style={{ lineHeight: 1.7 }}>
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


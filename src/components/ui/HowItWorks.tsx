'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    step: '01',
    title: 'Create Your Campaign',
    description: 'Sign up as a Creator, craft your story, set your funding goal, and define a compelling reward for your supporters.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Get Funded by Supporters',
    description: 'Supporters browse campaigns, contribute credits, and help you reach your goal — one kind act at a time.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Succeed & Make Impact',
    description: 'Once funded, withdraw your credits and bring your vision to life. Share your success with the KindCircle community.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

export default function HowItWorks() {
  return (
    <section className="py-16 px-4" aria-labelledby="how-it-works-title">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <h2
            id="how-it-works-title"
            className="text-2xl md:text-[2rem] font-bold text-foreground mb-3"
            style={{ lineHeight: 1.2 }}
          >
            How It Works
          </h2>
          <p className="text-[var(--text-secondary)] text-base max-w-xl mx-auto" style={{ lineHeight: 1.6 }}>
            From idea to impact in three simple steps. KindCircle makes crowdfunding effortless and transparent.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              variants={itemVariants}
              className="relative flex flex-col items-center text-center p-5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-white/5 dark:border-white/5 transition-all duration-200 hover:shadow-[0_4px_12px_rgba(99,102,241,0.15)] hover:-translate-y-0.5 cursor-default"
              style={{ borderRadius: '12px', padding: '20px', willChange: 'transform' }}
            >
              {/* Step number */}
              <span className="absolute top-4 right-4 text-xs font-bold text-[var(--primary)] opacity-50 select-none">
                {s.step}
              </span>

              {/* Icon circle */}
              <div
                className="mb-5 flex items-center justify-center w-14 h-14 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]"
                style={{ borderRadius: '9999px' }}
              >
                {s.icon}
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2" style={{ lineHeight: 1.3 }}>
                {s.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]" style={{ lineHeight: 1.6 }}>
                {s.description}
              </p>

              {/* Connector arrow (hidden on last) */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

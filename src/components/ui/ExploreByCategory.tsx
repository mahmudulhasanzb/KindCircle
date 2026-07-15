'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  { label: 'Technology', icon: '💡', slug: 'technology', color: '#6366F1' },
  { label: 'Education', icon: '📚', slug: 'education', color: '#0EA5E9' },
  { label: 'Health', icon: '❤️', slug: 'health', color: '#EF4444' },
  { label: 'Environment', icon: '🌱', slug: 'environment', color: '#22C55E' },
  { label: 'Arts & Culture', icon: '🎨', slug: 'arts-culture', color: '#F59E0B' },
  { label: 'Community', icon: '🤝', slug: 'community', color: '#6366F1' },
  { label: 'Business', icon: '🚀', slug: 'business', color: '#0EA5E9' },
  { label: 'Sports', icon: '⚽', slug: 'sports', color: '#22C55E' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
};

export default function ExploreByCategory() {
  return (
    <section className="relative py-20 px-4 bg-neutral-900 overflow-hidden" aria-labelledby="categories-title">
      {/* Subtle radial background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-40px' }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
            style={{
              background: 'rgba(14,165,233,0.12)',
              border: '1px solid rgba(14,165,233,0.3)',
              color: '#38BDF8',
            }}
          >
            Discover
          </span>
          <h2
            id="categories-title"
            className="text-3xl md:text-5xl font-black text-white mb-4"
            style={{ lineHeight: 1.1, letterSpacing: '-0.02em' }}
          >
            Explore by{' '}
            <span style={{ background: 'linear-gradient(90deg, #0EA5E9, #6366F1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Category
            </span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-lg mx-auto" style={{ lineHeight: 1.7 }}>
            Find campaigns that align with your passion. Filter by what matters most to you.
          </p>
        </motion.div>

        {/* Category grid */}
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {categories.map((cat) => (
            <motion.div key={cat.slug} variants={itemVariants}>
              <Link
                href={`/campaigns?category=${cat.slug}`}
                id={`category-tag-${cat.slug}`}
                className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold text-white/80 transition-all duration-300 hover:text-white hover:scale-105 hover:-translate-y-0.5"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(8px)',
                }}
                aria-label={`Browse ${cat.label} campaigns`}
              >
                <span
                  className="flex items-center justify-center w-7 h-7 rounded-full text-base transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${cat.color}20` }}
                  role="img"
                  aria-hidden="true"
                >
                  {cat.icon}
                </span>
                {cat.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

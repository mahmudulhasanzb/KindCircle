'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  { label: 'Technology', icon: '💡', slug: 'technology' },
  { label: 'Education', icon: '📚', slug: 'education' },
  { label: 'Health', icon: '❤️', slug: 'health' },
  { label: 'Environment', icon: '🌱', slug: 'environment' },
  { label: 'Arts & Culture', icon: '🎨', slug: 'arts-culture' },
  { label: 'Community', icon: '🤝', slug: 'community' },
  { label: 'Business', icon: '🚀', slug: 'business' },
  { label: 'Sports', icon: '⚽', slug: 'sports' },
];

export default function ExploreByCategory() {
  return (
    <section className="py-16 px-4 bg-neutral-100 dark:bg-neutral-800/40" aria-labelledby="categories-title">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-10">
          <h2
            id="categories-title"
            className="text-2xl md:text-[2rem] font-bold text-foreground mb-3"
            style={{ lineHeight: 1.2 }}
          >
            Explore by Category
          </h2>
          <p className="text-[var(--text-secondary)] text-base max-w-lg mx-auto" style={{ lineHeight: 1.6 }}>
            Find campaigns that align with your passion. Filter by what matters most to you.
          </p>
        </div>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-40px' }}
        >
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/campaigns?category=${cat.slug}`}
              id={`category-tag-${cat.slug}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/5 text-sm font-medium text-foreground hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all duration-200 cursor-pointer"
              style={{ borderRadius: '9999px' }}
              aria-label={`Browse ${cat.label} campaigns`}
            >
              <span role="img" aria-hidden="true">{cat.icon}</span>
              {cat.label}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

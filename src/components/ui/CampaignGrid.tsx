'use client';

import { useState, useEffect, useCallback, useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import CampaignCard from '@/components/ui/CampaignCard';
import type { Campaign, CampaignSortOption } from '@/lib/types/campaign';

const CATEGORIES = [
  { value: 'all', label: 'All Categories' },
  { value: 'technology', label: 'Technology' },
  { value: 'education', label: 'Education' },
  { value: 'health', label: 'Health' },
  { value: 'environment', label: 'Environment' },
  { value: 'arts-culture', label: 'Arts & Culture' },
  { value: 'community', label: 'Community' },
  { value: 'business', label: 'Business' },
  { value: 'sports', label: 'Sports' },
];

const SORT_OPTIONS: { value: CampaignSortOption | 'newest'; label: string }[] = [
  { value: 'newest', label: 'Newest First' },
  { value: 'most-funded', label: 'Most Funded' },
  { value: 'ending-soon', label: 'Ending Soon' },
];

function CampaignCardSkeleton() {
  return (
    <div
      className="rounded-xl bg-neutral-100 dark:bg-neutral-800 overflow-hidden animate-pulse"
      style={{ borderRadius: '12px' }}
    >
      <div className="h-[180px] bg-neutral-200 dark:bg-neutral-700" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4" />
        <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2" />
        <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded w-full mt-4" />
        <div className="flex justify-between mt-2">
          <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/6" />
        </div>
      </div>
    </div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' as const } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

interface CampaignGridProps {
  initialCampaigns: Campaign[];
  initialCategory: string;
  initialSearch: string;
  initialSort: string;
}

export default function CampaignGrid({
  initialCampaigns,
  initialCategory,
  initialSearch,
  initialSort,
}: CampaignGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory || 'all');
  const [sort, setSort] = useState(initialSort || 'newest');
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  // Update URL and re-fetch when filters change
  const applyFilters = useCallback(
    (newCategory: string, newSort: string, newSearch: string) => {
      const params = new URLSearchParams();
      if (newCategory && newCategory !== 'all') params.set('category', newCategory);
      if (newSearch.trim()) params.set('search', newSearch.trim());
      if (newSort && newSort !== 'newest') params.set('sort', newSort);

      startTransition(() => {
        router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ''}`, {
          scroll: false,
        });
      });
    },
    [router, pathname]
  );

  // Re-fetch when URL params change (driven by router navigation)
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const srch = searchParams.get('search') || '';
    const srt = searchParams.get('sort') || 'newest';

    setIsLoading(true);

    const params = new URLSearchParams();
    if (cat !== 'all') params.set('category', cat);
    if (srch) params.set('search', srch);
    if (srt !== 'newest') params.set('sort', srt);

    const url = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'}/api/campaigns${
      params.toString() ? `?${params.toString()}` : ''
    }`;

    fetch(url)
      .then((r) => r.json())
      .then((data: Campaign[]) => setCampaigns(data))
      .catch(() => setCampaigns([]))
      .finally(() => setIsLoading(false));
  }, [searchParams]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    applyFilters(category, sort, search);
  }

  function handleCategoryChange(val: string) {
    setCategory(val);
    applyFilters(val, sort, search);
  }

  function handleSortChange(val: string) {
    setSort(val);
    applyFilters(category, val, search);
  }

  function handleSearchClear() {
    setSearch('');
    applyFilters(category, sort, '');
  }

  const loading = isLoading || isPending;

  return (
    <div className="space-y-8">
      {/* ── Filter Bar ── */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        {/* Search input */}
        <form onSubmit={handleSearch} className="flex flex-1 relative">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            <input
              id="campaigns-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search campaigns, creators…"
              className="w-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg pl-9 pr-8 py-2.5 text-sm text-foreground placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 transition-all duration-200"
              style={{ borderRadius: '8px' }}
              aria-label="Search campaigns"
            />
            {search && (
              <button
                type="button"
                onClick={handleSearchClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-foreground transition-colors duration-150 cursor-pointer"
                aria-label="Clear search"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <button
            type="submit"
            id="search-submit"
            className="ml-2 px-4 py-2.5 bg-[var(--primary)] text-white text-sm font-semibold rounded-lg hover:bg-[#4F46E5] transition-colors duration-150 cursor-pointer flex-shrink-0"
            style={{ borderRadius: '8px' }}
          >
            Search
          </button>
        </form>

        {/* Category select */}
        <select
          id="campaigns-category"
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 cursor-pointer transition-all duration-200"
          style={{ borderRadius: '8px', minWidth: '170px' }}
          aria-label="Filter by category"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        {/* Sort select */}
        <select
          id="campaigns-sort"
          value={sort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 cursor-pointer transition-all duration-200"
          style={{ borderRadius: '8px', minWidth: '150px' }}
          aria-label="Sort campaigns"
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* ── Results count ── */}
      <p className="text-sm text-[var(--text-secondary)]">
        {loading ? 'Loading…' : `${campaigns.length} campaign${campaigns.length !== 1 ? 's' : ''} found`}
      </p>

      {/* ── Grid ── */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <CampaignCardSkeleton key={i} />
          ))}
        </div>
      ) : campaigns.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-24 text-center"
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-secondary)"
            strokeWidth="1.5"
            className="mb-4 opacity-40"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <p className="text-lg font-semibold text-foreground mb-1">No campaigns found</p>
          <p className="text-sm text-[var(--text-secondary)]">
            Try a different search term or category.
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          <AnimatePresence mode="popLayout">
            {campaigns.map((campaign) => (
              <motion.div key={campaign._id} variants={itemVariants} layout>
                <CampaignCard campaign={campaign} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

import { Suspense } from 'react';
import CampaignGrid from '@/components/ui/CampaignGrid';
import { getCampaigns } from '@/lib/api/campaigns/data';
import type { CampaignFilters } from '@/lib/types/campaign';

export const metadata = {
  title: 'Explore Campaigns — KindCircle',
  description: 'Browse active crowdfunding campaigns by category, search for causes you care about, and support creators making a difference.',
};

interface CampaignsPageProps {
  searchParams: Promise<{ category?: string; search?: string; sort?: string }>;
}

export default async function CampaignsPage({ searchParams }: CampaignsPageProps) {
  const params = await searchParams;
  const filters: CampaignFilters = {
    category: params.category,
    search: params.search,
    sort: (params.sort as CampaignFilters['sort']) || 'newest',
  };

  // Server-side initial fetch with graceful fallback
  let initialCampaigns = [];
  try {
    initialCampaigns = await getCampaigns(filters);
  } catch {
    initialCampaigns = [];
  }

  return (
    <div className="page-enter w-full">
      {/* Page header */}
      <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] py-14 px-4">
        <div className="max-w-[1280px] mx-auto text-center">
          <h1
            className="text-[2rem] md:text-[3rem] font-extrabold text-white mb-3"
            style={{ lineHeight: 1.1 }}
          >
            Explore Campaigns
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-lg mx-auto" style={{ lineHeight: 1.6 }}>
            Discover projects that need your support. Filter by category, search by keyword, and make an impact.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1280px] mx-auto px-4 py-12">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-neutral-100 dark:bg-neutral-800 overflow-hidden animate-pulse"
                  style={{ borderRadius: '12px' }}
                >
                  <div className="h-[180px] bg-neutral-200 dark:bg-neutral-700" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4" />
                    <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2" />
                    <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded w-full mt-4" />
                    <div className="h-5 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <CampaignGrid
            initialCampaigns={initialCampaigns}
            initialCategory={params.category || 'all'}
            initialSearch={params.search || ''}
            initialSort={params.sort || 'newest'}
          />
        </Suspense>
      </div>
    </div>
  );
}

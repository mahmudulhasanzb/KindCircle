import { Suspense } from 'react';
import CampaignGrid from '@/components/ui/CampaignGrid';
import { getCampaigns } from '@/lib/api/campaigns/data';
import type { Campaign, CampaignFilters } from '@/lib/types/campaign';

export const metadata = {
  title: 'Explore Campaigns — KindCircle',
  description: 'Browse active crowdfunding campaigns by category, search for causes you care about, and support creators making a difference.',
};

interface CampaignsPageProps {
  searchParams: Promise<{ category?: string; search?: string; sort?: string; page?: string }>;
}

export default async function CampaignsPage({ searchParams }: CampaignsPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1') || 1;
  const filters: CampaignFilters = {
    category: params.category,
    search: params.search,
    sort: (params.sort as CampaignFilters['sort']) || 'newest',
    page,
    limit: 10,
  };

  let campaigns: Campaign[] = [];
  let totalPages = 1;
  let currentPage = 1;

  try {
    const data = await getCampaigns(filters);
    campaigns = data.campaigns || [];
    totalPages = data.totalPages || 1;
    currentPage = data.currentPage || 1;
  } catch (err) {
    console.error('Failed to load initial campaigns:', err);
  }

  return (
    <div className="page-enter w-full bg-neutral-950 min-h-screen">
      {/* Page header */}
      <div className="relative overflow-hidden py-20 px-4">
        {/* Background */}
        <div className="absolute inset-0 bg-neutral-950" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center top, rgba(99,102,241,0.15) 0%, transparent 60%)' }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{
              background: 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.3)',
              color: '#818CF8',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] animate-pulse" />
            Active Campaigns
          </span>
          <h1
            className="text-4xl md:text-6xl font-black text-white mb-5"
            style={{ lineHeight: 1.05, letterSpacing: '-0.03em' }}
          >
            Explore{' '}
            <span style={{ background: 'linear-gradient(90deg, #6366F1, #0EA5E9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Campaigns
            </span>
          </h1>
          <p className="text-white/50 text-base md:text-lg max-w-lg mx-auto" style={{ lineHeight: 1.7 }}>
            Discover projects that need your support. Filter by category, search by keyword, and make an impact.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden animate-pulse"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="h-[190px] bg-white/5" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-white/8 rounded w-3/4" />
                    <div className="h-3 bg-white/5 rounded w-1/2" />
                    <div className="h-2 bg-white/8 rounded w-full mt-4" />
                    <div className="h-5 bg-white/5 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <CampaignGrid
            initialCampaigns={campaigns}
            initialCategory={params.category || 'all'}
            initialSearch={params.search || ''}
            initialSort={params.sort || 'newest'}
            initialTotalPages={totalPages}
            initialCurrentPage={currentPage}
          />
        </Suspense>
      </div>
    </div>
  );
}

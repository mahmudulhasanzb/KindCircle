import HeroSlider from '@/components/ui/HeroSlider';
import HowItWorks from '@/components/ui/HowItWorks';
import ExploreByCategory from '@/components/ui/ExploreByCategory';
import Testimonials from '@/components/ui/Testimonials';
import PlatformImpact from '@/components/ui/PlatformImpact';
import TopFundedCampaigns from '@/components/ui/TopFundedCampaigns';
import { getPlatformStats, getTopFundedCampaigns } from '@/lib/api/home/data';

export const metadata = {
  title: 'KindCircle — Crowdfunding for the Community',
  description: 'Discover and back campaigns that matter. Join KindCircle to fund ideas, support creators, and make a real-world impact through community-powered crowdfunding.',
};

export default async function HomePage() {
  // Fetch data in parallel; fall back gracefully on error
  const [stats, topCampaigns] = await Promise.allSettled([
    getPlatformStats(),
    getTopFundedCampaigns(),
  ]);

  const platformStats = stats.status === 'fulfilled' ? stats.value : { totalUsers: 0, totalCampaigns: 0, totalCreditsRaised: 0 };
  const campaigns = topCampaigns.status === 'fulfilled' ? topCampaigns.value : [];

  return (
    <div className="page-enter flex flex-col w-full">
      {/* T-8.1 — Hero Slider */}
      <HeroSlider />

      {/* T-8.2 — How It Works */}
      <HowItWorks />

      {/* T-8.3 — Explore by Category */}
      <ExploreByCategory />

      {/* T-8.6 — Platform Impact in Numbers */}
      <PlatformImpact
        totalUsers={platformStats.totalUsers}
        totalCampaigns={platformStats.totalCampaigns}
        totalCreditsRaised={platformStats.totalCreditsRaised}
      />

      {/* T-8.8 — Top Funded Campaigns */}
      <TopFundedCampaigns campaigns={campaigns} />

      {/* T-8.4 — Testimonials */}
      <Testimonials />
    </div>
  );
}

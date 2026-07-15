import React from 'react';
import Link from 'next/link';
import { 
  Trophy, 
  Award, 
  ShieldCheck, 
  Crown, 
  Lock, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Coins
} from 'lucide-react';
import { getLeaderboard } from '@/lib/api/leaderboard/data';
import { getUser } from '@/lib/api/session';

export const metadata = {
  title: 'Kindness Leaderboard — KindCircle',
  description: 'Celebrating the top benefactors and most successful campaigns making a difference in the KindCircle community.',
};

export default async function LeaderboardPage() {
  const user = await getUser();
  
  let data;
  try {
    data = await getLeaderboard();
  } catch (err) {
    console.error('Failed to load leaderboard:', err);
  }

  if (!data) {
    return (
      <div className="w-full min-h-screen bg-neutral-950 text-white py-20 px-4 flex flex-col items-center justify-center">
        <Trophy size={64} className="text-neutral-600 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-neutral-400 mb-6">Could not fetch leaderboard data at this time.</p>
        <Link 
          href="/"
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const { topSupporters, topCampaigns, personalStats } = data;

  const listSupporters = topSupporters.slice(3);

  return (
    <div className="page-enter w-full bg-neutral-950 min-h-screen pb-20 text-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-primary via-neutral-900 to-secondary py-16 px-4 border-b border-neutral-950">
        <div className="max-w-[1280px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Trophy size={14} />
            <span>Hall of Kindness</span>
          </div>
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-extrabold text-white mb-4 leading-tight">
            Kindness Leaderboard
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Celebrating the amazing people who make local dreams and community projects possible. Thank you for your kindness!
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Leaderboard Section (Left 2 Columns on large screens) */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Top 3 Podium */}
          {topSupporters.length > 0 && (
            <div className="bg-neutral-900/40 border border-neutral-900 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Crown className="text-yellow-500" size={20} />
                <span>Top Benefactors</span>
              </h2>

              <div className="flex flex-col sm:flex-row items-end justify-center gap-6 pt-4">
                {/* 2nd Place */}
                {topSupporters[1] && (
                  <div className="w-full sm:w-1/3 flex flex-col items-center order-2 sm:order-1 mt-6 sm:mt-0">
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={topSupporters[1].photoUrl || '/avatar-placeholder.png'} 
                        alt={topSupporters[1].name}
                        className="h-20 w-20 rounded-full border-4 border-neutral-400 object-cover shadow-lg shadow-neutral-400/10"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-neutral-400 text-neutral-950 font-bold h-6 w-6 rounded-full flex items-center justify-center text-xs shadow-md">
                        2
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <p className="font-bold text-neutral-200 line-clamp-1">{topSupporters[1].name}</p>
                      <p className="text-xs text-neutral-400 line-clamp-1">{topSupporters[1].email.replace(/(.{3}).*(@.*)/, '$1***$2')}</p>
                      <div className="mt-2 inline-flex items-center gap-1 bg-neutral-800 px-3 py-1 rounded-full text-xs font-semibold text-neutral-300">
                        <Coins size={12} className="text-primary" />
                        <span>{topSupporters[1].totalContributed} credits</span>
                      </div>
                    </div>
                    <div className="h-16 w-full bg-neutral-900 border border-neutral-800 rounded-t-lg mt-4 hidden sm:block shadow-inner" />
                  </div>
                )}

                {/* 1st Place */}
                {topSupporters[0] && (
                  <div className="w-full sm:w-1/3 flex flex-col items-center order-1 sm:order-2">
                    <div className="relative">
                      {/* Crown */}
                      <Crown className="absolute -top-7 left-1/2 -translate-x-1/2 text-yellow-500" size={28} />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={topSupporters[0].photoUrl || '/avatar-placeholder.png'} 
                        alt={topSupporters[0].name}
                        className="h-24 w-24 rounded-full border-4 border-yellow-500 object-cover shadow-xl shadow-yellow-500/10"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-neutral-950 font-bold h-7 w-7 rounded-full flex items-center justify-center text-sm shadow-md">
                        1
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <p className="font-extrabold text-white text-lg line-clamp-1">{topSupporters[0].name}</p>
                      <p className="text-xs text-neutral-400 line-clamp-1">{topSupporters[0].email.replace(/(.{3}).*(@.*)/, '$1***$2')}</p>
                      <div className="mt-2 inline-flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full text-sm font-semibold text-yellow-500">
                        <Coins size={14} />
                        <span>{topSupporters[0].totalContributed} credits</span>
                      </div>
                    </div>
                    <div className="h-24 w-full bg-neutral-900/80 border border-neutral-800 rounded-t-lg mt-4 hidden sm:block shadow-md" />
                  </div>
                )}

                {/* 3rd Place */}
                {topSupporters[2] && (
                  <div className="w-full sm:w-1/3 flex flex-col items-center order-3 mt-6 sm:mt-0">
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={topSupporters[2].photoUrl || '/avatar-placeholder.png'} 
                        alt={topSupporters[2].name}
                        className="h-20 w-20 rounded-full border-4 border-amber-700 object-cover shadow-lg shadow-amber-700/10"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-amber-700 text-neutral-950 font-bold h-6 w-6 rounded-full flex items-center justify-center text-xs shadow-md">
                        3
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <p className="font-bold text-neutral-300 line-clamp-1">{topSupporters[2].name}</p>
                      <p className="text-xs text-neutral-400 line-clamp-1">{topSupporters[2].email.replace(/(.{3}).*(@.*)/, '$1***$2')}</p>
                      <div className="mt-2 inline-flex items-center gap-1 bg-neutral-800 px-3 py-1 rounded-full text-xs font-semibold text-neutral-300">
                        <Coins size={12} className="text-primary" />
                        <span>{topSupporters[2].totalContributed} credits</span>
                      </div>
                    </div>
                    <div className="h-10 w-full bg-neutral-900 border border-neutral-800 rounded-t-lg mt-4 hidden sm:block shadow-inner" />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Ranks 4-10 Table */}
          {listSupporters.length > 0 && (
            <div className="bg-neutral-900/40 border border-neutral-900 rounded-2xl overflow-hidden backdrop-blur-md">
              <div className="p-6 border-b border-neutral-800">
                <h3 className="text-lg font-bold">Top Ranks</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-800 bg-neutral-900/20 text-xs uppercase tracking-wider text-neutral-400">
                      <th className="py-4 px-6 text-center">Rank</th>
                      <th className="py-4 px-6">Supporter</th>
                      <th className="py-4 px-6 text-right">Contributed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listSupporters.map((supporter, idx) => {
                      const rank = idx + 4;
                      return (
                        <tr 
                          key={supporter.email}
                          className="border-b border-neutral-900 hover:bg-neutral-900/30 transition-colors"
                        >
                          <td className="py-4 px-6 text-center font-bold text-neutral-400">
                            {rank}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img 
                                src={supporter.photoUrl || '/avatar-placeholder.png'} 
                                alt={supporter.name} 
                                className="h-9 w-9 rounded-full object-cover border border-neutral-800"
                              />
                              <div>
                                <p className="font-semibold text-neutral-200">{supporter.name}</p>
                                <p className="text-xs text-neutral-500">{supporter.email.replace(/(.{3}).*(@.*)/, '$1***$2')}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right font-semibold text-neutral-200">
                            <div className="inline-flex items-center gap-1">
                              <Coins size={12} className="text-primary" />
                              <span>{supporter.totalContributed}</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar (Right Column) */}
        <div className="space-y-8">
          {/* Personal Stats & Badges */}
          <div className="bg-neutral-900/40 border border-neutral-900 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Award className="text-secondary" size={20} />
              <span>Your Achievements</span>
            </h3>

            {user ? (
              personalStats ? (
                <div className="space-y-6">
                  {/* Quick stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-neutral-900/70 border border-neutral-800 p-4 rounded-xl text-center">
                      <p className="text-xs text-neutral-400 uppercase font-semibold">Your Rank</p>
                      <p className="text-xl font-bold text-white mt-1">
                        {personalStats.rank ? `#${personalStats.rank}` : 'Unranked'}
                      </p>
                    </div>
                    <div className="bg-neutral-900/70 border border-neutral-800 p-4 rounded-xl text-center">
                      <p className="text-xs text-neutral-400 uppercase font-semibold">Total Donated</p>
                      <p className="text-xl font-bold text-primary mt-1 flex items-center justify-center gap-1">
                        <Coins size={16} />
                        <span>{personalStats.totalContributed}</span>
                      </p>
                    </div>
                  </div>

                  {/* Badges Grid */}
                  <div>
                    <h4 className="text-xs uppercase text-neutral-400 font-bold tracking-wider mb-4">Impact Badges</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {personalStats.badges.map((badge) => (
                        <div 
                          key={badge.id}
                          className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                            badge.unlocked 
                              ? 'bg-neutral-900/90 border-secondary/25 shadow-md shadow-secondary/5' 
                              : 'bg-neutral-950/40 border-neutral-900 opacity-50'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${
                            badge.unlocked 
                              ? 'bg-secondary/15 text-secondary' 
                              : 'bg-neutral-900 text-neutral-500'
                          }`}>
                            {badge.id === 'bronze' && <ShieldCheck size={20} />}
                            {badge.id === 'silver' && <Award size={20} />}
                            {badge.id === 'gold' && <Trophy size={20} />}
                            {badge.id === 'platinum' && <Crown size={20} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                              <span>{badge.name}</span>
                              {badge.unlocked && <CheckCircle2 size={14} className="text-secondary" />}
                            </p>
                            <p className="text-xs text-neutral-400 line-clamp-1">{badge.description}</p>
                          </div>
                          {!badge.unlocked && (
                            <Lock size={14} className="text-neutral-600 mr-1" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <p className="text-neutral-400 text-xs">No contribution history found.</p>
                </div>
              )
            ) : (
              <div className="text-center py-6">
                <div className="bg-neutral-900/60 rounded-xl p-5 border border-neutral-800/80">
                  <Lock size={32} className="text-neutral-500 mx-auto mb-3" />
                  <p className="text-sm text-neutral-300 font-semibold mb-2">Track Your Impact</p>
                  <p className="text-xs text-neutral-500 mb-5 leading-relaxed">
                    Log in to unlock custom badges, calculate your rank, and see your giving stats.
                  </p>
                  <Link 
                    href="/signin"
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary py-2 text-xs font-semibold text-white hover:bg-primary/95 transition-all"
                  >
                    <span>Log In Now</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Top Successful Campaigns */}
          <div className="bg-neutral-900/40 border border-neutral-900 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="text-primary" size={20} />
              <span>Trending Campaigns</span>
            </h3>
            <div className="space-y-4">
              {topCampaigns.slice(0, 3).map((campaign) => {
                const percent = Math.min(
                  Math.round((campaign.amount_raised / campaign.funding_goal) * 100) || 0,
                  100
                );
                return (
                  <Link 
                    href={`/campaigns/${campaign._id}`}
                    key={campaign._id}
                    className="flex gap-3 group items-start"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={campaign.image_url} 
                      alt={campaign.title}
                      className="h-12 w-16 object-cover rounded-lg bg-neutral-900 border border-neutral-800 group-hover:scale-[1.02] transition-transform" 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-neutral-200 group-hover:text-primary transition-colors line-clamp-1">
                        {campaign.title}
                      </p>
                      <p className="text-xs text-neutral-500 mb-1.5">by {campaign.creator_name}</p>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-neutral-800 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-neutral-400">{percent}%</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

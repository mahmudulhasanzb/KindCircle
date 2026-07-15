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
  Coins,
} from 'lucide-react';
import { getLeaderboard } from '@/lib/api/leaderboard/data';
import { getUser } from '@/lib/api/session';

export const metadata = {
  title: 'Kindness Leaderboard — KindCircle',
  description: 'Celebrating the top benefactors and most successful campaigns making a difference in the KindCircle community.',
};

const podiumColors = [
  { border: '#F59E0B', bg: '#F59E0B', badgeBg: '#F59E0B', shadow: 'rgba(245,158,11,0.3)', height: 'h-28' },
  { border: '#94A3B8', bg: '#94A3B8', badgeBg: '#94A3B8', shadow: 'rgba(148,163,184,0.2)', height: 'h-16' },
  { border: '#CD7C2F', bg: '#CD7C2F', badgeBg: '#CD7C2F', shadow: 'rgba(205,124,47,0.2)', height: 'h-10' },
];

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
        <div
          className="flex h-20 w-20 items-center justify-center rounded-2xl mb-6"
          style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}
        >
          <Trophy className="text-[#818CF8]" size={40} />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Something went wrong</h2>
        <p className="text-white/40 mb-8">Could not fetch leaderboard data at this time.</p>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl font-bold text-sm text-white"
          style={{ background: 'linear-gradient(135deg, #6366F1, #0EA5E9)', boxShadow: '0 8px 24px rgba(99,102,241,0.35)' }}
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
      {/* Header */}
      <div className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top, rgba(245,158,11,0.1) 0%, transparent 60%)' }} />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-5xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', color: '#FBBF24' }}
          >
            <Trophy size={12} />
            Hall of Kindness
          </div>
          <h1
            className="text-4xl md:text-6xl font-black text-white mb-5"
            style={{ lineHeight: 1.05, letterSpacing: '-0.03em' }}
          >
            Kindness{' '}
            <span style={{ background: 'linear-gradient(90deg, #F59E0B, #6366F1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Leaderboard
            </span>
          </h1>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto" style={{ lineHeight: 1.7 }}>
            Celebrating the amazing people who make local dreams and community projects possible.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main (Left 2/3) */}
        <div className="lg:col-span-2 space-y-8">

          {/* Top 3 Podium */}
          {topSupporters.length > 0 && (
            <div
              className="rounded-2xl p-6 sm:p-10"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <h2 className="text-sm font-black text-white/50 uppercase tracking-widest mb-10 flex items-center gap-2">
                <Crown className="text-[#F59E0B]" size={16} />
                Top Benefactors
              </h2>

              {/* Podium */}
              <div className="flex flex-col sm:flex-row items-end justify-center gap-6">
                {/* 2nd */}
                {topSupporters[1] && (
                  <div className="w-full sm:w-1/3 flex flex-col items-center order-2 sm:order-1">
                    <div className="relative mb-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={topSupporters[1].photoUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(topSupporters[1].name)}`}
                        alt={topSupporters[1].name}
                        className="h-20 w-20 rounded-full object-cover"
                        style={{ border: `3px solid ${podiumColors[1].border}`, boxShadow: `0 0 20px ${podiumColors[1].shadow}` }}
                      />
                      <div
                        className="absolute -bottom-2 -right-2 h-7 w-7 rounded-full flex items-center justify-center text-xs font-black text-neutral-950"
                        style={{ background: podiumColors[1].bg }}
                      >
                        2
                      </div>
                    </div>
                    <p className="font-bold text-white/80 text-sm text-center line-clamp-1">{topSupporters[1].name}</p>
                    <p className="text-[10px] text-white/35 text-center">{topSupporters[1].email.replace(/(.{3}).*(@.*)/, '$1***$2')}</p>
                    <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white/60"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <Coins size={10} className="text-[#6366F1]" />
                      <span>{topSupporters[1].totalContributed} credits</span>
                    </div>
                    <div className="h-16 w-full rounded-t-xl mt-5 hidden sm:block"
                      style={{ background: 'rgba(148,163,184,0.1)', border: '1px solid rgba(148,163,184,0.2)', borderBottom: 'none' }} />
                  </div>
                )}

                {/* 1st */}
                {topSupporters[0] && (
                  <div className="w-full sm:w-1/3 flex flex-col items-center order-1 sm:order-2">
                    <Crown className="text-[#F59E0B] mb-2" size={28} />
                    <div className="relative mb-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={topSupporters[0].photoUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(topSupporters[0].name)}`}
                        alt={topSupporters[0].name}
                        className="h-24 w-24 rounded-full object-cover"
                        style={{ border: `3px solid ${podiumColors[0].border}`, boxShadow: `0 0 32px ${podiumColors[0].shadow}` }}
                      />
                      <div
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full flex items-center justify-center text-sm font-black text-neutral-950"
                        style={{ background: podiumColors[0].bg, boxShadow: `0 4px 12px ${podiumColors[0].shadow}` }}
                      >
                        1
                      </div>
                    </div>
                    <p className="font-black text-white text-base text-center line-clamp-1">{topSupporters[0].name}</p>
                    <p className="text-[10px] text-white/35 text-center">{topSupporters[0].email.replace(/(.{3}).*(@.*)/, '$1***$2')}</p>
                    <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold"
                      style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', color: '#FBBF24' }}>
                      <Coins size={12} />
                      <span>{topSupporters[0].totalContributed} credits</span>
                    </div>
                    <div className="h-28 w-full rounded-t-xl mt-5 hidden sm:block"
                      style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderBottom: 'none' }} />
                  </div>
                )}

                {/* 3rd */}
                {topSupporters[2] && (
                  <div className="w-full sm:w-1/3 flex flex-col items-center order-3">
                    <div className="relative mb-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={topSupporters[2].photoUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(topSupporters[2].name)}`}
                        alt={topSupporters[2].name}
                        className="h-20 w-20 rounded-full object-cover"
                        style={{ border: `3px solid ${podiumColors[2].border}`, boxShadow: `0 0 20px ${podiumColors[2].shadow}` }}
                      />
                      <div
                        className="absolute -bottom-2 -right-2 h-7 w-7 rounded-full flex items-center justify-center text-xs font-black text-white"
                        style={{ background: podiumColors[2].bg }}
                      >
                        3
                      </div>
                    </div>
                    <p className="font-bold text-white/70 text-sm text-center line-clamp-1">{topSupporters[2].name}</p>
                    <p className="text-[10px] text-white/35 text-center">{topSupporters[2].email.replace(/(.{3}).*(@.*)/, '$1***$2')}</p>
                    <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white/50"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <Coins size={10} className="text-[#6366F1]" />
                      <span>{topSupporters[2].totalContributed} credits</span>
                    </div>
                    <div className="h-10 w-full rounded-t-xl mt-5 hidden sm:block"
                      style={{ background: 'rgba(205,124,47,0.08)', border: '1px solid rgba(205,124,47,0.2)', borderBottom: 'none' }} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Ranks 4+ table */}
          {listSupporters.length > 0 && (
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 className="text-sm font-black text-white/70 uppercase tracking-widest">Top Ranks</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black uppercase tracking-widest text-white/25"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                      <th className="py-3 px-6 text-center">Rank</th>
                      <th className="py-3 px-6">Supporter</th>
                      <th className="py-3 px-6 text-right">Contributed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listSupporters.map((supporter, idx) => {
                      const rank = idx + 4;
                      return (
                        <tr
                          key={supporter.email}
                          className="transition-colors hover:bg-white/3"
                          style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                        >
                          <td className="py-4 px-6 text-center font-black text-white/40 text-sm">#{rank}</td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={supporter.photoUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(supporter.name)}`}
                                alt={supporter.name}
                                className="h-9 w-9 rounded-full object-cover"
                                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                              />
                              <div>
                                <p className="font-bold text-white/80 text-sm">{supporter.name}</p>
                                <p className="text-xs text-white/30">{supporter.email.replace(/(.{3}).*(@.*)/, '$1***$2')}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="inline-flex items-center gap-1.5 font-bold text-sm text-white/60">
                              <Coins size={11} className="text-[#6366F1]" />
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

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <div
            className="rounded-2xl p-6"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <h3 className="text-sm font-black text-white/60 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Award className="text-[#0EA5E9]" size={16} />
              Your Achievements
            </h3>

            {user ? (
              personalStats ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <p className="text-[10px] font-black uppercase tracking-wider text-white/35 mb-1">Your Rank</p>
                      <p className="text-xl font-black text-white">
                        {personalStats.rank ? `#${personalStats.rank}` : '—'}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}>
                      <p className="text-[10px] font-black uppercase tracking-wider text-[#818CF8]/60 mb-1">Donated</p>
                      <p className="text-xl font-black text-[#818CF8] flex items-center justify-center gap-1">
                        <Coins size={14} />
                        <span>{personalStats.totalContributed}</span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-4">Impact Badges</h4>
                    <div className="space-y-2.5">
                      {personalStats.badges.map((badge) => (
                        <div
                          key={badge.id}
                          className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${badge.unlocked ? '' : 'opacity-40'}`}
                          style={{
                            background: badge.unlocked ? 'rgba(14,165,233,0.08)' : 'rgba(255,255,255,0.03)',
                            border: badge.unlocked ? '1px solid rgba(14,165,233,0.2)' : '1px solid rgba(255,255,255,0.06)',
                          }}
                        >
                          <div
                            className="p-2 rounded-lg"
                            style={{ background: badge.unlocked ? 'rgba(14,165,233,0.15)' : 'rgba(255,255,255,0.06)', color: badge.unlocked ? '#38BDF8' : 'rgba(255,255,255,0.3)' }}
                          >
                            {badge.id === 'bronze' && <ShieldCheck size={18} />}
                            {badge.id === 'silver' && <Award size={18} />}
                            {badge.id === 'gold' && <Trophy size={18} />}
                            {badge.id === 'platinum' && <Crown size={18} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white flex items-center gap-1.5">
                              {badge.name}
                              {badge.unlocked && <CheckCircle2 size={12} className="text-[#0EA5E9]" />}
                            </p>
                            <p className="text-xs text-white/30 line-clamp-1">{badge.description}</p>
                          </div>
                          {!badge.unlocked && <Lock size={12} className="text-white/20" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-white/30 text-center py-6">No contribution history found.</p>
              )
            ) : (
              <div className="text-center py-4">
                <div
                  className="rounded-xl p-5 mb-4"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <Lock size={28} className="text-white/20 mx-auto mb-3" />
                  <p className="text-sm font-bold text-white mb-1.5">Track Your Impact</p>
                  <p className="text-xs text-white/35 leading-relaxed mb-5">
                    Log in to unlock custom badges, see your rank, and track your giving stats.
                  </p>
                  <Link
                    href="/signin"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold text-white transition-all hover:scale-[1.02]"
                    style={{ background: 'linear-gradient(135deg, #6366F1, #0EA5E9)', boxShadow: '0 4px 16px rgba(99,102,241,0.3)' }}
                  >
                    Log In Now
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Trending campaigns sidebar */}
          <div
            className="rounded-2xl p-6"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <h3 className="text-sm font-black text-white/60 uppercase tracking-widest mb-6 flex items-center gap-2">
              <TrendingUp className="text-[#6366F1]" size={16} />
              Trending Campaigns
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
                      className="h-12 w-16 object-cover rounded-xl flex-shrink-0 transition-transform group-hover:scale-[1.03]"
                      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white/70 group-hover:text-white transition-colors line-clamp-1 mb-0.5">
                        {campaign.title}
                      </p>
                      <p className="text-xs text-white/35 mb-2">by {campaign.creator_name}</p>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-white/8 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#6366F1] to-[#0EA5E9] rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-white/35">{percent}%</span>
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

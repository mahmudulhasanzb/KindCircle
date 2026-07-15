import React from 'react';
import Link from 'next/link';
import { Heart, Shield, Users, Target, Award, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Us — KindCircle',
  description: 'Learn about KindCircle, our mission to support local creators, and how community-powered crowdfunding makes a difference.',
};

export default function AboutPage() {
  const values = [
    {
      icon: <Heart className="h-6 w-6 text-[#EF4444]" />,
      title: 'Community First',
      desc: 'We believe in the power of collective action. Every contribution, small or large, helps build a stronger circle of support.',
    },
    {
      icon: <Shield className="h-6 w-6 text-[#38BDF8]" />,
      title: 'Trust & Transparency',
      desc: 'Platform integrity is our top priority. We verify campaigns and ensure a secure, transparent refund policy for all backers.',
    },
    {
      icon: <Target className="h-6 w-6 text-[#FBBF24]" />,
      title: 'Empowering Creators',
      desc: 'We provide the tools and funding platform creators need to bring their technical, artistic, and community visions to life.',
    },
  ];

  return (
    <div className="page-enter flex-grow w-full bg-neutral-950 min-h-screen text-white">
      {/* Hero Header Section */}
      <div className="relative overflow-hidden py-20 px-4 border-b border-neutral-800/60">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.12) 0%, transparent 65%)' }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 text-[#818CF8]"
            style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}
          >
            Our Mission
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
            Empowering Communities,<br />
            <span style={{ background: 'linear-gradient(90deg, #6366F1, #0EA5E9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              One Contribution
            </span>{' '}
            at a Time.
          </h1>
          <p className="text-base md:text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            KindCircle is a next-generation crowdfunding platform designed to bridge the gap between creative visionaries and supporters. By combining transparent credit transactions with Stripe payment security, we make supporting meaningful projects seamless.
          </p>
        </div>
      </div>

      {/* Content Section: Core Values */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Our Core Values</h2>
          <p className="text-sm text-white/40 max-w-md mx-auto">
            The principles that guide how we build, moderate, and grow our crowdfunding circle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 relative flex flex-col gap-4 border border-white/8 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.03)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/8">
                {v.icon}
              </div>
              <h3 className="text-lg font-bold text-white">{v.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content Section: Platform Roles */}
      <div className="bg-neutral-900/40 border-y border-neutral-800/50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#0EA5E9] mb-3 block">
                Platform Ecosystem
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                Designed for Creators, Supporters, & Admins
              </h2>
              <p className="text-sm text-white/50 mb-6 leading-relaxed">
                Our platform accommodates three distinct roles to ensure a secure, high-integrity fundraising experience. Creators pitch detailed stories and reward specifications. Supporters discover active campaigns and contribute credits. Admins review and moderate campaigns to maintain trust.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0 mt-0.5">✓</div>
                  <p className="text-xs text-white/70 font-semibold">100% Secure credit purchasing and creator payouts via Stripe.</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0 mt-0.5">✓</div>
                  <p className="text-xs text-white/70 font-semibold">Automatic refunds of pledges if campaigns get rejected or deleted.</p>
                </div>
                <div className="flex gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0 mt-0.5">✓</div>
                  <p className="text-xs text-white/70 font-semibold">Clean dashboard data visualization to track earnings and backing history.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-white/6" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <Users className="h-5 w-5 text-[#818CF8] mb-3" />
                <h4 className="font-bold text-white mb-1.5 text-sm">Supporters</h4>
                <p className="text-xs text-white/40 leading-relaxed">Buy wallet credits, back campaigns, track notifications, and earn podium ranking badges.</p>
              </div>
              <div className="p-5 rounded-xl border border-white/6" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <Award className="h-5 w-5 text-[#38BDF8] mb-3" />
                <h4 className="font-bold text-white mb-1.5 text-sm">Creators</h4>
                <p className="text-xs text-white/40 leading-relaxed">Launch campaigns, manage pledges, upload images via API, and withdraw USD earnings securely.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Footer Section */}
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
          Ready to Make an Impact?
        </h2>
        <p className="text-sm text-white/45 max-w-md mx-auto mb-8">
          Join KindCircle today to discover innovative campaigns or launch your own fundraising journey.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-white transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #6366F1, #0EA5E9)',
              boxShadow: '0 4px 20px rgba(99,102,241,0.3)',
            }}
          >
            Explore Campaigns
            <ArrowRight size={13} />
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-xs text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            Join the Circle
          </Link>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-64px-150px)] flex-1 flex-col items-center justify-center px-4 py-16 text-center overflow-hidden bg-neutral-950">
      {/* Ambient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Large 404 */}
        <div
          className="text-[8rem] sm:text-[10rem] font-black leading-none mb-2 select-none"
          style={{
            background: 'linear-gradient(135deg, #6366F1 0%, #0EA5E9 50%, #818CF8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 60px rgba(99,102,241,0.4))',
          }}
        >
          404
        </div>

        {/* Icon */}
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl mb-6"
          style={{
            background: 'rgba(99,102,241,0.12)',
            border: '1px solid rgba(99,102,241,0.25)',
            boxShadow: '0 0 32px rgba(99,102,241,0.2)',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /><path d="M11 8v3m0 3h.01" />
          </svg>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
          Page Not Found
        </h1>
        <p className="max-w-md text-sm text-white/45 mb-10" style={{ lineHeight: 1.7 }}>
          Sorry, we couldn&apos;t find the page you are looking for. It might have been moved, deleted, or never existed.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #6366F1, #0EA5E9)',
              boxShadow: '0 8px 32px rgba(99,102,241,0.35)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/campaigns"
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white/70 transition-all duration-200 hover:text-white hover:-translate-y-0.5"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            Explore Campaigns
          </Link>
        </div>
      </div>
    </div>
  );
}

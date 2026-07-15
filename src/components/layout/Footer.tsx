import React from "react";
import Link from "next/link";
import { GithubIcon, FacebookIcon, LinkedinIcon } from "@/components/ui/Icons";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-neutral-950 text-neutral-400">
      {/* Top ambient orb */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand column */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl font-black text-sm text-white transition-transform group-hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #6366F1, #0EA5E9)', boxShadow: '0 4px 16px rgba(99,102,241,0.4)' }}
              >
                KC
              </div>
              <span className="font-black text-lg tracking-tight text-white">
                Kind<span className="text-[#6366F1]">Circle</span>
              </span>
            </Link>
            <p className="text-sm text-neutral-500 max-w-xs" style={{ lineHeight: 1.7 }}>
              Empowering creators and supporters to build meaningful projects together, one circle at a time.
            </p>
            {/* Social icons */}
            <div className="flex gap-2 mt-2">
              {[
                { href: 'https://github.com/mahmudulhasanzb/KindCircle', label: 'GitHub', icon: <GithubIcon size={16} /> },
                { href: 'https://linkedin.com', label: 'LinkedIn', icon: <LinkedinIcon size={16} /> },
                { href: 'https://facebook.com', label: 'Facebook', icon: <FacebookIcon size={16} /> },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-neutral-500 transition-all duration-200 hover:text-white hover:-translate-y-0.5"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Platform</p>
              <div className="flex flex-col gap-2.5">
                <Link href="/campaigns" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Explore Campaigns</Link>
                <Link href="/leaderboard" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Leaderboard</Link>
                <Link href="/register" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Start a Campaign</Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Company</p>
              <div className="flex flex-col gap-2.5">
                <Link href="/about" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">About Us</Link>
                <a href="https://github.com/mahmudulhasanzb/KindCircle" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">GitHub</a>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Legal</p>
              <div className="flex flex-col gap-2.5">
                <Link href="/terms" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Terms of Service</Link>
                <Link href="/privacy" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-neutral-600 sm:flex-row">
            <p>© {new Date().getFullYear()} KindCircle. All rights reserved.</p>
            <p className="flex items-center gap-1.5">
              Built with
              <span className="text-[#EF4444]">❤️</span>
              for a better community.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

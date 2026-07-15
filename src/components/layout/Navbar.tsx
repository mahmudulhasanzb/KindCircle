'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu,
  X,
  Coins,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  User,
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { authClient } from '@/lib/auth-client';


export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsUserDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsUserDropdownOpen(false), 150);
  };

  const handleDropdownClick = () => setIsUserDropdownOpen(!isUserDropdownOpen);

  const { data: session } = authClient.useSession();
  const user = session?.user as any;

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push('/signin'),
      },
    });
  };

  return (
    <nav
      className="sticky top-0 z-50 h-16 w-full transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(9,9,11,0.85)'
          : 'rgba(9,9,11,0.6)',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid rgba(255,255,255,0.04)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo + nav links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl font-black text-sm text-white transition-all duration-200 group-hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #6366F1, #0EA5E9)',
                boxShadow: '0 4px 16px rgba(99,102,241,0.35)',
              }}
            >
              KC
            </div>
            <span className="hidden font-black text-lg tracking-tight text-white sm:block">
              Kind<span className="text-[#6366F1]">Circle</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-1 md:flex">
            {[
              { href: '/', label: 'Home' },
              { href: '/campaigns', label: 'Explore' },
              ...(user ? [{ href: '/leaderboard', label: 'Leaderboard' }] : []),
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="relative px-3 py-1.5 text-[13px] font-semibold transition-colors duration-200 rounded-lg"
                style={{ color: isActive(href) ? '#818CF8' : 'rgba(255,255,255,0.5)' }}
              >
                {label}
                {isActive(href) && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #6366F1, #0EA5E9)' }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Right section */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://github.com/mahmudulhasanzb/KindCircle"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[12px] font-semibold text-white/40 hover:text-white/80 transition-colors"
          >
            <GithubIcon size={15} />
            <span>GitHub</span>
          </a>

          {user ? (
            <div className="flex items-center gap-3">
              {/* Credits pill */}
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-bold"
                style={{ background: 'rgba(14,165,233,0.12)', color: '#38BDF8', border: '1px solid rgba(14,165,233,0.2)' }}
              >
                <Coins size={13} />
                <span>{user.credits} Credits</span>
              </div>

              {/* User dropdown */}
              <div
                className="relative"
                ref={dropdownRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={handleDropdownClick}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer group"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(99,102,241,0.2)' }}>
                    {user.image ? (
                      <img src={user.image} alt="User avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-3.5 w-3.5 text-[#818CF8]" />
                    )}
                  </div>
                  <p className="text-[13px] font-bold text-white/80 group-hover:text-white transition-colors whitespace-nowrap">
                    {user.name.length > 10 ? `${user.name.slice(0, 10)}...` : user.name}
                  </p>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-white/40 transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isUserDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 rounded-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    style={{
                      background: 'rgba(15,15,20,0.95)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(16px)',
                      boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
                    }}
                  >
                    <div className="px-4 py-3 border-b border-white/6">
                      <p className="text-sm font-black text-white truncate">{user.name}</p>
                      <p className="text-xs text-white/35 truncate mt-0.5">{user.email}</p>
                    </div>
                    <div className="p-1.5 space-y-0.5">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-white/50 hover:text-white hover:bg-white/5 transition-all duration-150"
                      >
                        <LayoutDashboard size={14} className="text-[#6366F1]" />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-[#EF4444]/70 hover:text-[#EF4444] hover:bg-red-500/5 transition-all duration-150 cursor-pointer text-left"
                      >
                        <LogOut size={14} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="px-4 py-2 text-[13px] font-bold text-white/60 hover:text-white transition-colors rounded-xl hover:bg-white/5"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-[13px] font-bold text-white rounded-xl transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #6366F1, #0EA5E9)',
                  boxShadow: '0 4px 16px rgba(99,102,241,0.3)',
                }}
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-xl p-2 text-white/50 hover:text-white hover:bg-white/8 focus:outline-none transition-colors"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="border-t border-white/6 px-4 pt-3 pb-5 md:hidden"
          style={{ background: 'rgba(9,9,11,0.95)', backdropFilter: 'blur(16px)' }}
        >
          <div className="space-y-1">
            {[
              { href: '/campaigns', label: 'Explore Campaigns' },
              ...(user ? [
                { href: '/leaderboard', label: 'Leaderboard' },
                { href: '/dashboard', label: 'Dashboard' },
              ] : []),
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-white/50 hover:bg-white/5 hover:text-white transition-all"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="mt-4 border-t border-white/6 pt-4">
            {user ? (
              <div className="space-y-3 px-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center"
                      style={{ background: 'rgba(99,102,241,0.15)' }}>
                      {user.image
                        ? <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                        : <User className="h-4 w-4 text-[#818CF8]" />}
                    </div>
                    <div>
                      <p className="text-sm font-black text-white">{user.name}</p>
                      <p className="text-xs text-white/35">{user.email}</p>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold"
                    style={{ background: 'rgba(14,165,233,0.12)', color: '#38BDF8' }}
                  >
                    <Coins size={12} />
                    <span>{user.credits}</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold text-[#EF4444]/80 hover:text-[#EF4444] transition-colors cursor-pointer"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}
                >
                  <LogOut size={14} />
                  Log Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 px-2">
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex justify-center rounded-xl py-2.5 text-sm font-bold text-white/60 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex justify-center rounded-xl py-2.5 text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #6366F1, #0EA5E9)' }}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

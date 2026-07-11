"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Coins, LogOut, ChevronDown, User, LayoutDashboard } from "lucide-react";
import { useMockAuth } from "@/lib/mock-auth";
import { GithubIcon } from "@/components/ui/Icons";

export default function Navbar() {
  const pathname = usePathname();
  const { user, login, logout } = useMockAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [devDropdownOpen, setDevDropdownOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const handleRoleSwitch = (role: "supporter" | "creator" | "admin") => {
    login(role);
    setDevDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 h-16 w-full border-b border-neutral-800 bg-neutral-900/85 backdrop-blur-md text-white transition-all">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Section: Logo */}
        <div className="flex items-center gap-8">
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary font-bold text-lg text-white shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
              KC
            </div>
            <span className="hidden font-bold text-xl tracking-tight text-white sm:block">
              Kind<span className="text-primary">Circle</span>
            </span>
          </Link>

          {/* Navigation Links (Desktop) */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/campaigns"
              className={`text-[14px] font-medium transition-colors hover:text-primary ${
                isActive("/campaigns") ? "text-primary" : "text-neutral-400"
              }`}
            >
              Explore Campaigns
            </Link>
          </div>
        </div>

        {/* Right Section: Auth & Actions */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Join as Developer (GitHub link) */}
          <a
            href="https://github.com/mahmudulhasanzb/KindCircle"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[13px] font-medium text-neutral-400 hover:text-white transition-colors"
          >
            <GithubIcon size={16} />
            <span>Join as Developer</span>
          </a>

          {/* Dev Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setDevDropdownOpen(!devDropdownOpen)}
              className="flex items-center gap-1 rounded-md border border-neutral-700 bg-neutral-800/50 px-2.5 py-1 text-xs font-semibold text-accent hover:bg-neutral-800 transition-colors"
            >
              <span>Role: {user ? user.role : "Guest"}</span>
              <ChevronDown size={12} />
            </button>

            {devDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-lg border border-neutral-800 bg-neutral-900 p-1 shadow-lg ring-1 ring-black/5">
                <button
                  onClick={() => {
                    logout();
                    setDevDropdownOpen(false);
                  }}
                  className="w-full rounded-md px-3 py-1.5 text-left text-xs font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white"
                >
                  Guest (Logout)
                </button>
                <button
                  onClick={() => handleRoleSwitch("supporter")}
                  className="w-full rounded-md px-3 py-1.5 text-left text-xs font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white"
                >
                  Supporter
                </button>
                <button
                  onClick={() => handleRoleSwitch("creator")}
                  className="w-full rounded-md px-3 py-1.5 text-left text-xs font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white"
                >
                  Creator
                </button>
                <button
                  onClick={() => handleRoleSwitch("admin")}
                  className="w-full rounded-md px-3 py-1.5 text-left text-xs font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white"
                >
                  Admin
                </button>
              </div>
            )}
          </div>

          {user ? (
            /* Authenticated State */
            <div className="flex items-center gap-4">
              {/* Credit Counter */}
              <div className="flex items-center gap-1.5 rounded-lg bg-secondary/15 px-3 py-1.5 text-[13px] font-semibold text-secondary">
                <Coins size={16} />
                <span>{user.credits} Credits</span>
              </div>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-9 w-9 rounded-full object-cover border border-neutral-700 ring-2 ring-primary/20"
                  />
                </button>

                {userDropdownOpen && (
                  <>
                    {/* Overlay to close on click outside */}
                    <div className="fixed inset-0 z-10" onClick={() => setUserDropdownOpen(false)} />
                    
                    <div className="absolute right-0 z-20 mt-2 w-52 rounded-xl border border-neutral-800 bg-neutral-950 p-1.5 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-3 py-2 border-b border-neutral-800">
                        <p className="text-sm font-semibold text-white">{user.name}</p>
                        <p className="text-xs text-neutral-400 truncate">{user.email}</p>
                      </div>
                      
                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
                      >
                        <LayoutDashboard size={14} />
                        <span>Dashboard</span>
                      </Link>
                      
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-danger hover:bg-danger/10 transition-colors"
                      >
                        <LogOut size={14} />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            /* Guest State */
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="rounded-lg border border-neutral-700 bg-transparent px-4 py-2 text-[13px] font-semibold text-neutral-200 transition-colors hover:border-white hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-primary px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-primary/90"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Dev role switcher for mobile */}
          <button
            onClick={() => setDevDropdownOpen(!devDropdownOpen)}
            className="rounded-md border border-neutral-700 bg-neutral-800/50 px-2 py-1 text-[11px] font-semibold text-accent hover:bg-neutral-800"
          >
            {user ? user.role : "Guest"}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Dev role switcher dropdown for mobile */}
      {devDropdownOpen && md_hidden_dropdown()}

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="border-b border-neutral-800 bg-neutral-950 px-4 pt-2 pb-4 md:hidden">
          <div className="space-y-1">
            <Link
              href="/campaigns"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white"
            >
              Explore Campaigns
            </Link>
            {user && (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white"
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="mt-4 border-t border-neutral-800 pt-4">
            <a
              href="https://github.com/mahmudulhasanzb/KindCircle"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-base font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white"
            >
              <GithubIcon size={18} />
              <span>Join as Developer</span>
            </a>

            {user ? (
              <div className="mt-4 space-y-3 px-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-semibold text-white">{user.name}</p>
                      <p className="text-xs text-neutral-400">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 rounded-lg bg-secondary/15 px-2.5 py-1 text-xs font-semibold text-secondary">
                    <Coins size={14} />
                    <span>{user.credits}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-danger/10 py-2.5 text-sm font-semibold text-danger hover:bg-danger/20 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-3 px-3">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex justify-center rounded-lg border border-neutral-700 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex justify-center rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
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

  function md_hidden_dropdown() {
    return (
      <div className="absolute right-4 z-50 mt-1 w-40 rounded-lg border border-neutral-800 bg-neutral-900 p-1 shadow-lg md:hidden">
        <button
          onClick={() => {
            logout();
            setDevDropdownOpen(false);
          }}
          className="w-full rounded-md px-3 py-1.5 text-left text-xs font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white"
        >
          Guest (Logout)
        </button>
        <button
          onClick={() => handleRoleSwitch("supporter")}
          className="w-full rounded-md px-3 py-1.5 text-left text-xs font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white"
        >
          Supporter
        </button>
        <button
          onClick={() => handleRoleSwitch("creator")}
          className="w-full rounded-md px-3 py-1.5 text-left text-xs font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white"
        >
          Creator
        </button>
        <button
          onClick={() => handleRoleSwitch("admin")}
          className="w-full rounded-md px-3 py-1.5 text-left text-xs font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white"
        >
          Admin
        </button>
      </div>
    );
  }
}

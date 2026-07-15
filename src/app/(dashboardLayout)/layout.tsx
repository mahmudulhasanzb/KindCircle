'use client';

import React, { useState, useEffect } from 'react';
import DashboardSideBar from '@/components/layout/DashboardSideBar';
import { Menu, X, Coins, Bell, User } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import NotificationPopup from '@/components/layout/NotificationPopup';
import { getUserNotificationsAction } from '@/lib/api/notifications/actions';
import { Notification } from '@/lib/types/notification';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showBadge, setShowBadge] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user as any;

  const fetchNotifications = async () => {
    if (user?.email) {
      try {
        const data = await getUserNotificationsAction(user.email);
        setNotifications(data);
        if (data.length > 0) {
          setShowBadge(true);
        }
      } catch (err) {
        console.error('Failed to load notifications:', err);
      }
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Refresh notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [user?.email]);

  return (
    <div className="flex h-screen w-full bg-neutral-950 text-white overflow-hidden font-sans">
      {/* Desktop Sidebar (Left side, hidden on mobile/tablet) */}
      <div className="hidden lg:block flex-shrink-0">
        <DashboardSideBar />
      </div>

      {/* Mobile/Tablet Sidebar Drawer (Slide-over panel) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative flex flex-col w-64 max-w-xs bg-neutral-950 border-r border-neutral-800/80 transform transition-transform duration-300 animate-in slide-in-from-left duration-200">
            <div className="absolute top-2 right-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="flex items-center justify-center h-10 w-10 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="h-full overflow-y-auto">
              <DashboardSideBar />
            </div>
          </div>
        </div>
      )}

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Dashboard Top Header */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30" style={{ background: 'rgba(9,9,11,0.7)', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)' }}>
          <div className="flex items-center gap-3">
            {/* Hamburger menu trigger */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Mobile-only Logo */}
            <Link href="/" className="flex items-center gap-2 lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary font-bold text-sm text-white shadow-md">
                KC
              </div>
            </Link>
            
            <h1 className="hidden sm:block text-base font-semibold text-neutral-200">
              Dashboard
            </h1>
          </div>

          {/* Header Action Items */}
          <div className="flex items-center gap-4">
            {/* Credit Counter */}
            {user && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-bold" style={{ background: 'rgba(14,165,233,0.12)', color: '#38BDF8', border: '1px solid rgba(14,165,233,0.2)' }}>
                <Coins size={14} />
                <span>{user.credits ?? 0} Credits</span>
              </div>
            )}

            {/* Notification Bell */}
            <div className="relative">
              <button
                data-bell-button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setShowBadge(false); // clear dot when opening
                }}
                className="relative p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all duration-200"
              >
                <Bell className="h-5 w-5" />
                {showBadge && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-neutral-900 animate-pulse" />
                )}
              </button>
              <NotificationPopup
                isOpen={notificationsOpen}
                onClose={() => setNotificationsOpen(false)}
                notifications={notifications}
                onRefresh={fetchNotifications}
              />
            </div>

            {/* Profile Avatar / User Identity */}
            {user && (
              <div className="flex items-center gap-2 pl-2 border-l border-neutral-800">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-800 flex items-center justify-center border border-neutral-700">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="User avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : user.image ? (
                    <img
                      src={user.image}
                      alt="User avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4 text-neutral-400" />
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-bold text-white truncate max-w-[100px]">
                    {user.name}
                  </p>
                  <p className="text-[9px] font-extrabold uppercase tracking-wider text-neutral-400">
                    {user.role}
                  </p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Dashboard Scrollable Inner Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8" style={{ background: '#0a0a0f' }}>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

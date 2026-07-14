'use client';

import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, X, Info, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Notification } from '@/lib/types/notification';

interface NotificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onRefresh: () => void;
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

export default function NotificationPopup({
  isOpen,
  onClose,
  notifications,
  onRefresh,
}: NotificationPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        // Only close if we didn't click the bell button itself (handled by button toggling)
        const target = event.target as HTMLElement;
        if (!target.closest('[data-bell-button]')) {
          onClose();
        }
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Refresh notifications when popup is opened
  useEffect(() => {
    if (isOpen) {
      onRefresh();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={popupRef}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="absolute right-0 mt-2 w-full max-w-[360px] sm:w-[360px] rounded-xl border border-neutral-800 bg-neutral-900 shadow-xl z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <Bell className="h-4.5 w-4.5 text-primary" />
              <h3 className="text-sm font-semibold text-white">Notifications</h3>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* List Content */}
          <div className="max-h-[340px] overflow-y-auto divide-y divide-neutral-800/60 custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="p-3 rounded-full bg-neutral-800/40 text-neutral-500 mb-2">
                  <Bell className="h-5 w-5" />
                </div>
                <p className="text-xs font-medium text-neutral-400">All caught up!</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">No notifications yet.</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <Link
                  key={notif._id}
                  href={notif.actionRoute || '#'}
                  onClick={onClose}
                  className="flex gap-3 px-4 py-3.5 hover:bg-neutral-800/40 transition-colors group text-left block"
                >
                  <div className="mt-0.5 shrink-0 h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                    <Info className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-neutral-200 group-hover:text-white transition-colors leading-relaxed">
                      {notif.message}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] text-neutral-500">
                        {formatRelativeTime(notif.time)}
                      </span>
                      {notif.actionRoute && (
                        <>
                          <span className="text-[9px] text-neutral-600">•</span>
                          <span className="text-[10px] text-primary flex items-center gap-0.5 font-medium group-hover:underline">
                            View details <ExternalLink className="h-2.5 w-2.5" />
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

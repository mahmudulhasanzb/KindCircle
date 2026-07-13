import React from 'react';

export default function Loading() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-8 space-y-6 w-full animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4" />

      {/* Category / Date Badges Skeleton */}
      <div className="flex gap-3">
        <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded-full w-20" />
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-32" />
      </div>

      {/* Title / Creator Skeleton */}
      <div className="space-y-3 pb-4">
        <div className="h-10 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3" />
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column Skeleton */}
        <div className="lg:col-span-2 space-y-8">
          {/* Cover image placeholder */}
          <div className="w-full aspect-[16/9] bg-neutral-200 dark:bg-neutral-800 rounded-xl" style={{ borderRadius: '12px' }} />
          
          {/* Story placeholder */}
          <div className="space-y-4">
            <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4" />
            <div className="space-y-2">
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-5/6" />
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-2/3" />
            </div>
          </div>

          {/* Reward placeholder */}
          <div className="h-24 bg-neutral-200 dark:bg-neutral-800 rounded-xl w-full" style={{ borderRadius: '12px' }} />
        </div>

        {/* Right Column (Sidebar) Skeleton */}
        <div className="space-y-6">
          {/* Stats card placeholder */}
          <div className="p-5 bg-neutral-100 dark:bg-neutral-800/60 rounded-xl space-y-4" style={{ borderRadius: '12px', padding: '20px' }}>
            <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2" />
            <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full w-full" style={{ borderRadius: '9999px' }} />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded" />
              <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded" />
            </div>
          </div>

          {/* Form card placeholder */}
          <div className="p-5 bg-neutral-100 dark:bg-neutral-800/60 rounded-xl space-y-4" style={{ borderRadius: '12px', padding: '20px' }}>
            <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-2/3" />
            <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded w-full" />
            <div className="h-10 bg-neutral-200 dark:bg-neutral-700 rounded w-full" />
          </div>
        </div>

      </div>
    </div>
  );
}

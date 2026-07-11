import React from "react";

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-64px-150px)] flex-1 flex-col items-center justify-center bg-neutral-900 px-4">
      <div className="relative flex h-16 w-16 items-center justify-center">
        {/* Glowing Outer Ring */}
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
        
        {/* Spinning Double Rings */}
        <div className="h-12 w-12 rounded-full border-4 border-neutral-800" />
        <div className="absolute h-12 w-12 animate-spin rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent" />
      </div>
      <p className="mt-4 text-sm font-medium text-neutral-400 tracking-wide animate-pulse">
        Loading...
      </p>
    </div>
  );
}

import React from "react";

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-64px-150px)] flex-1 flex-col items-center justify-center bg-neutral-950 px-4">
      {/* Animated logo mark */}
      <div className="relative flex items-center justify-center mb-6">
        {/* Outer pulse ring */}
        <div
          className="absolute w-20 h-20 rounded-full animate-ping"
          style={{ background: 'rgba(99,102,241,0.12)' }}
        />
        {/* Mid ring — slow spin */}
        <div
          className="absolute w-16 h-16 rounded-full border-2 border-dashed animate-spin"
          style={{ borderColor: 'rgba(99,102,241,0.3)', animationDuration: '4s' }}
        />
        {/* Inner spinning border */}
        <div className="absolute w-12 h-12 rounded-full border-2 border-transparent animate-spin" style={{ borderTopColor: '#6366F1', borderRightColor: '#0EA5E9' }} />
        {/* KC logo mark */}
        <div
          className="relative flex h-10 w-10 items-center justify-center rounded-xl font-black text-sm text-white z-10"
          style={{ background: 'linear-gradient(135deg, #6366F1, #0EA5E9)', boxShadow: '0 0 24px rgba(99,102,241,0.5)' }}
        >
          KC
        </div>
      </div>

      <p
        className="text-sm font-semibold tracking-widest uppercase animate-pulse"
        style={{ color: 'rgba(255,255,255,0.4)' }}
      >
        Loading...
      </p>
    </div>
  );
}

import React from "react";

interface SkeletonLoaderProps {
  className?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
}

export default function SkeletonLoader({
  className = "",
  width,
  height,
  borderRadius,
}: SkeletonLoaderProps) {
  return (
    <div
      className={`animate-pulse bg-neutral-200 dark:bg-neutral-800 ${borderRadius || ""} ${className}`}
      style={{
        width,
        height,
      }}
      role="status"
      aria-live="polite"
      aria-label="Loading..."
    />
  );
}

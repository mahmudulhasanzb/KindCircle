import React from "react";
import Link from "next/link";

export const metadata = {
  title: "KindCircle — Account",
  description: "Sign in or create your KindCircle account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-neutral-950 px-4 py-12">
      {/* Subtle background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--primary) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Logo header */}
      <Link
        href="/"
        className="group relative z-10 mb-8 flex items-center gap-2.5"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-lg font-bold text-white shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
          KC
        </div>
        <span className="text-xl font-bold tracking-tight text-white">
          Kind<span className="text-primary">Circle</span>
        </span>
      </Link>

      {/* Form area */}
      <div className="relative z-10 w-full max-w-[440px]">{children}</div>
    </div>
  );
}

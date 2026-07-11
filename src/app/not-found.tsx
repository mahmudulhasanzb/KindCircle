import React from "react";
import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-64px-150px)] flex-1 flex-col items-center justify-center px-4 py-16 text-center bg-neutral-900 text-white">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-800 text-accent mb-6 animate-bounce">
        <FileQuestion size={40} />
      </div>
      <h1 className="text-6xl font-extrabold tracking-tight text-white sm:text-7xl">
        404
      </h1>
      <h2 className="mt-4 text-xl font-semibold text-neutral-200 sm:text-2xl">
        Page Not Found
      </h2>
      <p className="mt-2 max-w-md text-sm text-neutral-400">
        Sorry, we couldn&apos;t find the page you are looking for. It might have been moved, deleted, or never existed.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          <Home size={16} />
          <span>Back to Home</span>
        </Link>
        <Link
          href="/campaigns"
          className="flex items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-transparent px-5 py-2.5 text-sm font-semibold text-neutral-300 transition-colors hover:border-white hover:text-white"
        >
          Explore Campaigns
        </Link>
      </div>
    </div>
  );
}

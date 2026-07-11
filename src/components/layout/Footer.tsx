import React from "react";
import Link from "next/link";
import { Github, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-800 bg-neutral-950 py-8 text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary font-bold text-sm text-white">
                KC
              </div>
              <span className="font-semibold text-lg tracking-tight text-white">
                Kind<span className="text-primary">Circle</span>
              </span>
            </Link>
            <p className="text-xs text-neutral-500 text-center md:text-left max-w-xs">
              Empowering creators and supporters to build meaningful projects together, one circle at a time.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium">
            <Link href="/campaigns" className="hover:text-white transition-colors">
              Explore
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a
              href="https://github.com/mahmudulhasanzb/KindCircle"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-neutral-900 p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-neutral-900 p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-neutral-900 p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-all"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-neutral-800/60" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-neutral-600 sm:flex-row">
          <p>© {new Date().getFullYear()} KindCircle. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with ❤️ for a better community.
          </p>
        </div>
      </div>
    </footer>
  );
}

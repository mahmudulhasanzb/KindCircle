'use client';

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';

interface ContributionItem {
  _id: string;
  campaignId: string;
  campaignTitle: string;
  supporter_email: string;
  creator_email: string;
  creator_name: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface SupporterContributionsTableProps {
  contributions: ContributionItem[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export default function SupporterContributionsTable({
  contributions,
  total,
  totalPages,
  currentPage,
}: SupporterContributionsTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handlePageChange(newPage: number) {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  }

  // Render pagination numbers array
  const pageNumbers = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="w-full space-y-6">
      {contributions.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-neutral-800 rounded-xl bg-neutral-950/15"
          style={{ borderRadius: '12px' }}
        >
          <FileText className="h-10 w-10 text-neutral-500 mb-3 opacity-40" />
          <h3 className="text-base font-bold text-neutral-200 mb-1">No contributions made yet</h3>
          <p className="text-xs text-neutral-400 max-w-xs mb-5 leading-normal">
            You haven't supported any campaigns yet. Explore campaigns to find projects to back.
          </p>
          <button
            onClick={() => router.push('/campaigns')}
            className="px-5 py-2.5 bg-[var(--primary)] text-white text-xs font-semibold rounded-lg hover:bg-[#4F46E5] transition-colors cursor-pointer"
            style={{ borderRadius: '8px' }}
          >
            Explore Campaigns
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div
            className="overflow-x-auto w-full border border-neutral-800/80 rounded-xl bg-neutral-950/20"
            style={{ borderRadius: '12px' }}
          >
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-neutral-950/60 border-b border-neutral-800/80 text-neutral-400 font-semibold">
                  <th className="px-6 py-4">Campaign Title</th>
                  <th className="px-6 py-4">Amount Pledged</th>
                  <th className="px-6 py-4">Campaign Creator</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/40">
                {contributions.map((contrib) => {
                  const statusClass =
                    contrib.status === 'approved'
                      ? 'chip-approved'
                      : contrib.status === 'rejected'
                      ? 'chip-rejected'
                      : 'chip-pending';

                  return (
                    <tr
                      key={contrib._id}
                      className="hover:bg-[var(--primary)]/5 transition-colors duration-150"
                    >
                      <td className="px-6 py-4.5 font-semibold text-white max-w-[240px] truncate">
                        {contrib.campaignTitle}
                      </td>
                      <td className="px-6 py-4.5 font-bold text-[var(--primary)] tabular-nums">
                        {contrib.amount.toLocaleString()} credits
                      </td>
                      <td className="px-6 py-4.5 text-neutral-300">
                        <div className="flex flex-col">
                          <span>{contrib.creator_name}</span>
                          <span className="text-[10px] text-neutral-400">
                            {contrib.creator_email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4.5 text-neutral-400 text-xs">
                        {new Date(contrib.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4.5">
                        <span className={statusClass} style={{ fontSize: '10px', padding: '3px 10px' }}>
                          {contrib.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ── PAGINATION CONTROLS ── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-neutral-800/20">
              <span className="text-xs text-neutral-400">
                Showing page <strong className="text-white">{currentPage}</strong> of{' '}
                <strong className="text-white">{totalPages}</strong> ({total} total records)
              </span>

              <div className="flex items-center gap-1">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-neutral-400 transition-all cursor-pointer"
                  style={{ borderRadius: '8px' }}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>

                {/* Page numbers */}
                {pageNumbers.map((num) => (
                  <button
                    key={num}
                    onClick={() => handlePageChange(num)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer border ${
                      currentPage === num
                        ? 'bg-[var(--primary)] border-[var(--primary)] text-white'
                        : 'border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800'
                    }`}
                    style={{ borderRadius: '8px' }}
                  >
                    {num}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-neutral-400 transition-all cursor-pointer"
                  style={{ borderRadius: '8px' }}
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

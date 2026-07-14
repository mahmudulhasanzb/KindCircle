'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Check, X, ShieldAlert } from 'lucide-react';
import { dismissReportAction } from '@/lib/api/reports/actions';
import { rejectCampaignAction, deleteCampaignAction } from '@/lib/api/admin/actions';

interface Report {
  _id: string;
  campaignId: string;
  campaignTitle: string;
  reporterName: string;
  reporterEmail: string;
  reason: string;
  createdAt: string;
}

interface ReportManagementTableProps {
  reports: Report[];
}

export default function ReportManagementTable({ reports: initialReports }: ReportManagementTableProps) {
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  async function handleSuspend(reportId: string, campaignId: string) {
    if (!confirm('Are you sure you want to suspend this campaign? This will mark it as rejected.')) {
      return;
    }

    setIsProcessing(reportId);
    const toastId = toast.loading('Suspending campaign...');
    try {
      const res = await rejectCampaignAction(campaignId);
      if (res && res.error) {
        toast.error(res.error, { id: toastId });
      } else if (res && res.message && res.message.includes('failed')) {
        toast.error(res.message, { id: toastId });
      } else {
        // Also dismiss the report automatically
        await dismissReportAction(reportId);
        toast.success('Campaign suspended and report resolved!', { id: toastId });
        setReports((prev) => prev.filter((r) => r._id !== reportId));
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to suspend campaign', { id: toastId });
    } finally {
      setIsProcessing(null);
    }
  }

  async function handleDelete(reportId: string, campaignId: string) {
    if (!confirm('Are you sure you want to permanently delete this campaign? This cannot be undone.')) {
      return;
    }

    setIsProcessing(reportId);
    const toastId = toast.loading('Deleting campaign...');
    try {
      const res = await deleteCampaignAction(campaignId);
      if (res && res.error) {
        toast.error(res.error, { id: toastId });
      } else if (res && res.message && res.message.includes('failed')) {
        toast.error(res.message, { id: toastId });
      } else {
        // Also dismiss the report automatically
        await dismissReportAction(reportId);
        toast.success('Campaign deleted and report resolved!', { id: toastId });
        setReports((prev) => prev.filter((r) => r._id !== reportId));
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete campaign', { id: toastId });
    } finally {
      setIsProcessing(null);
    }
  }

  async function handleDismiss(reportId: string) {
    setIsProcessing(reportId);
    const toastId = toast.loading('Dismissing report...');
    try {
      const res = await dismissReportAction(reportId);
      if (res && res.error) {
        toast.error(res.error, { id: toastId });
      } else if (res && res.message && res.message.includes('failed')) {
        toast.error(res.message, { id: toastId });
      } else {
        toast.success('Report dismissed successfully.', { id: toastId });
        setReports((prev) => prev.filter((r) => r._id !== reportId));
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to dismiss report', { id: toastId });
    } finally {
      setIsProcessing(null);
    }
  }

  if (reports.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-10 text-center text-sm text-neutral-500">
        No campaign reports pending review.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-800/70">
      <table className="w-full text-sm text-left">
        <thead className="bg-neutral-900/70">
          <tr className="border-b border-neutral-800/80">
            <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Reporter</th>
            <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Flagged Campaign</th>
            <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Reason</th>
            <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Date</th>
            <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800/60 bg-neutral-900/30">
          {reports.map((r) => (
            <tr key={r._id} className="hover:bg-neutral-800/20 transition-colors">
              <td className="px-5 py-4">
                <div className="text-sm font-semibold text-white">{r.reporterName}</div>
                <div className="text-xs text-neutral-500 mt-0.5">{r.reporterEmail}</div>
              </td>
              <td className="px-5 py-4 text-white font-medium">
                {r.campaignTitle}
              </td>
              <td className="px-5 py-4 text-neutral-300 max-w-[240px] truncate" title={r.reason}>
                {r.reason}
              </td>
              <td className="px-5 py-4 text-neutral-500">
                {new Date(r.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </td>
              <td className="px-5 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleSuspend(r._id, r.campaignId)}
                    disabled={isProcessing !== null || r.campaignTitle === 'Deleted Campaign'}
                    className="inline-flex items-center gap-1 rounded-lg bg-amber-500/10 px-2.5 py-1.5 text-xs font-bold text-amber-400 ring-1 ring-amber-500/30 hover:bg-amber-500/20 transition disabled:opacity-50 cursor-pointer"
                  >
                    <span>Suspend</span>
                  </button>
                  <button
                    onClick={() => handleDelete(r._id, r.campaignId)}
                    disabled={isProcessing !== null || r.campaignTitle === 'Deleted Campaign'}
                    className="inline-flex items-center gap-1 rounded-lg bg-rose-500/10 px-2.5 py-1.5 text-xs font-bold text-rose-400 ring-1 ring-rose-500/30 hover:bg-rose-500/20 transition disabled:opacity-50 cursor-pointer"
                  >
                    <span>Delete</span>
                  </button>
                  <button
                    onClick={() => handleDismiss(r._id)}
                    disabled={isProcessing !== null}
                    className="p-1.5 rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition disabled:opacity-50 cursor-pointer"
                    title="Dismiss Report"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React from 'react';
import { roleValidator } from '@/lib/api/session';
import { getAdminReports } from '@/lib/api/reports/data';
import ReportManagementTable from '@/components/ui/ReportManagementTable';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Campaign Reports — KindCircle',
  description: 'Review flagged campaign reports and take management actions.',
};

export default async function AdminReportsPage() {
  await roleValidator('admin');

  let reports: any[] = [];
  try {
    reports = await getAdminReports();
  } catch (error) {
    console.error('Failed to load campaign reports:', error);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1.5 pb-5 border-b border-neutral-800/80">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Campaign Reports
        </h1>
        <p className="text-sm text-neutral-400">
          Review campaigns reported by supporters for policy violations.
        </p>
      </div>

      <ReportManagementTable reports={reports} />
    </div>
  );
}

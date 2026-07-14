import React from 'react';
import { roleValidator } from '@/lib/api/session';
import { getAdminUsers } from '@/lib/api/admin/data';
import UserManagementTable from '@/components/ui/UserManagementTable';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Manage Users — KindCircle',
  description: 'List, update roles, or delete users on KindCircle.',
};

export default async function AdminUsersPage() {
  await roleValidator('admin');

  let users: any[] = [];
  try {
    users = await getAdminUsers();
  } catch (error) {
    console.error('Failed to load users:', error);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1.5 pb-5 border-b border-neutral-800/80">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Manage Users
        </h1>
        <p className="text-sm text-neutral-400">
          View registered users, change roles, or remove accounts.
        </p>
      </div>

      <UserManagementTable users={users} />
    </div>
  );
}

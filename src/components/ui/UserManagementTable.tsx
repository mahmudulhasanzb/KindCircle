'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { User, Trash2 } from 'lucide-react';
import { deleteUserAction, updateUserRoleAction } from '@/lib/api/admin/actions';

interface UserData {
  _id: string;
  name: string;
  email: string;
  photoUrl?: string;
  role: 'supporter' | 'creator' | 'admin';
  credits: number;
}

interface UserManagementTableProps {
  users: UserData[];
}

export default function UserManagementTable({ users: initialUsers }: UserManagementTableProps) {
  const router = useRouter();
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  async function handleRoleChange(id: string, newRole: 'supporter' | 'creator' | 'admin') {
    setIsProcessing(id);
    const toastId = toast.loading('Updating user role...');
    try {
      const res = await updateUserRoleAction(id, newRole);
      if (res && res.error) {
        toast.error(res.error, { id: toastId });
      } else if (res && res.message && res.message.includes('failed')) {
        toast.error(res.message, { id: toastId });
      } else {
        toast.success('User role updated!', { id: toastId });
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, role: newRole } : u))
        );
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to update role', { id: toastId });
    } finally {
      setIsProcessing(null);
    }
  }

  async function handleDelete(id: string, email: string) {
    if (!confirm(`Are you sure you want to remove user: ${email}? This action is irreversible.`)) {
      return;
    }

    setIsProcessing(id);
    const toastId = toast.loading('Removing user...');
    try {
      const res = await deleteUserAction(id);
      if (res && res.error) {
        toast.error(res.error, { id: toastId });
      } else if (res && res.message && res.message.includes('failed')) {
        toast.error(res.message, { id: toastId });
      } else {
        toast.success('User removed successfully.', { id: toastId });
        setUsers((prev) => prev.filter((u) => u._id !== id));
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete user', { id: toastId });
    } finally {
      setIsProcessing(null);
    }
  }

  if (users.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-10 text-center text-sm text-neutral-500">
        No users found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-800/70">
      <table className="w-full text-sm text-left">
        <thead className="bg-neutral-900/70">
          <tr className="border-b border-neutral-800/80">
            <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs">User Info</th>
            <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Email</th>
            <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Role</th>
            <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs">Credits Balance</th>
            <th className="px-5 py-3.5 font-semibold text-neutral-400 uppercase tracking-wider text-xs text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800/60 bg-neutral-900/30">
          {users.map((u) => (
            <tr key={u._id} className="hover:bg-neutral-800/20 transition-colors">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-800 flex items-center justify-center border border-neutral-700 flex-shrink-0">
                    {u.photoUrl ? (
                      <img src={u.photoUrl} alt={u.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-4.5 w-4.5 text-neutral-500" />
                    )}
                  </div>
                  <div className="min-w-0 max-w-[200px]">
                    <p className="font-semibold text-white truncate">{u.name}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 text-neutral-300">
                {u.email}
              </td>
              <td className="px-5 py-4 text-neutral-400">
                <select
                  value={u.role}
                  disabled={isProcessing === u._id}
                  onChange={(e) => handleRoleChange(u._id, e.target.value as any)}
                  className="rounded-lg border border-neutral-800 bg-neutral-950 px-2.5 py-1.5 text-xs text-white focus:border-primary focus:outline-none transition-colors cursor-pointer disabled:opacity-50"
                >
                  <option value="supporter">Supporter</option>
                  <option value="creator">Creator</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="px-5 py-4 text-white font-medium">
                {u.credits.toLocaleString()} credits
              </td>
              <td className="px-5 py-4 text-right">
                <button
                  onClick={() => handleDelete(u._id, u.email)}
                  disabled={isProcessing !== null}
                  className="p-2 rounded-lg text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition disabled:opacity-50 cursor-pointer"
                  title="Remove User"
                >
                  <Trash2 className="h-4.5 w-4.5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

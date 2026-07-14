'use client';

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  Compass,
  HeartHandshake,
  Coins,
  History,
  PlusCircle,
  FolderHeart,
  ArrowUpRight,
  Users,
  ShieldCheck,
  FileCheck,
  BarChart3,
  User,
  ChevronDown,
  LogOut,
  CheckSquare,
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const supporterMenuItem = [
  {
    label: 'Home',
    href: '/dashboard/supporter/home',
    icon: Home,
  },
  {
    label: 'Explore Campaigns',
    href: '/campaigns',
    icon: Compass,
  },
  {
    label: 'My Contributions',
    href: '/dashboard/supporter/contributions',
    icon: HeartHandshake,
  },
  {
    label: 'Purchase Credit',
    href: '/dashboard/supporter/purchase',
    icon: Coins,
  },
  {
    label: 'Payment History',
    href: '/dashboard/supporter/history',
    icon: History,
  },
];

const creatorMenuItem = [
  {
    label: 'Home',
    href: '/dashboard/creator/home',
    icon: Home,
  },
  {
    label: 'Add New Campaign',
    href: '/dashboard/creator/add-campaign',
    icon: PlusCircle,
  },
  {
    label: 'My Campaigns',
    href: '/dashboard/creator/my-campaigns',
    icon: FolderHeart,
  },
  {
    label: 'Withdrawals',
    href: '/dashboard/creator/withdrawals',
    icon: ArrowUpRight,
  },
  {
    label: 'Payment History',
    href: '/dashboard/creator/history',
    icon: History,
  },
];

const adminMenu = [
  {
    label: 'Home',
    href: '/dashboard/admin/home',
    icon: Home,
  },
  {
    label: 'Manage Users',
    href: '/dashboard/admin/users',
    icon: Users,
  },
  {
    label: 'Campaign Approvals',
    href: '/dashboard/admin/campaigns-approval',
    icon: CheckSquare,
  },
  {
    label: 'Manage Campaigns',
    href: '/dashboard/admin/campaigns',
    icon: ShieldCheck,
  },
  {
    label: 'Withdrawal Requests',
    href: '/dashboard/admin/withdrawals',
    icon: FileCheck,
  },
  {
    label: 'Reports',
    href: '/dashboard/admin/reports',
    icon: BarChart3,
  },
];

const DashboardSideBar = () => {
  const router = useRouter();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<any>(null);

  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const user = session?.user as any;
  const role = user?.role;

  const menuItems =
    role === 'supporter'
      ? supporterMenuItem
      : role === 'creator'
        ? creatorMenuItem
        : role === 'admin'
          ? adminMenu
          : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsUserDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsUserDropdownOpen(false);
    }, 150);
  };

  const handleDropdownClick = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleSignOut = async () => {
    const toastId = toast.loading('Signing out...');
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('Signed out successfully!', { id: toastId });
            router.push('/signin');
          },
        },
      });
    } catch (error) {
      console.error(error);
      toast.error('Sign out failed.', { id: toastId });
    }
  };

  return (
    <aside className="w-[260px] h-screen sticky top-0 bg-neutral-950 border-r border-neutral-800/80 flex flex-col justify-between z-40 select-none">
      {/* Brand Header */}
      <div>
        <div className="h-16 border-b border-neutral-800/80 flex items-center px-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary font-bold text-sm text-white shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
              KC
            </div>
            <span className="text-white font-extrabold text-lg tracking-wider font-sans group-hover:text-primary transition-colors">
              Kind<span className="text-primary">Circle</span>
            </span>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-170px)]">
          <div className="text-[10px] font-bold text-neutral-400/40 uppercase tracking-widest px-3 mb-2">
            Navigation
          </div>
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-[14px] font-semibold transition-all duration-200 group border-l-3 ${
                  active
                    ? 'bg-neutral-900 border-primary text-primary'
                    : 'border-transparent text-neutral-400 hover:text-white hover:bg-neutral-900/40'
                }`}
              >
                <IconComponent
                  className={`h-4.5 w-4.5 transition-colors duration-200 ${
                    active
                      ? 'text-primary'
                      : 'text-neutral-500 group-hover:text-primary/80'
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-neutral-800/80 bg-neutral-900/20 relative">
        {user ? (
          <div className="relative" ref={dropdownRef}>
            {/* User Dropdown */}
            {isUserDropdownOpen && (
              <div
                className="absolute bottom-full left-0 mb-2 w-56 bg-neutral-900/95 border border-neutral-800/80 rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150 backdrop-blur-md"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="p-2 border-b border-neutral-800/60 mb-1">
                  <p className="text-white text-xs font-bold truncate">
                    {user.name}
                  </p>
                  <p className="text-neutral-400/60 text-[10px] truncate">
                    {user.email}
                  </p>
                </div>
                <Link
                  href="/profile"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all duration-200"
                  onClick={() => setIsUserDropdownOpen(false)}
                >
                  <User className="h-3.5 w-3.5" />
                  <span>Profile Settings</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all duration-200 cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}

            {/* Profile Info Card */}
            <div
              className="flex items-center gap-3 p-2 rounded-lg bg-neutral-900/40 border border-neutral-800/60 cursor-pointer hover:border-primary/50 transition-all duration-200"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleDropdownClick}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-neutral-800 flex items-center justify-center border border-neutral-700 flex-shrink-0">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                ) : user.image ? (
                  <img
                    src={user.image}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-4.5 w-4.5 text-neutral-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-bold truncate leading-tight">
                  {user.name}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-primary mt-0.5">
                  {role}
                </p>
              </div>
              <ChevronDown
                className={`h-3.5 w-3.5 text-neutral-400/70 transition-transform duration-300 flex-shrink-0 ${
                  isUserDropdownOpen ? 'rotate-180 text-primary' : ''
                }`}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-2 rounded-lg bg-neutral-900/40 border border-neutral-800/60 animate-pulse">
            <div className="w-8 h-8 rounded-full bg-neutral-800" />
            <div className="flex-1 space-y-1.5">
              <div className="h-2.5 bg-neutral-800 rounded w-3/4" />
              <div className="h-2 bg-neutral-800 rounded w-1/2" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default DashboardSideBar;

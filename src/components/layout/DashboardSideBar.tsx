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
  { label: 'Home', href: '/dashboard/supporter/home', icon: Home },
  { label: 'Explore Campaigns', href: '/campaigns', icon: Compass },
  { label: 'My Contributions', href: '/dashboard/supporter/contributions', icon: HeartHandshake },
  { label: 'Purchase Credit', href: '/dashboard/supporter/purchase', icon: Coins },
  { label: 'Payment History', href: '/dashboard/supporter/history', icon: History },
];

const creatorMenuItem = [
  { label: 'Home', href: '/dashboard/creator/home', icon: Home },
  { label: 'Add New Campaign', href: '/dashboard/creator/add-campaign', icon: PlusCircle },
  { label: 'My Campaigns', href: '/dashboard/creator/my-campaigns', icon: FolderHeart },
  { label: 'Withdrawals', href: '/dashboard/creator/withdrawals', icon: ArrowUpRight },
  { label: 'Payment History', href: '/dashboard/creator/history', icon: History },
];

const adminMenu = [
  { label: 'Home', href: '/dashboard/admin/home', icon: Home },
  { label: 'Manage Users', href: '/dashboard/admin/users', icon: Users },
  { label: 'Campaign Approvals', href: '/dashboard/admin/campaigns-approval', icon: CheckSquare },
  { label: 'Manage Campaigns', href: '/dashboard/admin/campaigns', icon: ShieldCheck },
  { label: 'Withdrawal Requests', href: '/dashboard/admin/withdrawals', icon: FileCheck },
  { label: 'Reports', href: '/dashboard/admin/reports', icon: BarChart3 },
];

const roleColors: Record<string, string> = {
  supporter: '#0EA5E9',
  creator: '#6366F1',
  admin: '#F59E0B',
};

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
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsUserDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsUserDropdownOpen(false), 150);
  };

  const handleDropdownClick = () => setIsUserDropdownOpen(!isUserDropdownOpen);

  const handleSignOut = async () => {
    const toastId = toast.loading('Signing out...');
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('Signed out!', { id: toastId });
            router.push('/signin');
          },
        },
      });
    } catch (error) {
      console.error(error);
      toast.error('Sign out failed.', { id: toastId });
    }
  };

  const accentColor = roleColors[role] || '#6366F1';

  return (
    <aside
      className="w-[260px] h-screen sticky top-0 flex flex-col justify-between z-40 select-none"
      style={{
        background: 'rgba(9,9,11,0.95)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 flex items-center px-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg font-black text-sm text-white transition-transform group-hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #6366F1, #0EA5E9)', boxShadow: '0 4px 12px rgba(99,102,241,0.35)' }}
            >
              KC
            </div>
            <span className="text-white font-black text-base tracking-tight group-hover:text-[#818CF8] transition-colors">
              Kind<span className="text-[#6366F1]">Circle</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-0.5 overflow-y-auto max-h-[calc(100vh-170px)]">
          <p className="text-[10px] font-black text-white/20 uppercase tracking-widest px-3 mb-3">
            Navigation
          </p>
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={index}
                href={item.href}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 group relative"
                style={{
                  background: active ? `${accentColor}18` : 'transparent',
                  color: active ? accentColor : 'rgba(255,255,255,0.45)',
                  border: active ? `1px solid ${accentColor}30` : '1px solid transparent',
                }}
              >
                {active && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                    style={{ background: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
                  />
                )}
                <IconComponent
                  className="h-4 w-4 flex-shrink-0 transition-colors duration-200"
                  style={{ color: active ? accentColor : 'rgba(255,255,255,0.3)' }}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Section */}
      <div className="p-4 relative" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {user ? (
          <div className="relative" ref={dropdownRef}>
            {/* Dropdown */}
            {isUserDropdownOpen && (
              <div
                className="absolute bottom-full left-0 mb-2 w-56 rounded-2xl p-1.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150"
                style={{
                  background: 'rgba(12,12,18,0.98)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="px-3 py-2.5 border-b border-white/6 mb-1">
                  <p className="text-white text-xs font-black truncate">{user.name}</p>
                  <p className="text-white/30 text-[10px] truncate mt-0.5">{user.email}</p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-[#EF4444]/70 hover:text-[#EF4444] hover:bg-red-500/8 transition-all duration-200 cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}

            {/* Profile card */}
            <div
              className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-200 hover:border-white/12"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleDropdownClick}
            >
              <div
                className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center border flex-shrink-0"
                style={{ borderColor: `${accentColor}40`, background: `${accentColor}20` }}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="User avatar" className="w-full h-full object-cover" />
                ) : user.image ? (
                  <img src={user.image} alt="User avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="h-4 w-4" style={{ color: accentColor }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-black truncate leading-tight">{user.name}</p>
                <p
                  className="text-[10px] font-black uppercase tracking-wider mt-0.5"
                  style={{ color: accentColor }}
                >
                  {role}
                </p>
              </div>
              <ChevronDown
                className={`h-3.5 w-3.5 text-white/25 transition-transform duration-300 flex-shrink-0 ${isUserDropdownOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </div>
        ) : (
          <div
            className="flex items-center gap-3 p-2.5 rounded-xl animate-pulse"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="w-8 h-8 rounded-full bg-white/8 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-2.5 bg-white/8 rounded w-3/4" />
              <div className="h-2 bg-white/5 rounded w-1/2" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default DashboardSideBar;

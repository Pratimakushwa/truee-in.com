import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search, Bell, Menu, Plus, ChevronRight, Settings,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/axiosInstance';
import AdminLogo from './AdminLogo';

const PAGE_TITLES = {
  '/admin/dashboard': 'Dashboard',
  '/admin/orders': 'Orders',
  '/admin/products': 'Products',
  '/admin/users': 'Customers',
  '/admin/coupons': 'Coupons',
  '/admin/reviews': 'Reviews',
  '/admin/rewards': 'Reward Analytics',
  '/admin/rewards/settings': 'Reward Settings',
  '/admin/theme': 'Theme Manager',
  '/admin/profile': 'My Profile',
};

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="hidden xl:inline text-xs text-gray-400 font-mono tabular-nums">
      {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
    </span>
  );
}

export default function AdminHeader({ onMenuClick, sidebarCollapsed }) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [unread, setUnread] = useState(0);

  const pageTitle = Object.entries(PAGE_TITLES).find(([path]) =>
    pathname === path || pathname.startsWith(`${path}/`)
  )?.[1] || 'Admin';

  useEffect(() => {
    api.get('/notifications')
      .then((res) => {
        const list = res.data?.notifications || res.data?.data || [];
        setNotifications(list.slice(0, 8));
        setUnread(list.filter((n) => !n.isRead).length);
      })
      .catch(() => {});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate('/admin/orders', { state: { search: search.trim() } });
  };

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  });

  return (
    <header
      className="sticky top-0 z-30 h-[var(--admin-header-h)] bg-white/90 backdrop-blur-xl border-b border-gray-200 flex items-center gap-3 px-4 lg:px-6 shrink-0"
      style={{ marginLeft: 0 }}
    >
      <button
        type="button"
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="lg:hidden shrink-0 -my-1">
        <AdminLogo collapsed />
      </div>

      <div className="hidden sm:flex flex-col min-w-0">
        <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
          <Link to="/admin/dashboard" className="hover:text-[#C8A253] transition-colors">Admin</Link>
          <ChevronRight size={10} />
          <span className="text-gray-600 font-medium">{pageTitle}</span>
        </div>
        <h2 className="text-sm font-bold text-gray-900 truncate">{pageTitle}</h2>
      </div>

      <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders, customers..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C8A253]/30 focus:border-[#C8A253]/40 transition-all"
          />
        </div>
      </form>

      <div className="ml-auto flex items-center gap-2">
        <span className="hidden lg:inline text-xs text-gray-400">{today}</span>
        <LiveClock />

       

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotif(!showNotif)}
            className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {showNotif && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotif(false)} />
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl border border-gray-200 shadow-xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-900">Notifications</span>
                  {unread > 0 && (
                    <span className="text-[10px] font-bold text-[#C8A253]">{unread} new</span>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto admin-scrollbar">
                  {notifications.length === 0 ? (
                    <p className="px-4 py-8 text-center text-xs text-gray-400">No notifications</p>
                  ) : (
                    notifications.map((n) => (
                      <div key={n._id} className={`px-4 py-3 border-b border-gray-50 text-xs ${!n.isRead ? 'bg-[#FCFAEF]/50' : ''}`}>
                        <p className="font-medium text-gray-800">{n.title || n.message}</p>
                        {n.message && n.title && <p className="text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <Link
          to="/admin/profile"
          className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C8A253] to-[#E8D5A3] flex items-center justify-center text-black text-xs font-bold">
            {(user?.name || 'A').charAt(0).toUpperCase()}
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-gray-900 leading-tight truncate max-w-[100px]">{user?.name}</p>
            <p className="text-[10px] text-gray-400 capitalize">{user?.role}</p>
          </div>
        </Link>

        <Link
          to="/admin/profile"
          className="hidden md:flex p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Settings"
        >
          <Settings size={18} />
        </Link>
      </div>
    </header>
  );
}

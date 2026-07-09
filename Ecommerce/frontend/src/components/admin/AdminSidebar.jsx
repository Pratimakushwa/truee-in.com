import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart, Users, Palette, Ticket,
  Coins, Settings, Star, ChevronLeft, ChevronRight, LogOut, User,
  FileText, HelpCircle, Plus, Mail,
} from 'lucide-react';
import AdminLogo from './AdminLogo';

const NAV_SECTIONS = [
  {
    title: 'Overview',
    items: [
      { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Commerce',
    items: [
      { to: '/admin/orders', label: 'Orders', icon: ShoppingCart, badge: 'orders' },
      { to: '/admin/products', label: 'Products', icon: Package },
      { to: '/admin/users', label: 'Customers', icon: Users },
      { to: '/admin/coupons', label: 'Coupons', icon: Ticket },
      { to: '/admin/reviews', label: 'Reviews', icon: Star },
      { to: '/admin/newsletter', label: 'Newsletter', icon: Mail },
    ],
  },
  {
    title: 'Rewards',
    items: [
      { to: '/admin/rewards', label: 'Analytics', icon: Coins },
      { to: '/admin/rewards/settings', label: 'Settings', icon: Settings },
    ],
  },
  {
    title: 'System',
    items: [
      { to: '/admin/theme', label: 'Theme', icon: Palette },
      { to: '/admin/legal-policies', label: 'Legal & Policies', icon: FileText },
      { to: '/admin/profile', label: 'Profile', icon: User },
    ],
  },
];

export default function AdminSidebar({
  user,
  collapsed,
  onToggleCollapse,
  onLogout,
  onClose,
  pendingOrders = 0,
}) {
  const { pathname } = useLocation();

  const getBadge = (key) => {
    if (key === 'orders' && pendingOrders > 0) return pendingOrders;
    return null;
  };

  return (
    <aside
      className={`flex flex-col h-full bg-[var(--admin-sidebar)] text-white border-r border-white/5 transition-all duration-300 ${
        collapsed ? 'w-[var(--admin-sidebar-collapsed)]' : 'w-[var(--admin-sidebar-w)]'
      }`}
    >
      {/* Brand */}
      <div className={`flex items-center border-b border-white/5 shrink-0 ${collapsed ? 'justify-center px-2 py-4' : 'justify-between px-5 py-4'}`}>
        <AdminLogo collapsed={collapsed} className={onClose && !collapsed ? 'flex-1' : ''} />
        {onClose && (
          <button type="button" onClick={onClose} className="lg:hidden p-1 text-gray-400 hover:text-white shrink-0" aria-label="Close menu">
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      {/* Quick create */}
      

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto admin-scrollbar px-3 py-2 space-y-6">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                {section.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map(({ to, label, icon: Icon, badge }) => {
                const isActive = pathname === to || (to !== '/admin/dashboard' && pathname.startsWith(to));
                const count = getBadge(badge);

                return (
                  <li key={to}>
                    <NavLink
                      to={to}
                      onClick={onClose}
                      title={collapsed ? label : undefined}
                      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                        isActive
                          ? 'bg-[#C8A253]/15 text-[#E8D5A3] border border-[#C8A253]/25'
                          : 'text-gray-400 hover:text-white hover:bg-[var(--admin-sidebar-hover)] border border-transparent'
                      } ${collapsed ? 'justify-center' : ''}`}
                    >
                      <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} className="shrink-0" />
                      {!collapsed && <span className="truncate">{label}</span>}
                      {count && (
                        <span className={`${collapsed ? 'absolute -top-0.5 -right-0.5' : 'ml-auto'} min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-[#C8A253] text-black text-[9px] font-bold`}>
                          {count > 99 ? '99+' : count}
                        </span>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-white/5 p-3 space-y-1">
       

        <button
          type="button"
          onClick={onToggleCollapse}
          className={`hidden lg:flex w-full items-center gap-3 px-3 py-2 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 text-sm transition-colors ${collapsed ? 'justify-center' : ''}`}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <><ChevronLeft size={18} /><span>Collapse</span></>}
        </button>

        

        <button
          type="button"
          onClick={onLogout}
          className={`flex w-full items-center gap-3 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 text-sm transition-colors ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

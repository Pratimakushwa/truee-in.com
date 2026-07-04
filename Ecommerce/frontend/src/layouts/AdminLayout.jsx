import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import api from '../utils/axiosInstance';
import '../styles/admin.css';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [pendingOrders, setPendingOrders] = useState(0);

  useEffect(() => {
    api.get('/admin/dashboard-stats')
      .then((res) => {
        if (res.data?.success) setPendingOrders(res.data.stats.pendingOrders || 0);
      })
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarPad = collapsed ? 'lg:pl-[72px]' : 'lg:pl-[260px]';

  return (
    <div className="admin-shell min-h-screen">
      <div className="hidden lg:block fixed inset-y-0 left-0 z-40">
        <AdminSidebar
          user={user}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((c) => !c)}
          onLogout={handleLogout}
          pendingOrders={pendingOrders}
        />
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative admin-drawer-enter h-full shadow-2xl">
            <AdminSidebar
              user={user}
              collapsed={false}
              onClose={() => setMobileOpen(false)}
              onLogout={handleLogout}
              pendingOrders={pendingOrders}
            />
          </div>
        </div>
      )}

      <div className={`flex flex-col min-h-screen transition-all duration-300 ${sidebarPad}`}>
        <AdminHeader onMenuClick={() => setMobileOpen(true)} sidebarCollapsed={collapsed} />

        <main className="flex-1 overflow-auto admin-scrollbar p-4 md:p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

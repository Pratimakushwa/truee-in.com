

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  IndianRupee, ShoppingCart, Users, Package, AlertTriangle,
  Coins, Ticket, TrendingUp, CheckCircle, XCircle, Clock,
  ArrowRight, Layers,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/axiosInstance';
import PageHeader from '../../components/admin/ui/PageHeader';
import StatCard from '../../components/admin/ui/StatCard';
import DataTable from '../../components/admin/ui/DataTable';
import StatusBadge from '../../components/admin/ui/StatusBadge';
import SimpleBarChart from '../../components/admin/charts/SimpleBarChart';
import { SkeletonCard } from '../../components/ui/Skeleton';

const formatCurrency = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/dashboard-stats')
      .then((res) => {
        if (res.data?.success) setStats(res.data.stats);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const kpiCards = stats ? [
    { label: "Today's Revenue", value: stats.todayRevenue, change: stats.revenueGrowth, format: 'currency', icon: IndianRupee, path: '/admin/orders' },
    { label: 'Total Revenue', value: stats.totalRevenue, format: 'currency', icon: TrendingUp, path: '/admin/orders' },
    { label: "Today's Orders", value: stats.todayOrders, change: stats.ordersGrowth, icon: ShoppingCart, path: '/admin/orders' },
    { label: 'Pending Orders', value: stats.pendingOrders, icon: Clock, iconBg: 'bg-amber-50', iconColor: 'text-amber-600', path: '/admin/orders' },
    { label: 'Delivered', value: stats.deliveredOrders, icon: CheckCircle, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600', path: '/admin/orders' },
    { label: 'Cancelled', value: stats.cancelledOrders, icon: XCircle, iconBg: 'bg-red-50', iconColor: 'text-red-500', path: '/admin/orders' },
    { label: 'Customers', value: stats.userCount, icon: Users, path: '/admin/users' },
    { label: 'Products', value: stats.productCount, icon: Package, path: '/admin/products' },
    { label: 'Categories', value: stats.categoryCount, icon: Layers, path: '/admin/products' },
    { label: 'Low Stock', value: stats.lowStockCount, icon: AlertTriangle, iconBg: 'bg-orange-50', iconColor: 'text-orange-600', path: '/admin/products' },
    { label: 'Active Coupons', value: stats.couponCount, icon: Ticket, path: '/admin/coupons' },
    { label: 'Wallet Balance', value: stats.walletBalance, format: 'currency', icon: Coins, iconBg: 'bg-[#FCFAEF]', path: '/admin/rewards' },
    { label: 'Coins Issued', value: stats.coinsIssued, icon: Coins, path: '/admin/rewards' },
    { label: 'Coins Redeemed', value: stats.coinsRedeemed, icon: Coins, path: '/admin/rewards' },
  ] : [];

  const orderColumns = [
    {
      key: 'id',
      label: 'Order',
      render: (row) => (
        <span className="font-mono text-xs font-semibold text-gray-900">
          #{row._id?.slice(-8).toUpperCase()}
        </span>
      ),
    },
    {
      key: 'customer',
      label: 'Customer',
      render: (row) => row.shippingAddress?.fullName || 'Guest',
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (row) => formatCurrency(row.payableAmount || row.totalAmount),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge status={row.orderStatus} />,
    },
    {
      key: 'payment',
      label: 'Payment',
      render: (row) => <StatusBadge status={row.paymentInfo?.paymentStatus || 'Pending'} />,
    },
    {
      key: 'date',
      label: 'Date',
      render: (row) => new Date(row.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    },
  ];

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user?.name || 'Admin'}`}
        description="Here's your store performance at a glance."
        breadcrumb={
          <>
            <span>Admin</span>
            <span className="mx-1">/</span>
            <span className="text-gray-600">Dashboard</span>
          </>
        }
        actions={
          <button
            type="button"
            onClick={() => navigate('/admin/orders')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white text-xs font-semibold hover:bg-gray-800 transition-colors"
          >
            View Orders <ArrowRight size={14} />
          </button>
        }
      />

      {/* KPI Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {kpiCards.map((card) => (
            <StatCard
              key={card.label}
              {...card}
              onClick={() => card.path && navigate(card.path)}
            />
          ))}
        </div>
      )}

      {/* Charts + Top Products */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2 admin-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-gray-900">Sales — Last 7 Days</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Monthly revenue: {formatCurrency(stats?.monthRevenue)}
                {stats?.revenueGrowth !== undefined && (
                  <span className={stats.revenueGrowth >= 0 ? ' text-emerald-600' : ' text-red-500'}>
                    {' '}({stats.revenueGrowth >= 0 ? '+' : ''}{stats.revenueGrowth}% vs last month)
                  </span>
                )}
              </p>
            </div>
          </div>
          <SimpleBarChart data={stats?.dailySales || []} valueKey="revenue" labelKey="_id" height={180} />
        </div>

        <div className="admin-card p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Top Products</h3>
          {!stats?.topProducts?.length ? (
            <p className="text-xs text-gray-400 py-8 text-center">No sales data yet</p>
          ) : (
            <ul className="space-y-3">
              {stats.topProducts.map((p, i) => (
                <li key={p._id} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-[#FCFAEF] text-[#C8A253] text-[10px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-gray-900 truncate">{p._id}</p>
                    <p className="text-[10px] text-gray-400">{p.qty} sold</p>
                  </div>
                  <span className="text-xs font-semibold text-gray-700 shrink-0">
                    {formatCurrency(p.revenue)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900">Recent Orders</h3>
        <button
          type="button"
          onClick={() => navigate('/admin/orders')}
          className="text-xs font-semibold text-[#C8A253] hover:text-[#8B6914] flex items-center gap-1 transition-colors"
        >
          View all <ArrowRight size={12} />
        </button>
      </div>

      <DataTable
        columns={orderColumns}
        data={stats?.recentOrders || []}
        loading={loading}
        emptyTitle="No orders yet"
        emptyDescription="Orders will appear here once customers start purchasing."
        onRowClick={(row) => navigate('/admin/orders')}
      />

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { label: 'Add Product', path: '/admin/products' },
          { label: 'Manage Orders', path: '/admin/orders' },
          { label: 'Create Coupon', path: '/admin/coupons' },
          { label: 'Reward Settings', path: '/admin/rewards/settings' },
        ].map(({ label, path }) => (
          <button
            key={path}
            type="button"
            onClick={() => navigate(path)}
            className="admin-card admin-card-interactive p-4 text-left text-sm font-semibold text-gray-800 hover:text-[#C8A253] transition-colors"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

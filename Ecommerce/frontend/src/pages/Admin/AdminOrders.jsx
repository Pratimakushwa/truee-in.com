import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Eye, X, Search, Download } from 'lucide-react';
import api from '../../utils/axiosInstance';
import Toast from '../../components/Toast';
import OrderDetails from '../../components/OrderDetails';
import { ORDER_STATUSES } from '../../constants/orderStatuses';
import PageHeader from '../../components/admin/ui/PageHeader';
import DataTable from '../../components/admin/ui/DataTable';
import StatusBadge from '../../components/admin/ui/StatusBadge';

export default function AdminOrders() {
  const { state: routeState } = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState(routeState?.search || '');
  const [toast, setToast] = useState(null);

  const [shippingModal, setShippingModal] = useState({ isOpen: false, orderId: null });
  const [trackingInfo, setTrackingInfo] = useState({ courierPartner: '', awbNumber: '' });
  const [trackingModal, setTrackingModal] = useState({ isOpen: false, orderId: null });

  const showToast = (message, type = 'success') => setToast({ message, type });

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/orders');
      setOrders(res.data.data || []);
    } catch {
      showToast('Failed to load orders.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    if (newStatus === 'Shipped') {
      setShippingModal({ isOpen: true, orderId });
      return;
    }
    updateOrderStatus(orderId, newStatus);
  };

  const updateOrderStatus = async (orderId, status, trackingData = {}) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, { orderStatus: status, ...trackingData });
      showToast('Status updated successfully.');
      fetchOrders();
    } catch {
      showToast('Failed to update status.', 'error');
    }
  };

  const handleShippingSubmit = () => {
    updateOrderStatus(shippingModal.orderId, 'Shipped', {
      courierPartner: trackingInfo.courierPartner,
      awbNumber: trackingInfo.awbNumber,
    });
    setShippingModal({ isOpen: false, orderId: null });
    setTrackingInfo({ courierPartner: '', awbNumber: '' });
  };

  const filteredOrders = orders.filter((o) => {
    const matchStatus = filter === 'All' || o.orderStatus === filter;
    const q = search.toLowerCase();
    const matchSearch = !q
      || o._id?.toLowerCase().includes(q)
      || o.shippingAddress?.fullName?.toLowerCase().includes(q)
      || o.shippingAddress?.phone?.includes(q);
    return matchStatus && matchSearch;
  });

  const columns = [
    {
      key: 'id',
      label: 'Order ID',
      render: (row) => (
        <span className="font-mono text-xs font-semibold">#{row._id?.slice(-8).toUpperCase()}</span>
      ),
    },
    {
      key: 'customer',
      label: 'Customer',
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.shippingAddress?.fullName || 'Guest'}</p>
          <p className="text-[10px] text-gray-400">{row.shippingAddress?.phone}</p>
        </div>
      ),
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (row) => (
        <span className="font-semibold">
          ₹{(row.payableAmount || row.totalAmount || 0).toLocaleString('en-IN')}
        </span>
      ),
    },
    {
      key: 'payment',
      label: 'Payment',
      render: (row) => (
        <div className="flex flex-col gap-1">
          <StatusBadge status={row.paymentInfo?.paymentStatus || 'Pending'} />
          <span className="text-[10px] text-gray-400 capitalize">{row.paymentInfo?.method}</span>
        </div>
      ),
    },
    {
      key: 'coins',
      label: 'Coins',
      render: (row) => (
        <span className="text-xs text-gray-500">
          {row.coinsEarned ? `+${row.coinsEarned}` : '—'}
          {row.coinsRedeemed ? ` / -${row.coinsRedeemed}` : ''}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <select
          value={row.orderStatus}
          onChange={(e) => { e.stopPropagation(); handleStatusChange(row._id, e.target.value); }}
          onClick={(e) => e.stopPropagation()}
          className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:ring-2 focus:ring-[#C8A253]/30 outline-none max-w-[140px]"
        >
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      render: (row) => new Date(row.createdAt).toLocaleDateString('en-IN'),
    },
    {
      key: 'actions',
      label: '',
      render: (row) => (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setTrackingModal({ isOpen: true, orderId: row._id }); }}
          className="p-2 rounded-lg text-gray-500 hover:bg-[#FCFAEF] hover:text-[#C8A253] transition-colors"
          aria-label="View order"
        >
          <Eye size={16} />
        </button>
      ),
    },
  ];

  return (
    <div>
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}

      <PageHeader
        title="Orders"
        description={`${orders.length} total orders · ${filteredOrders.length} shown`}
        breadcrumb={<><span>Admin</span><span className="mx-1">/</span><span className="text-gray-600">Orders</span></>}
      />

      {/* Filters */}
      <div className="admin-card p-4 mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID, name, phone..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#C8A253]/30"
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Download size={14} /> Export
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {['All', ...ORDER_STATUSES].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                tab === filter
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredOrders}
        loading={loading}
        emptyTitle="No orders found"
        emptyDescription="Try adjusting your filters or search query."
        onRowClick={(row) => setTrackingModal({ isOpen: true, orderId: row._id })}
      />

      {trackingModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 md:p-4">
          <div className="relative w-full max-w-4xl h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <button
              type="button"
              onClick={() => setTrackingModal({ isOpen: false, orderId: null })}
              className="absolute top-3 right-3 z-[60] p-2 bg-gray-900/80 text-white rounded-full hover:bg-gray-900 transition"
            >
              <X size={18} />
            </button>
            <div className="flex-1 overflow-y-auto admin-scrollbar">
              <OrderDetails orderId={trackingModal.orderId} />
            </div>
          </div>
        </div>
      )}

      {shippingModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="admin-card p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Shipping Details</h2>
            <p className="text-xs text-gray-500 mb-5">Enter courier info to mark as shipped.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Courier Partner</label>
                <input
                  type="text"
                  value={trackingInfo.courierPartner}
                  onChange={(e) => setTrackingInfo({ ...trackingInfo, courierPartner: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#C8A253]/30 outline-none"
                  placeholder="Blue Dart, Delhivery..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">AWB / Tracking Number</label>
                <input
                  type="text"
                  value={trackingInfo.awbNumber}
                  onChange={(e) => setTrackingInfo({ ...trackingInfo, awbNumber: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#C8A253]/30 outline-none"
                  placeholder="Tracking ID"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setShippingModal({ isOpen: false, orderId: null })}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleShippingSubmit}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#C8A253] text-black text-sm font-semibold hover:bg-[#d4b06a] transition"
              >
                Save & Ship
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

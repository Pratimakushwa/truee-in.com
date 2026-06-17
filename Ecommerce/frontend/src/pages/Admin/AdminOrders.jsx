// import { useState, useEffect } from 'react';
// import api from '../../utils/axiosInstance';
// import Toast from '../../components/Toast';

// export default function AdminOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('All');
//   const [toast, setToast] = useState(null);

//   const showToast = (message, type = 'success') => setToast({ message, type });

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/admin/orders');
//       setOrders(res.data.data || []);
//     } catch (err) {
//       console.error('Error fetching orders:', err);
//       showToast(err.response?.data?.error || 'Failed to load orders.', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       await api.put(`/admin/orders/${orderId}/status`, { orderStatus: newStatus });
//       showToast('Order status updated successfully.');
//       fetchOrders();
//     } catch (err) {
//       showToast(err.response?.data?.error || 'Failed to update status.', 'error');
//     }
//   };

//   const filteredOrders = filter === 'All' ? orders : orders.filter((o) => o.orderStatus === filter);

//   return (
//     <div>
//       {toast && <Toast toast={toast} onClose={() => setToast(null)} />}

//       <div className="mb-8">
//         <h1 className="text-2xl font-serif text-[#C8A253]">Orders</h1>
//         <p className="text-gray-500 text-sm mt-1">Track and manage customer orders</p>
//       </div>

//       {/* Status tabs */}
//       <div className="flex gap-2 mb-6">
//         {['All', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setFilter(tab)}
//             className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
//               tab === filter
//                 ? 'bg-[#C8A253]/15 text-[#C8A253] border-[#C8A253]/30'
//                 : 'text-gray-600 border-white/5 hover:border-[#C8A253]/20'
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Orders table */}
//       {loading ? (
//         <p className="text-gray-500 text-sm">Loading orders...</p>
//       ) : filteredOrders.length === 0 ? (
//         <div className="rounded-xl border border-dashed border-white/10 bg-[#111] p-16 flex flex-col items-center justify-center text-center">
//           <p className="text-white font-semibold text-lg mb-2">No Orders Found</p>
//           <p className="text-gray-500 text-sm">There are no orders matching your filter.</p>
//         </div>
//       ) : (
//         <div className="rounded-xl border border-white/10 bg-[#111] overflow-hidden">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-white/10 bg-[#0A0A0A]">
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-[#C8A253] uppercase tracking-wider">Order ID</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-[#C8A253] uppercase tracking-wider">Customer</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-[#C8A253] uppercase tracking-wider">Total</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-[#C8A253] uppercase tracking-wider">Status</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-[#C8A253] uppercase tracking-wider">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredOrders.map((order) => (
//                 <tr key={order._id} className="border-b border-white/5 hover:bg-[#1A1A1A] transition-colors">
//                   <td className="px-4 py-3 text-sm text-white font-mono">{order._id.slice(-8).toUpperCase()}</td>
//                   <td className="px-4 py-3 text-sm text-white">{order.user?.name || 'Unknown'}</td>
//                   <td className="px-4 py-3 text-sm text-white font-semibold">₹{order.totalAmount}</td>
//                   <td className="px-4 py-3 text-sm">
//                     <select
//                       value={order.orderStatus}
//                       onChange={(e) => handleStatusChange(order._id, e.target.value)}
//                       className="bg-[#1A1A1A] border border-[#C8A253]/20 rounded px-2 py-1 text-xs text-white outline-none focus:border-[#C8A253]/60"
//                     >
//                       <option>Processing</option>
//                       <option>Shipped</option>
//                       <option>Out for Delivery</option>
//                       <option>Delivered</option>
//                       <option>Cancelled</option>
//                     </select>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// import { useState, useEffect } from 'react';
// import api from '../../utils/axiosInstance';
// import Toast from '../../components/Toast';

// export default function AdminOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('All');
//   const [toast, setToast] = useState(null);

//   // ⚡ NAYE STATES MODAL KE LIYE ⚡
//   const [shippingModal, setShippingModal] = useState({ isOpen: false, orderId: null });
//   const [trackingInfo, setTrackingInfo] = useState({ courierPartner: '', awbNumber: '' });

//   const showToast = (message, type = 'success') => setToast({ message, type });

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get('/admin/orders');
//       setOrders(res.data.data || []);
//     } catch (err) {
//       console.error('Error fetching orders:', err);
//       showToast(err.response?.data?.error || 'Failed to load orders.', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ⚡ SMART STATUS HANDLER ⚡
//   const handleStatusChange = async (orderId, newStatus) => {
//     // Agar status Shipped hai, toh direct API call mat karo, Modal kholo
//     if (newStatus === 'Shipped') {
//       setShippingModal({ isOpen: true, orderId });
//       setTrackingInfo({ courierPartner: '', awbNumber: '' }); // Purana data clear karo
//       return; 
//     }
    
//     // Baaki status (Processing, Delivered) ke liye normal API call
//     updateOrderStatus(orderId, newStatus);
//   };

//   // ⚡ ASLI API CALL WALA FUNCTION ⚡
//   const updateOrderStatus = async (orderId, status, trackingData = {}) => {
//     try {
//       // Backend ko status ke sath-sath tracking data bhi bhejenge
//       await api.put(`/admin/orders/${orderId}/status`, { 
//         orderStatus: status, 
//         ...trackingData 
//       });
//       showToast('Order status updated successfully.');
//       fetchOrders();
//     } catch (err) {
//       showToast(err.response?.data?.error || 'Failed to update status.', 'error');
//     }
//   };

//   // ⚡ MODAL SUBMIT KARTA HAI YE FUNCTION ⚡
//   const handleShippingSubmit = () => {
//     if (!trackingInfo.courierPartner || !trackingInfo.awbNumber) {
//       showToast('Please fill both Courier Name and AWB Number', 'error');
//       return;
//     }
    
//     updateOrderStatus(shippingModal.orderId, 'Shipped', {
//       courierPartner: trackingInfo.courierPartner,
//       awbNumber: trackingInfo.awbNumber
//     });
    
//     // Modal band kar do
//     setShippingModal({ isOpen: false, orderId: null });
//   };

//   const filteredOrders = filter === 'All' ? orders : orders.filter((o) => o.orderStatus === filter);

//   return (
//     <div>
//       {toast && <Toast toast={toast} onClose={() => setToast(null)} />}

//       <div className="mb-8">
//         <h1 className="text-2xl font-serif text-[#C8A253]">Orders</h1>
//         <p className="text-gray-500 text-sm mt-1">Track and manage customer orders</p>
//       </div>

//       {/* Status tabs */}
//       <div className="flex gap-2 mb-6">
//         {['All', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setFilter(tab)}
//             className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
//               tab === filter
//                 ? 'bg-[#C8A253]/15 text-[#C8A253] border-[#C8A253]/30'
//                 : 'text-gray-600 border-white/5 hover:border-[#C8A253]/20'
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Orders table */}
//       {loading ? (
//         <p className="text-gray-500 text-sm">Loading orders...</p>
//       ) : filteredOrders.length === 0 ? (
//         <div className="rounded-xl border border-dashed border-white/10 bg-[#111] p-16 flex flex-col items-center justify-center text-center">
//           <p className="text-white font-semibold text-lg mb-2">No Orders Found</p>
//           <p className="text-gray-500 text-sm">There are no orders matching your filter.</p>
//         </div>
//       ) : (
//         <div className="rounded-xl border border-white/10 bg-[#111] overflow-hidden">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b border-white/10 bg-[#0A0A0A]">
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-[#C8A253] uppercase tracking-wider">Order ID</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-[#C8A253] uppercase tracking-wider">Customer</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-[#C8A253] uppercase tracking-wider">Total</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-[#C8A253] uppercase tracking-wider">Status</th>
//                 <th className="px-4 py-3 text-left text-xs font-semibold text-[#C8A253] uppercase tracking-wider">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredOrders.map((order) => (
//                 <tr key={order._id} className="border-b border-white/5 hover:bg-[#1A1A1A] transition-colors">
//                   <td className="px-4 py-3 text-sm text-white font-mono">{order._id.slice(-8).toUpperCase()}</td>
//                   <td className="px-4 py-3 text-sm text-white">{order.user?.name || order.shippingAddress?.fullName || 'Unknown'}</td>
//                   <td className="px-4 py-3 text-sm text-white font-semibold">₹{order.totalAmount}</td>
//                   <td className="px-4 py-3 text-sm">
//                     <select
//                       value={order.orderStatus}
//                       onChange={(e) => handleStatusChange(order._id, e.target.value)}
//                       className="bg-[#1A1A1A] border border-[#C8A253]/20 rounded px-2 py-1 text-xs text-white outline-none focus:border-[#C8A253]/60"
//                     >
//                       <option value="Processing">Processing</option>
//                       <option value="Shipped">Shipped</option>
//                       <option value="Out for Delivery">Out for Delivery</option>
//                       <option value="Delivered">Delivered</option>
//                       <option value="Cancelled">Cancelled</option>
//                     </select>
//                   </td>
//                   <td className="px-4 py-3 text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* ⚡ SHIPPING POPUP MODAL ⚡ */}
//       {shippingModal.isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
//           <div className="bg-[#111] border border-white/10 rounded-xl p-6 w-[400px] shadow-2xl">
//             <h2 className="text-[#C8A253] font-serif text-xl mb-4">Add Shipping Details</h2>
//             <p className="text-gray-400 text-xs mb-4">Enter courier and tracking info to mark this order as shipped.</p>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-xs text-gray-400 mb-1">Courier Partner (e.g. Blue Dart, Delhivery)</label>
//                 <input 
//                   type="text" 
//                   value={trackingInfo.courierPartner}
//                   onChange={(e) => setTrackingInfo({...trackingInfo, courierPartner: e.target.value})}
//                   className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#C8A253]"
//                   placeholder="Enter courier name"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs text-gray-400 mb-1">AWB / Tracking Number</label>
//                 <input 
//                   type="text" 
//                   value={trackingInfo.awbNumber}
//                   onChange={(e) => setTrackingInfo({...trackingInfo, awbNumber: e.target.value})}
//                   className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#C8A253]"
//                   placeholder="Enter tracking ID"
//                 />
//               </div>
//             </div>

//             <div className="flex gap-3 mt-6">
//               <button 
//                 onClick={() => setShippingModal({ isOpen: false, orderId: null })}
//                 className="flex-1 px-4 py-2 rounded-lg border border-white/10 text-white text-sm hover:bg-white/5 transition"
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={handleShippingSubmit}
//                 className="flex-1 px-4 py-2 rounded-lg bg-[#C8A253] text-black font-semibold text-sm hover:bg-[#D4AF37] transition"
//               >
//                 Save & Ship
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Eye, X } from 'lucide-react';
import api from '../../utils/axiosInstance';
import Toast from '../../components/Toast';
import OrderDetails from '../../components/OrderDetails';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
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
    } catch (err) {
      showToast('Failed to load orders.', 'error');
    } finally { setLoading(false); }
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
    } catch (err) {
      showToast('Failed to update status.', 'error');
    }
  };

  const handleShippingSubmit = () => {
    updateOrderStatus(shippingModal.orderId, 'Shipped', {
      courierPartner: trackingInfo.courierPartner,
      awbNumber: trackingInfo.awbNumber
    });
    setShippingModal({ isOpen: false, orderId: null });
  };

  const filteredOrders = filter === 'All' ? orders : orders.filter((o) => o.orderStatus === filter);

  return (
    <div className="p-4 md:p-6 w-full">
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
      <h1 className="text-2xl font-serif text-[#C8A253] mb-8">Orders Management</h1>

      {/* Responsive Table Wrapper */}
      <div className="rounded-xl border border-white/10 bg-[#111] overflow-x-auto">
        <table className="w-full text-left min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10 bg-[#0A0A0A]">
              <th className="px-4 py-3 text-[#C8A253] text-xs uppercase">Order ID</th>
              <th className="px-4 py-3 text-[#C8A253] text-xs uppercase">Customer</th>
              <th className="px-4 py-3 text-[#C8A253] text-xs uppercase">Status</th>
              <th className="px-4 py-3 text-[#C8A253] text-xs uppercase">Date</th>
              <th className="px-4 py-3 text-[#C8A253] text-xs uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="border-b border-white/5 hover:bg-[#1A1A1A]">
                <td className="px-4 py-3 text-sm text-white font-mono">{order._id.slice(-8).toUpperCase()}</td>
                <td className="px-4 py-3 text-sm text-white">{order.shippingAddress?.fullName || 'N/A'}</td>
                <td className="px-4 py-3">
                  <select value={order.orderStatus} onChange={(e) => handleStatusChange(order._id, e.target.value)} className="bg-[#1A1A1A] border border-[#C8A253]/20 rounded px-2 py-1 text-xs text-white">
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <button onClick={() => setTrackingModal({ isOpen: true, orderId: order._id })} className="text-[#C8A253] hover:text-white transition">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tracking Modal */}
      {trackingModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-2 md:p-4">
          <div className="relative w-full max-w-4xl h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col">
            <button 
              onClick={() => setTrackingModal({ isOpen: false, orderId: null })} 
              className="absolute top-2 right-2 z-[60] p-2 bg-black/50 text-white rounded-full hover:bg-black transition"
            >
              <X size={20}/>
            </button>
            <div className="flex-1 overflow-y-auto w-full h-full">
              <OrderDetails orderId={trackingModal.orderId} />
            </div>
          </div>
        </div>
      )}

      {/* Shipping Details Modal */}
        {shippingModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111] border border-white/10 rounded-xl p-6 w-[400px] shadow-2xl">
            <h2 className="text-[#C8A253] font-serif text-xl mb-4">Add Shipping Details</h2>
            <p className="text-gray-400 text-xs mb-4">Enter courier and tracking info to mark this order as shipped.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Courier Partner (e.g. Blue Dart, Delhivery)</label>
                <input 
                  type="text" 
                  value={trackingInfo.courierPartner}
                  onChange={(e) => setTrackingInfo({...trackingInfo, courierPartner: e.target.value})}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#C8A253]"
                  placeholder="Enter courier name"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">AWB / Tracking Number</label>
                <input 
                  type="text" 
                  value={trackingInfo.awbNumber}
                  onChange={(e) => setTrackingInfo({...trackingInfo, awbNumber: e.target.value})}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#C8A253]"
                  placeholder="Enter tracking ID"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShippingModal({ isOpen: false, orderId: null })}
                className="flex-1 px-4 py-2 rounded-lg border border-white/10 text-white text-sm hover:bg-white/5 transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleShippingSubmit}
                className="flex-1 px-4 py-2 rounded-lg bg-[#C8A253] text-black font-semibold text-sm hover:bg-[#D4AF37] transition"
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
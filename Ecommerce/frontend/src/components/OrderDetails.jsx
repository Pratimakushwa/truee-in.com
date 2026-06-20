// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axiosInstance from '../utils/axiosInstance'; // API call ke liye

// export default function OrderDetails() {
//   const { id } = useParams(); // URL se order ID nikalne ke liye
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const { data } = await axiosInstance.get(`/orders/${id}`); 
//         setOrder(data.data || data.order); // Backend response ke hisaab se
//       } catch (err) {
//         console.error("Error fetching order details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrderDetails();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
//         <div className="w-10 h-10 border-4 border-[#C8A253] border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white">
//         <h2 className="text-2xl font-serif text-[#C8A253] mb-4">Order Not Found</h2>
//         <Link to="/profile" className="text-sm underline hover:text-[#C8A253]">Go Back to Profile</Link>
//       </div>
//     );
//   }

//   // Timeline Logic
//   const steps = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
//   const isCancelled = order.orderStatus === 'Cancelled';
//   let currentStepIndex = steps.indexOf(order.orderStatus);
//   if (currentStepIndex === -1 && !isCancelled) currentStepIndex = 0;

//   return (
//     <div className="min-h-screen bg-[#0A0A0A] text-white py-12 px-4 md:px-8 font-sans">
//       <div className="max-w-5xl mx-auto">
        
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-white/10 pb-6 gap-4">
//           <div>
//             <Link to="/profile" className="text-gray-400 text-xs mb-4 inline-flex items-center hover:text-[#C8A253] transition">
//               ← Back to My Orders
//             </Link>
//             <h1 className="text-3xl font-serif text-[#C8A253]">Order Details</h1>
//             <p className="text-gray-400 mt-2 text-sm tracking-widest uppercase">Order ID: #{order._id.slice(-8).toUpperCase()}</p>
//           </div>
//           <div className="text-left md:text-right">
//             <p className="text-sm text-gray-400">Order Date</p>
//             <p className="text-lg font-medium">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
//           </div>
//         </div>

//         {/* 1. STATUS TIMELINE BAR */}
//         <div className="bg-[#111] border border-white/10 rounded-2xl p-8 mb-8 shadow-xl">
//           <h2 className="text-lg font-serif mb-8 text-white">Track Delivery Status</h2>
          
//           {isCancelled ? (
//             <div className="text-red-500 font-semibold text-center py-4 bg-red-500/10 rounded-lg border border-red-500/20">
//               This order has been Cancelled.
//             </div>
//           ) : (
//             <div className="relative flex justify-between items-center w-full max-w-3xl mx-auto">
//               <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full z-0"></div>
//               <div 
//                 className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#C8A253] transition-all duration-700 ease-out z-0"
//                 style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
//               ></div>

//               {steps.map((step, index) => {
//                 const isActive = index <= currentStepIndex;
//                 return (
//                   <div key={step} className="relative z-10 flex flex-col items-center group">
//                     <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-[#111] transition-colors duration-500 ${isActive ? 'bg-[#C8A253] shadow-[0_0_15px_rgba(200,162,83,0.4)]' : 'bg-gray-700'}`}>
//                       {isActive && (
//                         <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                         </svg>
//                       )}
//                     </div>
//                     <p className={`mt-3 text-xs md:text-sm font-medium ${isActive ? 'text-[#C8A253]' : 'text-gray-500'}`}>
//                       {step}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* ⚡ AWB & COURIER TRACKING BOX ⚡ */}
//           {order.trackingDetails?.courierPartner && currentStepIndex >= 1 && (
//             <div className="mt-10 bg-[#1A1A1A] rounded-xl p-5 border border-[#C8A253]/30 flex flex-col md:flex-row justify-between items-center gap-4">
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 bg-[#C8A253]/10 rounded-full flex items-center justify-center text-[#C8A253]">
//                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-400">Courier Partner</p>
//                   <p className="text-white font-medium text-lg">{order.trackingDetails.courierPartner}</p>
//                 </div>
//               </div>
//               <div className="text-left md:text-right w-full md:w-auto">
//                 <p className="text-xs text-gray-400">Tracking ID (AWB)</p>
//                 <div className="flex items-center md:justify-end gap-2">
//                   <p className="text-[#C8A253] font-mono font-bold text-xl">{order.trackingDetails.awbNumber}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* 2. ORDER DETAILS GRIDS */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
//               <h3 className="text-lg font-serif mb-6 border-b border-white/10 pb-4">Items in your order</h3>
//               <div className="space-y-6">
//                 {order.orderItems.map((item, index) => (
//                   <div key={index} className="flex items-center gap-6">
//                     <div className="w-24 h-24 bg-white/5 rounded-xl overflow-hidden flex-shrink-0">
//                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                     </div>
//                     <div className="flex-1">
//                       <h4 className="text-base font-medium text-white">{item.name}</h4>
//                       <p className="text-sm text-gray-400 mt-1">Qty: {item.quantity}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-lg font-semibold text-[#C8A253]">₹{item.price * item.quantity}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="space-y-8">
//             <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
//               <h3 className="text-lg font-serif mb-4 border-b border-white/10 pb-4">Delivery Address</h3>
//               <p className="font-medium text-white">{order.shippingAddress.fullName}</p>
//               <p className="text-sm text-gray-400 mt-2 leading-relaxed">
//                 {order.shippingAddress.addressLine1}<br />
//                 {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}<br />
//                 {order.shippingAddress.country}
//               </p>
//               <p className="text-sm text-gray-400 mt-3 font-mono">📞 {order.shippingAddress.phone}</p>
//             </div>

//             <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
//               <h3 className="text-lg font-serif mb-4 border-b border-white/10 pb-4">Payment Summary</h3>
//               <div className="space-y-3 text-sm">
//                 <div className="flex justify-between text-gray-400">
//                   <span>Items Total</span>
//                   <span className="text-white">₹{order.itemsPrice}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-400">
//                   <span>Shipping Fee</span>
//                   <span className="text-[#C8A253]">{order.shippingPrice === 0 ? 'FREE' : `₹${order.shippingPrice}`}</span>
//                 </div>
//                 <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-white/10">
//                   <span>Grand Total</span>
//                   <span className="text-[#C8A253]">₹{order.totalAmount}</span>
//                 </div>
//               </div>
//               <div className="mt-6 bg-[#1A1A1A] rounded-lg p-3 text-center text-xs text-gray-400 border border-white/5">
//                 Payment Method: <span className="text-white uppercase font-semibold">{order.paymentInfo?.method || 'N/A'}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

// }

// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axiosInstance from '../utils/axiosInstance';

// export default function OrderDetails() {
//   const { id } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrderDetails = async () => {
//       try {
//         const { data } = await axiosInstance.get(`/orders/${id}`); 
//         setOrder(data.data || data.order);
//       } catch (err) {
//         console.error("Error fetching order details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrderDetails();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="w-10 h-10 border-4 border-[#C8A253] border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-800">
//         <h2 className="text-2xl font-serif text-[#C8A253] mb-4">Order Not Found</h2>
//         <Link to="/profile" className="text-sm underline hover:text-[#C8A253]">Go Back to Profile</Link>
//       </div>
//     );
//   }

//   const steps = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
//   const isCancelled = order.orderStatus === 'Cancelled';
//   let currentStepIndex = steps.indexOf(order.orderStatus);
//   if (currentStepIndex === -1 && !isCancelled) currentStepIndex = 0;

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-4 md:px-8 font-sans">
//       <div className="max-w-5xl mx-auto">
        
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-gray-200 pb-6 gap-4">
//           <div>
//             <Link to="/profile" className="text-gray-500 text-xs mb-4 inline-flex items-center hover:text-[#C8A253] transition">
//               ← Back to My Orders
//             </Link>
//             <h1 className="text-3xl font-serif text-gray-900">Order Details</h1>
//             <p className="text-gray-500 mt-2 text-sm tracking-widest uppercase">Order ID: #{order._id.slice(-8).toUpperCase()}</p>
//           </div>
//           <div className="text-left md:text-right">
//             <p className="text-sm text-gray-500">Order Date</p>
//             <p className="text-lg font-medium">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
//           </div>
//         </div>

//         {/* 1. STATUS TIMELINE BAR */}
//         <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8 shadow-sm">
//           <h2 className="text-lg font-serif mb-8 text-gray-900">Track Delivery Status</h2>
          
//           {isCancelled ? (
//             <div className="text-red-600 font-semibold text-center py-4 bg-red-50 rounded-lg border border-red-200">
//               This order has been Cancelled.
//             </div>
//           ) : (
//             <div className="relative flex justify-between items-center w-full max-w-3xl mx-auto">
//               <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full z-0"></div>
//               <div 
//                 className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#C8A253] transition-all duration-700 ease-out z-0"
//                 style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
//               ></div>

//               {steps.map((step, index) => {
//                 const isActive = index <= currentStepIndex;
//                 return (
//                   <div key={step} className="relative z-10 flex flex-col items-center group">
//                     <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white transition-colors duration-500 ${isActive ? 'bg-[#C8A253] shadow-md' : 'bg-gray-300'}`}>
//                       {isActive && (
//                         <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                         </svg>
//                       )}
//                     </div>
//                     <p className={`mt-3 text-xs md:text-sm font-medium ${isActive ? 'text-[#C8A253]' : 'text-gray-400'}`}>
//                       {step}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* ⚡ AWB & COURIER TRACKING BOX ⚡ */}
//           {order.trackingDetails?.courierPartner && currentStepIndex >= 1 && (
//             <div className="mt-10 bg-gray-50 rounded-xl p-5 border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 bg-[#C8A253]/10 rounded-full flex items-center justify-center text-[#C8A253]">
//                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Courier Partner</p>
//                   <p className="text-gray-900 font-medium text-lg">{order.trackingDetails.courierPartner}</p>
//                 </div>
//               </div>
//               <div className="text-left md:text-right w-full md:w-auto">
//                 <p className="text-xs text-gray-500">Tracking ID (AWB)</p>
//                 <div className="flex items-center md:justify-end gap-2">
//                   <p className="text-[#C8A253] font-mono font-bold text-xl">{order.trackingDetails.awbNumber}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* 2. ORDER DETAILS GRIDS */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
//               <h3 className="text-lg font-serif mb-6 border-b border-gray-100 pb-4">Items in your order</h3>
//               <div className="space-y-6">
//                 {order.orderItems.map((item, index) => (
//                   <div key={index} className="flex items-center gap-6">
//                     <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
//                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                     </div>
//                     <div className="flex-1">
//                       <h4 className="text-base font-medium text-gray-900">{item.name}</h4>
//                       <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-lg font-semibold text-[#C8A253]">₹{item.price * item.quantity}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="space-y-8">
//             <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
//               <h3 className="text-lg font-serif mb-4 border-b border-gray-100 pb-4">Delivery Address</h3>
//               <p className="font-medium text-gray-900">{order.shippingAddress.fullName}</p>
//               <p className="text-sm text-gray-500 mt-2 leading-relaxed">
//                 {order.shippingAddress.addressLine1}<br />
//                 {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}<br />
//                 {order.shippingAddress.country}
//               </p>
//               <p className="text-sm text-gray-500 mt-3 font-mono">📞 {order.shippingAddress.phone}</p>
//             </div>

//             <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
//               <h3 className="text-lg font-serif mb-4 border-b border-gray-100 pb-4">Payment Summary</h3>
//               <div className="space-y-3 text-sm">
//                 <div className="flex justify-between text-gray-500">
//                   <span>Items Total</span>
//                   <span className="text-gray-900">₹{order.itemsPrice}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-500">
//                   <span>Shipping Fee</span>
//                   <span className="text-[#C8A253]">{order.shippingPrice === 0 ? 'FREE' : `₹${order.shippingPrice}`}</span>
//                 </div>
//                 <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-100">
//                   <span>Grand Total</span>
//                   <span className="text-[#C8A253]">₹{order.totalAmount}</span>
//                 </div>
//               </div>
//               <div className="mt-6 bg-gray-50 rounded-lg p-3 text-center text-xs text-gray-500 border border-gray-100">
//                 Payment Method: <span className="text-gray-900 uppercase font-semibold">{order.paymentInfo?.method || 'N/A'}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axiosInstance from '../utils/axiosInstance';

// export default function OrderDetails({ orderId }) { // ⚡ Prop add kiya
//   const { id: urlId } = useParams();
//   const id = orderId || urlId; // ⚡ Modal se ID aaye toh wo lo, warna URL se
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) return;
    
//     const fetchOrderDetails = async () => {
//       try {
//         setLoading(true);
//         // Admin panel mein modal ke liye route dynamic banaya
//         const isAdmin = window.location.pathname.includes('/admin');
//         const url = isAdmin ? `/admin/orders/${id}` : `/orders/${id}`;
        
//         const { data } = await axiosInstance.get(url); 
//         setOrder(data.data || data.order);
//       } catch (err) {
//         console.error("Error fetching order details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrderDetails();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="w-10 h-10 border-4 border-[#C8A253] border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-800">
//         <h2 className="text-2xl font-serif text-[#C8A253] mb-4">Order Not Found</h2>
//         {!orderId && <Link to="/profile" className="text-sm underline hover:text-[#C8A253]">Go Back to Profile</Link>}
//       </div>
//     );
//   }

//   const steps = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
//   const isCancelled = order.orderStatus === 'Cancelled';
//   let currentStepIndex = steps.indexOf(order.orderStatus);
//   if (currentStepIndex === -1 && !isCancelled) currentStepIndex = 0;

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-4 md:px-8 font-sans">
//       <div className="max-w-5xl mx-auto">
        
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-gray-200 pb-6 gap-4">
//           <div>
//             {!orderId && (
//               <Link to="/profile" className="text-gray-500 text-xs mb-4 inline-flex items-center hover:text-[#C8A253] transition">
//                 ← Back to My Orders
//               </Link>
//             )}
//             <h1 className="text-3xl font-serif text-gray-900">Order Details</h1>
//             <p className="text-gray-500 mt-2 text-sm tracking-widest uppercase">Order ID: #{order._id.slice(-8).toUpperCase()}</p>
//           </div>
//           <div className="text-left md:text-right">
//             <p className="text-sm text-gray-500">Order Date</p>
//             <p className="text-lg font-medium">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
//           </div>
//         </div>

//         {/* 1. STATUS TIMELINE BAR */}
//         <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8 shadow-sm">
//           <h2 className="text-lg font-serif mb-8 text-gray-900">Track Delivery Status</h2>
          
//           {isCancelled ? (
//             <div className="text-red-600 font-semibold text-center py-4 bg-red-50 rounded-lg border border-red-200">
//               This order has been Cancelled.
//             </div>
//           ) : (
//             <div className="relative flex justify-between items-center w-full max-w-3xl mx-auto">
//               <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full z-0"></div>
//               <div 
//                 className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#C8A253] transition-all duration-700 ease-out z-0"
//                 style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
//               ></div>

//               {steps.map((step, index) => {
//                 const isActive = index <= currentStepIndex;
//                 return (
//                   <div key={step} className="relative z-10 flex flex-col items-center group">
//                     <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white transition-colors duration-500 ${isActive ? 'bg-[#C8A253] shadow-md' : 'bg-gray-300'}`}>
//                       {isActive && (
//                         <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                         </svg>
//                       )}
//                     </div>
//                     <p className={`mt-3 text-xs md:text-sm font-medium ${isActive ? 'text-[#C8A253]' : 'text-gray-400'}`}>
//                       {step}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* ⚡ AWB & COURIER TRACKING BOX ⚡ */}
//           {order.trackingDetails?.courierPartner && currentStepIndex >= 1 && (
//             <div className="mt-10 bg-gray-50 rounded-xl p-5 border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 bg-[#C8A253]/10 rounded-full flex items-center justify-center text-[#C8A253]">
//                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Courier Partner</p>
//                   <p className="text-gray-900 font-medium text-lg">{order.trackingDetails.courierPartner}</p>
//                 </div>
//               </div>
//               <div className="text-left md:text-right w-full md:w-auto">
//                 <p className="text-xs text-gray-500">Tracking ID (AWB)</p>
//                 <div className="flex items-center md:justify-end gap-2">
//                   <p className="text-[#C8A253] font-mono font-bold text-xl">{order.trackingDetails.awbNumber}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* 2. ORDER DETAILS GRIDS */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
//               <h3 className="text-lg font-serif mb-6 border-b border-gray-100 pb-4">Items in your order</h3>
//               <div className="space-y-6">
//                 {order.orderItems.map((item, index) => (
//                   <div key={index} className="flex items-center gap-6">
//                     <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
//                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                     </div>
//                     <div className="flex-1">
//                       <h4 className="text-base font-medium text-gray-900">{item.name}</h4>
//                       <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-lg font-semibold text-[#C8A253]">₹{item.price * item.quantity}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="space-y-8">
//             <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
//               <h3 className="text-lg font-serif mb-4 border-b border-gray-100 pb-4">Delivery Address</h3>
//               <p className="font-medium text-gray-900">{order.shippingAddress.fullName}</p>
//               <p className="text-sm text-gray-500 mt-2 leading-relaxed">
//                 {order.shippingAddress.addressLine1}<br />
//                 {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}<br />
//                 {order.shippingAddress.country}
//               </p>
//               <p className="text-sm text-gray-500 mt-3 font-mono">📞 {order.shippingAddress.phone}</p>
//             </div>

//             <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
//               <h3 className="text-lg font-serif mb-4 border-b border-gray-100 pb-4">Payment Summary</h3>
//               <div className="space-y-3 text-sm">
//                 <div className="flex justify-between text-gray-500">
//                   <span>Items Total</span>
//                   <span className="text-gray-900">₹{order.itemsPrice}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-500">
//                   <span>Shipping Fee</span>
//                   <span className="text-[#C8A253]">{order.shippingPrice === 0 ? 'FREE' : `₹${order.shippingPrice}`}</span>
//                 </div>
//                 <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-100">
//                   <span>Grand Total</span>
//                   <span className="text-[#C8A253]">₹{order.totalAmount}</span>
//                 </div>
//               </div>
//               <div className="mt-6 bg-gray-50 rounded-lg p-3 text-center text-xs text-gray-500 border border-gray-100">
//                 Payment Method: <span className="text-gray-900 uppercase font-semibold">{order.paymentInfo?.method || 'N/A'}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

export default function OrderDetails({ orderId }) { 
  const { id: urlId } = useParams();
  const id = orderId || urlId; 
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const isAdmin = window.location.pathname.includes('/admin');
        const url = isAdmin ? `/admin/orders/${id}` : `/orders/${id}`;
        
        const { data } = await axiosInstance.get(url); 
        setOrder(data.data || data.order);
      } catch (err) {
        console.error("Error fetching order details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#C8A253] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-800">
        <h2 className="text-2xl font-serif text-[#C8A253] mb-4">Order Not Found</h2>
        {!orderId && <Link to="/profile" className="text-sm underline hover:text-[#C8A253]">Go Back to Profile</Link>}
      </div>
    );
  }

  const steps = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
  const isCancelled = order.orderStatus === 'Cancelled';
  let currentStepIndex = steps.indexOf(order.orderStatus);
  if (currentStepIndex === -1 && !isCancelled) currentStepIndex = 0;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-4 md:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-gray-200 pb-6 gap-4">
          <div>
            {!orderId && (
              <Link to="/profile" className="text-gray-500 text-xs mb-4 inline-flex items-center hover:text-[#C8A253] transition">
                ← Back to My Orders
              </Link>
            )}
            <h1 className="text-3xl font-serif text-gray-900">Order Details</h1>
            <p className="text-gray-500 mt-2 text-sm tracking-widest uppercase">Order ID: #{order._id.slice(-8).toUpperCase()}</p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-sm text-gray-500">Order Date</p>
            <p className="text-lg font-medium">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>

        {/* 1. STATUS TIMELINE BAR */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8 shadow-sm">
          <h2 className="text-lg font-serif mb-8 text-gray-900">Track Delivery Status</h2>
          
          {isCancelled ? (
            <div className="text-red-600 font-semibold text-center py-4 bg-red-50 rounded-lg border border-red-200">
              This order has been Cancelled.
            </div>
          ) : (
            <div className="relative flex justify-between items-center w-full max-w-3xl mx-auto">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full z-0"></div>
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#C8A253] transition-all duration-700 ease-out z-0"
                style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
              ></div>

              {steps.map((step, index) => {
                const isActive = index <= currentStepIndex;
                return (
                  <div key={step} className="relative z-10 flex flex-col items-center group">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white transition-colors duration-500 ${isActive ? 'bg-[#C8A253] shadow-md' : 'bg-gray-300'}`}>
                      {isActive && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <p className={`mt-3 text-xs md:text-sm font-medium ${isActive ? 'text-[#C8A253]' : 'text-gray-400'}`}>
                      {step}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* AWB & COURIER TRACKING BOX */}
          {order.trackingDetails?.courierPartner && currentStepIndex >= 1 && (
            <div className="mt-10 bg-gray-50 rounded-xl p-5 border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#C8A253]/10 rounded-full flex items-center justify-center text-[#C8A253]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Courier Partner</p>
                  <p className="text-gray-900 font-medium text-lg">{order.trackingDetails.courierPartner}</p>
                </div>
              </div>
              <div className="text-left md:text-right w-full md:w-auto">
                <p className="text-xs text-gray-500">Tracking ID (AWB)</p>
                <div className="flex items-center md:justify-end gap-2">
                  <p className="text-[#C8A253] font-mono font-bold text-xl">{order.trackingDetails.awbNumber}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. ORDER DETAILS GRIDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-serif mb-6 border-b border-gray-100 pb-4">Items in your order</h3>
              <div className="space-y-6">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-[#C8A253]">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-serif mb-4 border-b border-gray-100 pb-4">Delivery Address</h3>
              <p className="font-medium text-gray-900">{order.shippingAddress.fullName}</p>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {order.shippingAddress.addressLine1}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}<br />
                {order.shippingAddress.country}
              </p>
              <p className="text-sm text-gray-500 mt-3 font-mono">📞 {order.shippingAddress.phone}</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-serif mb-4 border-b border-gray-100 pb-4">Payment Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Items Total</span>
                  {/* ⚡ YAHI FIX KIYA HAI: Agar itemsPrice nahi hai toh khud calculate kar lega */}
                  <span className="text-gray-900">
                    ₹{order.itemsPrice || order.orderItems?.reduce((total, item) => total + (item.price * item.quantity), 0)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping Fee</span>
                  <span className="text-[#C8A253]">{order.shippingPrice === 0 ? 'FREE' : `₹${order.shippingPrice}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-100">
                  <span>Grand Total</span>
                  <span className="text-[#C8A253]">₹{order.totalAmount}</span>
                </div>
              </div>
              <div className="mt-6 bg-gray-50 rounded-lg p-3 text-center text-xs text-gray-500 border border-gray-100">
                Payment Method: <span className="text-gray-900 uppercase font-semibold">{order.paymentInfo?.method || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
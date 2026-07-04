// import React, { useEffect } from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import { CheckCircle, Package } from 'lucide-react';

// export default function OrderSuccess() {
//   const location = useLocation();
  
//   const orderId = location.state?.orderId || "ORD-" + Math.floor(Math.random() * 1000000);
//   const paymentMethod = location.state?.paymentMethod || 'razorpay';
//   const paymentStatus = paymentMethod === 'cod' ? 'Awaiting Payment' : 'Paid';
//   const statusColor = paymentMethod === 'cod' ? 'text-yellow-500' : 'text-green-500';

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center p-4">
//       <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 md:p-8 max-w-md w-full">
        
//         {/* Icon */}
//         <div className="flex justify-center mb-6">
//           <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500">
//             <CheckCircle className="w-8 h-8 text-green-500" strokeWidth={2} />
//           </div>
//         </div>

//         {/* Title */}
//         <h1 className="text-3xl font-serif text-center text-white mb-1">Thank You!</h1>
//         <p className="text-center text-gray-400 text-sm tracking-widest uppercase mb-6">Order Confirmed</p>

//         {/* Details */}
//         <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6 space-y-3">
//           <div className="flex justify-between">
//             <span className="text-gray-400 text-sm">Order ID:</span>
//             <span className="text-white font-mono text-sm font-bold">{orderId.toString().slice(-8).toUpperCase()}</span>
//           </div>
//           <div className="border-t border-gray-700 pt-3 flex justify-between">
//             <span className="text-gray-400 text-sm flex items-center gap-1">
//               <Package className="w-4 h-4" />
//               Status:
//             </span>
//             <span className={`${statusColor} text-sm font-semibold`}>{paymentStatus}</span>
//           </div>
//           <div className="border-t border-gray-700 pt-3 flex justify-between">
//             <span className="text-gray-400 text-sm">Delivery:</span>
//             <span className="text-white text-sm">3-5 Days</span>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="grid grid-cols-1 gap-3">
//           <Link 
//             to="/shop"
//             className="w-full py-3 px-4 rounded-lg bg-white text-black text-sm font-bold text-center hover:bg-gray-200 transition-all"
//           >
//             Continue Shopping
//           </Link>
//           <Link 
//             to="/profile"
//             className="w-full py-3 px-4 rounded-lg bg-gray-700 text-white text-sm font-bold text-center hover:bg-gray-600 transition-all border border-gray-600"
//           >
//             View Orders
//           </Link>
//         </div>

//       </div>
//     </div>
//   );
// }

// import React from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import { CheckCircle, Package, Calendar } from 'lucide-react';
// // Purana import hatao aur ye wala likho:
// import ParticlesBackground from './ParticlesBackground'; // ⚡ Nayi file import ki

// export default function OrderSuccess() {
//   const location = useLocation();
  
//   const orderId = location.state?.orderId || "ORD-" + Math.floor(100000 + Math.random() * 900000);
//   const paymentMethod = location.state?.paymentMethod || 'cod';
//   const paymentStatus = paymentMethod === 'cod' ? 'AWAITING PAYMENT' : 'PAID';
//   const statusColor = paymentMethod === 'cod' ? 'text-yellow-700 bg-yellow-50 border-yellow-200' : 'text-green-700 bg-green-50 border-green-200';

//   // White Particles generation (Inline for stability)
//   const particles = Array.from({ length: 15 }).map((_, i) => ({
//     left: `${Math.random() * 100}%`,
//     animationDelay: `${Math.random() * 5}s`,
//     size: `${Math.random() * 4 + 2}px`
//   }));

//   return (
//     <div className="h-screen w-full bg-gray-50 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      
//       {/* Inline Styles for Particles to avoid HMR/MIME errors */}
//       <style>{`
//         .particle {
//           position: absolute; bottom: -10px; background: white; border-radius: 50%; opacity: 0.4;
//           animation: floatUp 15s linear infinite;
//         }
//         @keyframes floatUp { to { transform: translateY(-100vh); } }
//       `}</style>
      
//       {particles.map((p, i) => (
//         <div key={i} className="particle" style={{ left: p.left, animationDelay: p.animationDelay, width: p.size, height: p.size }} />
//       ))}

//       {/* Main Card - Fixed and Responsive */}
//       <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center relative z-10">
        
//         <div className="flex justify-center mb-6">
//           <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
//             <CheckCircle className="w-10 h-10 text-blue-600" strokeWidth={2.5} />
//           </div>
//         </div>

//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Successful!</h1>
//         <p className="text-gray-500 mb-8">Thank you for your purchase.</p>

//         <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 mb-8 text-left space-y-4">
//           <div className="flex justify-between items-center border-b border-gray-200 pb-4">
//             <span className="text-gray-500 font-medium text-sm">Order ID</span>
//             <span className="text-gray-900 font-mono font-bold text-sm uppercase">{orderId.toString().toUpperCase()}</span>
//           </div>
//           <div className="flex justify-between items-center border-b border-gray-200 pb-4">
//             <span className="text-gray-500 font-medium text-sm flex items-center gap-2">
//               <Package className="w-4 h-4" /> Payment
//             </span>
//             <span className={`text-[10px] font-bold px-3 py-1 rounded border ${statusColor}`}>
//               {paymentStatus}
//             </span>
//           </div>
//           <div className="flex justify-between items-center">
//             <span className="text-gray-500 font-medium text-sm flex items-center gap-2">
//               <Calendar className="w-4 h-4" /> Delivery
//             </span>
//             <span className="text-gray-900 font-semibold text-sm">3-5 Days</span>
//           </div>
//         </div>

//         <div className="space-y-3">
//           <Link to="/shop" className="block w-full py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all">
//             Continue Shopping
//           </Link>
//           <Link to="/profile" className="block w-full py-4 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold transition-all">
//             View Order History
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import { CheckCircle, Package, Calendar } from 'lucide-react';
// import ParticlesBackground from './ParticlesBackground'; // ⚡ Tumhara JS Component yahan import kiya hai

// export default function OrderSuccess() {
//   const location = useLocation();
  
//   const orderId = location.state?.orderId || "ORD-" + Math.floor(100000 + Math.random() * 900000);
//   const paymentMethod = location.state?.paymentMethod || 'cod';
//   const paymentStatus = paymentMethod === 'cod' ? 'AWAITING PAYMENT' : 'PAID';
//   const statusColor = paymentMethod === 'cod' ? 'text-yellow-700 bg-yellow-50 border-yellow-200' : 'text-green-700 bg-green-50 border-green-200';

//   return (
//     <div className="h-screen w-full bg-gray-50 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      
//       {/* ⚡ Tumhara JS Particles yahan chalega */}
//       <ParticlesBackground />

//       {/* Main Card - Fixed and Responsive (Baaki sab ekdum same hai) */}
//       <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center relative z-10">
        
//         <div className="flex justify-center mb-6">
//           <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
//             <CheckCircle className="w-10 h-10 text-blue-600" strokeWidth={2.5} />
//           </div>
//         </div>

//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Successful!</h1>
//         <p className="text-gray-500 mb-8">Thank you for your purchase.</p>

//         <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 mb-8 text-left space-y-4">
//           <div className="flex justify-between items-center border-b border-gray-200 pb-4">
//             <span className="text-gray-500 font-medium text-sm">Order ID</span>
//             <span className="text-gray-900 font-mono font-bold text-sm uppercase">{orderId.toString().toUpperCase()}</span>
//           </div>
//           <div className="flex justify-between items-center border-b border-gray-200 pb-4">
//             <span className="text-gray-500 font-medium text-sm flex items-center gap-2">
//               <Package className="w-4 h-4" /> Payment
//             </span>
//             <span className={`text-[10px] font-bold px-3 py-1 rounded border ${statusColor}`}>
//               {paymentStatus}
//             </span>
//           </div>
//           <div className="flex justify-between items-center">
//             <span className="text-gray-500 font-medium text-sm flex items-center gap-2">
//               <Calendar className="w-4 h-4" /> Delivery
//             </span>
//             <span className="text-gray-900 font-semibold text-sm">3-5 Days</span>
//           </div>
//         </div>

//         <div className="space-y-3">
//           <Link to="/shop" className="block w-full py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all">
//             Continue Shopping
//           </Link>
//           <Link to="/profile" className="block w-full py-4 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold transition-all">
//             View Order History
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }



// import React from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import { CheckCircle, Package, Calendar } from 'lucide-react';
// // import ParticlesBackground from './ParticlesBackground'; 

// export default function OrderSuccess() {
//   const location = useLocation();
  
//   const orderId = location.state?.orderId || "ORD-" + Math.floor(100000 + Math.random() * 900000);
//   const paymentMethod = location.state?.paymentMethod || 'cod';
//   const paymentStatus = paymentMethod === 'cod' ? 'AWAITING PAYMENT' : 'PAID';
//   const statusColor = paymentMethod === 'cod' ? 'text-yellow-700 bg-yellow-50 border-yellow-200' : 'text-green-700 bg-green-50 border-green-200';

//   return (
//     <div className="fixed inset-0 bg-gray-50 flex items-center justify-center p-4 font-sans overflow-hidden">
      
//       {/* <ParticlesBackground /> */}

//       {/* ⚡ YAHAN CHANGE KIYA HAI: "mt-24" (margin-top) add kiya hai taaki card navbar se niche aa jaye */}
//       <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center relative z-10 mt-20">
        
//         <div className="flex justify-center mb-6">
//           <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
//             <CheckCircle className="w-10 h-10 text-blue-600" strokeWidth={2.5} />
//           </div>
//         </div>

//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Successful!</h1>
//         <p className="text-gray-500 mb-8">Thank you for your purchase.</p>

//         <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 mb-8 text-left space-y-4">
//           <div className="flex justify-between items-center border-b border-gray-200 pb-4">
//             <span className="text-gray-500 font-medium text-sm">Order ID</span>
//             <span className="text-gray-900 font-mono font-bold text-sm uppercase">{orderId.toString().toUpperCase()}</span>
//           </div>
//           <div className="flex justify-between items-center border-b border-gray-200 pb-4">
//             <span className="text-gray-500 font-medium text-sm flex items-center gap-2">
//               <Package className="w-4 h-4" /> Payment
//             </span>
//             <span className={`text-[10px] font-bold px-3 py-1 rounded border ${statusColor}`}>
//               {paymentStatus}
//             </span>
//           </div>
//           <div className="flex justify-between items-center">
//             <span className="text-gray-500 font-medium text-sm flex items-center gap-2">
//               <Calendar className="w-4 h-4" /> Delivery
//             </span>
//             <span className="text-gray-900 font-semibold text-sm">3-5 Days</span>
//           </div>
//         </div>

//         <div className="space-y-3">
//           <Link to="/shop" className="block w-full py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all">
//             Continue Shopping
//           </Link>
//           <Link to="/profile" className="block w-full py-4 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold transition-all">
//             View Order History
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance'; 
import { CheckCircle, MapPin, CreditCard, Receipt, Package, ArrowRight, Download } from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const orderIdFromState = location.state?.orderId;
  const paymentMethodFromState = location.state?.paymentMethod;
  
  const [order, setOrder] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Agar URL direct open ho bina order ke, to shop par bhej do
    if (!orderIdFromState) {
      navigate('/shop');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch Order Details
        const orderRes = await axiosInstance.get(`/orders/${orderIdFromState}`); 
        const orderData = orderRes.data.data || orderRes.data.order;
        setOrder(orderData);

        // 2. Fetch All Products for Smart Recommendations
        const productsRes = await axiosInstance.get('/products');
        if (productsRes.data?.products) {
           const allProducts = productsRes.data.products;

           // ⚡ SMART RECOMMENDATION LOGIC
           // Order kiye gaye products ki IDs nikaalo
           const purchasedProductIds = orderData.orderItems?.map(item => 
             item.product?._id?.toString() || item.product?.toString()
           ) || [];

           // Un products ko hata do jo already order ho chuke hain
           const filteredProducts = allProducts.filter(
             (p) => !purchasedProductIds.includes(p._id.toString())
           );

           // Baki products ko shuffle (randomize) karke top 4 nikal lo
           const shuffledProducts = filteredProducts.sort(() => 0.5 - Math.random());
           setRecommendedProducts(shuffledProducts.slice(0, 4));
        }
      } catch (err) {
        console.error("Data fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderIdFromState, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Details Not Found</h2>
        <Link to="/shop" className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
          Return to Shop
        </Link>
      </div>
    );
  }

  // Helper variables
  const pStatus = order.paymentInfo?.paymentStatus || 'Pending';
  const pMethod = order.paymentInfo?.method || paymentMethodFromState || 'cod';
// ⚡ Naya logic: Agar backend se itemsPrice na aaye, toh items ko multiply karke khud nikal lo
  const calculatedSubtotal = order.orderItems?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;
  
  const subtotal = order.itemsPrice || calculatedSubtotal;
  const shipping = order.shippingPrice || 0;
  const total = order.totalAmount || 0;
  const discount = (subtotal + shipping) - total;
  const formattedDate = new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-20 font-sans text-gray-900">
      
      {/* ⚡ SUCCESS HEADER CARD */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 text-green-500 rounded-full mb-6">
            <CheckCircle size={40} strokeWidth={2} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Order Successfully Placed!</h1>
          <p className="text-gray-500 text-lg mb-8">Thank you for shopping with us, {order.shippingAddress?.fullName?.split(' ')[0] || 'Customer'}.</p>
          
          <div className="inline-flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <div className="bg-gray-50 px-5 py-3 rounded-lg border border-gray-100">
              <span className="text-gray-500 block text-xs uppercase font-bold tracking-wider mb-1">Order ID</span>
              <span className="font-mono font-bold text-gray-900">#{order._id?.slice(-8).toUpperCase()}</span>
            </div>
            <div className="bg-gray-50 px-5 py-3 rounded-lg border border-gray-100">
              <span className="text-gray-500 block text-xs uppercase font-bold tracking-wider mb-1">Date</span>
              <span className="font-semibold text-gray-900">{formattedDate}</span>
            </div>
            <div className="bg-gray-50 px-5 py-3 rounded-lg border border-gray-100">
              <span className="text-gray-500 block text-xs uppercase font-bold tracking-wider mb-1">Total Amount</span>
              <span className="font-bold text-green-600">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ⚡ 2-COLUMN GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Items & Summary */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Items Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50/50 border-b border-gray-100 px-6 py-4 flex items-center gap-2">
                <Package size={20} className="text-gray-500" />
                <h2 className="font-bold text-gray-800 text-lg">Items in your order</h2>
              </div>
              <div className="p-6 space-y-6">
                {order.orderItems?.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-lg border border-gray-100 p-2 shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-contain mix-blend-multiply" 
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900 text-sm md:text-base leading-tight">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Summary Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50/50 border-b border-gray-100 px-6 py-4 flex items-center gap-2">
                <Receipt size={20} className="text-gray-500" />
                <h2 className="font-bold text-gray-800 text-lg">Order Summary</h2>
              </div>
              <div className="p-6 space-y-4 text-sm md:text-base">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-medium" : "font-medium text-gray-900"}>
                    {shipping === 0 ? "FREE" : `₹${shipping.toLocaleString('en-IN')}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span className="font-medium">- ₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-900 font-bold text-xl pt-4 border-t border-gray-100 mt-2">
                  <span>Total Paid</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Address, Payment & Actions */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Delivery Address Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50/50 border-b border-gray-100 px-6 py-4 flex items-center gap-2">
                <MapPin size={20} className="text-gray-500" />
                <h2 className="font-bold text-gray-800 text-lg">Delivery Address</h2>
              </div>
              <div className="p-6 text-gray-600 text-sm md:text-base space-y-1">
                <p className="font-bold text-gray-900 text-base mb-2">{order.shippingAddress?.fullName}</p>
                <p>{order.shippingAddress?.addressLine1}</p>
                <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}</p>
                <p>{order.shippingAddress?.country || 'India'}</p>
                <p className="mt-4 pt-4 border-t border-gray-100">
                  <span className="font-medium text-gray-800">Phone:</span> {order.shippingAddress?.phone}
                </p>
              </div>
            </div>

            {/* Payment Details Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50/50 border-b border-gray-100 px-6 py-4 flex items-center gap-2">
                <CreditCard size={20} className="text-gray-500" />
                <h2 className="font-bold text-gray-800 text-lg">Payment Info</h2>
              </div>
              <div className="p-6 space-y-4 text-sm md:text-base">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-bold text-gray-900 uppercase">{pMethod}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Status</span>
                  <span className={`font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider ${pStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {pStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link to="/shop" className="flex items-center justify-center w-full py-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">
                Continue Shopping <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link to={`/profile/order/${order._id}`} className="flex items-center justify-center w-full py-4 rounded-xl font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
                View Order Details <Download size={18} className="ml-2" />
              </Link>
            </div>

          </div>
        </div>

        {/* ⚡ RECOMMENDED PRODUCTS (Filtered & Shuffled) */}
        {recommendedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {recommendedProducts.map((product) => (
                <Link to={`/product/${product._id}`} key={product._id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-[4/5] bg-gray-50 flex items-center justify-center p-6 relative">
                    <img 
                      src={product.images?.[0]?.url || "https://placehold.co/400"} 
                      alt={product.name} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 text-left">
                    <h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">{product.name}</h3>
                    <p className="text-sm font-bold text-gray-900 mt-2">₹{product.price?.toLocaleString('en-IN')}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
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
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, Calendar } from 'lucide-react';
import ParticlesBackground from './ParticlesBackground'; 

export default function OrderSuccess() {
  const location = useLocation();
  
  const orderId = location.state?.orderId || "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const paymentMethod = location.state?.paymentMethod || 'cod';
  const paymentStatus = paymentMethod === 'cod' ? 'AWAITING PAYMENT' : 'PAID';
  const statusColor = paymentMethod === 'cod' ? 'text-yellow-700 bg-yellow-50 border-yellow-200' : 'text-green-700 bg-green-50 border-green-200';

  return (
    <div className="fixed inset-0 bg-gray-50 flex items-center justify-center p-4 font-sans overflow-hidden">
      
      <ParticlesBackground />

      {/* ⚡ YAHAN CHANGE KIYA HAI: "mt-24" (margin-top) add kiya hai taaki card navbar se niche aa jaye */}
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center relative z-10 mt-20">
        
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
            <CheckCircle className="w-10 h-10 text-blue-600" strokeWidth={2.5} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Successful!</h1>
        <p className="text-gray-500 mb-8">Thank you for your purchase.</p>

        <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 mb-8 text-left space-y-4">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <span className="text-gray-500 font-medium text-sm">Order ID</span>
            <span className="text-gray-900 font-mono font-bold text-sm uppercase">{orderId.toString().toUpperCase()}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <span className="text-gray-500 font-medium text-sm flex items-center gap-2">
              <Package className="w-4 h-4" /> Payment
            </span>
            <span className={`text-[10px] font-bold px-3 py-1 rounded border ${statusColor}`}>
              {paymentStatus}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Delivery
            </span>
            <span className="text-gray-900 font-semibold text-sm">3-5 Days</span>
          </div>
        </div>

        <div className="space-y-3">
          <Link to="/shop" className="block w-full py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all">
            Continue Shopping
          </Link>
          <Link to="/profile" className="block w-full py-4 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold transition-all">
            View Order History
          </Link>
        </div>
      </div>
    </div>
  );
}
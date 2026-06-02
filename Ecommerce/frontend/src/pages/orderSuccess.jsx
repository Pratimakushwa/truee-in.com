import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  
  const orderId = location.state?.orderId || "ORD-" + Math.floor(Math.random() * 1000000);
  const paymentMethod = location.state?.paymentMethod || 'razorpay';
  const paymentStatus = paymentMethod === 'cod' ? 'Awaiting Payment' : 'Paid';
  const statusColor = paymentMethod === 'cod' ? 'text-yellow-500' : 'text-green-500';

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 md:p-8 max-w-md w-full">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500">
            <CheckCircle className="w-8 h-8 text-green-500" strokeWidth={2} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-serif text-center text-white mb-1">Thank You!</h1>
        <p className="text-center text-gray-400 text-sm tracking-widest uppercase mb-6">Order Confirmed</p>

        {/* Details */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400 text-sm">Order ID:</span>
            <span className="text-white font-mono text-sm font-bold">{orderId.toString().slice(-8).toUpperCase()}</span>
          </div>
          <div className="border-t border-gray-700 pt-3 flex justify-between">
            <span className="text-gray-400 text-sm flex items-center gap-1">
              <Package className="w-4 h-4" />
              Status:
            </span>
            <span className={`${statusColor} text-sm font-semibold`}>{paymentStatus}</span>
          </div>
          <div className="border-t border-gray-700 pt-3 flex justify-between">
            <span className="text-gray-400 text-sm">Delivery:</span>
            <span className="text-white text-sm">3-5 Days</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-1 gap-3">
          <Link 
            to="/shop"
            className="w-full py-3 px-4 rounded-lg bg-white text-black text-sm font-bold text-center hover:bg-gray-200 transition-all"
          >
            Continue Shopping
          </Link>
          <Link 
            to="/profile"
            className="w-full py-3 px-4 rounded-lg bg-gray-700 text-white text-sm font-bold text-center hover:bg-gray-600 transition-all border border-gray-600"
          >
            View Orders
          </Link>
        </div>

      </div>
    </div>
  );
}
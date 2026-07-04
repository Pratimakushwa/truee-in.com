
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, X } from 'lucide-react';
import axiosInstance from '../utils/axiosInstance';
import Toast from '../components/Toast';
import { CUSTOMER_TIMELINE, getTimelineIndex } from '../constants/orderStatuses';

export default function OrderDetails({ orderId }) { 
  const { id: urlId } = useParams();
  const id = orderId || urlId; 
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // REVIEW STATES
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (type, message) => setToastMessage({ type, message });

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

  // ⚡ UPDATED & SMART: Review Submit Function
  const handleReviewSubmit = async () => {
    if (!comment) {
      showToast("error", "Please write a comment");
      return;
    }
    
    try {
      // ⚡ Safety Check: productId sahi se extract karna
      const productId = selectedProduct.product?._id || selectedProduct.product;
      
      await axiosInstance.post(`/reviews/product/${productId}`, {
        rating: Number(rating),
        comment: comment,
        productName: selectedProduct.name || 'Product'
      });
      
      // Success hone par modal band karo aur message dikhao
      setIsModalOpen(false);
      showToast("success", "Review submitted for approval!");
      setComment('');
      setRating(5);
      
    } catch (err) {
      console.error("REVIEW ERROR:", err.response);
      
      // ⚡ ERROR DETECTING LOGIC (Backend ka exact message nikalne ke liye)
      let errorMessage = "Failed to submit review";
      
      if (err.response && err.response.data) {
          if (err.response.data.message) {
              errorMessage = err.response.data.message;
          } else if (err.response.data.error) {
              errorMessage = err.response.data.error;
          } else if (typeof err.response.data === 'string' && err.response.data.includes('<html')) {
              errorMessage = "Backend Server Error. Please check Node.js console.";
          } else {
              errorMessage = JSON.stringify(err.response.data);
          }
      }

      setIsModalOpen(false); // Modal band
      alert("🚨 SYSTEM MESSAGE: " + errorMessage); // Asli wajah alert me aayegi
      showToast("error", errorMessage); // Custom toast me bhi dikhega
    }
  };

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

  const steps = CUSTOMER_TIMELINE;
  const terminalStatuses = ['Cancelled', 'Refund Initiated', 'Refunded', 'Returned'];
  const isTerminal = terminalStatuses.includes(order.orderStatus);
  const currentStepIndex = getTimelineIndex(order.orderStatus);
  const progressWidth = steps.length > 1 && currentStepIndex >= 0
    ? `${(currentStepIndex / (steps.length - 1)) * 100}%`
    : '0%';

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-4 md:px-8 font-sans">
      {/* Toast Message Component */}
      {toastMessage && <Toast type={toastMessage.type} message={toastMessage.message} onClose={() => setToastMessage(null)} />}
      
      <div className="max-w-5xl mx-auto">
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

        <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8 shadow-sm">
          <h2 className="text-lg font-serif mb-8 text-gray-900">Track Delivery Status</h2>
          
          {isTerminal ? (
            <div className={`font-semibold text-center py-4 rounded-lg border ${
              order.orderStatus === 'Cancelled'
                ? 'text-red-600 bg-red-50 border-red-200'
                : 'text-amber-700 bg-amber-50 border-amber-200'
            }`}>
              Order status: {order.orderStatus}
            </div>
          ) : (
            <div className="overflow-x-auto pb-2">
            <div className="relative flex justify-between items-center w-full min-w-[640px] max-w-4xl mx-auto">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full z-0"></div>
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#C8A253] transition-all duration-700 ease-out z-0"
                style={{ width: progressWidth }}
              ></div>

              {steps.map((step, index) => {
                const isActive = currentStepIndex >= 0 && index <= currentStepIndex;
                return (
                  <div key={step} className="relative z-10 flex flex-col items-center group">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white transition-colors duration-500 ${isActive ? 'bg-[#C8A253] shadow-md' : 'bg-gray-300'}`}>
                      {isActive && (
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <p className={`mt-3 text-[10px] md:text-xs font-medium text-center max-w-[72px] leading-tight ${isActive ? 'text-[#C8A253]' : 'text-gray-400'}`}>
                      {step}
                    </p>
                  </div>
                );
              })}
            </div>
            </div>
          )}

          {order.statusHistory?.length > 0 && (
            <div className="mt-8 border-t border-gray-100 pt-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Status history</h3>
              <ul className="space-y-2 max-h-40 overflow-y-auto">
                {order.statusHistory.map((entry, i) => (
                  <li key={i} className="flex justify-between text-xs text-gray-500">
                    <span className="font-medium text-gray-800">{entry.status}</span>
                    <span>{entry.at ? new Date(entry.at).toLocaleString('en-IN') : '—'}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-serif mb-6 border-b border-gray-100 pb-4">Items in your order</h3>
              <div className="space-y-6">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex flex-col gap-4 border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center gap-6">
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

                    {/* TESTING MODE: Ye abhi testing ke liye true hai, baad mein isse Delivered check se replace kar dena */}
                    {true && (
                      <button 
                        onClick={() => { setSelectedProduct(item); setIsModalOpen(true); }}
                        className="w-max text-[11px] font-bold uppercase tracking-widest border border-black px-4 py-2 hover:bg-black hover:text-white transition-all ml-[120px]"
                      >
                        Write a Review
                      </button>
                    )}
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
          </div>
        </div>
      </div>

      {/* ⚡ REVIEW MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[999] p-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-sm shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-black"><X /></button>
            <h2 className="text-xl font-serif mb-6 text-center">Rate your experience</h2>
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} onClick={() => setRating(star)} className={`w-8 h-8 cursor-pointer transition-colors ${star <= rating ? 'fill-[#C8A253] text-[#C8A253]' : 'text-gray-300'}`} />
              ))}
            </div>
            <textarea 
              value={comment} onChange={(e) => setComment(e.target.value)}
              className="w-full border border-gray-200 p-4 rounded-lg mb-6 focus:ring-1 focus:ring-black outline-none" 
              placeholder="How was the product? Tell us your experience..." rows="4"
            />
            <button onClick={handleReviewSubmit} className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-all">
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
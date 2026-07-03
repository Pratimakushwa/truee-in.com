// import React, { useState, useEffect } from 'react';
// import { X, Gift, Copy, CheckCircle } from 'lucide-react';
// // Agar tumne react-confetti install kiya hai toh aur acha hai, nahi toh aise hi premium lagega.

// export default function WelcomeCouponPopup({ isOpen, onClose }) {
//     const [copied, setCopied] = useState(false);

//     if (!isOpen) return null;

//     const copyCode = () => {
//         navigator.clipboard.writeText('WELCOME500');
//         setCopied(true);
//         setTimeout(() => setCopied(false), 2000);
//     };

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity">
//             {/* Modal Box */}
//             <div className="bg-white rounded-2xl shadow-2xl w-11/12 max-w-md overflow-hidden relative animate-bounce-in">
                
//                 {/* Close Button */}
//                 <button 
//                     onClick={onClose} 
//                     className="absolute top-4 right-4 text-gray-500 hover:text-black hover:bg-gray-100 p-1 rounded-full transition"
//                 >
//                     <X size={20} />
//                 </button>

//                 {/* Top Section - Gold Background */}
//                 <div className="bg-gradient-to-r from-[#C8A253] to-[#e0c482] p-6 text-center text-white">
//                     <div className="bg-white text-[#C8A253] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
//                         <Gift size={32} />
//                     </div>
//                     <h2 className="text-2xl font-serif font-bold tracking-wide">Welcome to TRUEE!</h2>
//                     <p className="text-sm mt-1 opacity-90">Here is a special gift for your first purchase.</p>
//                 </div>

//                 {/* Bottom Section - Coupon Details */}
//                 <div className="p-8 text-center bg-gray-50">
//                     <p className="text-gray-600 mb-2 font-medium">Flat ₹500 OFF on orders above ₹3000</p>
                    
//                     {/* Coupon Code Box */}
//                     <div className="border-2 border-dashed border-[#C8A253] bg-yellow-50 p-4 rounded-lg flex items-center justify-between mb-6">
//                         <span className="font-bold text-2xl tracking-widest text-black ml-4">
//                             WELCOME500
//                         </span>
//                         <button 
//                             onClick={copyCode}
//                             className="bg-[#C8A253] text-white p-2 rounded hover:bg-[#b08c45] transition flex items-center gap-1 text-sm font-semibold"
//                         >
//                             {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
//                             {copied ? 'COPIED' : 'COPY'}
//                         </button>
//                     </div>

//                     <button 
//                         onClick={onClose}
//                         className="w-full bg-black text-white py-3 rounded uppercase font-bold tracking-widest hover:bg-gray-800 transition shadow-lg active:scale-95"
//                     >
//                         Start Shopping
//                     </button>
                    
//                     <p className="text-xs text-gray-400 mt-4">*Valid on your first order only. T&C Apply.</p>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useState } from 'react';
import { X, Gift, Copy, CheckCircle } from 'lucide-react';

// ⚡ ADDED: couponCode as a prop (default fallback 'WELCOME500' rakha hai)
export default function WelcomeCouponPopup({ isOpen, onClose, couponCode = 'WELCOME500' }) {
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const copyCode = () => {
        // ⚡ UPDATE: Ab dynamic code copy hoga
        navigator.clipboard.writeText(couponCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity">
            {/* Modal Box */}
            <div className="bg-white rounded-2xl shadow-2xl w-11/12 max-w-md overflow-hidden relative animate-bounce-in">
                
                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-black hover:bg-gray-100 p-1 rounded-full transition"
                >
                    <X size={20} />
                </button>

                {/* Top Section - Gold Background */}
                <div className="bg-gradient-to-r from-[#C8A253] to-[#e0c482] p-6 text-center text-white">
                    <div className="bg-white text-[#C8A253] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <Gift size={32} />
                    </div>
                    <h2 className="text-2xl font-serif font-bold tracking-wide">Welcome to TRUEE!</h2>
                    <p className="text-sm mt-1 opacity-90">Here is a special gift for your first purchase.</p>
                </div>

                {/* Bottom Section - Coupon Details */}
                <div className="p-8 text-center bg-gray-50">
                    {/* ⚡ UPDATE: Isko thoda general kiya taaki har coupon pe fit baithe */}
                    <p className="text-gray-600 mb-2 font-medium">Unlock an exclusive discount on your first order!</p>
                    
                    {/* Coupon Code Box */}
                    <div className="border-2 border-dashed border-[#C8A253] bg-yellow-50 p-4 rounded-lg flex items-center justify-between mb-6">
                        <span className="font-bold text-2xl tracking-widest text-black ml-4 uppercase">
                            {/* ⚡ UPDATE: Dynamic Coupon Code Dikhayega */}
                            {couponCode}
                        </span>
                        <button 
                            onClick={copyCode}
                            className="bg-[#C8A253] text-white p-2 rounded hover:bg-[#b08c45] transition flex items-center gap-1 text-sm font-semibold"
                        >
                            {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                            {copied ? 'COPIED' : 'COPY'}
                        </button>
                    </div>

                    <button 
                        onClick={onClose}
                        className="w-full bg-black text-white py-3 rounded uppercase font-bold tracking-widest hover:bg-gray-800 transition shadow-lg active:scale-95"
                    >
                        Start Shopping
                    </button>
                    
                    <p className="text-xs text-gray-400 mt-4">*Valid on your first order only. T&C Apply.</p>
                </div>
            </div>
        </div>
    );
}
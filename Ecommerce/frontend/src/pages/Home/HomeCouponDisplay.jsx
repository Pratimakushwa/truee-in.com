// import React, { useState, useEffect } from 'react';
// import axiosInstance from "../../utils/axiosInstance";
// import { Tag, Copy, Check } from 'lucide-react';

// const HomeCouponDisplay = ({ displayLocation }) => {
//     const [coupons, setCoupons] = useState([]);
//     const [copied, setCopied] = useState(null);

//     useEffect(() => {
//         const fetchCoupons = async () => {
//             try {
//                 const { data } = await axiosInstance.get('/coupons/all');
                
//                 const filtered = (data.coupons || []).filter(c => {
//                     // SMART PLACEMENT CHECK
//                     const placementMatch = (c.placements && c.placements.includes(displayLocation)) || 
//                                            (c.showOn && c.showOn.includes(displayLocation));
                    
//                     // SMART STATUS CHECK
//                     const statusMatch = !c.status || c.status.toLowerCase() === 'active';
                    
//                     // SMART DATE CHECK
//                     let dateMatch = true;
//                     if (c.expiryDate) {
//                         const expDate = new Date(c.expiryDate);
//                         if (!isNaN(expDate.getTime())) {
//                             expDate.setHours(23, 59, 59, 999);
//                             dateMatch = expDate > new Date();
//                         }
//                     }

//                     return placementMatch && statusMatch && dateMatch;
//                 });

//                 setCoupons(filtered);
//             } catch (err) { 
//                 console.error("Coupon load error", err); 
//             }
//         };
//         fetchCoupons();
//     }, [displayLocation]);

//     if (coupons.length === 0) return null;

//     const copyCode = (code) => {
//         navigator.clipboard.writeText(code);
//         setCopied(code);
//         setTimeout(() => setCopied(null), 2000);
//     };

//     // 1. NAYA LAYOUT FOR HOME BANNER (Slim, Horizontal Top Bar)
//     if (displayLocation === 'Home Banner') {
//         return (
//             <div className="bg-black text-white py-2 px-4 w-full border-b border-gray-800 relative z-50">
//                 {coupons.map(c => (
//                     <div key={c._id} className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 max-w-7xl mx-auto">
                        
//                         <div className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] text-gray-300 flex items-center gap-2">
//                             <span className="hidden sm:inline">✨ {c.campaign || c.name || "Exclusive Offer"} :</span>
//                             <span className="text-white font-bold tracking-widest">{c.description || `FLAT ₹${c.discountValue} OFF`}</span>
//                         </div>
                        
//                         <div 
//                             onClick={() => copyCode(c.code)}
//                             className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-700 hover:border-[#C8A253] text-[#C8A253] text-[10px] sm:text-xs font-bold tracking-widest cursor-pointer transition-all rounded-sm"
//                             title="Click to copy"
//                         >
//                             <span>USE CODE: {c.code}</span>
//                             {copied === c.code ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
//                         </div>
                        
//                     </div>
//                 ))}
//             </div>
//         );
//     }

//     // 2. Layout for Today's Offers / Brand Section (Grid Cards) - Ye waisa hi rahega
//     return (
//         <div className="max-w-6xl mx-auto px-4 py-12">
//             <h2 className="text-2xl font-serif font-medium mb-8 text-center tracking-wide">
//                 {displayLocation === "Today's Offers" ? "🔥 Today's Exclusive Offers" : "🏷️ Special Offers"}
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {coupons.map(c => (
//                     <div key={c._id} className="border border-gray-200 p-6 rounded hover:shadow-md transition-all text-center bg-white">
//                         <Tag className="mx-auto mb-3 text-gray-400" size={20} />
//                         <h4 className="font-bold text-lg tracking-wide">{c.campaign || c.name}</h4>
//                         <p className="text-sm text-gray-500 mb-4">{c.description || `Discount Value: ₹${c.discountValue}`}</p>
//                         <button 
//                             onClick={() => copyCode(c.code)}
//                             className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-black hover:text-white py-3 font-bold text-xs uppercase tracking-widest transition-all"
//                         >
//                             {copied === c.code ? <><Check size={16}/> COPIED</> : <><Copy size={16}/> {c.code}</>}
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default HomeCouponDisplay;


// import React, { useState, useEffect } from 'react';
// import axiosInstance from "../../utils/axiosInstance";
// import { Tag, Copy, Check, X } from 'lucide-react';

// const HomeCouponDisplay = ({ displayLocation }) => {
//     const [coupons, setCoupons] = useState([]);
//     const [copied, setCopied] = useState(null);
//     const [isVisible, setIsVisible] = useState(false);

//     useEffect(() => {
//         const fetchCoupons = async () => {
//             try {
//                 const { data } = await axiosInstance.get('/coupons/all');
//                 const filtered = (data.coupons || []).filter(c => {
//                     const placementMatch = (c.placements && c.placements.includes(displayLocation)) || (c.showOn && c.showOn.includes(displayLocation));
//                     return placementMatch && (!c.status || c.status.toLowerCase() === 'active');
//                 });
//                 setCoupons(filtered);
//             } catch (err) { console.error("Coupon load error", err); }
//         };
//         fetchCoupons();
//     }, [displayLocation]);

//     // ⚡ LOOP LOGIC: 5 sec visible, 2 sec hidden
//     useEffect(() => {
//         if (coupons.length === 0) return;

//         const interval = setInterval(() => {
//             setIsVisible(prev => !prev);
//         }, 7000); // Total cycle time (5s show + 2s hide)

//         // Initial delay before first show
//         const timeout = setTimeout(() => setIsVisible(true), 2000);

//         return () => {
//             clearInterval(interval);
//             clearTimeout(timeout);
//         };
//     }, [coupons.length]);

//     const copyCode = (code) => {
//         navigator.clipboard.writeText(code);
//         setCopied(code);
//         setTimeout(() => setCopied(null), 2000);
//     };

//     if (coupons.length === 0) return null;

//     return (
//         <div 
//             className={`fixed bottom-8 right-8 z-[9999] transition-all duration-700 ease-in-out transform
//             ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
//         >
//             {coupons.slice(0, 1).map(c => (
//                 <div key={c._id} className="w-[300px] bg-white border border-gray-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] p-5 rounded-2xl relative">
                    
//                     {/* Header */}
//                     <div className="flex items-center gap-3 mb-4">
//                         <div className="bg-[#FCFAEF] p-2.5 rounded-full border border-[#C8A253]/20">
//                             <Tag size={16} className="text-[#C8A253]" />
//                         </div>
//                         <div className="flex-1">
//                             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">
//                                 {c.campaign || "Limited Offer"}
//                             </h4>
//                             <p className="text-[9px] text-gray-500 font-medium">Use code at checkout</p>
//                         </div>
//                     </div>

//                     {/* Code Section */}
//                     <div 
//                         onClick={() => copyCode(c.code)}
//                         className="group w-full flex items-center justify-between px-4 py-3 bg-[#111] text-white cursor-pointer hover:bg-[#C8A253] transition-all duration-300"
//                     >
//                         <span className="font-bold text-xs tracking-[0.2em] uppercase">
//                             {c.code}
//                         </span>
//                         {copied === c.code ? (
//                             <Check size={14} className="text-white" />
//                         ) : (
//                             <Copy size={14} className="text-white opacity-60 group-hover:opacity-100" />
//                         )}
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default HomeCouponDisplay;

import React, { useState, useEffect } from 'react';
import axiosInstance from "../../utils/axiosInstance";
import { Tag, Copy, Check, X } from 'lucide-react';

const HomeCouponDisplay = ({ displayLocation }) => {
    const [coupons, setCoupons] = useState([]);
    const [copied, setCopied] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isClosed, setIsClosed] = useState(false); // ⚡ Naya state close handle karne ke liye

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const { data } = await axiosInstance.get('/coupons/all');
                const filtered = (data.coupons || []).filter(c => {
                    const placementMatch = (c.placements && c.placements.includes(displayLocation)) || (c.showOn && c.showOn.includes(displayLocation));
                    return placementMatch && (!c.status || c.status.toLowerCase() === 'active');
                });
                setCoupons(filtered);
            } catch (err) { console.error("Coupon load error", err); }
        };
        fetchCoupons();
    }, [displayLocation]);

    // ⚡ LOOP LOGIC: 5 sec visible, 2 sec hidden (BINA KISI CHANGE KE)
    useEffect(() => {
        if (coupons.length === 0) return;

        const interval = setInterval(() => {
            setIsVisible(prev => !prev);
        }, 7000); // Total cycle time (5s show + 2s hide)

        // Initial delay before first show
        const timeout = setTimeout(() => setIsVisible(true), 2000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [coupons.length]);

    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
        setCopied(code);
        setTimeout(() => setCopied(null), 2000);
    };

    // ⚡ Agar user ne close kar diya ya coupons nahi hain, toh kuch mat dikhao
    if (coupons.length === 0 || isClosed) return null;

    return (
        <div 
            className={`fixed bottom-8 right-8 z-[9999] transition-all duration-700 ease-in-out transform
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        >
            {coupons.slice(0, 1).map(c => (
                <div key={c._id} className="w-[300px] bg-white border border-gray-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)] p-5 rounded-2xl relative">
                    
                    {/* ⚡ CLOSE BUTTON ADDED HERE */}
                    <button 
                        onClick={() => setIsClosed(true)}
                        className="absolute top-3 right-3 p-1 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-100 cursor-pointer"
                        aria-label="Close"
                    >
                        <X size={14} />
                    </button>

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-[#FCFAEF] p-2.5 rounded-full border border-[#C8A253]/20">
                            <Tag size={16} className="text-[#C8A253]" />
                        </div>
                        <div className="flex-1 pr-4"> {/* Added pr-4 to prevent text from overlapping the close button */}
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-black line-clamp-1">
                                {c.campaign || "Limited Offer"}
                            </h4>
                            <p className="text-[9px] text-gray-500 font-medium">Use code at checkout</p>
                        </div>
                    </div>

                    {/* Code Section */}
                    <div 
                        onClick={() => copyCode(c.code)}
                        className="group w-full flex items-center justify-between px-4 py-3 bg-[#111] text-white cursor-pointer hover:bg-[#C8A253] transition-all duration-300"
                    >
                        <span className="font-bold text-xs tracking-[0.2em] uppercase">
                            {c.code}
                        </span>
                        {copied === c.code ? (
                            <Check size={14} className="text-white" />
                        ) : (
                            <Copy size={14} className="text-white opacity-60 group-hover:opacity-100" />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomeCouponDisplay;
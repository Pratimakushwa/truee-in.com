import React, { useState, useEffect } from 'react';
import axiosInstance from "../../utils/axiosInstance";
import { Tag, Copy, Check } from 'lucide-react';

const HomeCouponDisplay = ({ displayLocation }) => {
    const [coupons, setCoupons] = useState([]);
    const [copied, setCopied] = useState(null);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const { data } = await axiosInstance.get('/coupons/all');
                
                const filtered = (data.coupons || []).filter(c => {
                    // SMART PLACEMENT CHECK
                    const placementMatch = (c.placements && c.placements.includes(displayLocation)) || 
                                           (c.showOn && c.showOn.includes(displayLocation));
                    
                    // SMART STATUS CHECK
                    const statusMatch = !c.status || c.status.toLowerCase() === 'active';
                    
                    // SMART DATE CHECK
                    let dateMatch = true;
                    if (c.expiryDate) {
                        const expDate = new Date(c.expiryDate);
                        if (!isNaN(expDate.getTime())) {
                            expDate.setHours(23, 59, 59, 999);
                            dateMatch = expDate > new Date();
                        }
                    }

                    return placementMatch && statusMatch && dateMatch;
                });

                setCoupons(filtered);
            } catch (err) { 
                console.error("Coupon load error", err); 
            }
        };
        fetchCoupons();
    }, [displayLocation]);

    if (coupons.length === 0) return null;

    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
        setCopied(code);
        setTimeout(() => setCopied(null), 2000);
    };

    // 1. NAYA LAYOUT FOR HOME BANNER (Slim, Horizontal Top Bar)
    if (displayLocation === 'Home Banner') {
        return (
            <div className="bg-black text-white py-2 px-4 w-full border-b border-gray-800 relative z-50">
                {coupons.map(c => (
                    <div key={c._id} className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 max-w-7xl mx-auto">
                        
                        <div className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] text-gray-300 flex items-center gap-2">
                            <span className="hidden sm:inline">✨ {c.campaign || c.name || "Exclusive Offer"} :</span>
                            <span className="text-white font-bold tracking-widest">{c.description || `FLAT ₹${c.discountValue} OFF`}</span>
                        </div>
                        
                        <div 
                            onClick={() => copyCode(c.code)}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-700 hover:border-[#C8A253] text-[#C8A253] text-[10px] sm:text-xs font-bold tracking-widest cursor-pointer transition-all rounded-sm"
                            title="Click to copy"
                        >
                            <span>USE CODE: {c.code}</span>
                            {copied === c.code ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                        </div>
                        
                    </div>
                ))}
            </div>
        );
    }

    // 2. Layout for Today's Offers / Brand Section (Grid Cards) - Ye waisa hi rahega
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-serif font-medium mb-8 text-center tracking-wide">
                {displayLocation === "Today's Offers" ? "🔥 Today's Exclusive Offers" : "🏷️ Special Offers"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {coupons.map(c => (
                    <div key={c._id} className="border border-gray-200 p-6 rounded hover:shadow-md transition-all text-center bg-white">
                        <Tag className="mx-auto mb-3 text-gray-400" size={20} />
                        <h4 className="font-bold text-lg tracking-wide">{c.campaign || c.name}</h4>
                        <p className="text-sm text-gray-500 mb-4">{c.description || `Discount Value: ₹${c.discountValue}`}</p>
                        <button 
                            onClick={() => copyCode(c.code)}
                            className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-black hover:text-white py-3 font-bold text-xs uppercase tracking-widest transition-all"
                        >
                            {copied === c.code ? <><Check size={16}/> COPIED</> : <><Copy size={16}/> {c.code}</>}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeCouponDisplay;
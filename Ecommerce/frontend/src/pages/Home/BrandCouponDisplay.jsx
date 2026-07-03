import React, { useState, useEffect } from 'react';
import axiosInstance from "../../utils/axiosInstance";
import { Copy, Check } from 'lucide-react';

const BrandCouponDisplay = () => {
    const [brandCoupons, setBrandCoupons] = useState([]);
    const [copied, setCopied] = useState(null);

    useEffect(() => {
        const fetchBrandCoupons = async () => {
            try {
                const { data } = await axiosInstance.get('/coupons/all');
                const now = new Date();
                
                const filtered = (data.coupons || []).filter(c => {
                    const statusMatch = !c.status || c.status.toLowerCase() === 'active';
                    const expDate = new Date(c.expiryDate);
                    const dateMatch = !isNaN(expDate.getTime()) && expDate > now;
                    const isBrandCoupon = c.applicableBrand && c.applicableBrand !== 'All';

                    return statusMatch && dateMatch && isBrandCoupon;
                });

                setBrandCoupons(filtered);
            } catch (err) { console.error("Brand coupons load error", err); }
        };
        fetchBrandCoupons();
    }, []);

    if (brandCoupons.length === 0) return null;

    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
        setCopied(code);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="w-full bg-zinc-950 py-4 border-b border-zinc-800">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center gap-6 overflow-x-auto custom-scrollbar">
                    <span className="text-[#C8A253] font-serif font-bold text-sm whitespace-nowrap uppercase tracking-widest hidden md:block">
                        Brand Specials:
                    </span>
                    
                    {brandCoupons.map(c => (
                        <div key={c._id} className="flex items-center gap-4 bg-zinc-900 px-4 py-2 rounded-sm border border-zinc-800 flex-shrink-0">
                            {/* Brand Badge */}
                            <span className="text-[9px] font-bold uppercase bg-white text-black px-2 py-0.5 rounded-sm">
                                {c.applicableBrand}
                            </span>
                            
                            {/* Offer Text */}
                            <span className="text-white text-xs font-medium tracking-wide">
                                {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                            </span>

                            {/* Copy Code */}
                            <div 
                                onClick={() => copyCode(c.code)}
                                className="flex items-center gap-2 cursor-pointer text-[#C8A253] text-[10px] font-bold hover:text-white transition-colors"
                            >
                                <span className="border-b border-dotted border-[#C8A253]">{c.code}</span>
                                {copied === c.code ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandCouponDisplay;
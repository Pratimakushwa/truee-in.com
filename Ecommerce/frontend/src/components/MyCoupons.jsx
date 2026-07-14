// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../utils/axiosInstance'; 
// import { Tag, CheckCircle2 } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// export default function MyCoupons() {
//     const [coupons, setCoupons] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchCoupons = async () => {
//             try {
//                 // Backend se user profile la rahe hain jisme coupons array hai
//                 const { data } = await axiosInstance.get('/auth/profile');
//                 if (data?.user?.coupons) {
//                     setCoupons(data.user.coupons);
//                 }
//             } catch (err) {
//                 console.error("Failed to load coupons", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchCoupons();
//     }, []);

//     if (loading) {
//         return (
//             <div className="w-full p-10 text-center font-serif text-lg animate-pulse text-gray-500">
//                 Loading your exclusive rewards...
//             </div>
//         );
//     }

//     return (
//         <div className="w-full animate-fade-in-up">
// <h2 className="text-2xl font-serif font-bold mb-6 text-black tracking-wide border-b pb-4 pt-4 leading-normal">                My Coupons
//             </h2>
            
//             {coupons.length === 0 ? (
//                 <div className="text-center py-16 bg-gray-50 border border-gray-200 rounded">
//                     <Tag className="mx-auto text-gray-300 mb-4" size={40} />
//                     <p className="text-gray-500 text-sm font-medium tracking-widest uppercase">
//                         No coupons available right now.
//                     </p>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                     {coupons.map((coupon, index) => (
//                         <div 
//                             key={index} 
//                             className={`border p-6 rounded relative overflow-hidden transition-all duration-300 ${
//                                 coupon.status === 'Used' 
//                                 ? 'bg-gray-50 border-gray-200 opacity-70 grayscale' 
//                                 : 'bg-white border-[#C8A253] shadow-sm hover:shadow-md'
//                             }`}
//                         >
//                             {coupon.status === 'Used' && (
//                                 <div className="absolute top-4 right-4 flex items-center gap-1 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
//                                     <CheckCircle2 size={14} /> Used
//                                 </div>
//                             )}
                            
//                             <div className="flex items-start gap-4 mb-4">
//                                 <Tag className={coupon.status === 'Used' ? 'text-gray-400' : 'text-[#C8A253]'} size={24} />
//                                 <div>
//                                     <h4 className={`font-bold text-xl tracking-widest uppercase ${coupon.status === 'Used' ? 'text-gray-500 line-through' : 'text-black'}`}>
//                                         {coupon.code}
//                                     </h4>
//                                     <span className={`inline-block px-2 py-1 text-[10px] font-bold uppercase mt-2 rounded tracking-wider ${
//                                         coupon.status === 'Available' ? 'bg-[#FCFAEF] text-[#C8A253] border border-[#C8A253]/30' : 'bg-gray-200 text-gray-600'
//                                     }`}>
//                                         Status: {coupon.status}
//                                     </span>
//                                 </div>
//                             </div>

//                             <p className="text-xs text-gray-500 mb-5 leading-relaxed">
//                                 Valid on your first purchase. Minimum order value ₹3000 required.
//                             </p>
                            
//                             {coupon.status === 'Available' && (
//                                 <button 
//                                     onClick={() => navigate('/shop')}
//                                     className="w-full bg-black text-white py-2.5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C8A253] transition-colors duration-300"
//                                 >
//                                     Shop Now
//                                 </button>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance'; 
import { Tag, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MyCoupons() {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const { data } = await axiosInstance.get('/auth/profile');
                if (data?.user?.coupons) {
                    setCoupons(data.user.coupons);
                }
            } catch (err) {
                console.error("Failed to load coupons", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCoupons();
    }, []);

    if (loading) {
        return (
            <div className="p-8 text-center text-sm text-gray-500 animate-pulse h-full flex items-center justify-center">
                Loading your exclusive rewards...
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 h-full text-black animate-fade-in-up">
            {/* ⚡ HEADER (UserDetails ke sath match kiya) */}
            <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-serif text-black">
                    My Coupons
                </h2>
            </div>
            
            {coupons.length === 0 ? (
                /* ⚡ EMPTY STATE: Thoda soft aur premium banaya */
                <div className="text-center py-20 bg-gray-50/50 border border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center">
                    <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                        <Tag className="text-gray-300" size={32} />
                    </div>
                    <p className="text-gray-400 text-[11px] font-bold tracking-[0.2em] uppercase">
                        No coupons available right now
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {coupons.map((coupon, index) => (
                        <div 
                            key={index} 
                            className={`p-6 rounded-xl border relative overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                                coupon.status === 'Used' 
                                ? 'bg-gray-50/80 border-gray-100 opacity-75' 
                                : 'bg-white border-[#C8A253]/30 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:border-[#C8A253]/60'
                            }`}
                        >
                            {/* USED BADGE */}
                            {coupon.status === 'Used' && (
                                <div className="absolute top-5 right-5 flex items-center gap-1.5 text-gray-400 text-[10px] font-bold uppercase tracking-widest bg-white px-2.5 py-1 rounded-md shadow-sm border border-gray-100">
                                    <CheckCircle2 size={12} /> Used
                                </div>
                            )}
                            
                            <div>
                                <div className="flex items-start gap-4 mb-3">
                                    <div className={`p-2.5 rounded-lg ${coupon.status === 'Used' ? 'bg-gray-100' : 'bg-[#FCFAEF]'}`}>
                                        <Tag className={coupon.status === 'Used' ? 'text-gray-400' : 'text-[#C8A253]'} size={20} />
                                    </div>
                                    <div>
                                        <h4 className={`font-bold text-xl tracking-widest uppercase ${coupon.status === 'Used' ? 'text-gray-400 line-through' : 'text-black'}`}>
                                            {coupon.code}
                                        </h4>
                                        <span className={`inline-block px-2.5 py-1 text-[9px] font-bold uppercase mt-1.5 rounded-full tracking-widest ${
                                            coupon.status === 'Available' ? 'bg-[#FCFAEF] text-[#C8A253] border border-[#C8A253]/20' : 'bg-gray-200 text-gray-500'
                                        }`}>
                                            Status: {coupon.status}
                                        </span>
                                    </div>
                                </div>

                                <p className={`text-xs mt-4 mb-6 leading-relaxed ${coupon.status === 'Used' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Valid on your first purchase. Minimum order value ₹3000 required.
                                </p>
                            </div>
                            
                            {/* SHOP NOW BUTTON */}
                            {coupon.status === 'Available' && (
                                <button 
                                    onClick={() => navigate('/shop')}
                                    className="w-full bg-black text-white py-3.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#C8A253] transition-colors duration-300 mt-auto"
                                >
                                    Shop Now
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
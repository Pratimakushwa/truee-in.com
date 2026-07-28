// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import api from '../utils/axiosInstance'; // Apna path check kar lena

// export default function Wishlist() {
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Database se wishlist ka data laane ke liye
//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         const { data } = await api.get('/wishlist'); // Ye tumhare backend pe request bhejega
//         if (data.success) {
//           setWishlist(data.wishlist);
//         }
//       } catch (error) {
//         console.error("Wishlist fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWishlist();
//   }, []);

//   // Product ko wishlist se hatane ke liye
//   const handleRemove = async (productId) => {
//     try {
//       // Screen se turant hatane ke liye (Smooth UI)
//       setWishlist((prev) => prev.filter((item) => item._id !== productId));
      
//       // Backend mein update karne ke liye
//       await api.post('/wishlist/toggle', { productId });
//     } catch (error) {
//       console.error("Remove error:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
//         <div className="w-8 h-8 border-2 border-[#C8A253] border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-20 px-6 md:px-12">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Luxury Header */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-2 block">
//             Curated Collection
//           </span>
//           <h1 className="text-4xl md:text-5xl font-serif text-black">Your Wishlist</h1>
//         </motion.div>

//         {/* Agar Wishlist khali hai */}
//         {wishlist.length === 0 ? (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="flex flex-col items-center justify-center py-20"
//           >
//             <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-gray-300">
//               <ShoppingBag size={40} strokeWidth={1} />
//             </div>
//             <p className="text-gray-500 text-sm mb-8 text-center max-w-md">
//               You haven't saved any items yet. Explore our premium collection and curate your personal luxury space.
//             </p>
//             <Link to="/shop" className="group flex items-center gap-2 border-b border-black pb-1 text-sm font-semibold hover:text-[#C8A253] hover:border-[#C8A253] transition-colors">
//               Continue Shopping 
//               <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </motion.div>
//         ) : (
          
//           /* Wishlist ke Products ka Grid */
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
//             {wishlist.map((product, index) => (
//               <motion.div 
//                 key={product._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="group relative flex flex-col"
//               >
//                 {/* Product Image */}
//                 <div className="relative aspect-square bg-white rounded-2xl overflow-hidden mb-4 p-6 hover:shadow-xl transition-shadow duration-500 border border-gray-100">
//                   <img 
//                     src={product.images?.[0]?.url || '/placeholder.png'} 
//                     alt={product.name} 
//                     className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
//                   />
                  
//                   {/* Delete Button */}
//                   <button 
//                     onClick={() => handleRemove(product._id)}
//                     className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 hover:bg-white shadow-sm transition-all duration-300 z-10"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </div>

//                 {/* Product Details */}
//                 <div className="flex flex-col text-center px-2">
//                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
//                     {product.brand || 'Truee'}
//                   </span>
//                   <Link to={`/product/${product._id}`} className="text-sm font-semibold text-black hover:text-[#C8A253] transition-colors mb-2 line-clamp-1">
//                     {product.name}
//                   </Link>
//                   <span className="text-sm font-bold text-black">
//                     ₹{product.price?.toLocaleString('en-IN')}
//                   </span>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowRight, X, Heart, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/axiosInstance';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await api.get('/wishlist');
        if (data.success) {
          setWishlist(data.wishlist);
        }
      } catch (error) {
        console.error("Wishlist fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try {
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
      await api.post('/wishlist/toggle', { productId });
    } catch (error) {
      console.error("Remove error:", error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const { data } = await api.post('/cart/add', { productId, quantity: 1 });
      if (data.success) {
        window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { increase: 1 } }));
      }
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD]">
        <div className="w-10 h-10 border-[3px] border-[#C8A253] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-6 pb-24 px-4 sm:px-6 lg:px-12 selection:bg-[#C8A253] selection:text-white">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Navigation & Header Section */}
        <div className="flex flex-col mb-8 md:mb-10">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors w-max mb-6 md:mb-8"
          >
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-black transition-colors">
              <X size={14} className="md:w-4 md:h-4" strokeWidth={2} />
            </div>
            Back to Shop
          </button>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-5 md:pb-6 gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Heart size={12} className="md:w-3.5 md:h-3.5 text-[#C8A253] fill-[#C8A253]" />
                <span className="text-[9px] md:text-[10px] font-black tracking-[0.3em] text-[#C8A253] uppercase">
                  Curated Collection
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-serif text-[#111] tracking-tight">
                Your <span className="text-[#C8A253] italic">Wishlist</span>
              </h1>
            </div>
            <div className="text-[9px] md:text-[11px] font-bold text-gray-500 uppercase tracking-widest pb-2 bg-gray-100 px-3 py-1.5 md:px-4 md:py-2 rounded-full w-max">
              {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'} Saved
            </div>
          </motion.div>
        </div>

        {wishlist.length === 0 ? (
          /* VIP Empty State */
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-16 md:py-24 px-4 bg-white rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)]"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 md:mb-6 text-[#C8A253] border border-gray-100">
              <Heart size={28} className="md:w-8 md:h-8" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl md:text-2xl font-serif text-[#111] mb-2 md:mb-3">Nothing Saved Yet</h2>
            <p className="text-gray-500 text-xs md:text-sm mb-6 md:mb-8 text-center max-w-sm leading-relaxed px-4">
              Your curated collection is currently empty. Explore our premium range and save your favorite pieces here.
            </p>
            <Link 
              to="/shop" 
              className="group flex items-center gap-2 md:gap-3 bg-[#111] text-white px-6 py-3 md:px-8 md:py-3.5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-widest hover:bg-[#C8A253] transition-all duration-300 shadow-xl active:scale-95"
            >
              Discover Collection
              <ArrowRight size={14} className="md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        ) : (
          /* STRUCTURED LUXURY GRID CARDS - 2 CARDS PER ROW ON MOBILE (grid-cols-2) */
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
            {wishlist.map((product, index) => (
              <motion.div 
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                className="group flex flex-col bg-white border border-gray-200 hover:border-[#C8A253]/50 rounded-xl overflow-hidden shadow-sm hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-500"
              >
                {/* Image Section */}
                <div className="relative aspect-[5/4] md:aspect-[4/3] bg-[#F9F9F9] flex items-center justify-center overflow-hidden border-b border-gray-100">
                  <img 
                    src={product.images?.[0]?.url || '/placeholder.png'} 
                    alt={product.name} 
                    className="max-w-[70%] max-h-[70%] md:max-w-[65%] md:max-h-[65%] object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Remove Button - Adjusted size for mobile */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemove(product._id);
                    }}
                    className="absolute top-2 right-2 md:top-3 md:right-3 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-white shadow-md border border-gray-100 rounded-full text-gray-400 hover:text-red-500 hover:border-red-100 transition-all duration-300 z-10"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={12} className="md:w-[14px] md:h-[14px]" strokeWidth={2} />
                  </button>

                  <Link to={`/product/${product._id}`} className="absolute inset-0 z-0" />
                </div>

                {/* Details Section - Adjusted padding and text size for mobile */}
                <div className="p-3 md:p-4 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    <span className="text-[8px] md:text-[9px] font-black text-[#C8A253] uppercase tracking-[0.25em] mb-1 block line-clamp-1">
                      {product.brand || 'Truee Luxury'}
                    </span>
                    <Link 
                      to={`/product/${product._id}`} 
                      className="text-[12px] md:text-[15px] font-semibold text-[#111] hover:text-[#C8A253] transition-colors mb-1.5 md:mb-2 line-clamp-2 md:line-clamp-1 leading-snug block"
                    >
                      {product.name}
                    </Link>
                  </div>
                  
                  {/* Price & Action Button Area - Stacked on very small screens, side-by-side mostly */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 md:gap-0 mt-1 md:mt-2 pt-2 md:pt-3 border-t border-gray-50">
                    <span className="text-[12px] md:text-[14px] font-extrabold text-[#111]">
                      ₹{product.price?.toLocaleString('en-IN')}
                    </span>
                    <button 
                      onClick={() => handleAddToCart(product._id)}
                      className="flex items-center justify-center gap-1.5 md:gap-2 bg-[#111] text-white px-2.5 py-1.5 md:px-3 md:py-2 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-widest hover:bg-[#C8A253] transition-colors active:scale-95 w-full sm:w-auto"
                    >
                      <ShoppingCart size={10} className="md:w-3 md:h-3" />
                      Add<span className="hidden sm:inline">&nbsp;to Bag</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
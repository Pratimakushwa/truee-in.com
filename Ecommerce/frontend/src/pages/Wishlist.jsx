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
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../utils/axiosInstance';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="w-8 h-8 border-2 border-[#C8A253] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-2 block">
            Curated Collection
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-black">Your Wishlist</h1>
        </motion.div>

        {wishlist.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16"
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-gray-300">
              <ShoppingBag size={32} strokeWidth={1} />
            </div>
            <p className="text-gray-500 text-sm mb-6 text-center max-w-xs">
              Your wishlist is empty. Let's find something you love.
            </p>
            <Link to="/shop" className="flex items-center gap-2 border-b border-black pb-1 text-xs font-semibold hover:text-[#C8A253] hover:border-[#C8A253] transition-colors uppercase tracking-widest">
              Continue Shopping 
              <ArrowRight size={12} />
            </Link>
          </motion.div>
        ) : (
          /* ⚡ REFINED GRID FOR ALL SCREENS ⚡ */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {wishlist.map((product, index) => (
              <motion.div 
                key={product._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/5] bg-white rounded-xl sm:rounded-2xl overflow-hidden mb-3 p-3 sm:p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                  <img 
                    src={product.images?.[0]?.url || '/placeholder.png'} 
                    alt={product.name} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <button 
                    onClick={() => handleRemove(product._id)}
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-white/90 backdrop-blur rounded-full text-gray-400 hover:text-red-500 shadow-sm transition-all z-10"
                  >
                    <Trash2 size={14} sm={16} />
                  </button>
                </div>

                <div className="flex flex-col text-center px-1">
                  <span className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                    {product.brand || 'Truee'}
                  </span>
                  <Link to={`/product/${product._id}`} className="text-[11px] sm:text-sm font-semibold text-black hover:text-[#C8A253] transition-colors mb-1 line-clamp-1">
                    {product.name}
                  </Link>
                  <span className="text-[11px] sm:text-sm font-bold text-black">
                    ₹{product.price?.toLocaleString('en-IN')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
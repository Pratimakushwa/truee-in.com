// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const RecentlyViewed = () => {
//   const [recentProducts, setRecentProducts] = useState([]);

//   useEffect(() => {
//     // LocalStorage se history fetch karo
//     try {
//       const items = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
//       setRecentProducts(items);
//     } catch (error) {
//       console.error("Error loading history:", error);
//     }
//   }, []);

//   // Agar history khali hai (user ne abhi tak kuch nahi dekha), toh ye section hide rahega
//   if (recentProducts.length === 0) {
//     return null;
//   }

//   return (
//     <section className="bg-white py-10 border-t-[8px] border-b-[8px] border-[#f3f3f3]">
//       <div className="max-w-[1480px] mx-auto px-4 sm:px-6 md:px-8">

//         {/* Amazon-Style Header */}
//         <div className="flex items-baseline gap-4 mb-4">
//           <h2 className="text-[20px] md:text-[24px] font-bold text-[#0F1111]">
//             Related to items you've viewed
//           </h2>
//           <Link
//             to="/products"
//             className="text-[#007185] hover:text-[#C7511F] hover:underline text-[14px] font-medium transition-colors"
//           >
//             See more
//           </Link>
//         </div>

//         {/* Horizontal Scrollable Container (Scrollbar Hidden) */}
//         <div
//           className="flex gap-4 md:gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory"
//           style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//         >
//           {/* Webkit scrollbar hide karne ke liye inline style hack ya tailwind-scrollbar-hide use hota hai */}
//           <style>{`
//             div::-webkit-scrollbar {
//               display: none;
//             }
//           `}</style>

//           {recentProducts.map((product) => (
//             <Link
//               to={`/product/${product._id}`}
//               key={product._id}
//               className="group min-w-[160px] max-w-[160px] md:min-w-[220px] md:max-w-[220px] flex-shrink-0 cursor-pointer snap-start"
//             >
//               {/* Premium Image Container */}
//               <div className="bg-[#f8f8f8] aspect-square rounded-lg p-4 mb-3 flex items-center justify-center transition-all duration-300 group-hover:bg-[#f0f0f0] relative overflow-hidden">
//                 <img
//                   src={product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600"}
//                   alt={product.name}
//                   className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-110"
//                 />
//               </div>

//               {/* Minimal Product Info */}
//               <div className="px-1">
//                 <h3 className="text-[13px] md:text-[14px] text-[#0F1111] line-clamp-2 leading-snug mb-1 group-hover:text-[#C7511F] transition-colors">
//                   {product.name}
//                 </h3>
//                 {product.price && (
//                   <p className="text-[16px] md:text-[18px] font-medium text-[#0F1111]">
//                     <span className="text-[11px] align-top mr-[2px] font-normal">₹</span>
//                     {product.price.toLocaleString()}
//                   </p>
//                 )}
//               </div>
//             </Link>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default RecentlyViewed;
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Heart,
  ArrowRight,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import Toast from "../../components/Toast";
import QuickModel from "../Product/ProductDetailModel"; // ⚡ Import Added

const RecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState([]);
  const [wishlistedItems, setWishlistedItems] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null); // ⚡ QuickView State
  const sliderRef = useRef(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
      setRecentProducts(items);
    } catch (error) {
      console.error("Error loading history:", error);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const fetchWishlist = async () => {
        try {
          const { data } = await axiosInstance.get("/wishlist");
          if (data.success && data.wishlist) {
            const ids = data.wishlist.map((item) => item._id || item);
            setWishlistedItems(ids);
          }
        } catch (error) {
          console.error("Error fetching wishlist", error);
        }
      };
      fetchWishlist();
    } else {
      setWishlistedItems([]);
    }
  }, [user]);

  if (recentProducts.length === 0) return null;

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const { data } = await axiosInstance.post("/cart/add", { productId, quantity: 1 });
      if (data.success) {
        window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { increase: 1 } }));
        setToastMessage({ type: "success", message: "Added to cart successfully!" });
      }
    } catch (err) {
      setToastMessage({ type: "error", message: err.response?.data?.message || "Failed to add to cart" });
    }
  };

  const handleWishlist = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { navigate("/login"); return; }
    const isCurrentlyWishlisted = wishlistedItems.includes(productId);
    if (isCurrentlyWishlisted) {
      setWishlistedItems((prev) => prev.filter((id) => id !== productId));
    } else {
      setWishlistedItems((prev) => [...prev, productId]);
    }
    try {
      await axiosInstance.post("/wishlist/toggle", { productId });
      setToastMessage({ type: "success", message: isCurrentlyWishlisted ? "Removed from wishlist" : "Added to wishlist!" });
    } catch (err) {
      if (isCurrentlyWishlisted) {
        setWishlistedItems((prev) => [...prev, productId]);
      } else {
        setWishlistedItems((prev) => prev.filter((id) => id !== productId));
      }
      setToastMessage({ type: "error", message: "Failed to update wishlist" });
    }
  };

  return (
    <section className="bg-white py-8 font-sans">
      {toastMessage && <Toast type={toastMessage.type} message={toastMessage.message} onClose={() => setToastMessage(null)} />}

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A253] mb-2 flex items-center gap-2">You May Also Like</span>
            <h2 className="text-xl sm:text-2xl md:text-[32px] font-serif font-bold text-[#111] mb-2">Related to items you've viewed</h2>
            <div className="w-20 h-[2px] bg-[#C8A253] mb-2"></div>
          </div>
        </div>

        <div className="relative group mb-2">
          <button onClick={() => scroll("left")} className="absolute -left-1.5 sm:-left-5 top-[38%] -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:text-[#C8A253] cursor-pointer">
            <ChevronLeft size={18} />
          </button>

          <div ref={sliderRef} className="flex gap-3.5 sm:gap-4 md:gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth hide-scrollbar px-1">
            {recentProducts.map((product) => {
              const isWishlisted = wishlistedItems.includes(product._id);
              return (
                <div
                  key={product._id}
                  onClick={() => setQuickViewProduct(product)} // ⚡ Click Opens Modal
                  className="group/card min-w-[168px] max-w-[168px] xs:min-w-[190px] xs:max-w-[190px] sm:min-w-[220px] sm:max-w-[220px] flex-shrink-0 snap-start bg-white rounded-2xl border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:border-[#C8A253]/25 hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition-all duration-300 ease-out flex flex-col relative overflow-hidden cursor-pointer"
                >
                  <div className="relative bg-gradient-to-b from-[#FAFAFA] to-white aspect-square p-4 sm:p-5 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image || "https://placehold.co/400x400/f5f5f5/cccccc?text=No+Image"}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover/card:scale-105"
                    />
                  </div>

                  <div className="flex flex-col flex-1 p-3 sm:p-4">
                    <h3 className="text-[12px] sm:text-[13px] font-medium text-gray-900 line-clamp-2 leading-snug mb-2 min-h-[2.2rem] group-hover/card:text-[#8B6914] transition-colors">
                      {product.name}
                    </h3>

                    <div className="mt-auto flex items-center justify-between gap-2">
                      {product.price && <p className="text-[14px] sm:text-[16px] font-bold text-gray-900 tracking-tight">₹{product.price.toLocaleString("en-IN")}</p>}
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button onClick={(e) => handleAddToCart(e, product._id)} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all"><ShoppingBag size={14} /></button>
                        <button onClick={(e) => handleWishlist(e, product._id)} className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center transition-all ${isWishlisted ? "border-red-500 bg-red-50 text-red-500" : "border-gray-200 text-gray-500"}`}><Heart size={14} className={isWishlisted ? "fill-red-500" : ""} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button onClick={() => scroll("right")} className="absolute -right-1.5 sm:-right-5 top-[38%] -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:text-[#C8A253] cursor-pointer">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* ⚡ QuickView Modal Rendered */}
      {quickViewProduct && (
        <QuickModel
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          product={quickViewProduct}
        />
      )}
    </section>
  );
};

export default RecentlyViewed;
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
  Truck,
  ShieldCheck,
  RefreshCcw,
  Headphones,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import Toast from "../../components/Toast";

const RecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState([]);
  const [wishlistedItems, setWishlistedItems] = useState([]); // ⚡ NAYI STATE: Heart icon ka color track karne ke liye
  const [toastMessage, setToastMessage] = useState(null);
  const sliderRef = useRef(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  // 1. Fetch Recently Viewed from LocalStorage
  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
      setRecentProducts(items);
    } catch (error) {
      console.error("Error loading history:", error);
    }
  }, []);

  // ⚡ 2. NAYA EFFECT: Jab user login ho, uski wishlist database se fetch kar lo
  useEffect(() => {
    if (user) {
      const fetchWishlist = async () => {
        try {
          const { data } = await axiosInstance.get("/wishlist");
          if (data.success && data.wishlist) {
            // Un sabhi products ki IDs nikal lo jo user ne wishlist kiye hain
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

  if (recentProducts.length === 0) {
    return null;
  }

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // ⚡ ADD TO CART FUNCTIONALITY
  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const { data } = await axiosInstance.post("/cart/add", {
        productId: productId,
        quantity: 1,
      });

      if (data.success) {
        window.dispatchEvent(
          new CustomEvent("cartUpdated", { detail: { increase: 1 } }),
        );
        setToastMessage({
          type: "success",
          message: "Added to cart successfully!",
        });
      }
    } catch (err) {
      setToastMessage({
        type: "error",
        message: err.response?.data?.message || "Failed to add to cart",
      });
    }
  };

  // ⚡ WISHLIST FUNCTIONALITY (Now With Instant UI Update)
  const handleWishlist = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }

    // ⚡ OPTIMISTIC UI UPDATE: Button dabaate hi dil laal/safed ho jayega
    const isCurrentlyWishlisted = wishlistedItems.includes(productId);
    if (isCurrentlyWishlisted) {
      setWishlistedItems((prev) => prev.filter((id) => id !== productId));
    } else {
      setWishlistedItems((prev) => [...prev, productId]);
    }

    try {
      const { data } = await axiosInstance.post("/wishlist/toggle", {
        productId,
      });
      if (data.success) {
        setToastMessage({
          type: "success",
          message: isCurrentlyWishlisted
            ? "Removed from wishlist"
            : "Added to wishlist!",
        });
      }
    } catch (err) {
      // ⚡ Agar error aayi toh wapas purani color state me kar do
      if (isCurrentlyWishlisted) {
        setWishlistedItems((prev) => [...prev, productId]);
      } else {
        setWishlistedItems((prev) => prev.filter((id) => id !== productId));
      }
      setToastMessage({ type: "error", message: "Failed to update wishlist" });
    }
  };

  return (
    <section className="bg-[#FAFAFA] py-10">
      {toastMessage && (
        <Toast
          type={toastMessage.type}
          message={toastMessage.message}
          onClose={() => setToastMessage(null)}
        />
      )}

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#C8A253] mb-2">
              YOU MAY ALSO LIKE
            </p>
            <h2 className="text-2xl md:text-[34px] font-bold text-[#111] tracking-tight mb-1 font-serif">
              Related to items you've viewed
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              Discover more products that match your taste and elevate your
              experience.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 bg-white text-xs font-bold uppercase tracking-widest text-gray-800 hover:border-black transition-colors shadow-sm hover:shadow-md"
          >
            VIEW ALL <ArrowRight size={16} />
          </Link>
        </div>

        {/* --- PRODUCT SLIDER SECTION --- */}
        <div className="relative group mb-2">
          <button
            onClick={() => scroll("left")}
            className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 hidden md:flex"
          >
            <ChevronLeft
              size={24}
              className="text-gray-700 -ml-0.5"
              strokeWidth={2}
            />
          </button>

          <div
            ref={sliderRef}
            className="flex gap-5 md:gap-6 overflow-x-auto pb-8 pt-2 snap-x snap-mandatory scroll-smooth hide-scrollbar px-2"
          >
            <style>{`
              .hide-scrollbar::-webkit-scrollbar { display: none; }
              .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {recentProducts.map((product, index) => {
              const isWishlisted = wishlistedItems.includes(product._id); // ⚡ Check if this product is liked

              return (
                <div
                  key={product._id}
                  className="group min-w-[250px] max-w-[250px] flex-shrink-0 snap-start bg-white rounded-[24px] p-1.5 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col relative"
                >
                  <Link
                    to={`/product/${product._id}`}
                    className="relative bg-[#F9F9F9] h-[220px] rounded-[16px] p-5 mb-4 flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={
                        product.image ||
                        "https://placehold.co/400x400/f5f5f5/cccccc?text=No+Image"
                      }
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </Link>

                  <div className="flex flex-col flex-1 p-2">
                    <Link to={`/product/${product._id}`}>
                      <h3 className="text-[14px] font-semibold text-gray-900 line-clamp-2 leading-snug mb-0 hover:text-[#C8A253] transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="mt-auto flex items-center justify-between">
                      {product.price && (
                        <p className="text-[18px] font-bold text-gray-900 tracking-tight">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>
                      )}

                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => handleAddToCart(e, product._id)}
                          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all shadow-sm"
                        >
                          <ShoppingBag size={18} strokeWidth={1.5} />
                        </button>

                        <button
                          onClick={(e) => handleWishlist(e, product._id)}
                          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-sm ${
                            isWishlisted
                              ? "border-red-500 bg-red-50 text-red-500 hover:bg-red-100"
                              : "border-gray-200 text-gray-500 hover:border-red-500 hover:text-red-500 hover:bg-red-50"
                          }`}
                        >
                          <Heart
                            size={18}
                            strokeWidth={1.5}
                            className={
                              isWishlisted ? "fill-red-500 text-red-500" : ""
                            }
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 hidden md:flex"
          >
            <ChevronRight
              size={24}
              className="text-gray-700 -mr-0.5"
              strokeWidth={2}
            />
          </button>
        </div>

        {/* --- BOTTOM TRUST BADGES --- */}
        {/* <div className="bg-[#FDFDFD] border border-gray-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#C8A253]/30 bg-[#FCFAEF] flex items-center justify-center shrink-0">
              <Truck size={20} className="text-[#C8A253]" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-gray-900">
                Free Shipping
              </h4>
              <p className="text-[12px] text-gray-500">
                On all orders above ₹999
              </p>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-gray-200"></div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#C8A253]/30 bg-[#FCFAEF] flex items-center justify-center shrink-0">
              <ShieldCheck
                size={20}
                className="text-[#C8A253]"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-gray-900">
                100% Original
              </h4>
              <p className="text-[12px] text-gray-500">
                Authentic products only
              </p>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-gray-200"></div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#C8A253]/30 bg-[#FCFAEF] flex items-center justify-center shrink-0">
              <RefreshCcw
                size={20}
                className="text-[#C8A253]"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-gray-900">
                Easy Returns
              </h4>
              <p className="text-[12px] text-gray-500">Hassle-free returns</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-gray-200"></div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#C8A253]/30 bg-[#FCFAEF] flex items-center justify-center shrink-0">
              <Headphones
                size={20}
                className="text-[#C8A253]"
                strokeWidth={1.5}
              />
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-gray-900">
                24/7 Support
              </h4>
              <p className="text-[12px] text-gray-500">We're here to help</p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default RecentlyViewed;
   


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";
// import "swiper/css";
// import QuickModel from "../Product/ProductDetailModel";

// export default function CategoryShowcase() {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [activeCategory, setActiveCategory] = useState("ALL");
//   const [loading, setLoading] = useState(true);
//   const [quickViewProduct, setQuickViewProduct] = useState(null);

//   const getProductImg = (p) => {
//     if (p.variants?.[0]?.images?.[0]?.url) return p.variants[0].images[0].url;
//     if (p.images?.[0]?.url) return p.images[0].url;
//     return "https://placehold.co/400x400/f9f9f9/C8A253?text=No+Image";
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axiosInstance.get("/products");
//         if (data.success) {
//           setProducts(data.products);
//         }
//       } catch (error) {
//         console.error("Error fetching showcase products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const formatPrice = (price) => {
//     if (price === undefined || price === null) return "";
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       maximumFractionDigits: 0,
//     }).format(price);
//   };

//   // Unique Brand List
//   const availableBrands = [
//     "ALL",
//     ...new Set(
//       products
//         .map((p) => (p.brand ? p.brand.trim().toUpperCase() : null))
//         .filter(Boolean),
//     ),
//   ];

//   const displayBrands =
//     products.length > 0
//       ? availableBrands
//       : ["ALL", "APPLE", "SONY", "MARSHALL", "SAMSUNG", "LOGITECH"];
      
//   const currentCategory =
//     activeCategory === "ALL" && products.length > 0
//       ? availableBrands[0]
//       : activeCategory;

//   const displayProducts = products
//     .filter(
//       (p) =>
//         activeCategory === "ALL" ||
//         (p.brand && p.brand.trim().toUpperCase() === activeCategory),
//     )
//     .slice(0, 5);

//   return (
//     <section
//       className="w-full bg-[#fbfbfb] py-6 md:py-10 px-4 md:px-12 font-sans"
//       style={{ fontFamily: "'Inter', sans-serif" }}
//     >
//       <div className="w-full xl:max-w-[89%] mx-auto flex flex-col items-center">
//         {/* Header Section */}
//         <div className="flex flex-col items-center mb-8 md:mb-14">
//           <span className="text-[9px] md:text-[11px] font-bold tracking-[0.2em] text-[#c9a15a] uppercase mb-2">
//             Explore Our Range
//           </span>

//           <h2 className="text-2xl sm:text-3xl md:text-[32px] font-sans font-bold text-[#111] mb-2 md:mb-2">
//             Categories
//           </h2>

//           <p className="text-gray-500 text-[10px] md:text-sm text-center max-w-2xl leading-relaxed px-4">
//             Discover a wide range of premium products tailored precisely for
//             your personal setup.
//           </p>
//         </div>

//         {/* Brand Filter Buttons */}
//         <div className="flex overflow-x-auto hide-scrollbar w-full max-w-6xl justify-start gap-2 md:gap-4 mb-8 md:mb-14 relative pb-2 md:pb-4 px-2 md:px-0">
//           <div className="flex gap-2 md:gap-4 min-w-max">
//             {displayBrands.map((brandLabel) => (
//               <button
//                 key={brandLabel}
//                 title={brandLabel}
//                 onClick={() => setActiveCategory(brandLabel)}
//                 className={`px-4 md:px-6 py-2 rounded-md text-[10px] md:text-[11px] font-bold tracking-[0.12em] transition-all duration-300 uppercase shadow-sm cursor-pointer whitespace-nowrap ${
//                   activeCategory === brandLabel ||
//                   currentCategory === brandLabel
//                     ? "bg-black text-white shadow-md"
//                     : "bg-white text-gray-500 hover:text-black hover:bg-gray-50 border border-gray-100"
//                 }`}
//               >
//                 {brandLabel}
//               </button>
//             ))}
//           </div>
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center h-48">
//             <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         ) : (
//           <div className="w-full">
//             {/* Desktop Grid */}
//             <div className="hidden md:grid grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5 w-full mb-10">
//               {displayProducts.map((p) => {
//                 const originalPrice = Number(p.price) || 0;
//                 const discount = Number(p.discountPrice) || 0;
//                 const finalPrice = originalPrice - discount;
//                 const savePercent =
//                   discount > 0
//                     ? Math.round((discount / originalPrice) * 100)
//                     : 0;
//                 const imgSrc = getProductImg(p);

//                 return (
//                   <div
//                     key={p._id}
//                     className="relative bg-white shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] w-full rounded-2xl p-4 lg:p-5 flex flex-col cursor-pointer group border border-transparent hover:border-[#c9a15a]/40 transition-all duration-300"
//                     onClick={() => setQuickViewProduct(p)}
//                   >
//                     {savePercent > 0 && (
//                       <span className="absolute top-3 left-3 z-10 bg-[#c9a15a] text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
//                         {savePercent}% Off
//                       </span>
//                     )}

//                     <div className="w-full h-[110px] lg:h-[130px] flex items-center justify-center mb-4 lg:mb-5">
//                       <img
//                         src={imgSrc}
//                         alt={p.name}
//                         className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
//                       />
//                     </div>

//                     {/* ⚡ FIX: Displaying p.name instead of p.category */}
//                     <h3 
//                       className="text-[11px] lg:text-[12px] font-extrabold text-[#111] tracking-wide uppercase leading-snug mb-1 line-clamp-2 min-h-[28px]" 
//                       title={p.name || p.category}
//                     >
//                       {p.name || p.category}
//                     </h3>

//                     {finalPrice > 0 && (
//                       <span className="text-[12px] lg:text-[13px] font-semibold text-[#a97c2f] mb-2">
//                         {formatPrice(finalPrice)}
//                       </span>
//                     )}

//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setQuickViewProduct(p);
//                       }}
//                       aria-label={`View ${p.name}`}
//                       className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black shadow-sm group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300"
//                     >
//                       <svg
//                         width="13"
//                         height="13"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2.5"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       >
//                         <path d="M5 12h14" />
//                         <path d="m12 5 7 7-7 7" />
//                       </svg>
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Mobile Slider */}
//             <div className="block md:hidden w-full mb-6">
//               <Swiper
//                 modules={[Autoplay]}
//                 spaceBetween={16}
//                 slidesPerView={2.1}
//                 loop={true}
//                 autoplay={{ delay: 3000, disableOnInteraction: false }}
//                 className="w-full pb-8 pt-2"
//               >
//                 {displayProducts.map((p) => {
//                   const originalPrice = Number(p.price) || 0;
//                   const discount = Number(p.discountPrice) || 0;
//                   const finalPrice = originalPrice - discount;
//                   const savePercent =
//                     discount > 0
//                       ? Math.round((discount / originalPrice) * 100)
//                       : 0;
//                   const imgSrc = getProductImg(p);

//                   return (
//                     <SwiperSlide key={p._id} className="h-auto">
//                       <div
//                         className="relative bg-white w-full h-full rounded-lg flex flex-col shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-3.5 cursor-pointer"
//                         onClick={() => setQuickViewProduct(p)}
//                       >
//                         {savePercent > 0 && (
//                           <span className="absolute top-2.5 left-2.5 z-10 bg-[#c9a15a] text-white text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
//                             {savePercent}% Off
//                           </span>
//                         )}

//                         <div className="w-full h-[90px] flex items-center justify-center mb-3">
//                           <img
//                             src={imgSrc}
//                             alt={p.name}
//                             className="max-w-full max-h-full object-contain"
//                           />
//                         </div>

//                         {/* ⚡ FIX: Displaying p.name instead of p.category */}
//                         <h3 
//                           className="text-[10px] font-extrabold text-[#111] tracking-wide uppercase leading-snug mb-1 line-clamp-2 min-h-[24px]" 
//                           title={p.name || p.category}
//                         >
//                           {p.name || p.category}
//                         </h3>

//                         {finalPrice > 0 && (
//                           <span className="text-[11px] font-semibold text-[#a97c2f] mb-1">
//                             {formatPrice(finalPrice)}
//                           </span>
//                         )}

//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setQuickViewProduct(p);
//                           }}
//                           aria-label={`View ${p.name}`}
//                           className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black shadow-sm"
//                         >
//                           <svg
//                             width="11"
//                             height="11"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2.5"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           >
//                             <path d="M5 12h14" />
//                             <path d="m12 5 7 7-7 7" />
//                           </svg>
//                         </button>
//                       </div>
//                     </SwiperSlide>
//                   );
//                 })}
//               </Swiper>
//             </div>
//           </div>
//         )}

//         {!loading && (
//           <div className="flex justify-center w-full mt-2 md:mt-[-10px]">
//             <button
//               onClick={() => navigate("/shop")}
//               className="bg-black text-white text-[10px] md:text-[11px] font-[800] tracking-[0.2em] uppercase px-8 py-3 rounded-[6px] hover:bg-gray-800 transition-colors shadow-lg cursor-pointer"
//             >
//               View More
//             </button>
//           </div>
//         )}
//       </div>

//       {quickViewProduct && (
//         <QuickModel
//           isOpen={!!quickViewProduct}
//           onClose={() => setQuickViewProduct(null)}
//           product={quickViewProduct}
//         />
//       )}
//     </section>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import QuickModel from "../Product/ProductDetailModel";

export default function CategoryShowcase() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const getProductImg = (p) => {
    if (p.variants?.[0]?.images?.[0]?.url) return p.variants[0].images[0].url;
    if (p.images?.[0]?.url) return p.images[0].url;
    return "https://placehold.co/400x400/f9f9f9/C8A253?text=No+Image";
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get("/products");
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching showcase products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const formatPrice = (price) => {
    if (price === undefined || price === null) return "";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Unique Brand List
  const availableBrands = [
    "ALL",
    ...new Set(
      products
        .map((p) => (p.brand ? p.brand.trim().toUpperCase() : null))
        .filter(Boolean),
    ),
  ];

  const displayBrands =
    products.length > 0
      ? availableBrands
      : ["ALL", "APPLE", "SONY", "MARSHALL", "SAMSUNG", "LOGITECH"];
      
  const currentCategory =
    activeCategory === "ALL" && products.length > 0
      ? availableBrands[0]
      : activeCategory;

  const displayProducts = products
    .filter(
      (p) =>
        activeCategory === "ALL" ||
        (p.brand && p.brand.trim().toUpperCase() === activeCategory),
    )
    .slice(0, 5);

  return (
    <section
      className="w-full bg-[#fbfbfb] py-6 md:py-10 px-4 md:px-12 font-sans"
      // ⚡ Apple font applied globally here
      style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      <div className="w-full xl:max-w-[89%] mx-auto flex flex-col items-center">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8 md:mb-14">
          <span className="text-[9px] md:text-[11px] font-bold tracking-[0.2em] text-[#c9a15a] uppercase mb-2">
            Explore Our Range
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-sans font-bold text-[#111] mb-2 md:mb-2">
            Categories
          </h2>

          <p className="text-gray-500 text-[10px] md:text-sm text-center max-w-2xl leading-relaxed px-4">
            Discover a wide range of premium products tailored precisely for
            your personal setup.
          </p>
        </div>

        {/* Brand Filter Buttons */}
        <div className="flex overflow-x-auto hide-scrollbar w-full max-w-6xl justify-start gap-2 md:gap-4 mb-8 md:mb-14 relative pb-2 md:pb-4 px-2 md:px-0">
          <div className="flex gap-2 md:gap-4 min-w-max">
            {displayBrands.map((brandLabel) => (
              <button
                key={brandLabel}
                title={brandLabel}
                onClick={() => setActiveCategory(brandLabel)}
                className={`px-4 md:px-6 py-2 rounded-md text-[10px] md:text-[11px] font-bold tracking-[0.12em] transition-all duration-300 uppercase shadow-sm cursor-pointer whitespace-nowrap ${
                  activeCategory === brandLabel ||
                  currentCategory === brandLabel
                    ? "bg-black text-white shadow-md"
                    : "bg-white text-gray-500 hover:text-black hover:bg-gray-50 border border-gray-100"
                }`}
              >
                {brandLabel}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="w-full">
            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5 w-full mb-10">
              {displayProducts.map((p) => {
                const originalPrice = Number(p.price) || 0;
                const discount = Number(p.discountPrice) || 0;
                const finalPrice = originalPrice - discount;
                const savePercent =
                  discount > 0
                    ? Math.round((discount / originalPrice) * 100)
                    : 0;
                const imgSrc = getProductImg(p);

                return (
                  <div
                    key={p._id}
                    className="relative bg-white shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] w-full rounded-2xl p-4 lg:p-5 flex flex-col cursor-pointer group border border-transparent hover:border-[#c9a15a]/40 transition-all duration-300"
                    onClick={() => setQuickViewProduct(p)}
                  >
                    {savePercent > 0 && (
                      <span className="absolute top-3 left-3 z-10 bg-[#c9a15a] text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                        {savePercent}% Off
                      </span>
                    )}

                    <div className="w-full h-[110px] lg:h-[130px] flex items-center justify-center mb-4 lg:mb-5">
                      <img
                        src={imgSrc}
                        alt={p.name}
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* ⚡ FIX: Displaying p.name instead of p.category */}
                    <h3 
                      className="text-[11px] lg:text-[12px] font-extrabold text-[#111] tracking-wide uppercase leading-snug mb-1 line-clamp-2 min-h-[28px]" 
                      title={p.name || p.category}
                    >
                      {p.name || p.category}
                    </h3>

                    {finalPrice > 0 && (
                      <span className="text-[12px] lg:text-[13px] font-semibold text-[#a97c2f] mb-2">
                        {formatPrice(finalPrice)}
                      </span>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(p);
                      }}
                      aria-label={`View ${p.name}`}
                      className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black shadow-sm group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300"
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Mobile Slider */}
            <div className="block md:hidden w-full mb-6">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={16}
                slidesPerView={2.1}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="w-full pb-8 pt-2"
              >
                {displayProducts.map((p) => {
                  const originalPrice = Number(p.price) || 0;
                  const discount = Number(p.discountPrice) || 0;
                  const finalPrice = originalPrice - discount;
                  const savePercent =
                    discount > 0
                      ? Math.round((discount / originalPrice) * 100)
                      : 0;
                  const imgSrc = getProductImg(p);

                  return (
                    <SwiperSlide key={p._id} className="h-auto">
                      <div
                        className="relative bg-white w-full h-full rounded-lg flex flex-col shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-3.5 cursor-pointer"
                        onClick={() => setQuickViewProduct(p)}
                      >
                        {savePercent > 0 && (
                          <span className="absolute top-2.5 left-2.5 z-10 bg-[#c9a15a] text-white text-[8px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                            {savePercent}% Off
                          </span>
                        )}

                        <div className="w-full h-[90px] flex items-center justify-center mb-3">
                          <img
                            src={imgSrc}
                            alt={p.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>

                        {/* ⚡ FIX: Displaying p.name instead of p.category */}
                        <h3 
                          className="text-[10px] font-extrabold text-[#111] tracking-wide uppercase leading-snug mb-1 line-clamp-2 min-h-[24px]" 
                          title={p.name || p.category}
                        >
                          {p.name || p.category}
                        </h3>

                        {finalPrice > 0 && (
                          <span className="text-[11px] font-semibold text-[#a97c2f] mb-1">
                            {formatPrice(finalPrice)}
                          </span>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(p);
                          }}
                          aria-label={`View ${p.name}`}
                          className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black shadow-sm"
                        >
                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        )}

        {!loading && (
          <div className="flex justify-center w-full mt-2 md:mt-[-10px]">
            <button
              onClick={() => navigate("/shop")}
              className="bg-black text-white text-[10px] md:text-[11px] font-[800] tracking-[0.2em] uppercase px-8 py-3 rounded-[6px] hover:bg-gray-800 transition-colors shadow-lg cursor-pointer"
            >
              View More
            </button>
          </div>
        )}
      </div>

      {quickViewProduct && (
        <QuickModel
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          product={quickViewProduct}
        />
      )}
    </section>
  );
}
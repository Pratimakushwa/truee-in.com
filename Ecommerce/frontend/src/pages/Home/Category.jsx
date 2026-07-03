// import React, { useState, useEffect } from 'react';
// import { Star } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import QuickModel from '../Product/ProductDetailModel';

// export default function CategoryShowcase() {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [activeCategory, setActiveCategory] = useState('ALL');
//   const [loading, setLoading] = useState(true);
//   const [quickViewProduct, setQuickViewProduct] = useState(null);

//   // ── LOGIC: Safely get the image from product variants ──
//   const getProductImg = (p) => {
//     if (p.variants?.[0]?.images?.[0]?.url) return p.variants[0].images[0].url;
//     if (p.images?.[0]?.url) return p.images[0].url;
//     return 'https://placehold.co/400x400/f9f9f9/C8A253?text=No+Image'; // Fallback
//   };

//   // ── API INTEGRATION ──
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axiosInstance.get('/products'); 
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
//     if (!price) return '';
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//     }).format(price);
//   };

//   // ── FILTER LOGIC ──
//   // Fetch distinct BRANDS dynamically from the frontend products list
//   const availableBrands = ['ALL', ...new Set(products.map(p => p.brand).filter(Boolean))];
  
//   // Default selected visually
//   const displayBrands = products.length > 0 ? availableBrands : ['ALL', 'APPLE', 'SONY', 'MARSHALL', 'SAMSUNG', 'LOGITECH'];
//   const currentCategory = activeCategory === 'ALL' && products.length > 0 ? availableBrands[0] : activeCategory;

//   // Filter products based on selected BRAND, and take only the first 6 for a clean grid
//   const displayProducts = products
//     .filter(p => activeCategory === 'ALL' || p.brand === activeCategory)
//     .slice(0, 6);

//   return (
//     <section className="w-full bg-[#fbfbfb] py-6 md:py-10 px-4 md:px-12 font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
//       <div className="w-full xl:max-w-[89%] mx-auto flex flex-col items-center">
        
//         {/* ── SECTION HEADER ── */}
//         <h2 className="text-2xl md:text-4xl font-serif font-medium text-[#111] mb-2 md:mb-4">Categories</h2>
//         <p className="text-gray-500 text-[10px] md:text-sm text-center max-w-xl mb-6 md:mb-10 leading-relaxed px-2">
//           Discover a wide range of premium products tailored precisely for your 
//           personal setup, professional workspace, or entertainment.
//         </p>

//         {/* ── CATEGORY FILTER TABS ── */}
//         <div className="flex overflow-x-auto hide-scrollbar w-full max-w-6xl justify-start gap-3 md:gap-4 mb-8 md:mb-14 relative pb-2 md:pb-4 px-2 md:px-0">
//           <div className="flex gap-4 min-w-max">
//             {displayBrands.map((brandLabel) => (
//               <button
//                 key={brandLabel}
//                 onClick={() => setActiveCategory(brandLabel)}
//                 className={`px-6 py-2 rounded-md text-[10px] md:text-[11px] font-bold tracking-[0.15em] transition-all duration-300 uppercase shadow-sm cursor-pointer ${
//                   activeCategory === brandLabel || currentCategory === brandLabel
//                     ? 'bg-black text-white shadow-md'
//                     : 'bg-white text-gray-500 hover:text-black hover:bg-gray-50 border border-gray-100'
//                 }`}
//               >
//                 {brandLabel}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* ── PRODUCT GRID & SLIDER ── */}
//         {loading ? (
//            <div className="flex justify-center items-center h-48"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div></div>
//         ) : (
//           <div className="w-full">
//             {/* Desktop Grid */}
//             <div className="hidden md:grid grid-cols-3 gap-x-6 gap-y-12 w-full mb-10 justify-items-center">
//               {displayProducts.map((product, index) => {
//                  const isDealActive = product.flashDeal?.isActive && new Date(product.flashDeal.endTime).getTime() > Date.now();
//                  const finalPrice = isDealActive ? product.flashDeal.dealPrice : product.price - (product.discountPrice || 0);
//                  const imgSrc = getProductImg(product);
                 
//                  const isDarkBg = index === 0;

//                  return (
//                    <div 
//                      key={product._id} 
//                      className="bg-white w-full max-w-[340px] rounded-lg p-4 flex flex-col shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 cursor-pointer overflow-hidden border border-gray-50"
//                      onClick={() => setQuickViewProduct(product)}
//                    >
//                      {/* Product Image Container */}
//                      <div className={`w-full h-[220px] rounded-md mb-5 flex items-center justify-center p-6 ${isDarkBg ? 'bg-[#282828]' : 'bg-white'}`}>
//                        <img 
//                          src={imgSrc} 
//                          alt={product.name} 
//                          className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500"
//                          style={!isDarkBg ? { mixBlendMode: 'multiply' } : { filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))' }}
//                        />
//                      </div>

//                      {/* Product Info */}
//                      <div className="flex flex-col flex-1 px-1">
                       
//                        <div className="flex justify-between items-center mb-1">
//                          <h3 className="text-[12px] font-[800] text-[#111] tracking-wider uppercase truncate pr-2">
//                            {product.category || product.name || 'PRODUCT'}
//                          </h3>
//                          <div className="flex gap-[2px]">
//                            {[...Array(5)].map((_, i) => (
//                              <Star 
//                                key={i} 
//                                size={10} 
//                                className={i < (product.averageRating || 5) ? "fill-[#f5a623] text-[#f5a623]" : "fill-gray-200 text-gray-200"} 
//                              />
//                            ))}
//                          </div>
//                        </div>

//                        <p className="text-[9px] text-[#999] mb-4 font-medium tracking-wide">
//                          ({product.reviews || '4.8'}) Customer Reviews
//                        </p>

//                        <div className="flex justify-between items-end mt-auto pt-1 border-t border-gray-50/0">
//                          <span className="text-[15px] font-[800] text-[#222]">
//                            {formatPrice(finalPrice)}
//                          </span>
//                          <span className="text-[8px] font-[600] tracking-wider text-red-500 uppercase">
//                            Almost Sold Out
//                          </span>
//                        </div>

//                      </div>
//                    </div>
//                  );
//               })}
//             </div>

//             {/* Mobile Slider */}
//             <div className="block md:hidden w-full mb-6">
//               <Swiper
//                 modules={[Autoplay]}
//                 spaceBetween={20}
//                 slidesPerView={1.2}
//                 loop={true}
//                 autoplay={{ delay: 3000, disableOnInteraction: false }}
//                 className="w-full pb-8 pt-2"
//               >
//                 {displayProducts.map((product, index) => {
//                    const isDealActive = product.flashDeal?.isActive && new Date(product.flashDeal.endTime).getTime() > Date.now();
//                    const finalPrice = isDealActive ? product.flashDeal.dealPrice : product.price - (product.discountPrice || 0);
//                    const imgSrc = getProductImg(product);
//                    const isDarkBg = index === 0;

//                    return (
//                      <SwiperSlide key={product._id} className="flex justify-center">
//                        <div 
//                          className="bg-white w-full cursor-pointer rounded-lg p-4 flex flex-col shadow-[0_2px_15px_rgb(0,0,0,0.06)] overflow-hidden border border-gray-50"
//                          onClick={() => setQuickViewProduct(product)}
//                        >
//                          <div className={`w-full h-[200px] rounded-md mb-4 flex items-center justify-center p-6 ${isDarkBg ? 'bg-[#282828]' : 'bg-white'}`}>
//                            <img 
//                              src={imgSrc} 
//                              alt={product.name} 
//                              className="max-w-full max-h-full object-contain"
//                              style={!isDarkBg ? { mixBlendMode: 'multiply' } : { filter: 'drop-shadow(0 5px 8px rgba(0,0,0,0.4))' }}
//                            />
//                          </div>

//                          <div className="flex flex-col flex-1 px-1">
//                            <div className="flex justify-between items-center mb-1">
//                              <h3 className="text-[11px] font-[800] text-[#111] tracking-wider uppercase truncate pr-2">
//                                {product.category || product.name || 'PRODUCT'}
//                              </h3>
//                              <div className="flex gap-[1px]">
//                                {[...Array(5)].map((_, i) => (
//                                  <Star key={i} size={8} className={i < (product.averageRating || 5) ? "fill-[#f5a623] text-[#f5a623]" : "fill-gray-200 text-gray-200"} />
//                                ))}
//                              </div>
//                            </div>

//                            <p className="text-[8px] text-[#999] mb-4 font-medium tracking-wide">
//                              ({product.reviews || '4.8'}) Customer Reviews
//                            </p>

//                            <div className="flex justify-between items-end mt-auto pt-1">
//                              <span className="text-[14px] font-[800] text-[#222]">{formatPrice(finalPrice)}</span>
//                              <span className="text-[7px] font-[600] tracking-wider text-red-500 uppercase">Almost Sold Out</span>
//                            </div>
//                          </div>
//                        </div>
//                      </SwiperSlide>
//                    );
//                 })}
//               </Swiper>
//             </div>
//           </div>
//         )}

//         {/* ── VIEW MORE BUTTON ── */}
//         {!loading && (
//           <div className="flex justify-center w-full mt-2 md:mt-[-10px]">
//             <button 
//               onClick={() => navigate('/shop')}
//               className="md:mt-0 bg-black text-white text-[10px] md:text-[11px] font-[800] tracking-[0.2em] uppercase px-8 py-3 rounded-[6px] hover:bg-gray-800 transition-colors cursor-pointer shadow-lg hover:shadow-xl"
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

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import QuickModel from '../Product/ProductDetailModel';

// export default function CategoryShowcase() {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [activeCategory, setActiveCategory] = useState('ALL');
//   const [loading, setLoading] = useState(true);
//   const [quickViewProduct, setQuickViewProduct] = useState(null);

//   const getProductImg = (p) => {
//     if (p.variants?.[0]?.images?.[0]?.url) return p.variants[0].images[0].url;
//     if (p.images?.[0]?.url) return p.images[0].url;
//     return 'https://placehold.co/400x400/f9f9f9/C8A253?text=No+Image';
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axiosInstance.get('/products');
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
//     if (price === undefined || price === null) return '';
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency', currency: 'INR', maximumFractionDigits: 0
//     }).format(price);
//   };

//   const availableBrands = ['ALL', ...new Set(products.map(p => p.brand).filter(Boolean))];
//   const displayBrands = products.length > 0 ? availableBrands : ['ALL', 'APPLE', 'SONY', 'MARSHALL', 'SAMSUNG', 'LOGITECH'];
//   const currentCategory = activeCategory === 'ALL' && products.length > 0 ? availableBrands[0] : activeCategory;

//   const displayProducts = products
//     .filter(p => activeCategory === 'ALL' || p.brand === activeCategory)
//     .slice(0, 6);

//   return (
//     <section className="w-full bg-[#fbfbfb] py-6 md:py-10 px-4 md:px-12 font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
//       <div className="w-full xl:max-w-[89%] mx-auto flex flex-col items-center">
        
//         <h2 className="text-2xl md:text-4xl font-serif font-medium text-[#111] mb-2 md:mb-4">Categories</h2>
//         <p className="text-gray-500 text-[10px] md:text-sm text-center max-w-xl mb-6 md:mb-10 leading-relaxed px-2">
//           Discover a wide range of premium products tailored precisely for your personal setup.
//         </p>

//         <div className="flex overflow-x-auto hide-scrollbar w-full max-w-6xl justify-start gap-3 md:gap-4 mb-8 md:mb-14 relative pb-2 md:pb-4 px-2 md:px-0">
//           <div className="flex gap-4 min-w-max">
//             {displayBrands.map((brandLabel) => (
//               <button
//                 key={brandLabel}
//                 onClick={() => setActiveCategory(brandLabel)}
//                 className={`px-6 py-2 rounded-md text-[10px] md:text-[11px] font-bold tracking-[0.15em] transition-all duration-300 uppercase shadow-sm cursor-pointer ${
//                   activeCategory === brandLabel || currentCategory === brandLabel
//                     ? 'bg-black text-white shadow-md'
//                     : 'bg-white text-gray-500 hover:text-black hover:bg-gray-50 border border-gray-100'
//                 }`}
//               >
//                 {brandLabel}
//               </button>
//             ))}
//           </div>
//         </div>

//         {loading ? (
//            <div className="flex justify-center items-center h-48"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div></div>
//         ) : (
//           <div className="w-full">
//             {/* Desktop Grid */}
//             <div className="hidden md:grid grid-cols-3 gap-x-6 gap-y-12 w-full mb-10 justify-items-center">
//               {displayProducts.map((p, index) => {
//                   const originalPrice = Number(p.price) || 0;
//                   const discount = Number(p.discountPrice) || 0;
//                   const finalPrice = originalPrice - discount;
//                   const savePercent = discount > 0 ? Math.round((discount / originalPrice) * 100) : 0;
//                   const imgSrc = getProductImg(p);
//                   const isDarkBg = index === 0;

//                   return (
//                     <div key={p._id} className="bg-white w-full max-w-[340px] rounded-lg p-4 flex flex-col shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 cursor-pointer overflow-hidden border border-gray-50 relative" onClick={() => setQuickViewProduct(p)}>
//                       {savePercent > 0 && (
//                         <div className="absolute top-0 left-0 z-10 bg-[#3a8b76] text-white text-[9px] font-bold px-3 py-1 rounded-br-lg uppercase tracking-widest">
//                           Save {savePercent}%
//                         </div>
//                       )}
//                       <div className={`w-full h-[220px] rounded-md mb-5 flex items-center justify-center p-6 ${isDarkBg ? 'bg-[#282828]' : 'bg-white'}`}>
//                         <img src={imgSrc} alt={p.name} className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500" style={!isDarkBg ? { mixBlendMode: 'multiply' } : { filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))' }} />
//                       </div>
//                       <div className="flex flex-col flex-1 px-1">
//                         <h3 className="text-[12px] font-[800] text-[#111] tracking-wider uppercase mb-1 truncate">{p.category || p.name}</h3>
//                         <div className="flex items-center gap-2 mb-4">
//                           <span className="text-[15px] font-[800] text-[#3a8b76]">{formatPrice(finalPrice)}</span>
//                           {discount > 0 && <span className="text-[12px] font-medium text-gray-400 line-through">{formatPrice(originalPrice)}</span>}
//                         </div>
//                       </div>
//                     </div>
//                   );
//               })}
//             </div>

//             {/* Mobile Slider */}
//             <div className="block md:hidden w-full mb-6">
//               <Swiper modules={[Autoplay]} spaceBetween={20} slidesPerView={1.2} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }} className="w-full pb-8 pt-2">
//                 {displayProducts.map((p, index) => {
//                     const originalPrice = Number(p.price) || 0;
//                     const discount = Number(p.discountPrice) || 0;
//                     const finalPrice = originalPrice - discount;
//                     const savePercent = discount > 0 ? Math.round((discount / originalPrice) * 100) : 0;
//                     const imgSrc = getProductImg(p);
//                     const isDarkBg = index === 0;

//                     return (
//                       <SwiperSlide key={p._id} className="flex justify-center">
//                         <div className="bg-white w-full cursor-pointer rounded-lg p-4 flex flex-col shadow-[0_2px_15px_rgb(0,0,0,0.06)] overflow-hidden border border-gray-50 relative" onClick={() => setQuickViewProduct(p)}>
//                           {savePercent > 0 && (
//                              <div className="absolute top-0 left-0 z-10 bg-[#3a8b76] text-white text-[9px] font-bold px-3 py-1 rounded-br-lg uppercase tracking-widest">
//                                Save {savePercent}%
//                              </div>
//                           )}
//                           <div className={`w-full h-[200px] rounded-md mb-4 flex items-center justify-center p-6 ${isDarkBg ? 'bg-[#282828]' : 'bg-white'}`}>
//                             <img src={imgSrc} alt={p.name} className="max-w-full max-h-full object-contain" style={!isDarkBg ? { mixBlendMode: 'multiply' } : { filter: 'drop-shadow(0 5px 8px rgba(0,0,0,0.4))' }} />
//                           </div>
//                           <div className="flex flex-col flex-1 px-1">
//                             <h3 className="text-[11px] font-[800] text-[#111] tracking-wider uppercase mb-1 truncate">{p.category || p.name}</h3>
//                             <div className="flex items-center gap-2 mb-2">
//                                 <span className="text-[14px] font-[800] text-[#3a8b76]">{formatPrice(finalPrice)}</span>
//                                 {discount > 0 && <span className="text-[11px] font-medium text-gray-400 line-through">{formatPrice(originalPrice)}</span>}
//                             </div>
//                           </div>
//                         </div>
//                       </SwiperSlide>
//                     );
//                 })}
//               </Swiper>
//             </div>
//           </div>
//         )}

//         {!loading && (
//           <div className="flex justify-center w-full mt-2 md:mt-[-10px]">
//             <button onClick={() => navigate('/shop')} className="bg-black text-white text-[10px] md:text-[11px] font-[800] tracking-[0.2em] uppercase px-8 py-3 rounded-[6px] hover:bg-gray-800 transition-colors shadow-lg cursor-pointer">View More</button>
//           </div>
//         )}
//       </div>

//       {quickViewProduct && (
//         <QuickModel isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} product={quickViewProduct} />
//       )}
//     </section>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import QuickModel from '../Product/ProductDetailModel';

// export default function CategoryShowcase() {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [activeCategory, setActiveCategory] = useState('ALL');
//   const [loading, setLoading] = useState(true);
//   const [quickViewProduct, setQuickViewProduct] = useState(null);

//   const getProductImg = (p) => {
//     if (p.variants?.[0]?.images?.[0]?.url) return p.variants[0].images[0].url;
//     if (p.images?.[0]?.url) return p.images[0].url;
//     return 'https://placehold.co/400x400/f9f9f9/C8A253?text=No+Image';
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axiosInstance.get('/products');
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
//     if (price === undefined || price === null) return '';
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency', currency: 'INR', maximumFractionDigits: 0
//     }).format(price);
//   };

//   const availableBrands = ['ALL', ...new Set(products.map(p => p.brand).filter(Boolean))];
//   const displayBrands = products.length > 0 ? availableBrands : ['ALL', 'APPLE', 'SONY', 'MARSHALL', 'SAMSUNG', 'LOGITECH'];
//   const currentCategory = activeCategory === 'ALL' && products.length > 0 ? availableBrands[0] : activeCategory;

//   const displayProducts = products
//     .filter(p => activeCategory === 'ALL' || p.brand === activeCategory)
//     .slice(0, 6);

//   return (
//     <section className="w-full bg-[#fbfbfb] py-6 md:py-10 px-4 md:px-12 font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
//       <div className="w-full xl:max-w-[89%] mx-auto flex flex-col items-center">
        
//         <h2 className="text-2xl md:text-4xl font-serif font-medium text-[#111] mb-2 md:mb-4">Categories</h2>
//         <p className="text-gray-500 text-[10px] md:text-sm text-center max-w-xl mb-6 md:mb-10 leading-relaxed px-2">
//           Discover a wide range of premium products tailored precisely for your personal setup.
//         </p>

//         <div className="flex overflow-x-auto hide-scrollbar w-full max-w-6xl justify-start gap-3 md:gap-4 mb-8 md:mb-14 relative pb-2 md:pb-4 px-2 md:px-0">
//           <div className="flex gap-4 min-w-max">
//             {displayBrands.map((brandLabel) => (
//               <button
//                 key={brandLabel}
//                 onClick={() => setActiveCategory(brandLabel)}
//                 className={`px-6 py-2 rounded-md text-[10px] md:text-[11px] font-bold tracking-[0.15em] transition-all duration-300 uppercase shadow-sm cursor-pointer ${
//                   activeCategory === brandLabel || currentCategory === brandLabel
//                     ? 'bg-black text-white shadow-md'
//                     : 'bg-white text-gray-500 hover:text-black hover:bg-gray-50 border border-gray-100'
//                 }`}
//               >
//                 {brandLabel}
//               </button>
//             ))}
//           </div>
//         </div>

//         {loading ? (
//            <div className="flex justify-center items-center h-48"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div></div>
//         ) : (
//           <div className="w-full">
//             {/* Desktop Grid */}
//             <div className="hidden md:grid grid-cols-3 gap-x-6 gap-y-12 w-full mb-10 justify-items-center">
//               {displayProducts.map((p) => {
//                   const originalPrice = Number(p.price) || 0;
//                   const discount = Number(p.discountPrice) || 0;
//                   const finalPrice = originalPrice - discount;
//                   const savePercent = discount > 0 ? Math.round((discount / originalPrice) * 100) : 0;
//                   const imgSrc = getProductImg(p);

//                   return (
//                     <div key={p._id} className="bg-white w-full max-w-[340px] rounded-lg p-4 flex flex-col shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 cursor-pointer overflow-hidden border border-gray-50 relative" onClick={() => setQuickViewProduct(p)}>
//                       {savePercent > 0 && (
//                         <div className="absolute top-0 left-0 z-10 bg-[#3a8b76] text-white text-[9px] font-bold px-3 py-1 rounded-br-lg uppercase tracking-widest">
//                           Save {savePercent}%
//                         </div>
//                       )}
                      
//                       {/* ⚡ FIX: Yahan se dark background hata kar sabko uniform bg-white de diya hai */}
//                       <div className="w-full h-[220px] rounded-md mb-5 flex items-center justify-center p-6 bg-white">
//                         <img src={imgSrc} alt={p.name} className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500" />
//                       </div>
                      
//                       <div className="flex flex-col flex-1 px-1">
//                         <h3 className="text-[12px] font-[800] text-[#111] tracking-wider uppercase mb-1 truncate">{p.category || p.name}</h3>
//                         <div className="flex items-center gap-2 mb-4">
//                           <span className="text-[15px] font-[800] text-[#3a8b76]">{formatPrice(finalPrice)}</span>
//                           {discount > 0 && <span className="text-[12px] font-medium text-gray-400 line-through">{formatPrice(originalPrice)}</span>}
//                         </div>
//                       </div>
//                     </div>
//                   );
//               })}
//             </div>

//             {/* Mobile Slider */}
//             <div className="block md:hidden w-full mb-6">
//               <Swiper modules={[Autoplay]} spaceBetween={20} slidesPerView={1.2} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }} className="w-full pb-8 pt-2">
//                 {displayProducts.map((p) => {
//                     const originalPrice = Number(p.price) || 0;
//                     const discount = Number(p.discountPrice) || 0;
//                     const finalPrice = originalPrice - discount;
//                     const savePercent = discount > 0 ? Math.round((discount / originalPrice) * 100) : 0;
//                     const imgSrc = getProductImg(p);

//                     return (
//                       <SwiperSlide key={p._id} className="flex justify-center">
//                         <div className="bg-white w-full cursor-pointer rounded-lg p-4 flex flex-col shadow-[0_2px_15px_rgb(0,0,0,0.06)] overflow-hidden border border-gray-50 relative" onClick={() => setQuickViewProduct(p)}>
//                           {savePercent > 0 && (
//                              <div className="absolute top-0 left-0 z-10 bg-[#3a8b76] text-white text-[9px] font-bold px-3 py-1 rounded-br-lg uppercase tracking-widest">
//                                Save {savePercent}%
//                              </div>
//                           )}
                          
//                           {/* ⚡ FIX: Mobile view mein bhi dark background hataya */}
//                           <div className="w-full h-[200px] rounded-md mb-4 flex items-center justify-center p-6 bg-white">
//                             <img src={imgSrc} alt={p.name} className="max-w-full max-h-full object-contain" />
//                           </div>
                          
//                           <div className="flex flex-col flex-1 px-1">
//                             <h3 className="text-[11px] font-[800] text-[#111] tracking-wider uppercase mb-1 truncate">{p.category || p.name}</h3>
//                             <div className="flex items-center gap-2 mb-2">
//                                 <span className="text-[14px] font-[800] text-[#3a8b76]">{formatPrice(finalPrice)}</span>
//                                 {discount > 0 && <span className="text-[11px] font-medium text-gray-400 line-through">{formatPrice(originalPrice)}</span>}
//                             </div>
//                           </div>
//                         </div>
//                       </SwiperSlide>
//                     );
//                 })}
//               </Swiper>
//             </div>
//           </div>
//         )}

//         {!loading && (
//           <div className="flex justify-center w-full mt-2 md:mt-[-10px]">
//             <button onClick={() => navigate('/shop')} className="bg-black text-white text-[10px] md:text-[11px] font-[800] tracking-[0.2em] uppercase px-8 py-3 rounded-[6px] hover:bg-gray-800 transition-colors shadow-lg cursor-pointer">View More</button>
//           </div>
//         )}
//       </div>

//       {quickViewProduct && (
//         <QuickModel isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} product={quickViewProduct} />
//       )}
//     </section>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import QuickModel from '../Product/ProductDetailModel';

// export default function CategoryShowcase() {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [activeCategory, setActiveCategory] = useState('ALL');
//   const [loading, setLoading] = useState(true);
//   const [quickViewProduct, setQuickViewProduct] = useState(null);

//   const getProductImg = (p) => {
//     if (p.variants?.[0]?.images?.[0]?.url) return p.variants[0].images[0].url;
//     if (p.images?.[0]?.url) return p.images[0].url;
//     return 'https://placehold.co/400x400/f9f9f9/C8A253?text=No+Image';
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axiosInstance.get('/products');
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
//     if (price === undefined || price === null) return '';
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency', currency: 'INR', maximumFractionDigits: 0
//     }).format(price);
//   };

//   const availableBrands = ['ALL', ...new Set(products.map(p => p.brand).filter(Boolean))];
//   const displayBrands = products.length > 0 ? availableBrands : ['ALL', 'APPLE', 'SONY', 'MARSHALL', 'SAMSUNG', 'LOGITECH'];
//   const currentCategory = activeCategory === 'ALL' && products.length > 0 ? availableBrands[0] : activeCategory;

//   const displayProducts = products
//     .filter(p => activeCategory === 'ALL' || p.brand === activeCategory)
//     .slice(0, 6);

//   return (
//     <section className="w-full bg-[#fbfbfb] py-6 md:py-10 px-4 md:px-12 font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
//       <div className="w-full xl:max-w-[89%] mx-auto flex flex-col items-center">
        
//         <h2 className="text-2xl md:text-4xl font-serif font-medium text-[#111] mb-2 md:mb-4">Categories</h2>
//         <p className="text-gray-500 text-[10px] md:text-sm text-center max-w-xl mb-6 md:mb-10 leading-relaxed px-2">
//           Discover a wide range of premium products tailored precisely for your personal setup.
//         </p>

//         <div className="flex overflow-x-auto hide-scrollbar w-full max-w-6xl justify-start gap-3 md:gap-4 mb-8 md:mb-14 relative pb-2 md:pb-4 px-2 md:px-0">
//           <div className="flex gap-4 min-w-max">
//             {displayBrands.map((brandLabel) => (
//               <button
//                 key={brandLabel}
//                 onClick={() => setActiveCategory(brandLabel)}
//                 className={`px-6 py-2 rounded-md text-[10px] md:text-[11px] font-bold tracking-[0.15em] transition-all duration-300 uppercase shadow-sm cursor-pointer ${
//                   activeCategory === brandLabel || currentCategory === brandLabel
//                     ? 'bg-black text-white shadow-md'
//                     : 'bg-white text-gray-500 hover:text-black hover:bg-gray-50 border border-gray-100'
//                 }`}
//               >
//                 {brandLabel}
//               </button>
//             ))}
//           </div>
//         </div>

//         {loading ? (
//            <div className="flex justify-center items-center h-48"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div></div>
//         ) : (
//           <div className="w-full">
//             {/* Desktop Grid */}
//             <div className="hidden md:grid grid-cols-3 gap-x-6 gap-y-12 w-full mb-10 justify-items-center">
//               {displayProducts.map((p) => {
//                   const originalPrice = Number(p.price) || 0;
//                   const discount = Number(p.discountPrice) || 0;
//                   const finalPrice = originalPrice - discount;
//                   const savePercent = discount > 0 ? Math.round((discount / originalPrice) * 100) : 0;
//                   const imgSrc = getProductImg(p);

//                   return (
//                     <div key={p._id} className="bg-white w-full max-w-[340px] rounded-lg p-4 flex flex-col shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 cursor-pointer overflow-hidden border border-gray-50 relative" onClick={() => setQuickViewProduct(p)}>
                      
//                       {/* ⚡ FIX: Yahan se dark background hata kar sabko uniform bg-white de diya hai */}
//                       <div className="w-full h-[220px] rounded-md mb-5 flex items-center justify-center p-6 bg-white">
//                         <img src={imgSrc} alt={p.name} className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500" />
//                       </div>
                      
//                       <div className="flex flex-col flex-1 px-1">
//                         <h3 className="text-[12px] font-[800] text-[#111] tracking-wider uppercase mb-1 truncate">{p.category || p.name}</h3>
//                       </div>
//                     </div>
//                   );
//               })}
//             </div>

//             {/* Mobile Slider */}
//             <div className="block md:hidden w-full mb-6">
//               <Swiper modules={[Autoplay]} spaceBetween={20} slidesPerView={1.2} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }} className="w-full pb-8 pt-2">
//                 {displayProducts.map((p) => {
//                     const originalPrice = Number(p.price) || 0;
//                     const discount = Number(p.discountPrice) || 0;
//                     const finalPrice = originalPrice - discount;
//                     const savePercent = discount > 0 ? Math.round((discount / originalPrice) * 100) : 0;
//                     const imgSrc = getProductImg(p);

//                     return (
//                       <SwiperSlide key={p._id} className="flex justify-center">
//                         <div className="bg-white w-full cursor-pointer rounded-lg p-4 flex flex-col shadow-[0_2px_15px_rgb(0,0,0,0.06)] overflow-hidden border border-gray-50 relative" onClick={() => setQuickViewProduct(p)}>
                          
//                           {/* ⚡ FIX: Mobile view mein bhi dark background hataya */}
//                           <div className="w-full h-[200px] rounded-md mb-4 flex items-center justify-center p-6 bg-white">
//                             <img src={imgSrc} alt={p.name} className="max-w-full max-h-full object-contain" />
//                           </div>
                          
//                           <div className="flex flex-col flex-1 px-1">
//                             <h3 className="text-[11px] font-[800] text-[#111] tracking-wider uppercase mb-1 truncate">{p.category || p.name}</h3>
//                           </div>
//                         </div>
//                       </SwiperSlide>
//                     );
//                 })}
//               </Swiper>
//             </div>
//           </div>
//         )}

//         {!loading && (
//           <div className="flex justify-center w-full mt-2 md:mt-[-10px]">
//             <button onClick={() => navigate('/shop')} className="bg-black text-white text-[10px] md:text-[11px] font-[800] tracking-[0.2em] uppercase px-8 py-3 rounded-[6px] hover:bg-gray-800 transition-colors shadow-lg cursor-pointer">View More</button>
//           </div>
//         )}
//       </div>

//       {quickViewProduct && (
//         <QuickModel isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} product={quickViewProduct} />
//       )}
//     </section>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import QuickModel from '../Product/ProductDetailModel';

export default function CategoryShowcase() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const getProductImg = (p) => {
    if (p.variants?.[0]?.images?.[0]?.url) return p.variants[0].images[0].url;
    if (p.images?.[0]?.url) return p.images[0].url;
    return 'https://placehold.co/400x400/f9f9f9/C8A253?text=No+Image';
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get('/products');
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
    if (price === undefined || price === null) return '';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(price);
  };

  // ⚡ FIX: Sabhi brand names ko pehle uppercase kiya, aage-peeche ke spaces hataye (trim), phir unique Set banaya
  const availableBrands = ['ALL', ...new Set(
    products
      .map(p => p.brand ? p.brand.trim().toUpperCase() : null)
      .filter(Boolean)
  )];

  const displayBrands = products.length > 0 ? availableBrands : ['ALL', 'APPLE', 'SONY', 'MARSHALL', 'SAMSUNG', 'LOGITECH'];
  const currentCategory = activeCategory === 'ALL' && products.length > 0 ? availableBrands[0] : activeCategory;

  // ⚡ FIX: Filter karte waqt bhi product ke brand ko uppercase karke match karwaya
  const displayProducts = products
    .filter(p => activeCategory === 'ALL' || (p.brand && p.brand.trim().toUpperCase() === activeCategory))
    .slice(0, 6);

  return (
    <section className="w-full bg-[#fbfbfb] py-6 md:py-10 px-4 md:px-12 font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="w-full xl:max-w-[89%] mx-auto flex flex-col items-center">
        
        <h2 className="text-2xl md:text-4xl font-serif font-medium text-[#111] mb-2 md:mb-4">Categories</h2>
        <p className="text-gray-500 text-[10px] md:text-sm text-center max-w-xl mb-6 md:mb-10 leading-relaxed px-2">
          Discover a wide range of premium products tailored precisely for your personal setup.
        </p>

        <div className="flex overflow-x-auto hide-scrollbar w-full max-w-6xl justify-start gap-3 md:gap-4 mb-8 md:mb-14 relative pb-2 md:pb-4 px-2 md:px-0">
          <div className="flex gap-4 min-w-max">
            {displayBrands.map((brandLabel) => (
              <button
                key={brandLabel}
                onClick={() => setActiveCategory(brandLabel)}
                className={`px-6 py-2 rounded-md text-[10px] md:text-[11px] font-bold tracking-[0.15em] transition-all duration-300 uppercase shadow-sm cursor-pointer ${
                  activeCategory === brandLabel || currentCategory === brandLabel
                    ? 'bg-black text-white shadow-md'
                    : 'bg-white text-gray-500 hover:text-black hover:bg-gray-50 border border-gray-100'
                }`}
              >
                {brandLabel}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
           <div className="flex justify-center items-center h-48"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div></div>
        ) : (
          <div className="w-full">
            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-3 gap-x-6 gap-y-12 w-full mb-10 justify-items-center">
              {displayProducts.map((p) => {
                  const originalPrice = Number(p.price) || 0;
                  const discount = Number(p.discountPrice) || 0;
                  const finalPrice = originalPrice - discount;
                  const savePercent = discount > 0 ? Math.round((discount / originalPrice) * 100) : 0;
                  const imgSrc = getProductImg(p);

                  return (
                    <div key={p._id} className="bg-white w-full max-w-[340px] rounded-lg p-4 flex flex-col shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 cursor-pointer overflow-hidden border border-gray-50 relative" onClick={() => setQuickViewProduct(p)}>
                      
                      <div className="w-full h-[220px] rounded-md mb-5 flex items-center justify-center p-6 bg-white">
                        <img src={imgSrc} alt={p.name} className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500" />
                      </div>
                      
                      <div className="flex flex-col flex-1 px-1">
                        <h3 className="text-[12px] font-[800] text-[#111] tracking-wider uppercase mb-1 truncate">{p.category || p.name}</h3>
                      </div>
                    </div>
                  );
              })}
            </div>

            {/* Mobile Slider */}
            <div className="block md:hidden w-full mb-6">
              <Swiper modules={[Autoplay]} spaceBetween={20} slidesPerView={1.2} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }} className="w-full pb-8 pt-2">
                {displayProducts.map((p) => {
                    const originalPrice = Number(p.price) || 0;
                    const discount = Number(p.discountPrice) || 0;
                    const finalPrice = originalPrice - discount;
                    const savePercent = discount > 0 ? Math.round((discount / originalPrice) * 100) : 0;
                    const imgSrc = getProductImg(p);

                    return (
                      <SwiperSlide key={p._id} className="flex justify-center">
                        <div className="bg-white w-full cursor-pointer rounded-lg p-4 flex flex-col shadow-[0_2px_15px_rgb(0,0,0,0.06)] overflow-hidden border border-gray-50 relative" onClick={() => setQuickViewProduct(p)}>
                          
                          <div className="w-full h-[200px] rounded-md mb-4 flex items-center justify-center p-6 bg-white">
                            <img src={imgSrc} alt={p.name} className="max-w-full max-h-full object-contain" />
                          </div>
                          
                          <div className="flex flex-col flex-1 px-1">
                            <h3 className="text-[11px] font-[800] text-[#111] tracking-wider uppercase mb-1 truncate">{p.category || p.name}</h3>
                          </div>
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
          <button onClick={() => navigate('/shop')} className="bg-black text-white text-[10px] md:text-[11px] font-[800] tracking-[0.2em] uppercase px-8 py-3 rounded-[6px] hover:bg-gray-800 transition-colors shadow-lg cursor-pointer">View More</button>
            {/* <button onClick={() => navigate('/shop')} className="bg-black text-white text-[10px] md:text-[11px] font-[800] tracking-[0.2em] uppercase px-8 py-3 rounded-[6px] hover:bg-gray-800 transition-colors shadow-lg cursor-pointer">View More</button> */}
          </div>
        )}
      </div>

      {quickViewProduct && (
        <QuickModel isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} product={quickViewProduct} />
      )}
    </section>
  );
}



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import QuickModel from '../Product/ProductDetailModel';

// export default function CategoryShowcase() {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [activeCategory, setActiveCategory] = useState('ALL');
//   const [loading, setLoading] = useState(true);
//   const [quickViewProduct, setQuickViewProduct] = useState(null);

//   const getProductImg = (p) => {
//     if (p.variants?.[0]?.images?.[0]?.url) return p.variants[0].images[0].url;
//     if (p.images?.[0]?.url) return p.images[0].url;
//     return 'https://placehold.co/400x400/f9f9f9/C8A253?text=No+Image';
//   };

//   // ⚡ FIX: Variants se dynamic colors nikalne ka function
//   const getAvailableColors = (p) => {
//     if (p.variants && p.variants.length > 0) {
//       // Assuming aapke variant object me 'colorCode' ya 'color' key hai (e.g. '#000000' or 'black')
//       const colors = p.variants
//         .map(v => v.colorCode || v.color)
//         .filter(Boolean);
//       return [...new Set(colors)]; // Unique colors only
//     }
//     return [];
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axiosInstance.get('/products');
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
//     if (price === undefined || price === null) return '';
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency', currency: 'INR', maximumFractionDigits: 0
//     }).format(price);
//   };

//   const availableBrands = ['ALL', ...new Set(
//     products
//       .map(p => p.brand ? p.brand.trim().toUpperCase() : null)
//       .filter(Boolean)
//   )];

//   const displayBrands = products.length > 0 ? availableBrands : ['ALL', 'APPLE', 'SONY', 'MARSHALL', 'SAMSUNG', 'LOGITECH'];
//   const currentCategory = activeCategory === 'ALL' && products.length > 0 ? availableBrands[0] : activeCategory;

//   const displayProducts = products
//     .filter(p => activeCategory === 'ALL' || (p.brand && p.brand.trim().toUpperCase() === activeCategory))
//     .slice(0, 6);

//   return (
//     <section className="w-full bg-[#fbfbfb] py-6 md:py-10 px-4 md:px-12 font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
//       <div className="w-full xl:max-w-[89%] mx-auto flex flex-col items-center">
        
//         <h2 className="text-2xl md:text-4xl font-serif font-medium text-[#111] mb-2 md:mb-4">Categories</h2>
//         <p className="text-gray-500 text-[10px] md:text-sm text-center max-w-xl mb-6 md:mb-10 leading-relaxed px-2">
//           Discover a wide range of premium products tailored precisely for your personal setup.
//         </p>

//         <div className="flex overflow-x-auto hide-scrollbar w-full max-w-6xl justify-start gap-3 md:gap-4 mb-8 md:mb-10 relative pb-2 md:pb-4 px-2 md:px-0">
//           <div className="flex gap-4 min-w-max">
//             {displayBrands.map((brandLabel) => (
//               <button
//                 key={brandLabel}
//                 onClick={() => setActiveCategory(brandLabel)}
//                 className={`px-6 py-2 rounded-md text-[10px] md:text-[11px] font-bold tracking-[0.15em] transition-all duration-300 uppercase shadow-sm cursor-pointer ${
//                   activeCategory === brandLabel || currentCategory === brandLabel
//                     ? 'bg-black text-white shadow-md'
//                     : 'bg-white text-gray-500 hover:text-black hover:bg-gray-50 border border-gray-200'
//                 }`}
//               >
//                 {brandLabel}
//               </button>
//             ))}
//           </div>
//         </div>

//         {loading ? (
//            <div className="flex justify-center items-center h-48"><div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div></div>
//         ) : (
//           <div className="w-full">
//             {/* Desktop Grid */}
//             <div className="hidden md:grid grid-cols-3 gap-x-6 gap-y-10 w-full mb-10 justify-items-center">
//               {displayProducts.map((p) => {
//                   const originalPrice = Number(p.price) || 0;
//                   const discount = Number(p.discountPrice) || 0;
//                   const finalPrice = originalPrice - discount;
//                   const imgSrc = getProductImg(p);
//                   const availableColors = getAvailableColors(p);

//                   return (
//                     // Card Styling: Shadow increased (shadow-md) and Hover Shadow increased (shadow-2xl)
//                     <div key={p._id} className="bg-white w-full max-w-[320px] rounded-lg p-4 flex flex-col shadow-md hover:shadow-2xl transition-shadow duration-300 border border-gray-100 relative">
                      
//                       {/* Image - Height reduced (h-[160px]) */}
//                       <div className="w-full h-[160px] mb-3 flex items-center justify-center cursor-pointer bg-white" onClick={() => setQuickViewProduct(p)}>
//                         <img src={imgSrc} alt={p.name} className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300" />
//                       </div>

//                       {/* Dynamic Color Swatches */}
                   
                      
//                       {/* Product Details */}
//                       <div className="flex flex-col flex-1 px-1">
//                         <h3 
//                           className="text-[13px] font-normal text-gray-800 leading-snug mb-2 line-clamp-2 cursor-pointer hover:underline h-10" 
//                           onClick={() => setQuickViewProduct(p)}
//                         >
//                           {p.name || p.category}
//                         </h3>
                        
//                         {/* Price */}
//                         <div className="text-[17px] font-bold text-black mb-1">
//                           {formatPrice(finalPrice)}
//                         </div>
                        
//                         {/* EMI Text
//                         <p className="text-[10px] text-gray-400 mb-4">
//                           Starting ₹300/mo or 0% APR */}
//                         {/* </p> */}

//                         {/* CTA Button - Black background */}
//                         <button className="w-full bg-black hover:bg-gray-800 text-white text-xs font-bold py-2.5 rounded transition-colors uppercase mt-auto shadow-sm" onClick={() => navigate('/cart')}>
//                           ADD TO CART
//                         </button>
//                       </div>
//                     </div>
//                   );
//               })}
//             </div>

//             {/* Mobile Slider */}
//             <div className="block md:hidden w-full mb-6">
//               <Swiper modules={[Autoplay]} spaceBetween={16} slidesPerView={1.2} loop={true} autoplay={{ delay: 3000, disableOnInteraction: false }} className="w-full pb-8 pt-2">
//                 {displayProducts.map((p) => {
//                     const originalPrice = Number(p.price) || 0;
//                     const discount = Number(p.discountPrice) || 0;
//                     const finalPrice = originalPrice - discount;
//                     const imgSrc = getProductImg(p);
//                     const availableColors = getAvailableColors(p);

//                     return (
//                       <SwiperSlide key={p._id} className="flex justify-center h-auto">
//                         <div className="bg-white w-full rounded-lg p-4 flex flex-col shadow-md border border-gray-100 h-full">
                          
//                           {/* Image */}
//                           <div className="w-full h-[150px] mb-3 flex items-center justify-center cursor-pointer bg-white" onClick={() => setQuickViewProduct(p)}>
//                             <img src={imgSrc} alt={p.name} className="max-w-full max-h-full object-contain" />
//                           </div>

//                           {/* Dynamic Color Swatches */}
//                           {availableColors.length > 0 ? (
//                             <div className="flex justify-center items-center gap-1.5 mb-3 h-3">
//                               {availableColors.map((colorVal, idx) => (
//                                 <div 
//                                   key={idx} 
//                                   className="w-3 h-3 rounded-full border border-gray-300"
//                                   style={{ backgroundColor: colorVal }}
//                                 ></div>
//                               ))}
//                             </div>
//                           ) : (
//                             <div className="h-3 mb-3"></div>
//                           )}
                          
//                           {/* Product Details */}
//                           <div className="flex flex-col flex-1">
//                             <h3 className="text-[12px] font-normal text-gray-800 leading-snug mb-2 line-clamp-2 min-h-[36px]" onClick={() => setQuickViewProduct(p)}>
//                               {p.name || p.category}
//                             </h3>
                            
//                             <div className="text-[15px] font-bold text-black mb-1">
//                               {formatPrice(finalPrice)}
//                             </div>
                            
//                             <p className="text-[9px] text-gray-400 mb-3">
//                               Starting ₹300/mo or 0% APR
//                             </p>

//                             <button className="w-full bg-black text-white text-[10px] font-bold py-2 rounded mt-auto uppercase shadow-sm">
//                               ADD TO CART
//                             </button>
//                           </div>
//                         </div>
//                       </SwiperSlide>
//                     );
//                 })}
//               </Swiper>
//             </div>
//           </div>
//         )}

//         {!loading && (
//           <div className="flex justify-center w-full mt-2 md:mt-4">
//             <button onClick={() => navigate('/shop')} className="bg-white text-gray-800 border border-gray-300 text-[10px] md:text-[12px] font-bold px-8 py-3 rounded-md hover:bg-gray-50 hover:shadow-md transition-all duration-300 cursor-pointer">
//               See similar products
//             </button>
//           </div>
//         )}
//       </div>

//       {quickViewProduct && (
//         <QuickModel isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} product={quickViewProduct} />
//       )}
//     </section>
//   );
// }
// // import React from 'react';

// // export default function ShopProductCard({ product, onQuickView }) {
// //   if (!product) return null;

// //   // ── Pricing & Discount Logic ──
// //   const isDealActive = product?.flashDeal?.isActive && new Date(product.flashDeal.endTime).getTime() > Date.now();
// //   const originalPrice = product.price || 0;
// //   const finalPrice = isDealActive ? product.flashDeal.dealPrice : originalPrice - (product.discountPrice || 0);
  
// //   const hasDiscount = originalPrice > finalPrice && originalPrice > 0;
// //   const discountPercent = hasDiscount ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100) : 0;

// //   // ── Stock Logic ──
// //   const isOutOfStock = product.stock <= 0 && (!product.variants || !product.variants.some(v => v.stock > 0));

// //   // ── Image Getter ──
// //   const getProductImg = (p) => {
// //     if (p?.variants?.[0]?.images?.[0]?.url) return p.variants[0].images[0].url;
// //     if (p?.images?.[0]?.url) return p.images[0].url;
// //     return 'https://placehold.co/400x400/f5f5f5/cccccc?text=No+Image'; 
// //   };

// //   // ── Price Formatter (No Decimals) ──
// //   const formatPrice = (price) => {
// //     if (price === undefined || price === null) return '';
// //     return new Intl.NumberFormat('en-IN', {
// //       style: 'currency',
// //       currency: 'INR',
// //       maximumFractionDigits: 0 
// //     }).format(price);
// //   };

// //   const imgSrc = getProductImg(product);

// //   return (
// //     <div
// //       // ⚡ FIX: Changed text-left to text-center, added items-center for flex alignment
// //       className="w-full flex flex-col items-center group cursor-pointer text-center mb-6"
// //       onClick={() => onQuickView(product)}
// //     >
// //       {/* 1. Image Container (Centering logic within remains same) */}
// //       <div className="w-full aspect-square bg-[#f8f8f8] flex items-center justify-center mb-3.5 relative overflow-hidden rounded-sm">
        
// //         {/* Badges (Absolute positioning stays relative to image box) */}
// //         {isOutOfStock ? (
// //           <span className="absolute top-2.5 left-2.5 bg-[#e42222] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full z-10 tracking-wide">
// //             Sold out
// //           </span>
// //         ) : hasDiscount ? (
// //           <span className="absolute top-2.5 left-2.5 bg-[#3a8b76] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full z-10 tracking-wide">
// //             Save {discountPercent}%
// //           </span>
// //         ) : null}

// //         <img
// //           src={imgSrc}
// //           alt={product?.name}
// //           // Image centering inherited from parent flex
// //           className={`max-w-[85%] max-h-[85%] object-contain transition-transform duration-700 mix-blend-multiply ${!isOutOfStock ? 'group-hover:scale-105' : 'opacity-70'}`}
// //         />
// //       </div>

// //       {/* 2. Price Section */}
// //       <div className="flex items-center justify-center gap-2 mb-1.5 w-full">
// //         <span className={`text-[13px] font-bold ${hasDiscount ? 'text-[#3a8b76]' : 'text-[#333]'}`}>
// //           {formatPrice(finalPrice)}
// //         </span>
        
// //         {hasDiscount && (
// //           <span className="text-[12px] font-medium text-gray-400 line-through">
// //             {formatPrice(originalPrice)}
// //           </span>
// //         )}
// //       </div>

// //       {/* 3. Title Section */}
// //       {/* ⚡ Inherits text-center from outermost div */}
// //       <h3 className="text-[13px] font-medium text-[#111] leading-snug line-clamp-2 px-1">
// //         {product?.name || 'PRODUCT'}
// //       </h3>
      
// //     </div>
// //   );
// // }

// import React from 'react';

// export default function ShopProductCard({ product, onQuickView }) {
//   if (!product) return null;

//   // ── Pricing & Discount Logic ──
//   const isDealActive = product?.flashDeal?.isActive && new Date(product.flashDeal.endTime).getTime() > Date.now();
//   const originalPrice = product.price || 0;
//   const finalPrice = isDealActive ? product.flashDeal.dealPrice : originalPrice - (product.discountPrice || 0);
  
//   const hasDiscount = originalPrice > finalPrice && originalPrice > 0;
//   const discountPercent = hasDiscount ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100) : 0;

//   // ── Stock Logic ──
//   const isOutOfStock = product.stock <= 0 && (!product.variants || !product.variants.some(v => v.stock > 0));

//   // ── Image Getter ──
//   const getProductImg = (p) => {
//     if (p?.variants?.[0]?.images?.[0]?.url) return p.variants[0].images[0].url;
//     if (p?.images?.[0]?.url) return p.images[0].url;
//     return 'https://placehold.co/400x400/f5f5f5/cccccc?text=No+Image'; 
//   };

//   // ── Price Formatter (No Decimals) ──
//   const formatPrice = (price) => {
//     if (price === undefined || price === null) return '';
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0 
//     }).format(price);
//   };

//   const imgSrc = getProductImg(product);

//   return (
//     <div
//       className="w-full h-full flex flex-col items-center group cursor-pointer text-center mb-6"
//       onClick={() => onQuickView(product)}
//     >
//       {/* 1. Image Container (Balanced Size) */}
//       <div className="w-full h-[260px] min-h-[260px] max-h-[260px] shrink-0 bg-[#f8f8f8] flex items-center justify-center mb-4 relative overflow-hidden rounded-sm p-4">
        
//         {/* Badges */}
//         {isOutOfStock ? (
//           <span className="absolute top-2.5 left-2.5 bg-[#e42222] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full z-10 tracking-wide">
//             Sold out
//           </span>
//         ) : hasDiscount ? (
//           <span className="absolute top-2.5 left-2.5 bg-[#3a8b76] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full z-10 tracking-wide">
//             Save {discountPercent}%
//           </span>
//         ) : null}

//         {/* Removed forced scale, using natural w-full h-full */}
//         <img
//           src={imgSrc}
//           alt={product?.name}
//           className={`w-full h-full object-contain transition-transform duration-700 mix-blend-multiply ${!isOutOfStock ? 'group-hover:scale-110' : 'opacity-70'}`}
//         />
//       </div>

//       {/* 2. Price Section */}
//       <div className="flex items-center justify-center gap-2 mb-2 w-full mt-auto">
//         <span className={`text-[14px] font-bold ${hasDiscount ? 'text-[#3a8b76]' : 'text-[#333]'}`}>
//           {formatPrice(finalPrice)}
//         </span>
        
//         {hasDiscount && (
//           <span className="text-[12px] font-medium text-gray-400 line-through">
//             {formatPrice(originalPrice)}
//           </span>
//         )}
//       </div>

//       {/* 3. Title Section */}
//       <h3 className="text-[14px] font-medium text-[#111] leading-snug line-clamp-2 px-1">
//         {product?.name || 'PRODUCT'}
//       </h3>
      
//     </div>
//   );
// }

// import React from 'react';

// export default function ShopProductCard({ product, onQuickView }) {
//   if (!product) return null;

//   // ── Pricing & Discount Logic ──
//   const isDealActive = product?.flashDeal?.isActive && new Date(product.flashDeal.endTime).getTime() > Date.now();
//   const originalPrice = product.price || 0;
//   const finalPrice = isDealActive ? product.flashDeal.dealPrice : originalPrice - (product.discountPrice || 0);
  
//   const hasDiscount = originalPrice > finalPrice && originalPrice > 0;
//   const discountPercent = hasDiscount ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100) : 0;

//   // ── Stock Logic ──
//   const isOutOfStock = product.stock <= 0 && (!product.variants || !product.variants.some(v => v.stock > 0));

//   // ── Image Getter ──
//   const getProductImg = (p) => {
//     if (p?.variants?.[0]?.images?.[0]?.url) return p.variants[0].images[0].url;
//     if (p?.images?.[0]?.url) return p.images[0].url;
//     return 'https://placehold.co/400x400/f5f5f5/cccccc?text=No+Image'; 
//   };

//   // ── Price Formatter (No Decimals) ──
//   const formatPrice = (price) => {
//     if (price === undefined || price === null) return '';
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0 
//     }).format(price);
//   };

//   const imgSrc = getProductImg(product);

//   return (
//     <div
//       className="w-full h-full flex flex-col items-center group cursor-pointer text-center mb-6"
//       // ⚡ WAPAS SAHI KAR DIYA: Ab ye naye page par nahi jayega, balki tumhara Quick View Modal hi kholega!
//       onClick={() => onQuickView(product)}
//     >
//       {/* 1. Image Container (Balanced Size) */}
//       <div className="w-full h-[260px] min-h-[260px] max-h-[260px] shrink-0 bg-[#f8f8f8] flex items-center justify-center mb-4 relative overflow-hidden rounded-sm p-4">
        
//         {/* Badges */}
//         {isOutOfStock ? (
//           <span className="absolute top-2.5 left-2.5 bg-[#e42222] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full z-10 tracking-wide">
//             Sold out
//           </span>
//         ) : hasDiscount ? (
//           <span className="absolute top-2.5 left-2.5 bg-[#3a8b76] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full z-10 tracking-wide">
//             Save {discountPercent}%
//           </span>
//         ) : null}

//         {/* Removed forced scale, using natural w-full h-full */}
//         <img
//           src={imgSrc}
//           alt={product?.name}
//           className={`w-full h-full object-contain transition-transform duration-700 mix-blend-multiply ${!isOutOfStock ? 'group-hover:scale-110' : 'opacity-70'}`}
//         />
//       </div>

//       {/* 2. Price Section */}
//       <div className="flex items-center justify-center gap-2 mb-2 w-full mt-auto">
//         <span className={`text-[14px] font-bold ${hasDiscount ? 'text-[#3a8b76]' : 'text-[#333]'}`}>
//           {formatPrice(finalPrice)}
//         </span>
        
//         {hasDiscount && (
//           <span className="text-[12px] font-medium text-gray-400 line-through">
//             {formatPrice(originalPrice)}
//           </span>
//         )}
//       </div>

//       {/* 3. Title Section */}
//       <h3 className="text-[14px] font-medium text-[#111] leading-snug line-clamp-2 px-1">
//         {product?.name || 'PRODUCT'}
//       </h3>
      
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import { Heart } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance';
// import { useAuth } from '../../context/AuthContext';

// export default function ShopProductCard({ product, onQuickView }) {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   if (!product) return null;

//   // ── Pricing & Discount Logic ──
//   const isDealActive = product?.flashDeal?.isActive && new Date(product.flashDeal.endTime).getTime() > Date.now();
//   const originalPrice = product.price || 0;
//   const finalPrice = isDealActive ? product.flashDeal.dealPrice : originalPrice - (product.discountPrice || 0);
  
//   const hasDiscount = originalPrice > finalPrice && originalPrice > 0;
//   const discountPercent = hasDiscount ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100) : 0;
//   const isOutOfStock = product.stock <= 0 && (!product.variants || !product.variants.some(v => v.stock > 0));

//   const getProductImg = (p) => {
//     if (p?.variants?.[0]?.images?.[0]?.url) return p.variants[0].images[0].url;
//     if (p?.images?.[0]?.url) return p.images[0].url;
//     return 'https://placehold.co/400x400/f5f5f5/cccccc?text=No+Image'; 
//   };

//   const formatPrice = (price) => {
//     if (price === undefined || price === null) return '';
//     return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
//   };

//   const imgSrc = getProductImg(product);

//   const handleWishlistToggle = async (e) => {
//     e.stopPropagation(); 
//     if (!user) {
//       navigate('/login');
//       return;
//     }
//     setIsWishlisted(!isWishlisted);
//     try {
//       await axiosInstance.post('/wishlist/toggle', { productId: product._id });
//     } catch (error) {
//       console.error('Wishlist error', error);
//       setIsWishlisted(!isWishlisted);
//     }
//   };

//   return (
//     <div
//       className="w-full h-full flex flex-col items-center cursor-pointer text-center mb-6 relative group"
//       onClick={() => onQuickView(product)}
//     >
//       <div className="w-full h-[260px] min-h-[260px] max-h-[260px] shrink-0 bg-[#f8f8f8] flex items-center justify-center mb-4 relative overflow-hidden rounded-sm p-4">
        
//         {/* Badges */}
//         {isOutOfStock ? (
//           <span className="absolute top-2.5 left-2.5 bg-[#e42222] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full z-10 tracking-wide">Sold out</span>
//         ) : hasDiscount ? (
//           <span className="absolute top-2.5 left-2.5 bg-[#3a8b76] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full z-10 tracking-wide">Save {discountPercent}%</span>
//         ) : null}

//         {/* ⚡ PERMANENTLY VISIBLE MINIMALIST HEART ICON */}
//         <button 
//           onClick={handleWishlistToggle}
//           className="absolute top-2.5 right-2.5 z-30 p-1.5 bg-white/80 rounded-full shadow-sm transition-transform duration-200 active:scale-90"
//           aria-label="Add to wishlist"
//         >
//           <Heart 
//             size={14} 
//             color={isWishlisted ? "#ef4444" : "#333"} 
//             fill={isWishlisted ? "#ef4444" : "none"} 
//             strokeWidth={2.5} 
//           />
//         </button>

//         <img
//           src={imgSrc}
//           alt={product?.name}
//           className={`w-full h-full object-contain transition-transform duration-700 mix-blend-multiply ${!isOutOfStock ? 'group-hover:scale-110' : 'opacity-70'}`}
//         />
//       </div>

//       <div className="flex items-center justify-center gap-2 mb-2 w-full mt-auto">
//         <span className={`text-[14px] font-bold ${hasDiscount ? 'text-[#3a8b76]' : 'text-[#333]'}`}>
//           {formatPrice(finalPrice)}
//         </span>
//         {hasDiscount && (
//           <span className="text-[12px] font-medium text-gray-400 line-through">{formatPrice(originalPrice)}</span>
//         )}
//       </div>

//       <h3 className="text-[14px] font-medium text-[#111] leading-snug line-clamp-2 px-1">
//         {product?.name || 'PRODUCT'}
//       </h3>
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import { Heart } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance';
// import { useAuth } from '../../context/AuthContext';

// export default function ShopProductCard({ product, onQuickView }) {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   if (!product) return null;

//   // ── Pricing & Discount Logic ──
//   const isDealActive = product?.flashDeal?.isActive && new Date(product.flashDeal.endTime).getTime() > Date.now();
//   const originalPrice = product.price || 0;
//   const finalPrice = isDealActive ? product.flashDeal.dealPrice : originalPrice - (product.discountPrice || 0);
  
//   const hasDiscount = originalPrice > finalPrice && originalPrice > 0;
//   const discountPercent = hasDiscount ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100) : 0;
//   const isOutOfStock = product.stock <= 0 && (!product.variants || !product.variants.some(v => v.stock > 0));

//   const getProductImg = (p) => {
//     if (p?.variants?.[0]?.images?.[0]?.url) return p.variants[0].images[0].url;
//     if (p?.images?.[0]?.url) return p.images[0].url;
//     return 'https://placehold.co/400x400/f5f5f5/cccccc?text=No+Image'; 
//   };

//   const formatPrice = (price) => {
//     if (price === undefined || price === null) return '';
//     return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
//   };

//   const imgSrc = getProductImg(product);

//   const handleWishlistToggle = async (e) => {
//     e.stopPropagation(); 
//     if (!user) {
//       navigate('/login');
//       return;
//     }
//     setIsWishlisted(!isWishlisted);
//     try {
//       await axiosInstance.post('/wishlist/toggle', { productId: product._id });
//     } catch (error) {
//       console.error('Wishlist error', error);
//       setIsWishlisted(!isWishlisted);
//     }
//   };

//   return (
//     <div
//       className="w-full h-full flex flex-col items-center cursor-pointer text-center mb-6 relative group"
//       onClick={() => onQuickView(product)}
//     >
//       <div className="w-full h-[260px] min-h-[260px] max-h-[260px] shrink-0 bg-[#f8f8f8] flex items-center justify-center mb-4 relative overflow-hidden rounded-sm p-4">
        
//         {/* Badges */}
//         {isOutOfStock ? (
//           <span className="absolute top-2.5 left-2.5 bg-[#e42222] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full z-10 tracking-wide">Sold out</span>
//         ) : hasDiscount ? (
//           <span className="absolute top-2.5 left-2.5 bg-[#3a8b76] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full z-10 tracking-wide">Save {discountPercent}%</span>
//         ) : null}

//         {/* ⚡ SIRF HOVER PE VISIBLE HEART ICON */}
//         <button 
//           onClick={handleWishlistToggle}
//           className="absolute top-2.5 right-2.5 z-30 p-1.5 bg-white/80 rounded-full shadow-sm transition-all duration-200 active:scale-90 opacity-0 group-hover:opacity-100"
//           aria-label="Add to wishlist"
//         >
//           <Heart 
//             size={14} 
//             color={isWishlisted ? "#ef4444" : "#333"} 
//             fill={isWishlisted ? "#ef4444" : "none"} 
//             strokeWidth={2.5} 
//           />
//         </button>

//         <img
//           src={imgSrc}
//           alt={product?.name}
//           className={`w-full h-full object-contain transition-transform duration-700 mix-blend-multiply ${!isOutOfStock ? 'group-hover:scale-110' : 'opacity-70'}`}
//         />
//       </div>

//       <div className="flex items-center justify-center gap-2 mb-2 w-full mt-auto">
//         <span className={`text-[14px] font-bold ${hasDiscount ? 'text-[#3a8b76]' : 'text-[#333]'}`}>
//           {formatPrice(finalPrice)}
//         </span>
//         {hasDiscount && (
//           <span className="text-[12px] font-medium text-gray-400 line-through">{formatPrice(originalPrice)}</span>
//         )}
//       </div>

//       <h3 className="text-[14px] font-medium text-[#111] leading-snug line-clamp-2 px-1">
//         {product?.name || 'PRODUCT'}
//       </h3>
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import { Heart } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance';
// import { useAuth } from '../../context/AuthContext';

// export default function ShopProductCard({ product, onQuickView }) {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   if (!product) return null;

//   // ── Pricing & Discount Logic ──
//   const isDealActive = product?.flashDeal?.isActive && new Date(product.flashDeal.endTime).getTime() > Date.now();
//   const originalPrice = product.price || 0;
//   const finalPrice = isDealActive ? product.flashDeal.dealPrice : originalPrice - (product.discountPrice || 0);
  
//   const hasDiscount = originalPrice > finalPrice && originalPrice > 0;
//   const discountPercent = hasDiscount ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100) : 0;
//   const isOutOfStock = product.stock <= 0 && (!product.variants || !product.variants.some(v => v.stock > 0));

//   const getProductImg = (p) => {
//     if (p?.variants?.[0]?.images?.[0]?.url) return p.variants[0].images[0].url;
//     if (p?.images?.[0]?.url) return p.images[0].url;
//     return 'https://placehold.co/400x400/f5f5f5/cccccc?text=No+Image'; 
//   };

//   const formatPrice = (price) => {
//     if (price === undefined || price === null) return '';
//     return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
//   };

//   const imgSrc = getProductImg(product);

//   const handleWishlistToggle = async (e) => {
//     e.stopPropagation(); 
//     if (!user) {
//       navigate('/login');
//       return;
//     }
//     setIsWishlisted(!isWishlisted);
//     try {
//       await axiosInstance.post('/wishlist/toggle', { productId: product._id });
//     } catch (error) {
//       console.error('Wishlist error', error);
//       setIsWishlisted(!isWishlisted);
//     }
//   };

//   return (
//     <div
//       className="w-full h-full flex flex-col items-center cursor-pointer text-center mb-6 relative group"
//       onClick={() => onQuickView(product)}
//     >
//       <div className="w-full h-[260px] min-h-[260px] max-h-[260px] shrink-0 bg-[#f8f8f8] flex items-center justify-center mb-4 relative overflow-hidden rounded-sm p-4">
        
//         {/* Badges */}
//         {isOutOfStock ? (
//           <span className="absolute top-2.5 left-2.5 bg-[#e42222] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full z-10 tracking-wide">Sold out</span>
//         ) : hasDiscount ? (
//           <span className="absolute top-2.5 left-2.5 bg-[#3a8b76] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full z-10 tracking-wide">Save {discountPercent}%</span>
//         ) : null}

//         {/* ⚡ SMART HEART ICON: Mobile/iPad pe hamesha dikhega, Laptop pe hover karne pe aayega */}
//         <button 
//           onClick={handleWishlistToggle}
//           className="absolute top-2.5 right-2.5 z-30 p-1.5 bg-white/80 rounded-full shadow-sm transition-all duration-200 active:scale-90 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
//           aria-label="Add to wishlist"
//         >
//           <Heart 
//             size={14} 
//             color={isWishlisted ? "#ef4444" : "#333"} 
//             fill={isWishlisted ? "#ef4444" : "none"} 
//             strokeWidth={2.5} 
//           />
//         </button>

//         <img
//           src={imgSrc}
//           alt={product?.name}
//           className={`w-full h-full object-contain transition-transform duration-700 mix-blend-multiply ${!isOutOfStock ? 'group-hover:scale-110' : 'opacity-70'}`}
//         />
//       </div>

//       <div className="flex items-center justify-center gap-2 mb-2 w-full mt-auto">
//         <span className={`text-[14px] font-bold ${hasDiscount ? 'text-[#3a8b76]' : 'text-[#333]'}`}>
//           {formatPrice(finalPrice)}
//         </span>
//         {hasDiscount && (
//           <span className="text-[12px] font-medium text-gray-400 line-through">{formatPrice(originalPrice)}</span>
//         )}
//       </div>

//       <h3 className="text-[14px] font-medium text-[#111] leading-snug line-clamp-2 px-1">
//         {product?.name || 'PRODUCT'}
//       </h3>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { Heart, Share2, MessageCircle, Facebook, Twitter, Send, Mail, Link2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { useAuth } from '../../context/AuthContext';

export default function ShopProductCard({ product, onQuickView }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  if (!product) return null;

  const isDealActive = product?.flashDeal?.isActive && new Date(product.flashDeal.endTime).getTime() > Date.now();
  const originalPrice = product.price || 0;
  const finalPrice = isDealActive ? product.flashDeal.dealPrice : originalPrice - (product.discountPrice || 0);
  
  const hasDiscount = originalPrice > finalPrice && originalPrice > 0;
  const discountPercent = hasDiscount ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100) : 0;
  const isOutOfStock = product.stock <= 0 && (!product.variants || !product.variants.some(v => v.stock > 0));

  const getProductImg = (p) => {
    if (p?.variants?.[0]?.images?.[0]?.url) return p.variants[0].images[0].url;
    if (p?.images?.[0]?.url) return p.images[0].url;
    return 'https://placehold.co/400x400/f5f5f5/cccccc?text=No+Image'; 
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null) return '';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  const imgSrc = getProductImg(product);

  const handleWishlistToggle = async (e) => {
    e.stopPropagation(); 
    if (!user) {
      navigate('/login');
      return;
    }
    setIsWishlisted(!isWishlisted);
    try {
      await axiosInstance.post('/wishlist/toggle', { productId: product._id });
    } catch (error) {
      console.error('Wishlist error', error);
      setIsWishlisted(!isWishlisted);
    }
  };

  // ⚡ SMART SHARE LOGIC
  const handleShareClick = async (e) => {
    e.stopPropagation(); 

    if (!user) {
      alert("Please login to share this exclusive product with your network.");
      navigate('/login'); 
      return;
    }

    const productUrl = `${window.location.origin}/product/${product._id}`;
    const shareData = {
      title: `Truee Luxury - ${product.name}`,
      text: `Check out this premium ${product.name} on Truee Luxury!`,
      url: productUrl,
    };

    // 1. Agar browser share support karta hai (Chrome, Edge, Safari, Mobile)
    if (navigator.share) {
      try {
        await navigator.share(shareData); // Ye line image_199ac4.jpg wala popup layegi
      } catch (err) {
        if (err.name !== 'AbortError') {
          // Firefox ya unsupported browser me Error aane par Custom menu kholo
          setShowShareMenu(!showShareMenu);
        }
      }
    } else {
      // 2. Agar browser share API ko pehchanta hi nahi hai (Firefox Desktop)
      setShowShareMenu(!showShareMenu);
    }
  };

  const shareToPlatform = (e, platform) => {
    e.stopPropagation();
    const productUrl = `${window.location.origin}/product/${product._id}`;
    const text = `Check out this premium ${product.name} on Truee Luxury!`;

    let url = '';
    switch(platform) {
      case 'whatsapp': 
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + '\n\n' + productUrl)}`; break;
      case 'facebook': 
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`; break;
      case 'twitter': 
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(text)}`; break;
      case 'telegram': 
        url = `https://t.me/share/url?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(text)}`; break;
      default: return;
    }

    window.open(url, '_blank', 'width=600,height=500');
    setShowShareMenu(false);
  };

  const copyLink = (e) => {
    e.stopPropagation();
    const productUrl = `${window.location.origin}/product/${product._id}`;
    navigator.clipboard.writeText(productUrl);
    setIsCopied(true);
    setShowShareMenu(false);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div
      className="w-full h-full flex flex-col items-center cursor-pointer text-center mb-6 relative group"
      onClick={() => onQuickView(product)}
      onMouseLeave={() => setShowShareMenu(false)}
    >
      <div className="w-full h-[260px] min-h-[260px] max-h-[260px] shrink-0 bg-[#f8f8f8] flex items-center justify-center mb-4 relative overflow-hidden rounded-sm p-4">
        
        {isOutOfStock ? (
          <span className="absolute top-2.5 left-2.5 bg-[#e42222] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full z-10 tracking-wide">Sold out</span>
        ) : hasDiscount ? (
          <span className="absolute top-2.5 left-2.5 bg-[#3a8b76] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full z-10 tracking-wide">Save {discountPercent}%</span>
        ) : null}

        <div className="absolute top-2.5 right-2.5 z-40 flex flex-col gap-1.5 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300">
          
          <div className="relative flex justify-center">
            <button 
              onClick={handleShareClick}
              className="p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-all duration-200 active:scale-90 flex items-center justify-center"
              title="Share Product"
            >
              <Share2 size={14} color="#333" strokeWidth={2.5} />
            </button>

            {/* 🔥 FIREFOX BACKUP MENU */}
            {showShareMenu && (
              <div 
                className="absolute top-0 right-8 bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden animate-fade-in-left border border-gray-100 w-40 z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-3 py-2 border-b border-gray-50 bg-gray-50/50">
                   <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Share via</span>
                </div>
                <button onClick={(e) => shareToPlatform(e, 'whatsapp')} className="px-4 py-2 text-[11px] font-semibold text-gray-700 hover:text-black hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50">
                  <MessageCircle size={14} className="text-[#25D366]" /> WhatsApp
                </button>
                <button onClick={(e) => shareToPlatform(e, 'facebook')} className="px-4 py-2 text-[11px] font-semibold text-gray-700 hover:text-black hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50">
                  <Facebook size={14} className="text-[#1877F2]" /> Facebook
                </button>
                <button onClick={copyLink} className="px-4 py-2.5 text-[11px] font-bold text-black hover:bg-gray-100 flex items-center gap-3 bg-gray-50/50">
                  <Link2 size={14} /> COPY LINK
                </button>
              </div>
            )}

            {isCopied && !showShareMenu && (
              <span className="absolute right-8 top-1 bg-[#111] text-white text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-sm shadow-xl animate-fade-in-left whitespace-nowrap z-50">
                Link Copied
              </span>
            )}
          </div>

          <button 
            onClick={handleWishlistToggle}
            className="p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-all duration-200 active:scale-90 flex items-center justify-center"
          >
            <Heart size={14} color={isWishlisted ? "#ef4444" : "#333"} fill={isWishlisted ? "#ef4444" : "none"} strokeWidth={2.5} />
          </button>

        </div>

        <img
          src={imgSrc}
          alt={product?.name}
          className={`w-full h-full object-contain transition-transform duration-700 mix-blend-multiply ${!isOutOfStock ? 'group-hover:scale-110' : 'opacity-70'}`}
        />
      </div>

      <div className="flex items-center justify-center gap-2 mb-2 w-full mt-auto">
        <span className={`text-[14px] font-bold ${hasDiscount ? 'text-[#3a8b76]' : 'text-[#333]'}`}>
          {formatPrice(finalPrice)}
        </span>
        {hasDiscount && (
          <span className="text-[12px] font-medium text-gray-400 line-through">{formatPrice(originalPrice)}</span>
        )}
      </div>

      <h3 className="text-[14px] font-medium text-[#111] leading-snug line-clamp-2 px-1">
        {product?.name || 'PRODUCT'}
      </h3>
    </div>
  );
}
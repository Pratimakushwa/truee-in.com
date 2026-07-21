// // import { useState } from 'react';
// // import {
// //   Heart, Eye, Star, ShoppingCart, Zap, GitCompare, Shield,
// // } from 'lucide-react';
// // import { useNavigate } from 'react-router-dom';
// // import axiosInstance from '../../utils/axiosInstance';
// // import { useAuth } from '../../context/AuthContext';
// // import {
// //   getProductImg,
// //   getProductPricing,
// //   isOutOfStock,
// //   formatPrice,
// //   getRating,
// // } from '../../utils/productHelpers';

// // const COMPARE_KEY = 'truee_compare';

// // export default function ProductCardPremium({
// //   product,
// //   onQuickView,
// //   variant = 'default',
// //   className = '',
// // }) {
// //   const { user } = useAuth();
// //   const navigate = useNavigate();
// //   const [isWishlisted, setIsWishlisted] = useState(false);
// //   const [imgHover, setImgHover] = useState(false);
// //   const [adding, setAdding] = useState(false);

// //   if (!product) return null;

// //   const { mrp, sellingPrice, hasDiscount, discountPercent } = getProductPricing(product);
// //   const outOfStock = isOutOfStock(product);
// //   const { avg, count } = getRating(product);
// //   const primaryImg = getProductImg(product, 0);
// //   const hoverImg = getProductImg(product, 1) !== primaryImg ? getProductImg(product, 1) : primaryImg;
// //   const brand = product.brand || product.category || 'TRUEE';
// //   const highlight = product.shortDescription || product.tags?.[0] || 'Premium quality';

// //   const isCompact = variant === 'compact';

// //   const handleWishlist = async (e) => {
// //     e.stopPropagation();
// //     if (!user) return navigate('/login');
// //     setIsWishlisted(!isWishlisted);
// //     try {
// //       await axiosInstance.post('/wishlist/toggle', { productId: product._id });
// //     } catch {
// //       setIsWishlisted(!isWishlisted);
// //     }
// //   };

// //   const handleCompare = (e) => {
// //     e.stopPropagation();
// //     const list = JSON.parse(localStorage.getItem(COMPARE_KEY) || '[]');
// //     if (list.includes(product._id)) {
// //       localStorage.setItem(COMPARE_KEY, JSON.stringify(list.filter((id) => id !== product._id)));
// //     } else if (list.length < 4) {
// //       localStorage.setItem(COMPARE_KEY, JSON.stringify([...list, product._id]));
// //     }
// //   };

// //   const addToCart = async (e, buyNow = false) => {
// //     e.stopPropagation();
// //     if (outOfStock) return;
// //     setAdding(true);
// //     try {
// //       const { data } = await axiosInstance.post('/cart/add', {
// //         productId: product._id,
// //         quantity: 1,
// //       });
// //       if (data.success) {
// //         window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { increase: 1 } }));
// //         if (buyNow) navigate('/checkout');
// //       }
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setAdding(false);
// //     }
// //   };

// //   return (
// //     <article
// //       className={`group relative flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden
// //         hover:border-[#C8A253]/25 hover:shadow-[var(--truee-shadow-lg)] transition-all duration-300
// //         ${isCompact ? 'text-left' : ''} ${className}`}
// //       onMouseEnter={() => setImgHover(true)}
// //       onMouseLeave={() => setImgHover(false)}
// //     >
// //       {/* Image */}
// //       <div
// //         className={`relative bg-gradient-to-b from-[#FAFAFA] to-white overflow-hidden cursor-pointer
// //           ${isCompact ? 'aspect-square' : 'aspect-[4/5]'}`}
// //         onClick={() => onQuickView?.(product)}
// //       >
// //         {/* Badges */}
// //         <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
// //           {outOfStock ? (
// //             <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide bg-gray-900 text-white rounded-full">
// //               Sold Out
// //             </span>
// //           ) : hasDiscount ? (
// //             <span className="px-2.5 py-1 text-[10px] font-bold bg-[#C8A253] text-black rounded-full shadow-sm">
// //               -{discountPercent}%
// //             </span>
// //           ) : null}
// //           {!outOfStock && (
// //             <span className="px-2 py-0.5 text-[9px] font-semibold bg-white/90 text-gray-600 rounded-full border border-gray-100 flex items-center gap-1 w-fit">
// //               <Shield size={10} className="text-[#C8A253]" /> Warranty
// //             </span>
// //           )}
// //         </div>

// //         {/* Action icons */}
// //         <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
// //           <button
// //             type="button"
// //             onClick={handleWishlist}
// //             className="p-2 rounded-full bg-white/95 shadow-md hover:bg-white hover:scale-105 transition-all"
// //             aria-label="Wishlist"
// //           >
// //             <Heart
// //               size={15}
// //               className={isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-700'}
// //               strokeWidth={2}
// //             />
// //           </button>
         
// //           {/* <button
// //             type="button"
// //             onClick={handleCompare}
// //             className="p-2 rounded-full bg-white/95 shadow-md hover:bg-white hover:scale-105 transition-all hidden sm:flex"
// //             aria-label="Compare"
// //           >
// //             <GitCompare size={15} className="text-gray-700" strokeWidth={2} />
// //           </button> */}
// //         </div>

// //         <img
// //           src={imgHover ? hoverImg : primaryImg}
// //           alt={product.name}
// //           loading="lazy"
// //           className={`absolute inset-0 w-full h-full object-contain p-6 mix-blend-multiply transition-all duration-500
// //             ${outOfStock ? 'opacity-50 grayscale' : 'group-hover:scale-105'}`}
// //         />

// //         {/* Hover CTA overlay */}
// //         {!outOfStock && (
// //           <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-white via-white/95 to-transparent pt-8">
// //             <div className="flex gap-2">
// //               <button
// //                 type="button"
// //                 disabled={adding}
// //                 onClick={(e) => addToCart(e, false)}
// //                 className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#0A0A0A] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-60"
// //               >
// //                 <ShoppingCart size={13} /> Add
// //               </button>
// //               <button
// //                 type="button"
// //                 disabled={adding}
// //                 onClick={(e) => addToCart(e, true)}
// //                 className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#C8A253] text-black text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-[#d4b06a] transition-colors disabled:opacity-60"
// //               >
// //                 <Zap size={13} /> Buy
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Content */}
// //       <div className="p-4 flex flex-col flex-1" onClick={() => onQuickView?.(product)}>
// //         <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C8A253] mb-1 truncate">
// //           {brand}
// //         </p>

// //         <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug mb-2 group-hover:text-[#8B6914] transition-colors cursor-pointer min-h-[2.5rem]">
// //           {product.name}
// //         </h3>

// //         {/* Rating */}
// //         <div className="flex items-center gap-1.5 mb-2">
// //           <div className="flex items-center gap-0.5">
// //             {[1, 2, 3, 4, 5].map((s) => (
// //               <Star
// //                 key={s}
// //                 size={11}
// //                 className={s <= Math.round(avg) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
// //               />
// //             ))}
// //           </div>
// //           <span className="text-[10px] text-gray-400">
// //             {avg.toFixed(1)}{count > 0 ? ` (${count})` : ''}
// //           </span>
// //         </div>

// //         <p className="text-[11px] text-gray-500 line-clamp-1 mb-2">{highlight}</p>

// //         {/* Price */}
// //         <div className="flex items-baseline gap-2 mt-auto">
// //           <span className="text-base font-bold text-gray-900">{formatPrice(sellingPrice)}</span>
// //           {hasDiscount && (
// //             <span className="text-xs text-gray-400 line-through">{formatPrice(mrp)}</span>
// //           )}
// //         </div>

// //         {/* Meta row */}
// //         <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
// //           {/* <span className={`text-[10px] font-medium ${outOfStock ? 'text-red-500' : 'text-green-600'}`}>
// //             {outOfStock ? 'Out of stock' : 'In stock'}
// //           </span> */}
// //           {!outOfStock && (
// //             <span className="text-[10px] text-gray-400">Delivers in 3–5 days</span>
// //           )}
// //         </div>
// //       </div>
// //     </article>
// //   );
// // }

// import { useState } from 'react';
// import {
//   Heart, Star, ShoppingCart, Zap, Shield, Clock, Truck,
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance';
// import { useAuth } from '../../context/AuthContext';
// import {
//   getProductImg,
//   getProductPricing,
//   isOutOfStock,
//   formatPrice,
//   getRating,
// } from '../../utils/productHelpers';

// const COMPARE_KEY = 'truee_compare';

// export default function ProductCardPremium({
//   product,
//   onQuickView,
//   variant = 'default',
//   className = '',
// }) {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [imgHover, setImgHover] = useState(false);
//   const [adding, setAdding] = useState(false);

//   if (!product) return null;

//   const { mrp, sellingPrice, hasDiscount, discountPercent } = getProductPricing(product);
//   const outOfStock = isOutOfStock(product);
//   const { avg, count } = getRating(product);
//   const primaryImg = getProductImg(product, 0);
//   const hoverImg = getProductImg(product, 1) !== primaryImg ? getProductImg(product, 1) : primaryImg;
//   const brand = product.brand || product.category || 'TRUEE';
//   const highlight = product.shortDescription || product.tags?.[0] || 'Premium quality';

//   const isCompact = variant === 'compact';

//   const handleWishlist = async (e) => {
//     e.stopPropagation();
//     if (!user) return navigate('/login');
//     setIsWishlisted(!isWishlisted);
//     try {
//       await axiosInstance.post('/wishlist/toggle', { productId: product._id });
//     } catch {
//       setIsWishlisted(!isWishlisted);
//     }
//   };

//   const handleCompare = (e) => {
//     e.stopPropagation();
//     const list = JSON.parse(localStorage.getItem(COMPARE_KEY) || '[]');
//     if (list.includes(product._id)) {
//       localStorage.setItem(COMPARE_KEY, JSON.stringify(list.filter((id) => id !== product._id)));
//     } else if (list.length < 4) {
//       localStorage.setItem(COMPARE_KEY, JSON.stringify([...list, product._id]));
//     }
//   };

//   const addToCart = async (e, buyNow = false) => {
//     e.stopPropagation();
//     if (outOfStock) return;
//     setAdding(true);
//     try {
//       const { data } = await axiosInstance.post('/cart/add', {
//         productId: product._id,
//         quantity: 1,
//       });
//       if (data.success) {
//         window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { increase: 1 } }));
//         if (buyNow) navigate('/checkout');
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setAdding(false);
//     }
//   };

//   return (
//     // ⚡ FIX: "group" ko "group/card" named group banaya — pehle plain "group" class hone ki wajah se
//     // Tailwind ka group-hover selector KISI BHI ancestor .group ke hover hone par trigger ho jata tha,
//     // isliye ek card hover/click hote hi saare sibling cards ke Add/Buy overlay bhi active dikhne lagte the.
//     // Named group (group/card + group-hover/card) sirf isi card tak scope rehta hai.
//     <article
//       className={`group/card relative flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden
//         hover:border-[#C8A253]/25 hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition-all duration-300 ease-out
//         ${isCompact ? 'text-left' : ''} ${className}`}
//       onMouseEnter={() => setImgHover(true)}
//       onMouseLeave={() => setImgHover(false)}
//     >
//       {/* Image */}
//       <div
//         className={`relative bg-gradient-to-b from-[#FAFAFA] to-white overflow-hidden cursor-pointer
//           ${isCompact ? 'aspect-square' : 'aspect-[4/5]'}`}
//         onClick={() => onQuickView?.(product)}
//       >
//         {/* Badges */}
//         <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20 flex items-center gap-2 flex-wrap">
//           {outOfStock ? (
//             <span className="px-2.5 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wide bg-gray-900 text-white rounded-full">
//               Sold Out
//             </span>
//           ) : hasDiscount ? (
//             <span className="px-1.5 py-1 text-[9px] sm:text-[10px] font-bold bg-[#C8A253] text-black rounded-full shadow-sm w-fit">
//   -{discountPercent}%
// </span>
//           ) : null}
//           {!outOfStock && (
//             <span className="px-2 py-0.5 text-[8px] sm:text-[9px] font-semibold bg-white/90 text-gray-600 rounded-full border border-gray-100 flex items-center gap-1 w-fit">
//               <Shield size={9} className="text-[#C8A253]" /> 1 Year Warranty
//             </span>
//           )}
//         </div>

//         {/* Action icons */}
//         <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20 flex flex-col gap-1.5 opacity-100 lg:opacity-0 lg:group-hover/card:opacity-100 transition-opacity duration-300">
//           <button
//             type="button"
//             onClick={handleWishlist}
//             className="p-1.5 sm:p-2 rounded-full bg-white/95 shadow-md hover:bg-white hover:scale-105 transition-all"
//             aria-label="Wishlist"
//           >
//             <Heart
//               size={14}
//               className={isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-700'}
//               strokeWidth={2}
//             />
//           </button>
//         </div>

//         <img
//           src={imgHover ? hoverImg : primaryImg}
//           alt={product.name}
//           loading="lazy"
//           className={`absolute inset-0 w-full h-full object-contain p-5 sm:p-6 mix-blend-multiply transition-all duration-500
//             ${outOfStock ? 'opacity-50 grayscale' : 'group-hover/card:scale-105'}`}
//         />

//         {/* Hover CTA overlay */}
//         {!outOfStock && (
//           <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-white via-white/95 to-transparent pt-8">
//             <div className="flex gap-2">
//               <button
//                 type="button"
//                 disabled={adding}
//                 onClick={(e) => addToCart(e, false)}
//                 className="flex-1 flex items-center justify-center gap-1.5 py-2 sm:py-2.5 bg-[#0A0A0A] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-60"
//               >
//                 <ShoppingCart size={12} /> Add
//               </button>
//               <button
//                 type="button"
//                 disabled={adding}
//                 onClick={(e) => addToCart(e, true)}
//                 className="flex-1 flex items-center justify-center gap-1.5 py-2 sm:py-2.5 bg-[#C8A253] text-black text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-[#d4b06a] transition-colors disabled:opacity-60"
//               >
//                 <Zap size={12} /> Buy
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-3 sm:p-4 flex flex-col flex-1" onClick={() => onQuickView?.(product)}>
//         <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-[#C8A253] mb-1 truncate">
//           {brand}
//         </p>

//         <h3 className="text-[13px] sm:text-sm font-medium text-gray-900 line-clamp-2 leading-snug mb-2 group-hover/card:text-[#8B6914] transition-colors cursor-pointer min-h-aut0">
//           {product.name}
//         </h3>

//         {/* Rating */}
//         <div className="flex items-center gap-1.5 mb-2">
//           <div className="flex items-center gap-0.5">
//             {[1, 2, 3, 4, 5].map((s) => (
//               <Star
//                 key={s}
//                 size={10}
//                 className={s <= Math.round(avg) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
//               />
//             ))}
//           </div>
//           <span className="text-[9px] sm:text-[10px] text-gray-400">
//             {avg.toFixed(1)}{count > 0 ? ` (${count})` : ''}
//           </span>
//         </div>

//         <p className="text-[10px] sm:text-[11px] text-gray-500 line-clamp-1 mb-2">{highlight}</p>

//         {/* Price */}
//         <div className="flex items-baseline gap-2 mt-auto flex-wrap">
//           <span className="text-[14px] sm:text-base font-bold text-gray-900">{formatPrice(sellingPrice)}</span>
//           {hasDiscount && (
//             <span className="text-[10px] sm:text-xs text-gray-400 line-through">{formatPrice(mrp)}</span>
//           )}
//         </div>
//       </div>
//     </article>
//   );
// }

// import { useState } from 'react';
// import {
//   Heart, Star, ShoppingCart, Zap, Shield, Clock, Truck,
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance';
// import { useAuth } from '../../context/AuthContext';
// import {
//   getProductImg,
//   getProductPricing,
//   isOutOfStock,
//   formatPrice,
//   getRating,
// } from '../../utils/productHelpers';

// const COMPARE_KEY = 'truee_compare';

// export default function ProductCardPremium({
//   product,
//   onQuickView,
//   variant = 'default',
//   className = '',
// }) {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [imgHover, setImgHover] = useState(false);
//   const [adding, setAdding] = useState(false);

//   if (!product) return null;

//   const { mrp, sellingPrice, hasDiscount, discountPercent } = getProductPricing(product);
//   const outOfStock = isOutOfStock(product);
//   const { avg, count } = getRating(product);
//   const primaryImg = getProductImg(product, 0);
//   const hoverImg = getProductImg(product, 1) !== primaryImg ? getProductImg(product, 1) : primaryImg;
//   const brand = product.brand || product.category || 'TRUEE';
//   const highlight = product.shortDescription || product.tags?.[0] || 'Premium quality';

//   const isCompact = variant === 'compact';

//   const handleWishlist = async (e) => {
//     e.stopPropagation();
//     if (!user) return navigate('/login');
//     setIsWishlisted(!isWishlisted);
//     try {
//       await axiosInstance.post('/wishlist/toggle', { productId: product._id });
//     } catch {
//       setIsWishlisted(!isWishlisted);
//     }
//   };

//   const handleCompare = (e) => {
//     e.stopPropagation();
//     const list = JSON.parse(localStorage.getItem(COMPARE_KEY) || '[]');
//     if (list.includes(product._id)) {
//       localStorage.setItem(COMPARE_KEY, JSON.stringify(list.filter((id) => id !== product._id)));
//     } else if (list.length < 4) {
//       localStorage.setItem(COMPARE_KEY, JSON.stringify([...list, product._id]));
//     }
//   };

//   const addToCart = async (e, buyNow = false) => {
//     e.stopPropagation();
//     if (outOfStock) return;
//     setAdding(true);
//     try {
//       const { data } = await axiosInstance.post('/cart/add', {
//         productId: product._id,
//         quantity: 1,
//       });
//       if (data.success) {
//         window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { increase: 1 } }));
//         if (buyNow) navigate('/checkout');
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setAdding(false);
//     }
//   };

//   return (
//     <article
//       className={`group/card relative flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden
//         hover:border-[#C8A253]/25 hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition-all duration-300 ease-out
//         ${isCompact ? 'text-left' : ''} ${className}`}
//       onMouseEnter={() => setImgHover(true)}
//       onMouseLeave={() => setImgHover(false)}
//     >
//       {/* Image */}
//       <div
//         // ⚡ FIX: 'aspect-[4/5]' ko hata kar 'aspect-square' kiya gaya hai height kam karne ke liye.
//         className={`relative bg-gradient-to-b from-[#FAFAFA] to-white overflow-hidden cursor-pointer aspect-square`}
//         onClick={() => onQuickView?.(product)}
//       >
//         {/* Badges */}
//         <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20 flex items-center gap-2 flex-wrap">
//           {outOfStock ? (
//             <span className="px-2.5 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wide bg-gray-900 text-white rounded-full">
//               Sold Out
//             </span>
//           ) : hasDiscount ? (
//             <span className="px-1.5 py-1 text-[9px] sm:text-[10px] font-bold bg-[#C8A253] text-black rounded-full shadow-sm w-fit">
//               -{discountPercent}%
//             </span>
//           ) : null}
//           {!outOfStock && (
//             <span className="px-2 py-0.5 text-[8px] sm:text-[9px] font-semibold bg-white/90 text-gray-600 rounded-full border border-gray-100 flex items-center gap-1 w-fit">
//               <Shield size={9} className="text-[#C8A253]" /> 1 Year Warranty
//             </span>
//           )}
//         </div>

//         {/* Action icons */}
//         <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20 flex flex-col gap-1.5 opacity-100 lg:opacity-0 lg:group-hover/card:opacity-100 transition-opacity duration-300">
//           <button
//             type="button"
//             onClick={handleWishlist}
//             className="p-1.5 sm:p-2 rounded-full bg-white/95 shadow-md hover:bg-white hover:scale-105 transition-all"
//             aria-label="Wishlist"
//           >
//             <Heart
//               size={14}
//               className={isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-700'}
//               strokeWidth={2}
//             />
//           </button>
//         </div>

//         <img
//           src={imgHover ? hoverImg : primaryImg}
//           alt={product.name}
//           loading="lazy"
//           // ⚡ FIX: Image padding 'p-5 sm:p-6' se thodi kam ki (p-4) taaki image badi dikhe aur container height bach jaye
//           className={`absolute inset-0 w-full h-full object-contain p-4 mix-blend-multiply transition-all duration-500
//             ${outOfStock ? 'opacity-50 grayscale' : 'group-hover/card:scale-105'}`}
//         />

//         {/* Hover CTA overlay */}
//         {!outOfStock && (
//           <div className="absolute inset-x-0 bottom-0 p-2 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-white via-white/95 to-transparent pt-6">
//             <div className="flex gap-2">
//               <button
//                 type="button"
//                 disabled={adding}
//                 onClick={(e) => addToCart(e, false)}
//                 // ⚡ FIX: Padding 'py-2 sm:py-2.5' ko halka sa chota 'py-1.5 sm:py-2' kar diya
//                 className="flex-1 flex items-center justify-center gap-1.5 py-1.5 sm:py-2 bg-[#0A0A0A] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-60"
//               >
//                 <ShoppingCart size={12} /> Add
//               </button>
//               <button
//                 type="button"
//                 disabled={adding}
//                 onClick={(e) => addToCart(e, true)}
//                 className="flex-1 flex items-center justify-center gap-1.5 py-1.5 sm:py-2 bg-[#C8A253] text-black text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-[#d4b06a] transition-colors disabled:opacity-60"
//               >
//                 <Zap size={12} /> Buy
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Content */}
//       {/* ⚡ FIX: Text spacing (padding aur margin) kam ki gayi hai */}
//       <div className="p-3 flex flex-col flex-1" onClick={() => onQuickView?.(product)}>
//         <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-[#C8A253] mb-0.5 truncate">
//           {brand}
//         </p>

//         <h3 className="text-[12px] sm:text-[13px] font-medium text-gray-900 line-clamp-2 leading-snug mb-1.5 group-hover/card:text-[#8B6914] transition-colors cursor-pointer min-h-auto">
//           {product.name}
//         </h3>

//         {/* Rating */}
//         <div className="flex items-center gap-1.5 mb-1.5">
//           <div className="flex items-center gap-0.5">
//             {[1, 2, 3, 4, 5].map((s) => (
//               <Star
//                 key={s}
//                 size={10}
//                 className={s <= Math.round(avg) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
//               />
//             ))}
//           </div>
//           <span className="text-[9px] sm:text-[10px] text-gray-400">
//             {avg.toFixed(1)}{count > 0 ? ` (${count})` : ''}
//           </span>
//         </div>

//         <p className="text-[10px] sm:text-[11px] text-gray-500 line-clamp-1 mb-2">{highlight}</p>

//         {/* Price */}
//         <div className="flex items-baseline gap-2 mt-auto flex-wrap">
//           <span className="text-[13px] sm:text-[15px] font-bold text-gray-900">{formatPrice(sellingPrice)}</span>
//           {hasDiscount && (
//             <span className="text-[9px] sm:text-[11px] text-gray-400 line-through">{formatPrice(mrp)}</span>
//           )}
//         </div>
//       </div>
//     </article>
//   );
// }
import { useState } from 'react';
import {
  Heart, Star, ShoppingCart, Zap, Shield, Clock, Truck,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { useAuth } from '../../context/AuthContext';
import {
  getProductImg,
  getProductPricing,
  isOutOfStock,
  formatPrice,
  getRating,
} from '../../utils/productHelpers';

const COMPARE_KEY = 'truee_compare';

// ⚡ SMART COLOR PARSER: Ab ye koi bhi mixed color name aaram se pehchan lega
const getCleanColorHex = (colorItem) => {
  if (!colorItem) return '#111111';
  
  // Color string nikalna (object ho ya direct string)
  let raw = typeof colorItem === 'string' 
    ? colorItem 
    : (colorItem.hex || colorItem.colorCode || colorItem.color || colorItem.name || '');
    
  raw = raw.trim().toLowerCase();
  
  // Agar pehle se hi hex code (#FFF) hai toh direct use karo
  if (raw.startsWith('#') || raw.startsWith('rgb')) return raw;
  
  // 1. EXACT PREMIUM MATCHES
  const colorMap = {
    'black': '#111111', 'matte black': '#1a1a1a', 'vintage black': '#181818', 'black & brass': '#1A1A18',
    'white': '#FFFFFF', 'lunar white': '#F9F9F9', 'pearl': '#F0EAD6',
    'cream': '#E8E4D9', 'beige': '#F5F5DC',
    'gold': '#C8A253', 'rose gold': '#B76E79', 'brass': '#B5944B',
    'silver': '#D1D5DB', 'platinum': '#E5E4E2',
    'grey': '#6B7280', 'gray': '#6B7280', 'graphite': '#383838', 'charcoal': '#36454F',
    'sage green': '#738276', 'olive': '#556B2F',
    'midnight blue': '#191970', 'navy': '#000080', 'blue': '#1e3a8a',
    'brown': '#5C4033', 'walnut': '#773f1a',
    'red': '#b91c1c'
  };
  
  if (colorMap[raw]) return colorMap[raw];
  
  // 2. SMART SUBSTRING MATCHES (Agar exact naam nahi mila, toh andaza lagayega)
  if (raw.includes('black')) return '#111111';
  if (raw.includes('white')) return '#FFFFFF';
  if (raw.includes('gold')) return '#C8A253';
  if (raw.includes('silver')) return '#D1D5DB';
  if (raw.includes('grey') || raw.includes('gray')) return '#6B7280';
  if (raw.includes('blue')) return '#1e3a8a';
  if (raw.includes('green')) return '#738276';
  if (raw.includes('red')) return '#b91c1c';
  if (raw.includes('brown') || raw.includes('wood')) return '#5C4033';
  if (raw.includes('cream')) return '#E8E4D9';
  if (raw.includes('brass')) return '#B5944B';
  
  // Default color agar naam ekdum ajeeb ho
  return '#111111'; 
};

export default function ProductCardPremium({
  product,
  onQuickView,
  variant = 'default',
  className = '',
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imgHover, setImgHover] = useState(false);
  const [adding, setAdding] = useState(false);
  
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);

  if (!product) return null;

  const { mrp, sellingPrice, hasDiscount, discountPercent } = getProductPricing(product);
  const outOfStock = isOutOfStock(product);
  const { avg, count } = getRating(product);
  
  const brand = product.brand || product.category || 'TRUEE';
  const highlight = product.shortDescription || product.tags?.[0] || 'Premium quality';
  const isCompact = variant === 'compact';

  const realColors = product.colors?.length > 0 ? product.colors
    : product.variants?.length > 0 ? product.variants
    : product.colorVariants?.length > 0 ? product.colorVariants
    : [];

  const primaryImg = getProductImg(product, 0);
  const hoverImg = getProductImg(product, 1) !== primaryImg ? getProductImg(product, 1) : primaryImg;

  let displayImgSrc = imgHover ? hoverImg : primaryImg;

  if (realColors.length > 0) {
     const v = realColors[activeVariantIdx];
     let variantImg = null;
     
     if (v?.images?.length > 0) {
        variantImg = v.images[0].url || v.images[0];
     } else if (v?.image) {
        variantImg = v.image;
     } else if (v?.img) {
        variantImg = v.img;
     } else if (product.images && product.images[activeVariantIdx]) {
        variantImg = product.images[activeVariantIdx].url || product.images[activeVariantIdx];
     }
     
     if (variantImg) {
        displayImgSrc = (imgHover && activeVariantIdx === 0) ? hoverImg : variantImg;
     }
  }

  const handleWishlist = async (e) => {
    e.stopPropagation();
    if (!user) return navigate('/login');
    setIsWishlisted(!isWishlisted);
    try {
      await axiosInstance.post('/wishlist/toggle', { productId: product._id });
    } catch {
      setIsWishlisted(!isWishlisted);
    }
  };

  const handleCompare = (e) => {
    e.stopPropagation();
    const list = JSON.parse(localStorage.getItem(COMPARE_KEY) || '[]');
    if (list.includes(product._id)) {
      localStorage.setItem(COMPARE_KEY, JSON.stringify(list.filter((id) => id !== product._id)));
    } else if (list.length < 4) {
      localStorage.setItem(COMPARE_KEY, JSON.stringify([...list, product._id]));
    }
  };

  const addToCart = async (e, buyNow = false) => {
    e.stopPropagation();
    if (outOfStock) return;
    setAdding(true);
    try {
      const { data } = await axiosInstance.post('/cart/add', {
        productId: product._id,
        quantity: 1,
      });
      if (data.success) {
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { increase: 1 } }));
        if (buyNow) navigate('/checkout');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <article
      className={`group/card relative flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden
        hover:border-[#C8A253]/25 hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition-all duration-300 ease-out
        ${isCompact ? 'text-left' : ''} ${className}`}
      onMouseEnter={() => setImgHover(true)}
      onMouseLeave={() => setImgHover(false)}
    >
      {/* Image Container */}
      <div
        className={`relative bg-gradient-to-b from-[#FAFAFA] to-white overflow-hidden cursor-pointer aspect-square`}
        onClick={() => onQuickView?.(product)}
      >
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20 flex items-center gap-2 flex-wrap">
          {outOfStock ? (
            <span className="px-2.5 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wide bg-gray-900 text-white rounded-full">
              Sold Out
            </span>
          ) : hasDiscount ? (
            <span className="px-1.5 py-1 text-[9px] sm:text-[10px] font-bold bg-[#C8A253] text-black rounded-full shadow-sm w-fit">
              -{discountPercent}%
            </span>
          ) : null}
          {!outOfStock && (
            <span className="px-2 py-0.5 text-[8px] sm:text-[9px] font-semibold bg-white/90 text-gray-600 rounded-full border border-gray-100 flex items-center gap-1 w-fit">
              <Shield size={9} className="text-[#C8A253]" /> 1 Year Warranty
            </span>
          )}
        </div>

        {/* Action icons */}
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20 flex flex-col gap-1.5 opacity-100 lg:opacity-0 lg:group-hover/card:opacity-100 transition-opacity duration-300">
          <button
            type="button"
            onClick={handleWishlist}
            className="p-1.5 sm:p-2 rounded-full bg-white/95 shadow-md hover:bg-white hover:scale-105 transition-all"
            aria-label="Wishlist"
          >
            <Heart
              size={14}
              className={isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-700'}
              strokeWidth={2}
            />
          </button>
        </div>

        <img
          src={displayImgSrc}
          alt={product.name}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-contain p-4 mix-blend-multiply transition-all duration-500
            ${outOfStock ? 'opacity-50 grayscale' : 'group-hover/card:scale-105'}`}
        />

        {/* Hover CTA overlay */}
        {!outOfStock && (
          <div className="absolute inset-x-0 bottom-0 p-2 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-white via-white/95 to-transparent pt-6">
            <div className="flex gap-2">
              <button
                type="button"
                disabled={adding}
                onClick={(e) => addToCart(e, false)}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 sm:py-2 bg-[#0A0A0A] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-60"
              >
                <ShoppingCart size={12} /> Add
              </button>
              <button
                type="button"
                disabled={adding}
                onClick={(e) => addToCart(e, true)}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 sm:py-2 bg-[#C8A253] text-black text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-[#d4b06a] transition-colors disabled:opacity-60"
              >
                <Zap size={12} /> Buy
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1" onClick={() => onQuickView?.(product)}>
        
        {/* Color Dots */}
        {realColors.length > 0 && (
          <div className="flex items-center gap-1.5 mb-2 h-4">
            {realColors.map((colorItem, idx) => {
              const cleanHex = getCleanColorHex(colorItem);
              const isActive = activeVariantIdx === idx;
              return (
                <button
  key={idx}
  type="button"
  onMouseEnter={(e) => { e.stopPropagation(); setActiveVariantIdx(idx); }}
  onClick={(e) => { e.stopPropagation(); setActiveVariantIdx(idx); }}
  onTouchStart={(e) => { e.stopPropagation(); setActiveVariantIdx(idx); }}
  // ⚡ YAHAN FIX KIYA HAI: opacity-70 hata diya aur size thoda bada (w-3.5) kar diya
  className={`w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] rounded-full border transition-all duration-300 cursor-pointer shadow-sm ${
    isActive
      ? 'border-gray-900 ring-2 ring-gray-400 ring-offset-1 scale-125 z-10'
      : 'border-gray-300 hover:border-gray-500 hover:scale-110'
  }`}
  style={{ backgroundColor: cleanHex }}
  title={typeof colorItem === 'string' ? colorItem : (colorItem.color || colorItem.name)}
/>
              );
            })}
          </div>
        )}

        <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-[#C8A253] mb-0.5 truncate">
          {brand}
        </p>

        <h3 className="text-[12px] sm:text-[13px] font-medium text-gray-900 line-clamp-2 leading-snug mb-1.5 group-hover/card:text-[#8B6914] transition-colors cursor-pointer min-h-auto">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={10}
                className={s <= Math.round(avg) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
              />
            ))}
          </div>
          <span className="text-[9px] sm:text-[10px] text-gray-400">
            {avg.toFixed(1)}{count > 0 ? ` (${count})` : ''}
          </span>
        </div>

        <p className="text-[10px] sm:text-[11px] text-gray-500 line-clamp-1 mb-2">{highlight}</p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto flex-wrap">
          <span className="text-[13px] sm:text-[15px] font-bold text-gray-900">{formatPrice(sellingPrice)}</span>
          {hasDiscount && (
            <span className="text-[9px] sm:text-[11px] text-gray-400 line-through">{formatPrice(mrp)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
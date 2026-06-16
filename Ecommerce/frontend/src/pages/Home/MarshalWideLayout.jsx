// // import React from 'react';
// // import { ChevronLeft, ChevronRight } from 'lucide-react';

// // const MarshallWideLayout = () => {
// //   // Hardcoded Images 
// //   const imgSet1 = {
// //     left:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu5O2VLbibhlbMalWUWL1nenxHsldPe2OP5Q&s",
// //     right:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiHbqWWlKO6JKAqnl4L4MHkT8ORAy1qU55jQ&s"
// //   };

// //   return (
// //     <div className="w-full bg-white flex items-center justify-center pt-10 pb-10 px-2 md:px-4 font-sans">

// //       {/* ⚡ Main Container - Width 98% aur gap exactly 'gap-1' kar diya gaya hai */}
// //       <div className="relative w-[98%] mx-auto flex flex-col md:flex-row items-center justify-center gap-1">
        
// //         {/* LEFT IMAGE BOX - Height thodi badhai hai taaki width ke hisaab se acha lage */}
// //         <div className="relative w-full flex-1 h-[460px] bg-gray-50 overflow-hidden shadow-sm">
// //           <img 
// //             src={imgSet1.left} 
// //             alt="Model Portrait" 
// //             className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
// //           />
          
// //           {/* BLACK BOX WITH BIG '✕' */}
// //           <div className="absolute bottom-0 right-0 w-32 h-32 bg-black flex flex-col items-center justify-center pointer-events-none">
// //             <span className="text-white text-8xl font-normal select-none mb-[-10px] opacity-90">✕</span>
// //             <div className="mt-8"> 
// //               <ChevronLeft className="text-white opacity-40" size={16} />
// //             </div>
// //           </div>
// //         </div>

// //         {/* ⚡ CENTER BUTTONS - Dono buttons ke beech mein halka sa gap-2 rakha hai */}
// //         <div className="flex flex-row gap-2 z-30 shrink-0">
// //           <button className="w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90 border border-gray-100 cursor-pointer">
// //             <ChevronLeft size={20} strokeWidth={2.5} />
// //           </button>
// //           <button className="w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90 border border-gray-100 cursor-pointer">
// //             <ChevronRight size={20} strokeWidth={2.5} />
// //           </button>
// //         </div>

// //         {/* RIGHT IMAGE BOX */}
// //         <div className="relative w-full flex-1 h-[460px] bg-gray-50 overflow-hidden shadow-sm">
// //           <img 
// //             src={imgSet1.right} 
// //             alt="Audio Product" 
// //             className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
// //           />
          
// //           {/* BUY NOW Button */}
// //           <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
// //             <button className="bg-black text-white px-9 py-4 text-[11px] rounded-lg font-bold tracking-[0.5em] uppercase hover:bg-zinc-800 transition-all shadow-xl active:scale-95 cursor-pointer">
// //               BUY NOW
// //             </button>
// //           </div>
// //         </div>

// //       </div>

// //       {/* Decorative Top Notch */}
// //       <div className="fixed top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-black rounded-b-xl opacity-10 pointer-events-none"></div>
// //     </div>
// //   );
// // };

// // export default MarshallWideLayout;

// // import React, { useState, useEffect } from 'react';
// // import { ChevronLeft, ChevronRight } from 'lucide-react';
// // import axiosInstance from '../../utils/axiosInstance';
// // import QuickModel from '../Product/ProductDetailModel';

// // const MarshallWideLayout = () => {
// //   const [product, setProduct] = useState(null); // Minor IV ke liye (BUY NOW)
// //   const [leftProduct, setLeftProduct] = useState(null); // Marshall Middleton ke liye (Left Image)
// //   const [loading, setLoading] = useState(true);
// //   const [quickViewProduct, setQuickViewProduct] = useState(null);

// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       try {
// //         const { data } = await axiosInstance.get('/products');
// //         if (data.success && data.products.length > 0) {
          
// //           // 1. Minor IV ko dhundho (BUY NOW button ke liye)
// //           const minorIV = data.products.find(p => 
// //             p.name?.toLowerCase().includes('minor iv') || 
// //             p.name?.toLowerCase().includes('minor 4')
// //           );
// //           setProduct(minorIV || data.products[0]);

// //           // 2. Exact 'Marshall Middleton' ko dhundho (Left Image ke liye)
// //           const middletonSpeaker = data.products.find(p => 
// //             p.name?.toLowerCase().trim() === 'marshall middleton' || 
// //             p.name?.toLowerCase().includes('middleton')
// //           );
// //           setLeftProduct(middletonSpeaker || data.products[0]);

// //         }
// //       } catch (error) {
// //         console.error("Error fetching wide layout product:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchProduct();
// //   }, []);

// //   const imgSet1 = {
// //     left: "https://static0.anpoimages.com/wordpress/wp-content/uploads/2025/01/marshall-middleton-lifestyle.jpg?w=1600&h=1200&fit=crop",
// //     right: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgnpw_PdZG52JMN2JsH2j8peuJQB3M6QhZqIyP8o__LHl8odlJSn7UgO0XxqyeHT6NvV9UBvebQ3xtFAGYMCNqwvcfdPgdajUbqkDxJvT3r4WyhbAbAvwuZt69Wlya4VA56sXVGkwVZv9HI7KVTO3F7dtIZrkq86nv9KDxdEiZQk0nfjwKjpk0s2e0YS-Y/s800/marshall-minor-iv-banner.png"
// //   };

// //   return (
// //     <div className="w-full bg-white flex items-center justify-center pt-10 pb-10 px-2 md:px-4 font-sans">
// //       <div className="relative w-[98%] mx-auto flex flex-col md:flex-row items-center justify-center gap-1">
        
// //         {/* ⚡ LEFT IMAGE BOX (Yahan click karne par Marshall Middleton khulega) */}
// //         <div 
// //           className="relative w-full flex-1 h-[460px] bg-gray-50 overflow-hidden shadow-sm cursor-pointer group"
// //           onClick={() => leftProduct && setQuickViewProduct(leftProduct)}
// //         >
// //           <img src={imgSet1.left} alt="Model Portrait" className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
          
// //           {/* Mobile par ✕ ko chhota kiya (w-20 h-20, text-5xl), Desktop par w-32 h-32 text-8xl rahega */}
// //           <div className="absolute bottom-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-black flex flex-col items-center justify-center pointer-events-none transition-all">
// //             <span className="text-white text-5xl md:text-8xl font-normal select-none mb-[-5px] md:mb-[-10px] opacity-90">✕</span>
// //             <div className="mt-4 md:mt-8"> 
// //               <ChevronLeft className="text-white opacity-40" size={16} /> 
// //             </div>
// //           </div>
// //         </div>

// //         {/* CENTER BUTTONS */}
// //         <div className="flex flex-row gap-2 z-30 shrink-0 my-2 md:my-0">
// //           <button className="w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90 border border-gray-100 cursor-pointer">
// //             <ChevronLeft size={20} strokeWidth={2.5} />
// //           </button>
// //           <button className="w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90 border border-gray-100 cursor-pointer">
// //             <ChevronRight size={20} strokeWidth={2.5} />
// //           </button>
// //         </div>

// //         {/* RIGHT IMAGE BOX */}
// //         <div className="relative w-full flex-1 h-[460px] bg-gray-50 overflow-hidden shadow-sm group">
// //           <img src={imgSet1.right} alt="Audio Product" className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
          
// //           {/* BUY NOW Button (Ye Minor IV khholega) */}
// //           <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
// //             <button 
// //               onClick={() => product && setQuickViewProduct(product)}
// //               className="bg-black text-white px-9 py-4 text-[11px] rounded-lg font-bold tracking-[0.5em] uppercase hover:bg-zinc-800 transition-all shadow-xl active:scale-95 cursor-pointer"
// //             >
// //               BUY NOW
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Quick View Modal */}
// //       {quickViewProduct && (
// //         <QuickModel 
// //           isOpen={!!quickViewProduct} 
// //           onClose={() => setQuickViewProduct(null)} 
// //           product={quickViewProduct} 
// //         />
// //       )}

// //       <div className="fixed top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-black rounded-b-xl opacity-10 pointer-events-none"></div>
// //     </div>
// //   );
// // };

// // export default MarshallWideLayout;


// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import axiosInstance from '../../utils/axiosInstance';
// import QuickModel from '../Product/ProductDetailModel';

// const MarshallWideLayout = () => {
//   const [product, setProduct] = useState(null); // Minor IV ke liye (BUY NOW)
//   const [leftProduct, setLeftProduct] = useState(null); // Marshall Middleton ke liye (Left Image)
//   const [loading, setLoading] = useState(true);
//   const [quickViewProduct, setQuickViewProduct] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const { data } = await axiosInstance.get('/products');
//         if (data.success && data.products.length > 0) {
          
//           // 1. Minor IV ko dhundho (BUY NOW button ke liye)
//           const minorIV = data.products.find(p => 
//             p.name?.toLowerCase().includes('minor iv') || 
//             p.name?.toLowerCase().includes('minor 4')
//           );
//           setProduct(minorIV || data.products[0]);

//           // 2. ⚡ FIX: Sirf 'Middleton' dhundho, 'Middleton II' ko ignore karo
//           const middletonSpeaker = data.products.find(p => {
//             const name = p.name?.toLowerCase().trim() || '';
//             return name.includes('middleton') && !name.includes('ii') && !name.includes(' 2');
//           });
//           setLeftProduct(middletonSpeaker || data.products[0]);

//         }
//       } catch (error) {
//         console.error("Error fetching wide layout product:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, []);

//   const imgSet1 = {
//     left: "https://static0.anpoimages.com/wordpress/wp-content/uploads/2025/01/marshall-middleton-lifestyle.jpg?w=1600&h=1200&fit=crop",
//     right: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgnpw_PdZG52JMN2JsH2j8peuJQB3M6QhZqIyP8o__LHl8odlJSn7UgO0XxqyeHT6NvV9UBvebQ3xtFAGYMCNqwvcfdPgdajUbqkDxJvT3r4WyhbAbAvwuZt69Wlya4VA56sXVGkwVZv9HI7KVTO3F7dtIZrkq86nv9KDxdEiZQk0nfjwKjpk0s2e0YS-Y/s800/marshall-minor-iv-banner.png"
//   };

//   return (
//     <div className="w-full bg-white flex items-center justify-center pt-10 pb-10 px-2 md:px-4 font-sans">
//       <div className="relative w-[98%] mx-auto flex flex-col md:flex-row items-center justify-center gap-1">
        
//         {/* LEFT IMAGE BOX (Yahan click karne par Marshall Middleton khulega) */}
//         <div 
//           className="relative w-full flex-1 h-[460px] bg-gray-50 overflow-hidden shadow-sm cursor-pointer group"
//           onClick={() => leftProduct && setQuickViewProduct(leftProduct)}
//         >
//           <img src={imgSet1.left} alt="Model Portrait" className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
          
//           <div className="absolute bottom-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-black flex flex-col items-center justify-center pointer-events-none transition-all">
//             <span className="text-white text-5xl md:text-8xl font-normal select-none mb-[-5px] md:mb-[-10px] opacity-90">✕</span>
//             <div className="mt-4 md:mt-8"> 
//               <ChevronLeft className="text-white opacity-40" size={16} /> 
//             </div>
//           </div>
//         </div>

//         {/* CENTER BUTTONS */}
//         <div className="flex flex-row gap-2 z-30 shrink-0 my-2 md:my-0">
//           <button className="w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90 border border-gray-100 cursor-pointer">
//             <ChevronLeft size={20} strokeWidth={2.5} />
//           </button>
//           <button className="w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90 border border-gray-100 cursor-pointer">
//             <ChevronRight size={20} strokeWidth={2.5} />
//           </button>
//         </div>

//         {/* RIGHT IMAGE BOX */}
//         <div className="relative w-full flex-1 h-[460px] bg-gray-50 overflow-hidden shadow-sm group">
//           <img src={imgSet1.right} alt="Audio Product" className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
          
//           {/* BUY NOW Button (Ye Minor IV khholega) */}
//           <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
//             <button 
//               onClick={() => product && setQuickViewProduct(product)}
//               className="bg-black text-white px-9 py-4 text-[11px] rounded-lg font-bold tracking-[0.5em] uppercase hover:bg-zinc-800 transition-all shadow-xl active:scale-95 cursor-pointer"
//             >
//               BUY NOW
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Quick View Modal */}
//       {quickViewProduct && (
//         <QuickModel 
//           isOpen={!!quickViewProduct} 
//           onClose={() => setQuickViewProduct(null)} 
//           product={quickViewProduct} 
//         />
//       )}

//       <div className="fixed top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-black rounded-b-xl opacity-10 pointer-events-none"></div>
//     </div>
//   );
// };

// export default MarshallWideLayout;

// import React, { useState, useEffect } from 'react';
// import { ChevronLeft } from 'lucide-react';
// import axiosInstance from '../../utils/axiosInstance';
// import QuickModel from '../Product/ProductDetailModel';

// const MarshallWideLayout = () => {
//   const [product, setProduct] = useState(null); 
//   const [leftProduct, setLeftProduct] = useState(null); 
//   const [loading, setLoading] = useState(true);
//   const [quickViewProduct, setQuickViewProduct] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const { data } = await axiosInstance.get('/products');
//         if (data.success && data.products.length > 0) {
          
//           const minorIV = data.products.find(p => 
//             p.name?.toLowerCase().includes('minor iv') || 
//             p.name?.toLowerCase().includes('minor 4')
//           );
//           setProduct(minorIV || data.products[0]);

//           const middletonSpeaker = data.products.find(p => {
//             const name = p.name?.toLowerCase().trim() || '';
//             return name.includes('middleton') && !name.includes('ii') && !name.includes(' 2');
//           });
//           setLeftProduct(middletonSpeaker || data.products[0]);

//         }
//       } catch (error) {
//         console.error("Error fetching wide layout product:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, []);

//   const imgSet1 = {
//     left: "https://static0.anpoimages.com/wordpress/wp-content/uploads/2025/01/marshall-middleton-lifestyle.jpg?w=1600&h=1200&fit=crop",
//     right: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgnpw_PdZG52JMN2JsH2j8peuJQB3M6QhZqIyP8o__LHl8odlJSn7UgO0XxqyeHT6NvV9UBvebQ3xtFAGYMCNqwvcfdPgdajUbqkDxJvT3r4WyhbAbAvwuZt69Wlya4VA56sXVGkwVZv9HI7KVTO3F7dtIZrkq86nv9KDxdEiZQk0nfjwKjpk0s2e0YS-Y/s800/marshall-minor-iv-banner.png"
//   };

//   return (
//     <div className="w-full bg-white flex items-center justify-center pt-10 pb-10 px-2 md:px-4 font-sans">
//       <div className="relative w-[98%] mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-[100px]">
        
//         {/* LEFT IMAGE BOX */}
//         {/* ⚡ FIX: h-[380px] on mobile, md:h-[460px] on desktop */}
//         <div className="relative w-full flex-1 h-[380px] sm:h-[400px] md:h-[460px] bg-gray-50 overflow-hidden shadow-sm group">
//           {/* ⚡ FIX: Added object-center for better responsiveness */}
//           <img src={imgSet1.left} alt="Model Portrait" className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105" />
          
//           <div className="absolute bottom-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-black flex flex-col items-center justify-center pointer-events-none transition-all">
//             <span className="text-white text-5xl md:text-8xl font-normal select-none mb-[-5px] md:mb-[-10px] opacity-90">✕</span>
//             <div className="mt-4 md:mt-8"> 
//               <ChevronLeft className="text-white opacity-40" size={16} /> 
//             </div>
//           </div>

//           {/* BUY NOW Button */}
//           {/* ⚡ FIX: bottom-5 on mobile (moved down), md:bottom-10 on desktop */}
//           <div className="absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 z-10">
//             <button 
//               onClick={() => leftProduct && setQuickViewProduct(leftProduct)}
//               className="bg-black text-white px-9 py-4 text-[11px] rounded-lg font-bold tracking-[0.5em] uppercase hover:bg-zinc-800 transition-all shadow-xl active:scale-95 cursor-pointer whitespace-nowrap"
//             >
//               BUY NOW
//             </button>
//           </div>
//         </div>

//         {/* RIGHT IMAGE BOX */}
//         {/* ⚡ FIX: h-[380px] on mobile, md:h-[460px] on desktop */}
//         <div className="relative w-full flex-1 h-[380px] sm:h-[400px] md:h-[460px] bg-gray-50 overflow-hidden shadow-sm group">
//           {/* ⚡ FIX: Added object-center for better responsiveness */}
//           <img src={imgSet1.right} alt="Audio Product" className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105" />
          
//           {/* BUY NOW Button */}
//           {/* ⚡ FIX: bottom-5 on mobile (moved down), md:bottom-10 on desktop */}
//           <div className="absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 z-10">
//             <button 
//               onClick={() => product && setQuickViewProduct(product)}
//               className="bg-black text-white px-9 py-4 text-[11px] rounded-lg font-bold tracking-[0.5em] uppercase hover:bg-zinc-800 transition-all shadow-xl active:scale-95 cursor-pointer whitespace-nowrap"
//             >
//               BUY NOW
//             </button>
//           </div>
//         </div>

//       </div>

//       {/* Quick View Modal */}
//       {quickViewProduct && (
//         <QuickModel 
//           isOpen={!!quickViewProduct} 
//           onClose={() => setQuickViewProduct(null)} 
//           product={quickViewProduct} 
//         />
//       )}

//       <div className="fixed top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-black rounded-b-xl opacity-10 pointer-events-none"></div>
//     </div>
//   );
// };

// export default MarshallWideLayout;

// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../utils/axiosInstance';
// import QuickModel from '../Product/ProductDetailModel';

// const MarshallWideLayout = () => {
//   const [product, setProduct] = useState(null); 
//   const [leftProduct, setLeftProduct] = useState(null); 
//   const [quickViewProduct, setQuickViewProduct] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const { data } = await axiosInstance.get('/products');
//         if (data.success && data.products.length > 0) {
//           const minorIV = data.products.find(p => p.name?.toLowerCase().includes('minor iv') || p.name?.toLowerCase().includes('minor 4'));
//           setProduct(minorIV || data.products[0]);
//           const middletonSpeaker = data.products.find(p => {
//             const name = p.name?.toLowerCase().trim() || '';
//             return name.includes('middleton') && !name.includes('ii') && !name.includes(' 2');
//           });
//           setLeftProduct(middletonSpeaker || data.products[0]);
//         }
//       } catch (error) {
//         console.error("Error fetching wide layout product:", error);
//       }
//     };
//     fetchProduct();
//   }, []);

//   const imgSet1 = {
//     left: "https://static0.anpoimages.com/wordpress/wp-content/uploads/2025/01/marshall-middleton-lifestyle.jpg?w=1600&h=1200&fit=crop",
//     right: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgnpw_PdZG52JMN2JsH2j8peuJQB3M6QhZqIyP8o__LHl8odlJSn7UgO0XxqyeHT6NvV9UBvebQ3xtFAGYMCNqwvcfdPgdajUbqkDxJvT3r4WyhbAbAvwuZt69Wlya4VA56sXVGkwVZv9HI7KVTO3F7dtIZrkq86nv9KDxdEiZQk0nfjwKjpk0s2e0YS-Y/s800/marshall-minor-iv-banner.png"
//   };

//   return (
//     <div className="w-full bg-white flex flex-col items-center justify-center pt-10 pb-10 px-2 md:px-4 font-sans">
      
//       {/* 1. MARSHALL LAYOUT (Rounded Images) */}
//       <div className="relative w-[98%] mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-[70px]">
//         {/* Left Image */}
//         <div className="relative w-full flex-1 h-[400px] rounded-2xl overflow-hidden shadow-sm group">
//           <img src={imgSet1.left} alt="Model Portrait" className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105" />
//           <div className="absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 z-10">
//             <button onClick={() => leftProduct && setQuickViewProduct(leftProduct)} className="bg-black text-white px-9 py-4 text-[11px] rounded-lg font-bold tracking-[0.5em] uppercase hover:bg-zinc-800 transition-all shadow-xl active:scale-95 cursor-pointer whitespace-nowrap">BUY NOW</button>
//           </div>
//         </div>
//         {/* Right Image */}
//         <div className="relative w-full flex-1 h-[400px] rounded-2xl overflow-hidden shadow-sm group">
//           <img src={imgSet1.right} alt="Audio Product" className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105" />
//           <div className="absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 z-10">
//             <button onClick={() => product && setQuickViewProduct(product)} className="bg-black text-white px-9 py-4 text-[11px] rounded-lg font-bold tracking-[0.5em] uppercase hover:bg-zinc-800 transition-all shadow-xl active:scale-95 cursor-pointer whitespace-nowrap">BUY NOW</button>
//           </div>
//         </div>
//       </div>

//       {/* 2. DUAL VIDEO SECTION (Cover Fixed) */}
//       <section className="w-[98%] mx-auto mt-16 mb-20">
//         <h3 className="text-center text-[15px] uppercase tracking-[0.4em] font-bold mb-8 text-black opacity-60">
//           Unboxing & Review
//         </h3>
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Left Video */}
//           {/* Left Video - Perfect Fit (No scale, No cut) */}
// <div className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black flex items-center justify-center">
//   <iframe 
//     className="w-full h-full" 
//     src="https://www.youtube.com/embed/C6Mx6BWcSMo" 
//     title="Video 1" 
//     frameBorder="0" 
//     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
//     allowFullScreen
//   ></iframe>
// </div>
//           {/* Right Video */}
//           <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-black">
//             <iframe 
//               className="absolute top-0 left-0 w-full h-full object-cover" 
//               src="https://www.youtube.com/embed/baITH2OP6tk" 
//               title="Video 2" 
//               frameBorder="0" 
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       </section>

//       {quickViewProduct && (
//         <QuickModel isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} product={quickViewProduct} />
//       )}
//     </div>
//   );
// };

// export default MarshallWideLayout;

// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../utils/axiosInstance';
// import QuickModel from '../Product/ProductDetailModel';

// const MarshallWideLayout = () => {
//   const [product, setProduct] = useState(null); 
//   const [leftProduct, setLeftProduct] = useState(null); 
//   const [quickViewProduct, setQuickViewProduct] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const { data } = await axiosInstance.get('/products');
//         if (data.success && data.products.length > 0) {
//           const minorIV = data.products.find(p => p.name?.toLowerCase().includes('minor iv') || p.name?.toLowerCase().includes('minor 4'));
//           setProduct(minorIV || data.products[0]);
//           const middletonSpeaker = data.products.find(p => {
//             const name = p.name?.toLowerCase().trim() || '';
//             return name.includes('middleton') && !name.includes('ii') && !name.includes(' 2');
//           });
//           setLeftProduct(middletonSpeaker || data.products[0]);
//         }
//       } catch (error) {
//         console.error("Error fetching wide layout product:", error);
//       }
//     };
//     fetchProduct();
//   }, []);

//   const imgSet1 = {
//     left: "https://static0.anpoimages.com/wordpress/wp-content/uploads/2025/01/marshall-middleton-lifestyle.jpg?w=1600&h=1200&fit=crop",
//     right: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgnpw_PdZG52JMN2JsH2j8peuJQB3M6QhZqIyP8o__LHl8odlJSn7UgO0XxqyeHT6NvV9UBvebQ3xtFAGYMCNqwvcfdPgdajUbqkDxJvT3r4WyhbAbAvwuZt69Wlya4VA56sXVGkwVZv9HI7KVTO3F7dtIZrkq86nv9KDxdEiZQk0nfjwKjpk0s2e0YS-Y/s800/marshall-minor-iv-banner.png"
//   };

//   return (
//     <div className="w-full bg-white flex flex-col items-center justify-center pt-10 pb-10 px-2 md:px-4 font-sans">
      
//       {/* 1. MARSHALL LAYOUT (Rounded Images) */}
//       <div className="relative w-[98%] mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-[70px]">
//         {/* Left Image */}
//         <div className="relative w-full flex-1 h-[400px] rounded-2xl overflow-hidden shadow-sm group">
//           <img src={imgSet1.left} alt="Model Portrait" className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105" />
//           <div className="absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 z-10">
//             {/* ⚡ BUY NOW BUTTON FIX */}
//             <button onClick={() => leftProduct && setQuickViewProduct(leftProduct)} className="bg-black text-white px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap">BUY NOW</button>
//           </div>
//         </div>
//         {/* Right Image */}
//         <div className="relative w-full flex-1 h-[400px] rounded-2xl overflow-hidden shadow-sm group">
//           <img src={imgSet1.right} alt="Audio Product" className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105" />
//           <div className="absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 z-10">
//             {/* ⚡ BUY NOW BUTTON FIX */}
//             <button onClick={() => product && setQuickViewProduct(product)} className="bg-black text-white px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap">BUY NOW</button>
//           </div>
//         </div>
//       </div>

//       {/* 2. DUAL VIDEO SECTION (Cover Fixed) */}
//       <section className="w-[98%] mx-auto mt-16 mb-20">
//         <h3 className="text-center text-[15px] uppercase tracking-[0.4em] font-bold mb-8 text-black opacity-60">
//           Unboxing & Review
//         </h3>
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Left Video */}
//           {/* Left Video - Perfect Fit (No scale, No cut) */}
// <div className="w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black flex items-center justify-center">
//   <iframe 
//     className="w-full h-full" 
//     src="https://www.youtube.com/embed/C6Mx6BWcSMo" 
//     title="Video 1" 
//     frameBorder="0" 
//     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
//     allowFullScreen
//   ></iframe>
// </div>
//           {/* Right Video */}
//           <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-black">
//             <iframe 
//               className="absolute top-0 left-0 w-full h-full object-cover" 
//               src="https://www.youtube.com/embed/baITH2OP6tk" 
//               title="Video 2" 
//               frameBorder="0" 
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       </section>

//       {quickViewProduct && (
//         <QuickModel isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} product={quickViewProduct} />
//       )}
//     </div>
//   );
// };

// export default MarshallWideLayout;

// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../utils/axiosInstance';
// import QuickModel from '../Product/ProductDetailModel';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';

// const MarshallWideLayout = () => {
//   const [product, setProduct] = useState(null); 
//   const [leftProduct, setLeftProduct] = useState(null); 
//   const [quickViewProduct, setQuickViewProduct] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const { data } = await axiosInstance.get('/products');
//         if (data.success && data.products.length > 0) {
//           const minorIV = data.products.find(p => p.name?.toLowerCase().includes('minor iv') || p.name?.toLowerCase().includes('minor 4'));
//           setProduct(minorIV || data.products[0]);
//           const middletonSpeaker = data.products.find(p => {
//             const name = p.name?.toLowerCase().trim() || '';
//             return name.includes('middleton') && !name.includes('ii') && !name.includes(' 2');
//           });
//           setLeftProduct(middletonSpeaker || data.products[0]);
//         }
//       } catch (error) {
//         console.error("Error fetching wide layout product:", error);
//       }
//     };
//     fetchProduct();
//   }, []);

//   const imgSet1 = {
//     left: "https://static0.anpoimages.com/wordpress/wp-content/uploads/2025/01/marshall-middleton-lifestyle.jpg?w=1600&h=1200&fit=crop",
//     right: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgnpw_PdZG52JMN2JsH2j8peuJQB3M6QhZqIyP8o__LHl8odlJSn7UgO0XxqyeHT6NvV9UBvebQ3xtFAGYMCNqwvcfdPgdajUbqkDxJvT3r4WyhbAbAvwuZt69Wlya4VA56sXVGkwVZv9HI7KVTO3F7dtIZrkq86nv9KDxdEiZQk0nfjwKjpk0s2e0YS-Y/s800/marshall-minor-iv-banner.png"
//   };

//   const youtubeVideos = [
//     { id: 1, url: "https://www.youtube.com/embed/C6Mx6BWcSMo" },
//     { id: 2, url: "https://www.youtube.com/embed/baITH2OP6tk" },
//     { id: 3, url: "https://www.youtube.com/embed/SNaTiQE_1To?si=FcrsWnAk1Ezdd4z-" },
//     { id: 4, url: "https://www.youtube.com/embed/g7fvhCyrqBo?si=2nGOKoX-THWRS4hH" },
//     { id: 5, url: "https://www.youtube.com/embed/seYkKOGqAUM?si=smDQskU4sp9zQIva" }
//   ];

//   return (
//     <div className="w-full bg-white flex flex-col items-center justify-center pt-10 pb-10 px-2 md:px-4 font-sans">
      
//       {/* 1. MARSHALL LAYOUT (Rounded Images) */}
//       <div className="relative w-[98%] mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-[70px]">
//         {/* Left Image */}
//         <div className="relative w-full flex-1 h-[400px] rounded-2xl overflow-hidden shadow-sm group">
//           <img src={imgSet1.left} alt="Model Portrait" className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105" />
//           <div className="absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 z-10">
//             <button onClick={() => leftProduct && setQuickViewProduct(leftProduct)} className="bg-black text-white px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap">BUY NOW</button>
//           </div>
//         </div>
//         {/* Right Image */}
//         <div className="relative w-full flex-1 h-[400px] rounded-2xl overflow-hidden shadow-sm group">
//           <img src={imgSet1.right} alt="Audio Product" className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105" />
//           <div className="absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 z-10">
//             <button onClick={() => product && setQuickViewProduct(product)} className="bg-black text-white px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap">BUY NOW</button>
//           </div>
//         </div>
//       </div>

//       {/* 2. DUAL VIDEO SECTION */}
//       <section className="w-[98%] mx-auto mt-16 mb-8 relative">
//         <h3 className="text-center text-[15px] uppercase tracking-[0.4em] font-bold mb-8 text-black opacity-60">
//           Unboxing & Review
//         </h3>
        
//         <div className="w-full relative">
          
//           <style>{`
//             .swiper-pagination {
//               bottom: 0px !important;
//             }
//           `}</style>

//           <Swiper
//             modules={[Pagination, Autoplay]}
//             spaceBetween={20}
//             slidesPerView={1.1} 
//             grabCursor={true}
//             pagination={{ clickable: true }}
//             autoplay={{ delay: 3000, disableOnInteraction: false }} 
//             breakpoints={{
//               768: {
//                 slidesPerView: 2, 
//                 spaceBetween: 30
//               }
//             }}
//             className="w-full pb-10" 
//           >
//             {youtubeVideos.map((video) => (
//               /* ⚡ YAHAN FIX KIYA: style={{ height: 'auto' }} lagaya taaki Swiper isko lamba na kheeche */
//               <SwiperSlide key={video.id} style={{ height: 'auto' }} className="flex items-center justify-center">
//                 <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-xl bg-black relative">
//                   <iframe 
//                     className="absolute top-0 left-0 w-full h-full" 
//                     src={video.url} 
//                     title={`Video ${video.id}`} 
//                     frameBorder="0" 
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
//                     referrerPolicy="strict-origin-when-cross-origin"
//                     allowFullScreen
//                   ></iframe>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </section>

//       {quickViewProduct && (
//         <QuickModel isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} product={quickViewProduct} />
//       )}
//     </div>
//   );
// };

// export default MarshallWideLayout;

// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../utils/axiosInstance';
// import QuickModel from '../Product/ProductDetailModel';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';

// const MarshallWideLayout = () => {
//   const [product, setProduct] = useState(null); 
//   const [leftProduct, setLeftProduct] = useState(null); 
//   const [quickViewProduct, setQuickViewProduct] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const { data } = await axiosInstance.get('/products');
//         if (data.success && data.products.length > 0) {
//           const minorIV = data.products.find(p => p.name?.toLowerCase().includes('minor iv') || p.name?.toLowerCase().includes('minor 4'));
//           setProduct(minorIV || data.products[0]);
//           const middletonSpeaker = data.products.find(p => {
//             const name = p.name?.toLowerCase().trim() || '';
//             return name.includes('middleton') && !name.includes('ii') && !name.includes(' 2');
//           });
//           setLeftProduct(middletonSpeaker || data.products[0]);
//         }
//       } catch (error) {
//         console.error("Error fetching wide layout product:", error);
//       }
//     };
//     fetchProduct();
//   }, []);

//   const imgSet1 = {
//     left: "https://static0.anpoimages.com/wordpress/wp-content/uploads/2025/01/marshall-middleton-lifestyle.jpg?w=1600&h=1200&fit=crop",
//     right: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgnpw_PdZG52JMN2JsH2j8peuJQB3M6QhZqIyP8o__LHl8odlJSn7UgO0XxqyeHT6NvV9UBvebQ3xtFAGYMCNqwvcfdPgdajUbqkDxJvT3r4WyhbAbAvwuZt69Wlya4VA56sXVGkwVZv9HI7KVTO3F7dtIZrkq86nv9KDxdEiZQk0nfjwKjpk0s2e0YS-Y/s800/marshall-minor-iv-banner.png"
//   };

//   const youtubeVideos = [
//     { id: 1, url: "https://www.youtube.com/embed/C6Mx6BWcSMo" },
//     { id: 2, url: "https://www.youtube.com/embed/baITH2OP6tk" },
//     { id: 3, url: "https://www.youtube.com/embed/SNaTiQE_1To?si=FcrsWnAk1Ezdd4z-" },
//     { id: 4, url: "https://www.youtube.com/embed/g7fvhCyrqBo?si=2nGOKoX-THWRS4hH" },
//     { id: 5, url: "https://www.youtube.com/embed/seYkKOGqAUM?si=smDQskU4sp9zQIva" }
//   ];

//   return (
//     <div className="w-full bg-white flex flex-col items-center justify-center pt-10 pb-10 px-2 md:px-4 font-sans">
      
//       {/* 1. MARSHALL LAYOUT (Rounded Images) */}
//       <div className="relative w-[98%] mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-[70px]">
//         {/* Left Image */}
//         <div className="relative w-full flex-1 h-[400px] rounded-2xl overflow-hidden shadow-sm group">
//           <img src={imgSet1.left} alt="Model Portrait" className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105" />
//           <div className="absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 z-10">
//             <button onClick={() => leftProduct && setQuickViewProduct(leftProduct)} className="bg-black text-white px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap">BUY NOW</button>
//           </div>
//         </div>
//         {/* Right Image */}
//         <div className="relative w-full flex-1 h-[400px] rounded-2xl overflow-hidden shadow-sm group">
//           <img src={imgSet1.right} alt="Audio Product" className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105" />
//           <div className="absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 z-10">
//             <button onClick={() => product && setQuickViewProduct(product)} className="bg-black text-white px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap">BUY NOW</button>
//           </div>
//         </div>
//       </div>

//       {/* 2. DUAL VIDEO SECTION */}
//       <section className="w-[98%] mx-auto mt-16 mb-8 relative">
//         <h3 className="text-center text-[15px] uppercase tracking-[0.4em] font-bold mb-8 text-black opacity-60">
//           Unboxing & Review
//         </h3>
        
//         <div className="w-full relative">
          
//           <style>{`
//             .swiper-pagination {
//               bottom: 0px !important;
//             }
//           `}</style>

//           <Swiper
//             modules={[Pagination, Autoplay]}
//             spaceBetween={20}
//             slidesPerView={1.1} 
//             grabCursor={true}
//             allowTouchMove={true}
//             pagination={{ clickable: true }}
//             autoplay={{ delay: 3000, disableOnInteraction: false }} 
//             breakpoints={{
//               768: {
//                 slidesPerView: 2, 
//                 spaceBetween: 30
//               }
//             }}
//             className="w-full pb-10" 
//           >
//             {youtubeVideos.map((video) => (
//               <SwiperSlide key={video.id} style={{ height: 'auto' }} className="flex items-center justify-center">
//                 <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-xl bg-black relative">
                  
//                   {/* ⚡ THE FRAME HACK: Mobile aur cursor se aaram se swipe karne ke liye invisible border */}
//                   <div className="absolute top-0 left-0 w-full h-[25%] z-10"></div>
//                   <div className="absolute bottom-0 left-0 w-full h-[25%] z-10"></div>
//                   <div className="absolute top-0 left-0 w-[20%] h-full z-10"></div>
//                   <div className="absolute top-0 right-0 w-[20%] h-full z-10"></div>

//                   <iframe 
//                     className="absolute top-0 left-0 w-full h-full" 
//                     src={video.url} 
//                     title={`Video ${video.id}`} 
//                     frameBorder="0" 
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
//                     referrerPolicy="strict-origin-when-cross-origin"
//                     allowFullScreen
//                   ></iframe>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </section>

//       {quickViewProduct && (
//         <QuickModel isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} product={quickViewProduct} />
//       )}
//     </div>
//   );
// };

// export default MarshallWideLayout;
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import QuickModel from '../Product/ProductDetailModel';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const MarshallWideLayout = () => {
  const [product, setProduct] = useState(null); 
  const [leftProduct, setLeftProduct] = useState(null); 
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosInstance.get('/products');
        if (data.success && data.products.length > 0) {
          const minorIV = data.products.find(p => p.name?.toLowerCase().includes('minor iv') || p.name?.toLowerCase().includes('minor 4'));
          setProduct(minorIV || data.products[0]);
          const middletonSpeaker = data.products.find(p => {
            const name = p.name?.toLowerCase().trim() || '';
            return name.includes('middleton') && !name.includes('ii') && !name.includes(' 2');
          });
          setLeftProduct(middletonSpeaker || data.products[0]);
        }
      } catch (error) {
        console.error("Error fetching wide layout product:", error);
      }
    };
    fetchProduct();
  }, []);

  const imgSet1 = {
    left: "https://static0.anpoimages.com/wordpress/wp-content/uploads/2025/01/marshall-middleton-lifestyle.jpg?w=1600&h=1200&fit=crop",
    right: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgnpw_PdZG52JMN2JsH2j8peuJQB3M6QhZqIyP8o__LHl8odlJSn7UgO0XxqyeHT6NvV9UBvebQ3xtFAGYMCNqwvcfdPgdajUbqkDxJvT3r4WyhbAbAvwuZt69Wlya4VA56sXVGkwVZv9HI7KVTO3F7dtIZrkq86nv9KDxdEiZQk0nfjwKjpk0s2e0YS-Y/s800/marshall-minor-iv-banner.png"
  };

  const youtubeVideos = [
    { id: 1, url: "https://www.youtube.com/embed/C6Mx6BWcSMo" },
    { id: 2, url: "https://www.youtube.com/embed/baITH2OP6tk" },
    { id: 3, url: "https://www.youtube.com/embed/SNaTiQE_1To?si=FcrsWnAk1Ezdd4z-" },
    { id: 4, url: "https://www.youtube.com/embed/g7fvhCyrqBo?si=2nGOKoX-THWRS4hH" },
    { id: 5, url: "https://www.youtube.com/embed/seYkKOGqAUM?si=smDQskU4sp9zQIva" }
  ];

  return (
    <div className="w-full bg-white flex flex-col items-center justify-center pt-10 pb-2 px-2 md:px-4 font-sans">
      
      {/* 1. MARSHALL LAYOUT */}
      <div className="relative w-[98%] mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-[70px]">
        {/* Left Image */}
        <div className="relative w-full flex-1 h-[400px] rounded-2xl overflow-hidden shadow-sm group">
          <img src={imgSet1.left} alt="Model Portrait" className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105" />
          <div className="absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 z-10">
            <button onClick={() => leftProduct && setQuickViewProduct(leftProduct)} className="bg-black text-white px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap">BUY NOW</button>
          </div>
        </div>
        {/* Right Image */}
        <div className="relative w-full flex-1 h-[400px] rounded-2xl overflow-hidden shadow-sm group">
          <img src={imgSet1.right} alt="Audio Product" className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105" />
          <div className="absolute bottom-5 md:bottom-10 left-1/2 -translate-x-1/2 z-10">
            <button onClick={() => product && setQuickViewProduct(product)} className="bg-black text-white px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap">BUY NOW</button>
          </div>
        </div>
      </div>

      {/* 2. DUAL VIDEO SECTION */}
      <section className="w-[98%] mx-auto mt-16 mb-2 relative group">
        <h3 className="text-center text-[15px] uppercase tracking-[0.4em] font-bold mb-8 text-black opacity-60">
          Unboxing & Review
        </h3>
        
        <div className="w-full relative">

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={24} 
            slidesPerView={1.1} 
            grabCursor={true}
            allowTouchMove={true}
            rewind={true} 
            navigation={{
              prevEl: '.custom-prev-btn',
              nextEl: '.custom-next-btn',
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }} 
            breakpoints={{
              768: {
                slidesPerView: 2, 
                // ⚡ YAHAN FIX KIYA: Upar wali image ke gap-[70px] se exact match kara diya
                spaceBetween: 70 
              }
            }}
            className="w-full pb-0" 
          >
            {youtubeVideos.map((video) => (
              <SwiperSlide key={video.id} style={{ height: 'auto' }} className="flex items-center justify-center">
                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-xl bg-black relative">
                  
                  {/* MAGIC BLANKET HACK */}
                  <div 
                    className="absolute inset-0 w-full h-full z-10 cursor-pointer" 
                    onClick={(e) => { e.currentTarget.style.pointerEvents = 'none'; }}
                  ></div>

                  <iframe 
                    className="absolute top-0 left-0 w-full h-full" 
                    src={video.url} 
                    title={`Video ${video.id}`} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex items-center justify-center gap-4 mt-3">
            <button className="custom-prev-btn w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all z-20 cursor-pointer text-black">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button className="custom-next-btn w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all z-20 cursor-pointer text-black">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>

        </div>
      </section>

      {quickViewProduct && (
        <QuickModel isOpen={!!quickViewProduct} onClose={() => setQuickViewProduct(null)} product={quickViewProduct} />
      )}
    </div>
  );
};

export default MarshallWideLayout;

// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../utils/axiosInstance';
// import QuickModel from '../Product/ProductDetailModel';

// const MarshallDesign = () => {
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quickViewProduct, setQuickViewProduct] = useState(null);

//   useEffect(() => {
//     const fetchBestProduct = async () => {
//       try {
//         const response = await axiosInstance.get('/products');
//         if (response.data && response.data.products && response.data.products.length > 0) {
//           const products = response.data.products;
//           // ⚡ FIX: Yahan ab hamesha Tufton ko dhundhega backend se
//           const tuftonProduct = products.find(p => p.name?.toLowerCase().includes('tufton')) || products[products.length - 1];
//           setProduct(tuftonProduct);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching views product:', error);
//         setLoading(false);
//       }
//     };
//     fetchBestProduct();
//   }, []);

//   if (loading || !product) return null;

//   const imageUrl = product?.images?.[0]?.url || product?.variants?.[0]?.images?.[0]?.url || "https://images.unsplash.com/photo-1692651763027-72aeb12130d7?w=800&auto=format&fit=crop&q=60";
//   const name = product?.name || "MARSHALL ACTIVE 3";
  
//   const defaultTuftonDesc = "Marshall Tufton is Marshall’s most powerful portable Bluetooth speaker, designed for massive 360° sound, deep bass, and long-lasting outdoor performance. Inspired by classic Marshall guitar amplifiers, it features a premium vintage design with a textured leather-like finish.";
  
//   const stripHtml = (html) => html ? html.replace(/<[^>]*>?/gm, '').trim() : '';
//   const description = stripHtml(product?.description) || defaultTuftonDesc;
  
//   const originalPrice = Number(product.price) || 0;
//   const discount = Number(product.discountPrice) || 0;
//   const finalPrice = originalPrice - discount;

//   // Stock text ko check karne ka logic
//   const checkStock = (stockVal) => {
//     if (!stockVal) return false;
//     const valStr = String(stockVal).toLowerCase().trim();
//     return valStr !== '0' && valStr !== 'out of stock' && valStr !== 'false';
//   };

//   // SIRF Variants ko target karega
//   const isAvailable = product?.variants?.some(v => checkStock(v.stock)) || false;

//   return (
//     <div className="w-full flex flex-col items-center justify-center bg-white py-12 px-4 lg:px-12">
      
//       <div className="w-full flex flex-col md:flex-row justify-between items-stretch h-auto md:h-[450px]">

//         {/* LEFT SECTION (Image) */}
//         <div className="w-full md:w-[46%] h-[300px] md:h-full bg-white shadow-sm overflow-hidden">
//           <img 
//             src={imageUrl} 
//             alt={name} 
//             className="w-full h-full object-cover object-center"
//           />
//         </div>

//         {/* RIGHT SECTION (Grey Box) */}
//         <div className="w-full md:w-[50%] h-auto md:h-full relative mt-8 md:mt-0">
          
//           <div className="hidden md:block absolute inset-0 bg-[#1a1a1a] [clip-path:polygon(10%_0,100%_0,100%_100%,0_100%)] z-10"></div>
          
//           <div className="relative h-full w-full bg-[#ebebeb] md:[clip-path:polygon(calc(10%+2.5px)_0,100%_0,100%_100%,2.5px_100%)] flex flex-col justify-center px-8 sm:px-12 md:pl-[18%] md:pr-12 py-12 md:py-0 z-20">
            
//             <h1 className="text-2xl md:text-3xl lg:text-[32px] font-serif text-[#333] mb-5 uppercase tracking-wide leading-tight">
//               {name}
//             </h1>
            
//             <div className="mb-6">
//               <h3 className="text-[10px] md:text-[11px] font-bold text-black uppercase tracking-widest border-b-[1.5px] border-black pb-0.5 inline-block mb-3">
//                 Description
//               </h3>
//               <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed max-w-sm line-clamp-4">
//                 {description}
//               </p>
//             </div>

//             <div className="mb-6 flex items-center gap-4">
//               <div className="flex items-center gap-2">
//                 <span className="text-xl md:text-2xl font-bold text-black tracking-tight">
//                   ₹{finalPrice.toLocaleString()}
//                 </span>
//                 {discount > 0 && (
//                   <span className="text-lg text-gray-400 line-through">
//                     ₹{originalPrice.toLocaleString()}
//                   </span>
//                 )}
//               </div>
//               <span className={`${isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest`}>
//                 {isAvailable ? 'Available' : 'Out of Stock'}
//               </span>
//             </div>

//             <button 
//               onClick={() => setQuickViewProduct(product)}
//               className="bg-black text-white px-10 py-3 rounded-full text-[10px] font-bold hover:bg-gray-800 transition-all shadow-md active:scale-95 uppercase tracking-[0.2em] w-max cursor-pointer"
//             >
//               Shop Now
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
//     </div>
//   );
// };

// export default MarshallDesign;

// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../utils/axiosInstance';
// import QuickModel from '../Product/ProductDetailModel';

// const MarshallDesign = () => {
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quickViewProduct, setQuickViewProduct] = useState(null);

//   useEffect(() => {
//     const fetchBestProduct = async () => {
//       try {
//         const response = await axiosInstance.get('/products');
//         if (response.data && response.data.products && response.data.products.length > 0) {
//           const products = response.data.products;
//           // ⚡ FIX: Yahan ab hamesha Tufton ko dhundhega backend se
//           const tuftonProduct = products.find(p => p.name?.toLowerCase().includes('tufton')) || products[products.length - 1];
//           setProduct(tuftonProduct);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching views product:', error);
//         setLoading(false);
//       }
//     };
//     fetchBestProduct();
//   }, []);

//   if (loading || !product) return null;

//   const imageUrl = product?.images?.[0]?.url || product?.variants?.[0]?.images?.[0]?.url || "https://images.unsplash.com/photo-1692651763027-72aeb12130d7?w=800&auto=format&fit=crop&q=60";
//   const name = product?.name || "MARSHALL ACTIVE 3";
  
//   const defaultTuftonDesc = "Marshall Tufton is Marshall’s most powerful portable Bluetooth speaker, designed for massive 360° sound, deep bass, and long-lasting outdoor performance. Inspired by classic Marshall guitar amplifiers, it features a premium vintage design with a textured leather-like finish.";
  
//   const stripHtml = (html) => html ? html.replace(/<[^>]*>?/gm, '').trim() : '';
//   const description = stripHtml(product?.description) || defaultTuftonDesc;
  
//   const originalPrice = Number(product.price) || 0;
//   const discount = Number(product.discountPrice) || 0;
//   const finalPrice = originalPrice - discount;

//   // Stock text ko check karne ka logic
//   const checkStock = (stockVal) => {
//     if (!stockVal) return false;
//     const valStr = String(stockVal).toLowerCase().trim();
//     return valStr !== '0' && valStr !== 'out of stock' && valStr !== 'false';
//   };

//   // SIRF Variants ko target karega
//   const isAvailable = product?.variants?.some(v => checkStock(v.stock)) || false;

//   return (
//     <div className="w-full flex flex-col items-center justify-center bg-white py-12 px-4 lg:px-12">
      
//       <div className="w-full flex flex-col md:flex-row justify-between items-stretch h-auto md:h-[450px]">

//         {/* LEFT SECTION (Image) */}
//         {/* ⚡ FIX: Added group and cursor-pointer for hover target */}
//         <div className="w-full md:w-[46%] h-[300px] md:h-full bg-white shadow-sm overflow-hidden group cursor-pointer">
//           <img 
//             src={imageUrl} 
//             alt={name} 
//             className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
//           />
//         </div>

//         {/* RIGHT SECTION (Grey Box) */}
//         <div className="w-full md:w-[50%] h-auto md:h-full relative mt-8 md:mt-0">
          
//           <div className="hidden md:block absolute inset-0 bg-[#1a1a1a] [clip-path:polygon(10%_0,100%_0,100%_100%,0_100%)] z-10"></div>
          
//           <div className="relative h-full w-full bg-[#ebebeb] md:[clip-path:polygon(calc(10%+2.5px)_0,100%_0,100%_100%,2.5px_100%)] flex flex-col justify-center px-8 sm:px-12 md:pl-[18%] md:pr-12 py-12 md:py-0 z-20">
            
//             <h1 className="text-2xl md:text-3xl lg:text-[32px] font-serif text-[#333] mb-5 uppercase tracking-wide leading-tight">
//               {name}
//             </h1>
            
//             <div className="mb-6">
//               <h3 className="text-[10px] md:text-[11px] font-bold text-black uppercase tracking-widest border-b-[1.5px] border-black pb-0.5 inline-block mb-3">
//                 Description
//               </h3>
//               <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed max-w-sm line-clamp-4">
//                 {description}
//               </p>
//             </div>

//             <div className="mb-6 flex items-center gap-4">
//               <div className="flex items-center gap-2">
//                 <span className="text-xl md:text-2xl font-bold text-black tracking-tight">
//                   ₹{finalPrice.toLocaleString()}
//                 </span>
//                 {discount > 0 && (
//                   <span className="text-lg text-gray-400 line-through">
//                     ₹{originalPrice.toLocaleString()}
//                   </span>
//                 )}
//               </div>
//               <span className={`${isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest`}>
//                 {isAvailable ? 'Available' : 'Out of Stock'}
//               </span>
//             </div>

//             <button 
//               onClick={() => setQuickViewProduct(product)}
//               className="bg-black text-white px-10 py-3 rounded-full text-[10px] font-bold hover:bg-gray-800 transition-all shadow-md active:scale-95 uppercase tracking-[0.2em] w-max cursor-pointer"
//             >
//               Shop Now
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
//     </div>
//   );
// };

// export default MarshallDesign;


// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../utils/axiosInstance';
// import QuickModel from '../Product/ProductDetailModel';

// const MarshallDesign = () => {
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quickViewProduct, setQuickViewProduct] = useState(null);

//   useEffect(() => {
//     const fetchBestProduct = async () => {
//       try {
//         const response = await axiosInstance.get('/products');
//         if (response.data && response.data.products && response.data.products.length > 0) {
//           const products = response.data.products;
//           // Hamesha Tufton ko dhundhega backend se
//           const tuftonProduct = products.find(p => p.name?.toLowerCase().includes('tufton')) || products[products.length - 1];
//           setProduct(tuftonProduct);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching views product:', error);
//         setLoading(false);
//       }
//     };
//     fetchBestProduct();
//   }, []);

//   if (loading || !product) return null;

//   const imageUrl = product?.images?.[0]?.url || product?.variants?.[0]?.images?.[0]?.url || "https://images.unsplash.com/photo-1692651763027-72aeb12130d7?w=800&auto=format&fit=crop&q=60";
//   const name = product?.name || "MARSHALL ACTIVE 3";
  
//   const defaultTuftonDesc = "Marshall Tufton is Marshall’s most powerful portable Bluetooth speaker, designed for massive 360° sound, deep bass, and long-lasting outdoor performance. Inspired by classic Marshall guitar amplifiers, it features a premium vintage design with a textured leather-like finish.";
  
//   const stripHtml = (html) => html ? html.replace(/<[^>]*>?/gm, '').trim() : '';
//   const description = stripHtml(product?.description) || defaultTuftonDesc;
  
//   const originalPrice = Number(product.price) || 0;
//   const discount = Number(product.discountPrice) || 0;
//   const finalPrice = originalPrice - discount;

//   const checkStock = (stockVal) => {
//     if (!stockVal) return false;
//     const valStr = String(stockVal).toLowerCase().trim();
//     return valStr !== '0' && valStr !== 'out of stock' && valStr !== 'false';
//   };

//   const isAvailable = product?.variants?.some(v => checkStock(v.stock)) || false;

//   return (
//     <div className="w-full flex flex-col items-center justify-center bg-white py-12 px-4 lg:px-12">
      
//       <div className="w-full flex flex-col md:flex-row justify-between items-stretch h-auto md:h-[450px]">

//         {/* LEFT SECTION (Image) */}
//         {/* ⚡ FIX: Added padding (p-8 md:p-12), flex centering, and object-contain */}
//         <div 
//           className="w-full md:w-[46%] h-[300px] md:h-full bg-white flex items-center justify-center p-8 md:p-12 shadow-sm overflow-hidden group cursor-pointer"
//           onClick={() => setQuickViewProduct(product)}
//         >
//           <img 
//             src={imageUrl} 
//             alt={name} 
//             className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ease-in-out group-hover:scale-105"
//           />
//         </div>

//         {/* RIGHT SECTION (Grey Box) */}
//         <div className="w-full md:w-[50%] h-auto md:h-full relative mt-8 md:mt-0">
          
//           <div className="hidden md:block absolute inset-0 bg-[#1a1a1a] [clip-path:polygon(10%_0,100%_0,100%_100%,0_100%)] z-10"></div>
          
//           <div className="relative h-full w-full bg-[#ebebeb] md:[clip-path:polygon(calc(10%+2.5px)_0,100%_0,100%_100%,2.5px_100%)] flex flex-col justify-center px-8 sm:px-12 md:pl-[18%] md:pr-12 py-12 md:py-0 z-20">
            
//             <h1 className="text-2xl md:text-3xl lg:text-[32px] font-serif text-[#333] mb-5 uppercase tracking-wide leading-tight">
//               {name}
//             </h1>
            
//             <div className="mb-6">
//               <h3 className="text-[10px] md:text-[11px] font-bold text-black uppercase tracking-widest border-b-[1.5px] border-black pb-0.5 inline-block mb-3">
//                 Description
//               </h3>
//               <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed max-w-sm line-clamp-4">
//                 {description}
//               </p>
//             </div>

//             <div className="mb-6 flex items-center gap-4">
//               <div className="flex items-center gap-2">
//                 <span className="text-xl md:text-2xl font-bold text-black tracking-tight">
//                   ₹{finalPrice.toLocaleString()}
//                 </span>
//                 {discount > 0 && (
//                   <span className="text-lg text-gray-400 line-through">
//                     ₹{originalPrice.toLocaleString()}
//                   </span>
//                 )}
//               </div>
//               <span className={`${isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest`}>
//                 {isAvailable ? 'Available' : 'Out of Stock'}
//               </span>
//             </div>

//             <button 
//               onClick={() => setQuickViewProduct(product)}
//               className="bg-black text-white px-10 py-3 rounded-full text-[10px] font-bold hover:bg-gray-800 transition-all shadow-md active:scale-95 uppercase tracking-[0.2em] w-max cursor-pointer"
//             >
//               Shop Now
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
//     </div>
//   );
// };

// export default MarshallDesign;

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import QuickModel from '../Product/ProductDetailModel';
import { Volume2, BatteryCharging, Droplet, Bluetooth, ShieldCheck, Truck, ArrowRight } from 'lucide-react';

const MarshallDesign = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // ⚡ LOGIC IS 100% UNTOUCHED
  useEffect(() => {
    const fetchBestProduct = async () => {
      try {
        const response = await axiosInstance.get('/products');
        if (response.data && response.data.products && response.data.products.length > 0) {
          const products = response.data.products;
          const tuftonProduct = products.find(p => p.name?.toLowerCase().includes('tufton')) || products[products.length - 1];
          setProduct(tuftonProduct);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching views product:', error);
        setLoading(false);
      }
    };
    fetchBestProduct();
  }, []);

  if (loading || !product) return null;

  const imageUrl = product?.images?.[0]?.url || product?.variants?.[0]?.images?.[0]?.url || "https://images.unsplash.com/photo-1692651763027-72aeb12130d7?w=800&auto=format&fit=crop&q=60";
  const name = product?.name || "MARSHALL TUFTON";
  const defaultTuftonDesc = "Marshall Tufton is Marshall’s most powerful portable Bluetooth speaker, designed for massive 360° sound, deep bass, and long-lasting outdoor performance. Inspired by classic Marshall guitar amplifiers, it features a premium vintage design with a textured finish.";
  const stripHtml = (html) => html ? html.replace(/<[^>]*>?/gm, '').trim() : '';
  const description = stripHtml(product?.description) || defaultTuftonDesc;
  const originalPrice = Number(product.price) || 0;
  const discount = Number(product.discountPrice) || 0;
  const finalPrice = originalPrice - discount;

  const checkStock = (stockVal) => {
    if (!stockVal) return false;
    const valStr = String(stockVal).toLowerCase().trim();
    return valStr !== '0' && valStr !== 'out of stock' && valStr !== 'false';
  };

  const isAvailable = product?.variants?.some(v => checkStock(v.stock)) || false;

  return (
    <div className="w-full flex flex-col items-center justify-center bg-white py-12 px-4 lg:px-12 font-sans relative z-10">
      
      {/* ⚡ NEW UI WRAPPER: Exact Match */}
      <div className="w-full max-w-[1300px] flex flex-col md:flex-row h-auto md:h-[440px] bg-white rounded-[24px] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.04)] border border-gray-100 relative z-20">

        {/* --- LEFT SECTION (Image & Decor) --- */}
        <div 
          className="w-full md:w-[45%] h-[350px] md:h-full relative p-8 flex items-center justify-center cursor-pointer group z-20"
          onClick={() => setQuickViewProduct(product)}
        >
          {/* Decorative Beige Circle */}
          <div className="absolute -bottom-24 -left-16 w-80 h-80 bg-[#F6F0E7] rounded-full z-0 transition-transform duration-700 group-hover:scale-105"></div>
          
          {/* Decorative Dots (Left) */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 grid grid-cols-2 gap-2 opacity-30 z-0">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-[#C8A253] rounded-full"></div>
            ))}
          </div>

          {/* Product Image */}
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ease-out "
          />
        </div>

        {/* --- THE SLANTED GOLDEN LINE & BG (Desktop) --- */}
        <div className="hidden md:block absolute inset-0 z-10 pointer-events-none">
          {/* Golden Line */}
          <div className="absolute top-0 bottom-0 left-[45%] right-0 bg-[#C8A253] [clip-path:polygon(15%_0,100%_0,100%_100%,0_100%)]"></div>
          {/* Cream Background overlay shifted by 1.5px */}
          <div className="absolute top-0 bottom-0 left-[45%] right-0 bg-[#FCFBF8] ml-[1.5px] [clip-path:polygon(15%_0,100%_0,100%_100%,0_100%)]"></div>
        </div>
        
        {/* Mobile Background Separator */}
        <div className="md:hidden w-full h-[2px] bg-[#C8A253]"></div>

        {/* --- RIGHT SECTION (Content) --- */}
        <div className="w-full md:w-[55%] relative flex flex-col justify-center px-6 py-10 md:pl-[12%] md:pr-12 lg:pr-16 z-20 bg-[#FCFBF8] md:bg-transparent">
          
          {/* Decorative Dots (Top Right) */}
          <div className="absolute top-8 right-8 grid grid-cols-4 gap-2 opacity-20 hidden sm:grid">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-gray-400 rounded-full"></div>
            ))}
          </div>

          <div className="relative z-20">
            {/* Tag */}
            <div className="mb-4">
              <span className="text-[8px] md:text-[11px] font-bold text-[#A87E43] tracking-[0.15em] uppercase">
                Premium Sound
              </span>
              <div className="w-16 h-[1.5px] bg-[#A87E43] mt-1.5"></div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-[32px] font-serif font-bold text-[#111] mb-2">
              {name}
            </h1>

            {/* Description */}
            <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed max-w-lg mb-8">
              {description}
            </p>

            {/* Features Row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2.5">
                <Volume2 className="text-[#A87E43]" size={22} strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#111]">360°</span>
                  <span className="text-[9px] text-gray-500">Sound</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <BatteryCharging className="text-[#A87E43]" size={22} strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#111]">20+</span>
                  <span className="text-[9px] text-gray-500">Hours Playtime</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Droplet className="text-[#A87E43]" size={22} strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#111]">IPX2</span>
                  <span className="text-[9px] text-gray-500">Water Resistant</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Bluetooth className="text-[#A87E43]" size={22} strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-[#111]">5.0</span>
                  <span className="text-[9px] text-gray-500">Bluetooth</span>
                </div>
              </div>
            </div>

            {/* Price & Status Row */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xl md:text-2xl font-bold text-[#111] tracking-tight">
                ₹{finalPrice.toLocaleString()}
              </span>
              {discount > 0 && (
                <span className="text-base text-gray-400 line-through">
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
              <span className={`ml-2 text-[9px] font-bold px-3 py-1.5 rounded uppercase tracking-wider ${isAvailable ? 'bg-[#E0F2E9] text-[#299555]' : 'bg-red-100 text-red-700'}`}>
                {isAvailable ? 'Available' : 'Out of Stock'}
              </span>
            </div>

            {/* Action Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <button 
                onClick={() => setQuickViewProduct(product)}
                className="flex items-center justify-center gap-3 bg-[#111] text-white px-8 py-3.5 rounded-lg text-[11px] font-bold hover:bg-[#222] transition-colors uppercase tracking-widest w-max group shadow-lg"
              >
                Shop Now
                <ArrowRight size={15} className="text-[#C8A253] group-hover:translate-x-1 transition-transform" strokeWidth={2} />
              </button>

              {/* Badges (Warranty & Shipping) */}
              <div className="flex items-center gap-4 pl-0 sm:pl-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={20} className="text-[#A87E43]" strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#111]">1 Year</span>
                    <span className="text-[9px] text-gray-500">Warranty</span>
                  </div>
                </div>
                
                <div className="w-px h-6 bg-gray-300 hidden sm:block"></div>
                
                <div className="flex items-center gap-2">
                  <Truck size={20} className="text-[#A87E43]" strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#111]">Free</span>
                    <span className="text-[9px] text-gray-500">Shipping</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

      </div>

      {quickViewProduct && (
        <QuickModel 
          isOpen={!!quickViewProduct} 
          onClose={() => setQuickViewProduct(null)} 
          product={quickViewProduct} 
        />
      )}
    </div>
  );
};

export default MarshallDesign;
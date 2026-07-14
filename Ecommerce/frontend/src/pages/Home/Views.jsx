
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

const MarshallDesign = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

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
  const name = product?.name || "MARSHALL ACTIVE 3";
  const defaultTuftonDesc = "Marshall Tufton is Marshall’s most powerful portable Bluetooth speaker, designed for massive 360° sound, deep bass, and long-lasting outdoor performance. Inspired by classic Marshall guitar amplifiers, it features a premium vintage design with a textured leather-like finish.";
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
    <div className="w-full flex flex-col items-center justify-center bg-white py-10 px-4 lg:px-12">
      
      {/* ⚡ FIX: Added md:gap-6 for that subtle, premium separation */}
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row justify-center items-stretch h-auto md:h-[450px] md:gap-0">

        {/* LEFT SECTION (Image) */}
        <div 
          className="w-full md:w-[45%] h-[300px] md:h-full bg-white flex items-center justify-center p-8 md:p-12 shadow-sm overflow-hidden group cursor-pointer z-10"
          onClick={() => setQuickViewProduct(product)}
        >
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        </div>

        {/* RIGHT SECTION (Grey Box) */}
        {/* ⚡ FIX: Removed -ml-12 for the gap */}
        <div className="w-full md:w-[50%] h-auto md:h-full relative mt-8 md:mt-0 z-20">
          
          <div className="hidden md:block absolute inset-0 bg-[#1a1a1a] [clip-path:polygon(10%_0,100%_0,100%_100%,0_100%)] z-10"></div>
          
          <div className="relative h-full w-full bg-[#ebebeb] md:[clip-path:polygon(calc(10%+2.5px)_0,100%_0,100%_100%,2.5px_100%)] flex flex-col justify-center px-8 sm:px-12 md:pl-[18%] md:pr-12 py-12 md:py-0 z-20">
            
            <h1 className="text-2xl md:text-3xl lg:text-[32px] font-serif text-[#333] mb-5 uppercase tracking-wide leading-tight">
              {name}
            </h1>
            
            <div className="mb-6">
              <h3 className="text-[10px] md:text-[11px] font-bold text-black uppercase tracking-widest border-b-[1.5px] border-black pb-0.5 inline-block mb-3">
                Description
              </h3>
              <p className="text-[11px] md:text-xs text-gray-500 leading-relaxed max-w-sm line-clamp-4">
                {description}
              </p>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl font-bold text-black tracking-tight">
                  ₹{finalPrice.toLocaleString()}
                </span>
                {discount > 0 && (
                  <span className="text-lg text-gray-400 line-through">
                    ₹{originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <span className={`${isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest`}>
                {isAvailable ? 'Available' : 'Out of Stock'}
              </span>
            </div>

            <button 
              onClick={() => setQuickViewProduct(product)}
              className="bg-black text-white px-10 py-3 rounded-full text-[10px] font-bold hover:bg-gray-800 transition-all shadow-md active:scale-95 uppercase tracking-[0.2em] w-max cursor-pointer"
            >
              Shop Now
            </button>
            
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
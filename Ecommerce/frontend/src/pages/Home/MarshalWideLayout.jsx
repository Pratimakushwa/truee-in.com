// import React from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const MarshallWideLayout = () => {
//   // Hardcoded Images 
//   const imgSet1 = {
//     left:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu5O2VLbibhlbMalWUWL1nenxHsldPe2OP5Q&s",
//     right:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiHbqWWlKO6JKAqnl4L4MHkT8ORAy1qU55jQ&s"
//   };

//   return (
//     <div className="w-full bg-white flex items-center justify-center pt-10 pb-10 px-2 md:px-4 font-sans">

//       {/* ⚡ Main Container - Width 98% aur gap exactly 'gap-1' kar diya gaya hai */}
//       <div className="relative w-[98%] mx-auto flex flex-col md:flex-row items-center justify-center gap-1">
        
//         {/* LEFT IMAGE BOX - Height thodi badhai hai taaki width ke hisaab se acha lage */}
//         <div className="relative w-full flex-1 h-[460px] bg-gray-50 overflow-hidden shadow-sm">
//           <img 
//             src={imgSet1.left} 
//             alt="Model Portrait" 
//             className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
//           />
          
//           {/* BLACK BOX WITH BIG '✕' */}
//           <div className="absolute bottom-0 right-0 w-32 h-32 bg-black flex flex-col items-center justify-center pointer-events-none">
//             <span className="text-white text-8xl font-normal select-none mb-[-10px] opacity-90">✕</span>
//             <div className="mt-8"> 
//               <ChevronLeft className="text-white opacity-40" size={16} />
//             </div>
//           </div>
//         </div>

//         {/* ⚡ CENTER BUTTONS - Dono buttons ke beech mein halka sa gap-2 rakha hai */}
//         <div className="flex flex-row gap-2 z-30 shrink-0">
//           <button className="w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90 border border-gray-100 cursor-pointer">
//             <ChevronLeft size={20} strokeWidth={2.5} />
//           </button>
//           <button className="w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90 border border-gray-100 cursor-pointer">
//             <ChevronRight size={20} strokeWidth={2.5} />
//           </button>
//         </div>

//         {/* RIGHT IMAGE BOX */}
//         <div className="relative w-full flex-1 h-[460px] bg-gray-50 overflow-hidden shadow-sm">
//           <img 
//             src={imgSet1.right} 
//             alt="Audio Product" 
//             className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
//           />
          
//           {/* BUY NOW Button */}
//           <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
//             <button className="bg-black text-white px-9 py-4 text-[11px] rounded-lg font-bold tracking-[0.5em] uppercase hover:bg-zinc-800 transition-all shadow-xl active:scale-95 cursor-pointer">
//               BUY NOW
//             </button>
//           </div>
//         </div>

//       </div>

//       {/* Decorative Top Notch */}
//       <div className="fixed top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-black rounded-b-xl opacity-10 pointer-events-none"></div>
//     </div>
//   );
// };

// export default MarshallWideLayout;

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

//           // 2. Exact 'Marshall Middleton' ko dhundho (Left Image ke liye)
//           const middletonSpeaker = data.products.find(p => 
//             p.name?.toLowerCase().trim() === 'marshall middleton' || 
//             p.name?.toLowerCase().includes('middleton')
//           );
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
        
//         {/* ⚡ LEFT IMAGE BOX (Yahan click karne par Marshall Middleton khulega) */}
//         <div 
//           className="relative w-full flex-1 h-[460px] bg-gray-50 overflow-hidden shadow-sm cursor-pointer group"
//           onClick={() => leftProduct && setQuickViewProduct(leftProduct)}
//         >
//           <img src={imgSet1.left} alt="Model Portrait" className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
          
//           {/* Mobile par ✕ ko chhota kiya (w-20 h-20, text-5xl), Desktop par w-32 h-32 text-8xl rahega */}
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
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import QuickModel from '../Product/ProductDetailModel';

const MarshallWideLayout = () => {
  const [product, setProduct] = useState(null); // Minor IV ke liye (BUY NOW)
  const [leftProduct, setLeftProduct] = useState(null); // Marshall Middleton ke liye (Left Image)
  const [loading, setLoading] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosInstance.get('/products');
        if (data.success && data.products.length > 0) {
          
          // 1. Minor IV ko dhundho (BUY NOW button ke liye)
          const minorIV = data.products.find(p => 
            p.name?.toLowerCase().includes('minor iv') || 
            p.name?.toLowerCase().includes('minor 4')
          );
          setProduct(minorIV || data.products[0]);

          // 2. ⚡ FIX: Sirf 'Middleton' dhundho, 'Middleton II' ko ignore karo
          const middletonSpeaker = data.products.find(p => {
            const name = p.name?.toLowerCase().trim() || '';
            return name.includes('middleton') && !name.includes('ii') && !name.includes(' 2');
          });
          setLeftProduct(middletonSpeaker || data.products[0]);

        }
      } catch (error) {
        console.error("Error fetching wide layout product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  const imgSet1 = {
    left: "https://static0.anpoimages.com/wordpress/wp-content/uploads/2025/01/marshall-middleton-lifestyle.jpg?w=1600&h=1200&fit=crop",
    right: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgnpw_PdZG52JMN2JsH2j8peuJQB3M6QhZqIyP8o__LHl8odlJSn7UgO0XxqyeHT6NvV9UBvebQ3xtFAGYMCNqwvcfdPgdajUbqkDxJvT3r4WyhbAbAvwuZt69Wlya4VA56sXVGkwVZv9HI7KVTO3F7dtIZrkq86nv9KDxdEiZQk0nfjwKjpk0s2e0YS-Y/s800/marshall-minor-iv-banner.png"
  };

  return (
    <div className="w-full bg-white flex items-center justify-center pt-10 pb-10 px-2 md:px-4 font-sans">
      <div className="relative w-[98%] mx-auto flex flex-col md:flex-row items-center justify-center gap-1">
        
        {/* LEFT IMAGE BOX (Yahan click karne par Marshall Middleton khulega) */}
        <div 
          className="relative w-full flex-1 h-[460px] bg-gray-50 overflow-hidden shadow-sm cursor-pointer group"
          onClick={() => leftProduct && setQuickViewProduct(leftProduct)}
        >
          <img src={imgSet1.left} alt="Model Portrait" className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
          
          <div className="absolute bottom-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-black flex flex-col items-center justify-center pointer-events-none transition-all">
            <span className="text-white text-5xl md:text-8xl font-normal select-none mb-[-5px] md:mb-[-10px] opacity-90">✕</span>
            <div className="mt-4 md:mt-8"> 
              <ChevronLeft className="text-white opacity-40" size={16} /> 
            </div>
          </div>
        </div>

        {/* CENTER BUTTONS */}
        <div className="flex flex-row gap-2 z-30 shrink-0 my-2 md:my-0">
          <button className="w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90 border border-gray-100 cursor-pointer">
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          <button className="w-12 h-12 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-90 border border-gray-100 cursor-pointer">
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* RIGHT IMAGE BOX */}
        <div className="relative w-full flex-1 h-[460px] bg-gray-50 overflow-hidden shadow-sm group">
          <img src={imgSet1.right} alt="Audio Product" className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />
          
          {/* BUY NOW Button (Ye Minor IV khholega) */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <button 
              onClick={() => product && setQuickViewProduct(product)}
              className="bg-black text-white px-9 py-4 text-[11px] rounded-lg font-bold tracking-[0.5em] uppercase hover:bg-zinc-800 transition-all shadow-xl active:scale-95 cursor-pointer"
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickModel 
          isOpen={!!quickViewProduct} 
          onClose={() => setQuickViewProduct(null)} 
          product={quickViewProduct} 
        />
      )}

      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-black rounded-b-xl opacity-10 pointer-events-none"></div>
    </div>
  );
};

export default MarshallWideLayout;
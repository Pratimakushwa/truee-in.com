

// import React, { useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Autoplay } from 'swiper/modules';
// import QuickModel from '../Product/ProductDetailModel';
// import ProductCardPremium from '../../components/products/ProductCardPremium';

// import 'swiper/css';
// import 'swiper/css/navigation';

// export default function TrendingSection({ products }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const handleProductClick = (product) => {
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   if (!products || products.length === 0) return null;

//   return (
//     <section 
//       className="w-full bg-white py-8 px-4 md:px-12 border-t border-gray-100 group relative font-sans"
//       style={{ fontFamily: "'Inter', sans-serif" }} // ⚡ Applied Inter font globally
//     >
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 truee-divider-line" />

//       <div className="max-w-[1500px] mx-auto relative">
//         <div className="flex items-end justify-between mb-8 gap-4">
//           <div>
//             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A253] mb-2 flex items-center gap-2">
//               <span className="w-4 h-[1px] bg-[#C8A253] inline-block"></span>
//               Trending Now
//             </span>
//             {/* ⚡ Changed font-serif to font-sans */}
//             <h2 className="text-2xl sm:text-3xl md:text-[32px] font-sans font-bold text-[#111] mb-2">
//               Must-haves &amp; bestsellers
//             </h2>
//             <p className="text-gray-500 text-[12px] sm:text-[13px] leading-relaxed max-w-md hidden xs:block">
//               Explore your handpicked collection of top-rated products loved by thousands.
//             </p>
//           </div>
//         </div>

//         <Swiper
//           modules={[Navigation, Autoplay]}
//           spaceBetween={16}
//           loop={true}
//           // ⚡ FIX: grabCursor={true} hata diya gaya hai taaki Card wala asli Pointer (👆) dikhe
//           allowTouchMove={true}
//           autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
//           navigation={{
//             nextEl: '.swiper-button-next-custom',
//             prevEl: '.swiper-button-prev-custom',
//           }}
//           breakpoints={{
//             320: { slidesPerView: 1.4, spaceBetween: 12 },
//             480: { slidesPerView: 2, spaceBetween: 14 },
//             768: { slidesPerView: 3, spaceBetween: 16 },
//             1024: { slidesPerView: 4, spaceBetween: 20 },
//             1280: { slidesPerView: 5, spaceBetween: 20 },
//           }}
//           className="w-full !pb-2"
//         >
//           {products.map((p) => (
//             <SwiperSlide key={p._id} className="h-auto">
//               <ProductCardPremium
//                 product={p}
//                 onQuickView={handleProductClick}
//                 variant="compact"
//                 className="h-full"
//               />
//             </SwiperSlide>
//           ))}

//           <button className="swiper-button-prev-custom hidden sm:flex absolute top-[45%] -left-1 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-gray-700 hover:text-[#C8A253] cursor-pointer">&#8249;</button>
//           <button className="swiper-button-next-custom hidden sm:flex absolute top-[45%] -right-1 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-gray-700 hover:text-[#C8A253] cursor-pointer">&#8250;</button>
//         </Swiper>
//       </div>

//       {isModalOpen && selectedProduct && (
//         <QuickModel product={selectedProduct} onClose={() => setIsModalOpen(false)} />
//       )}
//     </section>
//   );
// }

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import QuickModel from '../Product/ProductDetailModel';
import ProductCardPremium from '../../components/products/ProductCardPremium';

import 'swiper/css';
import 'swiper/css/navigation';

export default function TrendingSection({ products }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (!products || products.length === 0) return null;

  return (
    <section 
      className="w-full bg-white py-8 px-4 md:px-12 border-t border-gray-100 group relative font-sans"
      // ⚡ Apple SF Pro Font applied globally to this component
      style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }} 
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 truee-divider-line" />

      <div className="max-w-[1500px] mx-auto relative">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A253] mb-2 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#C8A253] inline-block"></span>
              Trending Now
            </span>
            {/* ⚡ Heading now automatically inherits the Apple font */}
            <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-[#111] mb-2">
              Must-haves &amp; bestsellers
            </h2>
            <p className="text-gray-500 text-[12px] sm:text-[13px] leading-relaxed max-w-md hidden xs:block">
              Explore your handpicked collection of top-rated products loved by thousands.
            </p>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          loop={true}
          // ⚡ FIX: grabCursor={true} hata diya gaya hai taaki Card wala asli Pointer (👆) dikhe
          allowTouchMove={true}
          autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          breakpoints={{
            320: { slidesPerView: 1.4, spaceBetween: 12 },
            480: { slidesPerView: 2, spaceBetween: 14 },
            768: { slidesPerView: 3, spaceBetween: 16 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1280: { slidesPerView: 5, spaceBetween: 20 },
          }}
          className="w-full !pb-2"
        >
          {products.map((p) => (
            <SwiperSlide key={p._id} className="h-auto">
              <ProductCardPremium
                product={p}
                onQuickView={handleProductClick}
                variant="compact"
                className="h-full"
              />
            </SwiperSlide>
          ))}

          <button className="swiper-button-prev-custom hidden sm:flex absolute top-[45%] -left-1 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-gray-700 hover:text-[#C8A253] cursor-pointer">&#8249;</button>
          <button className="swiper-button-next-custom hidden sm:flex absolute top-[45%] -right-1 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-gray-700 hover:text-[#C8A253] cursor-pointer">&#8250;</button>
        </Swiper>
      </div>

      {isModalOpen && selectedProduct && (
        <QuickModel product={selectedProduct} onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
}
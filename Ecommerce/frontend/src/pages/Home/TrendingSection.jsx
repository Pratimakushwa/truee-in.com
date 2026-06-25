import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import QuickModel from '../Product/ProductDetailModel'; 

import 'swiper/css';
import 'swiper/css/navigation';

const formatPrice = (price) => {
  if (!price || price === 0) return 'Price on Request';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
};

export default function TrendingSection({ products }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="w-full bg-[#FEFDFD] py-12 px-4 md:px-12 border-t border-gray-100 group">
      <div className="max-w-[1500px] mx-auto relative">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 font-serif">Trending & must-haves</h2>

        {/* ⚡ Swiper Container */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 5, spaceBetween: 20 },
          }}
          className="w-full"
        >
          {products.map((p) => (
            <SwiperSlide key={p._id}>
              <div 
                className="cursor-pointer flex flex-col p-2 hover:bg-zinc-50 transition-all duration-300 rounded-lg"
                onClick={() => handleProductClick(p)}
              >
                <div className="bg-transparent p-4 flex items-center justify-center h-[200px] mb-3 overflow-hidden rounded-sm">
                  <img 
                    src={p.images?.[0]?.url || 'https://placehold.co/400x400'} 
                    alt={p.name} 
                    className="max-h-full max-w-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm text-gray-800 line-clamp-1 font-medium">{p.name}</h3>
                <p className="text-[#B12704] font-bold text-base mt-1">
                  {formatPrice(p.price - (p.discountPrice || 0))}
                </p>
              </div>
            </SwiperSlide>
          ))}

          {/* ⚡ CUSTOM CLEAN ARROWS (No background, No circle, just clean typography) */}
          <div className="swiper-button-prev-custom absolute top-1/2 left-0 -translate-y-1/2 z-20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 text-zinc-900 text-3xl font-light">
            &#8249;
          </div>
          <div className="swiper-button-next-custom absolute top-1/2 right-0 -translate-y-1/2 z-20 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 text-zinc-900 text-3xl font-light">
            &#8250;
          </div>
        </Swiper>
      </div>

      {isModalOpen && selectedProduct && (
        <QuickModel product={selectedProduct} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
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
    <section className="w-full bg-white py-14 md:py-16 px-4 md:px-12 border-t border-gray-100 group relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 truee-divider-line" />

      <div className="max-w-[1500px] mx-auto relative">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A253] mb-2 block">
              Trending Now
            </span>
            <h2 className="truee-section-title">Must-haves & bestsellers</h2>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
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

          <button
            type="button"
            className="swiper-button-prev-custom absolute top-[45%] -left-1 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-gray-700 hover:text-[#C8A253] cursor-pointer"
            aria-label="Previous"
          >
            &#8249;
          </button>
          <button
            type="button"
            className="swiper-button-next-custom absolute top-[45%] -right-1 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-gray-700 hover:text-[#C8A253] cursor-pointer"
            aria-label="Next"
          >
            &#8250;
          </button>
        </Swiper>
      </div>

      {isModalOpen && selectedProduct && (
        <QuickModel product={selectedProduct} onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
}

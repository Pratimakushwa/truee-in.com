


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
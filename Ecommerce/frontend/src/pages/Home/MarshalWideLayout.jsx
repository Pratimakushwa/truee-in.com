

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import QuickModel from '../Product/ProductDetailModel';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// ── Helper: extract YouTube video id from embed url ──
const getYoutubeId = (url) => {
  const match = url.match(/embed\/([^?]+)/);
  return match ? match[1] : '';
};

// ── Play icon ──
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5">
    <path d="M8 5v14l11-7L8 5Z" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const StarRow = ({ rating }) => (
  <div className="flex items-center gap-0.5 text-[#c9a15a]">
    {[1, 2, 3, 4, 5].map((i) => (
      <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2.5 15 9l7 1-5 5 1.2 7L12 18.5 5.8 22 7 15 2 10l7-1 3-6.5Z" />
      </svg>
    ))}
  </div>
);

const MarshallWideLayout = () => {
  const [product, setProduct] = useState(null);
  const [leftProduct, setLeftProduct] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [playingId, setPlayingId] = useState(null);

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

  const heroBanners = [
    {
      badge: "LIMITED OFFER",
      badgeStyle: "bg-[#e8c988] text-[#3a2c0f]",
      title: "Marshall\n Middleton",
      subtitle: "Timeless design.\nPowerful Sound.",
      img: imgSet1.left,
      product: leftProduct,
    },
    {
      badge: "NEW ARRIVAL",
      badgeStyle: "bg-black text-white",
      title: "Marshall\n Minor IV",
      subtitle: "True Wireless.\nTotal Freedom.",
      img: imgSet1.right,
      product: product,
    },
  ];

  const youtubeVideos = [
    {
      id: 1,
      url: "https://www.youtube.com/embed/C6Mx6BWcSMo",
      channelAvatar: "https://yt3.googleusercontent.com/ytc/AIdro_kFhyM8xM2wQceyqbFlvJqPfsAI0eYQBGZ1c8zXbxN0GA=s88-c-k-c0x00ffffff-no-rj",
      title: "Marshall Minor III True Wireless Earbuds with Wireless Charging",
      duration: "12:45",
      rating: 4.9,
      views: "2.3M views",
      timeAgo: "2 weeks ago",
      badgeText: "MINOR III",
    },
    {
      id: 2,
      url: "https://www.youtube.com/embed/baITH2OP6tk",
      channelAvatar: "https://yt3.googleusercontent.com/ytc/AIdro_kFhyM8xM2wQceyqbFlvJqPfsAI0eYQBGZ1c8zXbxN0GA=s88-c-k-c0x00ffffff-no-rj",
      title: "Marshall Emberton II Bluetooth Speaker with 30 Hrs Playtime",
      duration: "11:32",
      rating: 4.8,
      views: "1.8M views",
      timeAgo: "1 month ago",
      badgeText: "EMBERTON II",
    },
    {
      id: 3,
      url: "https://www.youtube.com/embed/SNaTiQE_1To?si=FcrsWnAk1Ezdd4z-",
      channelAvatar: "https://yt3.googleusercontent.com/ytc/AIdro_kFhyM8xM2wQceyqbFlvJqPfsAI0eYQBGZ1c8zXbxN0GA=s88-c-k-c0x00ffffff-no-rj",
      title: "Marshall Middleton Portable Speaker Full Review",
      duration: "09:18",
      rating: 4.7,
      views: "980K views",
      timeAgo: "3 weeks ago",
      badgeText: "MIDDLETON",
    },
    {
      id: 4,
      url: "https://www.youtube.com/embed/g7fvhCyrqBo?si=2nGOKoX-THWRS4hH",
      channelAvatar: "https://yt3.googleusercontent.com/ytc/AIdro_kFhyM8xM2wQceyqbFlvJqPfsAI0eYQBGZ1c8zXbxN0GA=s88-c-k-c0x00ffffff-no-rj",
      title: "Marshall Stanmore III Sound Test & Unboxing",
      duration: "14:02",
      rating: 4.9,
      views: "1.2M views",
      timeAgo: "5 days ago",
      badgeText: "STANMORE III",
    },
    {
      id: 5,
      url: "https://www.youtube.com/embed/seYkKOGqAUM?si=smDQskU4sp9zQIva",
      channelAvatar: "https://yt3.googleusercontent.com/ytc/AIdro_kFhyM8xM2wQceyqbFlvJqPfsAI0eYQBGZ1c8zXbxN0GA=s88-c-k-c0x00ffffff-no-rj",
      title: "Marshall Willen II Portable Speaker Review",
      duration: "08:41",
      rating: 4.6,
      views: "740K views",
      timeAgo: "2 months ago",
      badgeText: "WILLEN II",
    },
  ];

  return (
    <div 
      className="w-full bg-white flex flex-col items-center justify-center py-6 px-3 sm:px-4 md:px-6"
      style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }} // ⚡ Apple font applied globally here
    >

      {/* 1. HERO BANNERS */}
      <div className="relative w-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-stretch justify-center gap-5 sm:gap-6 md:gap-[50px] lg:gap-[70px]">
        {heroBanners.map((banner, idx) => (
          <div
            key={idx}
            className="relative w-full flex-1 h-[280px] xs:h-[320px] sm:h-[380px] md:h-[380px] rounded-2xl overflow-hidden shadow-sm group"
          >
            <img
              src={banner.img}
              alt={banner.title}
              className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
            />
            {/* Gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />

            {/* Badge */}
            <span className={`absolute top-4 left-4 sm:top-5 sm:left-5 text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full ${banner.badgeStyle}`}>
              {banner.badge}
            </span>

            {/* Text content */}
            <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-5 sm:px-7 md:px-8 z-10 max-w-[80%]">
              
              {/* ⚡ Cormorant Garamond hata diya, ab ye bhi Apple font lega */}
              <h3 
                className="text-white text-[14px] xs:text-[18px] sm:text-[22px] md:text-[24px] leading-[1.1] mb-3 whitespace-pre-line"
                style={{ fontWeight: 600 }}
              >
                {banner.title}
              </h3>
              
              <div className="w-8 h-[2px] bg-[#c9a15a] mb-3"></div>
              <p className="text-white/85 text-[12px] sm:text-[13px] leading-[1.6] mb-5 whitespace-pre-line">
                {banner.subtitle}
              </p>
              <button
                onClick={() => banner.product && setQuickViewProduct(banner.product)}
                className="group/btn bg-black text-white px-5 sm:px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-zinc-800 transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap inline-flex items-center gap-2 w-fit rounded-[4px]"
              >
                Buy Now
                <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                  <ArrowIcon />
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 2. VIDEO SECTION */}
      <section className="w-full max-w-[1400px] mx-auto mt-14  mb-2 relative group">
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-[#a97c2f] uppercase mb-2">
            Discover Before You Buy
          </p>
          
          {/* ⚡ Cormorant Garamond hata diya yahan se bhi */}
          <h3 
            className="text-2xl sm:text-3xl md:text-[32px] text-black mb-3"
            style={{ fontWeight: 600 }}
          >
            Unboxing &amp; Review
          </h3>
          
          <div className="flex items-center justify-center gap-2">
            <span className="w-8 sm:w-10 h-[1px] bg-[#c9a15a]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a15a]"></span>
            <span className="w-8 sm:w-10 h-[1px] bg-[#c9a15a]"></span>
          </div>
        </div>

        <div className="w-full relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            grabCursor={true}
            allowTouchMove={true}
            loop={true}
            navigation={{
              prevEl: '.custom-prev-btn',
              nextEl: '.custom-next-btn',
            }}
            autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 50,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 70,
              },
            }}
            className="w-full pb-0"
          >
            {youtubeVideos.map((video) => {
              const ytId = getYoutubeId(video.url);
              const thumbnail = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
              const isPlaying = playingId === video.id;

              return (
                <SwiperSlide key={video.id} style={{ height: 'auto' }}>
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">
                    {/* Thumbnail / player */}
                    <div className="relative w-full aspect-video bg-black overflow-hidden">
                      {isPlaying ? (
                        <iframe
                          className="absolute top-0 left-0 w-full h-full"
                          src={`${video.url}${video.url.includes('?') ? '&' : '?'}autoplay=1`}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <button
                          onClick={() => setPlayingId(video.id)}
                          className="absolute inset-0 w-full h-full cursor-pointer group/thumb"
                        >
                          <img
                            src={thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                            onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`; }}
                          />
                          <div className="absolute inset-0 bg-black/25" />
                  
                          {/* Watermark badge text bottom-right */}
                          <span className="absolute bottom-3 right-3 sm:bottom-4 sm:right-5 text-white font-black text-[20px] sm:text-[26px] tracking-tight opacity-90 leading-none text-right z-10 whitespace-pre-line">
                            {video.badgeText}
                          </span>
                        </button>
                      )}
                    </div>

                    {/* Info row */}
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                        <div className="flex items-center gap-2 text-[11px] sm:text-[12px] text-gray-500">
                           <div className="flex items-start justify-between gap-3">
                        <h4 className="text-[13px] sm:text-[14px] font-semibold text-[#111] leading-snug line-clamp-2">
                          {video.title}
                        </h4>
                        <button className="text-gray-400 hover:text-gray-600 shrink-0 mt-0.5" aria-label="More options">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="5" r="1.8" />
                            <circle cx="12" cy="12" r="1.8" />
                            <circle cx="12" cy="19" r="1.8" />
                          </svg>
                        </button>
                      </div>
                        </div>

                        <button
                          onClick={() => setPlayingId(video.id)}
                          className="group/watch inline-flex items-center gap-1.5 border border-[#e2c88a] text-[#a97c2f] text-[10px] sm:text-[11px] font-bold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full hover:bg-[#f6ede0] transition-colors"
                        >
                          Watch Video
                          <span className="transition-transform duration-300 group-hover/watch:translate-x-1">
                            <ArrowIcon />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Nav arrows */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-5 sm:mt-6">
            <button className="custom-prev-btn w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all z-20 cursor-pointer text-black">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="custom-next-btn w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-[#c9a15a] rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all z-20 cursor-pointer text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
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
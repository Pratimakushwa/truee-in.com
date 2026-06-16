// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

// // ⚡ THEME UPDATE: Hardcoded defaults replaced with CSS variables
// export default function HeroAlternate({ 
//   accentColor = "var(--theme-primary)", 
//   bg = "var(--theme-bg-dark)" 
// }) {
//   const navigate = useNavigate();
  
//   const banners = [
//     "/banner1.jpg", 
//     "/banner2.jpg", 
//     "/banner3.png"
//   ];

//   const extendedBanners = [banners[banners.length - 1], ...banners, banners[0]];
//   const [currentIndex, setCurrentIndex] = useState(1);
//   const [isTransitioning, setIsTransitioning] = useState(true);
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     resetTimeout();
//     timeoutRef.current = setTimeout(() => {
//       setIsTransitioning(true);
//       setCurrentIndex((prevIndex) => prevIndex + 1);
//     }, 2000);
//     return () => resetTimeout();
//   }, [currentIndex]);

//   const resetTimeout = () => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//   };

//   const handleTransitionEnd = () => {
//     if (currentIndex === extendedBanners.length - 1) {
//       setIsTransitioning(false); 
//       setCurrentIndex(1); 
//     } else if (currentIndex === 0) {
//       setIsTransitioning(false);
//       setCurrentIndex(extendedBanners.length - 2); 
//     }
//   };

//   const goToSlide = (index) => {
//     setIsTransitioning(true);
//     setCurrentIndex(index + 1);
//   };

//   let activeDotIndex = currentIndex - 1;
//   if (activeDotIndex === -1) activeDotIndex = banners.length - 1;
//   if (activeDotIndex === banners.length) activeDotIndex = 0;

//   return (
//     <div className="alt-hero-wrapper">
//       <style>{`
//         .alt-hero-wrapper {
//           /* ⚡ THEME UPDATE: Dynamic background */
//           background-color: ${bg};
//           height: 75vh; 
//           width: 100%;  
//           position: relative;
//           overflow: hidden;
//           margin-top: 0px; 
//           padding-top: 60px; 
//           box-sizing: border-box;
//           transition: background-color 0.5s ease;
//         }

//         .slider-container {
//           display: flex;
//           width: 100%;
//           height: 100%;
//         }

//         .slide {
//           min-width: 100%;
//           height: 100%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer; 
//         }

//         .slide img {
//           max-width: 85%; 
//           max-height: 85%; 
//           object-fit: contain; 
//           object-position: center;
//         }

//         .dots-container {
//           position: absolute;
//           bottom: 35px; 
//           left: 50%;
//           transform: translateX(-50%);
//           display: flex;
//           gap: 12px;
//           z-index: 20;
//         }

//         .dot {
//           width: 10px;
//           height: 10px;
//           border-radius: 50%;
//           background: rgba(255, 255, 255, 0.3);
//           cursor: pointer;
//           transition: all 0.4s ease;
//           border: 2px solid transparent;
//         }

//         .dot:hover {
//           background: rgba(255, 255, 255, 0.7);
//         }

//         .dot.active {
//           background: transparent;
//           /* ⚡ THEME UPDATE: Active dot border matches theme color */
//           border: 2px solid ${accentColor};
//           transform: scale(1.5);
//         }

//         /* Responsive breakpoints original rahenge */
//         @media (max-width: 1024px) {
//           .alt-hero-wrapper { height: 55vh; margin-top: 60px; }
//           .slide img { max-width: 90%; max-height: 90%; }
//         }
//         @media (max-width: 768px) {
//           .alt-hero-wrapper { height: 40vh; margin-top: 80px; }
//           .dots-container { bottom: 20px; }
//           .slide img { max-width: 95%; max-height: 95%; }
//         }
//         @media (max-width: 480px) {
//           .alt-hero-wrapper { height: 32vh; margin-top: 60px; }
//           .dots-container { bottom: 15px; gap: 8px; }
//           .dot { width: 8px; height: 8px; }
//         }
//       `}</style>

//       <div 
//         className="slider-container"
//         style={{
//           transform: `translateX(-${currentIndex * 100}%)`,
//           transition: isTransitioning ? "transform 1s cubic-bezier(0.25, 1, 0.5, 1)" : "none"
//         }}
//         onTransitionEnd={handleTransitionEnd}
//       >
//         {extendedBanners.map((img, index) => (
//           <div 
//             key={index} 
//             className="slide" 
//             onClick={() => navigate('/shop')} 
//           >
//             <img src={img} alt={`Banner Slide ${index}`} />
//           </div>
//         ))}
//       </div>

//       <div className="dots-container">
//         {banners.map((_, index) => (
//           <div
//             key={index}
//             className={`dot ${index === activeDotIndex ? "active" : ""}`}
//             onClick={() => goToSlide(index)} 
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import QuickModel from '../Product/ProductDetailModel';
import axiosInstance from '../../utils/axiosInstance';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [matchedProducts, setMatchedProducts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get('/products');
        const list = res.data.products || res.data;
        
        // ⚡ YAHAN FIX KIYA: Sonos aur Therabody ko database se match karne ka logic lagaya
        setMatchedProducts({
          monitor: list.find(p => p.name?.toLowerCase().includes('monitor')),
          mode: list.find(p => p.name?.toLowerCase().includes('mode')),
          acton: list.find(p => p.name?.toLowerCase().includes('acton')),
          sonos: list.find(p => p.name?.toLowerCase().includes('sonos move')), // Sonos ko match karega
          therabody: list.find(p => p.name?.toLowerCase().includes('theragun')) // Therabody ko match karega
        });
      } catch (err) { console.error("Error fetching hero products:", err); }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // ⚡ YAHAN FIX KIYA: IDs theek kiye, aur "sonos" aur "therabody" keys lagaye
  const slides = [
    { id: 1, image: "img4.jpg", title: "MONITOR III A.N.C.", subtitle: "A SOUND ABOVE", key: "monitor" },
    { id: 2, image: "B_Content_Mode_USE-C_3.webp", title: "Marshall Mode C", subtitle: "MARSHALL MODE USB-C", key: "mode" },
    { id: 3, image: "marshall_acton-III_midnight-blue_lifestyle-product_1.jpg", title: "Marshall Action III", subtitle: "PORTABLE POWER", key: "acton" },
    { id: 4, image: "eRAfpPgkCXYDy5vrBRPXEE.png", title: "Sonos Move II", subtitle: "Portable Smart Speaker", key: "sonos" },
    // { id: 5, image: "theragun_banner.jpg", title: "Theragun Pro", subtitle: "Deep Muscle Treatment", key: "therabody" } // ⚡ Apni asli image ka naam yahan likhna
  ];

  const handleOpen = (key) => {
    const product = matchedProducts[key];
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    } else {
      console.log(`Product not found for key: ${key}`); // Agar click kaam na kare toh console check karna
    }
  };

  return (
    <div className="relative w-full h-[77vh] bg-white overflow-hidden">
      {slides.map((slide, index) => (
        <div 
          key={slide.id} 
          className={`absolute inset-0 flex flex-col md:flex-row transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          
          {/* LEFT SIDE: Image (Responsive) */}
          <div 
            className="w-full md:w-[60%] h-[50%] md:h-full flex items-center justify-center bg-gray-100 cursor-pointer overflow-hidden" 
            onClick={() => handleOpen(slide.key)}
          >
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-110" 
            />
          </div>

          {/* RIGHT SIDE: Text Content (Responsive) */}
          <div className="w-full md:w-[40%] h-[50%] md:h-full flex flex-col justify-center items-center text-center bg-black p-6 md:p-12 relative">
            <h1 className="text-white text-2xl md:text-4xl font-bold uppercase mb-2 md:mb-4 tracking-wider">{slide.title}</h1>
            <p className="text-white text-sm md:text-xl font-light mb-4 md:mb-8">{slide.subtitle}</p>
            
            <button 
              onClick={() => handleOpen(slide.key)} 
              className="px-6 py-2 md:px-8 md:py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-white transition-all text-sm md:text-base"
            >
              Shop Now
            </button>
            
            {/* Dots */}
            <div className="absolute bottom-4 md:bottom-6 flex space-x-2">
              {slides.map((_, dotIndex) => (
                <button 
                  key={dotIndex} 
                  onClick={() => setCurrentSlide(dotIndex)} 
                  className={`h-1.5 rounded-full transition-all ${dotIndex === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/40"}`} 
                />
              ))}
            </div>
          </div>
        </div>
      ))}

      {isModalOpen && selectedProduct && (
        <QuickModel product={selectedProduct} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
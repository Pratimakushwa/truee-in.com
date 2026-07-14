
// import React, { useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
// import axiosInstance from '../../utils/axiosInstance';
// import QuickModel from '../Product/ProductDetailModel'; 

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/effect-fade';

// const ImageSlider = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [swiperInstance, setSwiperInstance] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
  
//   const [matchedProducts, setMatchedProducts] = useState({
//     main1: null, main2: null, main3: null,
//     side1: null, side2: null, side3: null
//   });

//   useEffect(() => {
//     const fetchAndMatchProducts = async () => {
//       try {
//         const response = await axiosInstance.get('/products');
//         let productsArray = [];
        
//         if (Array.isArray(response.data)) productsArray = response.data;
//         else if (response.data?.products) productsArray = response.data.products;
//         else if (response.data?.data) productsArray = response.data.data;

//         if (productsArray.length > 0) {
//           const pMain1 = productsArray.find(p => p.name?.toLowerCase().includes('acton')) || productsArray[0];
//           const pMain2 = productsArray.find(p => p.name?.toLowerCase().includes('emberton')) || productsArray[1] || productsArray[0];
//           const pMain3 = productsArray.find(p => p.name?.toLowerCase().includes('middleton')) || productsArray[2] || productsArray[0];

//           // Logic: Bromley ko side1, Stockwell ko side2, Willen ko side3
//           const pSide1 = productsArray.find(p => p.name?.toLowerCase().includes('bromley')) || productsArray[0];
//           const pSide2 = productsArray.find(p => p.name?.toLowerCase().includes('stockwell')) || productsArray[1] || productsArray[0];
//           const pSide3 = productsArray.find(p => p.name?.toLowerCase().includes('willen')) || productsArray[2] || productsArray[0];

//           setMatchedProducts({
//             main1: pMain1,
//             main2: pMain2,
//             main3: pMain3,
//             side1: pSide1,
//             side2: pSide2,
//             side3: pSide3
//           });
//         }
//       } catch (error) {
//         console.error("Product match karne me error:", error);
//       }
//     };
//     fetchAndMatchProducts();
//   }, []);

//   const slidesMain = [
//     { id: 1, img: "https://images.ctfassets.net/javen7msabdh/5HyLwrtL1HN219DLTFaPdB/deb50333f7a2ce2d18e8d7c7a60cc797/acton_iii_midnight-blue_front_desktop-5_x2.jpg?w=1920&fm=avif&q=100", tagline: "Marshall Acton III", productKey: "main1" },
//     { id: 2, img: "https://m.media-amazon.com/images/I/71chYP0sBrL._SL1500_.jpg", tagline: "Marshall Emberton II", productKey: "main2" },
//     { id: 3, img: "https://images.ctfassets.net/javen7msabdh/4GbBGcArx3NaNXpdgiEOSj/d9011410d91bb1ac4b56d11a1017b35d/Desktop-4-Middleton-II.jpg?w=960&fm=avif&q=100", tagline: "Marshall Middleton II", productKey: "main3" },
//   ];

//   const slidesSide = [
//     { id: 1, img: "https://shop.ash-asia.com/cdn/shop/files/TH_B_Content_Bromley_450_without_tab_4.jpg?v=1773305770&width=1000", productKey: "side1" },
//     { id: 2, img: "https://images.ctfassets.net/javen7msabdh/1WddBSbrhC3KCAM6MgDVkF/0d191ac9fac416d2bffbee03c274e5a2/stockwell-ii-front-desktop-1.jpeg?w=1920&fm=avif&q=100", productKey: "side2" },
//     { id: 3, img: "https://images.ctfassets.net/javen7msabdh/2jExiZ90H4brA24S1BdgrJ/b6a944ecbfba10f0d64ec796253c3e76/willen-10-hybrid.png?w=960&fm=avif&q=100", productKey: "side3" }
//   ];

//   const handleImageClick = (productKey) => {
//     const productToShow = matchedProducts[productKey];
//     if (productToShow && productToShow._id) {
//       setSelectedProduct(productToShow);
//       setIsModalOpen(true);
//     }
//   };

//   return (
//     <div className="w-full relative flex flex-col md:flex-row gap-12 md:gap-[30px] m-0 p-0 md:px-6 xl:px-12 py-10">

//       {/* 1. Main Image Box */}
//       <div className="relative w-full md:w-[58%] shrink-0 flex-none h-[300px] md:h-[470px] xl:h-[470px]">
//         <div className="relative overflow-hidden w-full h-full bg-[#f9f9f9]">
//           <Swiper modules={[Navigation, EffectFade]} effect="fade" fadeEffect={{ crossFade: true }} speed={600} onSwiper={(swiper) => setSwiperInstance(swiper)} loop={true} allowTouchMove={false} className="w-full h-full">
//             {slidesMain.map((slide) => {
//               const productData = matchedProducts[slide.productKey];
//               let discountPercent = 0;
//               if (productData && productData.price && productData.discountPrice > 0) {
//                 discountPercent = Math.round((productData.discountPrice / productData.price) * 100);
//               }
//               return (
//                 <SwiperSlide key={`main-${slide.id}`}>
//                   <div className="relative w-full h-full cursor-pointer group" onClick={() => handleImageClick(slide.productKey)}>
//                     <img src={slide.img} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" alt={`Deal ${slide.id}`} />
//                   </div>
//                 </SwiperSlide>
//               );
//             })}
//           </Swiper>
//         </div>
        
//         {/* Mobile par arrows ko neeche wali image se gap dene ke liye mb-6 use kiya gaya hai */}
//         <div className="relative md:absolute flex justify-center md:justify-start items-center gap-4 w-full md:w-auto mt-2 mb-6 md:mt-0 md:mb-0 md:-bottom-10 md:left-0 z-[70]">
//           <button onClick={() => swiperInstance?.slidePrev()} className="text-black hover:bg-black hover:text-white transition-all bg-white border border-gray-200 rounded-full w-9 h-9 flex items-center justify-center text-[18px] shadow-sm cursor-pointer">‹</button>
//           <button onClick={() => swiperInstance?.slideNext()} className="text-black hover:bg-black hover:text-white transition-all bg-white border border-gray-200 rounded-full w-9 h-9 flex items-center justify-center text-[18px] shadow-sm cursor-pointer">›</button>
//         </div>
//       </div>

//       {/* 2. Right Image Box */}
//       <div className="relative w-full md:w-[42%] shrink-0 flex-none h-[300px] md:h-[400px] xl:h-[500px] flex flex-col justify-start">
//         <div className="relative overflow-hidden bg-[#111] w-full h-full rounded-[2px] shadow-md group">
//           <Swiper modules={[Autoplay, EffectFade]} effect="fade" fadeEffect={{ crossFade: true }} speed={800} autoplay={{ delay: 2500, disableOnInteraction: false }} loop={true} allowTouchMove={false} onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} className="w-full h-full">
//             {slidesSide.map((slide) => (
//               <SwiperSlide key={`side-${slide.id}`}>
//                  <img src={slide.img} onClick={() => handleImageClick(slide.productKey)} className="w-full h-full object-cover opacity-90 cursor-pointer group-hover:scale-105 transition-transform duration-700" alt="Upcoming Deal" />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//         <div className="flex gap-3 items-center mt-6 justify-center md:justify-start">
//           {slidesSide.map((_, index) => (
//             <span key={index} className={`transition-all duration-300 rounded-full relative flex items-center justify-center ${activeIndex === index ? 'w-2.5 h-2.5 bg-black' : 'w-2 h-2 bg-gray-300'}`}>
//               {activeIndex === index && <span className="absolute -inset-[3px] border-[1px] border-black rounded-full" />}
//             </span>
//           ))}
//         </div>
//       </div>

//       {isModalOpen && selectedProduct && (
//         <QuickModel product={selectedProduct} onClose={() => setIsModalOpen(false)} />
//       )}
//     </div>
//   );
// };

// export default ImageSlider;
import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';
import axiosInstance from '../../utils/axiosInstance';
import QuickModel from '../Product/ProductDetailModel';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const ImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const thumbRefs = useRef([]);

  const [matchedProducts, setMatchedProducts] = useState({
    slide1: null, slide2: null, slide3: null, slide4: null
  });

  useEffect(() => {
    const fetchAndMatchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products');
        let productsArray = [];

        if (Array.isArray(response.data)) productsArray = response.data;
        else if (response.data?.products) productsArray = response.data.products;
        else if (response.data?.data) productsArray = response.data.data;

        if (productsArray.length > 0) {
          const p1 = productsArray.find(p => p.name?.toLowerCase().includes('acton')) || productsArray[0];
          const p2 = productsArray.find(p => p.name?.toLowerCase().includes('bromley')) || productsArray[1] || productsArray[0];
          const p3 = productsArray.find(p => p.name?.toLowerCase().includes('emberton')) || productsArray[2] || productsArray[0];
          const p4 = productsArray.find(p => p.name?.toLowerCase().includes('stockwell')) || productsArray[3] || productsArray[0];

          setMatchedProducts({ slide1: p1, slide2: p2, slide3: p3, slide4: p4 });
        }
      } catch (error) {
        console.error("Product match karne me error:", error);
      }
    };
    fetchAndMatchProducts();
  }, []);

  const slides = [
    { id: 1, img: "https://images.ctfassets.net/javen7msabdh/5HyLwrtL1HN219DLTFaPdB/deb50333f7a2ce2d18e8d7c7a60cc797/acton_iii_midnight-blue_front_desktop-5_x2.jpg?w=1920&fm=avif&q=100", productKey: "slide1" },
    { id: 2, img: "https://shop.ash-asia.com/cdn/shop/files/TH_B_Content_Bromley_450_without_tab_4.jpg?v=1773305770&width=1000", productKey: "slide2" },
    { id: 3, img: "https://m.media-amazon.com/images/I/71chYP0sBrL._SL1500_.jpg", productKey: "slide3" },
    { id: 4, img: "https://images.ctfassets.net/javen7msabdh/2jExiZ90H4brA24S1BdgrJ/b6a944ecbfba10f0d64ec796253c3e76/willen-10-hybrid.png?w=960&fm=avif&q=100", productKey: "slide4" },
  ];

  const handleImageClick = () => {
    const productKey = slides[activeIndex]?.productKey;
    const productToShow = matchedProducts[productKey];
    if (productToShow && productToShow._id) {
      setSelectedProduct(productToShow);
      setIsModalOpen(true);
    }
  };

  const goToSlide = (index) => {
    swiperInstance?.slideToLoop(index);
  };

  // useEffect(() => {
  //   thumbRefs.current[activeIndex]?.scrollIntoView({
  //     behavior: 'smooth',
  //     inline: 'center',
  //     block: 'nearest',
  //   });
  // }, [activeIndex]);

  return (
    <div className="w-full">

      {/* Main Image */}
      <div className="relative w-full h-[230px] xs:h-[280px] sm:h-[360px] md:h-[350px] lg:h-[380px] xl:h-[380px] rounded-[12px] overflow-hidden bg-[#eee]">
      <Swiper
  modules={[Navigation, EffectFade, Autoplay]}
  effect="fade"
  fadeEffect={{ crossFade: true }}
  loop={true}
  speed={1500}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
    waitForTransition: true,
    pauseOnMouseEnter: false,
  }}
  allowTouchMove={true}
  onSwiper={(swiper) => setSwiperInstance(swiper)}
  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
  className="w-full h-full"
>
         {slides.map((slide, index) => (
  <SwiperSlide key={`main-${slide.id}`}>
    <div className="relative w-full h-full cursor-pointer" onClick={handleImageClick}>
      <img
        src={slide.img}
        alt={`Deal ${slide.id}`}
        loading="lazy"
        className={`w-full h-full object-cover object-center transition-transform duration-[4500ms] ease-linear ${
          activeIndex === index ? "scale-105" : "scale-100"
        }`}
      />
    </div>
  </SwiperSlide>
))}
        </Swiper>

        {/* Arrows */}
        <button
          onClick={() => swiperInstance?.slidePrev()}
          className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 text-black hover:bg-black hover:text-white transition-all bg-white rounded-full w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center text-[18px] sm:text-[20px] shadow-md cursor-pointer z-[20]"
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          onClick={() => swiperInstance?.slideNext()}
          className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 text-black hover:bg-black hover:text-white transition-all bg-white rounded-full w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center text-[18px] sm:text-[20px] shadow-md cursor-pointer z-[20]"
          aria-label="Next slide"
        >
          ›
        </button>

        {/* Counter */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/55 backdrop-blur-sm text-white text-[10px] sm:text-[11px] tracking-[0.15em] px-3 py-1 rounded-full z-[20]">
          {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2.5 sm:gap-3 md:gap-4 mt-3 sm:mt-4 overflow-x-auto no-scrollbar">
        {slides.map((slide, index) => (
          <button
            key={`thumb-${slide.id}`}
            ref={(el) => (thumbRefs.current[index] = el)}
            onClick={() => goToSlide(index)}
            className={`relative shrink-0 w-[68px] h-[50px] xs:w-[85px] xs:h-[62px] sm:w-[105px] sm:h-[76px] md:w-[120px] md:h-[86px] lg:w-[130px] lg:h-[90px] rounded-[8px] overflow-hidden transition-all duration-300 ${
              activeIndex === index
                ? 'ring-2 ring-offset-2 ring-[#c9a15a]'
                : 'ring-1 ring-offset-1 ring-gray-200 opacity-75 hover:opacity-100'
            }`}
          >
            <img
              src={slide.img}
              className="w-full h-full object-cover"
              alt={`Thumbnail ${slide.id}`}
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Dot pagination */}
      <div className="flex gap-2 items-center justify-center mt-3 sm:mt-4">
        {slides.map((_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === index ? 'w-2.5 h-2.5 bg-[#c9a15a]' : 'w-1.5 h-1.5 bg-gray-300'
            }`}
          />
        ))}
      </div>

      {isModalOpen && selectedProduct && (
        <QuickModel product={selectedProduct} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default ImageSlider;
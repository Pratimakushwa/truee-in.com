// import React, { useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Autoplay, EffectFade } from 'swiper/modules';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/effect-fade';

// const ImageSlider = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [swiperInstance, setSwiperInstance] = useState(null);

//   const slidesMain = [
//     {
//       id: 1,
//       img: "https://images.unsplash.com/photo-1692651763027-72aeb12130d7?w=600&auto=format&fit=crop&q=60",
//       tagline: "MARSHALL SIGNATURE"
//     },
//     {
//       id: 2,
//       img: "https://images.pexels.com/photos/31306016/pexels-photo-31306016.jpeg",
//       tagline: "Marshall Stanmore II"
//     },
//     {
//       id: 3,
//       img: "https://images.unsplash.com/photo-1692351014024-97edd83a7b5a?w=600&auto=format&fit=crop&q=60",
//       tagline: "PREMIUM SOUND"
//     },
//   ];

//   const slidesSide = [
//     { 
//       id: 1, 
//       img: "https://images.unsplash.com/photo-1639385054611-53f34c9297d4?w=600&auto=format&fit=crop&q=60" 
//     },
//     { 
//       id: 2, 
//       img: "https://images.unsplash.com/photo-1502798985865-1ab60332f46c?w=600&auto=format&fit=crop&q=60" 
//     },
//     { 
//       id: 3, 
//       img: "https://images.unsplash.com/photo-1707364917582-6ad0f98379df?w=600&auto=format&fit=crop&q=60" 
//     },
//   ];

//   return (
//     // md:gap-[30px] desktop ke liye, gap-12 mobile par space dene ke liye
//     <div className="w-full relative flex flex-col md:flex-row gap-12 md:gap-[30px] m-0 p-0 md:px-6 xl:px-12 py-10">

//       {/* 1. Main Image Box */}
//       <div className="relative w-full md:w-[58%] shrink-0 flex-none h-[400px] md:h-[550px] xl:h-[600px]">
//         <div className="relative overflow-hidden w-full h-full bg-[#f9f9f9]">
//           <Swiper
//             modules={[Navigation, EffectFade]}
//             effect="fade"
//             fadeEffect={{ crossFade: true }}
//             speed={600}
//             onSwiper={(swiper) => setSwiperInstance(swiper)}
//             loop={true}
//             allowTouchMove={false}
//             className="w-full h-full"
//           >
//             {slidesMain.map((slide) => (
//               <SwiperSlide key={`main-${slide.id}`}>
//                 <div className="relative w-full h-full">
//                   <img
//                     src={slide.img}
//                     className="w-full h-full object-cover object-center"
//                     alt={`Deal ${slide.id}`}
//                   />
                  
//                   {/* Info Card */}
//                   <div className="absolute bottom-4 left-4 md:bottom-2 md:left-1 bg-white py-5 px-6 md:py-6 md:px-8 shadow-lg min-w-[220px] md:min-w-[260px] z-[60]">
//                     <p className="text-[12px] text-gray-400 tracking-[0.05em] mb-1 flex items-center gap-2">
//                       <span className="font-semibold text-black">0{slide.id}</span>
//                       <span className="w-6 h-[1px] bg-gray-300 block"></span>
//                       <span className="font-medium capitalize">{slide.tagline}</span>
//                     </p>
//                     <h3 className="text-xl md:text-2xl font-[500] text-[#111] font-sans mt-2">30% OFF</h3>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>

//         {/* NAVIGATION ARROWS: Mobile par dono images ke center space mein */}

//         <div className="relative md:absolute flex justify-center md:justify-start items-center gap-4 w-full md:w-auto mt-6 md:mt-0 md:-bottom-10 md:left-0 z-[70]">
//          <button 
//   onClick={() => swiperInstance?.slidePrev()}
//   className="text-black hover:bg-black hover:text-white transition-all bg-white border border-gray-200 rounded-full w-9 h-9 flex items-center justify-center text-[18px] shadow-sm cursor-pointer"
// >
//   ‹
// </button>

// <button 
//   onClick={() => swiperInstance?.slideNext()}
//   className="text-black hover:bg-black hover:text-white transition-all bg-white border border-gray-200 rounded-full w-9 h-9 flex items-center justify-center text-[18px] shadow-sm cursor-pointer"
// >
//   ›
// </button>
//         </div>
//       </div>

//       {/* 2. Right Image Box */}
//       <div className="relative w-full md:w-[42%] shrink-0 flex-none h-[300px] md:h-[400px] xl:h-[500px] flex flex-col justify-start">
//         <div className="relative overflow-hidden bg-[#111] w-full h-full rounded-[2px] shadow-md">
//           <Swiper
//             modules={[Autoplay, EffectFade]}
//             effect="fade"
//             fadeEffect={{ crossFade: true }}
//             speed={800}
//             autoplay={{ delay: 2500, disableOnInteraction: false }}
//             loop={true}
//             allowTouchMove={false}
//             onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}        
//             className="w-full h-full"
//           >
//             {slidesSide.map((slide) => (
//               <SwiperSlide key={`side-${slide.id}`}>
//                  <img
//                   src={slide.img}
//                   className="w-full h-full object-cover opacity-90"
//                   alt="Upcoming Deal"
//                 />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>

//         {/* Pagination Dots (Right Image ke niche) */}
//         <div className="flex gap-3 items-center mt-6 justify-center md:justify-start">
//           {slidesMain.map((_, index) => (
//             <span
//               key={index}
//               className={`transition-all duration-300 rounded-full relative flex items-center justify-center ${
//                 activeIndex === index ? 'w-2.5 h-2.5 bg-black' : 'w-2 h-2 bg-gray-300'
//               }`}
//             >
//               {activeIndex === index && (
//                 <span className="absolute -inset-[3px] border-[1px] border-black rounded-full" />
//               )}
//             </span>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// };

// export default ImageSlider;

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
//     slide1: null,
//     slide2: null,
//     slide3: null
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
//           const product1 = productsArray.find(p => p.name?.toLowerCase().includes('stanmore')) || productsArray[0];
//           const product2 = productsArray.find(p => p.name?.toLowerCase().includes('acton')) || productsArray[1] || productsArray[0];
//           const product3 = productsArray.find(p => p.name?.toLowerCase().includes('woburn')) || productsArray[2] || productsArray[0];

//           setMatchedProducts({
//             slide1: product1,
//             slide2: product2,
//             slide3: product3
//           });
//         }
//       } catch (error) {
//         console.error("Product match karne me error:", error);
//       }
//     };
//     fetchAndMatchProducts();
//   }, []);

//   const slidesMain = [
//     { id: 1, img: "https://images.unsplash.com/photo-1692651763027-72aeb12130d7?w=600&auto=format&fit=crop&q=60", tagline: "MARSHALL SIGNATURE", productKey: "slide1" },
//     { id: 2, img: "https://images.pexels.com/photos/31306016/pexels-photo-31306016.jpeg", tagline: "Marshall Stanmore II", productKey: "slide2" },
//     { id: 3, img: "https://images.unsplash.com/photo-1692351014024-97edd83a7b5a?w=600&auto=format&fit=crop&q=60", tagline: "PREMIUM SOUND", productKey: "slide3" },
//   ];

//   const slidesSide = [
//     { id: 1, img: "https://images.unsplash.com/photo-1639385054611-53f34c9297d4?w=600&auto=format&fit=crop&q=60", productKey: "slide1" },
//     { id: 2, img: "https://images.unsplash.com/photo-1502798985865-1ab60332f46c?w=600&auto=format&fit=crop&q=60", productKey: "slide2" },
//     { id: 3, img: "https://images.unsplash.com/photo-1707364917582-6ad0f98379df?w=600&auto=format&fit=crop&q=60", productKey: "slide3" },
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

//       {/* 1. Main Image Box (LEFT SIDE) */}
//       <div className="relative w-full md:w-[58%] shrink-0 flex-none h-[300px] md:h-[500px] xl:h-[500px]">
//         <div className="relative overflow-hidden w-full h-full bg-[#f9f9f9]">
//           <Swiper
//             modules={[Navigation, EffectFade]}
//             effect="fade"
//             fadeEffect={{ crossFade: true }}
//             speed={600}
//             onSwiper={(swiper) => setSwiperInstance(swiper)}
//             loop={true}
//             allowTouchMove={false}
//             className="w-full h-full"
//           >
//             {slidesMain.map((slide) => (
//               <SwiperSlide key={`main-${slide.id}`}>
//                 <div
//                   className="relative w-full h-full cursor-pointer group"
//                   onClick={() => handleImageClick(slide.productKey)}
//                 >
//                   <img
//                     src={slide.img}
//                     className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
//                     alt={`Deal ${slide.id}`}
//                   />
                  
//                   {/* ⚡ YAHAN BOX CHHOTA KIYA HAI MOBILE KE LIYE */}
//                   <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white py-3 px-4 md:py-6 md:px-8 shadow-lg min-w-[140px] md:min-w-[260px] z-[60]">
//                     <p className="text-[10px] md:text-[12px] text-gray-400 tracking-[0.05em] mb-0.5 md:mb-1 flex items-center gap-1.5 md:gap-2">
//                       <span className="font-semibold text-black">0{slide.id}</span>
//                       <span className="w-4 md:w-6 h-[1px] bg-gray-300 block"></span>
//                       <span className="font-medium capitalize truncate max-w-[80px] md:max-w-full">{slide.tagline}</span>
//                     </p>
//                     <h3 className="text-lg md:text-2xl font-[500] text-[#111] font-sans mt-0 md:mt-2">30% OFF</h3>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>

//         {/* NAVIGATION ARROWS */}
//         <div className="relative md:absolute flex justify-center md:justify-start items-center gap-4 w-full md:w-auto mt-6 md:mt-0 md:-bottom-10 md:left-0 z-[70]">
//           <button onClick={() => swiperInstance?.slidePrev()} className="text-black hover:bg-black hover:text-white transition-all bg-white border border-gray-200 rounded-full w-9 h-9 flex items-center justify-center text-[18px] shadow-sm cursor-pointer">‹</button>
//           <button onClick={() => swiperInstance?.slideNext()} className="text-black hover:bg-black hover:text-white transition-all bg-white border border-gray-200 rounded-full w-9 h-9 flex items-center justify-center text-[18px] shadow-sm cursor-pointer">›</button>
//         </div>
//       </div>

//       {/* 2. Right Image Box (RIGHT SIDE) */}
//       <div className="relative w-full md:w-[42%] shrink-0 flex-none h-[300px] md:h-[400px] xl:h-[500px] flex flex-col justify-start">
//         <div className="relative overflow-hidden bg-[#111] w-full h-full rounded-[2px] shadow-md group">
//           <Swiper
//             modules={[Autoplay, EffectFade]}
//             effect="fade"
//             fadeEffect={{ crossFade: true }}
//             speed={800}
//             autoplay={{ delay: 2500, disableOnInteraction: false }}
//             loop={true}
//             allowTouchMove={false}
//             onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}        
//             className="w-full h-full"
//           >
//             {slidesSide.map((slide) => (
//               <SwiperSlide key={`side-${slide.id}`}>
//                  <img
//                   src={slide.img}
//                   onClick={() => handleImageClick(slide.productKey)}
//                   className="w-full h-full object-cover opacity-90 cursor-pointer group-hover:scale-105 transition-transform duration-700"
//                   alt="Upcoming Deal"
//                 />
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>

//         {/* Pagination Dots */}
//         <div className="flex gap-3 items-center mt-6 justify-center md:justify-start">
//           {slidesMain.map((_, index) => (
//             <span key={index} className={`transition-all duration-300 rounded-full relative flex items-center justify-center ${activeIndex === index ? 'w-2.5 h-2.5 bg-black' : 'w-2 h-2 bg-gray-300'}`}>
//               {activeIndex === index && <span className="absolute -inset-[3px] border-[1px] border-black rounded-full" />}
//             </span>
//           ))}
//         </div>
//       </div>

//       {isModalOpen && selectedProduct && (
//         <QuickModel 
//           product={selectedProduct} 
//           onClose={() => setIsModalOpen(false)} 
//         />
//       )}
//     </div>
//   );
// };

// export default ImageSlider;
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
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
  
  const [matchedProducts, setMatchedProducts] = useState({
    main1: null, main2: null, main3: null,
    side1: null, side2: null, side3: null
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
          const pMain1 = productsArray.find(p => p.name?.toLowerCase().includes('acton')) || productsArray[0];
          const pMain2 = productsArray.find(p => p.name?.toLowerCase().includes('emberton')) || productsArray[1] || productsArray[0];
          const pMain3 = productsArray.find(p => p.name?.toLowerCase().includes('middleton')) || productsArray[2] || productsArray[0];

          // Logic: Bromley ko side1, Stockwell ko side2, Willen ko side3
          const pSide1 = productsArray.find(p => p.name?.toLowerCase().includes('bromley')) || productsArray[0];
          const pSide2 = productsArray.find(p => p.name?.toLowerCase().includes('stockwell')) || productsArray[1] || productsArray[0];
          const pSide3 = productsArray.find(p => p.name?.toLowerCase().includes('willen')) || productsArray[2] || productsArray[0];

          setMatchedProducts({
            main1: pMain1,
            main2: pMain2,
            main3: pMain3,
            side1: pSide1,
            side2: pSide2,
            side3: pSide3
          });
        }
      } catch (error) {
        console.error("Product match karne me error:", error);
      }
    };
    fetchAndMatchProducts();
  }, []);

  const slidesMain = [
    { id: 1, img: "https://images.ctfassets.net/javen7msabdh/5HyLwrtL1HN219DLTFaPdB/deb50333f7a2ce2d18e8d7c7a60cc797/acton_iii_midnight-blue_front_desktop-5_x2.jpg?w=1920&fm=avif&q=100", tagline: "Marshall Acton III", productKey: "main1" },
    { id: 2, img: "https://m.media-amazon.com/images/I/71chYP0sBrL._SL1500_.jpg", tagline: "Marshall Emberton II", productKey: "main2" },
    { id: 3, img: "https://images.ctfassets.net/javen7msabdh/4GbBGcArx3NaNXpdgiEOSj/d9011410d91bb1ac4b56d11a1017b35d/Desktop-4-Middleton-II.jpg?w=960&fm=avif&q=100", tagline: "Marshall Middleton II", productKey: "main3" },
  ];

  const slidesSide = [
    { id: 1, img: "https://www.shopyvision.com/wp-content/uploads/2025/12/1.jpg", productKey: "side1" },
    { id: 2, img: "https://images.ctfassets.net/javen7msabdh/1WddBSbrhC3KCAM6MgDVkF/0d191ac9fac416d2bffbee03c274e5a2/stockwell-ii-front-desktop-1.jpeg?w=1920&fm=avif&q=100", productKey: "side2" },
    { id: 3, img: "https://images.ctfassets.net/javen7msabdh/2jExiZ90H4brA24S1BdgrJ/b6a944ecbfba10f0d64ec796253c3e76/willen-10-hybrid.png?w=960&fm=avif&q=100", productKey: "side3" }
  ];

  const handleImageClick = (productKey) => {
    const productToShow = matchedProducts[productKey];
    if (productToShow && productToShow._id) {
      setSelectedProduct(productToShow);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="w-full relative flex flex-col md:flex-row gap-12 md:gap-[30px] m-0 p-0 md:px-6 xl:px-12 py-10">

      {/* 1. Main Image Box */}
      <div className="relative w-full md:w-[58%] shrink-0 flex-none h-[300px] md:h-[500px] xl:h-[500px]">
        <div className="relative overflow-hidden w-full h-full bg-[#f9f9f9]">
          <Swiper modules={[Navigation, EffectFade]} effect="fade" fadeEffect={{ crossFade: true }} speed={600} onSwiper={(swiper) => setSwiperInstance(swiper)} loop={true} allowTouchMove={false} className="w-full h-full">
            {slidesMain.map((slide) => {
              const productData = matchedProducts[slide.productKey];
              let discountPercent = 0;
              if (productData && productData.price && productData.discountPrice > 0) {
                discountPercent = Math.round((productData.discountPrice / productData.price) * 100);
              }
              return (
                <SwiperSlide key={`main-${slide.id}`}>
                  <div className="relative w-full h-full cursor-pointer group" onClick={() => handleImageClick(slide.productKey)}>
                    <img src={slide.img} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" alt={`Deal ${slide.id}`} />
                    {/* White box completely removed from here */}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="relative md:absolute flex justify-center md:justify-start items-center gap-4 w-full md:w-auto mt-6 md:mt-0 md:-bottom-10 md:left-0 z-[70]">
          <button onClick={() => swiperInstance?.slidePrev()} className="text-black hover:bg-black hover:text-white transition-all bg-white border border-gray-200 rounded-full w-9 h-9 flex items-center justify-center text-[18px] shadow-sm cursor-pointer">‹</button>
          <button onClick={() => swiperInstance?.slideNext()} className="text-black hover:bg-black hover:text-white transition-all bg-white border border-gray-200 rounded-full w-9 h-9 flex items-center justify-center text-[18px] shadow-sm cursor-pointer">›</button>
        </div>
      </div>

      {/* 2. Right Image Box */}
      <div className="relative w-full md:w-[42%] shrink-0 flex-none h-[300px] md:h-[400px] xl:h-[500px] flex flex-col justify-start">
        <div className="relative overflow-hidden bg-[#111] w-full h-full rounded-[2px] shadow-md group">
          <Swiper modules={[Autoplay, EffectFade]} effect="fade" fadeEffect={{ crossFade: true }} speed={800} autoplay={{ delay: 2500, disableOnInteraction: false }} loop={true} allowTouchMove={false} onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} className="w-full h-full">
            {slidesSide.map((slide) => (
              <SwiperSlide key={`side-${slide.id}`}>
                 <img src={slide.img} onClick={() => handleImageClick(slide.productKey)} className="w-full h-full object-cover opacity-90 cursor-pointer group-hover:scale-105 transition-transform duration-700" alt="Upcoming Deal" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex gap-3 items-center mt-6 justify-center md:justify-start">
          {slidesSide.map((_, index) => (
            <span key={index} className={`transition-all duration-300 rounded-full relative flex items-center justify-center ${activeIndex === index ? 'w-2.5 h-2.5 bg-black' : 'w-2 h-2 bg-gray-300'}`}>
              {activeIndex === index && <span className="absolute -inset-[3px] border-[1px] border-black rounded-full" />}
            </span>
          ))}
        </div>
      </div>

      {isModalOpen && selectedProduct && (
        <QuickModel product={selectedProduct} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default ImageSlider;
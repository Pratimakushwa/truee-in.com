// import React, { useState, useEffect } from 'react';
// import QuickModel from '../Product/ProductDetailModel';
// import axiosInstance from '../../utils/axiosInstance';
// export default function Hero() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [matchedProducts, setMatchedProducts] = useState({});

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axiosInstance.get('/products');
//         const list = res.data.products || res.data;

//         // ⚡ FIX: Keys aur lowercase search ko match kar diya hai
//         setMatchedProducts({
//           monitor: list.find(p => p.name?.toLowerCase().includes('monitor')),
//           mode: list.find(p => p.name?.toLowerCase().includes('mode')),
//           acton: list.find(p => p.name?.toLowerCase().includes('acton')),
//           sonos: list.find(p => p.name?.toLowerCase().includes('sonos')),

//           // ⚡ FIX: Yahan exact 'devialet' ko search kiya hai
//           devialet: list.find(p => p.name?.toLowerCase().includes('devialet'))
//         });
//       } catch (err) { console.error("Error fetching hero products:", err); }
//     };
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const slides = [
//     { id: 1, image: "img4.jpg", title: "MONITOR III A.N.C.", subtitle: "A SOUND ABOVE", key: "monitor" },
//     { id: 2, image: "B_Content_Mode_USE-C_3.webp", title: "Marshall Mode C", subtitle: "MARSHALL MODE USB-C", key: "mode" },
//     { id: 3, image: "marshall_acton-III_midnight-blue_lifestyle-product_1.jpg", title: "Marshall Action III", subtitle: "PORTABLE POWER", key: "acton" },
//     { id: 4, image: "eRAfpPgkCXYDy5vrBRPXEE.png", title: "Sonos Move II", subtitle: "Portable Smart Speaker", key: "sonos" },

//     // ⚡ FIX: Yahan key ko exact "devialet" (small letters me) kar diya hai
//     { id: 5, image: "https://www.robbreport.com.sg/wp-content/uploads/2025/07/Visual_Mania_150-Years_1_16-9.jpg", title: "Devialet Mania Opéra Rouge", subtitle: "portable smart speaker", key: "devialet" },
//   ];

//   const handleOpen = (key) => {
//     const product = matchedProducts[key];
//     if (product) {
//       setSelectedProduct(product);
//       setIsModalOpen(true);
//     } else {
//       console.log(`Product not found for key: ${key}`);
//     }
//   };

//   return (
//     <div className="relative w-full h-[77vh] bg-white overflow-hidden">
//       {slides.map((slide, index) => (
//         <div
//           key={slide.id}
//           className={`absolute inset-0 flex flex-col md:flex-row transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
//         >

//           {/* LEFT SIDE: Image */}
//           <div
//             className="w-full md:w-[60%] h-[50%] md:h-full flex items-center justify-center bg-gray-100 cursor-pointer overflow-hidden"
//             onClick={() => handleOpen(slide.key)}
//           >
//             <img
//               src={slide.image}
//               alt={slide.title}
//               className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-110"
//             />
//           </div>

//           {/* RIGHT SIDE: Text Content */}
//           <div className="w-full md:w-[40%] h-[50%] md:h-full flex flex-col justify-center items-center text-center bg-black p-6 md:p-12 relative">
//             <h1 className="text-white text-2xl md:text-4xl font-bold uppercase mb-2 md:mb-4 tracking-wider">{slide.title}</h1>
//             <p className="text-white text-sm md:text-xl font-light mb-4 md:mb-8">{slide.subtitle}</p>

//             <button
//               onClick={() => handleOpen(slide.key)}
//               className="px-6 py-2 md:px-8 md:py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-white transition-all text-sm md:text-base"
//             >
//               Shop Now
//             </button>

//             {/* Dots */}
//             <div className="absolute bottom-4 md:bottom-6 flex space-x-2">
//               {slides.map((_, dotIndex) => (
//                 <button
//                   key={dotIndex}
//                   onClick={() => setCurrentSlide(dotIndex)}
//                   className={`h-1.5 rounded-full transition-all ${dotIndex === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/40"}`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       ))}

//       {isModalOpen && selectedProduct && (
//         <QuickModel product={selectedProduct} onClose={() => setIsModalOpen(false)} />
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import QuickModel from "../Product/ProductDetailModel";
import axiosInstance from "../../utils/axiosInstance";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [matchedProducts, setMatchedProducts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products");
        const list = res.data.products || res.data;
        setMatchedProducts({
          monitor: list.find((p) => p.name?.toLowerCase().includes("monitor")),
          mode: list.find((p) => p.name?.toLowerCase().includes("mode")),
          acton: list.find((p) => p.name?.toLowerCase().includes("acton")),
          sonos: list.find((p) => p.name?.toLowerCase().includes("sonos")),
          devialet: list.find((p) =>
            p.name?.toLowerCase().includes("devialet"),
          ),
        });
      } catch (err) {
        console.error("Error fetching hero products:", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slides = [
    {
      id: 1,
      image: "img4.jpg",
      title: "MONITOR III A.N.C.",
      subtitle:
        "Iconic sound. Active Noise Cancellation. Up to 70 hours of wireless playtime.",
      key: "monitor",
    },
    {
      id: 2,
      image: "B_Content_Mode_USE-C_3.webp",
      title: "MARSHALL MODE C",
      subtitle: "USB-C connectivity. Pure analog soul.",
      key: "mode",
    },
    {
      id: 3,
      image: "marshall_acton-III_midnight-blue_lifestyle-product_1.jpg",
      title: "ACTON III",
      subtitle: "Compact footprint. Massive soundscape.",
      key: "acton",
    },
    {
      id: 4,
      image: "eRAfpPgkCXYDy5vrBRPXEE.png",
      title: "SONOS MOVE II",
      subtitle: "Portable brilliance. Smart connectivity.",
      key: "sonos",
    },
    {
      id: 5,
      image:
        "https://www.robbreport.com.sg/wp-content/uploads/2025/07/Visual_Mania_150-Years_1_16-9.jpg",
      title: "DEVIALET MANIA",
      subtitle: "Metamorphic sound. Adapts to your space.",
      key: "devialet",
    },
  ];

  const handleOpen = (key) => {
    const product = matchedProducts[key];
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] bg-black overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          {/* Main Layout */}
          <div className="flex flex-col md:flex-row w-full h-full">
            {/* LEFT SIDE: Image (60% Desktop, 50% Mobile) */}
            <div
              className="w-full md:w-[60%] h-[50vh] md:h-full relative cursor-pointer"
              onClick={() => handleOpen(slide.key)}
            >
              {/* Gradient Overlay for the "melt" effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent z-10 md:bg-gradient-to-r md:from-transparent md:to-black" />
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* RIGHT SIDE: Text Section (40% Desktop, 50% Mobile) */}
            <div className="w-full md:w-[40%] flex flex-col justify-center px-8 py-8 md:px-12 z-20 bg-black text-white">
              <h1 className="text-2xl md:text-4xl font-serif font-bold uppercase mb-4 tracking-tight">
                {slide.title}
              </h1>
              <p className="text-gray-400 text-sm md:text-lg font-light mb-8 leading-relaxed">
                {slide.subtitle}
              </p>
              <button
                onClick={() => handleOpen(slide.key)}
                className="w-max px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-[#C8A253] hover:text-white transition-all duration-300"
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-12 z-30 hidden md:flex space-x-2">
        {slides.map((_, dotIndex) => (
          <button
            key={dotIndex}
            onClick={() => setCurrentSlide(dotIndex)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              dotIndex === currentSlide ? "w-8 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>

      {isModalOpen && selectedProduct && (
        <QuickModel
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const brands = [
//   { id: 1, name: "AmazFit", imgUrl: "/logos/01.png" },
//   { id: 2, name: "Marshall", imgUrl: "/logos/02.png" },
//   { id: 3, name: "Devialet", imgUrl: "/logos/03.png" },
//   { id: 4, name: "Sonos", imgUrl: "/logos/04.png", scale: "scale-[1.1]" },
//   { id: 5, name: "Bang & Olufsen", imgUrl: "/logos/05.png" },
//   { id: 6, name: "JLab", imgUrl: "/logos/06.png" },
//   { id: 7, name: "Truee", imgUrl: "/logos/07.png", scale: "scale-[1.2]" },
//   { id: 8, name: "Sony", imgUrl: "/logos/08.png", scale: "scale-[1.1]" },
//   { id: 9, name: "Shokz", imgUrl: "/logos/09.png" },
//   { id: 10, name: "Sennheiser", imgUrl: "/logos/10.png" },
//   { id: 11, name: "Withings", imgUrl: "/logos/11.png" },
//   { id: 12, name: "Therabody", imgUrl: "/logos/12.png" },
//   { id: 12, name: "polar", imgUrl: "/logos/13.png" }
// ];

// export default function BrandsMarquee() {
//   const navigate = useNavigate();

//   // Infinite scroll ke liye array ko double karna zaroori hai
//   const duplicatedBrands = [...brands, ...brands];

//   return (
//     // ⚡ Gap kam karne ke liye py-24 ko py-10 kar diya
//     <section className="py-10 bg-white overflow-hidden">
      
//       <style>{`
//         @keyframes scroll {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         .animate-marquee {
//           animation: scroll 35s linear infinite;
//         }
//         .animate-marquee:hover {
//           animation-play-state: paused;
//         }
//       `}</style>

//       <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
//         {/* ⚡ Gap kam karne ke liye mb-16 ko mb-8 kiya */}
//         <div className="flex flex-col items-center justify-center mb-2 text-center">
//           {/* ⚡ Heading ka font chhota kiya (text-3xl/4xl) aur MARQUEE word hataya */}
         
//         </div>
//       </div>

//       <div className="w-full relative overflow-hidden mt-4">
//         {/* ⚡ gap-10 lagaya taaki logos ke beech thodi saans lene ki jagah ho */}
//         <div className="animate-marquee flex flex-nowrap w-max gap-12 px-6 items-center">
//           {duplicatedBrands.map((brand, index) => (
//             <div 
//               key={`${brand.id}-${index}`}
// // BrandsMarquee.jsx
// onClick={() => navigate(`/shop?brand=${brand.name}`)}              // ⚡ Yahan se box (bg-white, shadow, border) hata diya aur size chhota kiya (w-[140px] h-[70px])
//               className="flex-shrink-0 w-[140px] h-[70px] md:w-[160px] md:h-[80px] flex items-center justify-center cursor-pointer group px-2"
//             >
//               <img 
//                 src={brand.imgUrl} 
//                 alt={`${brand.name} Logo`} 
//                 // ⚡ Hover par ekdum smooth luxury feel (opacity badhegi)
//                 className={`max-w-full max-h-full object-contain opacity-50 group-hover:opacity-100 grayscale group-hover:grayscale-0 mix-blend-multiply transition-all duration-500 ${brand.scale || 'scale-100'}`}
//                 loading="lazy"
//                 draggable="false"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
import React from "react";
import { useNavigate } from "react-router-dom";

const brands = [
  { id: 1, name: "AmazFit", imgUrl: "/logos/01.png" },
  { id: 2, name: "Marshall", imgUrl: "/logos/02.png" },
  { id: 3, name: "Devialet", imgUrl: "/logos/03.png" },
  { id: 4, name: "Sonos", imgUrl: "/logos/04.png", scale: "scale-[1.1]" },
  { id: 5, name: "Bang & Olufsen", imgUrl: "/logos/05.png" },
  { id: 6, name: "JLab", imgUrl: "/logos/06.png" },
  { id: 7, name: "Truee", imgUrl: "/logos/07.png", scale: "scale-[1.2]" },
  { id: 8, name: "Sony", imgUrl: "/logos/08.png", scale: "scale-[1.1]" },
  { id: 9, name: "Shokz", imgUrl: "/logos/09.png" },
  { id: 10, name: "Sennheiser", imgUrl: "/logos/10.png" },
  { id: 11, name: "Withings", imgUrl: "/logos/11.png" },
  { id: 12, name: "Therabody", imgUrl: "/logos/12.png" },
  { id: 13, name: "Polar", imgUrl: "/logos/13.png" }
];

export default function BrandsMarquee() {
  const navigate = useNavigate();
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="pb-2 bg-white overflow-hidden">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: scroll 35s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }
      `}</style>

      <div className="w-full relative overflow-hidden mt-4">
        <div className="animate-marquee flex flex-nowrap w-max gap-12 px-6 items-center">
          {duplicatedBrands.map((brand, index) => (
            <div 
              key={`${brand.id}-${index}`}
              // ⚡ Yahan click handler exact Header1 jaisa kar diya hai
              onClick={() => {
                navigate('/shop', { state: { search: brand.name } });
              }}
              className="flex-shrink-0 w-[140px] h-[70px] md:w-[120px] md:h-[60px] flex items-center justify-center cursor-pointer group px-2"
            >
              <img 
                src={brand.imgUrl} 
                alt={`${brand.name} Logo`} 
                className={`max-w-full max-h-full object-contain opacity-50 group-hover:opacity-100 grayscale group-hover:grayscale-0 mix-blend-multiply transition-all duration-500 ${brand.scale || 'scale-100'}`}
                loading="lazy"
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
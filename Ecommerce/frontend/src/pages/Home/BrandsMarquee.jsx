
import React from "react";
import { useNavigate } from "react-router-dom";

const brands = [
  { id: 1, name: "Devialet", imgUrl: "/logos/01.png" },
  { id: 2, name: "Nespresso", imgUrl: "/logos/02.png" },
  // { id: 3, name: "RayBan", imgUrl: "/logos/03.png" },
  { id: 4, name: "Withings", imgUrl: "/logos/04.png", scale: "scale-[1.1]" },
  { id: 5, name: "Sonos", imgUrl: "/logos/05.png" },
  { id: 6, name: "Therabody", imgUrl: "/logos/06.png" },
  { id: 7, name: "Bang & Olufsen", imgUrl: "/logos/07.png", scale: "scale-[1.2]" },
  { id: 8, name: "Sennheiser", imgUrl: "/logos/08.png", scale: "scale-[1.1]" },
  { id: 9, name: "Bose", imgUrl: "/logos/09.png" },
  { id: 10, name: "Sony", imgUrl: "/logos/10.png" },
  { id: 11, name: "Marshall", imgUrl: "/logos/11.png" },
  // { id: 12, name: "Whoop", imgUrl: "/logos/12.png" },
  { id: 12, name: "Polar", imgUrl: "/logos/13.png" },
   { id: 14, name: "truee", imgUrl: "/Truee_Luxury_Logo.png" },
  {id: 13, name: "Noise", imgUrl: "/logos/noise-logo.png" }
  
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
              // ⚡ Header1 ke jaisa exact navigation aur state pass kar di hai
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
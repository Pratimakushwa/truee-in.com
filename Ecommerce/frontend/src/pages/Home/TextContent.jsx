

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const TextContent = () => {
//   const navigate = useNavigate();

//   const handleBuyNow = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     navigate('/shop');
//   };

//   return (
//     <div 
//       className="flex flex-col items-start text-left w-full max-w-full"
//       // Pura general text (badge, paragraph, button) Inter font use karega
//       style={{ fontFamily: "'Inter', sans-serif" }} 
//     >

//       {/* Premium Animated Badge */}
//       <span className="inline-flex items-center gap-2 bg-[#FDFBF7] border border-[#E5D5A4]/40 text-[#C8A253] text-[10px] font-bold tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full mb-5">
//         <span className="relative flex h-1.5 w-1.5">
//           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8A253] opacity-50"></span>
//           <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C8A253]"></span>
//         </span>
//         Limited Time Offer
//       </span>

//       {/* Main Heading (Cormorant Garamond) */}
//       <h2 
//         className="text-[14px] sm:text-[20px] md:text-[38px] text-[#111] tracking-tight leading-[1.05] mb-5"
//         style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
//       >
//         Deals Of The Month<span className="text-[#C8A253]">.</span>
//       </h2>

//       {/* Elegant Gold Divider */}
//       <div className="w-16 h-[2px] bg-[#C8A253] mb-6 sm:mb-8"></div>

//       {/* Description Text */}
//       <p className="text-gray-500 text-[13.5px] sm:text-[14.5px] leading-[1.8] mb-8 font-medium max-w-xl">
//         Step into a world where pristine acoustics meet timeless design.
//         This month, Truee Luxury invites you to elevate your auditory
//         senses with our most exclusive collection yet. Crafted for the
//         true connoisseur, these handpicked masterpieces deliver a
//         concert hall experience right to your living space.
//         <br className="hidden sm:block" /><br className="hidden sm:block" />
//         From earth-shattering bass to crystal-clear highs, feel every note
//         exactly as the artist intended. Don't miss this rare opportunity to
//         own a piece of acoustic perfection at a strictly limited time price.
//       </p>

//       {/* Luxury Call to Action Button */}
//       <button
//         onClick={handleBuyNow}
//         className="group bg-[#111] text-white px-8 py-3.5 text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#C8A253] hover:shadow-[0_8px_25px_rgba(200,162,83,0.25)] transition-all duration-300 cursor-pointer inline-flex items-center gap-3 self-start"
//       >
//         Shop Now
//         <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
//       </button>
      
//     </div>
//   );
// };

// export default TextContent;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const TextContent = () => {
  const navigate = useNavigate();

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/shop');
  };

  return (
    <div 
      className="flex flex-col items-start text-left w-full max-w-full"
      // Apple UI Font apply kar diya yahan
      style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }} 
    >

      {/* Premium Animated Badge */}
      <span className="inline-flex items-center gap-2 bg-[#FDFBF7] border border-[#E5D5A4]/40 text-[#C8A253] text-[10px] font-bold tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full mb-5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8A253] opacity-50"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C8A253]"></span>
        </span>
        Limited Time Offer
      </span>

      {/* Main Heading (Ab ye bhi Apple font me aayega) */}
      <h2 
         className="text-2xl sm:text-3xl md:text-[32px] text-[#1a1a1a] mb-2"
            style={{ fontWeight: 600 }}
      >
        Deals Of The Month<span className="text-[#C8A253]">.</span>
      </h2>

      {/* Elegant Gold Divider */}
      <div className="w-16 h-[2px] bg-[#C8A253] mb-6 sm:mb-8"></div>

      {/* Description Text */}
      <p className="text-gray-500 text-[13.5px] sm:text-[14.5px] leading-[1.8] mb-8 font-medium max-w-xl">
        Step into a world where pristine acoustics meet timeless design.
        This month, Truee Luxury invites you to elevate your auditory
        senses with our most exclusive collection yet. Crafted for the
        true connoisseur, these handpicked masterpieces deliver a
        concert hall experience right to your living space.
        <br className="hidden sm:block" /><br className="hidden sm:block" />
        From earth-shattering bass to crystal-clear highs, feel every note
        exactly as the artist intended. Don't miss this rare opportunity to
        own a piece of acoustic perfection at a strictly limited time price.
      </p>

      {/* Luxury Call to Action Button */}
      <button
        onClick={handleBuyNow}
        className="group bg-[#111] text-white px-8 py-3.5 text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#C8A253] hover:shadow-[0_8px_25px_rgba(200,162,83,0.25)] transition-all duration-300 cursor-pointer inline-flex items-center gap-3 self-start"
      >
        Shop Now
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>
      
    </div>
  );
};

export default TextContent;
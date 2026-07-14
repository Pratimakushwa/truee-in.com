
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const TextContent = () => {
//   // Page change karne ke liye navigate function
//   const navigate = useNavigate();

//   const handleBuyNow = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     // 👇 Yahan cart open hone ka code hata diya hai.
//     // Ab ye seedha Hero section ki tarah 'Shop' page par le jayega.
//     navigate('/shop'); 
//   };

//   return (
//     <div className="flex flex-col items-start xl:items-start text-left xl:text-left mx-auto xl:mx-0 z-20 w-full max-w-[500px] xl:max-w-[400px]">
//       <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#222] tracking-tight mb-5 md:mb-6">
//         Deals Of The Month
//       </h2>
//       <p className="text-[#888] text-[12px] md:text-[14px] leading-[1.8] mb-8 font-[400]">
//         Step into a world where pristine acoustics meet timeless design. This month, Truee Luxury invites you to elevate your auditory senses with our most exclusive collection yet. Crafted for the true connoisseur, these handpicked masterpieces deliver a concert-hall experience right to your living space. From earth-shattering bass to crystal-clear highs, feel every note exactly as the artist intended. Don't miss this rare opportunity to own a piece of acoustic perfection at a strictly limited-time price.
//       </p>
      
//       {/* BUY NOW Button */}
//       <button 
//         onClick={handleBuyNow}
//         className="bg-black text-white px-8 py-3 text-[14px] font-bold uppercase rounded-[4px] hover:bg-gray-800 transition-colors shadow-lg shadow-gray-300 cursor-pointer self-start"
//       >
//         BUY NOW
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
    <div className="flex flex-col items-start text-left w-full max-w-full">

      {/* Badge */}
      <span className="inline-flex items-center gap-1.5 bg-[#efe6d4] text-[#a97c2f] text-[10px] sm:text-[11px] font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full mb-4 sm:mb-5">
        ⚡ Limited Time Offer
      </span>

      <h2 className="text-[28px] xs:text-[30px] sm:text-[32px] md:text-[34px] font-serif font-bold text-[#1a1a1a] tracking-tight leading-[1.08] mb-4 ">
        Deals Of The Month
      </h2>

      <div className="w-20 h-[3px] bg-[#c9a15a] mb-5 sm:mb-6"></div>

      <p className="text-[#7a7a7a] text-[13px] sm:text-[14px] leading-[1.85] mb-6 font-[400]">
        Step into a world where pristine acoustics meet timeless design.
        This month, Truee Luxury invites you to elevate your auditory
        senses with our most exclusive collection yet. Crafted for the
        true connoisseur, these handpicked masterpieces deliver a
        concert hall experience right to your living space.
        From earth-shattering bass to crystal-clear highs, feel every note
        exactly as the artist intended. Don't miss this rare opportunity to
        own a piece of acoustic perfection at a strictly limited time price.
      </p>

      <button
        onClick={handleBuyNow}
        className="group bg-black text-white px-7 sm:px-8 py-3 text-[13px] sm:text-[14px] font-bold uppercase rounded-[6px] hover:bg-[#1a1a1a] transition-colors shadow-md cursor-pointer inline-flex items-center gap-2 self-start"
      >
        Shop Now
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>
    </div>
  );
};

export default TextContent;
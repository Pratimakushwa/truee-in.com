

// import React from "react";
// import { Link } from "react-router-dom";
// import { Instagram, Facebook, Youtube, Mail, MapPin } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="relative font-sans flex flex-col h-auto">
      
//       {/* ✨ WAVE EFFECT SEPARATOR (Height reduced here) ✨ */}
//       <div className="w-full leading-[0] bg-white relative z-10 h-16 lg:h-24 overflow-hidden">
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1240 190" className="w-full h-full" preserveAspectRatio="none">
//           <path fill="#f3f4f5" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,122.7C384,117,480,75,576,74.7C672,75,768,117,864,128C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
//         </svg>
//       </div>

//       {/* ⚡ MAIN FOOTER CONTENT */}
//       <div className="bg-[#f3f4f5] relative pb-6 sm:pb-8 pt-2 sm:pt-4">
        
//         {/* ✨ Luxury Background Watermark */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10vw] font-serif font-black text-[#ebeaea] whitespace-nowrap pointer-events-none select-none z-0">
//           TRUEE LUXURY
//         </div>

//         <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          
//           {/* 🌟 GRID UPDATED */}
//           <div className="grid grid-cols-2 lg:grid-cols-12 gap-y-8 gap-x-2 md:gap-x-6 lg:gap-6 mb-8 lg:mb-10">

//             {/* --- BRAND, ADDRESS & LOGO SECTION --- */}
//             <div className="col-span-2 lg:col-span-4 flex flex-col gap-4">
//               <Link to="/" className="flex flex-col items-start lg:items-center justify-center mt-1 group w-[120px] text-center cursor-pointer">
//                 <img src="/Truee_Luxury_Logo.png" alt="Truee" className="h-9 md:h-10 w-auto object-contain brightness-0" />    
//                 <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.4em] uppercase mt-1 text-black opacity-80 group-hover:opacity-100 transition-opacity">
//                   TRUEE
//                 </span>
//               </Link>
//               <p className="text-zinc-500 text-[13px] sm:text-[14px] font-medium leading-relaxed max-w-sm mt-1">
//                 Elevate your senses. Discover the world's most premium audio and lifestyle technology, curated for the modern connoisseur.
//               </p>
              
//               <div className="flex flex-col gap-3 mt-2">
//                 <Link to="/contact" className="flex items-center gap-3 text-zinc-600 hover:text-[#C8A253] transition-colors font-medium text-[14px] group">
//                   <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-zinc-200 group-hover:border-[#C8A253] transition-colors shadow-sm"><Mail className="w-3.5 h-3.5" /></span>
//                   support@truee.in
//                 </Link>
//                 <p className="flex items-center gap-3 text-zinc-600 font-medium text-[14px] group cursor-default">
//                   <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-zinc-200 group-hover:border-[#C8A253] transition-colors shadow-sm"><MapPin className="w-3.5 h-3.5" /></span>
//                   Bhopal, Madhya Pradesh
//                 </p>
//               </div>
//             </div>

//             {/* --- BOUTIQUE COLUMN --- */}
//             <div className="col-span-1 lg:col-span-2 lg:ml-8 mt-2 lg:mt-0">
//               <h4 className="text-black font-serif text-[0.95rem] lg:text-lg tracking-[0.15em] font-bold uppercase mb-4 lg:mb-5 flex flex-col gap-2.5">
//                 Boutique
//                 <span className="w-8 h-[2px] bg-[#C8A253]"></span>
//               </h4>
//               <ul className="flex flex-col gap-3">
//                 {[
//                   { name: 'All Collections', path: '/shop' },
//                   { name: 'Home Wellness', path: '/shop' },
//                   { name: 'About Us', path: '/about' }
//                 ].map((item, i) => (
//                   <li key={i}>
//                     <Link to={item.path} className="text-zinc-500 text-[12.5px] sm:text-[14px] font-medium hover:text-black transition-all duration-300 group flex items-start sm:items-center gap-2">
//                       <span className="w-0 h-[2px] bg-[#C8A253] transition-all duration-300 group-hover:w-3 mt-[9px] sm:mt-0 shrink-0"></span>
//                       <span className="group-hover:translate-x-1 transition-transform duration-300 leading-tight">{item.name}</span>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* --- ASSISTANCE COLUMN --- */}
//             <div className="col-span-1 lg:col-span-3 mt-2 lg:mt-0 pl-2 lg:pl-0">
//               <h4 className="text-black font-serif text-[0.95rem] lg:text-lg tracking-[0.15em] font-bold uppercase mb-4 lg:mb-5 flex flex-col gap-2.5">
//                 Assistance
//                 <span className="w-8 h-[2px] bg-[#C8A253]"></span>
//               </h4>
//               <ul className="flex flex-col gap-3">
//                 {[
//                   { name: 'My Account', path: '/profile' },
//                   { name: 'Shipping Policy', path: '/ShippingPolicy' },
//                   { name: 'Returns & Refunds', path: '/refund-policy' },
//                   { name: 'Contact Us', path: '/contact' }
//                 ].map((item, i) => (
//                   <li key={i}>
//                     <Link to={item.path} className="text-zinc-500 text-[12.5px] sm:text-[14px] font-medium hover:text-black transition-all duration-300 group flex items-start sm:items-center gap-2">
//                       <span className="w-0 h-[2px] bg-[#C8A253] transition-all duration-300 group-hover:w-3 mt-[9px] sm:mt-0 shrink-0"></span>
//                       <span className="group-hover:translate-x-1 transition-transform duration-300 leading-tight">{item.name}</span>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* --- CONNECT COLUMN --- */}
//             <div className="col-span-2 lg:col-span-3 mt-4 lg:mt-0">
//               <h4 className="text-black font-serif text-[0.95rem] lg:text-lg tracking-[0.15em] font-bold uppercase mb-4 lg:mb-5 flex flex-col gap-2.5">
//                 The List
//                 <span className="w-8 h-[2px] bg-[#C8A253]"></span>
//               </h4>
//               <p className="text-zinc-500 text-[13px] sm:text-[14px] mb-4 leading-relaxed">
//                 Subscribe to receive exclusive access to limited editions and private sales.
//               </p>
              
//               <div className="flex gap-3">
//                 <a href="https://www.instagram.com/truee_luxury?igsh=eTllajVlbGNhZm96" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-[#C8A253] hover:text-white hover:border-[#C8A253] transition-all duration-300 hover:-translate-y-1 shadow-sm">
//                   <Instagram className="w-4 h-4" />
//                 </a>
//                 <a href="https://www.facebook.com/share/17m6mtmfnb/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-[#C8A253] hover:text-white hover:border-[#C8A253] transition-all duration-300 hover:-translate-y-1 shadow-sm">
//                   <Facebook className="w-4 h-4" />
//                 </a>
//                 <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-[#C8A253] hover:text-white hover:border-[#C8A253] transition-all duration-300 hover:-translate-y-1 shadow-sm">
//                   <Youtube className="w-4 h-4" />
//                 </a>
//               </div>
//             </div>

//           </div>

//           {/* --- BOTTOM BAR --- */}
//           <div className="mt-8 pt-5 lg:mt-10 lg:pt-6 border-t border-zinc-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
            
//             <p className="text-zinc-400 text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] uppercase text-center md:text-left">
//               © 2026 TRUEE LUXURY. ALL RIGHTS RESERVED.
//             </p>

//             <div className="flex items-center gap-4 sm:gap-5">
//               <Link to="/terms" className="text-zinc-500 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest hover:text-[#C8A253] transition-colors duration-300 relative group">
//                 Terms & Conditions
//                 <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C8A253] transition-all duration-300 group-hover:w-full"></span>
//               </Link>
              
//               <Link to="/privacy-policy" className="text-zinc-500 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest hover:text-[#C8A253] transition-colors duration-300 relative group">
//                 Privacy Policy
//                 <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C8A253] transition-all duration-300 group-hover:w-full"></span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer 
      className="relative font-sans flex flex-col h-auto"
      // ⚡ Only Font Family added for Apple SF Pro
      style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      
      {/* ✨ WAVE EFFECT SEPARATOR (Height reduced here) ✨ */}
      <div className="w-full leading-[0] bg-white relative z-10 h-16 lg:h-24 overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1240 190" className="w-full h-full" preserveAspectRatio="none">
          <path fill="#f3f4f5" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,122.7C384,117,480,75,576,74.7C672,75,768,117,864,128C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* ⚡ MAIN FOOTER CONTENT */}
      <div className="bg-[#f3f4f5] relative pb-6 sm:pb-8 pt-2 sm:pt-4">
        
        {/* ✨ Luxury Background Watermark (⚡ Removed font-serif) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10vw] font-bold text-[#ebeaea] whitespace-nowrap pointer-events-none select-none z-0">
          TRUEE LUXURY
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          
          {/* 🌟 GRID UPDATED */}
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-y-8 gap-x-2 md:gap-x-6 lg:gap-6 mb-8 lg:mb-10">

            {/* --- BRAND, ADDRESS & LOGO SECTION --- */}
            <div className="col-span-2 lg:col-span-4 flex flex-col gap-4">
              <Link to="/" className="flex flex-col items-start lg:items-center justify-center mt-1 group w-[120px] text-center cursor-pointer">
                <img src="/Truee_Luxury_Logo.png" alt="Truee" className="h-9 md:h-10 w-auto object-contain brightness-0" />    
                <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.4em] uppercase mt-1 text-black opacity-80 group-hover:opacity-100 transition-opacity">
                  TRUEE
                </span>
              </Link>
              <p className="text-zinc-500 text-[13px] sm:text-[14px] font-medium leading-relaxed max-w-sm mt-1">
                Elevate your senses. Discover the world's most premium audio and lifestyle technology, curated for the modern connoisseur.
              </p>
              
              <div className="flex flex-col gap-3 mt-2">
                <Link to="/contact" className="flex items-center gap-3 text-zinc-600 hover:text-[#C8A253] transition-colors font-medium text-[14px] group">
                  <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-zinc-200 group-hover:border-[#C8A253] transition-colors shadow-sm"><Mail className="w-3.5 h-3.5" /></span>
                  support@truee.in
                </Link>
                <p className="flex items-center gap-3 text-zinc-600 font-medium text-[14px] group cursor-default">
                  <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-zinc-200 group-hover:border-[#C8A253] transition-colors shadow-sm"><MapPin className="w-3.5 h-3.5" /></span>
                  Bhopal, Madhya Pradesh
                </p>
              </div>
            </div>

            {/* --- BOUTIQUE COLUMN --- */}
            <div className="col-span-1 lg:col-span-2 lg:ml-8 mt-2 lg:mt-0">
              {/* ⚡ Removed font-serif */}
              <h4 className="text-black text-[0.95rem] lg:text-lg tracking-[0.15em] font-bold uppercase mb-4 lg:mb-5 flex flex-col gap-2.5">
                Boutique
                <span className="w-8 h-[2px] bg-[#C8A253]"></span>
              </h4>
              <ul className="flex flex-col gap-3">
                {[
                  { name: 'All Collections', path: '/shop' },
                  { name: 'Home Wellness', path: '/shop' },
                  { name: 'About Us', path: '/about' }
                ].map((item, i) => (
                  <li key={i}>
                    <Link to={item.path} className="text-zinc-500 text-[12.5px] sm:text-[14px] font-medium hover:text-black transition-all duration-300 group flex items-start sm:items-center gap-2">
                      <span className="w-0 h-[2px] bg-[#C8A253] transition-all duration-300 group-hover:w-3 mt-[9px] sm:mt-0 shrink-0"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300 leading-tight">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* --- ASSISTANCE COLUMN --- */}
            <div className="col-span-1 lg:col-span-3 mt-2 lg:mt-0 pl-2 lg:pl-0">
              {/* ⚡ Removed font-serif */}
              <h4 className="text-black text-[0.95rem] lg:text-lg tracking-[0.15em] font-bold uppercase mb-4 lg:mb-5 flex flex-col gap-2.5">
                Assistance
                <span className="w-8 h-[2px] bg-[#C8A253]"></span>
              </h4>
              <ul className="flex flex-col gap-3">
                {[
                  { name: 'My Account', path: '/profile' },
                  { name: 'Shipping Policy', path: '/ShippingPolicy' },
                  { name: 'Returns & Refunds', path: '/refund-policy' },
                  { name: 'Contact Us', path: '/contact' }
                ].map((item, i) => (
                  <li key={i}>
                    <Link to={item.path} className="text-zinc-500 text-[12.5px] sm:text-[14px] font-medium hover:text-black transition-all duration-300 group flex items-start sm:items-center gap-2">
                      <span className="w-0 h-[2px] bg-[#C8A253] transition-all duration-300 group-hover:w-3 mt-[9px] sm:mt-0 shrink-0"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300 leading-tight">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* --- CONNECT COLUMN --- */}
            <div className="col-span-2 lg:col-span-3 mt-4 lg:mt-0">
              {/* ⚡ Removed font-serif */}
              <h4 className="text-black text-[0.95rem] lg:text-lg tracking-[0.15em] font-bold uppercase mb-4 lg:mb-5 flex flex-col gap-2.5">
                The List
                <span className="w-8 h-[2px] bg-[#C8A253]"></span>
              </h4>
              <p className="text-zinc-500 text-[13px] sm:text-[14px] mb-4 leading-relaxed">
                Subscribe to receive exclusive access to limited editions and private sales.
              </p>
              
              <div className="flex gap-3">
                <a href="https://www.instagram.com/truee_luxury?igsh=eTllajVlbGNhZm96" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-[#C8A253] hover:text-white hover:border-[#C8A253] transition-all duration-300 hover:-translate-y-1 shadow-sm">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://www.facebook.com/share/17m6mtmfnb/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-[#C8A253] hover:text-white hover:border-[#C8A253] transition-all duration-300 hover:-translate-y-1 shadow-sm">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-[#C8A253] hover:text-white hover:border-[#C8A253] transition-all duration-300 hover:-translate-y-1 shadow-sm">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* --- BOTTOM BAR --- */}
          <div className="mt-8 pt-5 lg:mt-10 lg:pt-6 border-t border-zinc-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
            
            <p className="text-zinc-400 text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] uppercase text-center md:text-left">
              © 2026 TRUEE LUXURY. ALL RIGHTS RESERVED.
            </p>

            <div className="flex items-center gap-4 sm:gap-5">
              <Link to="/terms" className="text-zinc-500 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest hover:text-[#C8A253] transition-colors duration-300 relative group">
                Terms & Conditions
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C8A253] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              
              <Link to="/privacy-policy" className="text-zinc-500 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest hover:text-[#C8A253] transition-colors duration-300 relative group">
                Privacy Policy
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C8A253] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
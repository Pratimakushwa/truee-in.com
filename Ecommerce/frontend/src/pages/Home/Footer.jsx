// import React from "react";
// import { Link } from "react-router-dom";

// export default function Footer() {
//   return (
//     <footer
//       style={{
//         background: "#ffffff",
//         color: "#111111",
//         paddingTop: "80px", // Luxury feel ke liye padding thodi badhayi
//         paddingBottom: "40px",
//         fontFamily: "'Montserrat', sans-serif",
//         borderTop: "1px solid #f0f0f0"
//       }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');

//         .footer-link {
//           color: #888;
//           text-decoration: none;
//           font-size: 13px;
//           font-weight: 400;
//           letter-spacing: 0.05em;
//           transition: all 0.3s ease;
//           display: inline-block;
//         }

//         .footer-link:hover {
//           color: #111;
//           transform: translateX(5px); /* Chota sa movement effect */
//         }

//         .footer-heading {
//           text-transform: uppercase;
//           letter-spacing: 0.2em;
//           font-size: 12px;
//           font-weight: 700;
//           margin-bottom: 25px;
//           color: #111;
//         }

//         .footer-container {
//           max-width: 1400px; /* Thoda tight container for premium look */
//           margin: 0 auto;
//           padding: 0 40px;
//         }

//         .footer-grid {
//           display: grid;
//           grid-template-columns: 2fr 1fr 1fr 1fr; /* Logo section wider */
//           gap: 50px;
//           margin-bottom: 80px;
//         }

//         @media (max-width: 1024px) {
//           .footer-grid { grid-template-columns: repeat(2, 1fr); }
//           .footer-logo-section { grid-column: span 2; }
//         }

//         @media (max-width: 768px) {
//           .footer-grid { grid-template-columns: 1fr; gap: 40px; }
//           .footer-logo-section { grid-column: span 1; text-align: center; align-items: center; }
//           .footer-heading { text-align: center; }
//           ul { align-items: center !important; text-align: center; }
//           .footer-bottom { flex-direction: column; gap: 20px; text-align: center; }
//         }
//       `}</style>

//       <div className="footer-container"> 
//         <div className="footer-grid">
          
//           {/* --- LOGO SECTION --- */}
//           <div className="footer-logo-section" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
//             <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}>
//               {/* ✅ Original Logo Image Implementation */}
//               <img 
//                 src="/Truee_Luxury_Logo.png" 
//                 alt="Truee Luxury Logo" 
//                 style={{ height: "45px", width: "auto", objectFit: "contain" }} 
//               />
//               <h2 style={{ 
//                 fontSize: "22px", 
//                 fontFamily: "'Playfair Display', serif", 
//                 fontWeight: "700", 
//                 letterSpacing: "0.1em", 
//                 margin: "0", 
//                 color: "#111",
//                 textTransform: "uppercase" 
//               }}>
//                 Truee<span style={{ color: "var(--theme-primary)", fontWeight: "300" }}></span>
//               </h2>
//             </Link>
//             <p style={{ color: "#888", fontSize: "14px", fontWeight: 300, lineHeight: "1.8", maxWidth: "320px" }}>
//               Experience the pinnacle of craftsmanship with our curated collection of luxury audio and smart living essentials.
//             </p>
//           </div>

//           {/* --- LINKS COLUMNS --- */}
//           <div>
//             <h4 className="footer-heading">Shop</h4>
//             <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
//               <li><Link to="/shop" className="footer-link">All Collections</Link></li>
//               <li><Link to="/shop?category=audio" className="footer-link">Audio Experience</Link></li>
//               <li><Link to="/shop?category=home" className="footer-link">Home Wellness</Link></li> 
//             </ul>
//           </div>

//           <div>
//             <h4 className="footer-heading">Assistance</h4>
//             <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
//               <li><Link to="/profile" className="footer-link">My Account</Link></li>
//               <li><Link to="/orders" className="footer-link">Shipping Policy</Link></li>
//               <li><Link to="#" className="footer-link">Contact Us</Link></li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="footer-heading">Legal</h4>
//             <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
//               <li><Link to="#" className="footer-link">Privacy Policy</Link></li> 
//               <li><Link to="#" className="footer-link">Terms of Service</Link></li>
//               <li><Link to="#" className="footer-link">Cookie Policy</Link></li>
//             </ul>
//           </div>
//         </div>

//         {/* --- BOTTOM BAR --- */}
//         <div className="footer-bottom" style={{ 
//           borderTop: "1px solid #f0f0f0", 
//           paddingTop: "30px", 
//           display: "flex", 
//           justifyContent: "space-between",
//           alignItems: "center"
//         }}>
//           <p style={{ color: "#999", fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em" }}>
//             &copy; {new Date().getFullYear()} TRUEE LUXURY. ALL RIGHTS RESERVED.
//           </p>
          
//           <div style={{ display: "flex", gap: "20px" }}>
//              {/* Social Placeholder icons can go here */}
//              <a href="#" className="footer-link" style={{fontSize: '11px'}}>INSTAGRAM</a>
//              <a href="#" className="footer-link" style={{fontSize: '11px'}}>FACEBOOK</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// import React from "react";
// import { Link } from "react-router-dom";

// export default function Footer() {
//   return (
//     <footer
//       style={{
//         background: "#ffffff",
//         color: "#111111",
//         paddingTop: "80px", 
//         paddingBottom: "40px",
//         fontFamily: "'Montserrat', sans-serif",
//         borderTop: "1px solid #f0f0f0"
//       }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');

//         .footer-link {
//           color: #888;
//           text-decoration: none;
//           font-size: 13px;
//           font-weight: 400;
//           letter-spacing: 0.05em;
//           transition: all 0.3s ease;
//           display: inline-block;
//         }

//         .footer-link:hover {
//           color: #111;
//           transform: translateX(5px); 
//         }

//         .footer-heading {
//           text-transform: uppercase;
//           letter-spacing: 0.2em;
//           font-size: 12px;
//           font-weight: 700;
//           margin-bottom: 25px;
//           color: #111;
//         }

//         .footer-container {
//           max-width: 1400px; 
//           margin: 0 auto;
//           padding: 0 40px;
//         }

//         .footer-grid {
//           display: grid;
//           /* ⚡ FIX: 4 ki jagah 5 columns kar diye taaki sab barabar dikhe */
//           grid-template-columns: 2.5fr 1fr 1fr 1fr 1fr; 
//           gap: 40px;
//           margin-bottom: 80px;
//         }

//         @media (max-width: 1024px) {
//           .footer-grid { grid-template-columns: repeat(3, 1fr); }
//           .footer-logo-section { grid-column: span 3; }
//         }

//         @media (max-width: 768px) {
//           .footer-grid { grid-template-columns: 1fr; gap: 40px; }
//           .footer-logo-section { grid-column: span 1; text-align: center; align-items: center; }
//           .footer-heading { text-align: center; }
//           ul { align-items: center !important; text-align: center; }
//           .footer-bottom { flex-direction: column; gap: 20px; text-align: center; }
//         }
//       `}</style>

//       <div className="footer-container"> 
//         <div className="footer-grid">
          
//           {/* --- LOGO SECTION --- */}
//           <div className="footer-logo-section" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
//             <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}>
//               <img 
//                 src="/Truee_Luxury_Logo.png" 
//                 alt="Truee Luxury Logo" 
//                 style={{ height: "45px",  width: "auto", objectFit: "contain"  ,color: "#111"}} 
//               />
//               <h2 style={{ 
//                 fontSize: "22px", 
//                 fontFamily: "'Playfair Display', serif", 
//                 fontWeight: "700", 
//                 letterSpacing: "0.1em", 
//                 margin: "0", 
//                 color: "#111",
//                 textTransform: "uppercase" 
//               }}>
//                 Truee<span style={{ color: "var(--theme-primary)", fontWeight: "300" }}></span>
//               </h2>
//             </Link>
//             <p style={{ color: "#888", fontSize: "14px", fontWeight: 300, lineHeight: "1.8", maxWidth: "320px" }}>
//               Experience the pinnacle of craftsmanship with our curated collection of luxury audio and smart living essentials.
//             </p>
//           </div>

//           {/* --- SHOP COLUMN --- */}
//           <div>
//             <h4 className="footer-heading">Shop</h4>
//             <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
//               <li><Link to="/shop" className="footer-link">All Collections</Link></li>
//               <li><Link to="/shop?category=audio" className="footer-link">Audio Experience</Link></li>
//               <li><Link to="/shop?category=home" className="footer-link">Home Wellness</Link></li> 
//               <li><a href="https://youtube.com/your-channel-link" target="_blank" rel="noopener noreferrer" className="footer-link">Watch Unboxings</a></li>
//             </ul>
//           </div>

//           {/* --- ASSISTANCE COLUMN --- */}
//           <div>
//             <h4 className="footer-heading">Assistance</h4>
//             <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
//               <li><Link to="/profile" className="footer-link">My Account</Link></li>
//               <li><Link to="/orders" className="footer-link">Shipping Policy</Link></li>
//               <li><Link to="#" className="footer-link">Contact Us</Link></li>
//             </ul>
//           </div>

//           {/* --- LEGAL COLUMN --- */}
//           <div>
//             <h4 className="footer-heading">Legal</h4>
//             <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
//               <li><Link to="#" className="footer-link">Privacy Policy</Link></li> 
//               <li><Link to="#" className="footer-link">Terms of Service</Link></li>
//               <li><Link to="#" className="footer-link">Cookie Policy</Link></li>
//             </ul>
//           </div>

//           {/* --- NAYA CONNECT COLUMN (Alag kar diya) --- */}
//           <div>
//             <h4 className="footer-heading">Connect</h4>
//             <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
//               <li><a href="https://www.instagram.com/truee_luxury?igsh=eTllajVlbGNhZm96" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a></li>
//               <li><a href="https://www.facebook.com/share/17m6mtmfnb/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="footer-link">Facebook</a></li>
//               <li><a href="https://youtube.com/your-link" target="_blank" rel="noopener noreferrer" className="footer-link">YouTube</a></li>
//             </ul>
//           </div>

//         </div>

//         {/* --- BOTTOM BAR --- */}
//         <div className="footer-bottom" style={{ 
//           borderTop: "1px solid #f0f0f0", 
//           paddingTop: "30px", 
//           display: "flex", 
//           justifyContent: "center", 
//           alignItems: "center"
//         }}>
//           <p style={{ color: "#999", fontSize: "11px", fontWeight: 500, letterSpacing: "0.1em", margin: 0 }}>
//             &copy; {new Date().getFullYear()} TRUEE LUXURY. ALL RIGHTS RESERVED.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// import React from "react";
// import { Link } from "react-router-dom";
// import { Instagram, Facebook, Youtube, Mail, MapPin } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="relative font-sans flex flex-col">
      
//       {/* ✨ WAVE EFFECT SEPARATOR ✨ */}
//       <div className="w-full leading-[0] bg-white relative z-10">
//        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f3f4f5" fill-opacity="1" d="M0,224L48,208C96,192,192,160,288,160C384,160,480,192,576,181.3C672,171,768,117,864,122.7C960,128,1056,192,1152,186.7C1248,181,1344,107,1392,69.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
//       </div>

//       {/* ⚡ MAIN FOOTER CONTENT */}
//       <div className="bg-[#f3f4f5] relative pb-10 flex-1 -mt-1 pt-6">
        
//         {/* ✨ Luxury Background Watermark */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10vw] font-serif font-black text-[#ebeaea] whitespace-nowrap pointer-events-none select-none z-0">
//           TRUEE LUXURY
//         </div>

//         <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          
//           {/* Main Grid Structure */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

//             {/* --- BRAND & LOGO SECTION --- */}
//             <div className="lg:col-span-4 flex flex-col gap-6">
//               <Link to="/" className="flex flex-col items-center justify-center mt-2 group w-[120px] text-center cursor-pointer">
//                        <img src="/Truee_Luxury_Logo.png" alt="Truee" className="h-10 md:h-12 w-auto object-contain brightness-0" />    
//                        <span className="text-[9px] font-bold tracking-[0.4em] uppercase mt-1 text-black opacity-80 group-hover:opacity-100 transition-opacity">
//                          TRUEE
//                        </span>
//                      </Link>
//               <p className="text-zinc-500 text-[15px] font-medium leading-relaxed max-w-sm mt-2">
//                 Elevate your senses. Discover the world's most premium audio and lifestyle technology, curated for the modern connoisseur.
//               </p>
              
//               {/* Contact Details */}
//               <div className="flex flex-col gap-4 mt-4">
//                 <a href="mailto:concierge@trueeluxury.com" className="flex items-center gap-4 text-zinc-600 hover:text-[#C8A253] transition-colors font-medium group">
//                   <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-zinc-200 group-hover:border-[#C8A253] transition-colors shadow-sm"><Mail className="w-4 h-4" /></span>
//                   concierge@trueeluxury.com
//                 </a>
//                 <p className="flex items-center gap-4 text-zinc-600 font-medium group cursor-default">
//                   <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-zinc-200 group-hover:border-[#C8A253] transition-colors shadow-sm"><MapPin className="w-4 h-4" /></span>
//                   Bhopal, Madhya Pradesh
//                 </p>
//               </div>
//             </div>

//             {/* --- SHOP COLUMN --- */}
//             <div className="lg:col-span-2 lg:ml-8 mt-4 lg:mt-0">
//               <h4 className="text-black font-serif text-lg tracking-[0.15em] font-bold uppercase mb-8 flex flex-col gap-3">
//                 Boutique
//                 <span className="w-8 h-[2px] bg-[#C8A253]"></span>
//               </h4>
//               <ul className="flex flex-col gap-5">
//                 {['All Collections', 'Audio Experience', 'Home Wellness', 'Watch Unboxings'].map((item, i) => (
//                   <li key={i}>
//                     <Link to="/shop" className="text-zinc-500 text-[15px] font-medium hover:text-black transition-all duration-300 group flex items-center gap-3">
//                       <span className="w-0 h-[2px] bg-[#C8A253] transition-all duration-300 group-hover:w-4"></span>
//                       <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="lg:col-span-3 mt-4 lg:mt-0">
//               <h4 className="text-black font-serif text-lg tracking-[0.15em] font-bold uppercase mb-8 flex flex-col gap-3">
//                 Assistance
//                 <span className="w-8 h-[2px] bg-[#C8A253]"></span>
//               </h4>
//               <ul className="flex flex-col gap-5">
//                 {['My Account', 'Shipping Policy', 'Returns & Refunds', 'Contact Us'].map((item, i) => (
//                   <li key={i}>
//                     <Link to="/profile" className="text-zinc-500 text-[15px] font-medium hover:text-black transition-all duration-300 group flex items-center gap-3">
//                       <span className="w-0 h-[2px] bg-[#C8A253] transition-all duration-300 group-hover:w-4"></span>
//                       <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* --- CONNECT COLUMN --- */}
//             <div className="lg:col-span-3 mt-4 lg:mt-0">
//               <h4 className="text-black font-serif text-lg tracking-[0.15em] font-bold uppercase mb-8 flex flex-col gap-3">
//                 The List
//                 <span className="w-8 h-[2px] bg-[#C8A253]"></span>
//               </h4>
//               <p className="text-zinc-500 text-[14px] mb-6">
//                 Subscribe to receive exclusive access to limited editions and private sales.
//               </p>
              
//               <div className="flex gap-4">
//                 <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-[#C8A253] hover:text-white hover:border-[#C8A253] transition-all duration-300 hover:-translate-y-1 shadow-sm">
//                   <Instagram className="w-5 h-5" />
//                 </a>
//                 <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-[#C8A253] hover:text-white hover:border-[#C8A253] transition-all duration-300 hover:-translate-y-1 shadow-sm">
//                   <Facebook className="w-5 h-5" />
//                 </a>
//                 <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-[#C8A253] hover:text-white hover:border-[#C8A253] transition-all duration-300 hover:-translate-y-1 shadow-sm">
//                   <Youtube className="w-5 h-5" />
//                 </a>
//               </div>
//             </div>

//           </div>

//           {/* --- BOTTOM BAR --- */}
         
          
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
    <footer className="relative font-sans flex flex-col">
      
      {/* ✨ WAVE EFFECT SEPARATOR ✨ */}
      <div className="w-full leading-[0] bg-white relative z-10">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#f3f4f5" fillOpacity="1" d="M0,224L48,208C96,192,192,160,288,160C384,160,480,192,576,181.3C672,171,768,117,864,122.7C960,128,1056,192,1152,186.7C1248,181,1344,107,1392,69.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
      </div>

      {/* ⚡ MAIN FOOTER CONTENT */}
      <div className="bg-[#f3f4f5] relative pb-10 flex-1 -mt-1 pt-6">
        
        {/* ✨ Luxury Background Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10vw] font-serif font-black text-[#ebeaea] whitespace-nowrap pointer-events-none select-none z-0">
          TRUEE LUXURY
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

            {/* --- BRAND, ADDRESS & LOGO SECTION --- */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <Link to="/" className="flex flex-col items-center justify-center mt-2 group w-[120px] text-center cursor-pointer">
                <img src="/Truee_Luxury_Logo.png" alt="Truee" className="h-10 md:h-12 w-auto object-contain brightness-0" />    
                <span className="text-[9px] font-bold tracking-[0.4em] uppercase mt-1 text-black opacity-80 group-hover:opacity-100 transition-opacity">
                  TRUEE
                </span>
              </Link>
              <p className="text-zinc-500 text-[15px] font-medium leading-relaxed max-w-sm mt-2">
                Elevate your senses. Discover the world's most premium audio and lifestyle technology, curated for the modern connoisseur.
              </p>
              
              <div className="flex flex-col gap-4 mt-4">
                <Link to="/contact" className="flex items-center gap-4 text-zinc-600 hover:text-[#C8A253] transition-colors font-medium group">
                  <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-zinc-200 group-hover:border-[#C8A253] transition-colors shadow-sm"><Mail className="w-4 h-4" /></span>
                  concierge@trueeluxury.com
                </Link>
                <p className="flex items-center gap-4 text-zinc-600 font-medium group cursor-default">
                  <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-zinc-200 group-hover:border-[#C8A253] transition-colors shadow-sm"><MapPin className="w-4 h-4" /></span>
                  Bhopal, Madhya Pradesh
                </p>
              </div>
            </div>

            {/* --- BOUTIQUE COLUMN --- */}
            <div className="lg:col-span-2 lg:ml-8 mt-4 lg:mt-0">
              <h4 className="text-black font-serif text-lg tracking-[0.15em] font-bold uppercase mb-8 flex flex-col gap-3">
                Boutique
                <span className="w-8 h-[2px] bg-[#C8A253]"></span>
              </h4>
              <ul className="flex flex-col gap-5">
                {[
                  { name: 'All Collections', path: '/shop' },
                  // { name: 'Audio Experience', path: '/shop' },
                  { name: 'Home Wellness', path: '/shop' },
                  { name: 'About Us', path: '/about' } // 🔥 Yahan add kiya hai
                ].map((item, i) => (
                  <li key={i}>
                    <Link to={item.path} className="text-zinc-500 text-[15px] font-medium hover:text-black transition-all duration-300 group flex items-center gap-3">
                      <span className="w-0 h-[2px] bg-[#C8A253] transition-all duration-300 group-hover:w-4"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* --- ASSISTANCE COLUMN --- */}
            <div className="lg:col-span-3 mt-4 lg:mt-0">
              <h4 className="text-black font-serif text-lg tracking-[0.15em] font-bold uppercase mb-8 flex flex-col gap-3">
                Assistance
                <span className="w-8 h-[2px] bg-[#C8A253]"></span>
              </h4>
              <ul className="flex flex-col gap-5">
                {[
                  { name: 'My Account', path: '/profile' },
                  { name: 'Shipping Policy', path: '/ShippingPolicy' },
                  { name: 'Returns & Refunds', path: '/refund-policy' },
                  { name: 'Contact Us', path: '/contact' } // 🔥 Yahan add kiya hai
                ].map((item, i) => (
                  <li key={i}>
                    <Link to={item.path} className="text-zinc-500 text-[15px] font-medium hover:text-black transition-all duration-300 group flex items-center gap-3">
                      <span className="w-0 h-[2px] bg-[#C8A253] transition-all duration-300 group-hover:w-4"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* --- CONNECT COLUMN --- */}
            <div className="lg:col-span-3 mt-4 lg:mt-0">
              <h4 className="text-black font-serif text-lg tracking-[0.15em] font-bold uppercase mb-8 flex flex-col gap-3">
                The List
                <span className="w-8 h-[2px] bg-[#C8A253]"></span>
              </h4>
              <p className="text-zinc-500 text-[14px] mb-6">
                Subscribe to receive exclusive access to limited editions and private sales.
              </p>
              
              <div className="flex gap-4">
                <a href="https://www.instagram.com/truee_luxury?igsh=eTllajVlbGNhZm96" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-[#C8A253] hover:text-white hover:border-[#C8A253] transition-all duration-300 hover:-translate-y-1 shadow-sm">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/share/17m6mtmfnb/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-[#C8A253] hover:text-white hover:border-[#C8A253] transition-all duration-300 hover:-translate-y-1 shadow-sm">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 hover:bg-[#C8A253] hover:text-white hover:border-[#C8A253] transition-all duration-300 hover:-translate-y-1 shadow-sm">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

          {/* --- BOTTOM BAR (ONLY T&C AND PRIVACY) --- */}
          <div className="mt-12 pt-8 border-t border-zinc-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
            
            <p className="text-zinc-400 text-[11px] font-semibold tracking-[0.15em] uppercase text-center md:text-left">
              © 2026 TRUEE LUXURY. ALL RIGHTS RESERVED.
            </p>

            <div className="flex items-center gap-6">
              <Link to="/terms" className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest hover:text-[#C8A253] transition-colors duration-300 relative group">
                Terms & Conditions
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C8A253] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              
              <Link to="/privacy-policy" className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest hover:text-[#C8A253] transition-colors duration-300 relative group">
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

// import React, { useState, useRef, useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import { useNavigate } from 'react-router-dom';
// import { X, Star, ShoppingBag, CheckCircle2, Battery, Droplets, Wifi, Bluetooth, Zap, Shield, Tv, Volume, Smartphone, Mic, Plus, Tag } from 'lucide-react';
// import axiosInstance from '../../utils/axiosInstance';

// const DEFAULT_IMG = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600";

// const iconMap = { 
//   Battery: <Battery size={24} />,
//   Droplets: <Droplets size={24} />,
//   Wifi: <Wifi size={24} />,
//   Bluetooth: <Bluetooth size={24} />,
//   Zap: <Zap size={24} />,
//   Shield: <Shield size={24} />,
//   Tv: <Tv size={24} />,
//   Volume: <Volume size={24} />,
//   Smartphone: <Smartphone size={24} />,
//   Mic: <Mic size={24} />
// };

// export default function QuickViewModal({ product: initialProduct, onClose }) {
//   const navigate = useNavigate();
//   const [expand, setExpand] = useState(false);
//   const [activeTab, setActiveTab] = useState('Features'); 
//   const [fullProduct, setFullProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [activeImgIdx, setActiveImgIdx] = useState(0);
//   const [activeSpecTab, setActiveSpecTab] = useState('');
//   const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [expandDescription, setExpandDescription] = useState(false);
//   const modalRef = useRef(null);
//   const [selectedBoughtTogether, setSelectedBoughtTogether] = useState([]);

//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     setLoading(true); 
//     setActiveImgIdx(0);
//     setSelectedVariantIdx(0);
//     setExpandDescription(false);

//     if (initialProduct?._id) {
//       const fetchDetails = async () => {
//         try {
//           const { data } = await axiosInstance.get(`/products/${initialProduct._id}`);
//           if (data?.success && data?.product) {
//             const productData = data.product;
//             setFullProduct(productData);
            
//             if (data.relatedProducts && data.relatedProducts.length > 0) {
//               setRelatedProducts(data.relatedProducts);
//             } else {
//               try {
//                 const allRes = await axiosInstance.get('/products');
//                 if (allRes.data?.success && allRes.data?.products) {
//                   const fallbackRelated = allRes.data.products
//                     .filter(p => p._id !== initialProduct._id)
//                     .slice(0, 4);
//                   setRelatedProducts(fallbackRelated);
//                 }
//               } catch (err) {
//                 console.error("Fallback error:", err);
//               }
//             }
            
//             if (productData.boughtTogether) {
//               setSelectedBoughtTogether(productData.boughtTogether.map(p => p._id));
//             }
//             if (productData.techSpecs && productData.techSpecs.length > 0) {
//               setActiveSpecTab(productData.techSpecs[0].category);
//             }
//           }
//         } catch (e) { 
//           console.error("Fetch error:", e); 
//         } finally { 
//           setLoading(false); 
//         }
//       };
//       fetchDetails();
//     }
//     return () => { document.body.style.overflow = 'unset'; };
//   }, [initialProduct?._id]);

//   const scrollToSection = (id) => {
//     const element = document.getElementById(id);
//     if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   };

//   if (loading || !fullProduct) {
//     return createPortal(
//       <div className="fixed inset-0 z-[999999] bg-white flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-black"></div>
//       </div>,
//       document.body
//     );
//   }

//   const hasVariants = fullProduct?.variants?.length > 0;
//   let galleryImages = (hasVariants && fullProduct.variants[selectedVariantIdx]?.images?.length > 0)
//     ? fullProduct.variants[selectedVariantIdx].images.map(img => img.url)
//     : (fullProduct.images?.length > 0 ? fullProduct.images.map(img => img.url) : [fullProduct?.image || DEFAULT_IMG]);

//   // ⚡ SMART PRICE LOGIC ⚡
//   let originalPrice = fullProduct?.price || 0;
//   let mainPrice = fullProduct?.discountPrice > 0 ? (originalPrice - fullProduct.discountPrice) : originalPrice;
//   let showStrikethrough = fullProduct?.discountPrice > 0;

//   const currentVariant = hasVariants ? fullProduct.variants[selectedVariantIdx] : null;
  
//   if (currentVariant && currentVariant.price) {
//     mainPrice = Number(currentVariant.price);
//     if (mainPrice < originalPrice) {
//       showStrikethrough = true;
//     } else {
//       showStrikethrough = false;
//     }
//   }
  
//   const rawStock = hasVariants && fullProduct?.variants[selectedVariantIdx] 
//     ? fullProduct.variants[selectedVariantIdx].stock 
//     : fullProduct?.stock;

//   // ⚡ COMING SOON + AVAILABILITY FIX ⚡
//   const stockString = rawStock !== undefined && rawStock !== null ? String(rawStock).toLowerCase().trim() : '';
//   const isComingSoon = stockString === 'coming soon';
//   const isAvailable = rawStock !== undefined && rawStock !== null && rawStock !== 0 && String(rawStock).trim() !== '0' && stockString !== 'out of stock' && !isComingSoon;
//   const displayStock = isComingSoon ? 'Coming Soon' : (isAvailable ? rawStock : 'Out of Stock');

//   const extraTotal = fullProduct?.boughtTogether?.reduce((total, p) => {
//     if (selectedBoughtTogether.includes(p._id)) {
//       const pPrice = p.discountPrice > 0 ? (p.price - p.discountPrice) : p.price;
//       return total + pPrice;
//     }
//     return total;
//   }, 0) || 0;
//   const bundleTotal = mainPrice + extraTotal;

//   const handleAddToCart = async () => {
//     // Return early if coming soon or not available
//     if (!isAvailable || isComingSoon) return;
//     try {
//       const { data } = await axiosInstance.post('/cart/add', { productId: fullProduct._id, quantity: 1 });
//       if (data.success) {
//         window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { increase: 1 } }));
//       }
//     } catch (err) { console.error(err); }
//   };

//   const stripHtml = (html) => html ? String(html).replace(/<[^>]*>?/gm, '').trim() : '';
//   const rawDesc = stripHtml(fullProduct?.description || '');
//   const isLongDesc = rawDesc.length > 120;
//   const displayDesc = expandDescription ? rawDesc : (isLongDesc ? rawDesc.slice(0, 120) + '...' : rawDesc);

//   return createPortal(
//     <div 
//       className="fixed inset-0 z-[999999] bg-white overflow-y-auto scroll-smooth scrollbar-hide font-sans text-[#1a1a1a]"
//       ref={modalRef} 
//       onScroll={(e) => setExpand(e.target.scrollTop > 100)}
//     >
//       <div className="w-full pb-[140px]">
//         <nav id="product-hero" className={`sticky top-0 z-[150] w-full bg-white transition-all duration-300 border-b border-gray-50 ${expand ? 'py-2' : 'py-3'}`}>
//           <div className="max-w-[1340px] mx-auto px-6 md:px-12 flex justify-between items-center">
//             <div className="flex flex-col items-center group cursor-pointer" onClick={() => navigate('/')}>
//                <img src="/Truee_Luxury_Logo.png" alt="Truee" className="h-8 md:h-10 w-auto object-contain brightness-0" />    
//                <span className="text-[8px] font-bold tracking-[0.4em] uppercase mt-0.5 text-black opacity-80">TRUEE</span>
//             </div>
//             <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-all cursor-pointer bg-white shadow-sm border border-gray-100">
//               <X size={24} color="black" />
//             </button>
//           </div>
//         </nav>

//         <div className="max-w-[1340px] mx-auto px-6 md:px-12 pt-8 flex flex-col lg:flex-row gap-8 lg:gap-20 mb-20 items-start relative">
//           <div className="w-full lg:w-[60%] lg:sticky lg:top-24 self-start">
//             <div className="bg-[#f7f7f7] w-full max-w-[850px] aspect-square rounded-[2rem] flex items-center justify-center p-8 relative overflow-hidden group mx-auto cursor-pointer">
//               <img src={galleryImages[activeImgIdx]} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ease-in-out group-hover:scale-110" alt="main" style={{ maxHeight: '460px', marginTop: '-10px' }} />
//             </div>
//             <div className="flex gap-3 mt-4 justify-center">
//               {galleryImages.map((img, i) => (
//                 <button key={i} onClick={() => setActiveImgIdx(i)} className={`w-26 h-26 rounded-xl bg-[#f7f7f7] p-2 border-2 cursor-pointer transition-all ${activeImgIdx === i ? 'border-black' : 'border-transparent'}`}>
//                   <img src={img} className="w-full h-full object-contain mix-blend-multiply" alt="thumb" />
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="w-full lg:w-[40%] flex flex-col pt-4">
//             <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 leading-tight">{fullProduct?.name}</h1>
            
//             <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-6">
//               <div className="flex items-baseline gap-3">
//                 <p className="text-3xl font-light text-black">₹{mainPrice}</p>
//                 {showStrikethrough && <p className="text-lg text-gray-400 line-through">₹{originalPrice}</p>}
//               </div>
//               {/* Badge stays green for Available OR Coming Soon */}
//               <div className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${isAvailable || isComingSoon ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                 {displayStock}
//               </div>
//             </div>

//             {rawDesc && (
//               <div className="mb-8">
//                 <p className="text-[13.5px] text-gray-700 leading-relaxed transition-all duration-300">
//                   {displayDesc}
//                 </p>
//                 {isLongDesc && (
//                   <button 
//                     onClick={() => setExpandDescription(!expandDescription)}
//                     className="mt-3 text-[10px] font-bold uppercase tracking-widest text-black border-b border-black hover:text-gray-600 hover:border-gray-600 transition-all cursor-pointer"
//                   >
//                     {expandDescription ? 'Show Less' : 'Read More'}
//                   </button>
//                 )}
//               </div>
//             )}

//             {hasVariants && (
//               <div className="mb-8">
//                 <p className="text-[11px] font-black uppercase tracking-widest mb-4 text-gray-400">Select Variant</p>
//                 <div className="flex gap-2 flex-wrap">
//                   {fullProduct.variants.map((v, i) => (
//                     <button 
//                       key={i} 
//                       onClick={() => { setSelectedVariantIdx(i); setActiveImgIdx(0); }} 
//                       className={`px-6 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all ${
//                         selectedVariantIdx === i 
//                         ? 'bg-black text-white border-black' 
//                         : 'bg-white text-gray-600 border-gray-200 hover:border-black'
//                       }`}
//                     >
//                       {v.color || v.size}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* ⚡ FIX: Main Button - Disabled & Gray for Coming Soon */}
//             <button 
//               onClick={handleAddToCart} 
//               disabled={!isAvailable || isComingSoon} 
//               className={`w-full py-5 rounded-full font-bold text-[10px] tracking-[0.3em] uppercase mb-10 transition-all shadow-lg ${
//                 isComingSoon
//                   ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none'
//                   : isAvailable 
//                     ? 'bg-black text-white hover:bg-[#333] active:scale-95 cursor-pointer' 
//                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               {isComingSoon ? 'Coming Soon' : isAvailable ? 'Add to Cart' : 'Out of Stock'}
//             </button>
            
//             {/* Sidebar Tabs */}
//             <div id="sidebar-features" className="bg-[#f2f2f2] rounded-[2.5rem] p-1.5 flex flex-col min-h-[300px] border border-gray-100">
//               <div className="flex p-1">
//                 <button onClick={() => setActiveTab('Features')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-full transition-all cursor-pointer ${activeTab === 'Features' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-black'}`}>Features</button>
//                 <button onClick={() => setActiveTab('Included')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-full transition-all cursor-pointer ${activeTab === 'Included' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-black'}`}>Included</button>
//               </div>
//               <div className="px-6 py-8 overflow-y-auto scrollbar-hide h-full">
//                 {activeTab === 'Features' ? (
//                   <div className="grid grid-cols-2 gap-y-8 gap-x-6">
//                     {(fullProduct?.highlights || []).map((h, i) => (
//                       <div key={i} className="flex flex-col items-center text-center gap-2 group">
//                         <div className="text-gray-800 opacity-70 group-hover:scale-110 transition-transform">{iconMap[h.iconName] || <Zap size={24}/>}</div>
//                         <p className="text-[10px] font-bold uppercase tracking-tight text-gray-800 leading-tight">{h.title}</p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <ul className="space-y-4">
//                     {(fullProduct?.inTheBox || ['Authentic Speaker', 'Premium Cable', 'Quick Start Guide']).map((item, i) => (
//                       <li key={i} className="flex items-center gap-4 text-[11px] font-bold text-gray-700 uppercase tracking-tighter">
//                         <CheckCircle2 size={16} className="text-black"/> {item}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* --- VIDEO SECTION --- */}
//         <section id="video" className="mb-16 px-6 md:px-12">
//           <div className="w-full h-64 md:h-[500px] bg-black rounded-[3rem] overflow-hidden shadow-lg">
//             <video className="w-full h-full object-cover" autoPlay muted loop playsInline controls>
//               <source src="/342594216c4392756219a48bf547870e0948133c-bg-720p.webm" type="video/webm" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         </section>

//         {/* --- TECH SPECS SECTION --- */}
//         <section id="tech-specs-section" className="py-20 md:py-32 bg-white border-t border-gray-50">
//           <div className="max-w-[1340px] mx-auto px-6 md:px-12 text-center">
//             <h2 className="text-4xl md:text-7xl font-medium tracking-tighter mb-12 md:mb-20 uppercase">Tech Specs.</h2>
//             <div className="flex justify-start md:justify-center gap-6 md:gap-16 border-b border-gray-100 mb-12 md:mb-20 overflow-x-auto scrollbar-hide px-2">
//               {fullProduct?.techSpecs?.map((spec, idx) => (
//                 <button key={spec.category || idx} onClick={() => setActiveSpecTab(spec.category)} className={`pb-4 text-base md:text-xl font-medium transition-all relative whitespace-nowrap cursor-pointer ${activeSpecTab === spec.category ? 'text-black' : 'text-gray-400'}`}>
//                   {spec.category}
//                   {activeSpecTab === spec.category && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-full animate-in slide-in-from-left duration-300"/>}
//                 </button>
//               ))}
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 md:gap-y-16 text-left max-w-6xl mx-auto">
//               {fullProduct?.techSpecs?.filter(s => s.category === activeSpecTab)?.map((spec) => (
//                   spec.details?.map((detail, idx) => (
//                     <div key={`${spec.category}-${idx}`} className="animate-in fade-in slide-in-from-bottom-2 duration-500 border-b border-gray-50  md:border-none md:pb-0">
//                       <h4 className="text-[15px] font-semibold text-black mb-2 tracking-tight">{detail.title || (typeof detail === 'string' ? detail.split(':')[0] : 'Spec')}</h4>
//                       <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed font-light">{detail.desc || (typeof detail === 'string' ? detail.split(':').slice(1).join(':') : detail)}</p>
//                     </div>
//                   ))
//                 ))}
//             </div>
//           </div>
//         </section>

//         {/* --- RECOMMENDED SECTION --- */}
//         <section id="curated-section" className="py-20 md:py-32 bg-white border-t border-gray-50 relative z-10">
//           <div className="max-w-[1340px] mx-auto px-6 md:px-12">
//             <h2 className="text-3xl md:text-5xl font-medium tracking-tighter mb-12 text-center md:text-left">Recommended for you.</h2>
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12">
//               {relatedProducts.slice(0, 4).map((p) => (
//                 <div key={p._id} className="group cursor-pointer relative" style={{ touchAction: 'manipulation' }} onClick={async (e) => { e.preventDefault(); if (modalRef.current) modalRef.current.scrollTo({ top: 0, behavior: 'smooth' }); setLoading(true); setActiveImgIdx(0); setSelectedVariantIdx(0); setExpandDescription(false); try { const { data } = await axiosInstance.get(`/products/${p._id}`); if (data?.success && data?.product) { setFullProduct(data.product); setRelatedProducts(data.relatedProducts || []); if (data.product.techSpecs?.length > 0) setActiveSpecTab(data.product.techSpecs[0].category); } } catch (e) { console.error(e); } finally { setLoading(false); } }}>
//                   <div className="aspect-square bg-[#f8f8f8] rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-10 mb-4 overflow-hidden flex items-center justify-center relative">
//                     <img src={p.images?.[0]?.url || DEFAULT_IMG} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" alt={p.name} />
//                   </div>
//                   <h4 className="font-bold text-[11px] md:text-[13px] uppercase tracking-widest mb-1 group-hover:text-[#C8A253] transition-colors line-clamp-2">{p.name}</h4>
//                   <p className="text-gray-400 text-[12px] md:text-sm font-light">₹{p.price?.toLocaleString()}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* --- REVIEWS SECTION --- */}
//         <section id="reviews-section" className="py-24 border-t border-gray-100 bg-white">
//           <div className="max-w-4xl mx-auto px-6 text-center">
//             <div className="flex justify-center gap-1 mb-6 text-[#C8A253]">{[1, 2, 3, 4, 5].map((i) => (<Star key={i} fill="currentColor" size={18} />))}</div>
//             <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-6 leading-tight">Sonic Perfection.</h2>
//             <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500 mb-16">{fullProduct?.reviewsCount || "843"} Verified Audiophiles &nbsp;•&nbsp; 4.9 Rating</p>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 pb-12">
//               {galleryImages.slice(0, 3).map((img, i) => (
//                 <div 
//                   key={i} 
//                   className={`aspect-square w-full rounded-[2rem] bg-gray-50 overflow-hidden shadow-sm border border-gray-100 group transition-transform duration-500 ${
//                     i === 1 ? 'md:translate-y-16' : '' 
//                   }`}
//                 >
//                   <img src={img} className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-opacity group-hover:opacity-100" alt="review" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </div>

//       <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-2xl border-t border-gray-100 z-[200] shadow-2xl h-[70px] md:h-[90px] flex items-center px-4 md:px-16 gap-4">
//         <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => scrollToSection('product-hero')}>
//           <img src={galleryImages[0]} className="w-10 h-10 object-contain mix-blend-multiply" alt="prod"/>
//           <div className="hidden sm:block">
//             <span className="font-bold text-[10px] uppercase block leading-none mb-1">{fullProduct?.name}</span>
//             <span className="text-[9px] font-bold text-[#C8A253]">₹{mainPrice.toLocaleString()}</span>
//           </div>
//         </div>
//         <div className="flex-1 flex justify-center gap-3 md:gap-8 text-[7px] md:text-[10px] font-grey uppercase overflow-x-auto scrollbar-hide">
//           <button onClick={() => scrollToSection('curated-section')} className="hover:text-black whitespace-nowrap cursor-pointer">Recommended</button>
//           <button onClick={() => scrollToSection('sidebar-features')} className="hover:text-black whitespace-nowrap cursor-pointer">Features</button>
//           <button onClick={() => scrollToSection('tech-specs-section')} className="hover:text-black whitespace-nowrap cursor-pointer">Tech Specs</button>
//           <button onClick={() => scrollToSection('reviews-section')} className="hover:text-black whitespace-nowrap cursor-pointer">Reviews</button>
//         </div>
        
//         {/* ⚡ FIX: Bottom Bar Button - Disabled & Gray for Coming Soon */}
//         <button 
//           onClick={handleAddToCart} 
//           disabled={!isAvailable || isComingSoon} 
//           className={`px-4 py-2 md:px-10 md:py-4 text-[7px] md:text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl shrink-0 transition-all whitespace-nowrap ${
//             isComingSoon
//               ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none'
//               : isAvailable 
//                 ? 'bg-black text-white hover:bg-[#222] active:scale-95 cursor-pointer' 
//                 : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//           }`}
//         >
//           {isComingSoon ? 'Coming Soon' : isAvailable ? 'Add to Cart' : 'Out of Stock'}
//         </button>
//       </div>
      
//     </div>,
//     document.body
//   );
// }



// import React, { useState, useRef, useEffect } from 'react';
// import { createPortal } from 'react-dom';
// // ⚡ FIX: Yahan 'Link' ko import kar liya
// import { useNavigate, Link } from 'react-router-dom';
// import { X, Star, ShoppingBag, CheckCircle2, Battery, Droplets, Wifi, Bluetooth, Zap, Shield, Tv, Volume, Smartphone, Mic, Plus, Tag } from 'lucide-react';
// import axiosInstance from '../../utils/axiosInstance';

// const DEFAULT_IMG = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600";

// const iconMap = { 
//   Battery: <Battery size={24} />,
//   Droplets: <Droplets size={24} />,
//   Wifi: <Wifi size={24} />,
//   Bluetooth: <Bluetooth size={24} />,
//   Zap: <Zap size={24} />,
//   Shield: <Shield size={24} />,
//   Tv: <Tv size={24} />,
//   Volume: <Volume size={24} />,
//   Smartphone: <Smartphone size={24} />,
//   Mic: <Mic size={24} />
// };

// export default function QuickViewModal({ product: initialProduct, onClose }) {
//   const navigate = useNavigate();
//   const [expand, setExpand] = useState(false);
//   const [activeTab, setActiveTab] = useState('Features'); 
//   const [fullProduct, setFullProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [activeImgIdx, setActiveImgIdx] = useState(0);
//   const [activeSpecTab, setActiveSpecTab] = useState('');
//   const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [expandDescription, setExpandDescription] = useState(false);
//   const modalRef = useRef(null);
//   const [selectedBoughtTogether, setSelectedBoughtTogether] = useState([]);

//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     setLoading(true); 
//     setActiveImgIdx(0);
//     setSelectedVariantIdx(0);
//     setExpandDescription(false);

//     if (initialProduct?._id) {
//       const fetchDetails = async () => {
//         try {
//           const { data } = await axiosInstance.get(`/products/${initialProduct._id}`);
//           if (data?.success && data?.product) {
//             const productData = data.product;
//             setFullProduct(productData);
            
//             if (data.relatedProducts && data.relatedProducts.length > 0) {
//               setRelatedProducts(data.relatedProducts);
//             } else {
//               try {
//                 const allRes = await axiosInstance.get('/products');
//                 if (allRes.data?.success && allRes.data?.products) {
//                   const fallbackRelated = allRes.data.products
//                     .filter(p => p._id !== initialProduct._id)
//                     .slice(0, 4);
//                   setRelatedProducts(fallbackRelated);
//                 }
//               } catch (err) {
//                 console.error("Fallback error:", err);
//               }
//             }
            
//             if (productData.boughtTogether) {
//               setSelectedBoughtTogether(productData.boughtTogether.map(p => p._id));
//             }
//             if (productData.techSpecs && productData.techSpecs.length > 0) {
//               setActiveSpecTab(productData.techSpecs[0].category);
//             }
//           }
//         } catch (e) { 
//           console.error("Fetch error:", e); 
//         } finally { 
//           setLoading(false); 
//         }
//       };
//       fetchDetails();
//     }
//     return () => { document.body.style.overflow = 'unset'; };
//   }, [initialProduct?._id]);

//   const scrollToSection = (id) => {
//     const element = document.getElementById(id);
//     if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   };

//   if (loading || !fullProduct) {
//     return createPortal(
//       <div className="fixed inset-0 z-[999999] bg-white flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-black"></div>
//       </div>,
//       document.body
//     );
//   }

//   const hasVariants = fullProduct?.variants?.length > 0;
//   let galleryImages = (hasVariants && fullProduct.variants[selectedVariantIdx]?.images?.length > 0)
//     ? fullProduct.variants[selectedVariantIdx].images.map(img => img.url)
//     : (fullProduct.images?.length > 0 ? fullProduct.images.map(img => img.url) : [fullProduct?.image || DEFAULT_IMG]);

//   // ⚡ SMART PRICE LOGIC ⚡
//   let originalPrice = fullProduct?.price || 0;
//   let mainPrice = fullProduct?.discountPrice > 0 ? (originalPrice - fullProduct.discountPrice) : originalPrice;
//   let showStrikethrough = fullProduct?.discountPrice > 0;

//   const currentVariant = hasVariants ? fullProduct.variants[selectedVariantIdx] : null;
  
//   if (currentVariant && currentVariant.price) {
//     mainPrice = Number(currentVariant.price);
//     if (mainPrice < originalPrice) {
//       showStrikethrough = true;
//     } else {
//       showStrikethrough = false;
//     }
//   }
  
//   const rawStock = hasVariants && fullProduct?.variants[selectedVariantIdx] 
//     ? fullProduct.variants[selectedVariantIdx].stock 
//     : fullProduct?.stock;

//   // ⚡ COMING SOON + AVAILABILITY FIX ⚡
//   const stockString = rawStock !== undefined && rawStock !== null ? String(rawStock).toLowerCase().trim() : '';
//   const isComingSoon = stockString === 'coming soon';
//   const isAvailable = rawStock !== undefined && rawStock !== null && rawStock !== 0 && String(rawStock).trim() !== '0' && stockString !== 'out of stock' && !isComingSoon;
//   const displayStock = isComingSoon ? 'Coming Soon' : (isAvailable ? rawStock : 'Out of Stock');

//   const extraTotal = fullProduct?.boughtTogether?.reduce((total, p) => {
//     if (selectedBoughtTogether.includes(p._id)) {
//       const pPrice = p.discountPrice > 0 ? (p.price - p.discountPrice) : p.price;
//       return total + pPrice;
//     }
//     return total;
//   }, 0) || 0;
//   const bundleTotal = mainPrice + extraTotal;

//   const handleAddToCart = async () => {
//     // Return early if coming soon or not available
//     if (!isAvailable || isComingSoon) return;
//     try {
//       const { data } = await axiosInstance.post('/cart/add', { productId: fullProduct._id, quantity: 1 });
//       if (data.success) {
//         window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { increase: 1 } }));
//       }
//     } catch (err) { console.error(err); }
//   };

//   const stripHtml = (html) => html ? String(html).replace(/<[^>]*>?/gm, '').trim() : '';
//   const rawDesc = stripHtml(fullProduct?.description || '');
//   const isLongDesc = rawDesc.length > 120;
//   const displayDesc = expandDescription ? rawDesc : (isLongDesc ? rawDesc.slice(0, 120) + '...' : rawDesc);

//   return createPortal(
//     <div 
//       className="fixed inset-0 z-[999999] bg-white overflow-y-auto scroll-smooth scrollbar-hide font-sans text-[#1a1a1a]"
//       ref={modalRef} 
//       onScroll={(e) => setExpand(e.target.scrollTop > 100)}
//     >
//       <div className="w-full pb-[140px]">
//         <nav id="product-hero" className={`sticky top-0 z-[150] w-full bg-white transition-all duration-300 border-b border-gray-50 ${expand ? 'py-2' : 'py-3'}`}>
//           <div className="max-w-[1340px] mx-auto px-6 md:px-12 flex justify-between items-center">
            
//             {/* ⚡ FIX: Logo ko <Link> tag mein daal diya aur onClose laga diya */}
//          {/* ⚡ FIX: 'instant' lagane se page bina scroll (slide) hue direct top par khulega */}
// <Link 
//   to="/" 
//   onClick={() => {
//     onClose();
//     // 👇 Ye line ab page ko sarakne nahi degi, direct top par jhatke se open karegi
//     window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); 
//   }} 
//   className="flex flex-col items-center group cursor-pointer"
// >
//    <img src="/Truee_Luxury_Logo.png" alt="Truee" className="h-8 md:h-10 w-auto object-contain brightness-0" />    
//    <span className="text-[8px] font-bold tracking-[0.4em] uppercase mt-0.5 text-black opacity-80 group-hover:opacity-100 transition-opacity">TRUEE</span>
// </Link>

//             <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-all cursor-pointer bg-white shadow-sm border border-gray-100">
//               <X size={24} color="black" />
//             </button>
//           </div>
//         </nav>

//         <div className="max-w-[1340px] mx-auto px-6 md:px-12 pt-8 flex flex-col lg:flex-row gap-8 lg:gap-20 mb-20 items-start relative">
//           <div className="w-full lg:w-[60%] lg:sticky lg:top-24 self-start">
//             <div className="bg-[#f7f7f7] w-full max-w-[850px] aspect-square rounded-[2rem] flex items-center justify-center p-8 relative overflow-hidden group mx-auto cursor-pointer">
//               <img src={galleryImages[activeImgIdx]} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ease-in-out group-hover:scale-110" alt="main" style={{ maxHeight: '460px', marginTop: '-10px' }} />
//             </div>
//             <div className="flex gap-3 mt-4 justify-center">
//               {galleryImages.map((img, i) => (
//                 <button key={i} onClick={() => setActiveImgIdx(i)} className={`w-26 h-26 rounded-xl bg-[#f7f7f7] p-2 border-2 cursor-pointer transition-all ${activeImgIdx === i ? 'border-black' : 'border-transparent'}`}>
//                   <img src={img} className="w-full h-full object-contain mix-blend-multiply" alt="thumb" />
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="w-full lg:w-[40%] flex flex-col pt-4">
//             <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 leading-tight">{fullProduct?.name}</h1>
            
//             <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-6">
//               <div className="flex items-baseline gap-3">
//                 <p className="text-3xl font-light text-black">₹{mainPrice}</p>
//                 {showStrikethrough && <p className="text-lg text-gray-400 line-through">₹{originalPrice}</p>}
//               </div>
//               {/* Badge stays green for Available OR Coming Soon */}
//               <div className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${isAvailable || isComingSoon ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                 {displayStock}
//               </div>
//             </div>

//             {rawDesc && (
//               <div className="mb-8">
//                 <p className="text-[13.5px] text-gray-700 leading-relaxed transition-all duration-300">
//                   {displayDesc}
//                 </p>
//                 {isLongDesc && (
//                   <button 
//                     onClick={() => setExpandDescription(!expandDescription)}
//                     className="mt-3 text-[10px] font-bold uppercase tracking-widest text-black border-b border-black hover:text-gray-600 hover:border-gray-600 transition-all cursor-pointer"
//                   >
//                     {expandDescription ? 'Show Less' : 'Read More'}
//                   </button>
//                 )}
//               </div>
//             )}

//             {hasVariants && (
//               <div className="mb-8">
//                 <p className="text-[11px] font-black uppercase tracking-widest mb-4 text-gray-400">Select Variant</p>
//                 <div className="flex gap-2 flex-wrap">
//                   {fullProduct.variants.map((v, i) => (
//                     <button 
//                       key={i} 
//                       onClick={() => { setSelectedVariantIdx(i); setActiveImgIdx(0); }} 
//                       className={`px-6 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all ${
//                         selectedVariantIdx === i 
//                         ? 'bg-black text-white border-black' 
//                         : 'bg-white text-gray-600 border-gray-200 hover:border-black'
//                       }`}
//                     >
//                       {v.color || v.size}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* ⚡ FIX: Main Button - Disabled & Gray for Coming Soon */}
//             <button 
//               onClick={handleAddToCart} 
//               disabled={!isAvailable || isComingSoon} 
//               className={`w-full py-5 rounded-full font-bold text-[10px] tracking-[0.3em] uppercase mb-10 transition-all shadow-lg ${
//                 isComingSoon
//                   ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none'
//                   : isAvailable 
//                     ? 'bg-black text-white hover:bg-[#333] active:scale-95 cursor-pointer' 
//                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               {isComingSoon ? 'Coming Soon' : isAvailable ? 'Add to Cart' : 'Out of Stock'}
//             </button>
            
//             {/* Sidebar Tabs */}
//             <div id="sidebar-features" className="bg-[#f2f2f2] rounded-[2.5rem] p-1.5 flex flex-col min-h-[300px] border border-gray-100">
//               <div className="flex p-1">
//                 <button onClick={() => setActiveTab('Features')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-full transition-all cursor-pointer ${activeTab === 'Features' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-black'}`}>Features</button>
//                 <button onClick={() => setActiveTab('Included')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-full transition-all cursor-pointer ${activeTab === 'Included' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-black'}`}>Included</button>
//               </div>
//               <div className="px-6 py-8 overflow-y-auto scrollbar-hide h-full">
//                 {activeTab === 'Features' ? (
//                   <div className="grid grid-cols-2 gap-y-8 gap-x-6">
//                     {(fullProduct?.highlights || []).map((h, i) => (
//                       <div key={i} className="flex flex-col items-center text-center gap-2 group">
//                         <div className="text-gray-800 opacity-70 group-hover:scale-110 transition-transform">{iconMap[h.iconName] || <Zap size={24}/>}</div>
//                         <p className="text-[10px] font-bold uppercase tracking-tight text-gray-800 leading-tight">{h.title}</p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <ul className="space-y-4">
//                     {(fullProduct?.inTheBox || ['Authentic Speaker', 'Premium Cable', 'Quick Start Guide']).map((item, i) => (
//                       <li key={i} className="flex items-center gap-4 text-[11px] font-bold text-gray-700 uppercase tracking-tighter">
//                         <CheckCircle2 size={16} className="text-black"/> {item}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* --- VIDEO SECTION --- */}
//         <section id="video" className="mb-16 px-6 md:px-12">
//           <div className="w-full h-64 md:h-[500px] bg-black rounded-[3rem] overflow-hidden shadow-lg">
//             <video className="w-full h-full object-cover" autoPlay muted loop playsInline controls>
//               <source src="/342594216c4392756219a48bf547870e0948133c-bg-720p.webm" type="video/webm" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         </section>

//         {/* --- TECH SPECS SECTION --- */}
//         <section id="tech-specs-section" className="py-20 md:py-32 bg-white border-t border-gray-50">
//           <div className="max-w-[1340px] mx-auto px-6 md:px-12 text-center">
//             <h2 className="text-4xl md:text-7xl font-medium tracking-tighter mb-12 md:mb-20 uppercase">Tech Specs.</h2>
//             <div className="flex justify-start md:justify-center gap-6 md:gap-16 border-b border-gray-100 mb-12 md:mb-20 overflow-x-auto scrollbar-hide px-2">
//               {fullProduct?.techSpecs?.map((spec, idx) => (
//                 <button key={spec.category || idx} onClick={() => setActiveSpecTab(spec.category)} className={`pb-4 text-base md:text-xl font-medium transition-all relative whitespace-nowrap cursor-pointer ${activeSpecTab === spec.category ? 'text-black' : 'text-gray-400'}`}>
//                   {spec.category}
//                   {activeSpecTab === spec.category && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-full animate-in slide-in-from-left duration-300"/>}
//                 </button>
//               ))}
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 md:gap-y-16 text-left max-w-6xl mx-auto">
//               {fullProduct?.techSpecs?.filter(s => s.category === activeSpecTab)?.map((spec) => (
//                   spec.details?.map((detail, idx) => (
//                     <div key={`${spec.category}-${idx}`} className="animate-in fade-in slide-in-from-bottom-2 duration-500 border-b border-gray-50  md:border-none md:pb-0">
//                       <h4 className="text-[15px] font-semibold text-black mb-2 tracking-tight">{detail.title || (typeof detail === 'string' ? detail.split(':')[0] : 'Spec')}</h4>
//                       <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed font-light">{detail.desc || (typeof detail === 'string' ? detail.split(':').slice(1).join(':') : detail)}</p>
//                     </div>
//                   ))
//                 ))}
//             </div>
//           </div>
//         </section>

//         {/* --- RECOMMENDED SECTION --- */}
//         <section id="curated-section" className="py-20 md:py-32 bg-white border-t border-gray-50 relative z-10">
//           <div className="max-w-[1340px] mx-auto px-6 md:px-12">
//             <h2 className="text-3xl md:text-5xl font-medium tracking-tighter mb-12 text-center md:text-left">Recommended for you.</h2>
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12">
//               {relatedProducts.slice(0, 4).map((p) => (
//                 <div key={p._id} className="group cursor-pointer relative" style={{ touchAction: 'manipulation' }} onClick={async (e) => { e.preventDefault(); if (modalRef.current) modalRef.current.scrollTo({ top: 0, behavior: 'smooth' }); setLoading(true); setActiveImgIdx(0); setSelectedVariantIdx(0); setExpandDescription(false); try { const { data } = await axiosInstance.get(`/products/${p._id}`); if (data?.success && data?.product) { setFullProduct(data.product); setRelatedProducts(data.relatedProducts || []); if (data.product.techSpecs?.length > 0) setActiveSpecTab(data.product.techSpecs[0].category); } } catch (e) { console.error(e); } finally { setLoading(false); } }}>
//                   <div className="aspect-square bg-[#f8f8f8] rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-10 mb-4 overflow-hidden flex items-center justify-center relative">
//                     <img src={p.images?.[0]?.url || DEFAULT_IMG} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" alt={p.name} />
//                   </div>
//                   <h4 className="font-bold text-[11px] md:text-[13px] uppercase tracking-widest mb-1 group-hover:text-[#C8A253] transition-colors line-clamp-2">{p.name}</h4>
//                   <p className="text-gray-400 text-[12px] md:text-sm font-light">₹{p.price?.toLocaleString()}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* --- REVIEWS SECTION --- */}
//         <section id="reviews-section" className="py-24 border-t border-gray-100 bg-white">
//           <div className="max-w-4xl mx-auto px-6 text-center">
//             <div className="flex justify-center gap-1 mb-6 text-[#C8A253]">{[1, 2, 3, 4, 5].map((i) => (<Star key={i} fill="currentColor" size={18} />))}</div>
//             <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-6 leading-tight">Sonic Perfection.</h2>
//             <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500 mb-16">{fullProduct?.reviewsCount || "843"} Verified Audiophiles &nbsp;•&nbsp; 4.9 Rating</p>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 pb-12">
//               {galleryImages.slice(0, 3).map((img, i) => (
//                 <div 
//                   key={i} 
//                   className={`aspect-square w-full rounded-[2rem] bg-gray-50 overflow-hidden shadow-sm border border-gray-100 group transition-transform duration-500 ${
//                     i === 1 ? 'md:translate-y-16' : '' 
//                   }`}
//                 >
//                   <img src={img} className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-opacity group-hover:opacity-100" alt="review" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </div>

//       <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-2xl border-t border-gray-100 z-[200] shadow-2xl h-[70px] md:h-[90px] flex items-center px-4 md:px-16 gap-4">
//         <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => scrollToSection('product-hero')}>
//           <img src={galleryImages[0]} className="w-10 h-10 object-contain mix-blend-multiply" alt="prod"/>
//           <div className="hidden sm:block">
//             <span className="font-bold text-[10px] uppercase block leading-none mb-1">{fullProduct?.name}</span>
//             <span className="text-[9px] font-bold text-[#C8A253]">₹{mainPrice.toLocaleString()}</span>
//           </div>
//         </div>
//         <div className="flex-1 flex justify-center gap-3 md:gap-8 text-[7px] md:text-[10px] font-grey uppercase overflow-x-auto scrollbar-hide">
//           <button onClick={() => scrollToSection('curated-section')} className="hover:text-black whitespace-nowrap cursor-pointer">Recommended</button>
//           <button onClick={() => scrollToSection('sidebar-features')} className="hover:text-black whitespace-nowrap cursor-pointer">Features</button>
//           <button onClick={() => scrollToSection('tech-specs-section')} className="hover:text-black whitespace-nowrap cursor-pointer">Tech Specs</button>
//           <button onClick={() => scrollToSection('reviews-section')} className="hover:text-black whitespace-nowrap cursor-pointer">Reviews</button>
//         </div>
        
//         {/* ⚡ FIX: Bottom Bar Button - Disabled & Gray for Coming Soon */}
//         <button 
//           onClick={handleAddToCart} 
//           disabled={!isAvailable || isComingSoon} 
//           className={`px-4 py-2 md:px-10 md:py-4 text-[7px] md:text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl shrink-0 transition-all whitespace-nowrap ${
//             isComingSoon
//               ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none'
//               : isAvailable 
//                 ? 'bg-black text-white hover:bg-[#222] active:scale-95 cursor-pointer' 
//                 : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//           }`}
//         >
//           {isComingSoon ? 'Coming Soon' : isAvailable ? 'Add to Cart' : 'Out of Stock'}
//         </button>
//       </div>
      
//     </div>,
//     document.body
//   );
// }

// import React, { useState, useRef, useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import { useNavigate, Link } from 'react-router-dom';
// import { X, Star, ShoppingBag, CheckCircle2, Battery, Droplets, Wifi, Bluetooth, Zap, Shield, Tv, Volume, Smartphone, Mic, Plus, Tag } from 'lucide-react';
// import axiosInstance from '../../utils/axiosInstance';

// const DEFAULT_IMG = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600";

// const iconMap = { 
//   Battery: <Battery size={24} />,
//   Droplets: <Droplets size={24} />,
//   Wifi: <Wifi size={24} />,
//   Bluetooth: <Bluetooth size={24} />,
//   Zap: <Zap size={24} />,
//   Shield: <Shield size={24} />,
//   Tv: <Tv size={24} />,
//   Volume: <Volume size={24} />,
//   Smartphone: <Smartphone size={24} />,
//   Mic: <Mic size={24} />
// };

// export default function QuickViewModal({ product: initialProduct, onClose }) {
//   const navigate = useNavigate();
//   const [expand, setExpand] = useState(false);
//   const [activeTab, setActiveTab] = useState('Features'); 
//   const [fullProduct, setFullProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [activeImgIdx, setActiveImgIdx] = useState(0);
//   const [activeSpecTab, setActiveSpecTab] = useState('');
//   const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [expandDescription, setExpandDescription] = useState(false);
//   const modalRef = useRef(null);
//   const [selectedBoughtTogether, setSelectedBoughtTogether] = useState([]);
  
//   const [activeBottomTab, setActiveBottomTab] = useState('');

//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     setLoading(true); 
//     setActiveImgIdx(0);
//     setSelectedVariantIdx(0);
//     setExpandDescription(false);

//     if (initialProduct?._id) {
//       const fetchDetails = async () => {
//         try {
//           const { data } = await axiosInstance.get(`/products/${initialProduct._id}`);
//           if (data?.success && data?.product) {
//             const productData = data.product;
//             setFullProduct(productData);
            
//             if (data.relatedProducts && data.relatedProducts.length > 0) {
//               setRelatedProducts(data.relatedProducts);
//             } else {
//               try {
//                 const allRes = await axiosInstance.get('/products');
//                 if (allRes.data?.success && allRes.data?.products) {
//                   const fallbackRelated = allRes.data.products
//                     .filter(p => p._id !== initialProduct._id)
//                     .slice(0, 4);
//                   setRelatedProducts(fallbackRelated);
//                 }
//               } catch (err) {
//                 console.error("Fallback error:", err);
//               }
//             }
            
//             if (productData.boughtTogether) {
//               setSelectedBoughtTogether(productData.boughtTogether.map(p => p._id));
//             }
//             if (productData.techSpecs && productData.techSpecs.length > 0) {
//               setActiveSpecTab(productData.techSpecs[0].category);
//             }
//           }
//         } catch (e) { 
//           console.error("Fetch error:", e); 
//         } finally { 
//           setLoading(false); 
//         }
//       };
//       fetchDetails();
//     }
//     return () => { document.body.style.overflow = 'unset'; };
//   }, [initialProduct?._id]);

//   const scrollToSection = (id) => {
//     const element = document.getElementById(id);
//     if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   };

//   if (loading || !fullProduct) {
//     return createPortal(
//       <div className="fixed inset-0 z-[999999] bg-white flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-black"></div>
//       </div>,
//       document.body
//     );
//   }

//   const hasVariants = fullProduct?.variants?.length > 0;
//   let galleryImages = (hasVariants && fullProduct.variants[selectedVariantIdx]?.images?.length > 0)
//     ? fullProduct.variants[selectedVariantIdx].images.map(img => img.url)
//     : (fullProduct.images?.length > 0 ? fullProduct.images.map(img => img.url) : [fullProduct?.image || DEFAULT_IMG]);

//   let originalPrice = fullProduct?.price || 0;
//   let mainPrice = fullProduct?.discountPrice > 0 ? (originalPrice - fullProduct.discountPrice) : originalPrice;
//   let showStrikethrough = fullProduct?.discountPrice > 0;

//   const currentVariant = hasVariants ? fullProduct.variants[selectedVariantIdx] : null;
  
//   if (currentVariant && currentVariant.price) {
//     mainPrice = Number(currentVariant.price);
//     if (mainPrice < originalPrice) {
//       showStrikethrough = true;
//     } else {
//       showStrikethrough = false;
//     }
//   }
  
//   const rawStock = hasVariants && fullProduct?.variants[selectedVariantIdx] 
//     ? fullProduct.variants[selectedVariantIdx].stock 
//     : fullProduct?.stock;

//   const stockString = rawStock !== undefined && rawStock !== null ? String(rawStock).toLowerCase().trim() : '';
//   const isComingSoon = stockString === 'coming soon';
//   const isAvailable = rawStock !== undefined && rawStock !== null && rawStock !== 0 && String(rawStock).trim() !== '0' && stockString !== 'out of stock' && !isComingSoon;
//   const displayStock = isComingSoon ? 'Coming Soon' : (isAvailable ? rawStock : 'Out of Stock');

//   const extraTotal = fullProduct?.boughtTogether?.reduce((total, p) => {
//     if (selectedBoughtTogether.includes(p._id)) {
//       const pPrice = p.discountPrice > 0 ? (p.price - p.discountPrice) : p.price;
//       return total + pPrice;
//     }
//     return total;
//   }, 0) || 0;
//   const bundleTotal = mainPrice + extraTotal;

//   const handleAddToCart = async () => {
//     if (!isAvailable || isComingSoon) return;
//     try {
//       const { data } = await axiosInstance.post('/cart/add', { productId: fullProduct._id, quantity: 1 });
//       if (data.success) {
//         window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { increase: 1 } }));
//       }
//     } catch (err) { console.error(err); }
//   };

//   const stripHtml = (html) => html ? String(html).replace(/<[^>]*>?/gm, '').trim() : '';
//   const rawDesc = stripHtml(fullProduct?.description || '');
//   const isLongDesc = rawDesc.length > 120;
//   const displayDesc = expandDescription ? rawDesc : (isLongDesc ? rawDesc.slice(0, 120) + '...' : rawDesc);

//   return createPortal(
//     <div 
//       className="fixed inset-0 z-[999999] bg-white overflow-y-auto scroll-smooth scrollbar-hide font-sans text-[#1a1a1a]"
//       ref={modalRef} 
//       onScroll={(e) => setExpand(e.target.scrollTop > 100)}
//     >
//       <div className="w-full pb-[160px]">
//         <nav id="product-hero" className={`sticky top-0 z-[150] w-full bg-white transition-all duration-300 border-b border-gray-50 ${expand ? 'py-2' : 'py-3'}`}>
//           <div className="max-w-[1340px] mx-auto px-6 md:px-12 flex justify-between items-center">
//           <Link 
//             to="/" 
//             onClick={() => {
//               onClose();
//               window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); 
//             }} 
//             className="flex flex-col items-center group cursor-pointer"
//           >
//              <img src="/Truee_Luxury_Logo.png" alt="Truee" className="h-8 md:h-10 w-auto object-contain brightness-0" />    
//              <span className="text-[8px] font-bold tracking-[0.4em] uppercase mt-0.5 text-black opacity-80 group-hover:opacity-100 transition-opacity">TRUEE</span>
//           </Link>
//             <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-all cursor-pointer bg-white shadow-sm border border-gray-100">
//               <X size={24} color="black" />
//             </button>
//           </div>
//         </nav>

//         <div className="max-w-[1340px] mx-auto px-6 md:px-12 pt-8 flex flex-col lg:flex-row gap-8 lg:gap-20 mb-20 items-start relative">
//           <div className="w-full lg:w-[60%] lg:sticky lg:top-24 self-start">
//             <div className="bg-[#f7f7f7] w-full max-w-[850px] aspect-square rounded-[2rem] flex items-center justify-center p-8 relative overflow-hidden group mx-auto cursor-pointer">
//               <img src={galleryImages[activeImgIdx]} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ease-in-out group-hover:scale-110" alt="main" style={{ maxHeight: '460px', marginTop: '-10px' }} />
//             </div>
            
//             {/* ⚡ Yahan change kiya hai: Thumbnails bade kiye aur gap badhaya taaki line me ~3 aayein aur baki next line me chale jayein */}
//             <div className="flex flex-wrap gap-4 mt-6 justify-center">
//               {galleryImages.map((img, i) => (
//                 <button 
//                   key={i} 
//                   onClick={() => setActiveImgIdx(i)} 
//                   className={`w-[90px] h-[130px] md:w-[120px] md:h-[160px] rounded-[1.5rem] bg-[#f7f7f7] p-3 border-[2px] cursor-pointer transition-all duration-300 ${
//                     activeImgIdx === i ? 'border-black shadow-sm' : 'border-transparent hover:border-gray-200'
//                   }`}
//                 >
//                   <img src={img} className="w-full h-full object-contain mix-blend-multiply" alt="thumb" />
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="w-full lg:w-[40%] flex flex-col pt-4">
//             <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 leading-tight">{fullProduct?.name}</h1>
            
//             <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-6">
//               <div className="flex items-baseline gap-3">
//                 <p className="text-3xl font-light text-black">₹{mainPrice}</p>
//                 {showStrikethrough && <p className="text-lg text-gray-400 line-through">₹{originalPrice}</p>}
//               </div>
//               <div className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${isAvailable || isComingSoon ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                 {displayStock}
//               </div>
//             </div>

//             {rawDesc && (
//               <div className="mb-8">
//                 <p className="text-[13.5px] text-gray-700 leading-relaxed transition-all duration-300">
//                   {displayDesc}
//                 </p>
//                 {isLongDesc && (
//                   <button 
//                     onClick={() => setExpandDescription(!expandDescription)}
//                     className="mt-3 text-[10px] font-bold uppercase tracking-widest text-black border-b border-black hover:text-gray-600 hover:border-gray-600 transition-all cursor-pointer"
//                   >
//                     {expandDescription ? 'Show Less' : 'Read More'}
//                   </button>
//                 )}
//               </div>
//             )}

//             {hasVariants && (
//               <div className="mb-8">
//                 <p className="text-[11px] font-black uppercase tracking-widest mb-4 text-gray-400">Select Variant</p>
//                 <div className="flex gap-2 flex-wrap">
//                   {fullProduct.variants.map((v, i) => (
//                     <button 
//                       key={i} 
//                       onClick={() => { setSelectedVariantIdx(i); setActiveImgIdx(0); }} 
//                       className={`px-6 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all ${
//                         selectedVariantIdx === i 
//                         ? 'bg-black text-white border-black' 
//                         : 'bg-white text-gray-600 border-gray-200 hover:border-black'
//                       }`}
//                     >
//                       {v.color || v.size}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <button 
//               onClick={handleAddToCart} 
//               disabled={!isAvailable || isComingSoon} 
//               className={`w-full py-5 rounded-full font-bold text-[10px] tracking-[0.3em] uppercase mb-10 transition-all shadow-lg ${
//                 isComingSoon
//                   ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none'
//                   : isAvailable 
//                     ? 'bg-black text-white hover:bg-[#333] active:scale-95 cursor-pointer' 
//                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               {isComingSoon ? 'Coming Soon' : isAvailable ? 'Add to Cart' : 'Out of Stock'}
//             </button>
            
//             <div id="sidebar-features" className="bg-[#f2f2f2] rounded-[2.5rem] p-1.5 flex flex-col min-h-[300px] border border-gray-100">
//               <div className="flex p-1">
//                 <button onClick={() => setActiveTab('Features')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-full transition-all cursor-pointer ${activeTab === 'Features' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-black'}`}>Features</button>
//                 <button onClick={() => setActiveTab('Included')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-full transition-all cursor-pointer ${activeTab === 'Included' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-black'}`}>Included</button>
//               </div>
//               <div className="px-6 py-8 overflow-y-auto scrollbar-hide h-full">
//                 {activeTab === 'Features' ? (
//                   <div className="grid grid-cols-2 gap-y-8 gap-x-6">
//                     {(fullProduct?.highlights || []).map((h, i) => (
//                       <div key={i} className="flex flex-col items-center text-center gap-2 group">
//                         <div className="text-gray-800 opacity-70 group-hover:scale-110 transition-transform">{iconMap[h.iconName] || <Zap size={24}/>}</div>
//                         <p className="text-[10px] font-bold uppercase tracking-tight text-gray-800 leading-tight">{h.title}</p>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <ul className="space-y-4">
//                     {(fullProduct?.inTheBox || ['Authentic Speaker', 'Premium Cable', 'Quick Start Guide']).map((item, i) => (
//                       <li key={i} className="flex items-center gap-4 text-[11px] font-bold text-gray-700 uppercase tracking-tighter">
//                         <CheckCircle2 size={16} className="text-black"/> {item}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <section id="video" className="mb-16 px-6 md:px-12">
//           <div className="w-full h-64 md:h-[500px] bg-black rounded-[3rem] overflow-hidden shadow-lg">
//             <video className="w-full h-full object-cover" autoPlay muted loop playsInline controls>
//               <source src="/342594216c4392756219a48bf547870e0948133c-bg-720p.webm" type="video/webm" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         </section>

//         <section id="tech-specs-section" className="py-20 md:py-32 bg-white border-t border-gray-50">
//           <div className="max-w-[1340px] mx-auto px-6 md:px-12 text-center">
//             <h2 className="text-4xl md:text-7xl font-medium tracking-tighter mb-12 md:mb-20 uppercase">Tech Specs.</h2>
//             <div className="flex justify-start md:justify-center gap-6 md:gap-16 border-b border-gray-100 mb-12 md:mb-20 overflow-x-auto scrollbar-hide px-2">
//               {fullProduct?.techSpecs?.map((spec, idx) => (
//                 <button key={spec.category || idx} onClick={() => setActiveSpecTab(spec.category)} className={`pb-4 text-base md:text-xl font-medium transition-all relative whitespace-nowrap cursor-pointer ${activeSpecTab === spec.category ? 'text-black' : 'text-gray-400'}`}>
//                   {spec.category}
//                   {activeSpecTab === spec.category && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-full animate-in slide-in-from-left duration-300"/>}
//                 </button>
//               ))}
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 md:gap-y-16 text-left max-w-6xl mx-auto">
//               {fullProduct?.techSpecs?.filter(s => s.category === activeSpecTab)?.map((spec) => (
//                   spec.details?.map((detail, idx) => (
//                     <div key={`${spec.category}-${idx}`} className="animate-in fade-in slide-in-from-bottom-2 duration-500 border-b border-gray-50  md:border-none md:pb-0">
//                       <h4 className="text-[15px] font-semibold text-black mb-2 tracking-tight">{detail.title || (typeof detail === 'string' ? detail.split(':')[0] : 'Spec')}</h4>
//                       <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed font-light">{detail.desc || (typeof detail === 'string' ? detail.split(':').slice(1).join(':') : detail)}</p>
//                     </div>
//                   ))
//                 ))}
//             </div>
//           </div>
//         </section>

//         <section id="curated-section" className="py-20 md:py-32 bg-white border-t border-gray-50 relative z-10">
//           <div className="max-w-[1340px] mx-auto px-6 md:px-12">
//             <h2 className="text-3xl md:text-5xl font-medium tracking-tighter mb-12 text-center md:text-left">Recommended for you.</h2>
//             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12">
//               {relatedProducts.slice(0, 4).map((p) => (
//                 <div key={p._id} className="group cursor-pointer relative" style={{ touchAction: 'manipulation' }} onClick={async (e) => { e.preventDefault(); if (modalRef.current) modalRef.current.scrollTo({ top: 0, behavior: 'smooth' }); setLoading(true); setActiveImgIdx(0); setSelectedVariantIdx(0); setExpandDescription(false); try { const { data } = await axiosInstance.get(`/products/${p._id}`); if (data?.success && data?.product) { setFullProduct(data.product); setRelatedProducts(data.relatedProducts || []); if (data.product.techSpecs?.length > 0) setActiveSpecTab(data.product.techSpecs[0].category); } } catch (e) { console.error(e); } finally { setLoading(false); } }}>
//                   <div className="aspect-square bg-[#f8f8f8] rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-10 mb-4 overflow-hidden flex items-center justify-center relative">
//                     <img src={p.images?.[0]?.url || DEFAULT_IMG} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" alt={p.name} />
//                   </div>
//                   <h4 className="font-bold text-[11px] md:text-[13px] uppercase tracking-widest mb-1 group-hover:text-[#C8A253] transition-colors line-clamp-2">{p.name}</h4>
//                   <p className="text-gray-400 text-[12px] md:text-sm font-light">₹{p.price?.toLocaleString()}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         <section id="reviews-section" className="py-24 border-t border-gray-100 bg-white">
//           <div className="max-w-4xl mx-auto px-6 text-center">
//             <div className="flex justify-center gap-1 mb-6 text-[#C8A253]">{[1, 2, 3, 4, 5].map((i) => (<Star key={i} fill="currentColor" size={18} />))}</div>
//             <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-6 leading-tight">Sonic Perfection.</h2>
//             <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500 mb-16">{fullProduct?.reviewsCount || "843"} Verified Audiophiles &nbsp;•&nbsp; 4.9 Rating</p>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 pb-12">
//               {galleryImages.slice(0, 3).map((img, i) => (
//                 <div 
//                   key={i} 
//                   className={`aspect-square w-full rounded-[2rem] bg-gray-50 overflow-hidden shadow-sm border border-gray-100 group transition-transform duration-500 ${
//                     i === 1 ? 'md:translate-y-16' : '' 
//                   }`}
//                 >
//                   <img src={img} className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-opacity group-hover:opacity-100" alt="review" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </div>

//       <div className="fixed bottom-0 left-0 w-full z-[200] bg-white flex flex-col shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
//         <div className="w-full bg-[#f8f8f8] border-t border-gray-200 px-4 md:px-16 flex justify-start md:justify-center gap-8 md:gap-16 overflow-x-auto scrollbar-hide">
//           {[
//             { id: 'sidebar-features', label: 'Features' },
//             { id: 'tech-specs-section', label: 'Tech Specs' },
//             { id: 'reviews-section', label: 'Reviews' },
//             { id: 'curated-section', label: 'Compare' }
//           ].map((tab) => (
//             <button 
//               key={tab.id}
//               onClick={() => { setActiveBottomTab(tab.id); scrollToSection(tab.id); }} 
//               className={`relative pt-3 pb-2.5 text-[11px] md:text-[13px] whitespace-nowrap cursor-pointer transition-all duration-300 ${
//                 activeBottomTab === tab.id ? 'text-black font-bold' : 'text-gray-500 font-medium hover:text-black'
//               }`}
//             >
//               {tab.label}
//               {activeBottomTab === tab.id && (
//                 <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black"></span>
//               )}
//             </button>
//           ))}
//         </div>

//         <div className="w-full h-[65px] md:h-[80px] flex items-center justify-between px-4 md:px-16 bg-white">
//           <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => scrollToSection('product-hero')}>
//             <img src={galleryImages[0]} className="w-10 h-10 object-contain mix-blend-multiply" alt="prod"/>
//             <div className="flex flex-col justify-center">
//               <span className="font-bold text-[12px] md:text-[14px] text-black leading-none mb-1 max-w-[150px] md:max-w-[250px] truncate">{fullProduct?.name || 'Product'}</span>
//               <span className="text-[11px] font-bold text-[#C8A253]">₹{mainPrice.toLocaleString()}</span>
//             </div>
//           </div>
          
//           <button 
//             onClick={handleAddToCart} 
//             disabled={!isAvailable || isComingSoon} 
//             className={`px-6 py-2.5 md:px-10 md:py-3.5 text-[10px] md:text-[12px] font-bold uppercase tracking-widest rounded-full shadow-lg shrink-0 transition-all whitespace-nowrap ${
//               isComingSoon
//                 ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none'
//                 : isAvailable 
//                   ? 'bg-black text-white hover:bg-[#222] active:scale-95 cursor-pointer' 
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//             }`}
//           >
//             {isComingSoon ? 'Coming Soon' : isAvailable ? 'Add to Cart' : 'Out of Stock'}
//           </button>
//         </div>
//       </div>
      
//     </div>,
//     document.body
//   );
// }
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, Link } from 'react-router-dom';
import { X, Star, ShoppingBag, CheckCircle2, Battery, Droplets, Wifi, Bluetooth, Zap, Shield, Tv, Volume, Smartphone, Mic, Plus, Tag } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';

const DEFAULT_IMG = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600";

const iconMap = { 
  Battery: <Battery size={24} />,
  Droplets: <Droplets size={24} />,
  Wifi: <Wifi size={24} />,
  Bluetooth: <Bluetooth size={24} />,
  Zap: <Zap size={24} />,
  Shield: <Shield size={24} />,
  Tv: <Tv size={24} />,
  Volume: <Volume size={24} />,
  Smartphone: <Smartphone size={24} />,
  Mic: <Mic size={24} />
};

export default function QuickViewModal({ product: initialProduct, onClose }) {
  const navigate = useNavigate();
  const [expand, setExpand] = useState(false);
  const [activeTab, setActiveTab] = useState('Features'); 
  const [fullProduct, setFullProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [activeSpecTab, setActiveSpecTab] = useState('');
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [expandDescription, setExpandDescription] = useState(false);
  const modalRef = useRef(null);
  const [selectedBoughtTogether, setSelectedBoughtTogether] = useState([]);
  
  const [activeBottomTab, setActiveBottomTab] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    setLoading(true); 
    setActiveImgIdx(0);
    setSelectedVariantIdx(0);
    setExpandDescription(false);

    if (initialProduct?._id) {
      const fetchDetails = async () => {
        try {
          const { data } = await axiosInstance.get(`/products/${initialProduct._id}`);
          if (data?.success && data?.product) {
            const productData = data.product;
            setFullProduct(productData);
            
            if (data.relatedProducts && data.relatedProducts.length > 0) {
              setRelatedProducts(data.relatedProducts);
            } else {
              try {
                const allRes = await axiosInstance.get('/products');
                if (allRes.data?.success && allRes.data?.products) {
                  const fallbackRelated = allRes.data.products
                    .filter(p => p._id !== initialProduct._id)
                    .slice(0, 4);
                  setRelatedProducts(fallbackRelated);
                }
              } catch (err) {
                console.error("Fallback error:", err);
              }
            }
            
            if (productData.boughtTogether) {
              setSelectedBoughtTogether(productData.boughtTogether.map(p => p._id));
            }
            if (productData.techSpecs && productData.techSpecs.length > 0) {
              setActiveSpecTab(productData.techSpecs[0].category);
            }
          }
        } catch (e) { 
          console.error("Fetch error:", e); 
        } finally { 
          setLoading(false); 
        }
      };
      fetchDetails();
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [initialProduct?._id]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (loading || !fullProduct) {
    return createPortal(
      <div className="fixed inset-0 z-[999999] bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-black"></div>
      </div>,
      document.body
    );
  }

  const hasVariants = fullProduct?.variants?.length > 0;
  let galleryImages = (hasVariants && fullProduct.variants[selectedVariantIdx]?.images?.length > 0)
    ? fullProduct.variants[selectedVariantIdx].images.map(img => img.url)
    : (fullProduct.images?.length > 0 ? fullProduct.images.map(img => img.url) : [fullProduct?.image || DEFAULT_IMG]);

  let originalPrice = fullProduct?.price || 0;
  let mainPrice = fullProduct?.discountPrice > 0 ? (originalPrice - fullProduct.discountPrice) : originalPrice;
  let showStrikethrough = fullProduct?.discountPrice > 0;

  const currentVariant = hasVariants ? fullProduct.variants[selectedVariantIdx] : null;
  
  if (currentVariant && currentVariant.price) {
    mainPrice = Number(currentVariant.price);
    if (mainPrice < originalPrice) {
      showStrikethrough = true;
    } else {
      showStrikethrough = false;
    }
  }
  
  const rawStock = hasVariants && fullProduct?.variants[selectedVariantIdx] 
    ? fullProduct.variants[selectedVariantIdx].stock 
    : fullProduct?.stock;

  const stockString = rawStock !== undefined && rawStock !== null ? String(rawStock).toLowerCase().trim() : '';
  const isComingSoon = stockString === 'coming soon';
  const isAvailable = rawStock !== undefined && rawStock !== null && rawStock !== 0 && String(rawStock).trim() !== '0' && stockString !== 'out of stock' && !isComingSoon;
  const displayStock = isComingSoon ? 'Coming Soon' : (isAvailable ? rawStock : 'Out of Stock');

  const extraTotal = fullProduct?.boughtTogether?.reduce((total, p) => {
    if (selectedBoughtTogether.includes(p._id)) {
      const pPrice = p.discountPrice > 0 ? (p.price - p.discountPrice) : p.price;
      return total + pPrice;
    }
    return total;
  }, 0) || 0;
  const bundleTotal = mainPrice + extraTotal;

  const handleAddToCart = async () => {
    if (!isAvailable || isComingSoon) return;
    try {
      const { data } = await axiosInstance.post('/cart/add', { productId: fullProduct._id, quantity: 1 });
      if (data.success) {
        window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { increase: 1 } }));
      }
    } catch (err) { console.error(err); }
  };

  const stripHtml = (html) => html ? String(html).replace(/<[^>]*>?/gm, '').trim() : '';
  const rawDesc = stripHtml(fullProduct?.description || '');
  const isLongDesc = rawDesc.length > 120;
  const displayDesc = expandDescription ? rawDesc : (isLongDesc ? rawDesc.slice(0, 120) + '...' : rawDesc);

  return createPortal(
    <div 
      className="fixed inset-0 z-[999999] bg-white overflow-y-auto scroll-smooth scrollbar-hide font-sans text-[#1a1a1a]"
      ref={modalRef} 
      onScroll={(e) => setExpand(e.target.scrollTop > 100)}
    >
      <div className="w-full pb-[160px]">
        <nav id="product-hero" className={`sticky top-0 z-[150] w-full bg-white transition-all duration-300 border-b border-gray-50 ${expand ? 'py-2' : 'py-3'}`}>
          <div className="max-w-[1340px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link 
            to="/" 
            onClick={() => {
              onClose();
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); 
            }} 
            className="flex flex-col items-center group cursor-pointer"
          >
             <img src="/Truee_Luxury_Logo.png" alt="Truee" className="h-8 md:h-10 w-auto object-contain brightness-0" />    
             <span className="text-[8px] font-bold tracking-[0.4em] uppercase mt-0.5 text-black opacity-80 group-hover:opacity-100 transition-opacity">TRUEE</span>
          </Link>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-all cursor-pointer bg-white shadow-sm border border-gray-100">
              <X size={24} color="black" />
            </button>
          </div>
        </nav>

        <div className="max-w-[1340px] mx-auto px-6 md:px-12 pt-8 flex flex-col lg:flex-row gap-8 lg:gap-20 mb-20 items-start relative">
          <div className="w-full lg:w-[60%] lg:sticky lg:top-24 self-start">
            <div className="bg-[#f7f7f7] w-full max-w-[850px] aspect-square rounded-[2rem] flex items-center justify-center p-8 relative overflow-hidden group mx-auto cursor-pointer">
              <img src={galleryImages[activeImgIdx]} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ease-in-out group-hover:scale-110" alt="main" style={{ maxHeight: '460px', marginTop: '-10px' }} />
            </div>
            
            <div className="flex flex-wrap gap-4 mt-6 justify-center">
              {galleryImages.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImgIdx(i)} 
                  className={`w-[90px] h-[130px] md:w-[120px] md:h-[160px] rounded-[1.5rem] bg-[#f7f7f7] p-3 border-[2px] cursor-pointer transition-all duration-300 ${
                    activeImgIdx === i ? 'border-black shadow-sm' : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <img src={img} className="w-full h-full object-contain mix-blend-multiply" alt="thumb" />
                </button>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[40%] flex flex-col pt-4">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 leading-tight">{fullProduct?.name}</h1>
            
            <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-6">
              <div className="flex items-baseline gap-3">
                <p className="text-3xl font-light text-black">₹{mainPrice}</p>
                {showStrikethrough && <p className="text-lg text-gray-400 line-through">₹{originalPrice}</p>}
              </div>
              <div className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${isAvailable || isComingSoon ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {displayStock}
              </div>
            </div>

            {rawDesc && (
              <div className="mb-8">
                <p className="text-[13.5px] text-gray-700 leading-relaxed transition-all duration-300">
                  {displayDesc}
                </p>
                {isLongDesc && (
                  <button 
                    onClick={() => setExpandDescription(!expandDescription)}
                    className="mt-3 text-[10px] font-bold uppercase tracking-widest text-black border-b border-black hover:text-gray-600 hover:border-gray-600 transition-all cursor-pointer"
                  >
                    {expandDescription ? 'Show Less' : 'Read More'}
                  </button>
                )}
              </div>
            )}

            {hasVariants && (
              <div className="mb-8">
                <p className="text-[11px] font-black uppercase tracking-widest mb-4 text-gray-400">Select Variant</p>
                <div className="flex gap-2 flex-wrap">
                  {fullProduct.variants.map((v, i) => (
                    <button 
                      key={i} 
                      onClick={() => { setSelectedVariantIdx(i); setActiveImgIdx(0); }} 
                      className={`px-6 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest border transition-all ${
                        selectedVariantIdx === i 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white text-gray-600 border-gray-200 hover:border-black'
                      }`}
                    >
                      {v.color || v.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button 
              onClick={handleAddToCart} 
              disabled={!isAvailable || isComingSoon} 
              className={`w-full py-5 rounded-full font-bold text-[10px] tracking-[0.3em] uppercase mb-10 transition-all shadow-lg ${
                isComingSoon
                  ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none'
                  : isAvailable 
                    ? 'bg-black text-white hover:bg-[#333] active:scale-95 cursor-pointer' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isComingSoon ? 'Coming Soon' : isAvailable ? 'Add to Cart' : 'Out of Stock'}
            </button>
            
            <div id="sidebar-features" className="bg-[#f2f2f2] rounded-[2.5rem] p-1.5 flex flex-col min-h-[300px] border border-gray-100">
              <div className="flex p-1">
                <button onClick={() => setActiveTab('Features')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-full transition-all cursor-pointer ${activeTab === 'Features' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-black'}`}>Features</button>
                <button onClick={() => setActiveTab('Included')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-full transition-all cursor-pointer ${activeTab === 'Included' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-black'}`}>Included</button>
              </div>
              <div className="px-6 py-8 overflow-y-auto scrollbar-hide h-full">
                {activeTab === 'Features' ? (
                  <div className="grid grid-cols-2 gap-y-8 gap-x-6">
                    {(fullProduct?.highlights || []).map((h, i) => (
                      <div key={i} className="flex flex-col items-center text-center gap-2 group">
                        <div className="text-gray-800 opacity-70 group-hover:scale-110 transition-transform">{iconMap[h.iconName] || <Zap size={24}/>}</div>
                        <p className="text-[10px] font-bold uppercase tracking-tight text-gray-800 leading-tight">{h.title}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {(fullProduct?.inTheBox || ['Authentic Speaker', 'Premium Cable', 'Quick Start Guide']).map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-[11px] font-bold text-gray-700 uppercase tracking-tighter">
                        <CheckCircle2 size={16} className="text-black"/> {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        <section id="video" className="mb-16 px-6 md:px-12">
          <div className="w-full h-64 md:h-[500px] bg-black rounded-[3rem] overflow-hidden shadow-lg">
            <video className="w-full h-full object-cover" autoPlay muted loop playsInline controls>
              <source src="/342594216c4392756219a48bf547870e0948133c-bg-720p.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        <section id="tech-specs-section" className="py-20 md:py-32 bg-white border-t border-gray-50">
          <div className="max-w-[1340px] mx-auto px-6 md:px-12 text-center">
            <h2 className="text-4xl md:text-7xl font-medium tracking-tighter mb-12 md:mb-20 uppercase">Tech Specs.</h2>
            <div className="flex justify-start md:justify-center gap-6 md:gap-16 border-b border-gray-100 mb-12 md:mb-20 overflow-x-auto scrollbar-hide px-2">
              {fullProduct?.techSpecs?.map((spec, idx) => (
                <button key={spec.category || idx} onClick={() => setActiveSpecTab(spec.category)} className={`pb-4 text-base md:text-xl font-medium transition-all relative whitespace-nowrap cursor-pointer ${activeSpecTab === spec.category ? 'text-black' : 'text-gray-400'}`}>
                  {spec.category}
                  {activeSpecTab === spec.category && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-full animate-in slide-in-from-left duration-300"/>}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 md:gap-y-16 text-left max-w-6xl mx-auto">
              {fullProduct?.techSpecs?.filter(s => s.category === activeSpecTab)?.map((spec) => (
                  spec.details?.map((detail, idx) => (
                    <div key={`${spec.category}-${idx}`} className="animate-in fade-in slide-in-from-bottom-2 duration-500 border-b border-gray-50  md:border-none md:pb-0">
                      <h4 className="text-[15px] font-semibold text-black mb-2 tracking-tight">{detail.title || (typeof detail === 'string' ? detail.split(':')[0] : 'Spec')}</h4>
                      <p className="text-[14px] md:text-[15px] text-gray-600 leading-relaxed font-light">{detail.desc || (typeof detail === 'string' ? detail.split(':').slice(1).join(':') : detail)}</p>
                    </div>
                  ))
                ))}
            </div>
          </div>
        </section>

        <section id="curated-section" className="py-20 md:py-32 bg-white border-t border-gray-50 relative z-10">
          <div className="max-w-[1340px] mx-auto px-6 md:px-12">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tighter mb-12 text-center md:text-left">Recommended for you.</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12">
              {relatedProducts.slice(0, 4).map((p) => (
                <div key={p._id} className="group cursor-pointer relative" style={{ touchAction: 'manipulation' }} onClick={async (e) => { e.preventDefault(); if (modalRef.current) modalRef.current.scrollTo({ top: 0, behavior: 'smooth' }); setLoading(true); setActiveImgIdx(0); setSelectedVariantIdx(0); setExpandDescription(false); try { const { data } = await axiosInstance.get(`/products/${p._id}`); if (data?.success && data?.product) { setFullProduct(data.product); setRelatedProducts(data.relatedProducts || []); if (data.product.techSpecs?.length > 0) setActiveSpecTab(data.product.techSpecs[0].category); } } catch (e) { console.error(e); } finally { setLoading(false); } }}>
                  <div className="aspect-square bg-[#f8f8f8] rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-10 mb-4 overflow-hidden flex items-center justify-center relative">
                    <img src={p.images?.[0]?.url || DEFAULT_IMG} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" alt={p.name} />
                  </div>
                  <h4 className="font-bold text-[11px] md:text-[13px] uppercase tracking-widest mb-1 group-hover:text-[#C8A253] transition-colors line-clamp-2">{p.name}</h4>
                  <p className="text-gray-400 text-[12px] md:text-sm font-light">₹{p.price?.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews-section" className="py-24 border-t border-gray-100 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex justify-center gap-1 mb-6 text-[#C8A253]">{[1, 2, 3, 4, 5].map((i) => (<Star key={i} fill="currentColor" size={18} />))}</div>
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-6 leading-tight">Sonic Perfection.</h2>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500 mb-16">{fullProduct?.reviewsCount || "843"} Verified Audiophiles &nbsp;•&nbsp; 4.9 Rating</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 pb-12">
              {galleryImages.slice(0, 3).map((img, i) => (
                <div 
                  key={i} 
                  className={`aspect-square w-full rounded-[2rem] bg-gray-50 overflow-hidden shadow-sm border border-gray-100 group transition-transform duration-500 ${
                    i === 1 ? 'md:translate-y-16' : '' 
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-opacity group-hover:opacity-100" alt="review" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-[200] bg-white flex flex-col md:flex-row shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        
        {/* MOBILE ONLY: Scrollable Tabs */}
        <div className="w-full bg-[#f8f8f8] border-t border-gray-200 px-4 md:hidden flex justify-start gap-8 overflow-x-auto scrollbar-hide">
          {[
            { id: 'sidebar-features', label: 'Features' },
            { id: 'tech-specs-section', label: 'Tech Specs' },
            { id: 'reviews-section', label: 'Reviews' },
            { id: 'curated-section', label: 'Compare' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => { setActiveBottomTab(tab.id); scrollToSection(tab.id); }} 
              className={`pt-3 pb-2.5 text-[11px] whitespace-nowrap cursor-pointer transition-colors duration-300 ${
                activeBottomTab === tab.id ? 'text-black font-bold' : 'text-gray-500 font-medium hover:text-black'
              }`}
            >
              <div className="relative inline-flex flex-col items-center">
                <span>{tab.label}</span>
                {/* Line exactly under text */}
                <span className={`absolute -bottom-1 h-[2px] bg-black transition-all duration-300 ${
                  activeBottomTab === tab.id ? 'w-full' : 'w-0'
                }`}></span>
              </div>
            </button>
          ))}
        </div>

        {/* DESKTOP SINGLE ROW / MOBILE BOTTOM ROW */}
        <div className="w-full h-[65px] md:h-[80px] flex items-center justify-between px-4 md:px-12 bg-white border-t border-gray-100 md:border-t-0">
          
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => scrollToSection('product-hero')}>
            <img src={galleryImages[0]} className="w-10 h-10 object-contain mix-blend-multiply hidden sm:block" alt="prod"/>
            <div className="flex flex-col justify-center">
              <span className="font-bold text-[12px] md:text-[14px] text-black leading-none mb-1 max-w-[150px] md:max-w-[200px] truncate">{fullProduct?.name || 'Product'}</span>
              <span className="text-[11px] font-bold text-[#C8A253]">₹{mainPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* Center: DESKTOP ONLY Tabs */}
          <div className="hidden md:flex items-center justify-center gap-8 lg:gap-12 h-full">
            {[
              { id: 'sidebar-features', label: 'Features' },
              { id: 'tech-specs-section', label: 'Tech Specs' },
              { id: 'reviews-section', label: 'Reviews' },
              { id: 'curated-section', label: 'Compare' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => { setActiveBottomTab(tab.id); scrollToSection(tab.id); }} 
                className={`h-full flex items-center text-[13px] whitespace-nowrap cursor-pointer transition-colors duration-300 ${
                  activeBottomTab === tab.id ? 'text-black font-bold' : 'text-gray-500 font-medium hover:text-black'
                }`}
              >
                <div className="relative inline-flex flex-col items-center">
                  <span>{tab.label}</span>
                  {/* Line exactly under text */}
                  <span className={`absolute -bottom-1 h-[2px] bg-black transition-all duration-300 ${
                    activeBottomTab === tab.id ? 'w-full' : 'w-0'
                  }`}></span>
                </div>
              </button>
            ))}
          </div>
          
          <button 
            onClick={handleAddToCart} 
            disabled={!isAvailable || isComingSoon} 
            className={`px-6 py-2.5 md:px-8 md:py-3.5 text-[10px] md:text-[11px] font-bold uppercase tracking-widest rounded-full shadow-lg shrink-0 transition-all whitespace-nowrap ${
              isComingSoon
                ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none'
                : isAvailable 
                  ? 'bg-black text-white hover:bg-[#222] active:scale-95 cursor-pointer' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isComingSoon ? 'Coming Soon' : isAvailable ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
      
    </div>,
    document.body
  );
}
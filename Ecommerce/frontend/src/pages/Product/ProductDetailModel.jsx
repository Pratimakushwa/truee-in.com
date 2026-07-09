

// import React, { useState, useRef, useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import { useNavigate, Link } from 'react-router-dom';
// import { 
//   X, Star, ShoppingBag, CheckCircle2, Battery, Droplets, Wifi, Bluetooth, Zap, 
//   Shield, Tv, Volume, Smartphone, Mic, Plus, Tag, Music, Sun, Settings, 
//   AudioLines, Speaker, Headphones, Volume2, Home, Award,
//   Briefcase, BatteryCharging, Crown, EarOff, PhoneCall, Sliders, Feather,
//   Heart, Share2, MessageCircle, Facebook, Twitter, Send, Mail, Link2 // ⚡ Naye icons add kiye
// } from 'lucide-react';
// import axiosInstance from '../../utils/axiosInstance';
// import { useAuth } from '../../context/AuthContext';
// import EarnCoinsBadge from '../../components/rewards/EarnCoinsBadge';

// const DEFAULT_IMG = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600";

// // ⚡ 1. Icons Mapping
// const iconMap = { 
//   Battery: <Battery size={24} />,
//   Droplets: <Droplets size={24} />,
//   Control: <Sliders size={24} />,
//   Comfort: <Feather size={24} />,
//   Wifi: <Wifi size={24} />,
//   Bluetooth: <Bluetooth size={24} />,
//   Zap: <Zap size={24} />,
//   Shield: <Shield size={24} />,
//   Tv: <Tv size={24} />,
//   Volume: <Volume size={24} />,
//   Smartphone: <Smartphone size={24} />,
//   Mic: <Mic size={24} />,
//   Music: <Music size={24} />,
//   Sun: <Sun size={24} />,
//   Settings: <Settings size={24} />,
//   Setting: <Settings size={24} />, 
//   Audio: <AudioLines size={24} />,
//   AudioLines: <AudioLines size={24} />,
//   Speaker: <Speaker size={24} />,
//   Headphones: <Headphones size={24} />,
//   Earbuds: <Headphones size={24} />, 
//   Vol: <Volume2 size={24} />,
//   Star: <Star size={24} />,
//   Home: <Home size={24} />,
//   Award: <Award size={24} />,
//   ShoppingBag: <ShoppingBag size={24} />,
//   Travel: <Briefcase size={24} />,
//   Bass: <Speaker size={24} />,
//   Charging: <BatteryCharging size={24} />,
//   Premium: <Crown size={24} />
// };

// // ⚡ 2. SMART AUTO-DETECT FUNCTION
// const getIcon = (iconName, title = '') => {
//   if (iconName && String(iconName).trim() !== '') {
//     const searchKey = String(iconName).trim().toLowerCase();
//     const match = Object.keys(iconMap).find(k => k.toLowerCase() === searchKey);
//     if (match) return iconMap[match];
//   }

//   const t = String(title).toLowerCase();
//   if (t.includes('bass') || t.includes('sound') || t.includes('audio') || t.includes('acoustic')) return iconMap['Speaker'];
//   if (t.includes('charg') || t.includes('power') || t.includes('battery')) return iconMap['Zap'];
//   if (t.includes('design') || t.includes('construction') || t.includes('aluminum') || t.includes('premium')) return iconMap['Award'];
//   if (t.includes('strap') || t.includes('carry') || t.includes('portable') || t.includes('travel')) return iconMap['Travel'];
//   if (t.includes('bluetooth') || t.includes('wireless') || t.includes('stream')) return iconMap['Bluetooth'];
//   if (t.includes('water') || t.includes('splash') || t.includes('ipx')) return iconMap['Droplets'];
//   if (t.includes('control') || t.includes('smart') || t.includes('interface')) return iconMap['Settings'];
//   if (t.includes('case') || t.includes('protect')) return iconMap['Shield'];

//   return <Tag size={24} />;
// };

// // ⚡ 3. YouTube ID Extractor
// const getYouTubeId = (url) => {
//   if (!url) return null;
//   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//   const match = url.match(regExp);
//   return (match && match[2].length === 11) ? match[2] : null;
// };

// export default function QuickViewModal({ product: initialProduct, onClose }) {
//   const navigate = useNavigate();
//   const { user } = useAuth(); // ⚡ Naya auth
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

//   // ⚡ Nayi States for Share/Wishlist
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isCopied, setIsCopied] = useState(false);
//   const [showShareMenu, setShowShareMenu] = useState(false);

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

//   // ⚡ RECENTLY VIEWED LOGIC ADDED HERE ⚡
//   useEffect(() => {
//     if (fullProduct && fullProduct._id) {
//       try {
//         let viewedItems = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
        
//         // Remove duplicate if it already exists
//         viewedItems = viewedItems.filter((item) => item._id !== fullProduct._id);
        
//         // Add current product to the top (saving minimal data to save storage space)
//         viewedItems.unshift({
//           _id: fullProduct._id,
//           name: fullProduct.name,
//           price: fullProduct.price,
//           image: fullProduct.images?.[0]?.url || fullProduct.image || DEFAULT_IMG
//         });
        
//         // Keep only the last 10 products
//         if (viewedItems.length > 10) {
//           viewedItems.pop(); 
//         }
        
//         localStorage.setItem('recentlyViewed', JSON.stringify(viewedItems));
//       } catch (error) {
//         console.error("Error saving recently viewed:", error);
//       }
//     }
//   }, [fullProduct]);

//   const scrollToSection = (id) => {
//     const element = document.getElementById(id);
//     if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   };

//   // ⚡ Wishlist Logic
//   const handleWishlistToggle = async (e) => {
//     e.stopPropagation(); 
//     if (!user) {
//       navigate('/login');
//       return;
//     }
//     setIsWishlisted(!isWishlisted);
//     try {
//       await axiosInstance.post('/wishlist/toggle', { productId: fullProduct._id });
//     } catch (error) {
//       console.error('Wishlist error', error);
//       setIsWishlisted(!isWishlisted);
//     }
//   };

//   // ⚡ Share Logic (Cross Browser)
//   const handleShareClick = async (e) => {
//     e.stopPropagation(); 
//     if (!user) {
//       alert("Please login to share this exclusive product with your network.");
//       navigate('/login'); 
//       return;
//     }

//     const productUrl = `${window.location.origin}/product/${fullProduct._id}`;
//     const shareData = {
//       title: `Truee Luxury - ${fullProduct.name}`,
//       text: `Check out this premium ${fullProduct.name} on Truee Luxury!`,
//       url: productUrl,
//     };

//     if (navigator.share) {
//       try {
//         await navigator.share(shareData);
//       } catch (err) {
//         if (err.name !== 'AbortError') {
//           setShowShareMenu(!showShareMenu);
//         }
//       }
//     } else {
//       setShowShareMenu(!showShareMenu);
//     }
//   };

//   // ⚡ Custom Share Fallback Links
//   const shareToPlatform = (e, platform) => {
//     e.stopPropagation();
//     const productUrl = `${window.location.origin}/product/${fullProduct._id}`;
//     const text = `Check out this premium ${fullProduct.name} on Truee Luxury!`;

//     let url = '';
//     switch(platform) {
//       case 'whatsapp': url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + '\n\n' + productUrl)}`; break;
//       case 'facebook': url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`; break;
//       case 'twitter': url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(text)}`; break;
//       case 'telegram': url = `https://t.me/share/url?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(text)}`; break;
//       default: return;
//     }
//     window.open(url, '_blank', 'width=600,height=500');
//     setShowShareMenu(false);
//   };

//   const copyLink = (e) => {
//     e.stopPropagation();
//     const productUrl = `${window.location.origin}/product/${fullProduct._id}`;
//     navigator.clipboard.writeText(productUrl);
//     setIsCopied(true);
//     setShowShareMenu(false);
//     setTimeout(() => setIsCopied(false), 2500);
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

//         <div className="max-w-[1340px] mx-auto px-6 md:px-12 pt-8 flex flex-col lg:flex-row gap-8 lg:gap-12 mb-20 items-start relative">
          
//           <div className="w-full lg:w-[45%] lg:sticky lg:top-24 self-start">
            
//             {/* ⚡ NEW IMAGE CONTAINER WITH SHARE/WISHLIST */}
//             <div 
//               className="bg-[#f7f7f7] w-full max-w-[480px] aspect-square rounded-[2rem] flex items-center justify-center p-6 relative overflow-hidden group mx-auto cursor-pointer"
//               onMouseLeave={() => setShowShareMenu(false)}
//             >
//               {/* Overlay Action Buttons */}
//               <div className="absolute top-4 right-4 z-40 flex flex-col gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300">
//                 <div className="relative flex justify-center">
//                   <button 
//                     onClick={handleShareClick}
//                     className="p-2.5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-all duration-200 active:scale-90 flex items-center justify-center"
//                     title="Share Product"
//                   >
//                     <Share2 size={16} color="#333" strokeWidth={2.5} />
//                   </button>

//                   {/* Custom Dropdown Menu */}
//                   {showShareMenu && (
//                     <div 
//                       className="absolute top-0 right-12 bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden animate-fade-in-left border border-gray-100 w-40 z-50"
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       <div className="px-3 py-2 border-b border-gray-50 bg-gray-50/50">
//                          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Share via</span>
//                       </div>
//                       <button onClick={(e) => shareToPlatform(e, 'whatsapp')} className="px-4 py-2 text-[11px] font-semibold text-gray-700 hover:text-black hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50">
//                         <MessageCircle size={14} className="text-[#25D366]" /> WhatsApp
//                       </button>
//                       <button onClick={(e) => shareToPlatform(e, 'facebook')} className="px-4 py-2 text-[11px] font-semibold text-gray-700 hover:text-black hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50">
//                         <Facebook size={14} className="text-[#1877F2]" /> Facebook
//                       </button>
//                       <button onClick={copyLink} className="px-4 py-2.5 text-[11px] font-bold text-black hover:bg-gray-100 flex items-center gap-3 bg-gray-50/50">
//                         <Link2 size={14} /> COPY LINK
//                       </button>
//                     </div>
//                   )}

//                   {/* Tooltip */}
//                   {isCopied && !showShareMenu && (
//                     <span className="absolute right-12 top-1.5 bg-[#111] text-white text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-sm shadow-xl animate-fade-in-left whitespace-nowrap z-50">
//                       Link Copied
//                     </span>
//                   )}
//                 </div>

//                 <button 
//                   onClick={handleWishlistToggle}
//                   className="p-2.5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-all duration-200 active:scale-90 flex items-center justify-center"
//                 >
//                   <Heart size={16} color={isWishlisted ? "#ef4444" : "#333"} fill={isWishlisted ? "#ef4444" : "none"} strokeWidth={2.5} />
//                 </button>
//               </div>

//               <img src={galleryImages[activeImgIdx]} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ease-in-out group-hover:scale-105" alt="main" style={{ maxHeight: '380px', marginTop: '-10px' }} />
//             </div>
            
//             <div className="flex flex-wrap gap-4 mt-6 justify-center max-w-[480px] mx-auto">
//               {galleryImages.map((img, i) => (
//                 <button 
//                   key={i} 
//                   onClick={() => setActiveImgIdx(i)} 
//                   className={`w-[80px] h-[110px] md:w-[100px] h-[130px] rounded-[1.5rem] bg-[#f7f7f7] p-3 border-[2px] cursor-pointer transition-all duration-300 ${
//                     activeImgIdx === i ? 'border-black shadow-sm' : 'border-transparent hover:border-gray-200'
//                   }`}
//                 >
//                   <img src={img} className="w-full h-full object-contain mix-blend-multiply" alt="thumb" />
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="w-full lg:w-[55%] flex flex-col pt-4 lg:pl-10">
//             <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 leading-tight">{fullProduct?.name}</h1>
            
//             <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-6">
//               <div className="flex items-baseline gap-3">
//                 <p className="text-3xl font-light  text-black">₹{mainPrice.toLocaleString()}</p>
//                 {showStrikethrough && <p className="text-lg text-gray-400 line-through">₹{originalPrice.toLocaleString()}</p>}
//               </div>
//               <div className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${isAvailable || isComingSoon ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                 {displayStock}
//               </div>
//             </div>

//             <EarnCoinsBadge amount={mainPrice} className="mb-6" />

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
//                         <div className="text-gray-800 opacity-70 group-hover:scale-110 transition-transform">
//                           {getIcon(h.iconName, h.title)}
//                         </div>
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

//         {/* ⚡ VIDEO SECTION */}
//      {(fullProduct?.promotionalVideo?.videoUrl || fullProduct?.promotionalVideo?.url) && (
//           <section id="video" className="max-w-[1480px] mx-auto px-6 md:px-12 mb-20">
//             <div className="w-full aspect-video bg-black rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative pointer-events-none">
//               {(() => {
//                 const videoUrl = fullProduct.promotionalVideo.videoUrl || fullProduct.promotionalVideo.url;
//                 const ytId = getYouTubeId(videoUrl);
                
//                 if (ytId) {
//                   return (
//                     <iframe
//                       className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
//                       src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
//                       title="Promotional Video"
//                       frameBorder="0"
//                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                       allowFullScreen
//                     ></iframe>
//                   );
//                 } else {
//                   return (
//                     <video 
//                       className="absolute top-0 left-0 w-full h-full object-cover" 
//                       autoPlay 
//                       muted 
//                       loop 
//                       playsInline 
//                       poster={fullProduct.promotionalVideo?.thumbnailUrl || ''}
//                     >
//                       <source src={videoUrl} />
//                     </video>
//                   );
//                 }
//               })()}
//             </div>
//           </section>
//         )}

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
            
//             <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-6 leading-tight capitalize">
//               {fullProduct?.brand ? `${fullProduct.brand} Signature .` : "Premium Signature ."}
//             </h2>            
//             <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500 mb-16">{fullProduct?.reviewsCount || "843"} Verified Audiophiles &nbsp;•&nbsp; 4.9 Rating</p>
            
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 pb-12">
//               {/* ⚡ REVIEWS SECTION IMAGES FIXED: object-contain aur p-6 */}
// {galleryImages.slice(0, 3).map((img, i) => (
//   <div 
//     key={i} 
//     className={`aspect-square w-full rounded-[2rem] bg-gray-50 overflow-hidden shadow-sm border border-gray-100 group transition-transform duration-500 flex items-center justify-center p-6 ${
//       i === 1 ? 'md:translate-y-16' : '' 
//     }`}
//   >
//     <img 
//       src={img} 
//       className="w-full h-full object-contain mix-blend-multiply opacity-90 transition-opacity group-hover:opacity-100" 
//       alt="review" 
//     />
//   </div>
// ))}
//             </div>
//           </div>
//         </section>
//       </div>

//       <div className="fixed bottom-0 left-0 w-full z-[200] bg-white flex flex-col md:flex-row shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        
//         {/* MOBILE ONLY: Scrollable Tabs */}
//         <div className="w-full bg-[#f8f8f8] border-t border-gray-200 px-4 md:hidden flex justify-start gap-8 overflow-x-auto scrollbar-hide">
//           {[
//             { id: 'sidebar-features', label: 'Features' },
//             { id: 'tech-specs-section', label: 'Tech Specs' },
//             { id: 'reviews-section', label: 'Reviews' },
//             { id: 'curated-section', label: 'Compare' }
//           ].map((tab) => (
//             <button 
//               key={tab.id}
//               onClick={() => { setActiveBottomTab(tab.id); scrollToSection(tab.id); }} 
//               className={`pt-3 pb-2.5 text-[11px] whitespace-nowrap cursor-pointer transition-colors duration-300 ${
//                 activeBottomTab === tab.id ? 'text-black font-bold' : 'text-gray-500 font-medium hover:text-black'
//               }`}
//             >
//               <div className="relative inline-flex flex-col items-center">
//                 <span>{tab.label}</span>
//                 <span className={`absolute -bottom-1 h-[2px] bg-black transition-all duration-300 ${
//                   activeBottomTab === tab.id ? 'w-full' : 'w-0'
//                 }`}></span>
//               </div>
//             </button>
//           ))}
//         </div>

//         {/* DESKTOP SINGLE ROW / MOBILE BOTTOM ROW */}
//         <div className="w-full h-[65px] md:h-[80px] flex items-center justify-between px-4 md:px-12 bg-white border-t border-gray-100 md:border-t-0">
          
//           <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => scrollToSection('product-hero')}>
//             <img src={galleryImages[0]} className="w-10 h-10 object-contain mix-blend-multiply hidden sm:block" alt="prod"/>
//             <div className="flex flex-col justify-center">
//               <span className="font-bold text-[12px] md:text-[14px] text-black leading-none mb-1 max-w-[150px] md:max-w-[200px] truncate">{fullProduct?.name || 'Product'}</span>
//               <span className="text-[11px] font-bold text-[#C8A253]">₹{mainPrice.toLocaleString()}</span>
//             </div>
//           </div>

//           {/* Center: DESKTOP ONLY Tabs */}
//           <div className="hidden md:flex items-center justify-center gap-8 lg:gap-12 h-full">
//             {[
//               { id: 'sidebar-features', label: 'Features' },
//               { id: 'tech-specs-section', label: 'Tech Specs' },
//               { id: 'reviews-section', label: 'Reviews' },
//               { id: 'curated-section', label: 'Compare' }
//             ].map((tab) => (
//               <button 
//                 key={tab.id}
//                 onClick={() => { setActiveBottomTab(tab.id); scrollToSection(tab.id); }} 
//                 className={`h-full flex items-center text-[13px] whitespace-nowrap cursor-pointer transition-colors duration-300 ${
//                   activeBottomTab === tab.id ? 'text-black font-bold' : 'text-gray-500 font-medium hover:text-black'
//                 }`}
//               >
//                 <div className="relative inline-flex flex-col items-center">
//                   <span>{tab.label}</span>
//                   <span className={`absolute -bottom-1 h-[2px] bg-black transition-all duration-300 ${
//                     activeBottomTab === tab.id ? 'w-full' : 'w-0'
//                   }`}></span>
//                 </div>
//               </button>
//             ))}
//           </div>
          
//           <button 
//             onClick={handleAddToCart} 
//             disabled={!isAvailable || isComingSoon} 
//             className={`px-6 py-2.5 md:px-8 md:py-3.5 text-[10px] md:text-[11px] font-bold uppercase tracking-widest rounded-full shadow-lg shrink-0 transition-all whitespace-nowrap ${
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
import { 
  X, Star, ShoppingBag, CheckCircle2, Battery, Droplets, Wifi, Bluetooth, Zap, 
  Shield, Tv, Volume, Smartphone, Mic, Plus, Tag, Music, Sun, Settings, 
  AudioLines, Speaker, Headphones, Volume2, Home, Award,
  Briefcase, BatteryCharging, Crown, EarOff, PhoneCall, Sliders, Feather,
  Heart, Share2, MessageCircle, Facebook, Twitter, Send, Mail, Link2
} from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { useAuth } from '../../context/AuthContext';
import EarnCoinsBadge from '../../components/rewards/EarnCoinsBadge';

const DEFAULT_IMG = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600";

// 1. Icons Mapping
const iconMap = { 
  Battery: <Battery size={24} />,
  Droplets: <Droplets size={24} />,
  Control: <Sliders size={24} />,
  Comfort: <Feather size={24} />,
  Wifi: <Wifi size={24} />,
  Bluetooth: <Bluetooth size={24} />,
  Zap: <Zap size={24} />,
  Shield: <Shield size={24} />,
  Tv: <Tv size={24} />,
  Volume: <Volume size={24} />,
  Smartphone: <Smartphone size={24} />,
  Mic: <Mic size={24} />,
  Music: <Music size={24} />,
  Sun: <Sun size={24} />,
  Settings: <Settings size={24} />,
  Setting: <Settings size={24} />, 
  Audio: <AudioLines size={24} />,
  AudioLines: <AudioLines size={24} />,
  Speaker: <Speaker size={24} />,
  Headphones: <Headphones size={24} />,
  Earbuds: <Headphones size={24} />, 
  Vol: <Volume2 size={24} />,
  Star: <Star size={24} />,
  Home: <Home size={24} />,
  Award: <Award size={24} />,
  ShoppingBag: <ShoppingBag size={24} />,
  Travel: <Briefcase size={24} />,
  Bass: <Speaker size={24} />,
  Charging: <BatteryCharging size={24} />,
  Premium: <Crown size={24} />
};

// 2. SMART AUTO-DETECT FUNCTION
const getIcon = (iconName, title = '') => {
  if (iconName && String(iconName).trim() !== '') {
    const searchKey = String(iconName).trim().toLowerCase();
    const match = Object.keys(iconMap).find(k => k.toLowerCase() === searchKey);
    if (match) return iconMap[match];
  }

  const t = String(title).toLowerCase();
  if (t.includes('bass') || t.includes('sound') || t.includes('audio') || t.includes('acoustic')) return iconMap['Speaker'];
  if (t.includes('charg') || t.includes('power') || t.includes('battery')) return iconMap['Zap'];
  if (t.includes('design') || t.includes('construction') || t.includes('aluminum') || t.includes('premium')) return iconMap['Award'];
  if (t.includes('strap') || t.includes('carry') || t.includes('portable') || t.includes('travel')) return iconMap['Travel'];
  if (t.includes('bluetooth') || t.includes('wireless') || t.includes('stream')) return iconMap['Bluetooth'];
  if (t.includes('water') || t.includes('splash') || t.includes('ipx')) return iconMap['Droplets'];
  if (t.includes('control') || t.includes('smart') || t.includes('interface')) return iconMap['Settings'];
  if (t.includes('case') || t.includes('protect')) return iconMap['Shield'];

  return <Tag size={24} />;
};

// 3. YouTube ID Extractor
const getYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export default function QuickViewModal({ product: initialProduct, onClose }) {
  const navigate = useNavigate();
  const { user } = useAuth();
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

  // Nayi States for Share/Wishlist
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

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

  // RECENTLY VIEWED LOGIC ADDED HERE
  useEffect(() => {
    if (fullProduct && fullProduct._id) {
      try {
        let viewedItems = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
        
        // Remove duplicate if it already exists
        viewedItems = viewedItems.filter((item) => item._id !== fullProduct._id);
        
        // Add current product to the top (saving minimal data to save storage space)
        viewedItems.unshift({
          _id: fullProduct._id,
          name: fullProduct.name,
          price: fullProduct.price,
          image: fullProduct.images?.[0]?.url || fullProduct.image || DEFAULT_IMG
        });
        
        // Keep only the last 10 products
        if (viewedItems.length > 10) {
          viewedItems.pop(); 
        }
        
        localStorage.setItem('recentlyViewed', JSON.stringify(viewedItems));
      } catch (error) {
        console.error("Error saving recently viewed:", error);
      }
    }
  }, [fullProduct]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Wishlist Logic
  const handleWishlistToggle = async (e) => {
    e.stopPropagation(); 
    if (!user) {
      navigate('/login');
      return;
    }
    setIsWishlisted(!isWishlisted);
    try {
      await axiosInstance.post('/wishlist/toggle', { productId: fullProduct._id });
    } catch (error) {
      console.error('Wishlist error', error);
      setIsWishlisted(!isWishlisted);
    }
  };

  // Share Logic (Cross Browser)
  const handleShareClick = async (e) => {
    e.stopPropagation(); 
    if (!user) {
      alert("Please login to share this exclusive product with your network.");
      navigate('/login'); 
      return;
    }

    const productUrl = `${window.location.origin}/product/${fullProduct._id}`;
    const shareData = {
      title: `Truee Luxury - ${fullProduct.name}`,
      text: `Check out this premium ${fullProduct.name} on Truee Luxury!`,
      url: productUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setShowShareMenu(!showShareMenu);
        }
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  // Custom Share Fallback Links
  const shareToPlatform = (e, platform) => {
    e.stopPropagation();
    const productUrl = `${window.location.origin}/product/${fullProduct._id}`;
    const text = `Check out this premium ${fullProduct.name} on Truee Luxury!`;

    let url = '';
    switch(platform) {
      case 'whatsapp': url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + '\n\n' + productUrl)}`; break;
      case 'facebook': url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`; break;
      case 'twitter': url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(text)}`; break;
      case 'telegram': url = `https://t.me/share/url?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(text)}`; break;
      default: return;
    }
    window.open(url, '_blank', 'width=600,height=500');
    setShowShareMenu(false);
  };

  const copyLink = (e) => {
    e.stopPropagation();
    const productUrl = `${window.location.origin}/product/${fullProduct._id}`;
    navigator.clipboard.writeText(productUrl);
    setIsCopied(true);
    setShowShareMenu(false);
    setTimeout(() => setIsCopied(false), 2500);
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

  // ⚡ Discount calculation for the new pricing layout
  const discountPercentage = showStrikethrough && originalPrice > mainPrice 
    ? Math.round(((originalPrice - mainPrice) / originalPrice) * 100) 
    : 0;

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

        <div className="max-w-[1340px] mx-auto px-6 md:px-12 pt-8 flex flex-col lg:flex-row gap-8 lg:gap-12 mb-20 items-start relative">
          
          <div className="w-full lg:w-[45%] lg:sticky lg:top-24 self-start">
            
            {/* NEW IMAGE CONTAINER WITH SHARE/WISHLIST */}
            <div 
              className="bg-[#f7f7f7] w-full max-w-[480px] aspect-square rounded-[2rem] flex items-center justify-center p-6 relative overflow-hidden group mx-auto cursor-pointer"
              onMouseLeave={() => setShowShareMenu(false)}
            >
              {/* Overlay Action Buttons */}
              <div className="absolute top-4 right-4 z-40 flex flex-col gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300">
                <div className="relative flex justify-center">
                  <button 
                    onClick={handleShareClick}
                    className="p-2.5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-all duration-200 active:scale-90 flex items-center justify-center"
                    title="Share Product"
                  >
                    <Share2 size={16} color="#333" strokeWidth={2.5} />
                  </button>

                  {/* Custom Dropdown Menu */}
                  {showShareMenu && (
                    <div 
                      className="absolute top-0 right-12 bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden animate-fade-in-left border border-gray-100 w-40 z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-3 py-2 border-b border-gray-50 bg-gray-50/50">
                         <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Share via</span>
                      </div>
                      <button onClick={(e) => shareToPlatform(e, 'whatsapp')} className="px-4 py-2 text-[11px] font-semibold text-gray-700 hover:text-black hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50">
                        <MessageCircle size={14} className="text-[#25D366]" /> WhatsApp
                      </button>
                      <button onClick={(e) => shareToPlatform(e, 'facebook')} className="px-4 py-2 text-[11px] font-semibold text-gray-700 hover:text-black hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50">
                        <Facebook size={14} className="text-[#1877F2]" /> Facebook
                      </button>
                      <button onClick={copyLink} className="px-4 py-2.5 text-[11px] font-bold text-black hover:bg-gray-100 flex items-center gap-3 bg-gray-50/50">
                        <Link2 size={14} /> COPY LINK
                      </button>
                    </div>
                  )}

                  {/* Tooltip */}
                  {isCopied && !showShareMenu && (
                    <span className="absolute right-12 top-1.5 bg-[#111] text-white text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-sm shadow-xl animate-fade-in-left whitespace-nowrap z-50">
                      Link Copied
                    </span>
                  )}
                </div>

                <button 
                  onClick={handleWishlistToggle}
                  className="p-2.5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-all duration-200 active:scale-90 flex items-center justify-center"
                >
                  <Heart size={16} color={isWishlisted ? "#ef4444" : "#333"} fill={isWishlisted ? "#ef4444" : "none"} strokeWidth={2.5} />
                </button>
              </div>

              <img src={galleryImages[activeImgIdx]} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ease-in-out group-hover:scale-105" alt="main" style={{ maxHeight: '380px', marginTop: '-10px' }} />
            </div>
            
            <div className="flex flex-wrap gap-4 mt-6 justify-center max-w-[480px] mx-auto">
              {galleryImages.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImgIdx(i)} 
                  className={`w-[80px] h-[110px] md:w-[100px] h-[130px] rounded-[1.5rem] bg-[#f7f7f7] p-3 border-[2px] cursor-pointer transition-all duration-300 ${
                    activeImgIdx === i ? 'border-black shadow-sm' : 'border-transparent hover:border-gray-200'
                  }`}
                >
                  <img src={img} className="w-full h-full object-contain mix-blend-multiply" alt="thumb" />
                </button>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[55%] flex flex-col pt-4 lg:pl-10">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 leading-tight">{fullProduct?.name}</h1>
            
            {/* ⚡ YAHAN UPDATE KIYA HAI - BOLD PRICING */}
            <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-6">
              <div className="flex items-center gap-3">
                {/* 1. Discount Percentage (Green & Bold, Image Jaisa) */}
                {discountPercentage > 0 && (
                  <span className="text-[28px] font-black text-[#0f763e] flex items-center leading-none">
                    <span className="text-xl mr-0.5">↓</span>
                    {discountPercentage}%
                  </span>
                )}

                {/* 2. Original Price (Grey & Line-through) */}
                {showStrikethrough && (
                  <span className="text-[26px] text-gray-500 line-through decoration-1 opacity-80 leading-none mt-1">
                    ₹{originalPrice.toLocaleString()}
                  </span>
                )}

                {/* 3. Final Price (Black & Extra Bold) */}
                <span className="text-4xl font-extrabold text-[#222222] leading-none ml-1">
                  ₹{mainPrice.toLocaleString()}
                </span>
              </div>
              <div className={`ml-auto text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${isAvailable || isComingSoon ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {displayStock}
              </div>
            </div>
            {/* ⚡ UPDATE END */}

            <EarnCoinsBadge amount={mainPrice} className="mb-6" />

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
                        <div className="text-gray-800 opacity-70 group-hover:scale-110 transition-transform">
                          {getIcon(h.iconName, h.title)}
                        </div>
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

        {/* VIDEO SECTION */}
     {(fullProduct?.promotionalVideo?.videoUrl || fullProduct?.promotionalVideo?.url) && (
          <section id="video" className="max-w-[1480px] mx-auto px-6 md:px-12 mb-20">
            <div className="w-full aspect-video bg-black rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative pointer-events-none">
              {(() => {
                const videoUrl = fullProduct.promotionalVideo.videoUrl || fullProduct.promotionalVideo.url;
                const ytId = getYouTubeId(videoUrl);
                
                if (ytId) {
                  return (
                    <iframe
                      className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
                      src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                      title="Promotional Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  );
                } else {
                  return (
                    <video 
                      className="absolute top-0 left-0 w-full h-full object-cover" 
                      autoPlay 
                      muted 
                      loop 
                      playsInline 
                      poster={fullProduct.promotionalVideo?.thumbnailUrl || ''}
                    >
                      <source src={videoUrl} />
                    </video>
                  );
                }
              })()}
            </div>
          </section>
        )}

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
            
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter mb-6 leading-tight capitalize">
              {fullProduct?.brand ? `${fullProduct.brand} Signature .` : "Premium Signature ."}
            </h2>            
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500 mb-16">{fullProduct?.reviewsCount || "843"} Verified Audiophiles &nbsp;•&nbsp; 4.9 Rating</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 pb-12">
              {/* REVIEWS SECTION IMAGES FIXED: object-contain aur p-6 */}
{galleryImages.slice(0, 3).map((img, i) => (
  <div 
    key={i} 
    className={`aspect-square w-full rounded-[2rem] bg-gray-50 overflow-hidden shadow-sm border border-gray-100 group transition-transform duration-500 flex items-center justify-center p-6 ${
      i === 1 ? 'md:translate-y-16' : '' 
    }`}
  >
    <img 
      src={img} 
      className="w-full h-full object-contain mix-blend-multiply opacity-90 transition-opacity group-hover:opacity-100" 
      alt="review" 
    />
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
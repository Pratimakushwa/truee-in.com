

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate, Link } from 'react-router-dom';
import { 
  X, Star, ShoppingBag, CheckCircle2, Battery, Droplets, Wifi, Bluetooth, Zap, 
  Shield, Tv, Volume, Smartphone, Mic, Plus, Tag, Music, Sun, Settings, 
  AudioLines, Speaker, Headphones, Volume2, Home, Award,
  Briefcase, BatteryCharging, Crown, EarOff, PhoneCall, Sliders, Feather,
  Heart, Share2, MessageCircle, Facebook, Twitter, Send, Mail, Link2,
  ChevronLeft, ChevronRight, ChevronUp, ChevronDown, 
  Film, Disc, Radio, Monitor, Tv2, Clapperboard, Projector, Cpu, HardDrive, 
  Usb, Gauge, Maximize2, Cable, Activity
} from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { useAuth } from '../../context/AuthContext';
import EarnCoinsBadge from '../../components/rewards/EarnCoinsBadge';

const DEFAULT_IMG = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600";

const iconMap = { 
  Battery: <Battery size={20} />,
  Droplets: <Droplets size={20} />,
  Control: <Sliders size={20} />,
  Comfort: <Feather size={20} />,
  Wifi: <Wifi size={20} />,
  Bluetooth: <Bluetooth size={20} />,
  Zap: <Zap size={20} />,
  Shield: <Shield size={20} />,
  Tv: <Tv size={20} />,
  Volume: <Volume size={20} />,
  Smartphone: <Smartphone size={20} />,
  Mic: <Mic size={20} />,
  Music: <Music size={20} />,
  Sun: <Sun size={20} />,
  Settings: <Settings size={20} />,
  Setting: <Settings size={20} />, 
  Audio: <AudioLines size={20} />,
  AudioLines: <AudioLines size={20} />,
  Speaker: <Speaker size={20} />,
  Headphones: <Headphones size={20} />,
  Earbuds: <Headphones size={20} />, 
  Vol: <Volume2 size={20} />,
  Star: <Star size={20} />,
  Home: <Home size={20} />,
  Award: <Award size={20} />,
  ShoppingBag: <ShoppingBag size={20} />,
  Travel: <Briefcase size={20} />,
  Bass: <Speaker size={20} />,
  Charging: <BatteryCharging size={20} />,
  Premium: <Crown size={20} />,
  Film: <Film size={20} />,
  Disc: <Disc size={20} />,
  Radio: <Radio size={20} />,
  Monitor: <Monitor size={20} />,
  Tv2: <Tv2 size={20} />,
  Clapperboard: <Clapperboard size={20} />,
  Projector: <Projector size={20} />,
  Cpu: <Cpu size={20} />,
  HardDrive: <HardDrive size={20} />,
  Usb: <Usb size={20} />,
  Gauge: <Gauge size={20} />,
  Maximize2: <Maximize2 size={20} />,
  Cable: <Cable size={20} />,
  Activity: <Activity size={20} />,

  // Custom String Mapping Support (Valid icons mapped safely)
  movie: <Film size={20} />,
  film: <Film size={20} />,
  laser: <Zap size={20} />,
  theater: <Tv size={20} />,
  'theater-comedy': <Tv size={20} />,
  hdr: <Shield size={20} />,
  'hdr-strong': <Shield size={20} />,
  'volume-up': <Volume2 size={20} />,
  speaker: <Speaker size={20} />,
  tv: <Tv size={20} />,
  'live-tv': <Monitor size={20} />,
  brightness: <Sun size={20} />,
  'brightness-7': <Sun size={20} />,
  wifi6: <Wifi size={20} />,                 // Replaced with standard Wifi
  'bluetooth-5': <Bluetooth size={20} />,     // Replaced with standard Bluetooth
  resolution: <Monitor size={20} />,
  projector: <Projector size={20} />,
  specs: <Sliders size={20} />,
  hdmi: <Cable size={20} />                   // Replaced HdmiPort with Cable
};
const getIcon = (iconName, title = '') => {
  if (iconName && String(iconName).trim() !== '') {
    const searchKey = String(iconName).trim().toLowerCase();
    const match = Object.keys(iconMap).find(k => k.toLowerCase() === searchKey);
    if (match) return iconMap[match];
  }

  const t = String(title).toLowerCase();
  if (t.includes('bass') || t.includes('sound') || t.includes('audio') || t.includes('acoustic') || t.includes('driver')) return iconMap['Speaker'];
  if (t.includes('charg') || t.includes('power') || t.includes('battery')) return iconMap['Zap'];
  if (t.includes('design') || t.includes('construction') || t.includes('aluminum') || t.includes('premium') || t.includes('build')) return iconMap['Award'];
  if (t.includes('strap') || t.includes('carry') || t.includes('portable') || t.includes('travel') || t.includes('dimension') || t.includes('weight')) return iconMap['Travel'];
  if (t.includes('bluetooth') || t.includes('wireless') || t.includes('stream') || t.includes('connect')) return iconMap['Bluetooth'];
  if (t.includes('water') || t.includes('splash') || t.includes('ipx') || t.includes('resist') || t.includes('dust')) return iconMap['Droplets'];
  if (t.includes('control') || t.includes('smart') || t.includes('interface') || t.includes('button')) return iconMap['Settings'];
  if (t.includes('case') || t.includes('protect')) return iconMap['Shield'];
  if (t.includes('mic') || t.includes('call') || t.includes('voice')) return iconMap['Mic'];

  return <Tag size={20} />;
};

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
  const thumbScrollRef = useRef(null);
  const [selectedBoughtTogether, setSelectedBoughtTogether] = useState([]);
  const [activeBottomTab, setActiveBottomTab] = useState('');

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

  useEffect(() => {
    if (fullProduct && fullProduct._id) {
      try {
        let viewedItems = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
        viewedItems = viewedItems.filter((item) => item._id !== fullProduct._id);
        viewedItems.unshift({
          _id: fullProduct._id,
          name: fullProduct.name,
          price: fullProduct.price,
          image: fullProduct.images?.[0]?.url || fullProduct.image || DEFAULT_IMG,
          variants: fullProduct.variants || [],
          colors: fullProduct.colors || [],
          images: fullProduct.images || []
        });
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

  const scrollThumbs = (direction) => {
    if (thumbScrollRef.current) {
      const scrollAmount = 120;
      if (direction === 'up') thumbScrollRef.current.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
      if (direction === 'down') thumbScrollRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
      if (direction === 'left') thumbScrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      if (direction === 'right') thumbScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

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

  const discountPercentage = showStrikethrough && originalPrice > mainPrice 
    ? Math.round(((originalPrice - mainPrice) / originalPrice) * 100) 
    : 0;

  return createPortal(
    <div 
      className="fixed inset-0 z-[999999] bg-white overflow-y-auto scroll-smooth font-sans text-[#1a1a1a] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      ref={modalRef} 
      onScroll={(e) => setExpand(e.target.scrollTop > 100)}
    >
      <div className="w-full pb-[160px]">
        <nav id="product-hero" className={`sticky top-0 z-[150] w-full bg-white transition-all duration-300 border-b border-gray-50 ${expand ? 'py-2' : 'py-3'}`}>
          <div className="max-w-[1340px] mx-auto px-4 md:px-12 flex justify-between items-center">
          <Link 
            to="/" 
            onClick={() => {
              onClose();
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' }); 
            }} 
            className="flex flex-col items-center group cursor-pointer"
          >
             <img src="/Truee_Luxury_Logo.png" alt="Truee" className="h-7 md:h-10 w-auto object-contain brightness-0" />    
             <span className="text-[7px] md:text-[8px] font-bold tracking-[0.4em] uppercase mt-0.5 text-black opacity-80 group-hover:opacity-100 transition-opacity">TRUEE</span>
          </Link>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-all cursor-pointer bg-white shadow-sm border border-gray-100">
              <X size={20} className="md:w-6 md:h-6" color="black" />
            </button>
          </div>
        </nav>

        <div className="max-w-[1340px] mx-auto px-4 md:px-12 pt-6 md:pt-8 flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16 items-start relative">
          
          <div className="w-full lg:w-[45%] lg:sticky lg:top-24 self-start">
            
            <div className="flex flex-col-reverse md:flex-row gap-4 w-full justify-center">
              
              <div className="relative group/thumbs shrink-0 w-full md:w-auto flex items-center justify-center">
                
                {galleryImages.length > 3 && (
                  <button 
                    onClick={() => scrollThumbs('up')} 
                    className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.15)] rounded-full w-8 h-8 hidden md:flex items-center justify-center text-black border border-gray-100 hover:scale-105 transition-all opacity-0 group-hover/thumbs:opacity-100"
                  >
                    <ChevronUp size={20} strokeWidth={2.5} />
                  </button>
                )}

                {galleryImages.length > 3 && (
                  <button 
                    onClick={() => scrollThumbs('left')} 
                    className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.15)] rounded-full w-8 h-8 flex md:hidden items-center justify-center text-black border border-gray-100 hover:scale-105 transition-all"
                  >
                    <ChevronLeft size={20} strokeWidth={2.5} />
                  </button>
                )}

                <div 
                  ref={thumbScrollRef} 
                  className="flex md:flex-col overflow-x-auto md:overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-3 md:gap-4 snap-x md:snap-y snap-mandatory md:max-h-[400px] w-full"
                >
                  {galleryImages.map((img, i) => (
                    <button 
                      key={i} 
                      onClick={() => setActiveImgIdx(i)} 
                      className={`shrink-0 snap-center w-[65px] h-[65px] md:w-[75px] md:h-[75px] rounded-xl bg-[#f7f7f7] p-1.5 border-[2px] cursor-pointer transition-all duration-300 ${
                        activeImgIdx === i ? 'border-black shadow-sm' : 'border-transparent hover:border-gray-200'
                      }`}
                    >
                      <img src={img} className="w-full h-full object-contain mix-blend-multiply rounded-lg" alt={`thumb-${i}`} />
                    </button>
                  ))}
                </div>

                {galleryImages.length > 3 && (
                  <button 
                    onClick={() => scrollThumbs('down')} 
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.15)] rounded-full w-8 h-8 hidden md:flex items-center justify-center text-black border border-gray-100 hover:scale-105 transition-all opacity-0 group-hover/thumbs:opacity-100"
                  >
                    <ChevronDown size={20} strokeWidth={2.5} />
                  </button>
                )}

                {galleryImages.length > 3 && (
                  <button 
                    onClick={() => scrollThumbs('right')} 
                    className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.15)] rounded-full w-8 h-8 flex md:hidden items-center justify-center text-black border border-gray-100 hover:scale-105 transition-all"
                  >
                    <ChevronRight size={20} strokeWidth={2.5} />
                  </button>
                )}
              </div>

              <div 
                className="bg-[#f7f7f7] w-full flex-1 max-w-[420px] aspect-square md:aspect-auto md:h-[420px] mx-auto rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center p-6 relative overflow-hidden group cursor-pointer"
                onMouseLeave={() => setShowShareMenu(false)}
              >
                <div className="absolute top-3 right-3 md:top-4 md:right-4 z-40 flex flex-col gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300">
                  <div className="relative flex justify-center">
                    <button 
                      onClick={handleShareClick}
                      className="p-2 md:p-2.5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-all duration-200 active:scale-90 flex items-center justify-center"
                      title="Share Product"
                    >
                      <Share2 size={16} color="#333" strokeWidth={2.5} />
                    </button>

                    {showShareMenu && (
                      <div 
                        className="absolute top-0 right-10 md:right-12 bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden animate-fade-in-left border border-gray-100 w-40 z-50"
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

                    {isCopied && !showShareMenu && (
                      <span className="absolute right-10 md:right-12 top-1.5 bg-[#111] text-white text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-sm shadow-xl animate-fade-in-left whitespace-nowrap z-50">
                        Link Copied
                      </span>
                    )}
                  </div>

                  <button 
                    onClick={handleWishlistToggle}
                    className="p-2 md:p-2.5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-all duration-200 active:scale-90 flex items-center justify-center"
                  >
                    <Heart size={16} color={isWishlisted ? "#ef4444" : "#333"} fill={isWishlisted ? "#ef4444" : "none"} strokeWidth={2.5} />
                  </button>
                </div>

                <img 
                  src={galleryImages[activeImgIdx]} 
                  className="w-[85%] h-[85%] object-contain mix-blend-multiply transition-transform duration-700 ease-in-out group-hover:scale-105" 
                  alt="main" 
                />
              </div>
            </div>
            
          </div>

          <div className="w-full lg:w-[55%] flex flex-col pt-2 lg:pt-4 lg:pl-10">
            <h1 className="text-2xl md:text-3xl font-medium tracking-tight mb-4 leading-tight">{fullProduct?.name}</h1>
            
            <div className="flex items-center gap-3 md:gap-4 mb-6 border-b border-gray-100 pb-6 flex-wrap">
              <div className="flex items-center gap-2 md:gap-3">
                {discountPercentage > 0 && (
                  <span className="text-2xl md:text-[20px] font-black text-[#0f763e] flex items-center leading-none">
                    <span className="text-lg md:text-xl mr-0.5">↓</span>
                    {discountPercentage}%
                  </span>
                )}

                {showStrikethrough && (
                  <span className="text-2xl md:text-[16px] text-gray-500 line-through decoration-1 opacity-80 leading-none mt-1">
                    ₹{originalPrice.toLocaleString()}
                  </span>
                )}

                <span className="text-2xl md:text-2xl font-bold text-[#222222] leading-none ml-1">
                  ₹{mainPrice.toLocaleString()}
                </span>
              </div>
              <div className={`ml-auto text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${isAvailable || isComingSoon ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {displayStock}
              </div>
            </div>

            <EarnCoinsBadge amount={mainPrice} className="mb-6" />

            {rawDesc && (
              <div className="mb-8">
                <p className="text-[12px] md:text-[13.5px] text-gray-700 leading-relaxed transition-all duration-300">
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
                <p className="text-[10px] md:text-[11px] font-black uppercase tracking-widest mb-4 text-gray-400">Select Variant</p>
                <div className="flex gap-2 flex-wrap">
                  {fullProduct.variants.map((v, i) => (
                    <button 
                      key={i} 
                      onClick={() => { setSelectedVariantIdx(i); setActiveImgIdx(0); }} 
                      className={`px-5 py-2.5 md:px-6 md:py-3 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-widest border transition-all ${
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
              className={`w-full py-4 md:py-5 rounded-full font-bold text-[10px] tracking-[0.3em] uppercase mb-8 md:mb-10 transition-all shadow-lg ${
                isComingSoon
                  ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed shadow-none'
                  : isAvailable 
                    ? 'bg-black text-white hover:bg-[#333] active:scale-95 cursor-pointer' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isComingSoon ? 'Coming Soon' : isAvailable ? 'Add to Cart' : 'Out of Stock'}
            </button>
            
            <div id="sidebar-features" className="bg-[#f2f2f2] rounded-[2rem] md:rounded-[2.5rem] p-1 md:p-1.5 flex flex-col min-h-[250px] md:min-h-[300px] border border-gray-100">
              <div className="flex p-1">
                <button onClick={() => setActiveTab('Features')} className={`flex-1 py-3 md:py-4 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-full transition-all cursor-pointer ${activeTab === 'Features' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-black'}`}>Features</button>
                <button onClick={() => setActiveTab('Included')} className={`flex-1 py-3 md:py-4 text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-full transition-all cursor-pointer ${activeTab === 'Included' ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-black'}`}>Included</button>
              </div>
              <div className="px-4 md:px-6 py-6 md:py-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] h-full">
                {activeTab === 'Features' ? (
                  <div className="grid grid-cols-2 gap-y-6 md:gap-y-8 gap-x-4 md:gap-x-6">
                    {(fullProduct?.highlights || []).map((h, i) => (
                      <div key={i} className="flex flex-col items-center text-center gap-2 group">
                        <div className="text-gray-800 opacity-70 group-hover:scale-110 transition-transform">
                          {getIcon(h.iconName, h.title)}
                        </div>
                        <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-tight text-gray-800 leading-tight">{h.title}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-3 md:space-y-4">
                    {(fullProduct?.inTheBox || ['Authentic Speaker', 'Premium Cable', 'Quick Start Guide']).map((item, i) => (
                      <li key={i} className="flex items-center gap-3 md:gap-4 text-[10px] md:text-[11px] font-bold text-gray-700 uppercase tracking-tighter">
                        <CheckCircle2 size={16} className="text-black shrink-0"/> 
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {(fullProduct?.promotionalVideo?.videoUrl || fullProduct?.promotionalVideo?.url) && (
          <section id="video" className="max-w-[1480px] mx-auto px-4 md:px-12 mb-16 md:mb-20">
            <div className="w-full aspect-video bg-black rounded-[1.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative pointer-events-none">
              {(() => {
                const videoUrl = fullProduct.promotionalVideo.videoUrl || fullProduct.promotionalVideo.url;
                const ytId = getYouTubeId(videoUrl);
                
                if (ytId) {
                  return (
                    <iframe
                      className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
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

{/* ⚡⚡ FINAL LUXURY MARSHALL PATTERN (SINGLE IMAGE 100% FULL WIDTH) ⚡⚡ */}
{fullProduct?.lifestyleImages?.length > 0 && (
  <section 
    className="w-full bg-[#FAFAFA] text-black py-16 md:py-24 overflow-hidden"
    style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
  >
    <div className="max-w-[1500px] mx-auto flex flex-col gap-24 md:gap-40">
      {fullProduct.lifestyleImages.map((item, i) => {
        
        // 1. Har dusri image Single aayegi
        // 2. Side-by-side mein text left-right change hoga
        const isCenteredSingle = i % 2 !== 0; 
        const isTextRight = i % 4 === 2; 

        if (isCenteredSingle) {
          // 📱 SINGLE LAYOUT (Beech wala design - 100% FULL WIDTH)
          return (
            <div key={i} className="flex flex-col items-center text-center w-full gap-8 md:gap-14">
              {/* Text Hissa */}
              <div className="max-w-4xl flex flex-col items-center space-y-5 px-6">
                {item.title && (
                  <h3 className="text-2xl md:text-[36px] font-black uppercase tracking-wider text-black leading-tight">
                    {item.title}
                  </h3>
                )}
                {item.description && (
                  <p className="text-gray-600 text-base md:text-xl leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                )}
              </div>
              {/* Image Hissa - 100% FULL WIDTH BINA KATE */}
              <div className="w-full px-0 md:px-4"> 
                <img 
                  src={item.image?.url || item.image} 
                  alt={item.title || 'Lifestyle Banner'} 
                  // ⚡ w-full aur h-auto lagaya hai taaki poori chaudaai (width) le aur kate nahi.
                  className="w-full h-auto object-contain md:rounded-2xl" 
                />
              </div>
            </div>
          );
        }

        // 💻 SIDE-BY-SIDE LAYOUT
        return (
          <div key={i} className={`flex flex-col md:flex-row items-center w-full gap-10 md:gap-20 px-6 md:px-16 ${isTextRight ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
            
            {/* Text Block */}
            <div className="w-full md:w-1/2 flex flex-col justify-center text-left space-y-5">
              {item.title && (
                <h3 className="text-2xl md:text-[32px] font-black uppercase tracking-wider text-black leading-tight">
                  {item.title}
                </h3>
              )}
              {item.description && (
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
            
            {/* Image Block */}
            <div className="w-full md:w-1/2">
              <img 
                src={item.image?.url || item.image} 
                alt={item.title || 'Lifestyle Banner'} 
                className="w-full h-auto max-h-[70vh] object-contain rounded-xl" 
              />
            </div>

          </div>
        );
      })}
    </div>
  </section>
)}








       {/* ⚡⚡ TECH SPECS - LUXURY HORIZONTAL CARDS (BUG FIXED) ⚡⚡ */}
        <section id="tech-specs-section" className="py-16 md:py-18 bg-[#FAFAFA] border-y border-gray-100">
          <div className="max-w-[1340px] mx-auto px-6 md:px-2">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
              
              {/* Left Sidebar - Title & Tabs */}
              <div className="w-full lg:w-[30%] shrink-0">
                <div className="mb-10 md:mb-16">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C8A253] block mb-2">
                    Specifications
                  </span>
                  <h2 className="text-2xl md:text-2xl lg:text-[38px] font-bold tracking-tight text-[#111] leading-[1.05]">
                    Technical <br className="hidden lg:block" />
                    <span className="font-serif font-normal text-gray-800">Details</span>
                    <span className="text-[#C8A253]">.</span>
                  </h2>
                </div>
                
                <div className="flex flex-row lg:flex-col gap-4 md:gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden border-b lg:border-b-0 lg:border-l lg:border-gray-200 pb-4 lg:pb-0 lg:pl-8 relative">
                  {fullProduct?.techSpecs?.map((spec, idx) => {
                    const isActive = activeSpecTab === spec.category;
                    return (
                      <button 
                        key={spec.category || idx} 
                        onClick={() => setActiveSpecTab(spec.category)} 
                        className={`pb-3 lg:pb-0 lg:py-2 text-sm md:text-[15px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative whitespace-nowrap text-left cursor-pointer group flex items-center ${
                          isActive ? 'text-[#111]' : 'text-gray-400 hover:text-gray-800'
                        }`}
                      >
                        <span className="relative z-10">{spec.category}</span>
                        
                        {/* Active Line Indicators */}
                        {isActive && (
                          <>
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#111] lg:hidden animate-in slide-in-from-left duration-300" />
                            <div className="absolute top-1/2 -translate-y-1/2 -left-[33px] w-[2px] h-[80%] bg-[#111] hidden lg:block animate-in fade-in duration-300" />
                          </>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Content - Ultra Premium Cards (UNIVERSAL EXTRACTOR) */}
              <div className="w-full lg:w-[70%]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 text-left">
                  {fullProduct?.techSpecs?.filter(s => s.category === activeSpecTab)?.map((spec, specIdx) => {
                    
                    // ⚡ SMART FALLBACK: Handle nested arrays OR flat objects
                    let itemsToRender = [];
                    if (spec.details && Array.isArray(spec.details)) {
                      itemsToRender = spec.details;
                    } else if (spec.specs && Array.isArray(spec.specs)) {
                      itemsToRender = spec.specs;
                    } else if (spec.description || spec.value || spec.title || spec.name) {
                      itemsToRender = [spec]; // Agar data direct property me hai
                    } else if (typeof spec === 'string') {
                      itemsToRender = [spec];
                    }

                    if (itemsToRender.length === 0) return null;

                    return itemsToRender.map((detail, idx) => {
                      // Extract title and description intelligently
                      const title = detail.title || detail.name || detail.label || (typeof detail === 'string' && detail.includes(':') ? detail.split(':')[0] : 'Feature');
                      
                      let rawDesc = detail.desc || detail.description || detail.value || (typeof detail === 'string' && detail.includes(':') ? detail.split(':').slice(1).join(':') : detail);
                      
                      if (!rawDesc && typeof detail === 'string' && !detail.includes(':')) {
                        rawDesc = detail;
                      }

                      // Convert to elegant Sentence Case
                      const formattedDesc = rawDesc 
                        ? String(rawDesc).charAt(0).toUpperCase() + String(rawDesc).slice(1)
                        : '';

                      return (
                        <div 
                          key={`${specIdx}-${idx}`} 
                          className="group relative bg-white rounded-[20px] p-6 md:p-8 flex items-center gap-6 border border-gray-100/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-gray-200 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-default overflow-hidden"
                        >
                          {/* Subtle Background Glow on Hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                          {/* Circular Icon Container */}
                          <div className="relative z-10 w-[60px] h-[60px] shrink-0 rounded-full bg-[#F8F8F8] border border-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-[#111] group-hover:text-[#C8A253] group-hover:border-[#111] group-hover:scale-105 transition-all duration-500 shadow-inner group-hover:shadow-[#C8A253]/20">
                            {getIcon(detail.icon || '', title)}
                          </div>
                          
                          {/* Text Content */}
                          <div className="relative z-10 flex-1">
                            {title && title !== 'Feature' && title !== 'Spec' && (
                              <h4 className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#C8A253] mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                                {title}
                              </h4>
                            )}
                            
                            <p className="text-[14px] md:text-[15px] font-medium text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                              {formattedDesc}
                            </p>
                          </div>
                        </div>
                      );
                    });
                  })}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ⚡⚡ THE TRUEE PROMISE - LIGHT LUXURY THEME ⚡⚡ */}
       {/* Pehle ye tha: className="py-16 md:py-24 ..." */}
{/* Ab ise aise change kar dijiye: */}
<section id="brand-promise" className="pt-8 pb-16 md:pt-8 md:pb-24 bg-white relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[#C8A253]/5 blur-[120px] pointer-events-none rounded-full" />
          
          <div className="max-w-[1340px] mx-auto px-6 md:px-12 relative z-10">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-[#C8A253] text-[10px] font-black tracking-[0.4em] uppercase mb-4">The Standard</p>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-gray-900">Truee Promise.</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              
              <div className="flex flex-col items-center text-center group bg-[#FAFAFA] p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-5 text-[#C8A253] group-hover:scale-110 transition-transform duration-500">
                  <Shield size={24} strokeWidth={2} />
                </div>
                <h4 className="text-[12px] md:text-[13px] font-bold uppercase tracking-widest mb-3 text-gray-900">2-Year Warranty</h4>
                <p className="text-gray-500 text-[12px] leading-relaxed">Complete peace of mind with our comprehensive manufacturer coverage.</p>
              </div>

              <div className="flex flex-col items-center text-center group bg-[#FAFAFA] p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-5 text-[#C8A253] group-hover:scale-110 transition-transform duration-500">
                  <Crown size={24} strokeWidth={2} />
                </div>
                <h4 className="text-[12px] md:text-[13px] font-bold uppercase tracking-widest mb-3 text-gray-900">100% Authentic</h4>
                <p className="text-gray-500 text-[12px] leading-relaxed">Guaranteed genuine luxury audio products sourced directly from brands.</p>
              </div>

              <div className="flex flex-col items-center text-center group bg-[#FAFAFA] p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-5 text-[#C8A253] group-hover:scale-110 transition-transform duration-500">
                  <Briefcase size={24} strokeWidth={2} />
                </div>
                <h4 className="text-[12px] md:text-[13px] font-bold uppercase tracking-widest mb-3 text-gray-900">Secure Shipping</h4>
                <p className="text-gray-500 text-[12px] leading-relaxed">Fully insured, premium packaging delivered safely to your doorstep.</p>
              </div>

              <div className="flex flex-col items-center text-center group bg-[#FAFAFA] p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-5 text-[#C8A253] group-hover:scale-110 transition-transform duration-500">
                  <PhoneCall size={24} strokeWidth={2} />
                </div>
                <h4 className="text-[12px] md:text-[13px] font-bold uppercase tracking-widest mb-3 text-gray-900">24/7 Concierge</h4>
                <p className="text-gray-500 text-[12px] leading-relaxed">Priority customer support dedicated exclusively to our VIP members.</p>
              </div>

            </div>
          </div>
        </section>

        {/* ⚡⚡ CURATED RECOMMENDATIONS - FASHION E-COMMERCE STYLE ⚡⚡ */}
        <section id="curated-section" className="py-10 md:py-10 bg-[#FAFAFA] border-t border-gray-100 relative z-10">
          <div className="max-w-[1340px] mx-auto px-6 md:px-12">
            <h2 className="text-2xl md:text-4xl font-medium tracking-tighter mb-8 md:mb-12 text-center md:text-left text-gray-900">Recommended for you.</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {relatedProducts.slice(0, 4).map((p) => (
                <div key={p._id} className="group cursor-pointer relative flex flex-col gap-3 md:gap-4" style={{ touchAction: 'manipulation' }} onClick={async (e) => { e.preventDefault(); if (modalRef.current) modalRef.current.scrollTo({ top: 0, behavior: 'smooth' }); setLoading(true); setActiveImgIdx(0); setSelectedVariantIdx(0); setExpandDescription(false); try { const { data } = await axiosInstance.get(`/products/${p._id}`); if (data?.success && data?.product) { setFullProduct(data.product); setRelatedProducts(data.relatedProducts || []); if (data.product.techSpecs?.length > 0) setActiveSpecTab(data.product.techSpecs[0].category); } } catch (e) { console.error(e); } finally { setLoading(false); } }}>
                  <div className="aspect-[4/5] bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-10 overflow-hidden flex items-center justify-center relative shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-gray-100 group-hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-500">
                    <img src={p.images?.[0]?.url || DEFAULT_IMG} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out" alt={p.name} />
                  </div>
                  <div className="px-1">
                    <h4 className="font-bold text-[10.5px] md:text-[13px] uppercase tracking-widest mb-1 md:mb-1.5 text-gray-900 line-clamp-1">{p.name}</h4>
                    <p className="text-[#C8A253] text-[12px] md:text-[14px] font-bold tracking-wide">₹{p.price?.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ⚡⚡ REVIEWS - HIGH-END EDITORIAL STYLE ⚡⚡ */}
        <section id="reviews-section" className="py-11 md:py-18 bg-white">
          <div className="max-w-5xl mx-auto px-6 text-center">
{/*             <div className="flex justify-center gap-1 mb-5 md:mb-6 text-[#C8A253]">
              {[1, 2, 3, 4, 5].map((i) => (<Star key={i} fill="currentColor" size={18} className="md:w-[20px] md:h-[20px]" />))}
            </div> */}
            
            <h2 className="text-2xl md:text-4xl font-medium tracking-tighter mb-4 md:mb-6 leading-tight capitalize text-gray-900">
              {fullProduct?.brand ? `${fullProduct.brand} Signature .` : "Premium Signature ."}
            </h2>            
{/*             <p className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-12 md:mb-20">
              {fullProduct?.reviewsCount || "843"} Verified Audiophiles &nbsp;•&nbsp; 4.9 Rating
            </p> */}
            
            <div className="grid grid-cols-3 gap-3 md:gap-8 pb-8 md:pb-12 px-2 md:px-0">
              {galleryImages.slice(0, 3).map((img, i) => (
                <div 
                  key={i} 
                  className={`aspect-[4/5] w-full rounded-2xl md:rounded-[2.5rem] bg-[#FAFAFA] overflow-hidden shadow-sm border border-gray-100 group transition-transform duration-700 flex items-center justify-center p-4 md:p-8 ${
                    i === 1 ? 'translate-y-4 md:translate-y-12' : '' 
                  }`}
                >
                  <img 
                    src={img} 
                    className="w-full h-full object-contain mix-blend-multiply opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110" 
                    alt="review" 
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 w-full z-[200] bg-white flex flex-col md:flex-row shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        
        <div className="w-full bg-[#f8f8f8] border-t border-gray-200 px-4 md:hidden flex justify-start gap-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {[
            { id: 'sidebar-features', label: 'Features' },
            { id: 'tech-specs-section', label: 'Tech Specs' },
            { id: 'reviews-section', label: 'Reviews' },
            { id: 'curated-section', label: 'Compare' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => { setActiveBottomTab(tab.id); scrollToSection(tab.id); }} 
              className={`pt-3 pb-2.5 text-[10px] whitespace-nowrap cursor-pointer transition-colors duration-300 ${
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

        <div className="w-full h-[60px] md:h-[80px] flex items-center justify-between px-4 md:px-12 bg-white border-t border-gray-100 md:border-t-0">
          
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => scrollToSection('product-hero')}>
            <img src={galleryImages[0]} className="w-10 h-10 object-contain mix-blend-multiply hidden sm:block" alt="prod"/>
            <div className="flex flex-col justify-center">
              <span className="font-bold text-[11px] md:text-[14px] text-black leading-none mb-1 max-w-[120px] md:max-w-[200px] truncate">{fullProduct?.name || 'Product'}</span>
              <span className="text-[10px] md:text-[11px] font-bold text-[#C8A253]">₹{mainPrice.toLocaleString()}</span>
            </div>
          </div>

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
            className={`px-5 py-2.5 md:px-8 md:py-3.5 text-[9px] md:text-[11px] font-bold uppercase tracking-widest rounded-full shadow-lg shrink-0 transition-all whitespace-nowrap ${
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
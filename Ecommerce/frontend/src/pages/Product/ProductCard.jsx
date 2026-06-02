

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, Zap, Clock, ShoppingBag } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';

const DEFAULT_IMG = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600";

const formatPrice = (amount) => {
  if (!amount) return '';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
};

const getAllImages = (product) => {
  if (!product) return [DEFAULT_IMG];
  let images = [];
  if (product.images?.length > 0) images.push(...product.images.map(img => img.url));
  else if (product.image) {
    images.push(product.image);
    if (product.hoverImage) images.push(product.hoverImage);
  }
  if (product.variants?.length > 0) {
    product.variants.forEach(variant => {
      if (variant.images?.length > 0) images.push(...variant.images.map(img => img.url));
    });
  }
  images = [...new Set(images.filter(Boolean))];
  return images.length > 0 ? images : [DEFAULT_IMG];
};

export default function ProductCard({ product, onQuickView }) {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(null);
  const [isDealActive, setIsDealActive] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const cardImages = getAllImages(product);

  useEffect(() => {
    let interval;
    if (cardImages.length > 1) {
      interval = setInterval(() => {
        setCurrentImgIndex((prev) => (prev + 1) % cardImages.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [cardImages.length]);

  useEffect(() => {
    if (product.flashDeal?.isActive && product.flashDeal?.endTime) {
      const updateTimer = () => {
        const distance = new Date(product.flashDeal.endTime).getTime() - Date.now();
        if (distance > 0) {
          setIsDealActive(true);
          setTimeLeft({
            hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((distance / 1000 / 60) % 60),
            seconds: Math.floor((distance / 1000) % 60)
          });
        } else {
          setIsDealActive(false);
        }
      };
      updateTimer();
      const timer = setInterval(updateTimer, 1000);
      return () => clearInterval(timer);
    }
  }, [product]);

  const displayPrice = isDealActive ? product.flashDeal.dealPrice : product.price - (product.discountPrice || 0);
  const discountPercentage = Math.round(((product.price - displayPrice) / product.price) * 100);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      await axiosInstance.post('/cart/add', { productId: product._id, quantity: 1 });
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { increase: 1 } }));
    } catch (error) {
      console.error('Add to cart failed', error);
    }
  };

  return (
    <div
      data-aos="fade-up"
      onClick={() => onQuickView(product)}
      /* ⚡ FIX: Card ko strict height (h-[450px]) di hai taaki koi bada/chhota na ho */
      className="group relative cursor-pointer flex flex-col bg-white rounded-3xl overflow-hidden transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-2 w-full h-[450px] border border-transparent"
      style={{ 
        borderColor: isDealActive ? 'var(--theme-primary)' : 'transparent' 
      }}
    >
      {/* Image Section */}
      <div 
        /* ⚡ FIX: Image box ko h-[250px] min-h-[250px] max-h-[250px] diya hai */
        className="relative w-full h-[250px] min-h-[250px] max-h-[250px] shrink-0 overflow-hidden rounded-t-3xl transition-colors duration-700"
        style={{ backgroundColor: 'var(--theme-bg-light)' }}
      >
        <div className="absolute top-4 right-4 z-20">
           <p 
            className="text-[10px] uppercase tracking-widest font-bold bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm"
            style={{ color: 'var(--theme-text-main)' }}
           >
             {product.brand || product.category}
           </p>
        </div>

        {isDealActive && (
          <div 
            className="absolute top-4 left-4 z-20 text-white text-[10px] font-bold px-3 py-1.5 flex items-center gap-1 uppercase rounded-full shadow-lg"
            style={{ backgroundColor: 'var(--theme-primary)' }}
          >
            <Zap className="w-3 h-3 fill-current" /> Deal
          </div>
        )}

        <div className="absolute inset-0 p-8 transition-transform duration-1000 group-hover:scale-110 flex items-center justify-center">
          <img 
            key={currentImgIndex} 
            src={cardImages[currentImgIndex]} 
            alt={product.name} 
            /* ⚡ FIX: Image par w-full h-full object-contain laga diya */
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col space-y-3 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform" style={{ color: 'var(--theme-primary)' }}>
            <Heart className="w-4 h-4" />
          </button>
          <button onClick={handleAddToCart} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform" style={{ color: 'var(--theme-primary)' }}>
            <ShoppingBag className="w-4 h-4" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onQuickView(product); }} className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform" style={{ color: 'var(--theme-primary)' }}>
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Text Info Section */}
      <div className="p-6 text-center flex flex-col items-center flex-grow bg-white justify-between">
        
        {/* PRODUCT HEADING (NAME) */}
        <h4 
          className="text-base font-semibold mb-2 transition-colors duration-300 line-clamp-2 w-full"
          style={{ color: 'var(--theme-text-main)' }}
          onMouseEnter={(e) => e.target.style.color = 'var(--theme-primary)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--theme-text-main)'}
        >
          {product.name}
        </h4>

        <div className="flex flex-col items-center gap-1 mt-auto w-full">
          <div className="flex items-center justify-center gap-2">
            {discountPercentage > 0 && (
              <span className="text-xl font-bold" style={{ color: 'var(--theme-primary)' }}>
                -{discountPercentage}%
              </span>
            )}
            <span className="text-2xl font-bold" style={{ color: 'var(--theme-text-main)' }}>
              {formatPrice(displayPrice)}
            </span>
          </div>
          
          {(product.discountPrice > 0 || isDealActive) && (
              <div className="text-xs text-gray-400 font-medium">
                M.R.P.: <span className="line-through">{formatPrice(product.price)}</span>
              </div>
          )}

          {isDealActive && timeLeft && (
              <div 
                className="mt-3 flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border"
                style={{ 
                  color: 'var(--theme-primary)',
                  borderColor: 'var(--theme-primary)',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)'
                }}
              >
                <Clock className="w-3.5 h-3.5" /> 
                Ends in {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
              </div>
          )}
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import {
  Heart, Eye, Star, ShoppingCart, Zap, GitCompare, Shield,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { useAuth } from '../../context/AuthContext';
import {
  getProductImg,
  getProductPricing,
  isOutOfStock,
  formatPrice,
  getRating,
} from '../../utils/productHelpers';

const COMPARE_KEY = 'truee_compare';

export default function ProductCardPremium({
  product,
  onQuickView,
  variant = 'default',
  className = '',
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imgHover, setImgHover] = useState(false);
  const [adding, setAdding] = useState(false);

  if (!product) return null;

  const { mrp, sellingPrice, hasDiscount, discountPercent } = getProductPricing(product);
  const outOfStock = isOutOfStock(product);
  const { avg, count } = getRating(product);
  const primaryImg = getProductImg(product, 0);
  const hoverImg = getProductImg(product, 1) !== primaryImg ? getProductImg(product, 1) : primaryImg;
  const brand = product.brand || product.category || 'TRUEE';
  const highlight = product.shortDescription || product.tags?.[0] || 'Premium quality';

  const isCompact = variant === 'compact';

  const handleWishlist = async (e) => {
    e.stopPropagation();
    if (!user) return navigate('/login');
    setIsWishlisted(!isWishlisted);
    try {
      await axiosInstance.post('/wishlist/toggle', { productId: product._id });
    } catch {
      setIsWishlisted(!isWishlisted);
    }
  };

  const handleCompare = (e) => {
    e.stopPropagation();
    const list = JSON.parse(localStorage.getItem(COMPARE_KEY) || '[]');
    if (list.includes(product._id)) {
      localStorage.setItem(COMPARE_KEY, JSON.stringify(list.filter((id) => id !== product._id)));
    } else if (list.length < 4) {
      localStorage.setItem(COMPARE_KEY, JSON.stringify([...list, product._id]));
    }
  };

  const addToCart = async (e, buyNow = false) => {
    e.stopPropagation();
    if (outOfStock) return;
    setAdding(true);
    try {
      const { data } = await axiosInstance.post('/cart/add', {
        productId: product._id,
        quantity: 1,
      });
      if (data.success) {
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { increase: 1 } }));
        if (buyNow) navigate('/checkout');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <article
      className={`group relative flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden
        hover:border-[#C8A253]/25 hover:shadow-[var(--truee-shadow-lg)] transition-all duration-300
        ${isCompact ? 'text-left' : ''} ${className}`}
      onMouseEnter={() => setImgHover(true)}
      onMouseLeave={() => setImgHover(false)}
    >
      {/* Image */}
      <div
        className={`relative bg-gradient-to-b from-[#FAFAFA] to-white overflow-hidden cursor-pointer
          ${isCompact ? 'aspect-square' : 'aspect-[4/5]'}`}
        onClick={() => onQuickView?.(product)}
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
          {outOfStock ? (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide bg-gray-900 text-white rounded-full">
              Sold Out
            </span>
          ) : hasDiscount ? (
            <span className="px-2.5 py-1 text-[10px] font-bold bg-[#C8A253] text-black rounded-full shadow-sm">
              -{discountPercent}%
            </span>
          ) : null}
          {!outOfStock && (
            <span className="px-2 py-0.5 text-[9px] font-semibold bg-white/90 text-gray-600 rounded-full border border-gray-100 flex items-center gap-1 w-fit">
              <Shield size={10} className="text-[#C8A253]" /> Warranty
            </span>
          )}
        </div>

        {/* Action icons */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
          <button
            type="button"
            onClick={handleWishlist}
            className="p-2 rounded-full bg-white/95 shadow-md hover:bg-white hover:scale-105 transition-all"
            aria-label="Wishlist"
          >
            <Heart
              size={15}
              className={isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-700'}
              strokeWidth={2}
            />
          </button>
         
          {/* <button
            type="button"
            onClick={handleCompare}
            className="p-2 rounded-full bg-white/95 shadow-md hover:bg-white hover:scale-105 transition-all hidden sm:flex"
            aria-label="Compare"
          >
            <GitCompare size={15} className="text-gray-700" strokeWidth={2} />
          </button> */}
        </div>

        <img
          src={imgHover ? hoverImg : primaryImg}
          alt={product.name}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-contain p-6 mix-blend-multiply transition-all duration-500
            ${outOfStock ? 'opacity-50 grayscale' : 'group-hover:scale-105'}`}
        />

        {/* Hover CTA overlay */}
        {!outOfStock && (
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-white via-white/95 to-transparent pt-8">
            <div className="flex gap-2">
              <button
                type="button"
                disabled={adding}
                onClick={(e) => addToCart(e, false)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#0A0A0A] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-60"
              >
                <ShoppingCart size={13} /> Add
              </button>
              <button
                type="button"
                disabled={adding}
                onClick={(e) => addToCart(e, true)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#C8A253] text-black text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-[#d4b06a] transition-colors disabled:opacity-60"
              >
                <Zap size={13} /> Buy
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1" onClick={() => onQuickView?.(product)}>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C8A253] mb-1 truncate">
          {brand}
        </p>

        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug mb-2 group-hover:text-[#8B6914] transition-colors cursor-pointer min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={11}
                className={s <= Math.round(avg) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-400">
            {avg.toFixed(1)}{count > 0 ? ` (${count})` : ''}
          </span>
        </div>

        <p className="text-[11px] text-gray-500 line-clamp-1 mb-2">{highlight}</p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-base font-bold text-gray-900">{formatPrice(sellingPrice)}</span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(mrp)}</span>
          )}
        </div>

        {/* Meta row */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
          {/* <span className={`text-[10px] font-medium ${outOfStock ? 'text-red-500' : 'text-green-600'}`}>
            {outOfStock ? 'Out of stock' : 'In stock'}
          </span> */}
          {!outOfStock && (
            <span className="text-[10px] text-gray-400">Delivers in 3–5 days</span>
          )}
        </div>
      </div>
    </article>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuickModel from '../Product/ProductDetailModel'; 

// ── Helper: Format Price ──
const formatPrice = (price) => {
  if (!price || price === 0) return 'Price on Request';
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
};

// ── Helper: Get Image ──
const getProductImg = (p) => {
  if (p?.images?.[0]?.url) return p.images[0].url;
  if (p?.variants?.[0]?.images?.[0]?.url) return p.variants[0].images[0].url;
  return 'https://placehold.co/400x400/f5f5f5/cccccc?text=No+Image'; 
};

// ── CARD TYPE 1: Grid of 4 Products ──
const GridCard = ({ title, products, category, navigate, onProductClick }) => {
  const displayProducts = products.slice(0, 4);

  return (
    <div className="bg-white p-5 flex flex-col h-full rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <h2 className="text-xl font-bold mb-4 text-[#0F1111]">{title}</h2>
      
      {displayProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-4">
          {displayProducts.map((p, idx) => {
            const finalPrice = p.price ? p.price - (p.discountPrice || 0) : 0;
            return (
              <div 
                key={p._id || idx} 
                className="flex flex-col cursor-pointer group"
                onClick={() => onProductClick(p)}
              >
                <div className="bg-[#f8f8f8] p-2 flex items-center justify-center h-[120px] mb-2 overflow-hidden">
                  <img 
                    src={getProductImg(p)} 
                    alt={p.name} 
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-[12px] text-[#0F1111] line-clamp-1 group-hover:text-[#c45500]">{p.name}</h3>
                <span className="text-[14px] font-medium text-[#B12704]">{formatPrice(finalPrice)}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-sm text-gray-400">No products found</div>
      )}

      <button 
        onClick={() => navigate(category ? `/shop?category=${category}` : '/shop')}
        className="text-[#007185] hover:text-[#c45500] hover:underline text-sm font-medium mt-auto text-left w-fit"
      >
        See more
      </button>
    </div>
  );
};

// ── CARD TYPE 2: Single Product with Variants ──
const VariantCard = ({ title, product, navigate, onProductClick }) => {
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);

  if (!product) return null;

  const hasVariants = product.variants && product.variants.length > 0;
  const mainImage = hasVariants && product.variants[activeVariantIdx]?.images?.[0]?.url 
    ? product.variants[activeVariantIdx].images[0].url 
    : getProductImg(product);

  const basePrice = product.price || 0;
  const finalPrice = basePrice - (product.discountPrice || 0);

  return (
    <div className="bg-white p-5 flex flex-col h-full rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <h2 className="text-xl font-bold mb-4 text-[#0F1111]">{title}</h2>
      
      <div 
        className="flex-1 flex flex-col cursor-pointer" 
        onClick={() => onProductClick(product)}
      >
        <div className="bg-[#f8f8f8] p-4 flex items-center justify-center h-[200px] mb-3 overflow-hidden">
          <img 
            src={mainImage} 
            alt={product.name} 
            className="max-h-full max-w-full object-contain mix-blend-multiply"
          />
        </div>
        
        <h3 className="text-[14px] text-[#0F1111] line-clamp-2 mb-1 hover:text-[#c45500]">{product.name}</h3>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[18px] font-medium text-[#B12704]">{formatPrice(finalPrice)}</span>
          {product.discountPrice > 0 && basePrice > 0 && (
            <span className="text-[12px] text-[#565959] line-through">M.R.P: {formatPrice(basePrice)}</span>
          )}
        </div>

        {hasVariants && (
          <div className="flex gap-2 flex-wrap mb-4" onClick={(e) => e.stopPropagation()}>
            {product.variants.slice(0, 4).map((variant, idx) => (
              <div 
                key={idx}
                onMouseEnter={() => setActiveVariantIdx(idx)}
                onClick={(e) => e.stopPropagation()}
                className={`w-12 h-12 border rounded cursor-pointer p-1 flex items-center justify-center bg-white ${activeVariantIdx === idx ? 'border-[#007185] ring-1 ring-[#007185] shadow-sm' : 'border-gray-300 hover:border-gray-400'}`}
              >
                <img 
                  src={variant.images?.[0]?.url || getProductImg(product)} 
                  alt={variant.color || `Variant ${idx+1}`} 
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <button 
        onClick={() => navigate(`/shop?category=${product.category}`)}
        className="text-[#007185] hover:text-[#c45500] hover:underline text-sm font-medium mt-auto text-left w-fit"
      >
        See more
      </button>
    </div>
  );
};

// ── MAIN COMPONENT (Exported) ──
export default function HomeAmazonBlocks({ products }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    if (product && product._id) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  if (!products || products.length === 0) return null;

  // ⚡ SMART TRACKER: Jo id yahan aa jayegi, wo dobara nahi dikhegi
  const usedIds = new Set();

  const getUniqueProducts = (condition, count) => {
    const selected = [];
    for (const p of products) {
      if (selected.length === count) break;
      if (!usedIds.has(p._id) && condition(p)) {
        selected.push(p);
        usedIds.add(p._id);
      }
    }
    return selected;
  };

  // 1. Sabse pehle Card 2 (Variant wala) ke liye nikal lo
  let card2Product = products.find(p => p.variants?.length > 0 && !usedIds.has(p._id));
  if (!card2Product) card2Product = products.find(p => !usedIds.has(p._id));
  if (card2Product) usedIds.add(card2Product._id);

  // 2. Card 1 ke liye unique products nikal lo
  let card1Products = getUniqueProducts(p => p.category === 'Speakers' || p.category === 'Audio', 4);
  if (card1Products.length < 4) {
    card1Products = [...card1Products, ...getUniqueProducts(() => true, 4 - card1Products.length)];
  }

  // 3. Card 3 ke liye unique products nikal lo
  let card3Products = getUniqueProducts(p => p.category === 'Beauty & Wellness', 4);
  if (card3Products.length < 4) {
    card3Products = [...card3Products, ...getUniqueProducts(() => true, 4 - card3Products.length)];
  }

  // 4. Card 4 ke liye unique products nikal lo
  let card4Products = getUniqueProducts(p => p.category === 'Smartwatches', 4);
  if (card4Products.length < 4) {
    card4Products = [...card4Products, ...getUniqueProducts(() => true, 4 - card4Products.length)];
  }

  return (
    <div className="w-full bg-gradient-to-b from-[#F5F5F5] to-white py-10 md:py-14 px-4 md:px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 truee-divider-line" />
      <div className="max-w-[1500px] mx-auto">
        <h2 className="truee-section-title mb-8 px-1">Shop by category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          
          <GridCard 
            title="Keep shopping for" 
            products={card1Products} 
            category={card1Products[0]?.category}
            navigate={navigate} 
            onProductClick={handleProductClick} 
          />

          <VariantCard 
            title="Pick up where you left off" 
            product={card2Product} 
            navigate={navigate} 
            onProductClick={handleProductClick} 
          />

          <GridCard 
            title="More items to consider" 
            products={card3Products} 
            category={card3Products[0]?.category}
            navigate={navigate} 
            onProductClick={handleProductClick} 
          />

          <GridCard 
            title="Continue shopping for" 
            products={card4Products} 
            category={card4Products[0]?.category}
            navigate={navigate} 
            onProductClick={handleProductClick} 
          />

        </div>
      </div>

      {isModalOpen && selectedProduct && (
        <QuickModel product={selectedProduct} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
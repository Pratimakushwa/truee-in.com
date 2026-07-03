import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';
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

export default function CuratedPrivileges({ products }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (!products || products.length === 0) return null;

  const discountedProducts = products
    .filter(p => p.discountPrice && p.discountPrice > 0)
    .slice(0, 4);

  if (discountedProducts.length === 0) return null;

  const handleProductClick = (product) => {
    if (product && product._id) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="w-full bg-[#fafafa] py-20 relative overflow-hidden font-sans text-[#1a1a1a]">
      
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A253]/10 border border-[#C8A253]/20 mb-4">
              <Lock className="w-3 h-3 text-[#C8A253]" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#C8A253]">Exclusive Access</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1a1a1a]">Curated Privileges.</h2>
          </motion.div>

          {/* ⚡ UPDATED: "See more" style navigation */}
          <motion.button 
            onClick={() => navigate('/shop')} 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} 
            className="text-[#007185] hover:text-[#c45500] hover:underline text-sm font-medium"
          >
            See more
          </motion.button>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {discountedProducts.map((p, index) => {
            const basePrice = p.price || 0;
            const finalPrice = basePrice - p.discountPrice;
            const discountPercentage = Math.round((p.discountPrice / basePrice) * 100);

            return (
              <motion.div 
                key={p._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 p-4"
                onClick={() => handleProductClick(p)}
              >
                <div className="relative aspect-square bg-white rounded-lg overflow-hidden mb-4 border border-gray-50">
                  <div className="absolute top-2 left-2 z-10 bg-[#C8A253] text-[9px] text-black font-bold uppercase px-2 py-1 rounded-sm shadow-sm">
                    {discountPercentage}% OFF
                  </div>
                  <img 
                    src={getProductImg(p)} 
                    alt={p.name} 
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">{p.brand || p.category}</p>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-[#C8A253] transition-colors line-clamp-1">{p.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-serif font-bold text-gray-900">{formatPrice(finalPrice)}</p>
                    <p className="text-[11px] text-gray-400 line-through">{formatPrice(basePrice)}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {isModalOpen && selectedProduct && (
        <QuickModel product={selectedProduct} onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
}
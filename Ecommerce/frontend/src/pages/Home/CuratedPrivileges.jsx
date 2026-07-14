import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';
import QuickModel from '../Product/ProductDetailModel';
import ProductCardPremium from '../../components/products/ProductCardPremium';

export default function CuratedPrivileges({ products }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (!products || products.length === 0) return null;

  const discountedProducts = products
    .filter((p) => p.discountPrice && p.discountPrice > 0)
    .slice(0, 4);

  if (discountedProducts.length === 0) return null;

  const handleProductClick = (product) => {
    if (product?._id) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="w-full bg-gradient-to-b from-[#FAFAFA] to-white py-16 md:py-10  relative overflow-hidden font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 truee-divider-line" />

      <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C8A253]/10 border border-[#C8A253]/20 mb-4">
              <Lock className="w-3 h-3 text-[#C8A253]" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#C8A253]">Exclusive Access</span>
            </div>
            <h2 className="truee-section-title">Curated Privileges</h2>
            <p className="text-gray-500 text-sm mt-2 max-w-md">Handpicked deals on premium electronics — limited time offers.</p>
          </motion.div>

          <motion.button
            type="button"
            onClick={() => navigate('/shop')}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#C8A253] hover:text-[#8B6914] transition-colors group"
          >
            View all deals
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {discountedProducts.map((p, index) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <ProductCardPremium
                product={p}
                onQuickView={handleProductClick}
                variant="default"
                className="truee-card-lift h-full"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedProduct && (
        <QuickModel product={selectedProduct} onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
}

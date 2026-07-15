// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { Lock, ArrowRight } from 'lucide-react';
// import QuickModel from '../Product/ProductDetailModel';
// import ProductCardPremium from '../../components/products/ProductCardPremium';

// export default function CuratedPrivileges({ products }) {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   if (!products || products.length === 0) return null;

//   const discountedProducts = products
//     .filter((p) => p.discountPrice && p.discountPrice > 0)
//     .slice(0, 4);

//   if (discountedProducts.length === 0) return null;

//   const handleProductClick = (product) => {
//     if (product?._id) {
//       setSelectedProduct(product);
//       setIsModalOpen(true);
//     }
//   };

//   const fadeUp = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
//   };

//   return (
//     <section className="w-full bg-gradient-to-b from-[#FAFAFA] to-white py-16 md:py-10  relative overflow-hidden font-sans">
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 truee-divider-line" />

//       <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10">
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
//           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C8A253]/10 border border-[#C8A253]/20 mb-4">
//               <Lock className="w-3 h-3 text-[#C8A253]" />
//               <span className="text-[9px] font-bold uppercase tracking-widest text-[#C8A253]">Exclusive Access</span>
//             </div>
//             <h2 className="truee-section-title">Curated Privileges</h2>
//             <p className="text-gray-500 text-sm mt-2 max-w-md">Handpicked deals on premium electronics — limited time offers.</p>
//           </motion.div>

//           <motion.button
//             type="button"
//             onClick={() => navigate('/shop')}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={fadeUp}
//             className="inline-flex items-center gap-2 text-sm font-semibold text-[#C8A253] hover:text-[#8B6914] transition-colors group"
//           >
//             View all deals
//             <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//           </motion.button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
//           {discountedProducts.map((p, index) => (
//             <motion.div
//               key={p._id}
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.45, delay: index * 0.08 }}
//             >
//               <ProductCardPremium
//                 product={p}
//                 onQuickView={handleProductClick}
//                 variant="default"
//                 className="truee-card-lift h-full"
//               />
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {isModalOpen && selectedProduct && (
//         <QuickModel product={selectedProduct} onClose={() => setIsModalOpen(false)} />
//       )}
//     </section>
//   );
// }
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import QuickModel from '../Product/ProductDetailModel';
import ProductCardPremium from '../../components/products/ProductCardPremium';

export default function CuratedPrivileges({ products }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const scrollRef = useRef(null);

  const scrollByCard = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstChild?.offsetWidth || 200;
    el.scrollBy({ left: direction * (cardWidth + 12), behavior: 'smooth' });
  };

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
    <section className="w-full bg-white py-8 relative overflow-hidden font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 truee-divider-line" />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="flex items-start sm:items-end justify-between mb-6 sm:mb-8 gap-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A253] mb-2 flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-[#C8A253]" />
              Exclusive Access
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-[32px] font-serif font-bold text-[#111] mb-2">
              Curated Privileges
            </h2>
            <div className="w-8 h-[2px] bg-[#C8A253] mb-2"></div>
            <p className="text-gray-500 text-[12px] sm:text-[13px] leading-relaxed max-w-md hidden xs:block">
              Handpicked deals on premium electronics — limited time offers.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex items-center gap-3 shrink-0"
          >
            <button
              type="button"
              onClick={() => navigate('/shop')}
              className="hidden sm:inline-flex items-center gap-1.5 text-[12px] sm:text-sm font-semibold text-[#C8A253] hover:text-[#8B6914] transition-colors"
            >
              View all deals
            </button>
            <button
              type="button"
              onClick={() => navigate('/shop')}
              aria-label="View all deals"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#C8A253] shadow-sm flex items-center justify-center text-white hover:bg-[#b8924a] transition-all cursor-pointer group"
            >
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Mobile: horizontal scroll with buttons | Desktop (sm+): grid */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex sm:grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {discountedProducts.map((p, index) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="h-full shrink-0 w-[46%] xs:w-[42%] sm:w-auto snap-start"
              >
                <ProductCardPremium
                  product={p}
                  onQuickView={handleProductClick}
                  variant="compact"
                  className="truee-card-lift h-full"
                />
              </motion.div>
            ))}
          </div>

          {/* Mobile scroll buttons */}
          {/* <div className="flex sm:hidden items-center justify-center gap-3 mt-5">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Scroll left"
              className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-700 hover:border-[#C8A253]/50 hover:text-[#C8A253] active:scale-95 transition-all cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Scroll right"
              className="w-9 h-9 rounded-full bg-[#C8A253] shadow-sm flex items-center justify-center text-white hover:bg-[#b8924a] active:scale-95 transition-all cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div> */}
        </div>
      </div>

      {isModalOpen && selectedProduct && (
        <QuickModel product={selectedProduct} onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
}
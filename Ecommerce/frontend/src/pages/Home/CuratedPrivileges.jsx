
// import React, { useState, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { Lock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
// import QuickModel from '../Product/ProductDetailModel';
// import ProductCardPremium from '../../components/products/ProductCardPremium';

// export default function CuratedPrivileges({ products }) {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const scrollRef = useRef(null);

//   const scrollByCard = (direction) => {
//     const el = scrollRef.current;
//     if (!el) return;
//     const cardWidth = el.firstChild?.offsetWidth || 200;
//     el.scrollBy({ left: direction * (cardWidth + 12), behavior: 'smooth' });
//   };

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
//     <section 
//       className="w-full bg-white py-8 relative overflow-hidden font-sans"
//       style={{ fontFamily: "'Inter', sans-serif" }} // ⚡ Applied Inter font globally
//     >
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 truee-divider-line" />

//       <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
//         <div className="flex items-start sm:items-end justify-between mb-6 sm:mb-8 gap-4">
//           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
//             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A253] mb-2 flex items-center gap-1.5">
//               <Lock className="w-3 h-3 text-[#C8A253]" />
//               Exclusive Access
//             </span>
//             {/* ⚡ Changed font-serif to font-sans */}
//             <h2 className="text-2xl sm:text-3xl md:text-[32px] font-sans font-bold text-[#111] mb-2">
//               Curated Privileges
//             </h2>
//             <div className="w-8 h-[2px] bg-[#C8A253] mb-2"></div>
//             <p className="text-gray-500 text-[12px] sm:text-[13px] leading-relaxed max-w-md hidden xs:block">
//               Handpicked deals on premium electronics — limited time offers.
//             </p>
//           </motion.div>

//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={fadeUp}
//             className="flex items-center gap-3 shrink-0"
//           >
//             <button
//               type="button"
//               onClick={() => navigate('/shop')}
//               className="hidden sm:inline-flex items-center gap-1.5 text-[12px] sm:text-sm font-semibold text-[#C8A253] hover:text-[#8B6914] transition-colors"
//             >
//               View all deals
//             </button>
//             <button
//               type="button"
//               onClick={() => navigate('/shop')}
//               aria-label="View all deals"
//               className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#C8A253] shadow-sm flex items-center justify-center text-white hover:bg-[#b8924a] transition-all cursor-pointer group"
//             >
//               <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
//             </button>
//           </motion.div>
//         </div>

//         {/* Mobile: horizontal scroll with buttons | Desktop (sm+): grid */}
//         <div className="relative">
//           <div
//             ref={scrollRef}
//             className="flex sm:grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
//           >
//             {discountedProducts.map((p, index) => (
//               <motion.div
//                 key={p._id}
//                 initial={{ opacity: 0, y: 24 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.45, delay: index * 0.08 }}
//                 className="h-full shrink-0 w-[46%] xs:w-[42%] sm:w-auto snap-start"
//               >
//                 <ProductCardPremium
//                   product={p}
//                   onQuickView={handleProductClick}
//                   variant="compact"
//                   className="truee-card-lift h-full"
//                 />
//               </motion.div>
//             ))}
//           </div>
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
    <section 
      className="w-full bg-white py-8 relative overflow-hidden font-sans"
      // ⚡ Only Font Family changed to Apple SF Pro
      style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 truee-divider-line" />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="flex items-start sm:items-end justify-between mb-6 sm:mb-8 gap-4">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A253] mb-2 flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-[#C8A253]" />
              Exclusive Access
            </span>
            {/* ⚡ Changed font-serif to font-sans */}
            <h2 className="text-2xl sm:text-3xl md:text-[32px] font-sans font-bold text-[#111] mb-2">
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
        </div>
      </div>

      {isModalOpen && selectedProduct && (
        <QuickModel product={selectedProduct} onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
}
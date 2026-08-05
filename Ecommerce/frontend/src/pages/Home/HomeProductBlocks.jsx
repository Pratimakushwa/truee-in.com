
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import QuickModel from '../Product/ProductDetailModel';

// // ── Helper: Format Price ──
// const formatPrice = (price) => {
//   if (!price || price === 0) return 'Price on Request';
//   return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
// };

// // ── Helper: Get Image ──
// const getProductImg = (p) => {
//   if (p?.images?.[0]?.url) return p.images[0].url;
//   if (p?.variants?.[0]?.images?.[0]?.url) return p.variants[0].images[0].url;
//   return 'https://placehold.co/400x400/f5f5f5/cccccc?text=No+Image';
// };

// // ── Icons ──
// const BagIcon = () => (
//   <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-[18px] sm:h-[18px]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M6 8h12l-1 12H7L6 8Z" />
//     <path d="M9 8V6a3 3 0 0 1 6 0v2" />
//   </svg>
// );
// const PickupIcon = () => (
//   <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-[18px] sm:h-[18px]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
//     <path d="M2 7h20l-2 5H4L2 7Z" />
//     <path d="M12 7V4" />
//     <path d="M9 4h6" />
//   </svg>
// );
// const StarIcon = () => (
//   <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-[18px] sm:h-[18px]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M12 2.5 15 9l7 1-5 5 1.2 7L12 18.5 5.8 22 7 15 2 10l7-1 3-6.5Z" />
//   </svg>
// );
// const CartIcon = () => (
//   <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-[18px] sm:h-[18px]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//     <circle cx="9" cy="21" r="1" />
//     <circle cx="19" cy="21" r="1" />
//     <path d="M1 1h4l2.6 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
//   </svg>
// );
// const ArrowIcon = () => (
//   <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M5 12h14" />
//     <path d="m12 5 7 7-7 7" />
//   </svg>
// );

// // ── Card Header ──
// const CardHeader = ({ icon, title }) => (
//   <div className="flex items-center gap-2   px-4 py-3 sm:px-5 rounded-t-2xl ">
//     <span className="text-[#a97c2f]">{icon}</span>
//     <h2 className="text-[13px] sm:text-[14px] font-semibold text-[#1a1a1a] flex-1 truncate">{title}</h2>
//     <span className="text-gray-400">
//       <ArrowIcon />
//     </span>
//   </div>
// );

// // ── Card Footer ──
// const CardFooter = ({ onClick }) => (
//  <div className="bg-white px-4 pb-2 mt-auto">
//    <button
//     onClick={onClick}
//     className="group flex w-full items-center justify-between bg-[#F8F5F2] hover:bg-[#F2ECE6] transition-all duration-300 px-5 py-3.5 rounded-lg  mt-auto text-[12px] sm:text-[13px] font-medium text-[#1a1a1a]"
//   >
//     See more
//     <span className="transition-transform duration-300 group-hover:translate-x-1 text-[#a97c2f]">
//       <ArrowIcon />
//     </span>
//   </button>
//  </div>
// );

// // ── CARD TYPE 1: Grid of 4 Products ──
// const GridCard = ({ title, icon, products, category, navigate, onProductClick, highlight }) => {
//   const displayProducts = products.slice(0, 4);

//   return (
//    <div className="
// group
// bg-white
// flex
// flex-col
// h-full
// rounded-2xl
// shadow-sm
// border
// border-gray-200
// transition-all
// duration-300
// overflow-hidden
// hover:border-[#c9a15a]
// hover:shadow-lg
// ">
//       <CardHeader icon={icon} title={title} />

//       {displayProducts.length > 0 ? (
//         <div className="grid grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-3 sm:gap-y-4 p-4  flex-1">
//           {displayProducts.map((p, idx) => {
//             const finalPrice = p.price ? p.price - (p.discountPrice || 0) : 0;
//             return (
//               <div
//                 key={p._id || idx}
//                 className="flex flex-col cursor-pointer group"
//                 onClick={() => onProductClick(p)}
//               >
//                 <div className="bg-[#f8f8f8] rounded-lg p-2 flex items-center justify-center h-[90px] xs:h-[100px] sm:h-[110px] md:h-[120px] mb-2 overflow-hidden">
//                   <img
//                     src={getProductImg(p)}
//                     alt={p.name}
//                     className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
//                   />
//                 </div>
//                 <h3 className="text-[11px] sm:text-[12px] text-[#0F1111] line-clamp-1  group-hover:text-black">{p.name}</h3>
//                 <span className="text-[13px] sm:text-[14px] font-semibold text-[#c9a15a] ">{formatPrice(finalPrice)}</span>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <div className="flex-1 flex items-center justify-center text-sm text-gray-400 p-6">No products found</div>
//       )}

//       <CardFooter onClick={() => navigate(category ? `/shop?category=${category}` : '/shop')} />
//     </div>
//   );
// };

// // ── CARD TYPE 2: Single Product with Variants ──
// const VariantCard = ({ title, icon, product, navigate, onProductClick, highlight }) => {
//   const [activeVariantIdx, setActiveVariantIdx] = useState(0);

//   if (!product) return null;

//   const hasVariants = product.variants && product.variants.length > 0;
//   const mainImage = hasVariants && product.variants[activeVariantIdx]?.images?.[0]?.url
//     ? product.variants[activeVariantIdx].images[0].url
//     : getProductImg(product);

//   const basePrice = product.price || 0;
//   const finalPrice = basePrice - (product.discountPrice || 0);

//   return (
//     <div className="
// group
// bg-white
// flex
// flex-col
// h-full
// rounded-2xl
// shadow-sm
// border
// border-gray-200
// transition-all
// duration-300
// overflow-hidden
// hover:border-[#c9a15a]
// hover:shadow-lg
// ">
//       <CardHeader icon={icon} title={title} />

//       <div
//         className="flex-1 flex flex-col cursor-pointer p-4 sm:p-5"
//         onClick={() => onProductClick(product)}
//       >
//         <div className="bg-[#f8f8f8] rounded-lg p-3 sm:p-4 flex items-center justify-center h-[150px] xs:h-[170px] sm:h-[190px] md:h-[200px] mb-3 overflow-hidden">
//           <img
//             src={mainImage}
//             alt={product.name}
//             className="max-h-full max-w-full object-contain mix-blend-multiply"
//           />
//         </div>

//         <h3 className="text-[13px] sm:text-[14px] text-[#0F1111] line-clamp-2 mb-1 hover:text-[#c45500]">{product.name}</h3>

//         <div className="flex items-center gap-2 mb-3 flex-wrap">
//           <span className="text-[16px] sm:text-[18px] font-semibold text-[#c9a15a]">{formatPrice(finalPrice)}</span>
//           {product.discountPrice > 0 && basePrice > 0 && (
//             <span className="text-[11px] sm:text-[12px] text-[#565959] line-through">M.R.P: {formatPrice(basePrice)}</span>
//           )}
//         </div>

//         {hasVariants && (
//           <div className="flex gap-2 flex-wrap" onClick={(e) => e.stopPropagation()}>
//             {product.variants.slice(0, 4).map((variant, idx) => (
//               <div
//                 key={idx}
//                 onMouseEnter={() => setActiveVariantIdx(idx)}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-10 h-10 sm:w-12 sm:h-12 border rounded-lg cursor-pointer p-1 flex items-center justify-center bg-white transition-all ${activeVariantIdx === idx ? 'border-[#c9a15a] ring-1 ring-[#c9a15a] shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
//               >
//                 <img
//                   src={variant.images?.[0]?.url || getProductImg(product)}
//                   alt={variant.color || `Variant ${idx + 1}`}
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <CardFooter onClick={() => navigate(`/shop?category=${product.category}`)} />
//     </div>
//   );
// };

// // ── MAIN COMPONENT (Exported) ──
// export default function HomeAmazonBlocks({ products }) {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const handleProductClick = (product) => {
//     if (product && product._id) {
//       setSelectedProduct(product);
//       setIsModalOpen(true);
//     }
//   };

//   if (!products || products.length === 0) return null;

//   // ⚡ SMART TRACKER: Jo id yahan aa jayegi, wo dobara nahi dikhegi
//   const usedIds = new Set();

//   const getUniqueProducts = (condition, count) => {
//     const selected = [];
//     for (const p of products) {
//       if (selected.length === count) break;
//       if (!usedIds.has(p._id) && condition(p)) {
//         selected.push(p);
//         usedIds.add(p._id);
//       }
//     }
//     return selected;
//   };

//   // 1. Sabse pehle Card 2 (Variant wala) ke liye nikal lo
//   let card2Product = products.find(p => p.variants?.length > 0 && !usedIds.has(p._id));
//   if (!card2Product) card2Product = products.find(p => !usedIds.has(p._id));
//   if (card2Product) usedIds.add(card2Product._id);

//   // 2. Card 1 ke liye unique products nikal lo
//   let card1Products = getUniqueProducts(p => p.category === 'Speakers' || p.category === 'Audio', 4);
//   if (card1Products.length < 4) {
//     card1Products = [...card1Products, ...getUniqueProducts(() => true, 4 - card1Products.length)];
//   }

//   // 3. Card 3 ke liye unique products nikal lo
//   let card3Products = getUniqueProducts(p => p.category === 'Beauty & Wellness', 4);
//   if (card3Products.length < 4) {
//     card3Products = [...card3Products, ...getUniqueProducts(() => true, 4 - card3Products.length)];
//   }

//   // 4. Card 4 ke liye unique products nikal lo
//   let card4Products = getUniqueProducts(p => p.category === 'Smartwatches', 4);
//   if (card4Products.length < 4) {
//     card4Products = [...card4Products, ...getUniqueProducts(() => true, 4 - card4Products.length)];
//   }

//   return (
//     <div 
//       className="w-full bg-white py-6  px-4 sm:px-6 md:px-8 relative"
//       style={{ fontFamily: "'Inter', sans-serif" }} // ⚡ Inter Font poore component ke liye apply kiya
//     >
//       <div className="max-w-[1500px] mx-auto">

//         {/* Section Heading */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center gap-3 mb-2">
//             <span className="w-6 sm:w-8 h-[1px] bg-[#c9a15a]"></span>
//             <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#a97c2f] uppercase">Shop Smarter</span>
//             <span className="w-6 sm:w-8 h-[1px] bg-[#c9a15a]"></span>
//           </div>
          
//           {/* ⚡ Cormorant Garamond sirf is Main Heading par apply kiya */}
//           <h2 
//             className="text-2xl sm:text-3xl md:text-[32px] text-[#1a1a1a] mb-2"
//             style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
//           >
//             Recommended For You
//           </h2>
          
//           <p className="text-[#888] text-[13px] sm:text-[14px]">Handpicked suggestions to enhance your experience.</p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">

//           <GridCard
//             title="Keep shopping for"
//             icon={<BagIcon />}
//             products={card1Products}
//             category={card1Products[0]?.category}
//             navigate={navigate}
//             onProductClick={handleProductClick}
//           />

//           <VariantCard
//             title="Pick up where you left off"
//             icon={<PickupIcon />}
//             product={card2Product}
//             navigate={navigate}
//             onProductClick={handleProductClick}
//             highlight
//           />

//           <GridCard
//             title="More items to consider"
//             icon={<StarIcon />}
//             products={card3Products}
//             category={card3Products[0]?.category}
//             navigate={navigate}
//             onProductClick={handleProductClick}
//           />

//           <GridCard
//             title="Continue shopping for"
//             icon={<CartIcon />}
//             products={card4Products}
//             category={card4Products[0]?.category}
//             navigate={navigate}
//             onProductClick={handleProductClick}
//           />

//         </div>
//       </div>

//       {isModalOpen && selectedProduct && (
//         <QuickModel product={selectedProduct} onClose={() => setIsModalOpen(false)} />
//       )}
//     </div>
//   );
// }

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

// ── Icons ──
const BagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-[18px] sm:h-[18px]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8h12l-1 12H7L6 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);
const PickupIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-[18px] sm:h-[18px]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
    <path d="M2 7h20l-2 5H4L2 7Z" />
    <path d="M12 7V4" />
    <path d="M9 4h6" />
  </svg>
);
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-[18px] sm:h-[18px]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.5 15 9l7 1-5 5 1.2 7L12 18.5 5.8 22 7 15 2 10l7-1 3-6.5Z" />
  </svg>
);
const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 sm:w-[18px] sm:h-[18px]" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M1 1h4l2.6 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
  </svg>
);
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

// ── Card Header ──
const CardHeader = ({ icon, title }) => (
  <div className="flex items-center gap-2 px-4 py-3 sm:px-5 rounded-t-2xl ">
    <span className="text-[#a97c2f]">{icon}</span>
    <h2 className="text-[13px] sm:text-[14px] font-semibold text-[#1a1a1a] flex-1 truncate">{title}</h2>
    <span className="text-gray-400">
      <ArrowIcon />
    </span>
  </div>
);

// ── Card Footer ──
const CardFooter = ({ onClick }) => (
 <div className="bg-white px-4 pb-2 mt-auto">
   <button
    onClick={onClick}
    className="group flex w-full items-center justify-between bg-[#F8F5F2] hover:bg-[#F2ECE6] transition-all duration-300 px-5 py-3.5 rounded-lg mt-auto text-[12px] sm:text-[13px] font-medium text-[#1a1a1a]"
  >
    See more
    <span className="transition-transform duration-300 group-hover:translate-x-1 text-[#a97c2f]">
      <ArrowIcon />
    </span>
  </button>
 </div>
);

// ── CARD TYPE 1: Grid of 4 Products ──
const GridCard = ({ title, icon, products, category, navigate, onProductClick, highlight }) => {
  const displayProducts = products.slice(0, 4);

  return (
   <div className="
group
bg-white
flex
flex-col
h-full
rounded-2xl
shadow-sm
border
border-gray-200
transition-all
duration-300
overflow-hidden
hover:border-[#c9a15a]
hover:shadow-lg
">
      <CardHeader icon={icon} title={title} />

      {displayProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-3 sm:gap-y-4 p-4 flex-1">
          {displayProducts.map((p, idx) => {
            const finalPrice = p.price ? p.price - (p.discountPrice || 0) : 0;
            return (
              <div
                key={p._id || idx}
                className="flex flex-col cursor-pointer group"
                onClick={() => onProductClick(p)}
              >
                <div className="bg-[#f8f8f8] rounded-lg p-2 flex items-center justify-center h-[90px] xs:h-[100px] sm:h-[110px] md:h-[120px] mb-2 overflow-hidden">
                  <img
                    src={getProductImg(p)}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-[11px] sm:text-[12px] text-[#0F1111] line-clamp-1 group-hover:text-black">{p.name}</h3>
                <span className="text-[13px] sm:text-[14px] font-semibold text-[#c9a15a] ">{formatPrice(finalPrice)}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-sm text-gray-400 p-6">No products found</div>
      )}

      <CardFooter onClick={() => navigate(category ? `/shop?category=${category}` : '/shop')} />
    </div>
  );
};

// ── CARD TYPE 2: Single Product with Variants ──
const VariantCard = ({ title, icon, product, navigate, onProductClick, highlight }) => {
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);

  if (!product) return null;

  const hasVariants = product.variants && product.variants.length > 0;
  const mainImage = hasVariants && product.variants[activeVariantIdx]?.images?.[0]?.url
    ? product.variants[activeVariantIdx].images[0].url
    : getProductImg(product);

  const basePrice = product.price || 0;
  const finalPrice = basePrice - (product.discountPrice || 0);

  return (
    <div className="
group
bg-white
flex
flex-col
h-full
rounded-2xl
shadow-sm
border
border-gray-200
transition-all
duration-300
overflow-hidden
hover:border-[#c9a15a]
hover:shadow-lg
">
      <CardHeader icon={icon} title={title} />

      <div
        className="flex-1 flex flex-col cursor-pointer p-4 sm:p-5"
        onClick={() => onProductClick(product)}
      >
        <div className="bg-[#f8f8f8] rounded-lg p-3 sm:p-4 flex items-center justify-center h-[150px] xs:h-[170px] sm:h-[190px] md:h-[200px] mb-3 overflow-hidden">
          <img
            src={mainImage}
            alt={product.name}
            className="max-h-full max-w-full object-contain mix-blend-multiply"
          />
        </div>

        <h3 className="text-[13px] sm:text-[14px] text-[#0F1111] line-clamp-2 mb-1 hover:text-[#c45500]">{product.name}</h3>

        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-[16px] sm:text-[18px] font-semibold text-[#c9a15a]">{formatPrice(finalPrice)}</span>
          {product.discountPrice > 0 && basePrice > 0 && (
            <span className="text-[11px] sm:text-[12px] text-[#565959] line-through">M.R.P: {formatPrice(basePrice)}</span>
          )}
        </div>

        {hasVariants && (
          <div className="flex gap-2 flex-wrap" onClick={(e) => e.stopPropagation()}>
            {product.variants.slice(0, 4).map((variant, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setActiveVariantIdx(idx)}
                onClick={(e) => e.stopPropagation()}
                className={`w-10 h-10 sm:w-12 sm:h-12 border rounded-lg cursor-pointer p-1 flex items-center justify-center bg-white transition-all ${activeVariantIdx === idx ? 'border-[#c9a15a] ring-1 ring-[#c9a15a] shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <img
                  src={variant.images?.[0]?.url || getProductImg(product)}
                  alt={variant.color || `Variant ${idx + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <CardFooter onClick={() => navigate(`/shop?category=${product.category}`)} />
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
    <div 
      className="w-full bg-white py-6 px-4 sm:px-6 md:px-8 relative"
      // ⚡ Apple SF Pro Font poore component ke liye apply kiya
      style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }} 
    >
      <div className="max-w-[1500px] mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-6 sm:w-8 h-[1px] bg-[#c9a15a]"></span>
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#a97c2f] uppercase">Shop Smarter</span>
            <span className="w-6 sm:w-8 h-[1px] bg-[#c9a15a]"></span>
          </div>
          
          {/* ⚡ Cormorant Garamond hata diya, ab ye bhi Apple font lega */}
          <h2 
            className="text-2xl sm:text-3xl md:text-[32px] text-[#1a1a1a] mb-2"
            style={{ fontWeight: 600 }}
          >
            Recommended For You
          </h2>
          
          <p className="text-[#888] text-[13px] sm:text-[14px]">Handpicked suggestions to enhance your experience.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">

          <GridCard
            title="Keep shopping for"
            icon={<BagIcon />}
            products={card1Products}
            category={card1Products[0]?.category}
            navigate={navigate}
            onProductClick={handleProductClick}
          />

          <VariantCard
            title="Pick up where you left off"
            icon={<PickupIcon />}
            product={card2Product}
            navigate={navigate}
            onProductClick={handleProductClick}
            highlight
          />

          <GridCard
            title="More items to consider"
            icon={<StarIcon />}
            products={card3Products}
            category={card3Products[0]?.category}
            navigate={navigate}
            onProductClick={handleProductClick}
          />

          <GridCard
            title="Continue shopping for"
            icon={<CartIcon />}
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
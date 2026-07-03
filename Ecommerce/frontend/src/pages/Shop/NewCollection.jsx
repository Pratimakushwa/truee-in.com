

// import React, { useState, useEffect, useMemo } from 'react';
// import axiosInstance from '../../utils/axiosInstance';
// import ShopProductCard from './ShopProductCard'; 
// import QuickViewModal from '../Product/ProductDetailModel';
// import Footer from '../Home/Footer'; 
// import Header1 from '../Home/Header1'; 
// import Toast from '../../components/Toast';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Filter, Search, ChevronDown, ChevronUp, X } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion'; // ⚡ Nayi Animation Library

// export default function NewCollection() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [toastMessage, setToastMessage] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
//   const [maxPriceLimit, setMaxPriceLimit] = useState(100000);

//   const [sortOrder, setSortOrder] = useState('best-selling');
//   const [inStockOnly, setInStockOnly] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // Accordion states for filters
//   const [isCatOpen, setIsCatOpen] = useState(true);
//   const [isBrandOpen, setIsBrandOpen] = useState(true);
//   const [isPriceOpen, setIsPriceOpen] = useState(true);

//   useEffect(() => {
//     const fetchAllProducts = async () => {
//       try {
//         setLoading(true);
//         const { data } = await axiosInstance.get(`/products`);
//         if (data.success) {
//           setProducts(data.products);
//           const validPrices = data.products.map(p => p.price).filter(p => typeof p === 'number');
//           const maxP = validPrices.length > 0 ? Math.max(...validPrices) : 100000;
//           setMaxPriceLimit(maxP);
//           setPriceRange({ min: 0, max: maxP });
//         }
//       } catch (e) {
//         console.error(e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAllProducts();
//   }, []);

//   // ⚡ FIX: Unique filtering for Categories & Brands with proper trimming
//   const allCategories = useMemo(() => {
//     const cats = products.map(p => p.category ? p.category.trim() : null).filter(Boolean);
//     return [...new Set(cats)];
//   }, [products]);

//   const allBrands = useMemo(() => {
//     const brnds = products.map(p => p.brand ? p.brand.trim() : null).filter(Boolean);
//     return [...new Set(brnds)];
//   }, [products]);

//   useEffect(() => {
//     if (location.state && !location.state.processed) {
//       if (location.state.categories) {
//         setSelectedCategories(location.state.categories);
//         setSearchTerm('');
//       } else if (location.state.category) {
//         setSelectedCategories([location.state.category]);
//         setSearchTerm('');
//       }
//       if (location.state.search) {
//         setSearchTerm(location.state.search);
//         if (!location.state.categories) setSelectedCategories([]); 
//       }
//       navigate(location.pathname, { replace: true, state: { ...location.state, processed: true } });
//     }
//   }, [location.state, navigate]);

//   const clearFilters = () => {
//     setSelectedCategories([]);
//     setSelectedBrands([]);
//     setSearchTerm('');
//     setPriceRange({ min: 0, max: maxPriceLimit });
//     setInStockOnly(false);
//     setSortOrder('best-selling');
//   };

//   // ⚡ BULLETPROOF FILTER LOGIC
//   const filteredProducts = useMemo(() => {
//     return products.filter(p => {
//       const pCatStr = p.category ? p.category.toLowerCase().trim() : '';
//       const pBrandStr = p.brand ? p.brand.toLowerCase().trim() : '';

//       const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(c => c.toLowerCase().trim() === pCatStr);
//       const matchesBrand = selectedBrands.length === 0 || selectedBrands.some(b => b.toLowerCase().trim() === pBrandStr);

//       const query = searchTerm.toLowerCase().trim();
//       let matchesSearch = true;

//       if (query) {
//         const pName = p.name?.toLowerCase() || '';
//         if (query === 'smartwatch' || query === 'smartwatches') {
//            matchesSearch = ['smartwatch', 'luxury', 'hybrid', 'rugged', 'health'].some(word => pCatStr.includes(word) || pName.includes(word));
//         } else if (query === 'soundbar' || query === 'soundbars') {
//            if (pName.includes('heston 60') || pName.includes('heston 120')) {
//               matchesSearch = true; 
//            } else if (pName.includes('heston 200')) {
//               matchesSearch = false; 
//            } else {
//               matchesSearch = pCatStr.includes('soundbar') || pName.includes('soundbar');
//            }
//         } else if (query === 'subwoofer' || query === 'subwoofers') {
//            if (pName.includes('heston 200')) {
//               matchesSearch = true; 
//            } else if (pName.includes('heston 60') || pName.includes('heston 120')) {
//               matchesSearch = false; 
//            } else {
//               matchesSearch = pCatStr.includes('subwoofer') || pName.includes('subwoofer');
//            }
//         } else {
//           matchesSearch = pName.includes(query) || pBrandStr.includes(query) || pCatStr.includes(query);
//         }
//       }

//       const currentPrice = p.flashDeal?.isActive ? p.flashDeal.dealPrice : (p.price - (p.discountPrice || 0));
//       const matchesStock = inStockOnly ? p.stock > 0 : true;

//       return matchesCategory && matchesBrand && matchesSearch && currentPrice >= priceRange.min && currentPrice <= priceRange.max && matchesStock;
//     }).sort((a, b) => {
//       const priceA = a.flashDeal?.isActive ? a.flashDeal.dealPrice : (a.price - (a.discountPrice || 0));
//       const priceB = b.flashDeal?.isActive ? b.flashDeal.dealPrice : (b.price - (b.discountPrice || 0));
//       if (sortOrder === 'price-asc') return priceA - priceB;
//       if (sortOrder === 'price-desc') return priceB - priceA;
//       return 0;
//     });
//   }, [products, selectedCategories, selectedBrands, searchTerm, priceRange, sortOrder, inStockOnly]);

//   return (
//     <div className="min-h-screen bg-[#fafafa] font-sans text-[#111]">
//       <Header1 />
//       <Toast toast={toastMessage} onClose={() => setToastMessage(null)} />

//       {/* ── LUXURY HERO HEADER ── */}
//       <div className="w-full bg-white border-b border-gray-100 pt-16 pb-12 px-6 md:px-12 relative overflow-hidden">
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="max-w-[1600px] mx-auto flex flex-col items-center text-center relative z-10"
//         >
//           <div className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 text-gray-400 flex items-center justify-center gap-2">
//             <Link to="/" className="hover:text-black transition-colors">HOME</Link>
//             <span className="opacity-40">/</span>
//             <span className="text-black">COLLECTION</span>
//           </div>
//           <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-black mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '500' }}>
//             {searchTerm ? `Results for "${searchTerm}"` : 'The Collection'}
//           </h1>
//           <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto font-light leading-relaxed">
//             Curated precision and uncompromising audio. Discover our complete range of premium equipment designed for the ultimate listening experience.
//           </p>
//         </motion.div>
//       </div>

//       <main className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 py-12 flex flex-col lg:flex-row gap-10 xl:gap-16">

//         {/* Mobile Filter Toggle */}
//         <button 
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           className="lg:hidden flex items-center justify-center gap-2 bg-black text-white py-4 rounded-full w-full text-[11px] font-bold uppercase tracking-widest shadow-lg sticky top-20 z-40"
//         >
//           <Filter size={16} /> Filters & Sorting
//         </button>

//         {/* ── INTERACTIVE GLASSMORPHISM SIDEBAR ── */}
//         <aside className={`w-full lg:w-[280px] xl:w-[300px] shrink-0 lg:block ${isSidebarOpen ? 'block' : 'hidden'}`}>
//           <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-6 lg:sticky lg:top-28 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">

//             <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
//               <h3 className="text-[13px] font-bold text-black uppercase tracking-[0.2em]">Filters</h3>
//               {(selectedCategories.length > 0 || selectedBrands.length > 0 || searchTerm || inStockOnly || priceRange.max < maxPriceLimit) && (
//                 <button onClick={clearFilters} className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors flex items-center gap-1">
//                   <X size={12}/> Clear All
//                 </button>
//               )}
//             </div>

//             {/* Search */}
//             <div className="mb-8">
//               <div className="relative group">
//                 <input 
//                   type="text" 
//                   placeholder="Search collection..." 
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full bg-[#f4f4f4] border border-transparent rounded-xl py-3.5 px-4 pl-11 text-[13px] focus:outline-none focus:border-black focus:bg-white transition-all shadow-inner"
//                 />
//                 <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
//               </div>
//             </div>

//             {/* Categories Accordion */}
//             <div className="mb-6 border-b border-gray-100 pb-6">
//               <button onClick={() => setIsCatOpen(!isCatOpen)} className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.15em] text-black mb-4 cursor-pointer group">
//                 Category
//                 <motion.div animate={{ rotate: isCatOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
//                   <ChevronDown size={14} className="text-gray-400 group-hover:text-black transition-colors"/>
//                 </motion.div>
//               </button>
//               <AnimatePresence>
//                 {isCatOpen && (
//                   <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
//                     <div className="flex flex-col gap-4 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar pt-2">
//                       {allCategories.map(cat => (
//                         <label key={cat} className="flex items-center gap-4 cursor-pointer group">
//                           <div className={`w-4 h-4 rounded-md flex items-center justify-center transition-all duration-300 border ${selectedCategories.includes(cat) ? 'bg-black border-black' : 'border-gray-300 group-hover:border-black bg-white'}`}>
//                             <AnimatePresence>
//                               {selectedCategories.includes(cat) && (
//                                 <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
//                                   <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                                 </motion.svg>
//                               )}
//                             </AnimatePresence>
//                           </div>
//                           <span className={`text-[13px] capitalize transition-colors ${selectedCategories.includes(cat) ? 'font-semibold text-black' : 'text-gray-500 group-hover:text-black'}`}>{cat}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Brands Accordion */}
//             <div className="mb-6 border-b border-gray-100 pb-6">
//               <button onClick={() => setIsBrandOpen(!isBrandOpen)} className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.15em] text-black mb-4 cursor-pointer group">
//                 Brand
//                 <motion.div animate={{ rotate: isBrandOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
//                   <ChevronDown size={14} className="text-gray-400 group-hover:text-black transition-colors"/>
//                 </motion.div>
//               </button>
//               <AnimatePresence>
//                 {isBrandOpen && (
//                   <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
//                     <div className="flex flex-col gap-4 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar pt-2">
//                       {allBrands.map(brand => (
//                         <label key={brand} className="flex items-center gap-4 cursor-pointer group">
//                           <div className={`w-4 h-4 rounded-md flex items-center justify-center transition-all duration-300 border ${selectedBrands.includes(brand) ? 'bg-black border-black' : 'border-gray-300 group-hover:border-black bg-white'}`}>
//                             <AnimatePresence>
//                               {selectedBrands.includes(brand) && (
//                                 <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
//                                   <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                                 </motion.svg>
//                               )}
//                             </AnimatePresence>
//                           </div>
//                           <span className={`text-[13px] uppercase tracking-wide transition-colors ${selectedBrands.includes(brand) ? 'font-semibold text-black' : 'text-gray-500 group-hover:text-black'}`}>{brand}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Price Limit Accordion */}
//             <div className="mb-6 border-b border-gray-100 pb-6">
//               <button onClick={() => setIsPriceOpen(!isPriceOpen)} className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.15em] text-black mb-4 cursor-pointer group">
//                 Price Range
//                 <motion.div animate={{ rotate: isPriceOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
//                   <ChevronDown size={14} className="text-gray-400 group-hover:text-black transition-colors"/>
//                 </motion.div>
//               </button>
//               <AnimatePresence>
//                 {isPriceOpen && (
//                   <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pt-2">
//                     <div className="flex items-center justify-between mb-4 text-[13px] font-semibold text-black bg-[#f4f4f4] px-4 py-2 rounded-lg">
//                       <span className="text-gray-400 font-normal">Max:</span>
//                       <span>₹{priceRange.max.toLocaleString()}</span>
//                     </div>
//                     <input 
//                       type="range" 
//                       min="0" 
//                       max={maxPriceLimit} 
//                       value={priceRange.max} 
//                       onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
//                       className="w-full h-[4px] bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black hover:h-[6px] transition-all"
//                     />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* In Stock */}
//             <div className="pt-2">
//               <label className="flex items-center justify-between cursor-pointer group">
//                 <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-black group-hover:text-gray-600 transition-colors">In Stock Only</span>
//                 <div className={`w-11 h-6 rounded-full relative transition-colors duration-400 shadow-inner ${inStockOnly ? 'bg-black' : 'bg-[#e5e5e5]'}`}>
//                    <input type="checkbox" className="hidden" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
//                    <motion.div 
//                      layout
//                      transition={{ type: "spring", stiffness: 700, damping: 30 }}
//                      className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm ${inStockOnly ? 'left-6' : 'left-1'}`}
//                    />
//                 </div>
//               </label>
//             </div>

//           </div>
//         </aside>

//         {/* ── RIGHT PRODUCT GRID (WITH ANIMATED SHUFFLING) ── */}
//         <div className="flex-1 w-full flex flex-col">

//           {/* Top Bar (Count & Sort) */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-gray-100 gap-4">
//             <p className="text-[13px] font-medium text-gray-400">
//               Showing <span className="text-black font-bold mx-1">{filteredProducts.length}</span> masterpieces
//             </p>

//             <div className="relative group bg-white border border-gray-200 rounded-full hover:border-black transition-colors px-2 shadow-sm">
//               <select 
//                 value={sortOrder} 
//                 onChange={(e) => setSortOrder(e.target.value)}
//                 className="appearance-none bg-transparent border-none py-2.5 pl-4 pr-8 text-[11px] font-bold uppercase tracking-widest text-black focus:outline-none cursor-pointer"
//               >
//                 <option value="best-selling">Sort by: Best Selling</option>
//                 <option value="price-asc">Price: Low to High</option>
//                 <option value="price-desc">Price: High to Low</option>
//               </select>
//               <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-black pointer-events-none" />
//             </div>
// //           </div>

//           {/* Grid */}
//           {loading ? (
//             <div className="w-full py-40 flex flex-col items-center gap-6">
//                <div className="w-8 h-8 border-[3px] border-gray-200 border-t-black rounded-full animate-spin"></div>
//                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400">Loading Collection...</p>
//             </div>
//           ) : (
//             <motion.div 
//               layout 
//               className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 gap-y-12"
//             >
//               <AnimatePresence>
//                 {filteredProducts.length > 0 ? (
//                   filteredProducts.map(p => (
//                     <motion.div 
//                       key={p._id} 
//                       layout
//                       initial={{ opacity: 0, scale: 0.9 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       exit={{ opacity: 0, scale: 0.9 }}
//                       transition={{ duration: 0.4, ease: "easeOut" }}
//                     >
//                       <ShopProductCard product={p} onQuickView={setSelectedProduct} />
//                     </motion.div>
//                   ))
//                 ) : (
//                   <motion.div 
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="col-span-full text-center py-40 bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]"
//                   >
//                     <p className="text-gray-400 font-serif text-2xl mb-8 italic">No pieces match your current refinement.</p>
//                     <button onClick={clearFilters} className="bg-black text-white px-10 py-4 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-gray-800 transition-all cursor-pointer shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
//                       Clear Refinements
//                     </button>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           )}
//         </div>
//       </main>

//       {selectedProduct && <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
//       <Footer />
//     </div>
//   );
// }

// import React, { useState, useEffect, useMemo } from 'react';
// import axiosInstance from '../../utils/axiosInstance';
// import ShopProductCard from './ShopProductCard';
// import QuickViewModal from '../Product/ProductDetailModel';
// import Footer from '../Home/Footer';
// import Header1 from '../Home/Header1';
// import Toast from '../../components/Toast';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Filter, Search, ChevronDown, ChevronUp, X } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// export default function NewCollection() {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [toastMessage, setToastMessage] = useState(null);
//     const location = useLocation();
//     const navigate = useNavigate();

//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedCategories, setSelectedCategories] = useState([]);
//     const [selectedBrands, setSelectedBrands] = useState([]);
//     const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
//     const [maxPriceLimit, setMaxPriceLimit] = useState(100000);

//     const [sortOrder, setSortOrder] = useState('best-selling');
//     const [inStockOnly, setInStockOnly] = useState(false);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//     // Accordion states for filters
//     const [isCatOpen, setIsCatOpen] = useState(true);
//     const [isBrandOpen, setIsBrandOpen] = useState(true);
//     const [isPriceOpen, setIsPriceOpen] = useState(true);

//     useEffect(() => {
//         const fetchAllProducts = async () => {
//             try {
//                 setLoading(true);
//                 const { data } = await axiosInstance.get(`/products`);
//                 if (data.success) {
//                     setProducts(data.products);
//                     const validPrices = data.products.map(p => p.price).filter(p => typeof p === 'number');
//                     const maxP = validPrices.length > 0 ? Math.max(...validPrices) : 100000;
//                     setMaxPriceLimit(maxP);
//                     setPriceRange({ min: 0, max: maxP });
//                 }
//             } catch (e) {
//                 console.error(e);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchAllProducts();
//     }, []);

//     // Unique filtering for Categories & Brands with proper trimming
//     const allCategories = useMemo(() => {
//         const cats = products.map(p => p.category ? p.category.trim() : null).filter(Boolean);
//         return [...new Set(cats)];
//     }, [products]);

//     const allBrands = useMemo(() => {
//         const brnds = products.map(p => p.brand ? p.brand.trim() : null).filter(Boolean);
//         return [...new Set(brnds)];
//     }, [products]);

//     useEffect(() => {
//         if (location.state && !location.state.processed) {
//             if (location.state.categories) {
//                 setSelectedCategories(location.state.categories);
//                 setSearchTerm('');
//             } else if (location.state.category) {
//                 setSelectedCategories([location.state.category]);
//                 setSearchTerm('');
//             }
//             if (location.state.search) {
//                 setSearchTerm(location.state.search);
//                 if (!location.state.categories) setSelectedCategories([]);
//             }
//             navigate(location.pathname, { replace: true, state: { ...location.state, processed: true } });
//         }
//     }, [location.state, navigate]);

//     // Clear All function
//     const clearFilters = () => {
//         setSelectedCategories([]);
//         setSelectedBrands([]);
//         setSearchTerm('');
//         setPriceRange({ min: 0, max: maxPriceLimit });
//         setInStockOnly(false);
//         setSortOrder('best-selling');
//     };

//     // BULLETPROOF FILTER LOGIC
//     const filteredProducts = useMemo(() => {
//         return products.filter(p => {
//             const pCatStr = p.category ? p.category.toLowerCase().trim() : '';
//             const pBrandStr = p.brand ? p.brand.toLowerCase().trim() : '';

//             const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(c => c.toLowerCase().trim() === pCatStr);
//             const matchesBrand = selectedBrands.length === 0 || selectedBrands.some(b => b.toLowerCase().trim() === pBrandStr);

//             const query = searchTerm.toLowerCase().trim();
//             let matchesSearch = true;

//             if (query) {
//                 const pName = p.name?.toLowerCase() || '';
//                 if (query === 'smartwatch' || query === 'smartwatches') {
//                     matchesSearch = ['smartwatch', 'luxury', 'hybrid', 'rugged', 'health'].some(word => pCatStr.includes(word) || pName.includes(word));
//                 } else if (query === 'soundbar' || query === 'soundbars') {
//                     if (pName.includes('heston 60') || pName.includes('heston 120')) {
//                         matchesSearch = true;
//                     } else if (pName.includes('heston 200')) {
//                         matchesSearch = false;
//                     } else {
//                         matchesSearch = pCatStr.includes('soundbar') || pName.includes('soundbar');
//                     }
//                 } else if (query === 'subwoofer' || query === 'subwoofers') {
//                     if (pName.includes('heston 200')) {
//                         matchesSearch = true;
//                     } else if (pName.includes('heston 60') || pName.includes('heston 120')) {
//                         matchesSearch = false;
//                     } else {
//                         matchesSearch = pCatStr.includes('subwoofer') || pName.includes('subwoofer');
//                     }
//                 } else {
//                     matchesSearch = pName.includes(query) || pBrandStr.includes(query) || pCatStr.includes(query);
//                 }
//             }

//             const currentPrice = p.flashDeal?.isActive ? p.flashDeal.dealPrice : (p.price - (p.discountPrice || 0));
//             const matchesStock = inStockOnly ? p.stock > 0 : true;

//             return matchesCategory && matchesBrand && matchesSearch && currentPrice >= priceRange.min && currentPrice <= priceRange.max && matchesStock;
//         }).sort((a, b) => {
//             const priceA = a.flashDeal?.isActive ? a.flashDeal.dealPrice : (a.price - (a.discountPrice || 0));
//             const priceB = b.flashDeal?.isActive ? b.flashDeal.dealPrice : (b.price - (b.discountPrice || 0));
//             if (sortOrder === 'price-asc') return priceA - priceB;
//             if (sortOrder === 'price-desc') return priceB - priceA;
//             return 0;
//         });
//     }, [products, selectedCategories, selectedBrands, searchTerm, priceRange, sortOrder, inStockOnly]);

//     return (
//         <div className="min-h-screen bg-[#fafafa] font-sans text-[#111]">
//             <Header1 />
//             <Toast toast={toastMessage} onClose={() => setToastMessage(null)} />

//             {/* ── LUXURY HERO HEADER ── */}
//             <div className="w-full bg-white border-b border-gray-100 pt-16 pb-12 px-6 md:px-12 relative overflow-hidden">
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.8, ease: "easeOut" }}
//                     className="max-w-[1600px] mx-auto flex flex-col items-center text-center relative z-10"
//                 >
//                     <div className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 text-gray-400 flex items-center justify-center gap-2">
//                         <Link to="/" className="hover:text-black transition-colors">HOME</Link>
//                         <span className="opacity-40">/</span>
//                         <span className="text-black">COLLECTION</span>
//                     </div>
//                     <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-black mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '500' }}>
//                         {searchTerm ? `Results for "${searchTerm}"` : 'The Collection'}
//                     </h1>
//                 </motion.div>
//             </div>
            
//             <main className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 py-12 flex flex-col lg:flex-row items-start gap-10 xl:gap-16">
                 
//                 {/* Mobile Filter Toggle - Text Changes on Click */}
//                 <button
//                     onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                     className="lg:hidden flex items-center justify-center gap-2 bg-black text-white py-4 rounded-full w-full text-[11px] font-bold uppercase tracking-widest shadow-lg mb-8"
//                 >
//                     {isSidebarOpen ? (
//                         <><X size={19} />  filter Close</>
//                     ) : (
//                         <><Filter size={19} /> Filters & Sorting</>
//                     )}
//                 </button>

//                 {/* ── INTERACTIVE SIDEBAR ── */}
//                 <aside className={`w-full lg:w-[280px] xl:w-[350px] shrink-0 lg:block lg:sticky lg:top-[120px] lg:self-start z-30 ${isSidebarOpen ? 'block' : 'hidden'}`}>
//                     <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-full">

//                         {/* Clear All Button */}
//                         <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
//                             <div className="flex items-center gap-3">
//                                 <Filter size={18} className="text-yellow-600" />
//                                 <div>
//                                     <h3 className="font-bold text-sm uppercase">Filters</h3>
//                                     <p className="text-[10px] text-gray-400 uppercase tracking-widest">Refine your list</p>
//                                 </div>
//                             </div>
                            
//                             {(selectedCategories.length > 0 || selectedBrands.length > 0 || searchTerm || inStockOnly || priceRange.max !== maxPriceLimit) && (
//                                 <button 
//                                     onClick={clearFilters}
//                                     className="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-black transition-colors underline decoration-gray-300 underline-offset-2"
//                                 >
//                                     Clear All
//                                 </button>
//                             )}
//                         </div>

//                         {/* Search */}
//                         <div className="mb-8">
//                             <div className="relative group">
//                                 <input
//                                     type="text"
//                                     placeholder="Search collection..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                     className="w-full bg-[#f4f4f4] border border-transparent rounded-xl py-3.5 px-4 pl-11 text-[13px] focus:outline-none focus:border-black focus:bg-white transition-all shadow-inner"
//                                 />
//                                 <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
//                             </div>
//                         </div>

//                         {/* Categories Accordion */}
//                         <div className="mb-6 border-b border-gray-100 pb-6">
//                             <button onClick={() => setIsCatOpen(!isCatOpen)} className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.15em] text-black mb-4 cursor-pointer group">
//                                 Category {isCatOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
//                             </button>
//                             {isCatOpen && (
//                                 <div className="flex flex-col gap-4 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar pt-2">
//                                     {allCategories.map(cat => (
//                                         <label key={cat} className="flex items-center gap-4 cursor-pointer group">
//                                             <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])} className="accent-black w-4 h-4" />
//                                             <span className={`text-[13px] capitalize transition-colors ${selectedCategories.includes(cat) ? 'font-semibold text-black' : 'text-gray-500'}`}>{cat}</span>
//                                         </label>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>

//                         {/* Brands Accordion */}
//                         <div className="mb-6 border-b border-gray-100 pb-6">
//                             <button onClick={() => setIsBrandOpen(!isBrandOpen)} className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.15em] text-black mb-4 cursor-pointer group">
//                                 Brand {isBrandOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
//                             </button>
//                             {isBrandOpen && (
//                                 <div className="flex flex-col gap-4 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar pt-2">
//                                     {allBrands.map(brand => (
//                                         <label key={brand} className="flex items-center gap-4 cursor-pointer group">
//                                             <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand])} className="accent-black w-4 h-4" />
//                                             <span className={`text-[13px] uppercase transition-colors ${selectedBrands.includes(brand) ? 'font-semibold text-black' : 'text-gray-500'}`}>{brand}</span>
//                                         </label>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>

//                         {/* Price Limit */}
//                         <div className="mb-6">
//                             <button onClick={() => setIsPriceOpen(!isPriceOpen)} className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.15em] text-black mb-4 cursor-pointer group">
//                                 Price Range {isPriceOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
//                             </button>
//                             {isPriceOpen && (
//                                 <div className="pt-2">
//                                     <div className="flex items-center justify-between mb-4 text-[13px] font-semibold text-black bg-[#f4f4f4] px-4 py-2 rounded-lg">
//                                         <span className="text-gray-400 font-normal">Max:</span>
//                                         <span>₹{priceRange.max.toLocaleString()}</span>
//                                     </div>
//                                     <input
//                                         type="range"
//                                         min="0"
//                                         max={maxPriceLimit}
//                                         value={priceRange.max}
//                                         onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
//                                         className="w-full h-[4px] bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black hover:h-[6px] transition-all"
//                                     />
//                                 </div>
//                             )}
//                         </div>

//                         {/* In Stock */}
//                         <div className="pt-2">
//                             <label className="flex items-center justify-between cursor-pointer group">
//                                 <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-black">In Stock Only</span>
//                                 <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="accent-black w-5 h-5" />
//                             </label>
//                         </div>
//                     </div>
//                 </aside>

//                 {/* ── RIGHT PRODUCT GRID ── */}
//                 <div className="flex-1 w-full flex flex-col">
//                     <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-gray-100 gap-4">
//                         <p className="text-[13px] font-medium text-gray-400">
//                             Showing <span className="text-black font-bold mx-1">{filteredProducts.length}</span> masterpieces
//                         </p>
//                         <select
//                             value={sortOrder}
//                             onChange={(e) => setSortOrder(e.target.value)}
//                             className="bg-transparent border-none text-[11px] font-bold uppercase tracking-widest text-black focus:outline-none cursor-pointer"
//                         >
//                             <option value="best-selling">Sort by: Best Selling</option>
//                             <option value="price-asc">Price: Low to High</option>
//                             <option value="price-desc">Price: High to Low</option>
//                         </select>
//                     </div>

//                     {loading ? (
//                         <div className="py-20 text-center">Loading...</div>
//                     ) : (
//                         <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                             {filteredProducts.map(p => (
//                                 <ShopProductCard key={p._id} product={p} onQuickView={setSelectedProduct} />
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </main>

//             {selectedProduct && <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
//             <Footer />
//         </div>
//     );
// }

import React, { useState, useEffect, useMemo } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import ShopProductCard from './ShopProductCard';
import QuickViewModal from '../Product/ProductDetailModel';
import Footer from '../Home/Footer';
import Header1 from '../Home/Header1';
import Toast from '../../components/Toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Filter, Search, ChevronDown, ChevronUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NewCollection() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    
    // ⚡ FIX: Price state
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
    const [maxPriceLimit, setMaxPriceLimit] = useState(100000);

    const [sortOrder, setSortOrder] = useState('best-selling');
    const [inStockOnly, setInStockOnly] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Accordion states
    const [isCatOpen, setIsCatOpen] = useState(true);
    const [isBrandOpen, setIsBrandOpen] = useState(true);
    const [isPriceOpen, setIsPriceOpen] = useState(true);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                setLoading(true);
                const { data } = await axiosInstance.get(`/products`);
                if (data.success) {
                    setProducts(data.products);
                    const validPrices = data.products.map(p => p.price).filter(p => typeof p === 'number');
                    const maxP = validPrices.length > 0 ? Math.max(...validPrices) : 100000;
                    setMaxPriceLimit(maxP);
                    setPriceRange({ min: 0, max: maxP });
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchAllProducts();
    }, []);

    const allCategories = useMemo(() => {
        const cats = products.map(p => p.category ? p.category.trim() : null).filter(Boolean);
        return [...new Set(cats)];
    }, [products]);

    const allBrands = useMemo(() => {
        const brnds = products.map(p => p.brand ? p.brand.trim() : null).filter(Boolean);
        return [...new Set(brnds)];
    }, [products]);

    useEffect(() => {
        if (location.state && !location.state.processed) {
            if (location.state.categories) {
                setSelectedCategories(location.state.categories);
                setSearchTerm('');
            } else if (location.state.category) {
                setSelectedCategories([location.state.category]);
                setSearchTerm('');
            }
            if (location.state.search) {
                setSearchTerm(location.state.search);
                if (!location.state.categories) setSelectedCategories([]);
            }
            navigate(location.pathname, { replace: true, state: { ...location.state, processed: true } });
        }
    }, [location.state, navigate]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategories, selectedBrands, searchTerm, priceRange, sortOrder, inStockOnly]);

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setSearchTerm('');
        setPriceRange({ min: 0, max: maxPriceLimit });
        setInStockOnly(false);
        setSortOrder('best-selling');
    };

    // ⚡ FIX: Bulletproof Price Logic Added Here
    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const pCatStr = p.category ? p.category.toLowerCase().trim() : '';
            const pBrandStr = p.brand ? p.brand.toLowerCase().trim() : '';

            const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(c => c.toLowerCase().trim() === pCatStr);
            const matchesBrand = selectedBrands.length === 0 || selectedBrands.some(b => b.toLowerCase().trim() === pBrandStr);

            const query = searchTerm.toLowerCase().trim();
            let matchesSearch = true;

            if (query) {
                const pName = p.name?.toLowerCase() || '';
                if (query === 'smartwatch' || query === 'smartwatches') {
                    matchesSearch = ['smartwatch', 'luxury', 'hybrid', 'rugged', 'health'].some(word => pCatStr.includes(word) || pName.includes(word));
                } else if (query === 'soundbar' || query === 'soundbars') {
                    if (pName.includes('heston 60') || pName.includes('heston 120')) {
                        matchesSearch = true;
                    } else if (pName.includes('heston 200')) {
                        matchesSearch = false;
                    } else {
                        matchesSearch = pCatStr.includes('soundbar') || pName.includes('soundbar');
                    }
                } else if (query === 'subwoofer' || query === 'subwoofers') {
                    if (pName.includes('heston 200')) {
                        matchesSearch = true;
                    } else if (pName.includes('heston 60') || pName.includes('heston 120')) {
                        matchesSearch = false;
                    } else {
                        matchesSearch = pCatStr.includes('subwoofer') || pName.includes('subwoofer');
                    }
                } else {
                    matchesSearch = pName.includes(query) || pBrandStr.includes(query) || pCatStr.includes(query);
                }
            }

            // Price Calculation safely handling empty inputs
            const currentPrice = Number(p.flashDeal?.isActive ? p.flashDeal.dealPrice : (p.price - (p.discountPrice || 0)));
            const minPrice = priceRange.min === '' ? 0 : Number(priceRange.min);
            const maxPrice = priceRange.max === '' ? maxPriceLimit : Number(priceRange.max);

            const matchesStock = inStockOnly ? p.stock > 0 : true;

            return matchesCategory && matchesBrand && matchesSearch && currentPrice >= minPrice && currentPrice <= maxPrice && matchesStock;
        }).sort((a, b) => {
            const priceA = a.flashDeal?.isActive ? a.flashDeal.dealPrice : (a.price - (a.discountPrice || 0));
            const priceB = b.flashDeal?.isActive ? b.flashDeal.dealPrice : (b.price - (b.discountPrice || 0));
            if (sortOrder === 'price-asc') return priceA - priceB;
            if (sortOrder === 'price-desc') return priceB - priceA;
            return 0;
        });
    }, [products, selectedCategories, selectedBrands, searchTerm, priceRange, sortOrder, inStockOnly, maxPriceLimit]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const getPageNumbers = () => {
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, start + 3);
        if (end - start < 3) start = Math.max(1, end - 3);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    return (
        <div className="min-h-screen bg-[#fafafa] font-sans text-[#111]">
            <Header1 />
            <Toast toast={toastMessage} onClose={() => setToastMessage(null)} />

            <div className="w-full bg-white border-b border-gray-100 pt-16 pb-12 px-6 md:px-12 relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-[1600px] mx-auto flex flex-col items-center text-center relative z-10"
                >
                    <div className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 text-gray-400 flex items-center justify-center gap-2">
                        <Link to="/" className="hover:text-black transition-colors">HOME</Link>
                        <span className="opacity-40">/</span>
                        <span className="text-black">COLLECTION</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight text-black mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: '500' }}>
                        {searchTerm ? `Results for "${searchTerm}"` : 'The Collection'}
                    </h1>
                </motion.div>
            </div>
            
            <main className="relative w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 py-12 flex flex-col lg:flex-row items-start gap-10 xl:gap-16">
                 
                <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[85%] max-w-[300px]">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="flex items-center justify-center gap-2 bg-[#111] text-white py-3.5 rounded-full w-full text-[11px] font-bold uppercase tracking-widest shadow-[0_10px_30px_rgba(0,0,0,0.4)] border border-gray-800 transition-all active:scale-95"
                    >
                        {isSidebarOpen ? <X size={18} /> : <Filter size={18} />}
                        <span className="mt-[2px]">{isSidebarOpen ? 'Close' : 'Filters & Sorting'}</span>
                    </button>
                </div>

                <aside className={`lg:w-[280px] xl:w-[300px] shrink-0 lg:block lg:sticky lg:top-[120px] lg:self-start lg:z-30 lg:relative lg:inset-auto lg:bg-transparent lg:p-0 ${isSidebarOpen ? 'fixed inset-0 z-[60] bg-[#fafafa] overflow-y-auto p-4 pb-28 block w-full' : 'hidden'}`}>
                    <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-6 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-full">

                        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                            <div className="flex items-center gap-3">
                                <Filter size={18} className="text-orange-600" />
                                <div>
                                    <h3 className="font-bold text-sm uppercase">Filters</h3>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Refine your list</p>
                                </div>
                            </div>
                            
                            {(selectedCategories.length > 0 || selectedBrands.length > 0 || searchTerm || inStockOnly || priceRange.max !== maxPriceLimit || priceRange.min > 0) && (
                                <button 
                                    onClick={clearFilters}
                                    className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors underline decoration-gray-300 underline-offset-2"
                                >
                                    Clear All
                                </button>
                            )}
                        </div>

                        <div className="mb-8">
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Search collection..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-[#f4f4f4] border border-transparent rounded-xl py-3.5 px-4 pl-11 text-[13px] focus:outline-none focus:border-black focus:bg-white transition-all shadow-inner"
                                />
                                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                            </div>
                        </div>

                        <div className="mb-6 border-b border-gray-100 pb-6">
                            <button onClick={() => setIsCatOpen(!isCatOpen)} className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.15em] text-black mb-4 cursor-pointer group">
                                Category {isCatOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                            {isCatOpen && (
                                <div className="flex flex-col gap-4 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar pt-2">
                                    {allCategories.map(cat => (
                                        <label key={cat} className="flex items-center gap-4 cursor-pointer group">
                                            <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])} className="accent-black w-4 h-4" />
                                            <span className={`text-[13px] capitalize transition-colors ${selectedCategories.includes(cat) ? 'font-semibold text-black' : 'text-gray-500'}`}>{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="mb-6 border-b border-gray-100 pb-6">
                            <button onClick={() => setIsBrandOpen(!isBrandOpen)} className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.15em] text-black mb-4 cursor-pointer group">
                                Brand {isBrandOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                            {isBrandOpen && (
                                <div className="flex flex-col gap-4 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar pt-2">
                                    {allBrands.map(brand => (
                                        <label key={brand} className="flex items-center gap-4 cursor-pointer group">
                                            <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand])} className="accent-black w-4 h-4" />
                                            <span className={`text-[13px] uppercase transition-colors ${selectedBrands.includes(brand) ? 'font-semibold text-black' : 'text-gray-500'}`}>{brand}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ⚡ FIX: Perfect Working Price Range Filter ── */}
                        <div className="mb-6">
                            <button onClick={() => setIsPriceOpen(!isPriceOpen)} className="w-full flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.15em] text-black mb-4 cursor-pointer group">
                                Price Range {isPriceOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                            {isPriceOpen && (
                                <div className="pt-2 space-y-5">
                                    <input
                                        type="range"
                                        min="0"
                                        max={maxPriceLimit}
                                        value={priceRange.max === '' ? maxPriceLimit : priceRange.max}
                                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                        className="w-full h-[4px] bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black hover:h-[6px] transition-all"
                                    />
                                    
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="w-full">
                                            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Min (₹)</label>
                                            <input
                                                type="number"
                                                value={priceRange.min}
                                                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                                className="w-full bg-[#f4f4f4] border border-transparent rounded-lg py-2.5 px-3 text-[12px] font-semibold focus:outline-none focus:border-black focus:bg-white transition-all shadow-inner"
                                            />
                                        </div>
                                        <span className="text-gray-300 mt-5">-</span>
                                        <div className="w-full">
                                            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">Max (₹)</label>
                                            <input
                                                type="number"
                                                value={priceRange.max}
                                                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                                className="w-full bg-[#f4f4f4] border border-transparent rounded-lg py-2.5 px-3 text-[12px] font-semibold focus:outline-none focus:border-black focus:bg-white transition-all shadow-inner"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-2">
                            <label className="flex items-center justify-between cursor-pointer group">
                                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-black">In Stock Only</span>
                                <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="accent-black w-5 h-5" />
                            </label>
                        </div>
                    </div>
                </aside>

                <div className="flex-1 w-full flex flex-col">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-gray-100 gap-4">
                        <p className="text-[13px] font-medium text-gray-400">
                            Showing <span className="text-black font-bold mx-1">{filteredProducts.length}</span> masterpieces
                        </p>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="bg-transparent border-none text-[11px] font-bold uppercase tracking-widest text-black focus:outline-none cursor-pointer"
                        >
                            <option value="best-selling">Sort by: Best Selling</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                    </div>

                    {loading ? (
                        <div className="py-20 text-center">Loading...</div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {displayedProducts.map(p => (
                                    <ShopProductCard key={p._id} product={p} onQuickView={setSelectedProduct} />
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-3 mt-16 mb-24 lg:mb-8">
                                    {getPageNumbers().map(page => (
                                        <button
                                            key={page}
                                            onClick={() => {
                                                setCurrentPage(page);
                                                window.scrollTo({ top: 0, behavior: 'smooth' }); 
                                            }}
                                            className={`w-10 h-10 flex items-center justify-center rounded-full text-[13px] font-bold transition-all ${currentPage === page ? 'bg-black text-white shadow-md' : 'bg-[#f4f4f4] text-gray-500 hover:bg-gray-200'}`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            {selectedProduct && <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
            <Footer />
        </div>
    );
}
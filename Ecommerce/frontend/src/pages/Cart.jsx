
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Minus, Plus, Trash2, X, ShoppingBag, Gift, Tag, CheckCircle2 } from "lucide-react"; 
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import EarnCoinsBadge from "../components/rewards/EarnCoinsBadge";

export default function Cart({ isOpen, onClose, standalone = false }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [availableCoupons, setAvailableCoupons] = useState([]); // ⚡ NAYA STATE: Dynamic coupons ke liye
  const [userCoupons, setUserCoupons] = useState([]); // User ke personal coupons store karne ke liye
  const navigate = useNavigate();

  const showToast = (type, message) => setToastMessage({ type, message });

  // ⚡ NAYA FUNCTION: Backend se saare active coupons aur user profile dono check karega
  const fetchCouponsAndProfile = async () => {
    try {
      let fetchedUserCoupons = [];
      // 1. Fetch user profile coupons
      const profileRes = await axiosInstance.get('/auth/profile').catch(() => null);
      if (profileRes?.data?.success && profileRes?.data?.user?.coupons) {
          fetchedUserCoupons = profileRes.data.user.coupons;
          setUserCoupons(fetchedUserCoupons);
      }

      // 2. Fetch all active campaigns
      const couponsRes = await axiosInstance.get('/coupons/all').catch(() => null);
      if (couponsRes?.data?.coupons) {
        const now = new Date();
        const validCartCoupons = couponsRes.data.coupons.filter(c => {
          const isActive = c.status === 'Active';
          const isStarted = new Date(c.startDate) <= now;
          const isNotExpired = new Date(c.expiryDate) > now;
          const showOnCart = c.showOn && c.showOn.includes('Checkout Page'); // Cart me bhi 'Checkout Page' wale dikha sakte hain, ya admin me 'Cart Page' option add kar sakti ho. Abhi ke liye Checkout wale dikhayenge.
          
          if (!isActive || !isStarted || !isNotExpired || !showOnCart) return false;

          // Welcome Coupon strict check
          if (c.code === 'WELCOME500' || c.isFirstOrderOnly) {
            const hasAvailable = fetchedUserCoupons.some(
              uc => (uc.code === 'WELCOME500' || uc.code === c.code) && uc.status === 'Available'
            );
            if (!hasAvailable) return false;
          }
          return true;
        });

        // Fallback for welcome coupon
        const hasWelcomeAvailable = fetchedUserCoupons.some(uc => uc.code === 'WELCOME500' && uc.status === 'Available');
        if (hasWelcomeAvailable && !validCartCoupons.some(c => c.code === 'WELCOME500')) {
            validCartCoupons.push({
              code: 'WELCOME500',
              name: 'Welcome Coupon',
              description: 'Flat ₹500 OFF on your first order above ₹3000',
              discountType: 'flat',
              discountValue: 500,
              minOrderValue: 3000,
              maxOrderValue: 0,
              startDate: new Date(0),
              expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
              status: 'Active',
              isFirstOrderOnly: true,
              campaignType: 'Welcome Offer'
            });
        }
        setAvailableCoupons(validCartCoupons);
      }
    } catch (error) {
      console.error("Error fetching coupons", error);
    }
  };

  const fetchCart = async () => {
    try {
      const { data } = await axiosInstance.get("/cart");
      if (data && data.items) {
        const detailedItems = await Promise.all(
          data.items.map(async (item) => {
            try {
              const res = await axiosInstance.get(`/products/${item.product}`);
              return { ...item, productDetails: res.data.product };
            } catch (err) {
              return { ...item, productDetails: { name: "Unknown", price: 0, images: [] } };
            }
          })
        );
        setCartItems(detailedItems);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      if (error.response?.status !== 404) showToast("error", "Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen || standalone) {
      setLoading(true);
      fetchCart();
      fetchCouponsAndProfile();
    }
  }, [isOpen, standalone]);

  useEffect(() => {
    const handleCartUpdate = () => {
      if (isOpen || standalone) {
        fetchCart();
      }
    };
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, [isOpen, standalone]);

  const updateQuantity = async (productId, currentQuantity, change) => {
    try {
      if (change === 1) {
        await axiosInstance.put("/cart/update", { productId, quantity: currentQuantity + 1 });
      } else if (change === -1 && currentQuantity > 1) {
        await axiosInstance.put("/cart/update", { productId, quantity: currentQuantity - 1 });
      }
      fetchCart();
    } catch (error) {
      showToast("error", "Failed to update quantity");
    }
  };

  const removeItem = async (productId) => {
    try {
      await axiosInstance.put("/cart/update", { productId, quantity: 0 });
      fetchCart();
    } catch (error) {
      showToast("error", "Failed to remove item");
    }
  };

  const getItemPrice = (item) => {
    const product = item.productDetails;
    if (product?.discountPrice && product.discountPrice > 0) return product.price - product.discountPrice;
    return product?.price || 0;
  };

  const subtotal = cartItems.reduce((acc, curr) => acc + getItemPrice(curr) * curr.quantity, 0);

  const handleCheckout = () => {
    if (onClose) onClose();
    navigate("/checkout");
  };

  const handleClose = () => {
    if (onClose) onClose();
    else navigate('/shop');
  };

  if (!standalone && !isOpen) return null;

  const panel = (
    <div className={`bg-white flex flex-col font-sans ${
      standalone
        ? 'min-h-[50vh] max-w-3xl mx-auto w-full rounded-2xl border border-gray-100 shadow-lg my-8'
        : 'fixed top-0 right-0 h-full w-[90%] sm:w-[450px] shadow-2xl transition-transform duration-300 z-[9999999]'
    }`}>
        
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-3xl font-serif font-[600] text-black tracking-tight">Shopping Cart</h2>
          <button onClick={handleClose} className="text-black hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
          {loading ? (
             <div className="h-full flex items-center justify-center animate-pulse text-[#C8A253] font-serif">Curating your cart...</div>
          ) : cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <ShoppingBag className="w-16 h-16 text-gray-300" strokeWidth={1} />
              <p className="font-serif text-lg text-gray-500">Your cart is empty.</p>
              <button onClick={onClose} className="mt-4 uppercase text-xs font-bold tracking-widest border-b border-black pb-1 hover:text-gray-600">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item, index) => {
                const product = item.productDetails;
                const itemImage = product?.images?.[0]?.url || "https://placehold.co/200";
                const itemColor = product?.variants?.[0]?.attributes?.find(attr => attr.name.toLowerCase() === "color")?.value || "Standard";

                return (
                  <div key={`${item.product}-${index}`} className="flex gap-6 items-center relative py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors px-2">
                      <button onClick={() => removeItem(item.product)} className="absolute top-4 right-4 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition-colors z-10 w-8 h-8 flex items-center justify-center rounded-full shadow border border-red-200">
                         <Trash2 className="w-4 h-4" strokeWidth={2.5} />
                    </button>

                    <div className="w-[100px] h-[100px] bg-[#fdfdfd] flex-shrink-0 flex items-center justify-center p-2 rounded-sm border border-gray-100 shadow-sm">
                      <img src={itemImage} alt={product?.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-[15px] font-serif font-bold text-[#1a1a1a] leading-snug mb-1 pr-6">{product?.name || "Product Name"}</h4>
                      <p className="text-[12px] text-gray-500 mb-3 font-medium tracking-wide">Color : {itemColor}</p>
                      <span className="text-[15px] font-[600] text-[#111] mb-3">₹{getItemPrice(item).toLocaleString('en-IN')}</span>
                      
                      <div className="flex items-center w-max bg-[#f5f5f5] text-[#222] font-semibold text-[13px] px-1 py-1 rounded-[2px] shadow-inner mt-auto">
                        <button onClick={() => updateQuantity(item.product, item.quantity, -1)} className="px-2 hover:text-black">
                          <Minus className="w-3 h-3 hover:scale-110 transition-transform" />
                        </button>
                        <span className="w-6 text-center">{String(item.quantity).padStart(2, "0")}</span>
                        <button onClick={() => updateQuantity(item.product, item.quantity, 1)} className="px-2 hover:text-black">
                          <Plus className="w-3 h-3 hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {!loading && cartItems.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-6 bg-white relative z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
            
            {/* ⚡ PREMIUM UI: Dynamic Offers Notification in Cart */}
            {availableCoupons.length > 0 && (
                <div className="mb-5 border border-[#C8A253]/30 bg-[#FCFAEF] rounded p-3">
                    <h3 className="text-xs font-bold text-gray-800 mb-2 flex items-center gap-1">
                        <Tag size={14} className="text-[#C8A253]" /> OFFERS UNLOCKED
                    </h3>
                    <div className="space-y-2">
                        {availableCoupons.map(c => {
                            const isEligible = subtotal >= (c.minOrderValue || 0);
                            const amountNeeded = (c.minOrderValue || 0) - subtotal;
                            
                            return isEligible ? (
                                <div key={c.code} className="flex gap-2 items-start">
                                    <CheckCircle2 size={14} className="text-green-600 mt-0.5 shrink-0" />
                                    <p className="text-[11px] text-green-800 leading-tight">
                                        Use code <b className="text-black">{c.code}</b> at checkout to save {c.discountType === 'percentage' ? `${c.discountValue}%` : `₹${c.discountValue}`}!
                                    </p>
                                </div>
                            ) : (
                                <div key={c.code} className="flex gap-2 items-start opacity-75">
                                    <Gift size={14} className="text-[#C8A253] mt-0.5 shrink-0" />
                                    <p className="text-[11px] text-gray-600 leading-tight">
                                        Add <span className="font-bold text-black">₹{amountNeeded.toLocaleString('en-IN')}</span> more to unlock code <b>{c.code}</b>
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="flex items-center gap-3 mb-6 mt-4">
               <input type="checkbox" className="w-[18px] h-[18px] border-2 border-gray-300 rounded-[2px] text-black bg-white focus:ring-0 focus:ring-offset-0 cursor-pointer accent-black transition-all" />
               <span className="text-[13px] text-gray-500 tracking-wide font-medium">For <span className="font-bold text-[#111]">₹100</span> Please Wrap The Product</span>
            </div>

            <div className="flex justify-between items-center mb-4 border-t border-gray-200 pt-5">
              <span className="text-[17px] font-serif font-bold text-[#333] tracking-wide">Subtotal</span>
              <span className="text-[18px] font-bold text-black tracking-tight">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <EarnCoinsBadge amount={subtotal} className="mb-4" />
            
            <button onClick={handleCheckout} className="w-full bg-[#050505] text-white text-[12px] font-bold tracking-[0.2em] uppercase py-4 rounded-[4px] hover:bg-[#222] hover:shadow-lg transition-all active:scale-[0.99] mb-4">
              Checkout
            </button>
            {!standalone && (
            <div className="text-center">
               <button onClick={handleClose} className="text-[12px] font-bold text-gray-800 uppercase tracking-[0.1em] border-b-[1.5px] border-black pb-[2px] hover:text-gray-500 hover:border-gray-500 transition-colors">
                 Continue Shopping
               </button>
            </div>
            )}
          </div>
        )}
    </div>
  );

  if (standalone) {
    return (
      <>
        {toastMessage && <Toast type={toastMessage.type} message={toastMessage.message} onClose={() => setToastMessage(null)} />}
        <div className="px-4">{panel}</div>
      </>
    );
  }

  return createPortal(
    <>
      {toastMessage && <Toast type={toastMessage.type} message={toastMessage.message} onClose={() => setToastMessage(null)} />}
      <div className="fixed inset-0 z-[9999999]" style={{ pointerEvents: 'none' }}>
        <div className="fixed inset-0 bg-black/40 transition-opacity" style={{ pointerEvents: 'auto' }} onClick={handleClose} />
        <div style={{ pointerEvents: 'auto' }}>{panel}</div>
      </div>
    </>,
    document.body
  );
}
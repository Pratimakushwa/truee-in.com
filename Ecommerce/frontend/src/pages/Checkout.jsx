

// import React, { useState, useEffect } from 'react';
// import { Lock, ChevronDown, X, Tag, CheckCircle, Coins } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../utils/axiosInstance';
// import Toast from '../components/Toast';
// import TrustBar from '../components/trust/TrustBar';

// const indianStates = [
//   "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
//   "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
//   "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
//   "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", 
//   "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep", "Puducherry", 
//   "Jammu and Kashmir", "Ladakh"
// ];

// const CheckoutPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [paymentProcessing, setPaymentProcessing] = useState(false); 
//   const [toastMessage, setToastMessage] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState('razorpay');
  
//   const [savedAddresses, setSavedAddresses] = useState([]);
//   const [saveAddressForFuture, setSaveAddressForFuture] = useState(false);

//   // ⚡ COUPON STATES
//   const [userCoupons, setUserCoupons] = useState([]); 
//   const [availableCoupons, setAvailableCoupons] = useState([]);
//   const [showCouponsList, setShowCouponsList] = useState(false);
//   const [couponCode, setCouponCode] = useState('');
//   const [discount, setDiscount] = useState(0);
//   const [isCouponApplied, setIsCouponApplied] = useState(false);
//   const [couponMessage, setCouponMessage] = useState('');
//   const [couponError, setCouponError] = useState(''); // ⚡ NEW: Inline error ke liye

//   // Reward coins states
//   const [walletBalance, setWalletBalance] = useState(0);
//   const [rewardSettings, setRewardSettings] = useState(null);
//   const [useRewardCoins, setUseRewardCoins] = useState(false);
//   const [coinsToRedeem, setCoinsToRedeem] = useState(0);
//   const [estimatedEarn, setEstimatedEarn] = useState(0);

//   const [userDetails, setUserDetails] = useState({
//       userId: '', 
//       email: '',
//       firstName: '',
//       lastName: '',
//       countryCode: '+91', 
//       phone: '', 
//       country: 'India', 
//       state: '', 
//       address: '',
//       city: '',
//       postalCode: '' 
//   });

//   const navigate = useNavigate();

//   const showToast = (type, message) => setToastMessage({ type, message });

//   useEffect(() => {
//     const initializeCheckout = async () => {
//       setLoading(true);
//       try {
//         // 1. Fetch Cart Data
//         const cartRes = await axiosInstance.get("/cart").catch(() => null);
//         if (cartRes?.data?.items) {
//           const detailedItems = await Promise.all(
//             cartRes.data.items.map(async (item) => {
//               try {
//                 const res = await axiosInstance.get(`/products/${item.product}`);
//                 return { ...item, productDetails: res.data.product };
//               } catch (err) {
//                 return { ...item, productDetails: null };
//               }
//             })
//           );
//           setCartItems(detailedItems.filter(item => item.productDetails));
//         }

//         // 2. Fetch Profile & Personal Coupons
//         let fetchedUserCoupons = [];
//         const profileRes = await axiosInstance.get('/auth/profile').catch(() => null);
//         if (profileRes?.data?.success && profileRes?.data?.user) {
//           const userData = profileRes.data.user;
//           setUserDetails(prev => ({ 
//               ...prev, 
//               email: userData.email || prev.email,
//               userId: userData._id 
//           }));
          
//           if (userData.coupons) {
//             fetchedUserCoupons = userData.coupons;
//             setUserCoupons(fetchedUserCoupons);
//           }

//           if (userData.addresses && userData.addresses.length > 0) {
//             setSavedAddresses(userData.addresses);
//           }
//         }

//         // 3. Fetch All Active Campaigns & Filter Them
//         const couponsRes = await axiosInstance.get('/coupons/all').catch(() => null);
//         if (couponsRes?.data?.coupons) {
//           const now = new Date();
//           const validCheckoutCoupons = couponsRes.data.coupons.filter(c => {
//             const isActive = c.status === 'Active';
//             const isStarted = new Date(c.startDate) <= now;
//             const isNotExpired = new Date(c.expiryDate) > now;
//             const showOnCheckout = c.showOn && c.showOn.includes('Checkout Page');
            
//             if (!isActive || !isStarted || !isNotExpired || !showOnCheckout) return false;

//             if (c.code === 'WELCOME500' || c.isFirstOrderOnly) {
//               const hasAvailable = fetchedUserCoupons.some(
//                 uc => (uc.code === 'WELCOME500' || uc.code === c.code) && uc.status === 'Available'
//               );
//               if (!hasAvailable) return false;
//             }
//             return true;
//           });

//           const hasWelcomeAvailable = fetchedUserCoupons.some(
//             uc => uc.code === 'WELCOME500' && uc.status === 'Available'
//           );
//           if (hasWelcomeAvailable && !validCheckoutCoupons.some(c => c.code === 'WELCOME500')) {
//             validCheckoutCoupons.push({
//               code: 'WELCOME500',
//               name: 'Welcome Coupon',
//               description: 'Flat ₹500 OFF on your first order above ₹3000',
//               discountType: 'flat',
//               discountValue: 500,
//               minOrderValue: 3000,
//               maxOrderValue: 0,
//               startDate: new Date(0),
//               expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
//               status: 'Active',
//               isFirstOrderOnly: true,
//               showOn: ['Checkout Page'],
//               campaignType: 'Welcome Offer'
//             });
//           }

//           setAvailableCoupons(validCheckoutCoupons);
//         }

//         // Fetch wallet & reward settings
//         try {
//           const walletRes = await axiosInstance.get('/wallet');
//           if (walletRes?.data?.success) {
//             setWalletBalance(walletRes.data.wallet?.availableCoins || 0);
//             setRewardSettings(walletRes.data.settings);
//           }
//         } catch {
//           // Guest or not logged in — no wallet
//         }
//       } catch (error) {
//         showToast("error", "Failed to load checkout data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     initializeCheckout();
//   }, []);

//   const getItemPrice = (item) => {
//     const product = item.productDetails;
//     if (product?.discountPrice && product.discountPrice > 0) return product.price - product.discountPrice;
//     return product?.price || 0;
//   };

//   const updateQuantity = async (productId, currentQuantity, change) => {
//     try {
//       const newQuantity = currentQuantity + change;
//       if (newQuantity < 1) return;
      
//       await axiosInstance.put("/cart/update", { productId, quantity: newQuantity });
//       setCartItems(cartItems.map(item => 
//         item.product === productId ? { ...item, quantity: newQuantity } : item
//       ));
//       window.dispatchEvent(new Event('cartUpdated')); 
      
//       if (isCouponApplied) {
//           showToast("info", "Cart updated. Please re-apply coupon.");
//           setIsCouponApplied(false);
//           setDiscount(0);
//           setCouponCode('');
//       }
//     } catch (error) {
//       showToast("error", "Failed to update quantity");
//     }
//   };

//   const subtotal = cartItems.reduce((acc, curr) => acc + getItemPrice(curr) * curr.quantity, 0);
  
//   const finalTotal = subtotal - discount;
//   const maxRedeem = rewardSettings?.isRedeemEnabled
//     ? Math.min(walletBalance, rewardSettings?.maxRedeemPerOrder || 200, finalTotal)
//     : 0;
//   const payableTotal = Math.max(0, finalTotal - (useRewardCoins ? coinsToRedeem : 0));

//   useEffect(() => {
//     if (subtotal > 0) {
//       axiosInstance.get('/rewards/estimate', { params: { itemsTotal: subtotal, discountAmount: discount } })
//         .then(({ data }) => { if (data.success) setEstimatedEarn(data.estimatedCoins); })
//         .catch(() => {});
//     }
//   }, [subtotal, discount]);

//   const eligibleCoupons = availableCoupons.filter(c => subtotal >= (c.minOrderValue || 0));
//   const lockedCoupons = availableCoupons.filter(c => subtotal < (c.minOrderValue || 0));

//   // --- ⚡ UPDATED COUPON LOGIC START ---
//   const applyCoupon = async (codeToApply = couponCode) => {
//       if (!codeToApply) return;
//       try {
//           const { data } = await axiosInstance.post('/coupons/verify', { 
//               code: codeToApply, 
//               cartTotal: subtotal,
//               userId: userDetails.userId 
//           });
//           setDiscount(data.discountAmount);
//           setCouponCode(codeToApply);
//           setIsCouponApplied(true);
//           setCouponMessage(data.message || 'Coupon applied successfully!');
//           setCouponError(''); // ⚡ Error clear kar do agar successful ho gaya
//           showToast("success", "Coupon Applied Successfully!");
//           setShowCouponsList(false);
//       } catch (error) {
//           setDiscount(0);
//           setIsCouponApplied(false);
          
//           // ⚡ Yahan input field automatically clear ho jayegi
//           const errorMsg = error.response?.data?.message || "Invalid Coupon Code";
//           showToast("error", errorMsg);
//           setCouponError(errorMsg); 
//           setCouponCode(''); 
//       }
//   };
//   // --- UPDATED COUPON LOGIC END --

//   const removeCoupon = () => {
//       setIsCouponApplied(false);
//       setDiscount(0);
//       setCouponCode('');
//       setCouponMessage('');
//       setCouponError(''); // Remove karne par bhi error clear
//       showToast("info", "Coupon removed");
//   };

//   const loadRazorpayScript = () => {
//       return new Promise((resolve) => {
//           const script = document.createElement('script');
//           script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//           script.onload = () => resolve(true);
//           script.onerror = () => resolve(false);
//           document.body.appendChild(script);
//       });
//   };

//   const handleSavedAddressSelect = (e) => {
//       const selectedId = e.target.value;
//       const addr = savedAddresses.find(a => a._id === selectedId);
//       if (addr) {
//           setUserDetails({
//               ...userDetails,
//               firstName: addr.firstName || userDetails.firstName,
//               lastName: addr.lastName || userDetails.lastName,
//               address: addr.addressLine1 || addr.address || '',
//               city: addr.city || '',
//               state: addr.state || '',
//               postalCode: addr.pincode || addr.postalCode || '',
//               country: addr.country || 'India',
//           });
//       }
//   };

//   const handlePayment = async (e) => {
//     if (e) e.preventDefault();
    
//     if (cartItems.length === 0) return showToast("error", "Your cart is empty!");

//     const { email, firstName, lastName, countryCode, phone, country, state, address, city, postalCode } = userDetails;
    
//     let missingFields = [];
//     if (!email) missingFields.push("Email Address");
//     if (!firstName) missingFields.push("First Name");
//     if (!lastName) missingFields.push("Last Name");
//     if (!phone) missingFields.push("Phone Number");
//     if (!address) missingFields.push("Address Line 1");
//     if (!city) missingFields.push("City");
//     if (!state) missingFields.push("State");
//     if (!postalCode) missingFields.push("Postal Code");

//     if (missingFields.length > 0) {
//         const errorMsg = `Please fill in these missing details:\n- ${missingFields.join("\n- ")}`;
//         alert(errorMsg); 
//         showToast("error", "Please fill in all required fields!");
//         window.scrollTo({ top: 0, behavior: 'smooth' }); 
//         return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//         alert("Please enter a valid email address!");
//         return showToast("error", "Please enter a valid email address!");
//     }

//     setPaymentProcessing(true);

//     const fullPhoneNumber = `${countryCode} ${phone}`;
//     const fullName = `${firstName} ${lastName}`.trim();

//     if (saveAddressForFuture) {
//         try {
//             await axiosInstance.post('/auth/address', {
//                 firstName,
//                 lastName,
//                 phone: fullPhoneNumber,
//                 addressLine1: address,
//                 city,
//                 state,
//                 pincode: postalCode,
//                 country
//             });
//             console.log("Address saved successfully for future use.");
//         } catch (err) {
//             console.warn("Failed to save address for future use", err);
//         }
//     }

//     if (paymentMethod === 'cod') {
//         try {
//             const formattedItems = cartItems.map(item => ({
//                 product: item.product,
//                 name: item.productDetails.name,
//                 image: item.productDetails.images?.[0]?.url || "",
//                 price: getItemPrice(item),
//                 quantity: item.quantity
//             }));

//             const { data: orderData } = await axiosInstance.post("/payment/create-order", {
//                 amount: finalTotal,
//                 paymentMethod: 'cod',
//                 orderDetails: {
//                     email,
//                     items: formattedItems,
//                     itemsPrice: subtotal,
//                     totalAmount: finalTotal,
//                     payableAmount: payableTotal,
//                     shippingAddress: {
//                         fullName, phone: fullPhoneNumber, addressLine1: address,
//                         city, state, pincode: postalCode, country
//                     },
//                     couponApplied: isCouponApplied ? couponCode : null,
//                     discountAmount: discount,
//                     coinsToRedeem: useRewardCoins ? coinsToRedeem : 0,
//                 }
//             });

//             if (orderData.success) {
//                 showToast("success", "Order Placed Successfully!");
//                 setCartItems([]);
//                 window.dispatchEvent(new Event('cartUpdated'));
//                 setTimeout(() => navigate('/order-success', { state: { orderId: orderData.orderId, paymentMethod: 'cod', coinsEarned: orderData.coinsEarned || estimatedEarn } }), 1500);
//             } else {
//                 showToast("error", "Failed to place order. Please try again.");
//                 setPaymentProcessing(false);
//             }
//         } catch (error) {
//             console.error("COD order error:", error);
//             showToast("error", "Failed to place order. Please try again.");
//             setPaymentProcessing(false);
//         }
//         return;
//     }

//     try {
//         const isScriptLoaded = await loadRazorpayScript();
//         if (!isScriptLoaded) {
//             showToast('error', 'Razorpay SDK failed to load. Please check your internet connection.');
//             setPaymentProcessing(false);
//             return;
//         }

//         const formattedItems = cartItems.map(item => ({
//             product: item.product,
//             name: item.productDetails.name,
//             image: item.productDetails.images?.[0]?.url || "",
//             price: getItemPrice(item),
//             quantity: item.quantity
//         }));

//         const { data: orderData } = await axiosInstance.post("/payment/create-order", {
//             amount: finalTotal,
//             paymentMethod: 'razorpay',
//             orderDetails: {
//                 email,
//                 items: formattedItems,
//                 itemsPrice: subtotal,
//                 totalAmount: finalTotal,
//                 coinsToRedeem: useRewardCoins ? coinsToRedeem : 0,
//             }
//         });

//         if (!orderData.success) {
//             showToast('error', 'Failed to initialize payment gateway.');
//             setPaymentProcessing(false);
//             return;
//         }

//         const options = {
//             key: orderData.key_id, 
//             amount: orderData.order.amount, 
//             currency: orderData.order.currency,
//             name: "Truee Luxury", 
//             description: "Premium Purchase",
//             order_id: orderData.order.id,
//             handler: async function (response) {
//                 try {
//                     const verifyRes = await axiosInstance.post('/payment/verify-payment', {
//                         razorpay_order_id: response.razorpay_order_id,
//                         razorpay_payment_id: response.razorpay_payment_id,
//                         razorpay_signature: response.razorpay_signature,
//                         orderDetails: { 
//                             email,
//                             items: formattedItems, 
//                             itemsPrice: subtotal,
//                             totalAmount: finalTotal,
//                             payableAmount: payableTotal,
//                             shippingAddress: {
//                                 fullName, phone: fullPhoneNumber, addressLine1: address,
//                                 city, state, pincode: postalCode, country
//                             },
//                             couponApplied: isCouponApplied ? couponCode : null,
//                             discountAmount: discount,
//                             coinsToRedeem: useRewardCoins ? coinsToRedeem : 0,
//                         }
//                     });

//                     if (verifyRes.data.success) {
//                         showToast("success", "Payment Successful! Order Placed.");
//                         setCartItems([]);
//                         window.dispatchEvent(new Event('cartUpdated')); 
//                         setTimeout(() => navigate('/order-success', { state: { orderId: verifyRes.data.orderId, paymentMethod: 'razorpay', coinsEarned: verifyRes.data.coinsEarned || estimatedEarn } }), 1500); 
//                     }
//                 } catch (error) {
//                     console.error("Verification failed:", error);
//                     showToast("error", "Payment verification failed. Please contact support.");
//                     setPaymentProcessing(false);
//                 }
//             },
//             prefill: { name: fullName, email: email, contact: fullPhoneNumber },
//             theme: { color: "#000000" },
//             modal: {
//                 ondismiss: function() {
//                     setPaymentProcessing(false); 
//                     showToast("error", "Payment cancelled by user.");
//                 }
//             }
//         };

//         const razorpayObject = new window.Razorpay(options);
        
//         razorpayObject.on('payment.failed', function (response) {
//             showToast('error', `Payment Failed: ${response.error.description}`);
//             setPaymentProcessing(false);
//         });

//         razorpayObject.open();

//     } catch (error) {
//         console.error("Payment initiation error:", error);
//         showToast("error", "Something went wrong while starting payment.");
//         setPaymentProcessing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white p-4 md:p-8 font-sans text-gray-800">
//       {toastMessage && <Toast type={toastMessage.type} message={toastMessage.message} onClose={() => setToastMessage(null)} />}
      
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
//         {/* LEFT COLUMN */}
//         <div className="lg:col-span-7 space-y-10">
          
//           <section>
//             <div className="flex justify-between items-end mb-4">
//               <h2 className="text-3xl font-serif">Contact</h2>
//               <p className="text-sm">Not Have an account? <span onClick={() => navigate('/register')} className="text-blue-600 underline cursor-pointer hover:text-blue-800 transition-colors">Create Account</span></p>
//             </div>
            
//             <input 
//               type="email" 
//               placeholder="Email Address"
//               value={userDetails.email}
//               onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
//               className="w-full p-4 border border-gray-300 rounded-t bg-transparent focus:outline-none focus:ring-1 focus:ring-black"
//             />
            
//             <div className="flex w-full border border-gray-300 border-t-0 rounded-b focus-within:ring-1 focus-within:ring-black bg-transparent">
//               <select 
//                 value={userDetails.countryCode}
//                 onChange={(e) => setUserDetails({...userDetails, countryCode: e.target.value})}
//                 className="p-4 bg-transparent border-r border-gray-300 outline-none text-gray-700 cursor-pointer w-[110px] flex-shrink-0"
//               >
//                 <option value="+91">+91 (IN)</option>
//                 <option value="+1">+1 (US/CA)</option>
//                 <option value="+44">+44 (UK)</option>
//                 <option value="+61">+61 (AU)</option>
//                 <option value="+971">+971 (AE)</option>
//               </select>
//               <input 
//                 type="tel" 
//                 placeholder="Phone Number"
//                 value={userDetails.phone}
//                 onChange={(e) => setUserDetails({...userDetails, phone: e.target.value.replace(/\D/g, '')})}
//                 className="w-full p-4 bg-transparent focus:outline-none"
//               />
//             </div>
//           </section>

//           <section>
//             <div className="flex justify-between items-end mb-4">
//                <h2 className="text-3xl font-serif">Delivery</h2>
//             </div>

//             <div className="mb-6 relative border border-gray-300 rounded flex justify-between items-center bg-gray-50 shadow-sm">
//               <select 
//                 onChange={handleSavedAddressSelect}
//                 defaultValue=""
//                 className="w-full p-4 bg-transparent outline-none appearance-none text-black font-semibold cursor-pointer"
//               >
//                 <option value="" disabled>Choose from Saved Address...</option>
//                 {savedAddresses.length > 0 ? (
//                     savedAddresses.map((addr, idx) => (
//                        <option key={addr._id || idx} value={addr._id}>
//                          {addr.addressLine1}, {addr.city} - {addr.pincode || addr.postalCode}
//                        </option>
//                     ))
//                 ) : (
//                     <option value="none" disabled>No saved addresses found</option>
//                 )}
//               </select>
//               <div className="absolute right-4 pointer-events-none">
//                 <ChevronDown size={20} className="text-gray-500" />
//               </div>
//             </div>

//             <div className="space-y-0">
//               <div className="relative border border-gray-300 rounded-t p-0 flex justify-between items-center bg-transparent">
//                 <select 
//                     value={userDetails.country}
//                     onChange={(e) => setUserDetails({...userDetails, country: e.target.value})}
//                     className="w-full p-4 bg-transparent outline-none appearance-none text-gray-700 cursor-pointer"
//                 >
//                   <option value="" disabled className="text-gray-400">Country / Region</option>
//                   <option value="India">India</option>
//                   <option value="United States">United States</option>
//                   <option value="United Kingdom">United Kingdom</option>
//                 </select>
//                 <div className="absolute right-4 pointer-events-none">
//                   <ChevronDown size={20} className="text-gray-500" />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2">
//                 <input 
//                     type="text" 
//                     placeholder="First Name" 
//                     value={userDetails.firstName}
//                     onChange={(e) => setUserDetails({...userDetails, firstName: e.target.value})}
//                     className="p-4 border border-t-0 border-gray-300 focus:outline-none focus:ring-1 focus:ring-black relative" 
//                 />
//                 <input 
//                     type="text" 
//                     placeholder="Last Name" 
//                     value={userDetails.lastName}
//                     onChange={(e) => setUserDetails({...userDetails, lastName: e.target.value})}
//                     className="p-4 border border-t-0 border-l-0 border-gray-300 focus:outline-none focus:ring-1 focus:ring-black relative" 
//                 />
//               </div>

//               <input 
//                 type="text" 
//                 placeholder="Address Line 1" 
//                 value={userDetails.address}
//                 onChange={(e) => setUserDetails({...userDetails, address: e.target.value})}
//                 className="w-full p-4 border border-t-0 border-gray-300 focus:outline-none focus:ring-1 focus:ring-black relative" 
//               />

//               <div className="grid grid-cols-1 md:grid-cols-3">
//                 <input 
//                     type="text" 
//                     placeholder="City" 
//                     value={userDetails.city}
//                     onChange={(e) => setUserDetails({...userDetails, city: e.target.value})}
//                     className="p-4 border border-t-0 border-gray-300 md:rounded-bl focus:outline-none focus:ring-1 focus:ring-black relative" 
//                 />
                
//                 <div className="relative border border-t-0 md:border-l-0 border-gray-300 bg-transparent flex items-center focus-within:ring-1 focus-within:ring-black">
//                     <select 
//                         value={userDetails.state}
//                         onChange={(e) => setUserDetails({...userDetails, state: e.target.value})}
//                         className="w-full p-4 bg-transparent outline-none appearance-none text-gray-700 cursor-pointer"
//                     >
//                       <option value="" disabled>State</option>
//                       {indianStates.map(stateName => (
//                          <option key={stateName} value={stateName}>{stateName}</option>
//                       ))}
//                     </select>
//                     <div className="absolute right-4 pointer-events-none">
//                       <ChevronDown size={16} className="text-gray-400" />
//                     </div>
//                 </div>

//                 <input 
//                     type="text" 
//                     placeholder="Postal Code" 
//                     value={userDetails.postalCode}
//                     onChange={(e) => setUserDetails({...userDetails, postalCode: e.target.value})}
//                     className="p-4 border border-t-0 md:border-l-0 border-gray-300 rounded-b md:rounded-b-none md:rounded-br focus:outline-none focus:ring-1 focus:ring-black relative" 
//                 />
//               </div>
//             </div>

//             <div className="flex items-center mt-4 gap-2">
//               <input 
//                 type="checkbox" 
//                 id="save-info" 
//                 checked={saveAddressForFuture}
//                 onChange={(e) => setSaveAddressForFuture(e.target.checked)}
//                 className="w-4 h-4 accent-black border-gray-400 cursor-pointer" 
//               />
//               <label htmlFor="save-info" className="text-sm text-gray-600 font-medium cursor-pointer select-none">
//                 Save This Info For Future
//               </label>
//             </div>
//           </section>

//           <section>
//             <h2 className="text-3xl font-serif mb-4">Payment</h2>
//             <div className="border border-gray-300 rounded overflow-hidden">
//               <div className="relative border-b border-gray-300 flex justify-between items-center bg-white p-0">
//                 <select 
//                   value={paymentMethod}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                   className="w-full p-4 bg-transparent outline-none appearance-none text-black font-semibold cursor-pointer relative z-10"
//                 >
//                   <option value="razorpay">Razorpay (Cards / UPI / Netbanking)</option>
//                   <option value="cod">Cash on Delivery (COD)</option>
//                 </select>
//                 <div className="absolute right-4 flex gap-1 items-center z-0 pointer-events-none">
//                    <ChevronDown size={18} className="text-gray-500" />
//                 </div>
//               </div>
              
//               <div className="p-4 space-y-0 bg-gray-50 text-gray-600 font-medium text-sm text-center">
//                  {paymentMethod === 'razorpay' ? 'Secure payment processing via Razorpay gateway.' : 'Pay when your order is delivered to your doorstep.'}
//               </div>
//             </div>
//           </section>

//           <button 
//             type="button"
//             onClick={handlePayment}
//             disabled={paymentProcessing || loading || cartItems.length === 0}
//             className="w-full bg-black text-white py-4 rounded font-bold tracking-widest hover:bg-gray-900 transition-all uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-95"
//           >
//             {paymentProcessing ? "Processing..." : (paymentMethod === 'razorpay' ? `Pay ₹${payableTotal.toLocaleString('en-IN')}` : `Place Order ₹${payableTotal.toLocaleString('en-IN')}`)}
//           </button>
//         </div>

//         {/* RIGHT COLUMN */}
//         <div className="lg:col-span-5 border-l-0 lg:border-l border-gray-200 pl-0 lg:pl-12 mt-10 lg:mt-0">
//           <div className="flex justify-between items-center mb-10">
//             <h2 className="text-3xl font-serif">Shopping Cart</h2>
//             <X onClick={() => navigate('/shop')} size={24} className="cursor-pointer text-gray-400 hover:text-black transition-colors" title="Close" />
//           </div>

//           {loading ? (
//              <div className="h-full flex items-center justify-center animate-pulse text-[#C8A253] font-serif text-lg">Loading your cart...</div>
//           ) : cartItems.length === 0 ? (
//             <div className="flex flex-col items-center justify-center text-center space-y-4 py-8">
//               <p className="font-serif text-lg text-gray-500">Your cart is empty.</p>
//               <button onClick={() => navigate('/shop')} className="uppercase text-xs font-bold tracking-widest border-b border-black pb-1 hover:text-gray-600 transition-colors">
//                 Continue Shopping
//               </button>
//             </div>
//           ) : (
//             <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
//               {cartItems.map((item, index) => {
//                 const product = item.productDetails;
//                 const itemImage = product?.images?.[0]?.url || "https://placehold.co/200";
//                 const itemColor = product?.variants?.[0]?.attributes?.find(attr => attr.name.toLowerCase() === "color")?.value || "Default";
                
//                 return (
//                   <div key={`${item.product}-${index}`} className="flex gap-6 items-center bg-white p-2 rounded">
//                     <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#fdfdfd] border border-gray-100 shadow-sm rounded flex items-center justify-center overflow-hidden flex-shrink-0 p-2">
//                       <img 
//                         src={itemImage} 
//                         alt={product.name} 
//                         className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500" 
//                       />
//                     </div>
//                     <div className="flex-1 space-y-1">
//                       <h3 className="font-medium text-[15px] sm:text-[16px] leading-tight text-black">{product.name}</h3>
//                       <p className="text-gray-500 text-xs sm:text-sm">Color: {itemColor}</p>
//                       <p className="font-bold mt-2 text-[15px] sm:text-lg text-black">₹{getItemPrice(item).toLocaleString('en-IN')}</p>
                      
//                       <div className="flex items-center mt-3 bg-gray-100 w-max justify-between rounded-full px-1 py-1 gap-2 shadow-inner border border-gray-200">
//                         <button onClick={() => updateQuantity(item.product, item.quantity, -1)} disabled={paymentProcessing} className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-full transition-all text-sm font-medium text-black">-</button>
//                         <span className="font-bold text-xs sm:text-sm w-4 sm:w-6 text-center text-black">{String(item.quantity).padStart(2, '0')}</span>
//                         <button onClick={() => updateQuantity(item.product, item.quantity, 1)} disabled={paymentProcessing} className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-full transition-all text-sm font-medium text-black">+</button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {cartItems.length > 0 && (
//             <>
//               <hr className="border-gray-200 my-8" />

//               <div className="space-y-6 bg-gray-50 p-6 rounded-lg border border-gray-100">
//                 {/* <div className="flex items-center gap-3"> */}
//                   {/* <input type="checkbox" id="wrap" disabled={paymentProcessing} className="w-[18px] h-[18px] border-2 border-gray-300 rounded-[2px] text-black bg-white focus:ring-0 focus:ring-offset-0 cursor-pointer accent-black transition-all" /> */}
//                   {/* <label htmlFor="wrap" className="text-gray-600 text-[13px] font-medium cursor-pointer select-none">
//                     For <span className="font-bold text-black">₹100</span> Please Wrap The Product
//                   </label> */}
//                 {/* </div> */}

//                 {/* <hr className="border-gray-200 my-6" /> */}

//                 {/* --- REWARD COINS UI --- */}
//                 {rewardSettings?.isEnabled && walletBalance > 0 && rewardSettings?.isRedeemEnabled && (
//                   <div className="border-t border-gray-200 pt-1 mt-6">
//                     <h3 className="text-[13px] font-bold uppercase tracking-widest text-gray-800 mb-4 flex items-center gap-2">
//                       <Coins size={16} className="text-[#C8A253]" /> Use Reward Coins
//                     </h3>
//                     <label className="flex items-center gap-3 mb-3 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={useRewardCoins}
//                         onChange={(e) => {
//                           setUseRewardCoins(e.target.checked);
//                           if (e.target.checked) setCoinsToRedeem(Math.min(maxRedeem, walletBalance));
//                           else setCoinsToRedeem(0);
//                         }}
//                         className="w-4 h-4 accent-[#C8A253]"
//                       />
//                       <span className="text-sm text-gray-700">
//                         Available: <b>{walletBalance}</b> coins (₹{walletBalance})
//                       </span>
//                     </label>
//                     {useRewardCoins && (
//                       <div className="flex items-center gap-3">
//                         <input
//                           type="number"
//                           min={0}
//                           max={maxRedeem}
//                           value={coinsToRedeem}
//                           onChange={(e) => setCoinsToRedeem(Math.min(maxRedeem, Math.max(0, Number(e.target.value) || 0)))}
//                           className="w-24 border border-gray-300 rounded p-2 text-sm text-center font-bold"
//                         />
//                         <span className="text-xs text-gray-500">Max {maxRedeem} coins</span>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* --- UPDATED COUPON UI START --- */}
//                 <div className="border-t border-gray-200 pt-6 mt-6">
//                     <h3 className="text-[13px] font-bold uppercase tracking-widest text-gray-800 mb-4 flex items-center gap-2">
//                         <Tag size={16} className="text-[#C8A253]" /> Promo Code
//                     </h3>
                    
//                     {!isCouponApplied ? (
//                         <div className="mb-4">
//                             {/* ⚡ Premium Inline Input & Button Design */}
//                             <div className="relative flex items-center w-full">
//                                 <input 
//                                     type="text" 
//                                     placeholder="ENTER CODE" 
//                                     value={couponCode} 
//                                     onChange={(e) => {
//                                         setCouponCode(e.target.value.toUpperCase());
//                                         setCouponError(''); // Error clear on typing
//                                     }} 
//                                     className={`w-full border ${couponError ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-black'} rounded p-3 pr-24 text-sm focus:outline-none uppercase bg-white focus:ring-1 transition-all shadow-sm placeholder-gray-400 font-medium`} 
//                                 />
//                                 <button 
//                                     onClick={() => applyCoupon(couponCode)} 
//                                     disabled={!couponCode}
//                                     className="absolute right-1.5 top-1.5 bottom-1.5 bg-black text-white px-5 text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors rounded-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
//                                 >
//                                     Apply
//                                 </button>
//                             </div>
                            
//                             {/* ⚡ Inline Red Error Message */}
//                             {couponError && (
//                                 <p className="text-red-500 text-[11px] font-bold tracking-wide mt-2 uppercase flex items-center gap-1 animate-fade-in-up">
//                                     <X size={12} strokeWidth={3} /> {couponError}
//                                 </p>
//                             )}
//                         </div>
//                     ) : (
//                         <div className="flex justify-between items-center bg-green-50 p-4 border border-green-200 rounded">
//                             <span className="text-green-700 font-bold text-sm flex items-center gap-2"><CheckCircle size={18} /> {couponCode} APPLIED</span>
//                             <button onClick={removeCoupon} className="text-xs font-bold text-red-500 hover:text-red-700 uppercase underline">Remove</button>
//                         </div>
//                     )}
                    
//                     {availableCoupons.length > 0 && !isCouponApplied && (
//                         <div className="mt-4">
//                             <button onClick={() => setShowCouponsList(!showCouponsList)} className="flex items-center justify-between w-full text-sm font-medium text-gray-700 bg-white border p-3 rounded hover:bg-gray-50 transition-colors">
//                                 {showCouponsList ? "Hide Available Offers" : "View Available Offers"}
//                                 <ChevronDown size={16} className={`transform transition-transform ${showCouponsList ? "rotate-180" : ""}`} />
//                             </button>
                            
//                             {showCouponsList && (
//                                 <div className="mt-3 bg-white border border-gray-100 rounded p-3 space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
//                                     {/* Eligible Coupons */}
//                                     {eligibleCoupons.map(c => (
//                                         <div key={c._id} className="border border-[#C8A253]/30 bg-[#FCFAEF] rounded-lg p-4 flex justify-between items-center hover:bg-[#F9F5E3] transition-colors">
//                                             <div>
//                                                 <div className="inline-block border border-dashed border-[#C8A253] px-3 py-1 bg-white font-bold tracking-widest text-sm mb-1 text-black">
//                                                     {c.code}
//                                                 </div>
//                                                 <div className="text-xs text-gray-600 font-medium mt-1">
//                                                     {c.description || `Save ${c.discountType === 'percentage' ? c.discountValue + '%' : '₹' + c.discountValue}`}
//                                                 </div>
//                                                 {c.campaignType && (
//                                                     <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded mt-2 inline-block">
//                                                         {c.campaignType}
//                                                     </span>
//                                                 )}
//                                             </div>
//                                             <button onClick={() => applyCoupon(c.code)} className="text-[#C8A253] font-bold text-xs uppercase tracking-wider hover:underline">
//                                                 APPLY
//                                             </button>
//                                         </div>
//                                     ))}

//                                     {/* Locked Coupons */}
//                                     {lockedCoupons.map(c => (
//                                         <div key={c._id} className="border border-gray-200 bg-gray-50 rounded-lg p-4 flex justify-between items-center opacity-75">
//                                             <div>
//                                                 <span className="font-bold text-gray-500 text-sm flex items-center gap-1"><Lock size={14} /> {c.code}</span>
//                                                 <div className="text-[11px] text-red-500 font-medium mt-1">Add ₹{(c.minOrderValue - subtotal).toLocaleString('en-IN')} more to unlock</div>
//                                                 {c.campaignType && (
//                                                     <span className="text-[10px] bg-gray-300 text-gray-600 px-2 py-0.5 rounded mt-2 inline-block">
//                                                         {c.campaignType}
//                                                     </span>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                 </div>
//                 {/* --- UPDATED COUPON UI END --- */}

//                 {/* Subtotal Display */}
//                 <div className="flex justify-between items-center">
//                   <span className="text-lg font-serif text-[#555]">Subtotal</span>
//                   <span className="text-lg font-bold text-gray-700 tracking-tight">₹{subtotal.toLocaleString('en-IN')}</span>
//                 </div>

//                 {/* DISCOUNT ROW */}
//                 {discount > 0 && (
//                   <div className="flex justify-between items-center text-green-600">
//                     <span className="text-lg font-serif font-bold">Discount</span>
//                     <span className="text-lg font-bold tracking-tight">-₹{discount.toLocaleString('en-IN')}</span>
//                   </div>
//                 )}

//                 {useRewardCoins && coinsToRedeem > 0 && (
//                   <div className="flex justify-between items-center text-[#C8A253]">
//                     <span className="text-lg font-serif font-bold">Reward Used</span>
//                     <span className="text-lg font-bold tracking-tight">-₹{coinsToRedeem.toLocaleString('en-IN')}</span>
//                   </div>
//                 )}

//                 {estimatedEarn > 0 && rewardSettings?.isEnabled && (
//                   <div className="flex justify-between items-center text-green-700 bg-green-50 px-3 py-2 rounded-lg">
//                     <span className="text-sm font-medium">You'll earn after delivery</span>
//                     <span className="text-sm font-bold">{estimatedEarn} coins (₹{estimatedEarn})</span>
//                   </div>
//                 )}

//                 {/* FINAL TOTAL DISPLAY */}
//                 <div className="flex justify-between items-center pt-2 border-t border-gray-200">
//                   <span className="text-xl font-serif font-bold text-[#333]">Payable</span>
//                   <span className="text-2xl font-bold text-black tracking-tight">₹{payableTotal.toLocaleString('en-IN')}</span>
//                 </div>

//                 <div className="space-y-4 pt-4">
//                   <TrustBar variant="checkout" className="mb-2" />
//                   <button 
//                     type="button"
//                     onClick={handlePayment}
//                     disabled={paymentProcessing}
//                     className="w-full bg-black text-white py-5 rounded-md text-sm sm:text-[15px] font-bold shadow-xl active:scale-95 transition-all tracking-widest uppercase disabled:opacity-50 hover:bg-gray-900"
//                   >
//                     {paymentProcessing ? "Processing..." : (paymentMethod === 'razorpay' ? `Checkout with Razorpay (₹${payableTotal.toLocaleString('en-IN')})` : `Place Order (₹${payableTotal.toLocaleString('en-IN')})`)}
//                   </button>
//                   <button type="button" onClick={() => window.history.back()} className="w-full text-center underline text-[13px] font-bold text-gray-500 hover:text-black transition-colors uppercase tracking-widest mt-2 block">
//                     Back to Cart
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

import React, { useState, useEffect } from 'react';
import { Lock, ChevronDown, X, Tag, CheckCircle, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import Toast from '../components/Toast';
import TrustBar from '../components/trust/TrustBar';

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Lakshadweep", "Puducherry",
  "Jammu and Kashmir", "Ladakh"
];

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [saveAddressForFuture, setSaveAddressForFuture] = useState(false);

  // ⚡ COUPON STATES
  const [userCoupons, setUserCoupons] = useState([]);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [showCouponsList, setShowCouponsList] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState('');
  const [couponError, setCouponError] = useState(''); // ⚡ NEW: Inline error ke liye

  // Reward coins states
  const [walletBalance, setWalletBalance] = useState(0);
  const [rewardSettings, setRewardSettings] = useState(null);
  const [useRewardCoins, setUseRewardCoins] = useState(false);
  const [coinsToRedeem, setCoinsToRedeem] = useState(0);
  const [estimatedEarn, setEstimatedEarn] = useState(0);

  const [userDetails, setUserDetails] = useState({
    userId: '',
    email: '',
    firstName: '',
    lastName: '',
    countryCode: '+91',
    phone: '',
    country: 'India',
    state: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const navigate = useNavigate();

  const showToast = (type, message) => setToastMessage({ type, message });

  useEffect(() => {
    const initializeCheckout = async () => {
      setLoading(true);
      try {
        // 1. Fetch Cart Data
        const cartRes = await axiosInstance.get("/cart").catch(() => null);
        if (cartRes?.data?.items) {
          const detailedItems = await Promise.all(
            cartRes.data.items.map(async (item) => {
              try {
                const res = await axiosInstance.get(`/products/${item.product}`);
                return { ...item, productDetails: res.data.product };
              } catch (err) {
                return { ...item, productDetails: null };
              }
            })
          );
          setCartItems(detailedItems.filter(item => item.productDetails));
        }

        // 2. Fetch Profile & Personal Coupons
        let fetchedUserCoupons = [];
        const profileRes = await axiosInstance.get('/auth/profile').catch(() => null);
        if (profileRes?.data?.success && profileRes?.data?.user) {
          const userData = profileRes.data.user;
          
          setUserDetails(prev => {
            let fetchedPhone = userData.phone || '';
            let fetchedCountryCode = prev.countryCode;

            // Agar phone number "+91 9876543210" format mein saved hai
            if (fetchedPhone.includes(' ')) {
              const parts = fetchedPhone.split(' ');
              fetchedCountryCode = parts[0];
              fetchedPhone = parts.slice(1).join(' ');
            } else if (fetchedPhone.startsWith('+91')) {
              // Agar bina space ke direct "+919876543210" hai
              fetchedCountryCode = '+91';
              fetchedPhone = fetchedPhone.replace('+91', '');
            }

            return {
              ...prev,
              email: userData.email || prev.email,
              userId: userData._id,
              firstName: userData.firstName || prev.firstName,
              lastName: userData.lastName || prev.lastName,
              countryCode: fetchedCountryCode,
              phone: fetchedPhone.replace(/\D/g, '') // Sirf digits rhengi input box ke liye
            };
          });

          if (userData.coupons) {
            fetchedUserCoupons = userData.coupons;
            setUserCoupons(fetchedUserCoupons);
          }

          if (userData.addresses && userData.addresses.length > 0) {
            setSavedAddresses(userData.addresses);
          }
        }

        // 3. Fetch All Active Campaigns & Filter Them
        const couponsRes = await axiosInstance.get('/coupons/all').catch(() => null);
        if (couponsRes?.data?.coupons) {
          const now = new Date();
          const validCheckoutCoupons = couponsRes.data.coupons.filter(c => {
            const isActive = c.status === 'Active';
            const isStarted = new Date(c.startDate) <= now;
            const isNotExpired = new Date(c.expiryDate) > now;
            const showOnCheckout = c.showOn && c.showOn.includes('Checkout Page');

            if (!isActive || !isStarted || !isNotExpired || !showOnCheckout) return false;

            if (c.code === 'WELCOME500' || c.isFirstOrderOnly) {
              const hasAvailable = fetchedUserCoupons.some(
                uc => (uc.code === 'WELCOME500' || uc.code === c.code) && uc.status === 'Available'
              );
              if (!hasAvailable) return false;
            }
            return true;
          });

          const hasWelcomeAvailable = fetchedUserCoupons.some(
            uc => uc.code === 'WELCOME500' && uc.status === 'Available'
          );
          if (hasWelcomeAvailable && !validCheckoutCoupons.some(c => c.code === 'WELCOME500')) {
            validCheckoutCoupons.push({
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
              showOn: ['Checkout Page'],
              campaignType: 'Welcome Offer'
            });
          }

          setAvailableCoupons(validCheckoutCoupons);
        }

        // Fetch wallet & reward settings
        try {
          const walletRes = await axiosInstance.get('/wallet');
          if (walletRes?.data?.success) {
            setWalletBalance(walletRes.data.wallet?.availableCoins || 0);
            setRewardSettings(walletRes.data.settings);
          }
        } catch {
          // Guest or not logged in — no wallet
        }
      } catch (error) {
        showToast("error", "Failed to load checkout data");
      } finally {
        setLoading(false);
      }
    };

    initializeCheckout();
  }, []);

  const getItemPrice = (item) => {
    const product = item.productDetails;
    if (product?.discountPrice && product.discountPrice > 0) return product.price - product.discountPrice;
    return product?.price || 0;
  };

  const updateQuantity = async (productId, currentQuantity, change) => {
    try {
      const newQuantity = currentQuantity + change;
      if (newQuantity < 1) return;

      await axiosInstance.put("/cart/update", { productId, quantity: newQuantity });
      setCartItems(cartItems.map(item =>
        item.product === productId ? { ...item, quantity: newQuantity } : item
      ));
      window.dispatchEvent(new Event('cartUpdated'));

      if (isCouponApplied) {
        showToast("info", "Cart updated. Please re-apply coupon.");
        setIsCouponApplied(false);
        setDiscount(0);
        setCouponCode('');
      }
    } catch (error) {
      showToast("error", "Failed to update quantity");
    }
  };

  const subtotal = cartItems.reduce((acc, curr) => acc + getItemPrice(curr) * curr.quantity, 0);

  const finalTotal = subtotal - discount;
  const maxRedeem = rewardSettings?.isRedeemEnabled
    ? Math.min(walletBalance, rewardSettings?.maxRedeemPerOrder || 200, finalTotal)
    : 0;
  const payableTotal = Math.max(0, finalTotal - (useRewardCoins ? coinsToRedeem : 0));

  useEffect(() => {
    if (subtotal > 0) {
      axiosInstance.get('/rewards/estimate', { params: { itemsTotal: subtotal, discountAmount: discount } })
        .then(({ data }) => { if (data.success) setEstimatedEarn(data.estimatedCoins); })
        .catch(() => { });
    }
  }, [subtotal, discount]);

  const eligibleCoupons = availableCoupons.filter(c => subtotal >= (c.minOrderValue || 0));
  const lockedCoupons = availableCoupons.filter(c => subtotal < (c.minOrderValue || 0));

  const applyCoupon = async (codeToApply = couponCode) => {
    if (!codeToApply) return;
    try {
      const { data } = await axiosInstance.post('/coupons/verify', {
        code: codeToApply,
        cartTotal: subtotal,
        userId: userDetails.userId
      });
      setDiscount(data.discountAmount);
      setCouponCode(codeToApply);
      setIsCouponApplied(true);
      setCouponMessage(data.message || 'Coupon applied successfully!');
      setCouponError('');
      showToast("success", "Coupon Applied Successfully!");
      setShowCouponsList(false);
    } catch (error) {
      setDiscount(0);
      setIsCouponApplied(false);
      const errorMsg = error.response?.data?.message || "Invalid Coupon Code";
      showToast("error", errorMsg);
      setCouponError(errorMsg);
      setCouponCode('');
    }
  };

  const removeCoupon = () => {
    setIsCouponApplied(false);
    setDiscount(0);
    setCouponCode('');
    setCouponMessage('');
    setCouponError('');
    showToast("info", "Coupon removed");
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSavedAddressSelect = (e) => {
    const selectedId = e.target.value;
    const addr = savedAddresses.find(a => a._id === selectedId);
    if (addr) {
      setUserDetails({
        ...userDetails,
        firstName: addr.firstName || userDetails.firstName,
        lastName: addr.lastName || userDetails.lastName,
        address: addr.addressLine1 || addr.address || '',
        city: addr.city || '',
        state: addr.state || '',
        postalCode: addr.pincode || addr.postalCode || '',
        country: addr.country || 'India',
      });
    }
  };

  const handlePayment = async (e) => {
    if (e) e.preventDefault();

    if (cartItems.length === 0) return showToast("error", "Your cart is empty!");

    const { email, firstName, lastName, countryCode, phone, country, state, address, city, postalCode } = userDetails;

    let missingFields = [];
    if (!email) missingFields.push("Email Address");
    if (!firstName) missingFields.push("First Name");
    if (!lastName) missingFields.push("Last Name");
    if (!phone) missingFields.push("Phone Number");
    if (!address) missingFields.push("Address Line 1");
    if (!city) missingFields.push("City");
    if (!state) missingFields.push("State");
    if (!postalCode) missingFields.push("Postal Code");

    if (missingFields.length > 0) {
      const errorMsg = `Please fill in these missing details:\n- ${missingFields.join("\n- ")}`;
      alert(errorMsg);
      showToast("error", "Please fill in all required fields!");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address!");
      return showToast("error", "Please enter a valid email address!");
    }

    setPaymentProcessing(true);

    const fullPhoneNumber = `${countryCode} ${phone}`;
    const fullName = `${firstName} ${lastName}`.trim();

    if (saveAddressForFuture) {
      try {
        await axiosInstance.post('/auth/address', {
          firstName,
          lastName,
          phone: fullPhoneNumber,
          addressLine1: address,
          city,
          state,
          pincode: postalCode,
          country
        });
        console.log("Address saved successfully for future use.");
      } catch (err) {
        console.warn("Failed to save address for future use", err);
      }
    }

    if (paymentMethod === 'cod') {
      try {
        const formattedItems = cartItems.map(item => ({
          product: item.product,
          name: item.productDetails.name,
          image: item.productDetails.images?.[0]?.url || "",
          price: getItemPrice(item),
          quantity: item.quantity
        }));

        const { data: orderData } = await axiosInstance.post("/payment/create-order", {
          amount: finalTotal,
          paymentMethod: 'cod',
          orderDetails: {
            email,
            items: formattedItems,
            itemsPrice: subtotal,
            totalAmount: finalTotal,
            payableAmount: payableTotal,
            shippingAddress: {
              fullName, phone: fullPhoneNumber, addressLine1: address,
              city, state, pincode: postalCode, country
            },
            couponApplied: isCouponApplied ? couponCode : null,
            discountAmount: discount,
            coinsToRedeem: useRewardCoins ? coinsToRedeem : 0,
          }
        });

        if (orderData.success) {
          showToast("success", "Order Placed Successfully!");
          setCartItems([]);
          window.dispatchEvent(new Event('cartUpdated'));
          setTimeout(() => navigate('/order-success', { state: { orderId: orderData.orderId, paymentMethod: 'cod', coinsEarned: orderData.coinsEarned || estimatedEarn } }), 1500);
        } else {
          showToast("error", "Failed to place order. Please try again.");
          setPaymentProcessing(false);
        }
      } catch (error) {
        console.error("COD order error:", error);
        showToast("error", "Failed to place order. Please try again.");
        setPaymentProcessing(false);
      }
      return;
    }

    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        showToast('error', 'Razorpay SDK failed to load. Please check your internet connection.');
        setPaymentProcessing(false);
        return;
      }

      const formattedItems = cartItems.map(item => ({
        product: item.product,
        name: item.productDetails.name,
        image: item.productDetails.images?.[0]?.url || "",
        price: getItemPrice(item),
        quantity: item.quantity
      }));

      const { data: orderData } = await axiosInstance.post("/payment/create-order", {
        amount: finalTotal,
        paymentMethod: 'razorpay',
        orderDetails: {
          email,
          items: formattedItems,
          itemsPrice: subtotal,
          totalAmount: finalTotal,
          coinsToRedeem: useRewardCoins ? coinsToRedeem : 0,
        }
      });

      if (!orderData.success) {
        showToast('error', 'Failed to initialize payment gateway.');
        setPaymentProcessing(false);
        return;
      }

      const options = {
        key: orderData.key_id,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Truee Luxury",
        description: "Premium Purchase",
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            const verifyRes = await axiosInstance.post('/payment/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderDetails: {
                email,
                items: formattedItems,
                itemsPrice: subtotal,
                totalAmount: finalTotal,
                payableAmount: payableTotal,
                shippingAddress: {
                  fullName, phone: fullPhoneNumber, addressLine1: address,
                  city, state, pincode: postalCode, country
                },
                couponApplied: isCouponApplied ? couponCode : null,
                discountAmount: discount,
                coinsToRedeem: useRewardCoins ? coinsToRedeem : 0,
              }
            });

            if (verifyRes.data.success) {
              showToast("success", "Payment Successful! Order Placed.");
              setCartItems([]);
              window.dispatchEvent(new Event('cartUpdated'));
              setTimeout(() => navigate('/order-success', { state: { orderId: verifyRes.data.orderId, paymentMethod: 'razorpay', coinsEarned: verifyRes.data.coinsEarned || estimatedEarn } }), 1500);
            }
          } catch (error) {
            console.error("Verification failed:", error);
            showToast("error", "Payment verification failed. Please contact support.");
            setPaymentProcessing(false);
          }
        },
        prefill: { name: fullName, email: email, contact: fullPhoneNumber },
        theme: { color: "#000000" },
        modal: {
          ondismiss: function () {
            setPaymentProcessing(false);
            showToast("error", "Payment cancelled by user.");
          }
        }
      };

      const razorpayObject = new window.Razorpay(options);

      razorpayObject.on('payment.failed', function (response) {
        showToast('error', `Payment Failed: ${response.error.description}`);
        setPaymentProcessing(false);
      });

      razorpayObject.open();

    } catch (error) {
      console.error("Payment initiation error:", error);
      showToast("error", "Something went wrong while starting payment.");
      setPaymentProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 font-sans text-gray-800">
      {toastMessage && <Toast type={toastMessage.type} message={toastMessage.message} onClose={() => setToastMessage(null)} />}

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 space-y-10">

          <section>
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-3xl font-serif">Contact</h2>
              <p className="text-sm">Not Have an account? <span onClick={() => navigate('/register')} className="text-blue-600 underline cursor-pointer hover:text-blue-800 transition-colors">Create Account</span></p>
            </div>

            <input
              type="email"
              placeholder="Email Address"
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-t bg-transparent focus:outline-none focus:ring-1 focus:ring-black"
            />

            <div className="flex w-full border border-gray-300 border-t-0 rounded-b focus-within:ring-1 focus-within:ring-black bg-transparent">
              <select
                value={userDetails.countryCode}
                onChange={(e) => setUserDetails({ ...userDetails, countryCode: e.target.value })}
                className="p-4 bg-transparent border-r border-gray-300 outline-none text-gray-700 cursor-pointer w-[110px] flex-shrink-0"
              >
                <option value="+91">+91 (IN)</option>
                <option value="+1">+1 (US/CA)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+61">+61 (AU)</option>
                <option value="+971">+971 (AE)</option>
              </select>
              <input
                type="tel"
                placeholder="Phone Number"
                value={userDetails.phone}
                onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value.replace(/\D/g, '') })}
                className="w-full p-4 bg-transparent focus:outline-none"
              />
            </div>
          </section>

          <section>
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-3xl font-serif">Delivery</h2>
            </div>

            <div className="mb-6 relative border border-gray-300 rounded flex justify-between items-center bg-gray-50 shadow-sm">
              <select
                onChange={handleSavedAddressSelect}
                defaultValue=""
                className="w-full p-4 bg-transparent outline-none appearance-none text-black font-semibold cursor-pointer"
              >
                <option value="" disabled>Choose from Saved Address...</option>
                {savedAddresses.length > 0 ? (
                  savedAddresses.map((addr, idx) => (
                    <option key={addr._id || idx} value={addr._id}>
                      {addr.addressLine1}, {addr.city} - {addr.pincode || addr.postalCode}
                    </option>
                  ))
                ) : (
                  <option value="none" disabled>No saved addresses found</option>
                )}
              </select>
              <div className="absolute right-4 pointer-events-none">
                <ChevronDown size={20} className="text-gray-500" />
              </div>
            </div>

            <div className="space-y-0">
              <div className="relative border border-gray-300 rounded-t p-0 flex justify-between items-center bg-transparent">
                <select
                  value={userDetails.country}
                  onChange={(e) => setUserDetails({ ...userDetails, country: e.target.value })}
                  className="w-full p-4 bg-transparent outline-none appearance-none text-gray-700 cursor-pointer"
                >
                  <option value="" disabled className="text-gray-400">Country / Region</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
                <div className="absolute right-4 pointer-events-none">
                  <ChevronDown size={20} className="text-gray-500" />
                </div>
              </div>

              <div className="grid grid-cols-2">
                <input
                  type="text"
                  placeholder="First Name"
                  value={userDetails.firstName}
                  onChange={(e) => setUserDetails({ ...userDetails, firstName: e.target.value })}
                  className="p-4 border border-t-0 border-gray-300 focus:outline-none focus:ring-1 focus:ring-black relative"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={userDetails.lastName}
                  onChange={(e) => setUserDetails({ ...userDetails, lastName: e.target.value })}
                  className="p-4 border border-t-0 border-l-0 border-gray-300 focus:outline-none focus:ring-1 focus:ring-black relative"
                />
              </div>

              <input
                type="text"
                placeholder="Address Line 1"
                value={userDetails.address}
                onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
                className="w-full p-4 border border-t-0 border-gray-300 focus:outline-none focus:ring-1 focus:ring-black relative"
              />

              <div className="grid grid-cols-1 md:grid-cols-3">
                <input
                  type="text"
                  placeholder="City"
                  value={userDetails.city}
                  onChange={(e) => setUserDetails({ ...userDetails, city: e.target.value })}
                  className="p-4 border border-t-0 border-gray-300 md:rounded-bl focus:outline-none focus:ring-1 focus:ring-black relative"
                />

                <div className="relative border border-t-0 md:border-l-0 border-gray-300 bg-transparent flex items-center focus-within:ring-1 focus-within:ring-black">
                  <select
                    value={userDetails.state}
                    onChange={(e) => setUserDetails({ ...userDetails, state: e.target.value })}
                    className="w-full p-4 bg-transparent outline-none appearance-none text-gray-700 cursor-pointer"
                  >
                    <option value="" disabled>State</option>
                    {indianStates.map(stateName => (
                      <option key={stateName} value={stateName}>{stateName}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 pointer-events-none">
                    <ChevronDown size={16} className="text-gray-400" />
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Postal Code"
                  value={userDetails.postalCode}
                  onChange={(e) => setUserDetails({ ...userDetails, postalCode: e.target.value })}
                  className="p-4 border border-t-0 md:border-l-0 border-gray-300 rounded-b md:rounded-b-none md:rounded-br focus:outline-none focus:ring-1 focus:ring-black relative"
                />
              </div>
            </div>

            <div className="flex items-center mt-4 gap-2">
              <input
                type="checkbox"
                id="save-info"
                checked={saveAddressForFuture}
                onChange={(e) => setSaveAddressForFuture(e.target.checked)}
                className="w-4 h-4 accent-black border-gray-400 cursor-pointer"
              />
              <label htmlFor="save-info" className="text-sm text-gray-600 font-medium cursor-pointer select-none">
                Save This Info For Future
              </label>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-serif mb-4">Payment</h2>
            <div className="border border-gray-300 rounded overflow-hidden">
              <div className="relative border-b border-gray-300 flex justify-between items-center bg-white p-0">
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-4 bg-transparent outline-none appearance-none text-black font-semibold cursor-pointer relative z-10"
                >
                  <option value="razorpay">Razorpay (Cards / UPI / Netbanking)</option>
                  <option value="cod">Cash on Delivery (COD)</option>
                </select>
                <div className="absolute right-4 flex gap-1 items-center z-0 pointer-events-none">
                  <ChevronDown size={18} className="text-gray-500" />
                </div>
              </div>

              <div className="p-4 space-y-0 bg-gray-50 text-gray-600 font-medium text-sm text-center">
                {paymentMethod === 'razorpay' ? 'Secure payment processing via Razorpay gateway.' : 'Pay when your order is delivered to your doorstep.'}
              </div>
            </div>
          </section>

          <button
            type="button"
            onClick={handlePayment}
            disabled={paymentProcessing || loading || cartItems.length === 0}
            className="w-full bg-black text-white py-4 rounded font-bold tracking-widest hover:bg-gray-900 transition-all uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-lg active:scale-95"
          >
            {paymentProcessing ? "Processing..." : (paymentMethod === 'razorpay' ? `Pay ₹${payableTotal.toLocaleString('en-IN')}` : `Place Order ₹${payableTotal.toLocaleString('en-IN')}`)}
          </button>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-5 border-l-0 lg:border-l border-gray-200 pl-0 lg:pl-12 mt-10 lg:mt-0">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-serif">Shopping Cart</h2>
            <X onClick={() => navigate('/shop')} size={24} className="cursor-pointer text-gray-400 hover:text-black transition-colors" title="Close" />
          </div>

          {loading ? (
            <div className="h-full flex items-center justify-center animate-pulse text-[#C8A253] font-serif text-lg">Loading your cart...</div>
          ) : cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-8">
              <p className="font-serif text-lg text-gray-500">Your cart is empty.</p>
              <button onClick={() => navigate('/shop')} className="uppercase text-xs font-bold tracking-widest border-b border-black pb-1 hover:text-gray-600 transition-colors">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map((item, index) => {
                const product = item.productDetails;
                const itemImage = product?.images?.[0]?.url || "https://placehold.co/200";
                const itemColor = product?.variants?.[0]?.attributes?.find(attr => attr.name.toLowerCase() === "color")?.value || "Default";

                return (
                  <div key={`${item.product}-${index}`} className="flex gap-6 items-center bg-white p-2 rounded">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#fdfdfd] border border-gray-100 shadow-sm rounded flex items-center justify-center overflow-hidden flex-shrink-0 p-2">
                      <img
                        src={itemImage}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium text-[15px] sm:text-[16px] leading-tight text-black">{product.name}</h3>
                      <p className="text-gray-500 text-xs sm:text-sm">Color: {itemColor}</p>
                      <p className="font-bold mt-2 text-[15px] sm:text-lg text-black">₹{getItemPrice(item).toLocaleString('en-IN')}</p>

                      <div className="flex items-center mt-3 bg-gray-100 w-max justify-between rounded-full px-1 py-1 gap-2 shadow-inner border border-gray-200">
                        <button onClick={() => updateQuantity(item.product, item.quantity, -1)} disabled={paymentProcessing} className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-full transition-all text-sm font-medium text-black">-</button>
                        <span className="font-bold text-xs sm:text-sm w-4 sm:w-6 text-center text-black">{String(item.quantity).padStart(2, '0')}</span>
                        <button onClick={() => updateQuantity(item.product, item.quantity, 1)} disabled={paymentProcessing} className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-full transition-all text-sm font-medium text-black">+</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {cartItems.length > 0 && (
            <>
              <hr className="border-gray-200 my-8" />

              <div className="space-y-6 bg-gray-50 p-6 rounded-lg border border-gray-100">

                {/* --- REWARD COINS UI --- */}
                {rewardSettings?.isEnabled && walletBalance > 0 && rewardSettings?.isRedeemEnabled && (
                  <div className="border-t border-gray-200 pt-1 mt-6">
                    <h3 className="text-[13px] font-bold uppercase tracking-widest text-gray-800 mb-4 flex items-center gap-2">
                      <Coins size={16} className="text-[#C8A253]" /> Use Reward Coins
                    </h3>
                    <label className="flex items-center gap-3 mb-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={useRewardCoins}
                        onChange={(e) => {
                          setUseRewardCoins(e.target.checked);
                          if (e.target.checked) setCoinsToRedeem(Math.min(maxRedeem, walletBalance));
                          else setCoinsToRedeem(0);
                        }}
                        className="w-4 h-4 accent-[#C8A253]"
                      />
                      <span className="text-sm text-gray-700">
                        Available: <b>{walletBalance}</b> coins (₹{walletBalance})
                      </span>
                    </label>
                    {useRewardCoins && (
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min={0}
                          max={maxRedeem}
                          value={coinsToRedeem}
                          onChange={(e) => setCoinsToRedeem(Math.min(maxRedeem, Math.max(0, Number(e.target.value) || 0)))}
                          className="w-24 border border-gray-300 rounded p-2 text-sm text-center font-bold"
                        />
                        <span className="text-xs text-gray-500">Max {maxRedeem} coins</span>
                      </div>
                    )}
                  </div>
                )}

                {/* --- UPDATED COUPON UI START --- */}
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="text-[13px] font-bold uppercase tracking-widest text-gray-800 mb-4 flex items-center gap-2">
                    <Tag size={16} className="text-[#C8A253]" /> Promo Code
                  </h3>

                  {!isCouponApplied ? (
                    <div className="mb-4">
                      <div className="relative flex items-center w-full">
                        <input
                          type="text"
                          placeholder="ENTER CODE"
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value.toUpperCase());
                            setCouponError('');
                          }}
                          className={`w-full border ${couponError ? 'border-red-400 focus:ring-red-500' : 'border-gray-300 focus:ring-black'} rounded p-3 pr-24 text-sm focus:outline-none uppercase bg-white focus:ring-1 transition-all shadow-sm placeholder-gray-400 font-medium`}
                        />
                        <button
                          onClick={() => applyCoupon(couponCode)}
                          disabled={!couponCode}
                          className="absolute right-1.5 top-1.5 bottom-1.5 bg-black text-white px-5 text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors rounded-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Apply
                        </button>
                      </div>

                      {couponError && (
                        <p className="text-red-500 text-[11px] font-bold tracking-wide mt-2 uppercase flex items-center gap-1 animate-fade-in-up">
                          <X size={12} strokeWidth={3} /> {couponError}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="flex justify-between items-center bg-green-50 p-4 border border-green-200 rounded">
                      <span className="text-green-700 font-bold text-sm flex items-center gap-2"><CheckCircle size={18} /> {couponCode} APPLIED</span>
                      <button onClick={removeCoupon} className="text-xs font-bold text-red-500 hover:text-red-700 uppercase underline">Remove</button>
                    </div>
                  )}

                  {availableCoupons.length > 0 && !isCouponApplied && (
                    <div className="mt-4">
                      <button onClick={() => setShowCouponsList(!showCouponsList)} className="flex items-center justify-between w-full text-sm font-medium text-gray-700 bg-white border p-3 rounded hover:bg-gray-50 transition-colors">
                        {showCouponsList ? "Hide Available Offers" : "View Available Offers"}
                        <ChevronDown size={16} className={`transform transition-transform ${showCouponsList ? "rotate-180" : ""}`} />
                      </button>

                      {showCouponsList && (
                        <div className="mt-3 bg-white border border-gray-100 rounded p-3 space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                          {eligibleCoupons.map(c => (
                            <div key={c._id} className="border border-[#C8A253]/30 bg-[#FCFAEF] rounded-lg p-4 flex justify-between items-center hover:bg-[#F9F5E3] transition-colors">
                              <div>
                                <div className="inline-block border border-dashed border-[#C8A253] px-3 py-1 bg-white font-bold tracking-widest text-sm mb-1 text-black">
                                  {c.code}
                                </div>
                                <div className="text-xs text-gray-600 font-medium mt-1">
                                  {c.description || `Save ${c.discountType === 'percentage' ? c.discountValue + '%' : '₹' + c.discountValue}`}
                                </div>
                                {c.campaignType && (
                                  <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded mt-2 inline-block">
                                    {c.campaignType}
                                  </span>
                                )}
                              </div>
                              <button onClick={() => applyCoupon(c.code)} className="text-[#C8A253] font-bold text-xs uppercase tracking-wider hover:underline">
                                APPLY
                              </button>
                            </div>
                          ))}

                          {lockedCoupons.map(c => (
                            <div key={c._id} className="border border-gray-200 bg-gray-50 rounded-lg p-4 flex justify-between items-center opacity-75">
                              <div>
                                <span className="font-bold text-gray-500 text-sm flex items-center gap-1"><Lock size={14} /> {c.code}</span>
                                <div className="text-[11px] text-red-500 font-medium mt-1">Add ₹{(c.minOrderValue - subtotal).toLocaleString('en-IN')} more to unlock</div>
                                {c.campaignType && (
                                  <span className="text-[10px] bg-gray-300 text-gray-600 px-2 py-0.5 rounded mt-2 inline-block">
                                    {c.campaignType}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {/* --- UPDATED COUPON UI END --- */}

                {/* Subtotal Display */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-serif text-[#555]">Subtotal</span>
                  <span className="text-lg font-bold text-gray-700 tracking-tight">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {/* DISCOUNT ROW */}
                {discount > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <span className="text-lg font-serif font-bold">Discount</span>
                    <span className="text-lg font-bold tracking-tight">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {useRewardCoins && coinsToRedeem > 0 && (
                  <div className="flex justify-between items-center text-[#C8A253]">
                    <span className="text-lg font-serif font-bold">Reward Used</span>
                    <span className="text-lg font-bold tracking-tight">-₹{coinsToRedeem.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {estimatedEarn > 0 && rewardSettings?.isEnabled && (
                  <div className="flex justify-between items-center text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                    <span className="text-sm font-medium">You'll earn after delivery</span>
                    <span className="text-sm font-bold">{estimatedEarn} coins (₹{estimatedEarn})</span>
                  </div>
                )}

                {/* FINAL TOTAL DISPLAY */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-xl font-serif font-bold text-[#333]">Payable</span>
                  <span className="text-2xl font-bold text-black tracking-tight">₹{payableTotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="space-y-4 pt-4">
                  <TrustBar variant="checkout" className="mb-2" />
                  <button
                    type="button"
                    onClick={handlePayment}
                    disabled={paymentProcessing}
                    className="w-full bg-black text-white py-5 rounded-md text-sm sm:text-[15px] font-bold shadow-xl active:scale-95 transition-all tracking-widest uppercase disabled:opacity-50 hover:bg-gray-900"
                  >
                    {paymentProcessing ? "Processing..." : (paymentMethod === 'razorpay' ? `Checkout with Razorpay (₹${payableTotal.toLocaleString('en-IN')})` : `Place Order (₹${payableTotal.toLocaleString('en-IN')})`)}
                  </button>
                  <button type="button" onClick={() => window.history.back()} className="w-full text-center underline text-[13px] font-bold text-gray-500 hover:text-black transition-colors uppercase tracking-widest mt-2 block">
                    Back to Cart
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
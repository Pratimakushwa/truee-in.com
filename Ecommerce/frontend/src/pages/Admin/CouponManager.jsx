// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../utils/axiosInstance';
// import { Trash2, PlusCircle, Loader2 } from 'lucide-react';

// export default function CouponManager() {
//     const [coupons, setCoupons] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({ 
//         code: '', 
//         discountType: 'flat', 
//         discountValue: '', 
//         minOrderValue: '', 
//         expiryDate: '' 
//     });

//     useEffect(() => { 
//         fetchCoupons(); 
//     }, []);

//     const fetchCoupons = async () => {
//         setLoading(true);
//         try {
//             const { data } = await axiosInstance.get('/api/coupons/all');
//             setCoupons(data.coupons || []);
//         } catch (err) { 
//             console.error("Error fetching coupons", err); 
//         } finally {
//             setLoading(false);
//         }
//     };

//     const createCoupon = async (e) => {
//         e.preventDefault();
//         try {
//             await axiosInstance.post('/api/coupons/create', formData);
//             alert("Coupon Created Successfully!");
//             setFormData({ code: '', discountType: 'flat', discountValue: '', minOrderValue: '', expiryDate: '' });
//             fetchCoupons();
//         } catch (err) { 
//             alert(err.response?.data?.message || "Error creating coupon"); 
//         }
//     };

//     const deleteCoupon = async (id) => {
//         if (!window.confirm("Are you sure you want to delete this coupon?")) return;
//         try {
//             await axiosInstance.delete(`/api/coupons/${id}`);
//             fetchCoupons();
//         } catch (err) { 
//             alert("Error deleting coupon"); 
//         }
//     };

//     return (
//         <div className="p-8 bg-white min-h-screen text-gray-800">
//             <h1 className="text-3xl font-serif font-medium mb-8">Coupon Management</h1>

//             {/* Add New Coupon Form */}
//             <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-10 shadow-sm">
//                 <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
//                     <PlusCircle size={20} /> Add New Coupon
//                 </h2>
//                 <form onSubmit={createCoupon} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
//                     <input type="text" placeholder="Coupon Code (e.g. SUMMER20)" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})} className="border p-3 rounded bg-white" required />
                    
//                     <select value={formData.discountType} onChange={(e) => setFormData({...formData, discountType: e.target.value})} className="border p-3 rounded bg-white">
//                         <option value="flat">Flat Discount</option>
//                         <option value="percentage">Percentage (%)</option>
//                     </select>
                    
//                     <input type="number" placeholder="Value" value={formData.discountValue} onChange={(e) => setFormData({...formData, discountValue: e.target.value})} className="border p-3 rounded bg-white" required />
                    
//                     <input type="date" value={formData.expiryDate} onChange={(e) => setFormData({...formData, expiryDate: e.target.value})} className="border p-3 rounded bg-white" required />
                    
//                     <button type="submit" className="bg-black text-white px-6 py-3 rounded font-bold hover:bg-gray-800 transition-all">Create</button>
//                 </form>
//             </div>

//             {/* Existing Coupons Table */}
//             <h2 className="text-xl font-bold mb-4">Existing Coupons</h2>
//             <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
//                 <table className="w-full text-left">
//                     <thead className="bg-gray-50 border-b">
//                         <tr>
//                             <th className="p-4 font-semibold text-gray-600">Code</th>
//                             <th className="p-4 font-semibold text-gray-600">Type</th>
//                             <th className="p-4 font-semibold text-gray-600">Value</th>
//                             <th className="p-4 font-semibold text-gray-600">Expiry</th>
//                             <th className="p-4 font-semibold text-gray-600 text-center">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {loading ? (
//                             <tr><td colSpan="5" className="p-10 text-center"><Loader2 className="animate-spin mx-auto" /></td></tr>
//                         ) : coupons.length === 0 ? (
//                             <tr><td colSpan="5" className="p-10 text-center text-gray-500">No coupons found.</td></tr>
//                         ) : (
//                             coupons.map(c => (
//                                 <tr key={c._id} className="border-t hover:bg-gray-50 transition-colors">
//                                     <td className="p-4 font-bold">{c.code}</td>
//                                     <td className="p-4 capitalize">{c.discountType}</td>
//                                     <td className="p-4">{c.discountValue}{c.discountType === 'percentage' ? '%' : ' INR'}</td>
//                                     <td className="p-4">{new Date(c.expiryDate).toLocaleDateString()}</td>
//                                     <td className="p-4 text-center">
//                                         <button onClick={() => deleteCoupon(c._id)} className="text-red-500 hover:text-red-700">
//                                             <Trash2 size={18} />
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../utils/axiosInstance';
// import { Trash2, PlusCircle, Loader2 } from 'lucide-react';

// export default function CouponManager() {
//     const [coupons, setCoupons] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({ 
//         code: '', 
//         discountType: 'flat', 
//         discountValue: '', 
//         minOrderValue: '', 
//         expiryDate: '' 
//     });

//     useEffect(() => { 
//         fetchCoupons(); 
//     }, []);

//     const fetchCoupons = async () => {
//         setLoading(true);
//         try {
//             // ⚡ FIX: Removed extra '/api'
//             const { data } = await axiosInstance.get('/coupons/all');
//             setCoupons(data.coupons || []);
//         } catch (err) { 
//             console.error("Error fetching coupons", err); 
//         } finally {
//             setLoading(false);
//         }
//     };

//     const createCoupon = async (e) => {
//         e.preventDefault();
//         try {
//             // ⚡ FIX: Removed extra '/api'
//             await axiosInstance.post('/coupons/create', formData);
//             alert("Coupon Created Successfully!");
//             setFormData({ code: '', discountType: 'flat', discountValue: '', minOrderValue: '', expiryDate: '' });
//             fetchCoupons();
//         } catch (err) { 
//             console.error("Creation Error:", err.response?.data);
//             alert(err.response?.data?.message || "Error creating coupon"); 
//         }
//     };

//     const deleteCoupon = async (id) => {
//         if (!window.confirm("Are you sure you want to delete this coupon?")) return;
//         try {
//             // ⚡ FIX: Removed extra '/api'
//             await axiosInstance.delete(`/coupons/${id}`);
//             fetchCoupons();
//         } catch (err) { 
//             console.error("Deletion Error:", err);
//             alert("Error deleting coupon"); 
//         }
//     };

//     return (
//         <div className="p-8 bg-white min-h-screen text-gray-800">
//             <h1 className="text-3xl font-serif font-medium mb-8">Coupon Management</h1>

//             {/* Add New Coupon Form */}
//             <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-10 shadow-sm">
//                 <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
//                     <PlusCircle size={20} /> Add New Coupon
//                 </h2>
//                 <form onSubmit={createCoupon} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
//                     <input type="text" placeholder="Coupon Code (e.g. SUMMER20)" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})} className="border p-3 rounded bg-white" required />
                    
//                     <select value={formData.discountType} onChange={(e) => setFormData({...formData, discountType: e.target.value})} className="border p-3 rounded bg-white">
//                         <option value="flat">Flat Discount</option>
//                         <option value="percentage">Percentage (%)</option>
//                     </select>
                    
//                     <input type="number" placeholder="Value" value={formData.discountValue} onChange={(e) => setFormData({...formData, discountValue: e.target.value})} className="border p-3 rounded bg-white" required />
                    
//                     <input type="date" value={formData.expiryDate} onChange={(e) => setFormData({...formData, expiryDate: e.target.value})} className="border p-3 rounded bg-white" required />
                    
//                     <button type="submit" className="bg-black text-white px-6 py-3 rounded font-bold hover:bg-gray-800 transition-all">Create</button>
//                 </form>
//             </div>

//             {/* Existing Coupons Table */}
//             <h2 className="text-xl font-bold mb-4">Existing Coupons</h2>
//             <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
//                 <table className="w-full text-left">
//                     <thead className="bg-gray-50 border-b">
//                         <tr>
//                             <th className="p-4 font-semibold text-gray-600">Code</th>
//                             <th className="p-4 font-semibold text-gray-600">Type</th>
//                             <th className="p-4 font-semibold text-gray-600">Value</th>
//                             <th className="p-4 font-semibold text-gray-600">Expiry</th>
//                             <th className="p-4 font-semibold text-gray-600 text-center">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {loading ? (
//                             <tr><td colSpan="5" className="p-10 text-center"><Loader2 className="animate-spin mx-auto" /></td></tr>
//                         ) : coupons.length === 0 ? (
//                             <tr><td colSpan="5" className="p-10 text-center text-gray-500">No coupons found.</td></tr>
//                         ) : (
//                             coupons.map(c => (
//                                 <tr key={c._id} className="border-t hover:bg-gray-50 transition-colors">
//                                     <td className="p-4 font-bold">{c.code}</td>
//                                     <td className="p-4 capitalize">{c.discountType}</td>
//                                     <td className="p-4">{c.discountValue}{c.discountType === 'percentage' ? '%' : ' INR'}</td>
//                                     <td className="p-4">{new Date(c.expiryDate).toLocaleDateString()}</td>
//                                     <td className="p-4 text-center">
//                                         <button onClick={() => deleteCoupon(c._id)} className="text-red-500 hover:text-red-700">
//                                             <Trash2 size={18} />
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../utils/axiosInstance';
// import { Trash2, PlusCircle, Loader2, CheckCircle, XCircle, Tag, Settings, Users, Box, MonitorPlay } from 'lucide-react';

// export default function CouponManager() {
//     const [coupons, setCoupons] = useState([]);
//     const [loading, setLoading] = useState(false);
    
//     // ⚡ All 10 Conditions & Campaign Types Added
//     const [formData, setFormData] = useState({ 
//         campaignType: 'Festival', name: '', code: '', description: '', 
//         discountType: 'flat', discountValue: '', maxDiscount: '', 
//         startDate: '', expiryDate: '', status: 'Active',
//         minOrderValue: '', maxOrderValue: '', 
//         applicableFor: 'All Users', isFirstOrderOnly: false,
//         applicableBrand: 'All', applicableCategory: 'All',
//         usageLimit: '', perUserLimit: 1, 
//         showOn: [], 
//         isReward: false, rewardCondition: '', rewardCode: '',
//         autoApply: false
//     });

//     useEffect(() => { fetchCoupons(); }, []);

//     const fetchCoupons = async () => {
//         setLoading(true);
//         try {
// const { data } = await axiosInstance.get('/coupons/all');
//             setCoupons(data.coupons || []);
//         } catch (err) { console.error("Error fetching coupons", err); } 
//         finally { setLoading(false); }
//     };

//     const handleCheckboxChange = (e, field) => {
//         setFormData({ ...formData, [field]: e.target.checked });
//     };

//     const handleShowOnChange = (e) => {
//         const value = e.target.value;
//         setFormData(prev => ({
//             ...prev,
//             showOn: prev.showOn.includes(value) 
//                 ? prev.showOn.filter(item => item !== value) 
//                 : [...prev.showOn, value]
//         }));
//     };

//     const createCoupon = async (e) => {
//         e.preventDefault();
//         try {
// await axiosInstance.post('/coupons/create', formData);
//             alert("Coupon Created Successfully!");
//             setFormData({ 
//                 campaignType: 'Festival', name: '', code: '', description: '', 
//                 discountType: 'flat', discountValue: '', maxDiscount: '', 
//                 startDate: '', expiryDate: '', status: 'Active', 
//                 minOrderValue: '', maxOrderValue: '', 
//                 applicableFor: 'All Users', isFirstOrderOnly: false, 
//                 applicableBrand: 'All', applicableCategory: 'All',
//                 usageLimit: '', perUserLimit: 1, showOn: [], 
//                 isReward: false, rewardCondition: '', rewardCode: '', autoApply: false
//             });
//             fetchCoupons();
//         } catch (err) { alert(err.response?.data?.message || "Error creating coupon"); }
//     };

//     const deleteCoupon = async (id) => {
//         if (!window.confirm("Are you sure you want to delete this campaign?")) return;
//         try {
// await axiosInstance.delete(`/coupons/${id}`);
//             fetchCoupons();
//         } catch (err) { alert("Error deleting coupon"); }
//     };

//     return (
//         <div className="p-4 md:p-8 bg-gray-50 min-h-screen text-gray-800 font-sans">
//             <h1 className="text-3xl font-serif font-bold mb-8 text-black flex items-center gap-3">
//                 <Tag size={32} className="text-[#C8A253]" /> Premium Coupon Management
//             </h1>

//             {/* --- ADD NEW COUPON FORM --- */}
//             <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 mb-10 shadow-sm">
//                 <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b pb-4">
//                     <PlusCircle size={24} /> Create New Campaign
//                 </h2>
                
//                 <form onSubmit={createCoupon} className="space-y-8">
                    
//                     {/* SECTION 1: Basic Info & Campaign Type */}
//                     <div className="space-y-4">
//                         <h3 className="font-bold text-gray-700 flex items-center gap-2 bg-gray-100 p-3 rounded"><Tag size={18}/> 1. Campaign Information</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                             <select value={formData.campaignType} onChange={(e) => setFormData({...formData, campaignType: e.target.value})} className="border p-3 rounded font-semibold text-blue-700 bg-blue-50">
//                                 <option value="Festival">🎉 Festival Offer</option>
//                                 <option value="Brand Offer">🏷️ Brand Offer</option>
//                                 <option value="Welcome Offer">👋 Welcome Offer</option>
//                                 <option value="Checkout Offer">🛒 Checkout Offer</option>
//                                 <option value="Reward Coupon">🎁 Reward Coupon</option>
//                                 <option value="Free Shipping">🚚 Free Shipping</option>
//                             </select>
//                             <input type="text" placeholder="Coupon Name (e.g. Diwali Sale)" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="border p-3 rounded" required />
//                             <input type="text" placeholder="Code (e.g. DIWALI500)" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})} className="border p-3 rounded font-bold uppercase" required />
//                             <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className={`border p-3 rounded font-bold ${formData.status === 'Active' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
//                                 <option value="Active">🟢 Active</option>
//                                 <option value="Inactive">🔴 Inactive</option>
//                             </select>
//                         </div>
//                         <input type="text" placeholder="Description (e.g. Get ₹500 OFF on your first purchase)" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="border p-3 rounded w-full" />
//                     </div>

//                     {/* SECTION 2: Discount & Validity */}
//                     <div className="space-y-4">
//                         <h3 className="font-bold text-gray-700 flex items-center gap-2 bg-gray-100 p-3 rounded"><Settings size={18}/> 2. Discount Rules & Validity</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//                             <select value={formData.discountType} onChange={(e) => setFormData({...formData, discountType: e.target.value})} className="border p-3 rounded">
//                                 <option value="flat">Flat Discount (₹)</option>
//                                 <option value="percentage">Percentage (%)</option>
//                                 <option value="free_shipping">Free Shipping</option>
//                             </select>
//                             <input type="number" placeholder="Discount Value" value={formData.discountValue} onChange={(e) => setFormData({...formData, discountValue: e.target.value})} className="border p-3 rounded" required={formData.discountType !== 'free_shipping'} disabled={formData.discountType === 'free_shipping'} />
//                             <input type="number" placeholder="Max Discount (₹)" value={formData.maxDiscount} onChange={(e) => setFormData({...formData, maxDiscount: e.target.value})} className="border p-3 rounded" disabled={formData.discountType !== 'percentage'} title="Only for Percentage" />
//                             <div className="flex flex-col">
//                                 <label className="text-xs text-gray-500 mb-1">Start Date</label>
//                                 <input type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} className="border p-2 rounded" required />
//                             </div>
//                             <div className="flex flex-col">
//                                 <label className="text-xs text-gray-500 mb-1">Expiry Date</label>
//                                 <input type="date" value={formData.expiryDate} onChange={(e) => setFormData({...formData, expiryDate: e.target.value})} className="border p-2 rounded" required />
//                             </div>
//                         </div>
//                     </div>

//                     {/* SECTION 3: Conditions (User, Product, Order) */}
//                     <div className="space-y-4">
//                         <h3 className="font-bold text-gray-700 flex items-center gap-2 bg-gray-100 p-3 rounded"><Users size={18}/> 3. Targeting & Limits</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                             <input type="number" placeholder="Min Order Amount (₹)" value={formData.minOrderValue} onChange={(e) => setFormData({...formData, minOrderValue: e.target.value})} className="border p-3 rounded" />
//                             <input type="number" placeholder="Total Usage Limit (e.g. 500)" value={formData.usageLimit} onChange={(e) => setFormData({...formData, usageLimit: e.target.value})} className="border p-3 rounded" />
//                             <select value={formData.applicableFor} onChange={(e) => setFormData({...formData, applicableFor: e.target.value})} className="border p-3 rounded">
//                                 <option value="All Users">All Users</option>
//                                 <option value="New Users">New Users Only</option>
//                                 <option value="Premium Users">Premium Users Only</option>
//                             </select>
//                             <select value={formData.applicableBrand} onChange={(e) => setFormData({...formData, applicableBrand: e.target.value})} className="border p-3 rounded">
//                                 <option value="All">All Brands</option>
//                                 <option value="Marshall">Marshall</option>
//                                 <option value="Sony">Sony</option>
//                                 <option value="Bose">Bose</option>
//                             </select>
//                         </div>
//                     </div>

//                     {/* SECTION 4: Premium Features & Display */}
//                     <div className="space-y-4">
//                         <h3 className="font-bold text-gray-700 flex items-center gap-2 bg-gray-100 p-3 rounded"><MonitorPlay size={18}/> 4. Display Settings & Premium Features</h3>
                        
//                         <div className="flex flex-wrap gap-6 mb-4 p-4 border rounded bg-gray-50">
//                             <label className="flex items-center gap-2 cursor-pointer font-medium"><input type="checkbox" checked={formData.isFirstOrderOnly} onChange={(e) => handleCheckboxChange(e, 'isFirstOrderOnly')} className="w-5 h-5 accent-black" /> First Order Only</label>
//                             <label className="flex items-center gap-2 cursor-pointer font-medium"><input type="checkbox" checked={formData.autoApply} onChange={(e) => handleCheckboxChange(e, 'autoApply')} className="w-5 h-5 accent-black" /> Auto Apply Coupon</label>
//                             <label className="flex items-center gap-2 cursor-pointer font-medium text-[#C8A253]"><input type="checkbox" checked={formData.isReward} onChange={(e) => handleCheckboxChange(e, 'isReward')} className="w-5 h-5 accent-[#C8A253]" /> Set as Reward Coupon</label>
//                         </div>

//                         {formData.isReward && (
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-[#C8A253] bg-[floralwhite] rounded">
//                                 <input type="number" placeholder="Reward Condition (e.g. Order Above ₹5000)" value={formData.rewardCondition} onChange={(e) => setFormData({...formData, rewardCondition: e.target.value})} className="border p-3 rounded" />
//                                 <input type="text" placeholder="Reward Coupon Code to give (e.g. NEXT500)" value={formData.rewardCode} onChange={(e) => setFormData({...formData, rewardCode: e.target.value.toUpperCase()})} className="border p-3 rounded uppercase" />
//                             </div>
//                         )}

//                         <div className="p-4 border rounded">
//                             <p className="font-bold mb-3 text-sm">Where should this coupon be visible? (Select multiple):</p>
//                             <div className="flex flex-wrap gap-4">
//                                 {['Home Banner', 'Product Page', 'Checkout Page', 'Payment Success', 'My Coupons'].map(place => (
//                                     <label key={place} className="flex items-center gap-2 text-sm border p-2 rounded bg-white cursor-pointer hover:bg-gray-50 transition-colors">
//                                         <input type="checkbox" value={place} checked={formData.showOn.includes(place)} onChange={handleShowOnChange} className="accent-black w-4 h-4" /> {place}
//                                     </label>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     <button type="submit" className="w-full bg-black text-white px-6 py-4 rounded font-bold hover:bg-gray-900 transition-all uppercase tracking-widest text-lg shadow-lg active:scale-95">
//                         Publish Campaign
//                     </button>
//                 </form>
//             </div>

//             {/* --- ACTIVE CAMPAIGNS TABLE --- */}
//             <h2 className="text-2xl font-bold mb-4 font-serif">Active Campaigns & Database</h2>
//             <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
//                 <table className="w-full text-left whitespace-nowrap">
//                     <thead className="bg-gray-100 border-b text-sm">
//                         <tr>
//                             <th className="p-4 font-semibold text-gray-700">Campaign</th>
//                             <th className="p-4 font-semibold text-gray-700">Code</th>
//                             <th className="p-4 font-semibold text-gray-700">Discount</th>
//                             <th className="p-4 font-semibold text-gray-700 text-center">Status</th>
//                             <th className="p-4 font-semibold text-gray-700">Placements</th>
//                             <th className="p-4 font-semibold text-gray-700">Used Limit</th>
//                             <th className="p-4 font-semibold text-gray-700">Expiry</th>
//                             <th className="p-4 font-semibold text-gray-700 text-center">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {loading ? <tr><td colSpan="8" className="p-10 text-center"><Loader2 className="animate-spin mx-auto text-black" size={32} /></td></tr> 
//                         : coupons.length === 0 ? <tr><td colSpan="8" className="p-10 text-center text-gray-500">No campaigns found. Start creating!</td></tr> 
//                         : coupons.map(c => (
//                             <tr key={c._id} className="border-t hover:bg-gray-50 transition-colors">
//                                 <td className="p-4">
//                                     <div className="font-bold text-black text-sm">{c.name}</div>
//                                     <div className="text-xs text-gray-500">{c.campaignType}</div>
//                                 </td>
//                                 <td className="p-4 font-bold tracking-widest">{c.code}</td>
//                                 <td className="p-4">
//                                     <span className="bg-black text-white px-2 py-1 rounded text-xs font-semibold">
//                                         {c.discountType === 'percentage' ? `${c.discountValue}%` : c.discountType === 'free_shipping' ? 'Free Shipping' : `₹${c.discountValue}`}
//                                     </span>
//                                 </td>
//                                 <td className="p-4 text-center">
//                                     <span className={`px-2 py-1 rounded text-xs font-bold ${c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                                         {c.status}
//                                     </span>
//                                 </td>
//                                 <td className="p-4 text-xs text-gray-600 max-w-[150px] truncate" title={c.showOn?.join(', ')}>
//                                     {c.showOn?.length > 0 ? c.showOn.join(', ') : 'Hidden (System)'}
//                                 </td>
//                                 <td className="p-4 text-sm font-medium text-gray-700">{c.usedCount || 0} / {c.usageLimit || '∞'}</td>
//                                 <td className="p-4 text-sm text-gray-600">{new Date(c.expiryDate).toLocaleDateString()}</td>
//                                 <td className="p-4 text-center">
//                                     <button onClick={() => deleteCoupon(c._id)} className="text-red-500 hover:text-red-700 p-2 transition-colors" title="Delete Campaign">
//                                         <Trash2 size={18} />
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../../utils/axiosInstance';
// import { Trash2, PlusCircle, Loader2, Tag, Settings, Users, MonitorPlay } from 'lucide-react';

// export default function CouponManager() {
//     const [coupons, setCoupons] = useState([]);
//     const [loading, setLoading] = useState(false);
    
//     // ⚡ All 10 Conditions & Campaign Types Added
//     const [formData, setFormData] = useState({ 
//         campaignType: 'Festival', name: '', code: '', description: '', 
//         discountType: 'flat', discountValue: '', maxDiscount: '', 
//         startDate: '', expiryDate: '', status: 'Active',
//         minOrderValue: '', maxOrderValue: '', 
//         applicableFor: 'All Users', isFirstOrderOnly: false,
//         applicableBrand: 'All', applicableCategory: 'All',
//         usageLimit: '', perUserLimit: 1, 
//         showOn: [], 
//         isReward: false, rewardCondition: '', rewardCode: '',
//         autoApply: false
//     });

//     useEffect(() => { fetchCoupons(); }, []);

//     const fetchCoupons = async () => {
//         setLoading(true);
//         try {
//             const { data } = await axiosInstance.get('/coupons/all');
//             setCoupons(data.coupons || []);
//         } catch (err) { console.error("Error fetching coupons", err); } 
//         finally { setLoading(false); }
//     };

//     // ⚡ STATUS TOGGLE LOGIC
//     const updateCouponStatus = async (id, newStatus) => {
//         try {
//             await axiosInstance.put(`/coupons/update/${id}`, { status: newStatus });
//             fetchCoupons(); // Refresh list automatically
//         } catch (err) { alert("Error updating status"); }
//     };

//     const handleCheckboxChange = (e, field) => {
//         setFormData({ ...formData, [field]: e.target.checked });
//     };

//     const handleShowOnChange = (e) => {
//         const value = e.target.value;
//         setFormData(prev => ({
//             ...prev,
//             showOn: prev.showOn.includes(value) 
//                 ? prev.showOn.filter(item => item !== value) 
//                 : [...prev.showOn, value]
//         }));
//     };

//     const createCoupon = async (e) => {
//         e.preventDefault();
//         try {
//             await axiosInstance.post('/coupons/create', formData);
//             alert("Coupon Created Successfully!");
//             setFormData({ 
//                 campaignType: 'Festival', name: '', code: '', description: '', 
//                 discountType: 'flat', discountValue: '', maxDiscount: '', 
//                 startDate: '', expiryDate: '', status: 'Active', 
//                 minOrderValue: '', maxOrderValue: '', 
//                 applicableFor: 'All Users', isFirstOrderOnly: false, 
//                 applicableBrand: 'All', applicableCategory: 'All',
//                 usageLimit: '', perUserLimit: 1, showOn: [], 
//                 isReward: false, rewardCondition: '', rewardCode: '', autoApply: false
//             });
//             fetchCoupons();
//         } catch (err) { alert(err.response?.data?.message || "Error creating coupon"); }
//     };

//     const deleteCoupon = async (id) => {
//         if (!window.confirm("Are you sure you want to delete this campaign?")) return;
//         try {
//             await axiosInstance.delete(`/coupons/${id}`);
//             fetchCoupons();
//         } catch (err) { alert("Error deleting coupon"); }
//     };

//     return (
//         <div className="p-4 md:p-8 bg-gray-50 min-h-screen text-gray-800 font-sans">
//             <h1 className="text-3xl font-serif font-bold mb-8 text-black flex items-center gap-3">
//                 <Tag size={32} className="text-[#C8A253]" /> Premium Coupon Management
//             </h1>

//             {/* --- ADD NEW COUPON FORM --- */}
//             <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 mb-10 shadow-sm">
//                 <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b pb-4">
//                     <PlusCircle size={24} /> Create New Campaign
//                 </h2>
                
//                 <form onSubmit={createCoupon} className="space-y-8">
//                     <div className="space-y-4">
//                         <h3 className="font-bold text-gray-700 flex items-center gap-2 bg-gray-100 p-3 rounded"><Tag size={18}/> 1. Campaign Information</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                             <select value={formData.campaignType} onChange={(e) => setFormData({...formData, campaignType: e.target.value})} className="border p-3 rounded font-semibold text-blue-700 bg-blue-50">
//                                 <option value="Festival">🎉 Festival Offer</option>
//                                 <option value="Brand Offer">🏷️ Brand Offer</option>
//                                 <option value="Welcome Offer">👋 Welcome Offer</option>
//                                 <option value="Checkout Offer">🛒 Checkout Offer</option>
//                                 {/* <option value="Reward Coupon">🎁 Reward Coupon</option>
//                                 <option value="Free Shipping">🚚 Free Shipping</option> */}
//                             </select>
//                             <input type="text" placeholder="Coupon Name (e.g. Diwali Sale)" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="border p-3 rounded" required />
//                             <input type="text" placeholder="Code (e.g. DIWALI500)" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})} className="border p-3 rounded font-bold uppercase" required />
//                             <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className={`border p-3 rounded font-bold ${formData.status === 'Active' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
//                                 <option value="Active">🟢 Active</option>
//                                 <option value="Inactive">🔴 Inactive</option>
//                             </select>
//                         </div>
//                         <input type="text" placeholder="Description (e.g. Get ₹500 OFF on your first purchase)" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="border p-3 rounded w-full" />
//                     </div>

//                     <div className="space-y-4">
//                         <h3 className="font-bold text-gray-700 flex items-center gap-2 bg-gray-100 p-3 rounded"><Settings size={18}/> 2. Discount Rules & Validity</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//                             <select value={formData.discountType} onChange={(e) => setFormData({...formData, discountType: e.target.value})} className="border p-3 rounded">
//                                 <option value="flat">Flat Discount (₹)</option>
//                                 <option value="percentage">Percentage (%)</option>
//                                 <option value="free_shipping">Free Shipping</option>
//                             </select>
//                             <input type="number" placeholder="Discount Value" value={formData.discountValue} onChange={(e) => setFormData({...formData, discountValue: e.target.value})} className="border p-3 rounded" required={formData.discountType !== 'free_shipping'} disabled={formData.discountType === 'free_shipping'} />
//                             <input type="number" placeholder="Max Discount (₹)" value={formData.maxDiscount} onChange={(e) => setFormData({...formData, maxDiscount: e.target.value})} className="border p-3 rounded" disabled={formData.discountType !== 'percentage'} title="Only for Percentage" />
//                             <div className="flex flex-col">
//                                 <label className="text-xs text-gray-500 mb-1">Start Date</label>
//                                 <input type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} className="border p-2 rounded" required />
//                             </div>
//                             <div className="flex flex-col">
//                                 <label className="text-xs text-gray-500 mb-1">Expiry Date</label>
//                                 <input type="date" value={formData.expiryDate} onChange={(e) => setFormData({...formData, expiryDate: e.target.value})} className="border p-2 rounded" required />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="space-y-4">
//                         <h3 className="font-bold text-gray-700 flex items-center gap-2 bg-gray-100 p-3 rounded"><Users size={18}/> 3. Targeting & Limits</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                             <input type="number" placeholder="Min Order Amount (₹)" value={formData.minOrderValue} onChange={(e) => setFormData({...formData, minOrderValue: e.target.value})} className="border p-3 rounded" />
//                             <input type="number" placeholder="Total Usage Limit (e.g. 500)" value={formData.usageLimit} onChange={(e) => setFormData({...formData, usageLimit: e.target.value})} className="border p-3 rounded" />
//                             <select value={formData.applicableFor} onChange={(e) => setFormData({...formData, applicableFor: e.target.value})} className="border p-3 rounded">
//                                 <option value="All Users">All Users</option>
//                                 <option value="New Users">New Users Only</option>
//                                 <option value="Premium Users">Premium Users Only</option>
//                             </select>
//                             <select value={formData.applicableBrand} onChange={(e) => setFormData({...formData, applicableBrand: e.target.value})} className="border p-3 rounded">
//                                 <option value="All">All Brands</option>
//                                 <option value="Marshall">Marshall</option>
//                                 <option value="Sony">Sony</option>
//                                 <option value="Bose">Bose</option>
//                             </select>
//                         </div>
//                     </div>

//                     <div className="space-y-4">
//                         <h3 className="font-bold text-gray-700 flex items-center gap-2 bg-gray-100 p-3 rounded"><MonitorPlay size={18}/> 4. Display Settings</h3>
//                         <div className="flex flex-wrap gap-6 mb-4 p-4 border rounded bg-gray-50">
//                             <label className="flex items-center gap-2 cursor-pointer font-medium"><input type="checkbox" checked={formData.isFirstOrderOnly} onChange={(e) => handleCheckboxChange(e, 'isFirstOrderOnly')} className="w-5 h-5 accent-black" /> First Order Only</label>
//                             <label className="flex items-center gap-2 cursor-pointer font-medium"><input type="checkbox" checked={formData.autoApply} onChange={(e) => handleCheckboxChange(e, 'autoApply')} className="w-5 h-5 accent-black" /> Auto Apply Coupon</label>
//                             <label className="flex items-center gap-2 cursor-pointer font-medium text-[#C8A253]"><input type="checkbox" checked={formData.isReward} onChange={(e) => handleCheckboxChange(e, 'isReward')} className="w-5 h-5 accent-[#C8A253]" /> Set as Reward Coupon</label>
//                         </div>

//                         <div className="p-4 border rounded">
//                             <p className="font-bold mb-3 text-sm">Where should this coupon be visible? (Select multiple):</p>
//                             <div className="flex flex-wrap gap-4">
//                                 {['Home Banner', 'Product Page', 'Checkout Page', 'Payment Success', 'My Coupons'].map(place => (
//                                     <label key={place} className="flex items-center gap-2 text-sm border p-2 rounded bg-white cursor-pointer hover:bg-gray-50 transition-colors">
//                                         <input type="checkbox" value={place} checked={formData.showOn.includes(place)} onChange={handleShowOnChange} className="accent-black w-4 h-4" /> {place}
//                                     </label>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     <button type="submit" className="w-full bg-black text-white px-6 py-4 rounded font-bold hover:bg-gray-900 transition-all uppercase tracking-widest text-lg shadow-lg active:scale-95">
//                         Publish Campaign
//                     </button>
//                 </form>
//             </div>

//             {/* --- ACTIVE CAMPAIGNS TABLE --- */}
//             <h2 className="text-2xl font-bold mb-4 font-serif">Active Campaigns & Database</h2>
//             <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
//                 <table className="w-full text-left whitespace-nowrap">
//                     <thead className="bg-gray-100 border-b text-sm">
//                         <tr>
//                             <th className="p-4">Campaign</th>
//                             <th className="p-4">Code</th>
//                             <th className="p-4">Discount</th>
//                             <th className="p-4 text-center">Status</th>
//                             <th className="p-4">Placements</th>
//                             <th className="p-4">Used</th>
//                             <th className="p-4">Expiry</th>
//                             {/* <th className="p-4">startdate</th> */}
//                             <th className="p-4 text-center">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {loading ? <tr><td colSpan="8" className="p-10 text-center"><Loader2 className="animate-spin mx-auto text-black" size={32} /></td></tr> 
//                         : coupons.length === 0 ? <tr><td colSpan="8" className="p-10 text-center text-gray-500">No campaigns found.</td></tr> 
//                         : coupons.map(c => (
//                             <tr key={c._id} className="border-t hover:bg-gray-50">
//                                 <td className="p-4"><div className="font-bold text-sm">{c.name}</div></td>
//                                 <td className="p-4 font-bold tracking-widest">{c.code}</td>
//                                 <td className="p-4 text-xs font-semibold">{c.discountType === 'percentage' ? `${c.discountValue}%` : `₹${c.discountValue}`}</td>
                                
//                                 {/* ⚡ CLICKABLE STATUS DROPDOWN */}
//                                 <td className="p-4 text-center">
//                                     <select 
//                                         value={c.status} 
//                                         onChange={(e) => updateCouponStatus(c._id, e.target.value)}
//                                         className={`px-3 py-1 rounded text-xs font-bold border-none cursor-pointer focus:ring-0 ${c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
//                                     >
//                                         <option value="Active">🟢 Active</option>
//                                         <option value="Inactive">🔴 Inactive</option>
//                                     </select>
//                                 </td>

//                                 <td className="p-4 text-xs">{c.showOn?.join(', ') || 'Hidden'}</td>
//                                 <td className="p-4 text-sm">{c.usedCount || 0}</td>
//                                 <td className="p-4 text-sm">{new Date(c.expiryDate).toLocaleDateString()}</td>
//                                 {/* <td className="p-4 text-sm">{new Date(c.startdate).toLocaleDateString()}</td> */}
//                                 <td className="p-4 text-center">
//                                     <button onClick={() => deleteCoupon(c._id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { Trash2, PlusCircle, Loader2, Tag, Settings, Users, MonitorPlay } from 'lucide-react';

export default function CouponManager() {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // All 10 Conditions & Campaign Types Added
    const [formData, setFormData] = useState({ 
        campaignType: 'Festival', name: '', code: '', description: '', 
        discountType: 'flat', discountValue: '', maxDiscount: '', 
        startDate: '', expiryDate: '', status: 'Active',
        minOrderValue: '', maxOrderValue: '', 
        applicableFor: 'All Users', isFirstOrderOnly: false,
        applicableBrand: 'All', applicableCategory: 'All',
        usageLimit: '', perUserLimit: 1, 
        showOn: [], 
        isReward: false, rewardCondition: '', rewardCode: '',
        autoApply: false
    });

    useEffect(() => { fetchCoupons(); }, []);

    const fetchCoupons = async () => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.get('/coupons/all');
            setCoupons(data.coupons || []);
        } catch (err) { console.error("Error fetching coupons", err); } 
        finally { setLoading(false); }
    };

    // STATUS TOGGLE LOGIC
    const updateCouponStatus = async (id, newStatus) => {
        try {
            await axiosInstance.put(`/coupons/update/${id}`, { status: newStatus });
            fetchCoupons(); // Refresh list automatically
        } catch (err) { alert("Error updating status"); }
    };

    // ⚡ NAYA: EXPIRY DATE UPDATE LOGIC
    const handleDateUpdate = async (id, newDate) => {
        try {
            await axiosInstance.put(`/coupons/update-date/${id}`, { newExpiryDate: newDate });
            fetchCoupons(); // Refresh table automatically
        } catch (err) {
            alert("Error updating expiry date");
            console.error(err);
        }
    };

    // ⚡ NAYA: Date format theek karne ka helper (HTML date input ke liye)
    const formatDateForInput = (isoDate) => {
        if (!isoDate) return '';
        return new Date(isoDate).toISOString().split('T')[0];
    };

    const handleCheckboxChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.checked });
    };

    const handleShowOnChange = (e) => {
        const value = e.target.value;
        setFormData(prev => ({
            ...prev,
            showOn: prev.showOn.includes(value) 
                ? prev.showOn.filter(item => item !== value) 
                : [...prev.showOn, value]
        }));
    };

    const createCoupon = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/coupons/create', formData);
            alert("Coupon Created Successfully!");
            setFormData({ 
                campaignType: 'Festival', name: '', code: '', description: '', 
                discountType: 'flat', discountValue: '', maxDiscount: '', 
                startDate: '', expiryDate: '', status: 'Active', 
                minOrderValue: '', maxOrderValue: '', 
                applicableFor: 'All Users', isFirstOrderOnly: false, 
                applicableBrand: 'All', applicableCategory: 'All',
                usageLimit: '', perUserLimit: 1, showOn: [], 
                isReward: false, rewardCondition: '', rewardCode: '', autoApply: false
            });
            fetchCoupons();
        } catch (err) { alert(err.response?.data?.message || "Error creating coupon"); }
    };

    const deleteCoupon = async (id) => {
        if (!window.confirm("Are you sure you want to delete this campaign?")) return;
        try {
            await axiosInstance.delete(`/coupons/${id}`);
            fetchCoupons();
        } catch (err) { alert("Error deleting coupon"); }
    };

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen text-gray-800 font-sans">
            <h1 className="text-3xl font-serif font-bold mb-8 text-black flex items-center gap-3">
                <Tag size={32} className="text-[#C8A253]" /> Premium Coupon Management
            </h1>

            {/* --- ADD NEW COUPON FORM --- */}
            <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 mb-10 shadow-sm">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b pb-4">
                    <PlusCircle size={24} /> Create New Campaign
                </h2>
                
                <form onSubmit={createCoupon} className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="font-bold text-gray-700 flex items-center gap-2 bg-gray-100 p-3 rounded"><Tag size={18}/> 1. Campaign Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <select value={formData.campaignType} onChange={(e) => setFormData({...formData, campaignType: e.target.value})} className="border p-3 rounded font-semibold text-blue-700 bg-blue-50">
                                <option value="Festival">🎉 Festival Offer</option>
                                <option value="Brand Offer">🏷️ Brand Offer</option>
                                <option value="Welcome Offer">👋 Welcome Offer</option>
                                <option value="Checkout Offer">🛒 Checkout Offer</option>
                            </select>
                            <input type="text" placeholder="Coupon Name (e.g. Diwali Sale)" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="border p-3 rounded" required />
                            <input type="text" placeholder="Code (e.g. DIWALI500)" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})} className="border p-3 rounded font-bold uppercase" required />
                            <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className={`border p-3 rounded font-bold ${formData.status === 'Active' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                                <option value="Active">🟢 Active</option>
                                <option value="Inactive">🔴 Inactive</option>
                            </select>
                        </div>
                        <input type="text" placeholder="Description (e.g. Get ₹500 OFF on your first purchase)" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="border p-3 rounded w-full" />
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-gray-700 flex items-center gap-2 bg-gray-100 p-3 rounded"><Settings size={18}/> 2. Discount Rules & Validity</h3>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <select value={formData.discountType} onChange={(e) => setFormData({...formData, discountType: e.target.value})} className="border p-3 rounded">
                                <option value="flat">Flat Discount (₹)</option>
                                <option value="percentage">Percentage (%)</option>
                                <option value="free_shipping">Free Shipping</option>
                            </select>
                            <input type="number" placeholder="Discount Value" value={formData.discountValue} onChange={(e) => setFormData({...formData, discountValue: e.target.value})} className="border p-3 rounded" required={formData.discountType !== 'free_shipping'} disabled={formData.discountType === 'free_shipping'} />
                            <input type="number" placeholder="Max Discount (₹)" value={formData.maxDiscount} onChange={(e) => setFormData({...formData, maxDiscount: e.target.value})} className="border p-3 rounded" disabled={formData.discountType !== 'percentage'} title="Only for Percentage" />
                            <div className="flex flex-col">
                                <label className="text-xs text-gray-500 mb-1">Start Date</label>
                                <input type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} className="border p-2 rounded" required />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xs text-gray-500 mb-1">Expiry Date</label>
                                <input type="date" value={formData.expiryDate} onChange={(e) => setFormData({...formData, expiryDate: e.target.value})} className="border p-2 rounded" required />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-gray-700 flex items-center gap-2 bg-gray-100 p-3 rounded"><Users size={18}/> 3. Targeting & Limits</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <input type="number" placeholder="Min Order Amount (₹)" value={formData.minOrderValue} onChange={(e) => setFormData({...formData, minOrderValue: e.target.value})} className="border p-3 rounded" />
                            <input type="number" placeholder="Total Usage Limit (e.g. 500)" value={formData.usageLimit} onChange={(e) => setFormData({...formData, usageLimit: e.target.value})} className="border p-3 rounded" />
                            <select value={formData.applicableFor} onChange={(e) => setFormData({...formData, applicableFor: e.target.value})} className="border p-3 rounded">
                                <option value="All Users">All Users</option>
                                <option value="New Users">New Users Only</option>
                                <option value="Premium Users">Premium Users Only</option>
                            </select>
                            <select value={formData.applicableBrand} onChange={(e) => setFormData({...formData, applicableBrand: e.target.value})} className="border p-3 rounded">
                                <option value="All">All Brands</option>
                                <option value="Marshall">Marshall</option>
                                <option value="Sony">Sony</option>
                                <option value="Bose">Bose</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-gray-700 flex items-center gap-2 bg-gray-100 p-3 rounded"><MonitorPlay size={18}/> 4. Display Settings</h3>
                        <div className="flex flex-wrap gap-6 mb-4 p-4 border rounded bg-gray-50">
                            <label className="flex items-center gap-2 cursor-pointer font-medium"><input type="checkbox" checked={formData.isFirstOrderOnly} onChange={(e) => handleCheckboxChange(e, 'isFirstOrderOnly')} className="w-5 h-5 accent-black" /> First Order Only</label>
                            <label className="flex items-center gap-2 cursor-pointer font-medium"><input type="checkbox" checked={formData.autoApply} onChange={(e) => handleCheckboxChange(e, 'autoApply')} className="w-5 h-5 accent-black" /> Auto Apply Coupon</label>
                            <label className="flex items-center gap-2 cursor-pointer font-medium text-[#C8A253]"><input type="checkbox" checked={formData.isReward} onChange={(e) => handleCheckboxChange(e, 'isReward')} className="w-5 h-5 accent-[#C8A253]" /> Set as Reward Coupon</label>
                        </div>

                        <div className="p-4 border rounded">
                            <p className="font-bold mb-3 text-sm">Where should this coupon be visible? (Select multiple):</p>
                            <div className="flex flex-wrap gap-4">
                                {['Home Banner', 'Product Page', 'Checkout Page', 'Payment Success', 'My Coupons'].map(place => (
                                    <label key={place} className="flex items-center gap-2 text-sm border p-2 rounded bg-white cursor-pointer hover:bg-gray-50 transition-colors">
                                        <input type="checkbox" value={place} checked={formData.showOn.includes(place)} onChange={handleShowOnChange} className="accent-black w-4 h-4" /> {place}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-black text-white px-6 py-4 rounded font-bold hover:bg-gray-900 transition-all uppercase tracking-widest text-lg shadow-lg active:scale-95">
                        Publish Campaign
                    </button>
                </form>
            </div>

            {/* --- ACTIVE CAMPAIGNS TABLE --- */}
            <h2 className="text-2xl font-bold mb-4 font-serif">Active Campaigns & Database</h2>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-gray-100 border-b text-sm">
                        <tr>
                            <th className="p-4">Campaign</th>
                            <th className="p-4">Code</th>
                            <th className="p-4">Discount</th>
                            <th className="p-4 text-center">Status</th>
                            <th className="p-4">Placements</th>
                            <th className="p-4">Used</th>
                            <th className="p-4">Expiry</th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <tr><td colSpan="8" className="p-10 text-center"><Loader2 className="animate-spin mx-auto text-black" size={32} /></td></tr> 
                        : coupons.length === 0 ? <tr><td colSpan="8" className="p-10 text-center text-gray-500">No campaigns found.</td></tr> 
                        : coupons.map(c => (
                            <tr key={c._id} className="border-t hover:bg-gray-50">
                                <td className="p-4"><div className="font-bold text-sm">{c.name}</div></td>
                                <td className="p-4 font-bold tracking-widest">{c.code}</td>
                                <td className="p-4 text-xs font-semibold">{c.discountType === 'percentage' ? `${c.discountValue}%` : `₹${c.discountValue}`}</td>
                                
                                <td className="p-4 text-center">
                                    <select 
                                        value={c.status} 
                                        onChange={(e) => updateCouponStatus(c._id, e.target.value)}
                                        className={`px-3 py-1 rounded text-xs font-bold border-none cursor-pointer focus:ring-0 ${c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                                    >
                                        <option value="Active">🟢 Active</option>
                                        <option value="Inactive">🔴 Inactive</option>
                                    </select>
                                </td>

                                <td className="p-4 text-xs">{c.showOn?.join(', ') || 'Hidden'}</td>
                                <td className="p-4 text-sm">{c.usedCount || 0}</td>
                                
                                {/* ⚡ YAHAN DATE INPUT AAYEGA */}
                                <td className="p-4 text-sm">
                                    <input
                                        type="date"
                                        value={formatDateForInput(c.expiryDate)}
                                        onChange={(e) => handleDateUpdate(c._id, e.target.value)}
                                        className="bg-transparent border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 focus:outline-none focus:border-[#C8A253] focus:ring-1 focus:ring-[#C8A253] cursor-pointer"
                                    />
                                </td>
                                
                                <td className="p-4 text-center">
                                    <button onClick={() => deleteCoupon(c._id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
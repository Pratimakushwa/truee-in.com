// import React, { useState } from "react";
// import { Trash2, Plus } from "lucide-react";

// export default function ManageAddress() {
//   const [addresses, setAddresses] = useState([
//     {
//       id: 1,
//       name: "Prachi Kushwaha",
//       phone: "6267334973",
//       pincode: "462023",
//       locality: "New Ashoka Garden",
//       address: "b178 new ashoka garden bhopal",
//       type: "Home",
//     },
//   ]);

//   const [showForm, setShowForm] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     pincode: "",
//     locality: "",
//     address: "",
//     type: "Home",
//   });

//   const handleSaveAddress = () => {
//     if (!formData.name || !formData.phone) {
//       // alert() ki jagah hum message box suggest karte hain, par logic same rakha hai
//       return;
//     }

//     if (editId) {
//       setAddresses(
//         addresses.map((a) => (a.id === editId ? { ...formData, id: editId } : a))
//       );
//     } else {
//       setAddresses([...addresses, { ...formData, id: Date.now() }]);
//     }

//     setShowForm(false);
//     setEditId(null);

//     setFormData({
//       name: "",
//       phone: "",
//       pincode: "",
//       locality: "",
//       address: "",
//       type: "Home",
//     });
//   };

//   const deleteAddress = (id) => {
//     setAddresses(addresses.filter((a) => a.id !== id));
//   };

//   const handleEditAddress = (item) => {
//     setEditId(item.id);
//     setFormData(item);
//     setShowForm(true);
//   };

//   return (
//     <div className="p-8 bg-white min-h-screen">
//       <h2 
//         className="text-2xl font-semibold text-gray-800 mb-8 border-b border-gray-100 pb-4" 
//         style={{ fontFamily: "'Playfair Display', serif" }}
//       >
//         Manage Addresses
//       </h2>

//       {/* Add Address Button */}
//       {!showForm && (
//         <button
//           onClick={() => setShowForm(true)}
//           className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 p-4 mb-8 text-yellow-600 font-bold hover:bg-yellow-50 hover:border-yellow-200 transition-all rounded-sm"
//         >
//           <Plus size={18} />
//           ADD NEW ADDRESS
//         </button>
//       )}

//       {/* Address Form */}
//       {showForm && (
//         <div className="border border-gray-200 p-6 mb-8 bg-gray-50 rounded-sm shadow-sm">
//           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
//             {editId ? "Edit Address" : "Add New Address"}
//           </h3>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <input
//               placeholder="Name"
//               className="p-3 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             />
//             <input
//               placeholder="Phone Number"
//               className="p-3 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
//               value={formData.phone}
//               onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <input
//               placeholder="Pincode"
//               className="p-3 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
//               value={formData.pincode}
//               onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
//             />
//             <input
//               placeholder="Locality"
//               className="p-3 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
//               value={formData.locality}
//               onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
//             />
//           </div>

//           <textarea
//             placeholder="Full Address (House No, Building, Street, Area)"
//             rows="3"
//             className="w-full p-3 mb-6 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
//             value={formData.address}
//             onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//           />

//           <div className="flex items-center gap-6">
//             <button
//               onClick={handleSaveAddress}
//               className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-10 py-3 rounded-sm transition-colors uppercase text-sm tracking-widest shadow-md"
//             >
//               {editId ? "Update" : "Save"}
//             </button>
//             <button
//               onClick={() => {
//                 setShowForm(false);
//                 setEditId(null);
//               }}
//               className="text-gray-500 font-bold hover:text-black uppercase text-sm tracking-widest"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Address List */}
//       <div className="space-y-4">
//         {addresses.map((item) => (
//           <div
//             key={item.id}
//             className="group border border-gray-200 p-6 bg-white hover:shadow-md transition-shadow relative rounded-sm"
//           >
//             <div className="absolute top-6 right-6 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
//               <button
//                 onClick={() => handleEditAddress(item)}
//                 className="text-blue-600 hover:underline text-xs font-bold uppercase tracking-widest"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => deleteAddress(item.id)}
//                 className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-widest"
//               >
//                 <Trash2 size={14} /> Delete
//               </button>
//             </div>

//             <div className="inline-block bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter mb-3">
//               {item.type}
//             </div>

//             <h3 className="font-bold text-gray-800 text-lg mb-1">
//               {item.name}
//             </h3>
            
//             <p className="text-gray-600 text-sm leading-relaxed max-w-md">
//               {item.address}, {item.locality} - <span className="font-semibold">{item.pincode}</span>
//             </p>
            
//             <p className="text-gray-800 font-medium mt-3 flex items-center gap-2">
//               <span className="text-gray-400 text-xs font-bold uppercase">Phone:</span> {item.phone}
//             </p>
//           </div>
//         ))}

//         {addresses.length === 0 && !showForm && (
//           <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded">
//             <p className="text-gray-400">No addresses saved yet.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Trash2, Plus } from "lucide-react";
// import axiosInstance from "../utils/axiosInstance"; // ⚡ API calls ke liye

// export default function ManageAddress() {
//   const [addresses, setAddresses] = useState([]); // ⚡ Ab hardcoded data hata diya hai
//   const [showForm, setShowForm] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     pincode: "",
//     locality: "",
//     address: "",
//     type: "Home",
//   });

//   // ⚡ 1. Database se Addresses mangwana (Read)
//   useEffect(() => {
//     const fetchAddresses = async () => {
//       try {
//         const { data } = await axiosInstance.get('/auth/profile');
//         if (data.success && data.user && data.user.addresses) {
//           setAddresses(data.user.addresses);
//         }
//       } catch (error) {
//         console.error("Addresses lane me error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAddresses();
//   }, []);

//   // ⚡ 2. Naya Address Save ya Update karna (Create/Update)
//   const handleSaveAddress = async () => {
//     if (!formData.name || !formData.phone) return;

//     try {
//       let updatedAddresses;
      
//       if (editId) {
//         // Edit existing address
//         updatedAddresses = addresses.map((a) => (a._id === editId ? { ...formData, _id: editId } : a));
//       } else {
//         // Add new address
//         updatedAddresses = [...addresses, formData];
//       }

//       // Backend ko updated addresses bhejna
//       const { data } = await axiosInstance.put('/auth/profile', { addresses: updatedAddresses });
      
//       if (data.success) {
//         // Database se jo update ho kar aaya, wo UI me set karo
//         setAddresses(data.user?.addresses || updatedAddresses);
//         setShowForm(false);
//         setEditId(null);
//         setFormData({ name: "", phone: "", pincode: "", locality: "", address: "", type: "Home" });
//       }
//     } catch (error) {
//       console.error("Address save karne me error:", error);
//       alert("Address save nahi hua. Phir se try karo.");
//     }
//   };

//   // ⚡ 3. Address Delete karna (Delete)
//   const deleteAddress = async (id) => {
//     try {
//       const filteredAddresses = addresses.filter((a) => a._id !== id);
      
//       // Backend ko update bhejna ki ye address hata do
//       const { data } = await axiosInstance.put('/auth/profile', { addresses: filteredAddresses });
      
//       if (data.success) {
//         setAddresses(filteredAddresses);
//       }
//     } catch (error) {
//       console.error("Delete karne me error:", error);
//     }
//   };

//   const handleEditAddress = (item) => {
//     setEditId(item._id); // ⚡ MongoDB ID _id hoti hai
//     setFormData(item);
//     setShowForm(true);
//   };

//   if (loading) {
//     return <div className="p-8 text-gray-500">Loading addresses...</div>;
//   }

//   return (
//     <div className="p-8 bg-white min-h-screen">
//       <h2 
//         className="text-2xl font-semibold text-gray-800 mb-8 border-b border-gray-100 pb-4" 
//         style={{ fontFamily: "'Playfair Display', serif" }}
//       >
//         Manage Addresses
//       </h2>

//       {!showForm && (
//         <button
//           onClick={() => setShowForm(true)}
//           className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 p-4 mb-8 text-yellow-600 font-bold hover:bg-yellow-50 hover:border-yellow-200 transition-all rounded-sm"
//         >
//           <Plus size={18} /> ADD NEW ADDRESS
//         </button>
//       )}

//       {showForm && (
//         <div className="border border-gray-200 p-6 mb-8 bg-gray-50 rounded-sm shadow-sm">
//           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
//             {editId ? "Edit Address" : "Add New Address"}
//           </h3>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <input
//               placeholder="Name"
//               className="p-3 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             />
//             <input
//               placeholder="Phone Number"
//               className="p-3 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
//               value={formData.phone}
//               onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <input
//               placeholder="Pincode"
//               className="p-3 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
//               value={formData.pincode}
//               onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
//             />
//             <input
//               placeholder="Locality"
//               className="p-3 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
//               value={formData.locality}
//               onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
//             />
//           </div>

//           <textarea
//             placeholder="Full Address (House No, Building, Street, Area)"
//             rows="3"
//             className="w-full p-3 mb-6 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
//             value={formData.address}
//             onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//           />

//           <div className="flex items-center gap-6">
//             <button
//               onClick={handleSaveAddress}
//               className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-10 py-3 rounded-sm transition-colors uppercase text-sm tracking-widest shadow-md"
//             >
//               {editId ? "Update" : "Save"}
//             </button>
//             <button
//               onClick={() => {
//                 setShowForm(false);
//                 setEditId(null);
//                 setFormData({ name: "", phone: "", pincode: "", locality: "", address: "", type: "Home" });
//               }}
//               className="text-gray-500 font-bold hover:text-black uppercase text-sm tracking-widest"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="space-y-4">
//         {addresses.map((item) => (
//           <div
//             key={item._id} // ⚡ Database ab _id use karta hai, id nahi
//             className="group border border-gray-200 p-6 bg-white hover:shadow-md transition-shadow relative rounded-sm"
//           >
//             <div className="absolute top-6 right-6 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
//               <button
//                 onClick={() => handleEditAddress(item)}
//                 className="text-blue-600 hover:underline text-xs font-bold uppercase tracking-widest"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => deleteAddress(item._id)}
//                 className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-widest"
//               >
//                 <Trash2 size={14} /> Delete
//               </button>
//             </div>

//             <div className="inline-block bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter mb-3">
//               {item.type || 'Home'}
//             </div>

//             <h3 className="font-bold text-gray-800 text-lg mb-1">{item.name}</h3>
            
//             <p className="text-gray-600 text-sm leading-relaxed max-w-md">
//               {item.address}, {item.locality} - <span className="font-semibold">{item.pincode}</span>
//             </p>
            
//             <p className="text-gray-800 font-medium mt-3 flex items-center gap-2">
//               <span className="text-gray-400 text-xs font-bold uppercase">Phone:</span> {item.phone}
//             </p>
//           </div>
//         ))}

//         {addresses.length === 0 && !showForm && (
//           <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded">
//             <p className="text-gray-400">No addresses saved yet.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Trash2, Plus } from "lucide-react";
// import axiosInstance from "../utils/axiosInstance";

// export default function ManageAddress() {
//   const [addresses, setAddresses] = useState([]); 
//   const [showForm, setShowForm] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ⚡ FIX 1: Form Data ko DB Schema (Checkout page jaisa) exact match kar diya
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     pincode: "",
//     addressLine1: "",
//     city: "",
//     state: "",
//     country: "India",
//     type: "Home",
//   });

//   // 1. Fetch Addresses
//   useEffect(() => {
//     const fetchAddresses = async () => {
//       try {
//         const { data } = await axiosInstance.get('/auth/profile');
//         if (data.success && data.user && data.user.addresses) {
//           setAddresses(data.user.addresses);
//         }
//       } catch (error) {
//         console.error("Addresses lane me error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAddresses();
//   }, []);

//   // 2. Save/Update Address
//   const handleSaveAddress = async () => {
//     // Basic validation
//     if (!formData.firstName || !formData.phone || !formData.addressLine1 || !formData.city) {
//       alert("Please fill all required fields!");
//       return;
//     }

//     try {
//       let updatedAddresses;
      
//       if (editId) {
//         updatedAddresses = addresses.map((a) => (a._id === editId ? { ...formData, _id: editId } : a));
//       } else {
//         updatedAddresses = [...addresses, formData];
//       }

//       // ⚡ Sending exactly what the DB expects
//       const { data } = await axiosInstance.put('/auth/profile', { addresses: updatedAddresses });
      
//       if (data.success) {
//         setAddresses(data.user?.addresses || updatedAddresses);
//         setShowForm(false);
//         setEditId(null);
//         // Reset form to default Schema
//         setFormData({ firstName: "", lastName: "", phone: "", pincode: "", addressLine1: "", city: "", state: "", country: "India", type: "Home" });
//       }
//     } catch (error) {
//       console.error("Address save karne me error:", error);
//       alert("Address save nahi hua. Phir se try karo.");
//     }
//   };

//   // 3. Delete Address
//   const deleteAddress = async (id) => {
//     try {
//       const filteredAddresses = addresses.filter((a) => a._id !== id);
//       const { data } = await axiosInstance.put('/auth/profile', { addresses: filteredAddresses });
      
//       if (data.success) {
//         setAddresses(filteredAddresses);
//       }
//     } catch (error) {
//       console.error("Delete karne me error:", error);
//     }
//   };

//   const handleEditAddress = (item) => {
//     setEditId(item._id); 
//     setFormData({
//       firstName: item.firstName || "",
//       lastName: item.lastName || "",
//       phone: item.phone || "",
//       pincode: item.pincode || "",
//       addressLine1: item.addressLine1 || "",
//       city: item.city || "",
//       state: item.state || "",
//       country: item.country || "India",
//       type: item.type || "Home",
//     });
//     setShowForm(true);
//   };

//   if (loading) {
//     return <div className="p-8 text-gray-500">Loading addresses...</div>;
//   }

//   return (
//     <div className="p-8 bg-white min-h-screen">
//       <h2 
//         className="text-2xl font-semibold text-gray-800 mb-8 border-b border-gray-100 pb-4" 
//         style={{ fontFamily: "'Playfair Display', serif" }}
//       >
//         Manage Addresses
//       </h2>

//       {!showForm && (
//         <button
//           onClick={() => setShowForm(true)}
//           className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 p-4 mb-8 text-yellow-600 font-bold hover:bg-yellow-50 hover:border-yellow-200 transition-all rounded-sm cursor-pointer"
//         >
//           <Plus size={18} /> ADD NEW ADDRESS
//         </button>
//       )}

//       {showForm && (
//         <div className="border border-gray-200 p-6 mb-8 bg-gray-50 rounded-sm shadow-sm">
//           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
//             {editId ? "Edit Address" : "Add New Address"}
//           </h3>
          
//           {/* ⚡ FIX 2: Inputs ko naye schema ke hisab se set kiya */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <input
//               placeholder="First Name"
//               className="p-3 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
//               value={formData.firstName}
//               onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
//             />
//             <input
//               placeholder="Last Name"
//               className="p-3 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
//               value={formData.lastName}
//               onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <input
//               placeholder="Phone Number"
//               className="p-3 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
//               value={formData.phone}
//               onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//             />
//             <input
//               placeholder="Pincode"
//               className="p-3 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
//               value={formData.pincode}
//               onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
//             />
//           </div>

//           <textarea
//             placeholder="Address Line 1 (House No, Building, Street)"
//             rows="3"
//             className="w-full p-3 mb-4 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
//             value={formData.addressLine1}
//             onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
//           />

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <input
//               placeholder="City"
//               className="p-3 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
//               value={formData.city}
//               onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//             />
//             <input
//               placeholder="State"
//               className="p-3 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
//               value={formData.state}
//               onChange={(e) => setFormData({ ...formData, state: e.target.value })}
//             />
//           </div>

//           <div className="flex items-center gap-6">
//             <button
//               onClick={handleSaveAddress}
//               className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-10 py-3 rounded-sm transition-colors uppercase text-sm tracking-widest shadow-md cursor-pointer"
//             >
//               {editId ? "Update" : "Save"}
//             </button>
//             <button
//               onClick={() => {
//                 setShowForm(false);
//                 setEditId(null);
//                 setFormData({ firstName: "", lastName: "", phone: "", pincode: "", addressLine1: "", city: "", state: "", country: "India", type: "Home" });
//               }}
//               className="text-gray-500 font-bold hover:text-black uppercase text-sm tracking-widest cursor-pointer"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="space-y-4">
//         {addresses.map((item) => (
//           <div
//             key={item._id} 
//             className="group border border-gray-200 p-6 bg-white hover:shadow-md transition-shadow relative rounded-sm"
//           >
//             <div className="absolute top-6 right-6 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
//               <button
//                 onClick={() => handleEditAddress(item)}
//                 className="text-blue-600 hover:underline text-xs font-bold uppercase tracking-widest cursor-pointer"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => deleteAddress(item._id)}
//                 className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-widest cursor-pointer"
//               >
//                 <Trash2 size={14} /> Delete
//               </button>
//             </div>

//             <div className="inline-block bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter mb-3">
//               {item.type || 'Home'}
//             </div>

//             {/* ⚡ FIX 3: Details ko correct schema variables se show kiya */}
//             <h3 className="font-bold text-gray-800 text-lg mb-1">{item.firstName} {item.lastName}</h3>
            
//             <p className="text-gray-600 text-sm leading-relaxed max-w-md">
//               {item.addressLine1}, {item.city}, {item.state} - <span className="font-semibold">{item.pincode}</span>
//             </p>
            
//             <p className="text-gray-800 font-medium mt-3 flex items-center gap-2">
//               <span className="text-gray-400 text-xs font-bold uppercase">Phone:</span> {item.phone}
//             </p>
//           </div>
//         ))}

//         {addresses.length === 0 && !showForm && (
//           <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded">
//             <p className="text-gray-400">No addresses saved yet.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Trash2, Plus, MapPin, Phone, User, CheckCircle2, Loader2 } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

// 📦 Fixed list of all 36 Indian States & Union Territories
const indianStates = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", 
  "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", 
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", 
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", 
  "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

// 🌆 Major Cities Data for Suggestions (User can still type custom city)
const majorCitiesByState = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  "Chandigarh": ["Chandigarh"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur"],
  "Delhi": ["New Delhi", "Dwarka", "Rohini", "Saket"],
  "Goa": ["Panaji", "Vasco da Gama", "Margao"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Mandi"],
  "Jammu and Kashmir": ["Srinagar", "Jammu"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Belagavi"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Puri"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida", "Ghaziabad", "Agra", "Varanasi", "Prayagraj"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri"]
};

export default function ManageAddress() {
  const [addresses, setAddresses] = useState([]); 
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pincodeLoading, setPincodeLoading] = useState(false);

  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    phone: ""
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    pincode: "",
    addressLine1: "",
    city: "",
    state: "",
    country: "India",
    type: "Home",
  });

  useEffect(() => {
    const fetchProfileAndAddresses = async () => {
      try {
        const { data } = await axiosInstance.get('/auth/profile');
        if (data.success && data.user) {
          const fetchedUser = data.user;
          setUserProfile({
            firstName: fetchedUser.firstName || fetchedUser.name?.split(" ")[0] || "",
            lastName: fetchedUser.lastName || fetchedUser.name?.split(" ").slice(1).join(" ") || "",
            phone: fetchedUser.phone || fetchedUser.phoneNumber || ""
          });

          if (fetchedUser.addresses) {
            setAddresses(fetchedUser.addresses);
          }
        }
      } catch (error) {
        console.error("Profile/Addresses lane me error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileAndAddresses();
  }, []);

  const handleAddNewClick = () => {
    setEditId(null);
    setFormData({
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      phone: userProfile.phone,
      pincode: "",
      addressLine1: "",
      city: "",
      state: "",
      country: "India",
      type: "Home",
    });
    setShowForm(true);
  };

  const handleSaveAddress = async () => {
    if (!formData.firstName || !formData.phone || !formData.addressLine1 || !formData.city || !formData.state || !formData.pincode) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      let updatedAddresses;
      if (editId) {
        updatedAddresses = addresses.map((a) => (a._id === editId ? { ...formData, _id: editId } : a));
      } else {
        updatedAddresses = [...addresses, formData];
      }

      const { data } = await axiosInstance.put('/auth/profile', { addresses: updatedAddresses });
      
      if (data.success) {
        setAddresses(data.user?.addresses || updatedAddresses);
        setShowForm(false);
        setEditId(null);
        setFormData({ firstName: "", lastName: "", phone: "", pincode: "", addressLine1: "", city: "", state: "", country: "India", type: "Home" });
      }
    } catch (error) {
      console.error("Address save karne me error:", error);
      alert("Address save nahi hua. Phir se try karo.");
    }
  };

  const deleteAddress = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    try {
      const filteredAddresses = addresses.filter((a) => a._id !== id);
      const { data } = await axiosInstance.put('/auth/profile', { addresses: filteredAddresses });
      if (data.success) {
        setAddresses(filteredAddresses);
      }
    } catch (error) {
      console.error("Delete karne me error:", error);
    }
  };

  const handleEditAddress = (item) => {
    setEditId(item._id); 
    setFormData({
      firstName: item.firstName || "",
      lastName: item.lastName || "",
      phone: item.phone || "",
      pincode: item.pincode || "",
      addressLine1: item.addressLine1 || "",
      city: item.city || "",
      state: item.state || "",
      country: item.country || "India",
      type: item.type || "Home",
    });
    setShowForm(true);
  };

  // ⚡ Smart Pincode Handler
  const handlePincodeChange = async (e) => {
    const pin = e.target.value.replace(/\D/g, ""); // Allow only numbers
    setFormData((prev) => ({ ...prev, pincode: pin }));

    // API call only on exactly 6 digits
    if (pin.length === 6) {
      setPincodeLoading(true);
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
        const data = await response.json();
        
        if (data && data[0].Status === "Success") {
          const postOffice = data[0].PostOffice[0];
          setFormData((prev) => ({
            ...prev,
            city: postOffice.District || postOffice.Block || postOffice.Name,
            state: postOffice.State
          }));
        }
      } catch (error) {
        console.error("Pincode fetch error:", error);
      } finally {
        setPincodeLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <Loader2 className="animate-spin text-[#C8A253] mb-4" size={40} />
        <p className="text-sm font-medium uppercase tracking-widest text-gray-400">Loading details...</p>
      </div>
    );
  }

  return (
    // Change this line in your return statement
<div className="px-4 md:px-4 pt-2 md:pt-4 pb-4 min-h-screen text-gray-800">
      <div className="flex flex-col md:flex-row md:items-center  bg-black  p-7 rounded-2xl justify-between border-b border-gray-100 pb-6 mb-8">
        <div>
          <h2 
            className="text-3xl  text-white font-serif mb-2" 
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Manage Addresses
          </h2>
          <p className="text-xs text-gray-400 uppercase tracking-widest">Configure your premium shipping destinations</p>
        </div>
        
        {!showForm && (
         <button
  onClick={handleAddNewClick}
  className="mt-4 md:mt-0 flex items-center justify-center gap-2 border border-[#C8A253] text-[#C8A253] px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#C8A253] hover:text-white transition-all duration-300 rounded-none cursor-pointer active:scale-95"
>
  <Plus size={16} /> ADD NEW ADDRESS
</button>
        )}
      </div>

      {showForm && (
        <div className="border border-gray-100 p-6 md:p-8 mb-10 bg-gray-100 rounded-none shadow-sm max-w-4xl transition-all">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
            <h3 className="text-sm font-bold text-black uppercase tracking-widest flex items-center gap-2">
              <MapPin size={16} className="text-[#C8A253]" />
              {editId ? "Modify Saved Address" : "New Shipping Address"}
            </h3>
            
            {!editId && userProfile.firstName && (
              <span className="flex items-center gap-1 text-[11px] text-green-600 font-bold bg-green-50 px-3 py-1 border border-green-200 rounded-full">
                <CheckCircle2 size={12} /> Auto-filled from Profile
              </span>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 block">First Name</label>
                <input
                  type="text"
                  placeholder="e.g. Prachi"
                  className="w-full p-3 bg-white border border-gray-200 rounded-none outline-none focus:border-[#C8A253] text-gray-800 text-sm"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="relative">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 block">Last Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sharma"
                  className="w-full p-3 bg-white border border-gray-200 rounded-none outline-none focus:border-[#C8A253] text-gray-800 text-sm"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 block">Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g. +91 9876543210"
                  className="w-full p-3 bg-white border border-gray-200 rounded-none outline-none focus:border-[#C8A253] text-gray-800 text-sm font-mono"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              
              <div className="relative">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 flex justify-between">
                  Pincode
                  {pincodeLoading && <span className="text-[#C8A253] animate-pulse">Fetching details...</span>}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength="6"
                    placeholder="e.g. 462001"
                    className="w-full p-3 bg-white border border-gray-200 rounded-none outline-none focus:border-[#C8A253] text-gray-800 text-sm font-mono"
                    value={formData.pincode}
                    onChange={handlePincodeChange}
                  />
                  {pincodeLoading && (
                    <Loader2 className="absolute right-3 top-3 animate-spin text-[#C8A253]" size={18} />
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 block">Address Details</label>
              <textarea
                placeholder="Flat/House No., Apartment name, Street address"
                rows="3"
                className="w-full p-3 bg-white border border-gray-200 rounded-none outline-none focus:border-[#C8A253] text-gray-800 text-sm leading-relaxed"
                value={formData.addressLine1}
                onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* State Dropdown */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 block">State</label>
                <select
                  className={`w-full p-3 bg-white border border-gray-200 rounded-none outline-none focus:border-[#C8A253] text-gray-800 text-sm font-medium transition-all ${pincodeLoading ? 'opacity-50' : ''}`}
                  value={formData.state}
                  onChange={(e) => {
                    // Jab state change ho, toh city input clear kar do taki naye state ki city type kar sake
                    setFormData({ ...formData, state: e.target.value, city: "" });
                  }}
                >
                  <option value="">Select State</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* ⚡ City Select + Input (Datalist approach) */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 block">City</label>
                <input
                  type="text"
                  list="city-suggestions" // Yeh id niche wale datalist se match kar rahi hai
                  placeholder="e.g. Bhopal"
                  autoComplete="off"
                  className={`w-full p-3 bg-white border border-gray-200 rounded-none outline-none focus:border-[#C8A253] text-gray-800 text-sm transition-all ${pincodeLoading ? 'opacity-50' : ''}`}
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
                
                {/* Dynamically generating suggestions based on Selected State */}
                <datalist id="city-suggestions">
                  {formData.state && majorCitiesByState[formData.state]
                    ? majorCitiesByState[formData.state].map((city) => (
                        <option key={city} value={city} />
                      ))
                    : null}
                </datalist>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1 block">Address Label</label>
                <select
                  className="w-full p-3 bg-white border border-gray-200 rounded-none outline-none focus:border-[#C8A253] text-gray-800 text-sm font-bold"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="Home">🏠 Home Address</option>
                  <option value="Work">🏢 Work / Office</option>
                  <option value="Other">📍 Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-8 border-t border-gray-200 pt-6">
            <button
              onClick={handleSaveAddress}
              className="bg-black hover:bg-[#C8A253] text-white font-bold px-12 py-3.5 rounded-none transition-all duration-300 uppercase text-xs tracking-widest shadow-md cursor-pointer active:scale-95"
            >
              {editId ? "Update Destination" : "Save Destination"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditId(null);
                setFormData({ firstName: "", lastName: "", phone: "", pincode: "", addressLine1: "", city: "", state: "", country: "India", type: "Home" });
              }}
              className="text-gray-400 font-bold hover:text-black uppercase text-xs tracking-widest transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

  {/* Updated Address Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
  {addresses.map((item) => (
    <div
      key={item._id} 
      className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-2xl hover:border-gray-200 transition-all duration-500 relative flex flex-col justify-between overflow-hidden"
    >
      {/* Actions */}
      <div className="absolute top-6 right-6 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => handleEditAddress(item)}
          className="text-[10px] font-bold uppercase tracking-widest text-black hover:text-[#C8A253] transition-colors cursor-pointer"
        >
          Edit
        </button>
        <button
          onClick={() => deleteAddress(item._id)}
          className="flex items-center gap-1 text-red-400 hover:text-red-600 text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
        >
          <Trash2 size={12} /> Delete
        </button>
      </div>

      {/* Card Content */}
      <div>
        <div className="inline-block bg-gray-50 border border-gray-100 text-gray-400 text-[9px] font-bold px-3 py-1 mb-4 uppercase tracking-widest rounded-full">
          {item.type || 'Home'}
        </div>

        <h3 className="font-bold text-black text-lg mb-2 flex items-center gap-2">
          {item.firstName} {item.lastName}
        </h3>
        
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {item.addressLine1}, {item.city}, {item.state} - <span className="font-bold text-black font-mono">{item.pincode}</span>
        </p>
      </div>

      {/* Footer Info */}
      <div className="border-t border-gray-50 pt-4 mt-2 flex items-center justify-between text-xs">
        <span className="flex items-center gap-2 text-gray-700 font-medium font-mono">
          <Phone size={12} className="text-[#C8A253]" /> {item.phone}
        </span>
        <span className="text-[9px] text-gray-300 font-bold uppercase tracking-wider">{item.country}</span>
      </div>
    </div>
  ))}
</div>

      {addresses.length === 0 && !showForm && (
        <div className="text-center py-24 border border-dashed border-gray-200 rounded-none max-w-xl">
          <MapPin size={40} className="mx-auto text-gray-300 mb-4" />
          <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">No shipping addresses saved</p>
          <button
            onClick={handleAddNewClick}
            className="border border-black text-black px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all cursor-pointer"
          >
            Create your first Address
          </button>
        </div>
      )}
    </div>
  );
}
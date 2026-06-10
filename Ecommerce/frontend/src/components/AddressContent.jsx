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

import React, { useState, useEffect } from "react";
import { Trash2, Plus } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

export default function ManageAddress() {
  const [addresses, setAddresses] = useState([]); 
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⚡ FIX 1: Form Data ko DB Schema (Checkout page jaisa) exact match kar diya
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

  // 1. Fetch Addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const { data } = await axiosInstance.get('/auth/profile');
        if (data.success && data.user && data.user.addresses) {
          setAddresses(data.user.addresses);
        }
      } catch (error) {
        console.error("Addresses lane me error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  // 2. Save/Update Address
  const handleSaveAddress = async () => {
    // Basic validation
    if (!formData.firstName || !formData.phone || !formData.addressLine1 || !formData.city) {
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

      // ⚡ Sending exactly what the DB expects
      const { data } = await axiosInstance.put('/auth/profile', { addresses: updatedAddresses });
      
      if (data.success) {
        setAddresses(data.user?.addresses || updatedAddresses);
        setShowForm(false);
        setEditId(null);
        // Reset form to default Schema
        setFormData({ firstName: "", lastName: "", phone: "", pincode: "", addressLine1: "", city: "", state: "", country: "India", type: "Home" });
      }
    } catch (error) {
      console.error("Address save karne me error:", error);
      alert("Address save nahi hua. Phir se try karo.");
    }
  };

  // 3. Delete Address
  const deleteAddress = async (id) => {
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

  if (loading) {
    return <div className="p-8 text-gray-500">Loading addresses...</div>;
  }

  return (
    <div className="p-8 bg-white min-h-screen">
      <h2 
        className="text-2xl font-semibold text-gray-800 mb-8 border-b border-gray-100 pb-4" 
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Manage Addresses
      </h2>

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 p-4 mb-8 text-yellow-600 font-bold hover:bg-yellow-50 hover:border-yellow-200 transition-all rounded-sm cursor-pointer"
        >
          <Plus size={18} /> ADD NEW ADDRESS
        </button>
      )}

      {showForm && (
        <div className="border border-gray-200 p-6 mb-8 bg-gray-50 rounded-sm shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            {editId ? "Edit Address" : "Add New Address"}
          </h3>
          
          {/* ⚡ FIX 2: Inputs ko naye schema ke hisab se set kiya */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              placeholder="First Name"
              className="p-3 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <input
              placeholder="Last Name"
              className="p-3 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              placeholder="Phone Number"
              className="p-3 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <input
              placeholder="Pincode"
              className="p-3 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
            />
          </div>

          <textarea
            placeholder="Address Line 1 (House No, Building, Street)"
            rows="3"
            className="w-full p-3 mb-4 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
            value={formData.addressLine1}
            onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              placeholder="City"
              className="p-3 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
            <input
              placeholder="State"
              className="p-3 bg-white border border-gray-200 rounded outline-none focus:border-yellow-500 text-gray-800"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={handleSaveAddress}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-10 py-3 rounded-sm transition-colors uppercase text-sm tracking-widest shadow-md cursor-pointer"
            >
              {editId ? "Update" : "Save"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditId(null);
                setFormData({ firstName: "", lastName: "", phone: "", pincode: "", addressLine1: "", city: "", state: "", country: "India", type: "Home" });
              }}
              className="text-gray-500 font-bold hover:text-black uppercase text-sm tracking-widest cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {addresses.map((item) => (
          <div
            key={item._id} 
            className="group border border-gray-200 p-6 bg-white hover:shadow-md transition-shadow relative rounded-sm"
          >
            <div className="absolute top-6 right-6 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEditAddress(item)}
                className="text-blue-600 hover:underline text-xs font-bold uppercase tracking-widest cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => deleteAddress(item._id)}
                className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-widest cursor-pointer"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>

            <div className="inline-block bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter mb-3">
              {item.type || 'Home'}
            </div>

            {/* ⚡ FIX 3: Details ko correct schema variables se show kiya */}
            <h3 className="font-bold text-gray-800 text-lg mb-1">{item.firstName} {item.lastName}</h3>
            
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              {item.addressLine1}, {item.city}, {item.state} - <span className="font-semibold">{item.pincode}</span>
            </p>
            
            <p className="text-gray-800 font-medium mt-3 flex items-center gap-2">
              <span className="text-gray-400 text-xs font-bold uppercase">Phone:</span> {item.phone}
            </p>
          </div>
        ))}

        {addresses.length === 0 && !showForm && (
          <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded">
            <p className="text-gray-400">No addresses saved yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
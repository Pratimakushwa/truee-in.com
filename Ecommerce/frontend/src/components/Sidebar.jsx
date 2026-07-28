


// import React, { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import { ShoppingBag, Settings, Box, CreditCard, Power, ChevronLeft, ChevronRight, X, Heart, Mail ,MapPin} from "lucide-react"
// import Sidebaritem from "./Sidebaritem"
// import axiosInstance from "../utils/axiosInstance"

// const Sidebar = ({ activeTab, setActiveTab, isCollapsed, setIsCollapsed, setIsMobileOpen }) => {
//   const navigate = useNavigate()
//   const [userData, setUserData] = useState({ firstName: "User", lastName: "" })

//   useEffect(() => {
//     // API Fetch logic wahi hai
//     const fetchUser = async () => {
//       try {
//         const { data } = await axiosInstance.get('/auth/profile');
//         if (data.success && data.user) {
//           const fullName = data.user.name || "User";
//           const nameParts = fullName.trim().split(" ");
//           setUserData({ firstName: nameParts[0], lastName: nameParts.slice(1).join(" ") });
//         }
//       } catch (error) {
//         console.error("Sidebar user fetch error:", error);
//       }
//     };
//     fetchUser();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     navigate("/login")
//   }

//   const SectionHeader = ({ title }) => (
//     !isCollapsed && (
//       <div className="px-5 md:px-6 py-4 mt-2">
//         <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#666] border-b border-[#222] pb-2">
//           {title}
//         </p>
//       </div>
//     )
//   )

//   return (
//     <div className="flex flex-col h-full bg-[#0a0a0a] text-gray-300 relative">
      
//       {/* ⚡ MOBILE HEADER & CLOSE BUTTON (Sirf mobile pe dikhega) */}
//       <div className="md:hidden flex items-center justify-between p-4 border-b border-[#1a1a1a]">
//         <span className="text-[#C8A253] font-serif font-bold text-lg tracking-widest pl-2">TRUEE</span>
//         <button 
//           onClick={() => setIsMobileOpen(false)}
//           className="p-2 bg-[#1a1a1a] rounded-full text-gray-400 hover:text-white border border-[#333] active:scale-90 transition-all"
//         >
//           <X size={18} />
//         </button>
//       </div>

//       {/* FLOATING COLLAPSE BUTTON (Sirf Desktop pe dikhega) */}
//       <button 
//         onClick={() => setIsCollapsed(!isCollapsed)}
//         className="hidden md:flex absolute top-6 -right-3.5 w-7 h-7 bg-[#C8A253] text-black rounded-full items-center justify-center shadow-lg shadow-[#C8A253]/20 hover:scale-110 transition-all z-50 border-2 border-[#0a0a0a]"
//       >
//         {isCollapsed ? <ChevronRight size={16} strokeWidth={3} /> : <ChevronLeft size={16} strokeWidth={3} />}
//       </button>

//       {/* USER PROFILE BANNER */}
//       <div className={`p-5 md:p-6 md:pt-8 flex items-center gap-4 ${isCollapsed ? 'md:justify-center px-0' : ''}`}>
//         <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-[#C8A253] font-serif font-bold text-base md:text-lg uppercase shadow-inner">
//           {userData.firstName.charAt(0)}
//         </div>
//         {!isCollapsed && (
//           <div className="overflow-hidden">
//             <h2 className="text-sm md:text-base font-bold text-white tracking-wide truncate">{userData.firstName} {userData.lastName}</h2>
//             <p className="text-[9px] md:text-[10px] text-[#C8A253] uppercase tracking-widest mt-1">Premium</p>
//           </div>
//         )}
//       </div>

//       {/* NAVIGATION ITEMS */}
//       <div className="flex-1 overflow-y-auto  no-scrollbar pb-6">
//         <SectionHeader title="Commerce" />
//         <Sidebaritem icon={ShoppingBag} label="My Orders" id="orders" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />

//         <SectionHeader title="Account" />
//         <Sidebaritem icon={Settings} label="Profile Info" id="profile" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />
//         {/* <Sidebaritem icon={Settings} label="Addresses" id="addresses" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} /> */}
// <Sidebaritem icon={MapPin} label="Addresses" id="addresses" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />
//         <SectionHeader title="Payments" />
//         <Sidebaritem icon={CreditCard} label="Reward Wallet" id="wallet" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />
//         <Sidebaritem icon={CreditCard} label="Gift Cards" id="gifts" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />

//         <SectionHeader title="Collection" />
//         <Sidebaritem icon={Box} label="My Coupons" id="coupons" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />
//         <Sidebaritem  icon={Mail}  label="Newsletter"  id="newsletter"  activeTab={activeTab}  setActiveTab={setActiveTab}  isCollapsed={isCollapsed} />
//         {/* <Sidebaritem icon={Box} label="Reviews" id="reviews" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} /> */}
//         <Sidebaritem icon={Heart} label="Wishlist" id="wishlist" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />        
//       </div>

//       {/* LOGOUT */}
//       <div className="p-3 md:p-4 border-t border-[#1a1a1a]">
//         <button 
//           onClick={handleLogout}
//           className={`flex items-center gap-4 w-full p-3 rounded-xl text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all ${isCollapsed ? 'md:justify-center' : ''}`}
//         >
//           <Power size={18} />
//           {!isCollapsed && <span className="text-[11px] md:text-xs font-bold uppercase tracking-widest">Logout</span>}
//         </button>
//       </div>

//     </div>
//   )
// }

// export default Sidebar

// import React, { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import { ShoppingBag, Settings, Box, CreditCard, Power, ChevronLeft, ChevronRight, X, Heart, Mail, MapPin } from "lucide-react"
// import Sidebaritem from "./Sidebaritem"
// import axiosInstance from "../utils/axiosInstance"

// const Sidebar = ({ activeTab, setActiveTab, isCollapsed, setIsCollapsed, setIsMobileOpen }) => {
//   const navigate = useNavigate()
//   const [userData, setUserData] = useState({ firstName: "User", lastName: "" })

//   useEffect(() => {
//     // API Fetch logic wahi hai
//     const fetchUser = async () => {
//       try {
//         const { data } = await axiosInstance.get('/auth/profile');
//         if (data.success && data.user) {
//           const fullName = data.user.name || "User";
//           const nameParts = fullName.trim().split(" ");
//           setUserData({ firstName: nameParts[0], lastName: nameParts.slice(1).join(" ") });
//         }
//       } catch (error) {
//         console.error("Sidebar user fetch error:", error);
//       }
//     };
//     fetchUser();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     navigate("/login")
//   }

//   const SectionHeader = ({ title }) => (
//     !isCollapsed && (
//       <div className="px-5 md:px-6 py-3 mt-2">
//         <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-2">
//           {title}
//         </p>
//       </div>
//     )
//   )

//   return (
//     <div className="flex flex-col h-full bg-white text-gray-700 relative">

//       {/* ⚡ MOBILE HEADER & CLOSE BUTTON (Sirf mobile pe dikhega) */}
//       <div className="shrink-0 md:hidden flex items-center justify-between p-4 border-b border-gray-100">
//         <span className="text-[#C8A253] font-serif font-bold text-lg tracking-widest pl-2">TRUEE</span>
//         <button
//           onClick={() => setIsMobileOpen(false)}
//           className="p-2 bg-gray-50 rounded-full text-gray-500 hover:text-black border border-gray-200 active:scale-90 transition-all"
//         >
//           <X size={18} />
//         </button>
//       </div>

//       {/* FLOATING COLLAPSE BUTTON (Sirf Desktop pe dikhega) */}
//       <button
//         onClick={() => setIsCollapsed(!isCollapsed)}
//         className="hidden md:flex absolute top-6 -right-3.5 w-7 h-7 bg-[#C8A253] text-black rounded-full items-center justify-center shadow-lg shadow-[#C8A253]/20 hover:scale-110 transition-all z-50 border-2 border-white"
//       >
//         {isCollapsed ? <ChevronRight size={16} strokeWidth={3} /> : <ChevronLeft size={16} strokeWidth={3} />}
//       </button>

//       {/* USER PROFILE BANNER */}
//       <div className={`shrink-0 p-5 md:p-6 md:pt-8 flex items-center gap-4 border-b border-gray-100 ${isCollapsed ? 'md:justify-center px-0' : ''}`}>
//         <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-[#FCFAEF] border border-[#C8A253]/30 flex items-center justify-center text-[#C8A253] font-serif font-bold text-base md:text-lg uppercase shadow-inner">
//           {userData.firstName.charAt(0)}
//         </div>
//         {!isCollapsed && (
//           <div className="overflow-hidden">
//             <h2 className="text-sm md:text-base font-bold text-gray-900 tracking-wide truncate">{userData.firstName} {userData.lastName}</h2>
//             <p className="text-[9px] md:text-[10px] text-[#C8A253] uppercase tracking-widest mt-1 font-bold">Premium</p>
//           </div>
//         )}
//       </div>

//       {/* NAVIGATION ITEMS */}
//       <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar pb-6">
//         <SectionHeader title="Commerce" />
//         <Sidebaritem icon={ShoppingBag} label="My Orders" id="orders" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />

//         <SectionHeader title="Account" />
//         <Sidebaritem icon={Settings} label="Profile Info" id="profile" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />
//         <Sidebaritem icon={MapPin} label="Addresses" id="addresses" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />

//         <SectionHeader title="Payments" />
//         <Sidebaritem icon={CreditCard} label="Reward Wallet" id="wallet" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />
//         <Sidebaritem icon={CreditCard} label="Gift Cards" id="gifts" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />

//         <SectionHeader title="Collection" />
//         <Sidebaritem icon={Box} label="My Coupons" id="coupons" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />
//         {/* <Sidebaritem icon={Mail} label="Newsletter" id="newsletter" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} /> */}
//         <Sidebaritem icon={Heart} label="Wishlist" id="wishlist" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />
//       </div>

//       {/* LOGOUT */}
//       <div className="shrink-0 p-3 md:p-4 border-t border-gray-100">
//         <button
//           onClick={handleLogout}
//           className={`flex items-center gap-4 w-full p-3 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 transition-all ${isCollapsed ? 'md:justify-center' : ''}`}
//         >
//           <Power size={18} />
//           {!isCollapsed && <span className="text-[11px] md:text-xs font-bold uppercase tracking-widest">Logout</span>}
//         </button>
//       </div>

//     </div>
//   )
// }

// export default Sidebar
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ShoppingBag, Settings, Box, CreditCard, Power, ChevronLeft, ChevronRight, X, Heart, Mail, MapPin } from "lucide-react"
import Sidebaritem from "./Sidebaritem"
import axiosInstance from "../utils/axiosInstance"

const Sidebar = ({ activeTab, setActiveTab, isCollapsed, setIsCollapsed, setIsMobileOpen }) => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({ firstName: "User", lastName: "" })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosInstance.get('/auth/profile');
        if (data.success && data.user) {
          const fullName = data.user.name || "User";
          const nameParts = fullName.trim().split(" ");
          setUserData({ firstName: nameParts[0], lastName: nameParts.slice(1).join(" ") });
        }
      } catch (error) {
        console.error("Sidebar user fetch error:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const SectionHeader = ({ title }) => (
    !isCollapsed && (
      <div className="px-5 md:px-6 py-3 mt-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 border-b border-gray-100 pb-2">
          {title}
        </p>
      </div>
    )
  )

  return (
    // ⚡ FIX: Yahan se "overflow-hidden" hata diya hai taaki arrow button na kate
    <div className="flex flex-col h-[100dvh] md:h-full bg-white text-gray-700 relative">

      {/* MOBILE HEADER & CLOSE BUTTON */}
      <div className="shrink-0 md:hidden flex items-center justify-between p-4 border-b border-gray-100">
        <span className="text-[#C8A253] font-serif font-bold text-lg tracking-widest pl-2">TRUEE</span>
        <button
          onClick={() => setIsMobileOpen(false)}
          className="p-2 bg-gray-50 rounded-full text-gray-500 hover:text-black border border-gray-200 active:scale-90 transition-all"
        >
          <X size={18} />
        </button>
      </div>

      {/* ⚡ FLOATING COLLAPSE BUTTON - Ab ye pura dikhega */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:flex absolute top-6 -right-3.5 w-7 h-7 bg-[#C8A253] text-black rounded-full items-center justify-center shadow-lg shadow-[#C8A253]/20 hover:scale-110 transition-all z-50 border-2 border-white"
      >
        {isCollapsed ? <ChevronRight size={16} strokeWidth={3} /> : <ChevronLeft size={16} strokeWidth={3} />}
      </button>

      {/* USER PROFILE BANNER */}
      <div className={`shrink-0 p-5 md:p-6 md:pt-8 flex items-center gap-4 border-b border-gray-100 ${isCollapsed ? 'md:justify-center px-0' : ''}`}>
        <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-[#FCFAEF] border border-[#C8A253]/30 flex items-center justify-center text-[#C8A253] font-serif font-bold text-base md:text-lg uppercase shadow-inner">
          {userData.firstName.charAt(0)}
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden">
            <h2 className="text-sm md:text-base font-bold text-gray-900 tracking-wide truncate">{userData.firstName} {userData.lastName}</h2>
            <p className="text-[9px] md:text-[10px] text-[#C8A253] uppercase tracking-widest mt-1 font-bold">Premium</p>
          </div>
        )}
      </div>

      {/* NAVIGATION ITEMS (min-h-0 ensure karta hai ki inner scroll kaam kare) */}
      <div className="flex-1 min-h-0 overflow-y-auto pb-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <SectionHeader title="Commerce" />
        <Sidebaritem icon={ShoppingBag} label="My Orders" id="orders" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />

        <SectionHeader title="Account" />
        <Sidebaritem icon={Settings} label="Profile Info" id="profile" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />
        <Sidebaritem icon={MapPin} label="Addresses" id="addresses" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />

        <SectionHeader title="Payments" />
        <Sidebaritem icon={CreditCard} label="Reward Wallet" id="wallet" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />
        <Sidebaritem icon={CreditCard} label="Gift Cards" id="gifts" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />

        <SectionHeader title="Collection" />
        <Sidebaritem icon={Box} label="My Coupons" id="coupons" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />
        <Sidebaritem icon={Heart} label="Wishlist" id="wishlist" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />
      </div>

      {/* LOGOUT */}
      <div className="shrink-0 p-3 md:p-4 border-t border-gray-100 bg-white">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-4 w-full p-3 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 transition-all ${isCollapsed ? 'md:justify-center' : ''}`}
        >
          <Power size={18} />
          {!isCollapsed && <span className="text-[11px] md:text-xs font-bold uppercase tracking-widest">Logout</span>}
        </button>
      </div>

    </div>
  )
}

export default Sidebar
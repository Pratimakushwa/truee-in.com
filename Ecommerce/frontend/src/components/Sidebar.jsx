// import React from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { ShoppingBag, Settings, Box, CreditCard, Power } from "lucide-react"
// import Sidebaritem from "./Sidebaritem"

// const Sidebar = ({ activeTab, setActiveTab }) => {

// const navigate = useNavigate()

// const handleLogout = () => {
// localStorage.removeItem("token")
// navigate("/login")
// }

// return (

// <div className="bg-white rounded-sm border border-gray-200 shadow-xl overflow-hidden flex flex-col">

// {/* Orders Route */}
// <Link to="/cart">
// <Sidebaritem icon={ShoppingBag} label="My Orders" />
// </Link>

// {/* Account Settings */}
// <div className="border-b border-gray-200">

// <div className="flex items-center gap-3 p-4 text-black font-bold uppercase text-[10px] tracking-[0.2em] bg-gray-50">
// <Settings size={14}/>
// <span>Account Settings</span>
// </div>

// <Sidebaritem    
// label="Profile Information"
// id="profile"
// activeTab={activeTab}
// setActiveTab={setActiveTab}
// isSubItem
// />

// <Sidebaritem
// label="Manage Addresses"
// id="addresses"
// activeTab={activeTab}
// setActiveTab={setActiveTab}
// isSubItem
// />

// </div>

// {/* Payments */}
// <div className="border-b border-gray-200">

// <div className="flex items-center gap-3 p-4 text-black font-bold uppercase text-[10px] tracking-[0.2em] bg-gray-50">
// <CreditCard size={14}/>
// <span>Payments</span>
// </div>

// <Sidebaritem
// label="Gift Cards"
// id="gifts"
// activeTab={activeTab}
// setActiveTab={setActiveTab}
// isSubItem
// />

// <Sidebaritem
// label="Saved UPI"
// id="upi"
// activeTab={activeTab}
// setActiveTab={setActiveTab}
// isSubItem
// />

// </div>

// {/* Personal */}
// <div className="border-b border-gray-200">

// <div className="flex items-center gap-3 p-4 text-black font-bold uppercase text-[10px] tracking-[0.2em] bg-gray-50">
// <Box size={14}/>
// <span>Personal Collection</span>
// </div>

// <Sidebaritem
// label="My Coupons"
// id="coupons"
// activeTab={activeTab}
// setActiveTab={setActiveTab}
// isSubItem
// />

// <Sidebaritem
// label="Reviews & Ratings"
// id="reviews"
// activeTab={activeTab}
// setActiveTab={setActiveTab}
// isSubItem
// />

// <Sidebaritem
// label="All Notifications"
// id="notifications"
// activeTab={activeTab}
// setActiveTab={setActiveTab}
// isSubItem
// />

// <Sidebaritem
// label="Wishlist"
// id="wishlist"
// activeTab={activeTab}
// setActiveTab={setActiveTab}
// isSubItem
// />

// </div>

// {/* Logout */}
// <button
// onClick={handleLogout}
// className="flex items-center gap-3 p-4 text-black hover:text-black hover:bg-gray-100 transition"
// >
// <Power size={18}/>
// <span>Logout</span>
// </button>

// </div>

// )

// }

// export default Sidebar


import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ShoppingBag, Settings, Box, CreditCard, Power, ChevronLeft, ChevronRight, X, Heart, Mail ,MapPin} from "lucide-react"
import Sidebaritem from "./Sidebaritem"
import axiosInstance from "../utils/axiosInstance"

const Sidebar = ({ activeTab, setActiveTab, isCollapsed, setIsCollapsed, setIsMobileOpen }) => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({ firstName: "User", lastName: "" })

  useEffect(() => {
    // API Fetch logic wahi hai
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
      <div className="px-5 md:px-6 py-4 mt-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#666] border-b border-[#222] pb-2">
          {title}
        </p>
      </div>
    )
  )

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-gray-300 relative">
      
      {/* ⚡ MOBILE HEADER & CLOSE BUTTON (Sirf mobile pe dikhega) */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-[#1a1a1a]">
        <span className="text-[#C8A253] font-serif font-bold text-lg tracking-widest pl-2">TRUEE</span>
        <button 
          onClick={() => setIsMobileOpen(false)}
          className="p-2 bg-[#1a1a1a] rounded-full text-gray-400 hover:text-white border border-[#333] active:scale-90 transition-all"
        >
          <X size={18} />
        </button>
      </div>

      {/* FLOATING COLLAPSE BUTTON (Sirf Desktop pe dikhega) */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:flex absolute top-6 -right-3.5 w-7 h-7 bg-[#C8A253] text-black rounded-full items-center justify-center shadow-lg shadow-[#C8A253]/20 hover:scale-110 transition-all z-50 border-2 border-[#0a0a0a]"
      >
        {isCollapsed ? <ChevronRight size={16} strokeWidth={3} /> : <ChevronLeft size={16} strokeWidth={3} />}
      </button>

      {/* USER PROFILE BANNER */}
      <div className={`p-5 md:p-6 md:pt-8 flex items-center gap-4 ${isCollapsed ? 'md:justify-center px-0' : ''}`}>
        <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-[#C8A253] font-serif font-bold text-base md:text-lg uppercase shadow-inner">
          {userData.firstName.charAt(0)}
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden">
            <h2 className="text-sm md:text-base font-bold text-white tracking-wide truncate">{userData.firstName} {userData.lastName}</h2>
            <p className="text-[9px] md:text-[10px] text-[#C8A253] uppercase tracking-widest mt-1">Premium</p>
          </div>
        )}
      </div>

      {/* NAVIGATION ITEMS */}
      <div className="flex-1 overflow-y-auto  no-scrollbar pb-6">
        <SectionHeader title="Commerce" />
        <Sidebaritem icon={ShoppingBag} label="My Orders" id="orders" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />

        <SectionHeader title="Account" />
        <Sidebaritem icon={Settings} label="Profile Info" id="profile" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />
        {/* <Sidebaritem icon={Settings} label="Addresses" id="addresses" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} /> */}
<Sidebaritem icon={MapPin} label="Addresses" id="addresses" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />
        <SectionHeader title="Payments" />
        <Sidebaritem icon={CreditCard} label="Reward Wallet" id="wallet" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />
        <Sidebaritem icon={CreditCard} label="Gift Cards" id="gifts" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />

        <SectionHeader title="Collection" />
        <Sidebaritem icon={Box} label="My Coupons" id="coupons" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />
        <Sidebaritem  icon={Mail}  label="Newsletter"  id="newsletter"  activeTab={activeTab}  setActiveTab={setActiveTab}  isCollapsed={isCollapsed} />
        {/* <Sidebaritem icon={Box} label="Reviews" id="reviews" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} /> */}
        <Sidebaritem icon={Heart} label="Wishlist" id="wishlist" activeTab={activeTab} setActiveTab={setActiveTab} isCollapsed={isCollapsed} />        
      </div>

      {/* LOGOUT */}
      <div className="p-3 md:p-4 border-t border-[#1a1a1a]">
        <button 
          onClick={handleLogout}
          className={`flex items-center gap-4 w-full p-3 rounded-xl text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all ${isCollapsed ? 'md:justify-center' : ''}`}
        >
          <Power size={18} />
          {!isCollapsed && <span className="text-[11px] md:text-xs font-bold uppercase tracking-widest">Logout</span>}
        </button>
      </div>

    </div>
  )
}

export default Sidebar
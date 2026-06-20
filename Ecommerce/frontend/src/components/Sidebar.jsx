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
import { ShoppingBag, Settings, Box, CreditCard, Power, User } from "lucide-react"
import Sidebaritem from "./Sidebaritem"
import axiosInstance from "../utils/axiosInstance"

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate()
  
  // ⚡ FIX: Default naam sirf 'User' rakha hai, 'Member' hata diya
  const [userData, setUserData] = useState({ firstName: "User", lastName: "" })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosInstance.get('/auth/profile');
        if (data.success && data.user) {
          const fullName = data.user.name || "User";
          const nameParts = fullName.trim().split(" ");
          setUserData({
            firstName: nameParts[0],
            // ⚡ FIX: Agar last name nahi hai toh empty string aayega, 'Member' nahi judega
            lastName: nameParts.slice(1).join(" ") 
          });
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

  return (
    <div className="bg-white rounded-sm border border-gray-200 shadow-xl overflow-hidden flex flex-col">
      
      {/* Profile Banner */}
      <div className="p-6 flex items-center gap-4 border-b border-gray-200 bg-white  text-black">
        {/* User Avatar (Initials) */}
        <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-black font-bold text-xl uppercase">
          {/* ⚡ FIX: Agar last name nahi hai toh sirf first letter dikhega */}
          {userData.firstName.charAt(0)}{userData.lastName ? userData.lastName.charAt(0) : ""}
        </div>
        
        {/* User Name */}
        <div>
          <p className="text-xs text-gray-400 font-light">Hello,</p>
          <h1 className="text-lg font-serif font-bold tracking-wide">
            {userData.firstName} {userData.lastName}
          </h1>
        </div>
      </div>

      <div className="border-b border-gray-200 bg-gray-50">
        <Sidebaritem 
          icon={ShoppingBag} 
          label="My Orders" 
          id="orders" 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      </div>

      {/* Account Settings */}
      <div className="border-b border-gray-200">
        <div className="flex items-center gap-3 p-4 text-black font-bold uppercase text-[10px] tracking-[0.2em] bg-gray-50">
          <Settings size={14}/>
          <span>Account Settings</span>
        </div>

        <Sidebaritem    
          label="Profile Information"
          id="profile"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isSubItem
        />

        <Sidebaritem
          label="Manage Addresses"
          id="addresses"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isSubItem
        />
      </div>

      {/* Payments */}
      <div className="border-b border-gray-200">
        <div className="flex items-center gap-3 p-4 text-black font-bold uppercase text-[10px] tracking-[0.2em] bg-gray-50">
          <CreditCard size={14}/>
          <span>Payments</span>
        </div>

        <Sidebaritem
          label="Gift Cards"
          id="gifts"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isSubItem
        />

        <Sidebaritem
          label="Saved UPI"
          id="upi"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isSubItem
        />
      </div>

      {/* Personal Collection */}
      <div className="border-b border-gray-200">
        <div className="flex items-center gap-3 p-4 text-black font-bold uppercase text-[10px] tracking-[0.2em] bg-gray-50">
          <Box size={14}/>
          <span>Personal Collection</span>
        </div>

        <Sidebaritem
          label="My Coupons"
          id="coupons"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isSubItem
        />

        <Sidebaritem
          label="Reviews & Ratings"
          id="reviews"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isSubItem
        />

        <Sidebaritem
          label="All Notifications"
          id="notifications"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isSubItem
        />

        <Sidebaritem
          label="Wishlist"
          id="wishlist"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isSubItem
        />
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 p-4 text-black hover:text-black hover:bg-gray-100 transition w-full"
      >
        <Power size={18}/>
        <span className="text-red-600">Logout</span>
      </button>

    </div>
  )
}

export default Sidebar
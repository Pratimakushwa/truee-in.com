
// import React,{useState} from "react"
// import Sidebar from "../../components/Sidebar"

// import UserDetails from "../../components/UserDetails"
// import AddressContent from "../../components/AddressContent"

// const Account = () => {

// const [activeTab,setActiveTab] = useState("profile")

// const renderContent = () => {

// switch(activeTab){

// case "profile":
// return <UserDetails/>

// case "addresses":
// return <AddressContent/>

// default:
// return <div className="p-10 text-gray-600">Coming Soon</div>

// }

// }

// return(

// <div className="min-h-screen bg-gray-50 p-10">

// <div className="max-w-6xl mx-auto flex gap-8">

// {/* Sidebar */}

// <div className="w-80">

// <Sidebar
// activeTab={activeTab}
// setActiveTab={setActiveTab}
// />

// </div>

// {/* Page Content */}

// <div className="flex-1 bg-white border border-gray-200">

// {renderContent()}

// </div>

// </div>

// </div>

// )

// }

// export default Account

// import React, { useState } from "react"
// import Sidebar from "../../components/Sidebar"
// import UserDetails from "../../components/UserDetails"
// import AddressContent from "../../components/AddressContent"

// // ⚡ Yahan se tumhara asli component aayega
// import UserOrders from "../../components/UserOrders" 

// const Account = () => {
//   const [activeTab, setActiveTab] = useState("profile")

//   const renderContent = () => {
//     switch(activeTab){
//       case "profile":
//         return <UserDetails/>
      
//       case "addresses":
//         return <AddressContent/>

//       // ⚡ MAIN FIX: Purana text hata diya aur tumhara premium UI yahan laga diya!
//       case "orders":
//         return <UserOrders />

//       default:
//         return <div className="p-10 text-gray-600">Coming Soon</div>
//     }
//   }

//   return(
//     <div className="min-h-screen bg-gray-50 p-10">
//       <div className="max-w-6xl mx-auto flex gap-8">
        
//         {/* Sidebar */}
//         <div className="w-80">
//           <Sidebar
//             activeTab={activeTab}
//             setActiveTab={setActiveTab}
//           />
//         </div>

//         {/* Page Content */}
//         <div className="flex-1 bg-white border border-gray-200">
//           {renderContent()}
//         </div>
        
//       </div>
//     </div>
//   )
// }

// export default Account

// import React, { useState } from "react"
// import Sidebar from "../../components/Sidebar"
// import UserDetails from "../../components/UserDetails"
// import AddressContent from "../../components/AddressContent"
// import UserOrders from "../../components/UserOrders" 

// const Account = () => {
//   const [activeTab, setActiveTab] = useState("profile")

//   const renderContent = () => {
//     switch(activeTab){
//       case "profile":
//         return <UserDetails/>
      
//       case "addresses":
//         return <AddressContent/>

//       case "orders":
//         return <UserOrders />

//       default:
//         return <div className="p-10 text-gray-600">Coming Soon</div>
//     }
//   }

//   return(
//     <div className="min-h-screen bg-gray-50 p-4 md:p-10">
//       <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8">
        
//         {/* Sidebar */}
//         <div className="w-full lg:w-80 shrink-0">
//           {/* ⚡ MAIN FIX: Mobile ke liye Sidebar ko ek chota scrollable box bana diya (max-h-[260px]) taaki poori screen na ghere */}
//           <div className="bg-white lg:bg-transparent rounded-2xl lg:rounded-none border border-gray-200 lg:border-none shadow-sm lg:shadow-none max-h-[260px] lg:max-h-none overflow-y-auto lg:overflow-visible">
//             <Sidebar
//               activeTab={activeTab}
//               setActiveTab={setActiveTab}
//             />
//           </div>
//         </div>

//         {/* Page Content */}
//         <div className="flex-1 bg-white border border-gray-200 overflow-hidden rounded-2xl shadow-sm min-h-[400px]">
//           {renderContent()}
//         </div>
        
//       </div>
//     </div>
//   )
// }

// export default Account

import React, { useState } from "react"
import { Menu } from "lucide-react"
import Sidebar from "../../components/Sidebar"
import UserDetails from "../../components/UserDetails"
import AddressContent from "../../components/AddressContent"
import UserOrders from "../../components/UserOrders" 
import MyCoupons from '../../components/MyCoupons';
import MyReviews from '../../components/MyReviews';
import RewardWallet from '../../components/rewards/RewardWallet';
import Wishlist from '../Wishlist';
// ProfilePage.jsx ke top import mein change karo
import NewsletterSubscribers from "../Admin/NewsletterSubscribers";
const Account = () => {
  const [activeTab, setActiveTab] = useState("profile")
  const [isCollapsed, setIsCollapsed] = useState(false) 
  const [isMobileOpen, setIsMobileOpen] = useState(false) 

  const renderContent = () => {
    switch(activeTab){
      case "profile": return <UserDetails/>
      case "addresses": return <AddressContent/>
      case "orders": return <UserOrders />
      case "coupons": return <MyCoupons />
      case "reviews": return <MyReviews />
      case "wallet": return <RewardWallet />
      case "wishlist": return <Wishlist />
      case "newsletter": return <NewsletterSubscribers />;
      default: return <div className="p-10 text-gray-400">Coming Soon...</div>
    }
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMobileOpen(false); 
  }

  return(
    <div className="flex h-screen bg-[#f4f4f4] font-sans relative overflow-hidden">
      
      {/* ⚡ MOBILE OVERLAY (z-40) */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-40 md:hidden  transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* ⚡ RESPONSIVE SIDEBAR (z-50 taaki sabke upar rahe) */}
      <div className={`
fixed md:relative md:h-screen z-50 md:z-0
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isCollapsed ? 'md:w-[80px]' : 'md:w-[280px]'}
        w-[85vw] max-w-[320px] shrink-0 bg-[#0a0a0a] border-r border-[#1a1a1a] shadow-2xl md:shadow-none
      `}>
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={handleTabChange} 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed}
          setIsMobileOpen={setIsMobileOpen}
        />
      </div>

      {/* RIGHT CONTENT AREA */}
      <div className="flex-1 w-full h-screen p-4 md:p-10 lg:px-16 lg:py-12 overflow-x-hidden overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          
          <div className="mb-6 md:mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-serif text-gray-900 tracking-wide">My Account</h1>
              <p className="text-gray-500 text-xs md:text-sm mt-1">Manage your Truee Luxury experience</p>
            </div>
            
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2.5 bg-white rounded-xl shadow-sm border border-gray-200 text-gray-900 hover:bg-gray-50 active:scale-95 transition-all"
            >
              <Menu size={20} />
            </button>
          </div>
          
          {/* <div className="bg-white rounded-2xl md:rounded-[2rem] shadow-sm border border-gray-100 min-h-[600px] overflow-hidden"> */}
            {renderContent()}
          {/* </div> */}
        </div>
      </div>
      
    </div>
  )
}

export default Account;


// import React, { useState } from "react"
// import { Menu } from "lucide-react"
// import Sidebar from "../../components/Sidebar"
// import UserDetails from "../../components/UserDetails"
// import AddressContent from "../../components/AddressContent"
// import UserOrders from "../../components/UserOrders" 
// import MyCoupons from '../../components/MyCoupons';
// import MyReviews from '../../components/MyReviews';
// import RewardWallet from '../../components/rewards/RewardWallet';
// import Wishlist from '../Wishlist';
// // ProfilePage.jsx ke top import mein change karo
// import NewsletterSubscribers from "../Admin/NewsletterSubscribers";
// const Account = () => {
//   const [activeTab, setActiveTab] = useState("profile")
//   const [isCollapsed, setIsCollapsed] = useState(false) 
//   const [isMobileOpen, setIsMobileOpen] = useState(false) 

//   const renderContent = () => {
//     switch(activeTab){
//       case "profile": return <UserDetails/>
//       case "addresses": return <AddressContent/>
//       case "orders": return <UserOrders />
//       case "coupons": return <MyCoupons />
//       case "reviews": return <MyReviews />
//       case "wallet": return <RewardWallet />
//       case "wishlist": return <Wishlist />
//       case "newsletter": return <NewsletterSubscribers />;
//       default: return <div className="p-10 text-gray-400">Coming Soon...</div>
//     }
//   }

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//     setIsMobileOpen(false); 
//   }

//   return(
//     <div className="flex h-screen bg-[#f4f4f4] font-sans relative overflow-hidden">
      
//       {/* ⚡ MOBILE OVERLAY (z-40) */}
//       {isMobileOpen && (
//         <div 
//           className="fixed inset-0 bg-black/70 z-40 md:hidden  transition-opacity"
//           onClick={() => setIsMobileOpen(false)}
//         />
//       )}

//       {/* ⚡ RESPONSIVE SIDEBAR (z-50 taaki sabke upar rahe) */}
//       <div className={`
// fixed md:relative md:h-screen z-50 md:z-0
//         transition-transform duration-300 ease-in-out
//         ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
//         ${isCollapsed ? 'md:w-[80px]' : 'md:w-[280px]'}
//         w-[85vw] max-w-[320px] shrink-0 bg-[#0a0a0a] border-r border-[#1a1a1a] shadow-2xl md:shadow-none
//       `}>
//         <Sidebar 
//           activeTab={activeTab} 
//           setActiveTab={handleTabChange} 
//           isCollapsed={isCollapsed} 
//           setIsCollapsed={setIsCollapsed}
//           setIsMobileOpen={setIsMobileOpen}
//         />
//       </div>

//       {/* RIGHT CONTENT AREA */}
//       <div className="flex-1 w-full h-screen p-4 md:p-10 lg:px-16 lg:py-12 overflow-x-hidden overflow-y-auto">
//         <div className="max-w-5xl mx-auto">
          
//           <div className="mb-6 md:mb-8 flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl md:text-3xl font-serif text-gray-900 tracking-wide">My Account</h1>
//               <p className="text-gray-500 text-xs md:text-sm mt-1">Manage your Truee Luxury experience</p>
//             </div>
            
//             <button 
//               onClick={() => setIsMobileOpen(true)}
//               className="md:hidden p-2.5 bg-white rounded-xl shadow-sm border border-gray-200 text-gray-900 hover:bg-gray-50 active:scale-95 transition-all"
//             >
//               <Menu size={20} />
//             </button>
//           </div>
          
//           {/* <div className="bg-white rounded-2xl md:rounded-[2rem] shadow-sm border border-gray-100 min-h-[600px] overflow-hidden"> */}
//             {renderContent()}
//           {/* </div> */}
//         </div>
//       </div>
      
//     </div>
//   )
// }

// export default Account;
import React, { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../../components/Sidebar"
import UserDetails from "../../components/UserDetails"
import AddressContent from "../../components/AddressContent"
import UserOrders from "../../components/UserOrders"
import MyCoupons from '../../components/MyCoupons';
import MyReviews from '../../components/MyReviews';
import RewardWallet from '../../components/rewards/RewardWallet';
import Wishlist from '../Wishlist';
import MyNewsletterStatus from "../../components/MyNewsletterStatus";
// import NewsletterSubscribers from "../Admin/NewsletterSubscribers";
import axiosInstance from "../../utils/axiosInstance";

// ⚡ Har tab ka apna title/subtitle — ab hardcoded "My Account" sabhi page par nahi dikhega
const TAB_META = {
  profile: { title: "Profile Info", subtitle: "Manage your personal details" },
  addresses: { title: "My Addresses", subtitle: "Manage your saved delivery addresses" },
  orders: { title: "My Orders", subtitle: "Track and manage your orders" },
  coupons: { title: "My Coupons", subtitle: "View your available and used coupons" },
  reviews: { title: "My Reviews", subtitle: "Reviews and ratings you've submitted" },
  wallet: { title: "Reward Wallet", subtitle: "Earn and redeem reward coins" },
  wishlist: { title: "Wishlist", subtitle: "Products you've saved for later" },
  newsletter: { title: "Newsletter", subtitle: "Manage your newsletter subscription" },
  gifts: { title: "Gift Cards", subtitle: "Manage your gift cards" },
};

const Account = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile")
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [userRole, setUserRole] = useState(null)

  // ⚡ Role fetch karo taaki decide ho sake ki Newsletter tab par admin list dikhani hai ya sirf apni
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const { data } = await axiosInstance.get('/auth/profile');
        setUserRole(data?.user?.role || 'user');
      } catch (err) {
        console.error("Error fetching user role:", err);
        setUserRole('user');
      }
    };
    fetchRole();
  }, []);

  const isAdmin = userRole === 'admin';

  const renderContent = () => {
    switch (activeTab) {
      case "profile": return <UserDetails />
      case "addresses": return <AddressContent />
      case "orders": return <UserOrders />
      case "coupons": return <MyCoupons />
      case "reviews": return <MyReviews />
      case "wallet": return <RewardWallet />
      case "wishlist": return <Wishlist />
      // ⚡ FIX: Admin ko sabhi subscribers dikhenge, normal user ko sirf apni subscription status
      // case "newsletter": return isAdmin ? <NewsletterSubscribers /> : <MyNewsletterStatus />;
      default: return <div className="p-10 text-gray-400">Coming Soon...</div>
    }
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMobileOpen(false);
  }

  const meta = TAB_META[activeTab] || { title: "My Account", subtitle: "Manage your Truee Luxury experience" };

  return (
    <div className="flex h-screen bg-[#f7f7f7] font-sans relative overflow-hidden">

      {/* ⚡ MOBILE OVERLAY (z-40) */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* ⚡ RESPONSIVE SIDEBAR (z-50 taaki sabke upar rahe) — light theme, gold border */}
      <div className={`
        fixed md:relative md:h-screen z-50 md:z-0
        transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isCollapsed ? 'md:w-[80px]' : 'md:w-[280px]'}
        w-[85vw] max-w-[320px] shrink-0 bg-white border-r border-gray-200 shadow-2xl md:shadow-sm
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
      <div className="flex-1 w-full h-screen p-4 md:p-8 lg:px-14 lg:py-12 overflow-x-hidden overflow-y-auto">
        <div className="max-w-5xl mx-auto">

          <div className="mb-5 md:mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-900 tracking-wide">{meta.title}</h1>
              <p className="text-gray-500 text-xs md:text-sm mt-1">{meta.subtitle}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden p-2.5 bg-white rounded-xl shadow-sm border border-gray-200 text-gray-900 hover:bg-gray-50 active:scale-95 transition-all"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>

              {/* ⚡ Close button — home page par le jaata hai, mobile aur desktop dono par kaam karta hai */}
              <button
                onClick={() => navigate('/')}
                className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-black active:scale-95 transition-all"
                aria-label="Close and go to home"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm min-h-[400px] overflow-hidden">
            {renderContent()}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Account;
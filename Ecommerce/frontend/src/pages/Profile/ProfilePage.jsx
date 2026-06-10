
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

import React, { useState } from "react"
import Sidebar from "../../components/Sidebar"
import UserDetails from "../../components/UserDetails"
import AddressContent from "../../components/AddressContent"
import UserOrders from "../../components/UserOrders" 

const Account = () => {
  const [activeTab, setActiveTab] = useState("profile")

  const renderContent = () => {
    switch(activeTab){
      case "profile":
        return <UserDetails/>
      
      case "addresses":
        return <AddressContent/>

      case "orders":
        return <UserOrders />

      default:
        return <div className="p-10 text-gray-600">Coming Soon</div>
    }
  }

  return(
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8">
        
        {/* Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          {/* ⚡ MAIN FIX: Mobile ke liye Sidebar ko ek chota scrollable box bana diya (max-h-[260px]) taaki poori screen na ghere */}
          <div className="bg-white lg:bg-transparent rounded-2xl lg:rounded-none border border-gray-200 lg:border-none shadow-sm lg:shadow-none max-h-[260px] lg:max-h-none overflow-y-auto lg:overflow-visible">
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 bg-white border border-gray-200 overflow-hidden rounded-2xl shadow-sm min-h-[400px]">
          {renderContent()}
        </div>
        
      </div>
    </div>
  )
}

export default Account
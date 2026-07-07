
// import React from "react"
// import { ChevronRight } from "lucide-react"

// const SidebarItem = ({
//   icon: Icon,
//   label,
//   id,
//   activeTab,
//   setActiveTab,
//   isSubItem = false
// }) => {

//   const isActive = activeTab === id

//   return (
//     <div
//       onClick={() => {
//         if (setActiveTab) {
//           setActiveTab(id)
//         }
//       }}
//       className={`flex items-center justify-between p-4 cursor-pointer transition-all duration-300
//       ${
//         isActive
//           ? "bg-gray-100 text-black border-r-4 border-gray-400 font-semibold"
//           : "text-black hover:bg-gray-100 hover:text-black"
//       }
//       ${isSubItem ? "pl-12 py-2 text-sm" : ""}
//       `}
//     >
//       <div className="flex items-center gap-3">
//         {Icon && <Icon size={isSubItem ? 16 : 20} />}
//         <span>{label}</span>
//       </div>

//       {!isSubItem && (
//         <ChevronRight
//           size={16}
//           className={isActive ? "text-gray-600" : "text-gray-400"}
//         />
//       )}
//     </div>
//   )
// }

// export default SidebarItem

import React from 'react';

const Sidebaritem = ({ icon: Icon, label, id, activeTab, setActiveTab, isCollapsed }) => {
  const isActive = activeTab === id;

  return (
    <button
      onClick={() => setActiveTab(id)}
      title={isCollapsed ? label : ""} // Collapse hone par hover se naam dikhega
      className={`relative flex items-center gap-4 w-full py-3.5 px-6 transition-all duration-300 group
        ${isActive 
          ? 'bg-[#1a1a1a] text-[#C8A253]' 
          : 'text-gray-500 hover:text-white hover:bg-white/5'
        }
        ${isCollapsed ? 'justify-center px-0' : ''}
      `}
    >
      {/* Left Active Indicator Line */}
      {isActive && !isCollapsed && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#C8A253] rounded-r-md"></div>
      )}

      {/* Center Indicator for Collapsed State */}
      {isActive && isCollapsed && (
        <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[#C8A253] rounded-r-md"></div>
      )}

      <Icon 
        size={isCollapsed ? 20 : 18} 
        className={`${isActive ? 'text-[#C8A253]' : 'text-gray-500 group-hover:text-gray-300'} transition-colors duration-300`} 
      />
      
      {!isCollapsed && <span className="text-sm font-medium tracking-wide">{label}</span>}
    </button>
  );
};

export default Sidebaritem;
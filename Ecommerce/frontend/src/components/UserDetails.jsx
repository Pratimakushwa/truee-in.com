// import React, { useState, useEffect } from "react";
// import { Check, X } from "lucide-react";
// import axiosInstance from "../utils/axiosInstance"; // Ensure this path is correct

// const UserDetails = () => {
//   const [isEditingProfile, setIsEditingProfile] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     gender: "Female" // Default fallback
//   });

//   // 1. Fetch Profile Data on Mount
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         // Aapke route ke hisaab se endpoint /auth/profile hai
//         const { data } = await axiosInstance.get('/auth/profile');
        
//         if (data.success && data.user) {
//           // Backend se aane wale single 'name' ko first aur last name me split karna
//           const fullName = data.user.name || "";
//           const nameParts = fullName.trim().split(" ");
//           const fName = nameParts[0] || "";
//           const lName = nameParts.slice(1).join(" ") || "";

//           setProfileData({
//             firstName: fName,
//             lastName: lName,
//             email: data.user.email || "",
//             phone: data.user.phone || "",
//             gender: data.user.gender || "Female" // Agar backend gender support karta hai
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // 2. Update Profile Data
//   const handleProfileSave = async () => {
//     try {
//       setSaving(true);
      
//       // Frontend ke firstName aur lastName ko milakar single 'name' banana
//       const updatedName = `${profileData.firstName} ${profileData.lastName}`.trim();

//       const payload = {
//         name: updatedName,
//         email: profileData.email,
//         phone: profileData.phone,
//         gender: profileData.gender
//       };

//       const { data } = await axiosInstance.put('/auth/profile', payload);

//       if (data.success) {
//         setIsEditingProfile(false);
//         alert("Profile updated successfully!"); // Aap yaha react-toastify bhi laga sakte hain
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert(error.response?.data?.message || "Failed to update profile");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleCancel = () => {
//     setIsEditingProfile(false);
//     // Optional: Cancel karne par purana data wapas lane ke liye wapas fetch function call kar sakte hain 
//     // par abhi ke liye sirf edit mode band kar rahe hain.
//   };

//   if (loading) {
//     return <div className="p-8 text-center text-gray-500">Loading profile...</div>;
//   }

//   return (
//     <div className="p-8 bg-white h-full text-black">
//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
//         <h2 className="text-2xl font-serif text-black">
//           Personal Information
//         </h2>

//         {!isEditingProfile ? (
//           <button
//             onClick={() => setIsEditingProfile(true)}
//             className="text-blue-500 font-bold text-sm uppercase"
//           >
//             Edit
//           </button>
//         ) : (
//           <div className="flex gap-4">
//             <button
//               onClick={handleProfileSave}
//               disabled={saving}
//               className="text-green-600 font-bold text-sm uppercase flex items-center gap-1 disabled:opacity-50"
//             >
//               <Check size={16} /> {saving ? "Saving..." : "Save"}
//             </button>

//             <button
//               onClick={handleCancel}
//               disabled={saving}
//               className="text-red-600 font-bold text-sm uppercase flex items-center gap-1 disabled:opacity-50"
//             >
//               <X size={16} /> Cancel
//             </button>
//           </div>
//         )}
//       </div>

//       {/* NAME */}
//       <div className="grid md:grid-cols-2 gap-6 mb-8">
//         <div className="space-y-2">
//           <label className="text-xs text-gray-500 uppercase font-bold">
//             First Name
//           </label>
//           <input
//             type="text"
//             readOnly={!isEditingProfile}
//             value={profileData.firstName}
//             onChange={(e) =>
//               setProfileData({ ...profileData, firstName: e.target.value })
//             }
//             className={`w-full p-3 border rounded-sm ${
//               isEditingProfile
//                 ? "bg-gray-100 border-gray-400"
//                 : "bg-transparent border-gray-200 text-gray-600"
//             }`}
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="text-xs text-gray-500 uppercase font-bold">
//             Last Name
//           </label>
//           <input
//             type="text"
//             readOnly={!isEditingProfile}
//             value={profileData.lastName}
//             onChange={(e) =>
//               setProfileData({ ...profileData, lastName: e.target.value })
//             }
//             className={`w-full p-3 border rounded-sm ${
//               isEditingProfile
//                 ? "bg-gray-100 border-gray-400"
//                 : "bg-transparent border-gray-200 text-gray-600"
//             }`}
//           />
//         </div>
//       </div>

//       {/* GENDER */}
//       <div className="mb-10">
//         <p className="text-xs font-bold text-gray-500 uppercase mb-4">
//           Gender
//         </p>
//         <div className="flex gap-10">
//           {["Male", "Female"].map((g) => (
//             <label
//               key={g}
//               className={`flex items-center gap-3 ${
//                 profileData.gender === g ? "text-black" : "text-gray-600"
//               }`}
//             >
//               <input
//                 type="radio"
//                 disabled={!isEditingProfile}
//                 checked={profileData.gender === g}
//                 onChange={() =>
//                   setProfileData({ ...profileData, gender: g })
//                 }
//                 className="accent-gray-600"
//               />
//               {g}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* EMAIL */}
//       <div className="mb-10">
//         <h2 className="text-xl font-serif text-black mb-4">
//           Email Address
//         </h2>
//         <input
//           type="email"
//           readOnly={!isEditingProfile}
//           value={profileData.email}
//           onChange={(e) =>
//             setProfileData({ ...profileData, email: e.target.value })
//           }
//           className={`w-full md:w-2/3 p-3 border rounded-sm ${
//             isEditingProfile
//               ? "bg-gray-100 border-gray-400"
//               : "bg-transparent border-gray-200 text-gray-600"
//           }`}
//         />
//       </div>

//       {/* PHONE */}
//       <div className="mb-10">
//         <h2 className="text-xl font-serif text-black mb-4">
//           Mobile Number
//         </h2>
//         <input
//           type="text"
//           readOnly={!isEditingProfile}
//           value={profileData.phone}
//           onChange={(e) =>
//             setProfileData({ ...profileData, phone: e.target.value })
//           }
//           className={`w-full md:w-2/3 p-3 border rounded-sm ${
//             isEditingProfile
//               ? "bg-gray-100 border-gray-400"
//               : "bg-transparent border-gray-200 text-gray-600"
//           }`}
//         />
//       </div>

//       {/* DELETE */}
//       <button className="text-red-600 font-bold text-sm uppercase">
//         Delete Account
//       </button>
//     </div>
//   );
// };

// export default UserDetails;
import React, { useState, useEffect } from "react";
import { Check, X, Pencil, User } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";

const UserDetails = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "Female"
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosInstance.get('/auth/profile');

        if (data.success && data.user) {
          const fullName = data.user.name || "";
          const nameParts = fullName.trim().split(" ");
          const fName = nameParts[0] || "";
          const lName = nameParts.slice(1).join(" ") || "";

          setProfileData({
            firstName: fName,
            lastName: lName,
            email: data.user.email || "",
            phone: data.user.phone || "",
            gender: data.user.gender || "Female"
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileSave = async () => {
    try {
      setSaving(true);

      const updatedName = `${profileData.firstName} ${profileData.lastName}`.trim();

      const payload = {
        name: updatedName,
        email: profileData.email,
        phone: profileData.phone,
        gender: profileData.gender
      };

      const { data } = await axiosInstance.put('/auth/profile', payload);

      if (data.success) {
        setIsEditingProfile(false);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditingProfile(false);
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-sm text-gray-500 animate-pulse h-full flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  const inputClass = `w-full px-4 py-3 text-sm border rounded-xl transition-all duration-300 outline-none ${
    isEditingProfile
      ? "bg-white border-gray-200 text-gray-900 focus:border-[#C8A253] focus:ring-2 focus:ring-[#C8A253]/15"
      : "bg-gray-50/60 border-gray-100 text-gray-500 cursor-default"
  }`;

  const labelClass = "text-[10.5px] text-gray-400 uppercase font-bold tracking-widest mb-2 block";

  return (
    <div className="p-5 sm:p-6 md:p-8 h-full text-black">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6 md:mb-8 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full bg-[#FCFAEF] border border-[#C8A253]/25 flex items-center justify-center text-[#C8A253]">
            <User size={18} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-serif text-gray-900 leading-tight">
              Personal Information
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">Update your basic details</p>
          </div>
        </div>

        {!isEditingProfile ? (
          <button
            onClick={() => setIsEditingProfile(true)}
            className="shrink-0 flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#8B6914] bg-[#FCFAEF] hover:bg-[#F5EEDA] border border-[#C8A253]/25 px-3.5 sm:px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <Pencil size={13} />
            <span className="hidden xs:inline">Edit</span>
          </button>
        ) : (
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleProfileSave}
              disabled={saving}
              className="text-green-700 bg-green-50 hover:bg-green-100 font-bold text-[10px] sm:text-[11px] uppercase flex items-center gap-1 disabled:opacity-50 cursor-pointer px-2.5 sm:px-3 py-2 rounded-lg transition-colors"
            >
              <Check size={13} /> <span className="hidden xs:inline">{saving ? "Saving..." : "Save"}</span>
            </button>

            <button
              onClick={handleCancel}
              disabled={saving}
              className="text-red-600 bg-red-50 hover:bg-red-100 font-bold text-[10px] sm:text-[11px] uppercase flex items-center gap-1 disabled:opacity-50 cursor-pointer px-2.5 sm:px-3 py-2 rounded-lg transition-colors"
            >
              <X size={13} /> <span className="hidden xs:inline">Cancel</span>
            </button>
          </div>
        )}
      </div>

      {/* NAME SECTION */}
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div>
          <label className={labelClass}>First Name</label>
          <input
            type="text"
            readOnly={!isEditingProfile}
            value={profileData.firstName}
            onChange={(e) =>
              setProfileData({ ...profileData, firstName: e.target.value })
            }
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Last Name</label>
          <input
            type="text"
            readOnly={!isEditingProfile}
            value={profileData.lastName}
            onChange={(e) =>
              setProfileData({ ...profileData, lastName: e.target.value })
            }
            placeholder={!isEditingProfile ? "—" : ""}
            className={inputClass}
          />
        </div>
      </div>

      {/* GENDER SECTION */}
      <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-100">
        <p className={labelClass}>Gender</p>
        <div className="flex gap-3 mt-3">
          {["Male", "Female"].map((g) => {
            const selected = profileData.gender === g;
            return (
              <button
                key={g}
                type="button"
                disabled={!isEditingProfile}
                onClick={() => setProfileData({ ...profileData, gender: g })}
                className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  selected
                    ? "bg-[#111] text-white border-[#111]"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                } ${!isEditingProfile ? "cursor-default opacity-80" : "cursor-pointer"}`}
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTACT INFO SECTION */}
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
        {/* EMAIL */}
        <div>
          <label className={labelClass}>Email Address</label>
          <input
            type="email"
            readOnly={!isEditingProfile}
            value={profileData.email}
            onChange={(e) =>
              setProfileData({ ...profileData, email: e.target.value })
            }
            className={`${inputClass} truncate`}
          />
        </div>

        {/* PHONE */}
        <div>
          <label className={labelClass}>Mobile Number</label>
          <input
            type="text"
            readOnly={!isEditingProfile}
            value={profileData.phone}
            onChange={(e) =>
              setProfileData({ ...profileData, phone: e.target.value })
            }
            className={inputClass}
          />
        </div>
      </div>

      {/* DELETE */}
      <div className="pt-4 sm:pt-6 border-t border-gray-100">
        <button className="text-red-500 font-bold text-[10.5px] sm:text-[11px] uppercase tracking-wider cursor-pointer hover:text-red-700 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
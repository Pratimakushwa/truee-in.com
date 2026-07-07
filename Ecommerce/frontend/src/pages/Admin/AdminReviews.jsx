// import React, { useState, useEffect } from 'react';
// import { Star } from 'lucide-react';
// import axiosInstance from '../../utils/axiosInstance';

// export default function AdminReviews() {
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   const fetchReviews = async () => {
//     try {
//       // Pehle ye tha: '/api/reviews/admin/all'
//       // Ise change karke sirf ye karo:
//       const { data } = await axiosInstance.get('/reviews/admin/all'); 
//       setReviews(data.reviews);
//     } catch (err) {
//       console.error("Error fetching reviews:", err);
//     }
//   };

//   const handleAction = async (id, actionType, value) => {
//     try {
//       if (actionType === 'status') await axiosInstance.put(`/reviews/admin/${id}/status`, { status: value });
//       if (actionType === 'feature') await axiosInstance.put(`/reviews/admin/${id}/feature`, { isFeatured: value });
//       fetchReviews(); // Refresh list
//     } catch (err) { alert("Error: " + err.message); }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-900 text-white">
//       <div className="flex-1 p-8">
//         <h1 className="text-2xl font-serif mb-6 text-[#C8A253]">Manage Customer Reviews</h1>
//         <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="text-gray-400 uppercase text-xs tracking-wider border-b border-gray-700">
//                 <th className="p-4">Customer Name</th>
//                 <th className="p-4">Product Name</th>
//                 <th className="p-4">Rating</th>
//                 <th className="p-4">Review Message</th>
//                 <th className="p-4">Status</th>
//                 <th className="p-4">Featured</th>
//                 <th className="p-4">Date</th>
//                 <th className="p-4 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reviews.map(rev => (
//                 <tr key={rev._id} className="border-b border-gray-700 hover:bg-gray-750">
//                   <td className="p-4">{rev.user?.name}</td>
//                   <td className="p-4">{rev.productName || "Product"}</td>
//                   <td className="p-4 text-yellow-400">{[...Array(5)].map((_, i) => (
//                       <Star key={i} className={`inline-block w-4 h-4 ${i < rev.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
//                     ))}
//                   </td>
//                   <td className="p-4 text-sm text-gray-300 italic">"{rev.comment}"</td>
//                   <td className={`p-4 font-bold ${rev.status === 'Approved' ? 'text-green-400' : 'text-yellow-400'}`}>
//                     {rev.status}
//                   </td>
//                   <td className="p-4">{rev.isFeatured ? 'Yes' : 'No'}</td>
//                   <td className="p-4">{new Date(rev.createdAt).toLocaleDateString()}</td>
//                   <td className="p-4 flex gap-3 justify-center">
//                     <button
//                       onClick={() => handleAction(rev._id, 'status', 'Approved')}
//                       disabled={rev.status === 'Approved'}
//                       className={`font-semibold ${rev.status === 'Approved' ? 'text-gray-400 cursor-not-allowed' : 'text-green-400 hover:text-green-300'}`}
//                     >
//                       {rev.status === 'Approved' ? 'Approved' : 'Approve'}
//                     </button>
//                     <button
//                       onClick={() => handleAction(rev._id, 'feature', !rev.isFeatured)}
//                       className={`${rev.isFeatured ? 'text-blue-400' : 'text-gray-500'} font-semibold`}
//                     >
//                       {rev.isFeatured ? 'Featured' : 'Feature'}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, XCircle, StarHalf } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await axiosInstance.get('/reviews/admin/all'); 
      setReviews(data.reviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const handleAction = async (id, actionType, value) => {
    try {
      if (actionType === 'status') await axiosInstance.put(`/reviews/admin/${id}/status`, { status: value });
      if (actionType === 'feature') await axiosInstance.put(`/reviews/admin/${id}/feature`, { isFeatured: value });
      fetchReviews(); // Refresh list
    } catch (err) { alert("Error: " + err.message); }
  };

  // Helper to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-gray-300 font-sans">
      <div className="flex-1 p-8 lg:px-12">
        <h1 className="text-3xl font-serif mb-8 text-white tracking-wide">Customer Reviews</h1>
        
        <div className="bg-[#121212] rounded-[1.5rem] p-6 shadow-lg border border-[#2a2a2a] overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-500 uppercase text-[10px] font-bold tracking-[0.15em] border-b border-[#2a2a2a]">
                <th className="p-4 pl-6 font-medium">Customer</th>
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Rating</th>
                <th className="p-4 font-medium w-1/3">Review Message</th>
                <th className="p-4 font-medium text-center">Status</th>
                <th className="p-4 font-medium text-center">Featured</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 text-center font-medium pr-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(rev => (
                <tr key={rev._id} className="border-b border-[#2a2a2a] hover:bg-[#1a1a1a] transition-colors duration-200">
                  <td className="p-4 pl-6 text-sm font-medium text-white">{rev.user?.name || "Unknown User"}</td>
                  <td className="p-4 text-sm">{rev.productName || "Product"}</td>
                  
                  {/* Rating Stars */}
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < rev.rating ? 'fill-[#C8A253] text-[#C8A253]' : 'text-[#333] fill-[#1a1a1a]'} 
                        />
                      ))}
                    </div>
                  </td>
                  
                  {/* Review Text */}
                  <td className="p-4 text-sm text-gray-400 italic">"{rev.comment}"</td>
                  
                  {/* Status Badge */}
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      rev.status === 'Approved' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                      rev.status === 'Rejected' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                      'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                    }`}>
                      {rev.status}
                    </span>
                  </td>
                  
                  {/* Featured Toggle */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleAction(rev._id, 'feature', !rev.isFeatured)}
                      className={`p-1.5 rounded-md transition-colors ${rev.isFeatured ? 'bg-[#C8A253]/10 text-[#C8A253]' : 'text-gray-600 hover:text-gray-400'}`}
                      title={rev.isFeatured ? "Unfeature Review" : "Feature Review"}
                    >
                      <StarHalf size={18} className={rev.isFeatured ? "fill-[#C8A253]" : ""} />
                    </button>
                  </td>
                  
                  <td className="p-4 text-xs text-gray-500 whitespace-nowrap">{formatDate(rev.createdAt)}</td>
                  
                  {/* Action Buttons (Approve / Reject / Pending) */}
                  <td className="p-4 pr-6">
                     <div className="flex items-center justify-center gap-2">
                       {/* Approve Button */}
                       {rev.status !== 'Approved' && (
                         <button
                           onClick={() => handleAction(rev._id, 'status', 'Approved')}
                           className="flex items-center justify-center p-2 rounded-lg text-green-500 hover:bg-green-500/10 transition-colors"
                           title="Approve Review"
                         >
                           <CheckCircle size={18} />
                         </button>
                       )}
                       
                       {/* Reject/Unapprove Button */}
                       {rev.status !== 'Pending' && (
                         <button
                           onClick={() => handleAction(rev._id, 'status', 'Pending')}
                           className="flex items-center justify-center p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                           title="Move to Pending"
                         >
                           <XCircle size={18} />
                         </button>
                       )}
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
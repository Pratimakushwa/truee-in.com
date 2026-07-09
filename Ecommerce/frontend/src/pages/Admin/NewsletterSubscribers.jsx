// import React, { useState, useEffect } from 'react';
// import { Mail, Trash2 } from 'lucide-react';
// import axiosInstance from '../../utils/axiosInstance';
// import PageHeader from '../../components/admin/ui/PageHeader';

// export default function NewsletterSubscribers() {
//   const [subscribers, setSubscribers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchSubscribers();
//   }, []);

//   const fetchSubscribers = async () => {
//     try {
//       const { data } = await axiosInstance.get('/newsletter/all');
//       if (data.success) {
//         setSubscribers(data.subscribers);
//       }
//     } catch (err) {
//       console.error("Error fetching subscribers:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <PageHeader 
//         title="Newsletter Subscribers" 
//         subtitle={`Total subscribers: ${subscribers.length}`}
//       />
      
//       <div className="bg-[var(--admin-card)] rounded-lg border border-white/5 overflow-hidden">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="border-b border-white/5 bg-[var(--admin-sidebar)]">
//               <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Email Address</th>
//               <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Subscribed Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr><td colSpan="2" className="px-6 py-8 text-center text-gray-400">Loading...</td></tr>
//             ) : subscribers.length > 0 ? (
//               subscribers.map((sub) => (
//                 <tr key={sub._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
//                   <td className="px-6 py-4 flex items-center gap-3">
//                     <Mail size={16} className="text-[var(--theme-primary)]" />
//                     <span className="text-gray-100">{sub.email}</span>
//                   </td>
//                   <td className="px-6 py-4 text-gray-400 text-sm">
//                     {new Date(sub.subscribedAt).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr><td colSpan="2" className="px-6 py-8 text-center text-gray-500">No subscribers yet</td></tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import PageHeader from '../../components/admin/ui/PageHeader';

export default function NewsletterSubscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const { data } = await axiosInstance.get('/newsletter/all');
      if (data.success) {
        // Debugging ke liye: console mein check karo email aa raha hai ya nahi
        console.log("Subscribers Data:", data.subscribers);
        setSubscribers(data.subscribers);
      }
    } catch (err) {
      console.error("Error fetching subscribers:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Newsletter Subscribers" 
        subtitle={`Total subscribers: ${subscribers.length}`}
      />
      
      <div className="bg-[#121212] rounded-lg border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-[#1a1a1a]">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Email Address</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Subscribed Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="2" className="px-6 py-8 text-center text-gray-400">Loading...</td></tr>
            ) : subscribers.length > 0 ? (
              subscribers.map((sub) => (
                <tr key={sub._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <Mail size={16} className="text-[#C8A253]" />
                    {/* ⚡ Yahan text-white force kiya hai */}
                    <span className="text-white font-medium">{sub.email || "No Email Provided"}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-300 text-sm">
                    {new Date(sub.subscribedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="2" className="px-6 py-8 text-center text-gray-500">No subscribers yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
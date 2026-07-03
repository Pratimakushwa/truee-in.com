import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      // Pehle ye tha: '/api/reviews/admin/all'
      // Ise change karke sirf ye karo:
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

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-serif mb-6 text-[#C8A253]">Manage Customer Reviews</h1>
        <div className="bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-700">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 uppercase text-xs tracking-wider border-b border-gray-700">
                <th className="p-4">Customer Name</th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Rating</th>
                <th className="p-4">Review Message</th>
                <th className="p-4">Status</th>
                <th className="p-4">Featured</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map(rev => (
                <tr key={rev._id} className="border-b border-gray-700 hover:bg-gray-750">
                  <td className="p-4">{rev.user?.name}</td>
                  <td className="p-4">{rev.productName || "Product"}</td>
                  <td className="p-4 text-yellow-400">{[...Array(5)].map((_, i) => (
                      <Star key={i} className={`inline-block w-4 h-4 ${i < rev.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
                    ))}
                  </td>
                  <td className="p-4 text-sm text-gray-300 italic">"{rev.comment}"</td>
                  <td className={`p-4 font-bold ${rev.status === 'Approved' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {rev.status}
                  </td>
                  <td className="p-4">{rev.isFeatured ? 'Yes' : 'No'}</td>
                  <td className="p-4">{new Date(rev.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 flex gap-3 justify-center">
                    <button
                      onClick={() => handleAction(rev._id, 'status', 'Approved')}
                      disabled={rev.status === 'Approved'}
                      className={`font-semibold ${rev.status === 'Approved' ? 'text-gray-400 cursor-not-allowed' : 'text-green-400 hover:text-green-300'}`}
                    >
                      {rev.status === 'Approved' ? 'Approved' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleAction(rev._id, 'feature', !rev.isFeatured)}
                      className={`${rev.isFeatured ? 'text-blue-400' : 'text-gray-500'} font-semibold`}
                    >
                      {rev.isFeatured ? 'Featured' : 'Feature'}
                    </button>
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
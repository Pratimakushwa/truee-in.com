import React from 'react';
import { Star } from 'lucide-react';

export default function MyReviews() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-semibold text-gray-900">My Reviews</h2>
        <p className="text-sm text-gray-500 mt-2">Your submitted reviews and ratings will appear here.</p>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F7F7F7] flex items-center justify-center text-[#C8A253]">
            <Star size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">No reviews yet</h3>
            <p className="text-sm text-gray-500">Write a review after placing an order to see it here.</p>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          You can also update or manage your existing reviews from this section once you have submitted them.
        </div>
      </div>
    </div>
  );
}

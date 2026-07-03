import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    // LocalStorage se history fetch karo
    try {
      const items = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
      setRecentProducts(items);
    } catch (error) {
      console.error("Error loading history:", error);
    }
  }, []);

  // Agar history khali hai (user ne abhi tak kuch nahi dekha), toh ye section hide rahega
  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-8 border-t-[8px] border-b-[8px] border-[#f3f3f3]">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Amazon-Style Header */}
        <div className="flex items-baseline gap-4 mb-4">
          <h2 className="text-[20px] md:text-[24px] font-bold text-[#0F1111]">
            Related to items you've viewed
          </h2>
          <Link 
            to="/products" 
            className="text-[#007185] hover:text-[#C7511F] hover:underline text-[14px] font-medium transition-colors"
          >
            See more
          </Link>
        </div>

        {/* Horizontal Scrollable Container (Scrollbar Hidden) */}
        <div 
          className="flex gap-4 md:gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Webkit scrollbar hide karne ke liye inline style hack ya tailwind-scrollbar-hide use hota hai */}
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {recentProducts.map((product) => (
            <Link 
              to={`/product/${product._id}`} 
              key={product._id} 
              className="group min-w-[160px] max-w-[160px] md:min-w-[220px] md:max-w-[220px] flex-shrink-0 cursor-pointer snap-start"
            >
              {/* Premium Image Container */}
              <div className="bg-[#f8f8f8] aspect-square rounded-lg p-4 mb-3 flex items-center justify-center transition-all duration-300 group-hover:bg-[#f0f0f0] relative overflow-hidden">
                <img 
                  src={product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600"} 
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>

              {/* Minimal Product Info */}
              <div className="px-1">
                <h3 className="text-[13px] md:text-[14px] text-[#0F1111] line-clamp-2 leading-snug mb-1 group-hover:text-[#C7511F] transition-colors">
                  {product.name}
                </h3>
                {product.price && (
                  <p className="text-[16px] md:text-[18px] font-medium text-[#0F1111]">
                    <span className="text-[11px] align-top mr-[2px] font-normal">₹</span>
                    {product.price.toLocaleString()}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default RecentlyViewed;
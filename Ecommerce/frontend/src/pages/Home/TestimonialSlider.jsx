
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance'; 

export default function TestimonialSlider() { 
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedReviews = async () => {
      try {
        const { data } = await axiosInstance.get('/reviews/approved-testimonials');
        
        if (data.testimonials && data.testimonials.length > 0) {
          const formattedReviews = data.testimonials.map((t) => ({
            id: t._id,
            name: t.user?.name || "Valued Customer",
            role: "Verified Buyer",
            quote: t.comment,
            rating: t.rating || 5,
            productName: t.productName
          }));
          setTestimonials(formattedReviews);
        } else {
          setTestimonials([]);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError('Unable to load testimonials.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedReviews();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    if (testimonials.length > 0) setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    if (testimonials.length > 0) setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getCardClassName = (index) => {
    const length = testimonials.length;
    if (length === 0) return "hidden";

    const isCenter = index === activeIndex;
    const isLeft = index === (activeIndex - 1 + length) % length;
    const isRight = index === (activeIndex + 1) % length;

    // ⚡ RESPONSIVE CARD STYLE: Fixed width hatakar 'w-full' kar diya hai
    let baseClass = "absolute transition-all duration-500 ease-in-out w-full bg-white shadow-lg border border-gray-100 p-8 md:p-12 rounded-3xl h-fit top-0";

    if (isCenter) {
      return baseClass + " translate-x-0 scale-100 opacity-100 z-20 pointer-events-auto relative";
    } else if (isLeft && length > 1) {
      return baseClass + " -translate-x-[110%] md:-translate-x-[110%] scale-90 opacity-0 md:opacity-40 z-10 pointer-events-none";
    } else if (isRight && length > 1) {
      return baseClass + " translate-x-[110%] md:translate-x-[110%] scale-90 opacity-0 md:opacity-40 z-10 pointer-events-none";
    } else {
      return baseClass + " opacity-0 scale-50 z-0 pointer-events-none";
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 flex flex-col items-center justify-center py-16 md:py-24 overflow-hidden">
        <div className="text-center mb-6 px-6">
          <h2 className="text-2xl md:text-5xl font-serif text-gray-800 mb-2 tracking-tight">
            This Is What Our Customers Say
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-xs md:text-base">
            Real stories from people who use our platform every day.
          </p>
        </div>
        <div className="w-full max-w-[500px] px-4">
          <div className="bg-white border border-gray-100 shadow-lg rounded-3xl p-12 text-center text-gray-500">
            Loading testimonials...
          </div>
        </div>
      </div>
    );
  }

  if (error || testimonials.length === 0) {
    return (
      <div className="bg-gray-50 flex flex-col items-center justify-center py-16 md:py-24 overflow-hidden">
        <div className="text-center mb-6 px-6">
          <h2 className="text-2xl md:text-5xl font-serif text-gray-800 mb-2 tracking-tight">
            This Is What Our Customers Say
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-xs md:text-base">
            Real stories from people who use our platform every day.
          </p>
        </div>
        <div className="w-full max-w-[500px] px-4">
          <div className="bg-white border border-gray-100 shadow-lg rounded-3xl p-12 text-center text-gray-500">
            {error || 'No testimonials available yet.'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 flex flex-col items-center justify-start py-16 md:py-24 overflow-hidden">
      
       <div className="text-center mb-6 md:mb-12 px-6">
         <h2 className="text-2xl md:text-5xl font-serif text-gray-800 mb-2 tracking-tight">
           This Is What Our Customers Say
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-xs md:text-base">
          Real stories from people who use our platform every day.
        </p>
      </div>

      {/* ⚡ RESPONSIVE CONTAINER: w-full max-w-[500px] ensure karega ki ye mobile pe bhi na toote */}
      <div className="relative w-full max-w-[400px] px-4">
        <div className="relative w-full flex justify-center min-h-[350px] md:min-h-[300px]">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className={getCardClassName(index)}>
              
              <div className="flex flex-col items-center text-center gap-6">
                <Quote size={40} className="text-blue-500" />
                
                <p className="text-gray-700 text-lg leading-relaxed font-medium">
                  “{testimonial.quote}”
                </p>

                <div className="flex gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'fill-yellow-500' : 'text-gray-300'}`} />
                  ))}
                </div>

                <div className="mt-2">
                  <h4 className="text-xl font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">
                    {testimonial.productName ? `Verified Buyer` : 'Customer'}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Slider Buttons */}
      {testimonials.length > 1 && (
        <div className="flex gap-6 mt-10 z-30 relative">
          <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all">
            <ChevronLeft />
          </button>
          <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all">
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
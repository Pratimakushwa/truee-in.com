// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
// import axiosInstance from '../../utils/axiosInstance';

// export default function TestimonialSlider() {
//   const [testimonials, setTestimonials] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFeaturedReviews = async () => {
//       try {
//         const { data } = await axiosInstance.get('/reviews/approved-testimonials');

//         if (data.testimonials && data.testimonials.length > 0) {
//           const formattedReviews = data.testimonials.map((t) => ({
//             id: t._id,
//             name: t.user?.name || "Valued Customer",
//             role: "Verified Buyer",
//             quote: t.comment,
//             rating: t.rating || 5,
//             productName: t.productName
//           }));
//           setTestimonials(formattedReviews);
//         } else {
//           setTestimonials([]);
//         }
//       } catch (err) {
//         console.error("Error fetching testimonials:", err);
//         setError('Unable to load testimonials.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFeaturedReviews();
//   }, []);

//   useEffect(() => {
//     if (testimonials.length === 0) return;
//     const interval = setInterval(() => {
//       setActiveIndex((prev) => (prev + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [testimonials.length]);

//   const nextSlide = () => {
//     if (testimonials.length > 0) setActiveIndex((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevSlide = () => {
//     if (testimonials.length > 0) setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   const getCardClassName = (index) => {
//     const length = testimonials.length;
//     if (length === 0) return "hidden";

//     const isCenter = index === activeIndex;
//     const isLeft = index === (activeIndex - 1 + length) % length;
//     const isRight = index === (activeIndex + 1) % length;

//     // ⚡ RESPONSIVE CARD STYLE: Fixed width hatakar 'w-full' kar diya hai
//     let baseClass = "absolute transition-all duration-500 ease-in-out w-full bg-white shadow-lg border border-gray-100 p-8 md:p-12 rounded-3xl h-fit top-0";

//     if (isCenter) {
//       return baseClass + " translate-x-0 scale-100 opacity-100 z-20 pointer-events-auto relative";
//     } else if (isLeft && length > 1) {
//       return baseClass + " -translate-x-[110%] md:-translate-x-[110%] scale-90 opacity-0 md:opacity-40 z-10 pointer-events-none";
//     } else if (isRight && length > 1) {
//       return baseClass + " translate-x-[110%] md:translate-x-[110%] scale-90 opacity-0 md:opacity-40 z-10 pointer-events-none";
//     } else {
//       return baseClass + " opacity-0 scale-50 z-0 pointer-events-none";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="bg-gray-50 flex flex-col items-center justify-center py-16 md:py-24 overflow-hidden">
//         <div className="text-center mb-6 px-6">
//           <h2 className="text-2xl md:text-5xl font-serif text-gray-800 mb-2 tracking-tight">
//             This Is What Our Customers Say
//           </h2>
//           <p className="text-gray-500 max-w-xl mx-auto text-xs md:text-base">
//             Real stories from people who use our platform every day.
//           </p>
//         </div>
//         <div className="w-full max-w-[500px] px-4">
//           <div className="bg-white border border-gray-100 shadow-lg rounded-3xl p-12 text-center text-gray-500">
//             Loading testimonials...
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || testimonials.length === 0) {
//     return (
//       <div className="bg-gray-50 flex flex-col items-center justify-center py-16 md:py-24 overflow-hidden">
//         <div className="text-center mb-6 px-6">
//           <h2 className="text-2xl md:text-5xl font-serif text-gray-800 mb-2 tracking-tight">
//             This Is What Our Customers Say
//           </h2>
//           <p className="text-gray-500 max-w-xl mx-auto text-xs md:text-base">
//             Real stories from people who use our platform every day.
//           </p>
//         </div>
//         <div className="w-full max-w-[500px] px-4">
//           <div className="bg-white border border-gray-100 shadow-lg rounded-3xl p-12 text-center text-gray-500">
//             {error || 'No testimonials available yet.'}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-50 flex flex-col items-center justify-start py-16 md:py-24 overflow-hidden">

//        <div className="text-center mb-6 md:mb-12 px-6">
//          <h2 className="text-2xl md:text-5xl font-serif text-gray-800 mb-2 tracking-tight">
//            This Is What Our Customers Say
//         </h2>
//         <p className="text-gray-500 max-w-xl mx-auto text-xs md:text-base">
//           Real stories from people who use our platform every day.
//         </p>
//       </div>

//       {/* ⚡ RESPONSIVE CONTAINER: w-full max-w-[500px] ensure karega ki ye mobile pe bhi na toote */}
//       <div className="relative w-full max-w-[400px] px-4">
//         <div className="relative w-full flex justify-center min-h-[350px] md:min-h-[300px]">
//           {testimonials.map((testimonial, index) => (
//             <div key={testimonial.id} className={getCardClassName(index)}>

//               <div className="flex flex-col items-center text-center gap-6">
//                 <Quote size={40} className="text-blue-500" />

//                 <p className="text-gray-700 text-lg leading-relaxed font-medium">
//                   “{testimonial.quote}”
//                 </p>

//                 <div className="flex gap-1 text-yellow-500">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'fill-yellow-500' : 'text-gray-300'}`} />
//                   ))}
//                 </div>

//                 <div className="mt-2">
//                   <h4 className="text-xl font-bold text-gray-900">{testimonial.name}</h4>
//                   <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">
//                     {testimonial.productName ? `Verified Buyer` : 'Customer'}
//                   </p>
//                 </div>
//               </div>

//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Slider Buttons */}
//       {testimonials.length > 1 && (
//         <div className="flex gap-6 mt-10 z-30 relative">
//           <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all">
//             <ChevronLeft />
//           </button>
//           <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-all">
//             <ChevronRight />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";

export default function TestimonialSlider() {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedReviews = async () => {
      try {
        const { data } = await axiosInstance.get(
          "/reviews/approved-testimonials",
        );

        if (data.testimonials && data.testimonials.length > 0) {
          const formattedReviews = data.testimonials.map((t) => ({
            id: t._id,
            name: t.user?.name || "Valued Customer",
            role: "Verified Buyer",
            quote: t.comment,
            rating: t.rating || 5,
            productName: t.productName,
          }));
          setTestimonials(formattedReviews);
        } else {
          setTestimonials([]);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Unable to load testimonials.");
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
    if (testimonials.length > 0)
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    if (testimonials.length > 0)
      setActiveIndex(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length,
      );
  };

  const getCardClassName = (index) => {
    const length = testimonials.length;
    if (length === 0) return "hidden";

    const isCenter = index === activeIndex;
    const isLeft = index === (activeIndex - 1 + length) % length;
    const isRight = index === (activeIndex + 1) % length;

    // TRUEE Luxury Card Style: Added responsive sizing (h-[260px] on mobile, h-[320px] on desktop)
    let baseClass =
      "absolute top-1/2 left-1/2 transition-all duration-700 ease-in-out w-[92%] max-w-[380px] sm:max-w-none sm:w-[500px] md:w-[600px] h-[260px] sm:h-[320px] bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] border border-gray-100 rounded-xl p-5 sm:p-8 flex";

    if (isCenter) {
      return (
        baseClass +
        " -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100 z-30 pointer-events-auto"
      );
    } else if (isLeft && length > 1) {
      return (
        baseClass +
        " -translate-x-[130%] sm:-translate-x-[140%] md:-translate-x-[125%] -translate-y-1/2 scale-[0.85] opacity-0 sm:opacity-60 md:opacity-100 z-20 pointer-events-none"
      );
    } else if (isRight && length > 1) {
      return (
        baseClass +
        " translate-x-[30%] sm:translate-x-[40%] md:translate-x-[25%] -translate-y-1/2 scale-[0.85] opacity-0 sm:opacity-60 md:opacity-100 z-20 pointer-events-none"
      );
    } else {
      return (
        baseClass +
        " -translate-x-1/2 -translate-y-1/2 opacity-0 scale-50 z-10 pointer-events-none"
      );
    }
  };

  if (loading || error || testimonials.length === 0) {
    return (
      <div className="bg-[#fafafa] flex flex-col items-center justify-center py-10 sm:py-10 overflow-hidden min-h-[500px] sm:min-h-[600px]">
        <div className="text-center mb-4 px-6">
          <h2 className="text-2xl sm:text-3xl md:text-[2.75rem] font-serif text-[#111] mb-1 tracking-tight">
            This Is What Our Customers Say
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
            Real stories from people who use our platform every day.
          </p>
        </div>
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 sm:p-12 text-center text-gray-500 tracking-wide text-sm sm:text-base mx-4">
          {loading
            ? "Loading testimonials..."
            : error || "No testimonials available yet."}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] flex flex-col items-center justify-center py-10 sm:py-10 overflow-hidden min-h-[500px] sm:min-h-[600px] font-sans">
      {/* TRUEE Styled Header Section */}
      <div className="text-center mb-4 sm:mb-2 px-6 z-30 relative">
        <h2 className="text-2xl sm:text-3xl md:text-[2.75rem] font-serif text-[#111] mb-3 sm:mb-4 tracking-tight">
          This Is What Our Customers Say
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base tracking-wide">
          Real stories from people who use our platform every day.
        </p>
      </div>

      {/* Slider Container - Responsive Height */}
      <div className="relative w-full max-w-7xl h-[250px] sm:h-[340px] flex justify-center items-center">
        {testimonials.map((testimonial, index) => (
          <div key={testimonial.id} className={getCardClassName(index)}>
            <div className="flex w-full h-full gap-4 sm:gap-6 items-stretch">
              {/* Premium Black/Dark Charcoal Vertical Line */}
              <div
                className="w-1 bg-[#C8A253] rounded-full flex-shrink-0"
                style={{ height: "80%", alignSelf: "center" }}
              ></div>

              {/* Card Content Layout */}
              <div className="flex flex-col flex-1 text-left h-full justify-center py-1 sm:py-2">
                <div className="mb-4 sm:mb-4">
                  <Quote
                    size={20}
                    strokeWidth={2.5}
                    className="text-[#C8A253] opacity-90 rotate-180 mb-2 sm:mb-3 hidden sm:block"
                  />

                  <p className="text-gray-600 text-[14px] sm:text-[15px] md:text-[17px] leading-relaxed line-clamp-4 font-medium pr-2">
                    {testimonial.quote}
                  </p>
                </div>

                <div>
                  {/* Improved Star UI */}
                  <div className="flex gap-1 sm:gap-1.5 mb-2 sm:mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        strokeWidth={1.5}
                        className={`${
                          i < testimonial.rating
                            ? "fill-[#eab308] text-[#eab308]"
                            : "fill-gray-200 text-gray-200"
                        } transition-colors duration-200 sm:w-[18px] sm:h-[18px]`}
                      />
                    ))}
                  </div>

                  {/* Clean Typography for Name */}
                  <h4 className="text-[1rem] sm:text-[1.15rem] font-semibold text-[#111] leading-tight mb-1 sm:mb-1.5">
                    {testimonial.name}
                  </h4>
                  <p className="text-[0.6rem] sm:text-[0.65rem] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    {testimonial.productName ? `Verified Buyer` : "Customer"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TRUEE Styled Navigation Buttons - Added cursor-pointer and active/focus states */}
      {testimonials.length > 1 && (
        <div className="flex gap-4 sm:gap-5 mt-6 sm:mt-4 z-40 relative">
          <button
            onClick={prevSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#C8A253] flex items-center justify-center text-gray-500 bg-white cursor-pointer hover:text-white hover:bg-[#111] hover:border-[#111] active:bg-[#111] active:text-white  active:border-[#111] focus:bg-[#111] focus:text-white transition-all duration-300"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#C8A253] flex items-center justify-center text-gray-500 bg-white cursor-pointer hover:text-white hover:bg-[#111] hover:border-[#111] active:bg-[#111] active:text-white focus:bg-[#111] focus:text-white transition-all duration-300"
            aria-label="Next Testimonial"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </div>
  );
}
// import React, { useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Truck, Clock, ShieldCheck, Globe, MapPin, Package } from 'lucide-react';

// export default function ShippingPolicy() {
//   useEffect(() => { window.scrollTo(0, 0); }, []);

//   const fadeUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } };
//   const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };

//   return (
//     <div className="min-h-screen bg-[#fafafa] font-sans text-[#1a1a1a] overflow-hidden pb-24">
      
//       {/* ⚡ CINEMATIC HERO */}
//       <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-black">
//         {/* Premium dark aesthetic image representing secure transit */}
//         <div className="absolute inset-0 bg-cover bg-center opacity-40 grayscale-[20%]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=2000')" }}></div>
//         <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-black/40 to-black/80"></div>
//         <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 text-center px-6 mt-16">
//           <motion.p variants={fadeUp} className="text-[#C8A253] text-[11px] font-bold tracking-[0.4em] uppercase mb-4">Global Logistics</motion.p>
//           <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-serif text-white drop-shadow-xl mb-6">Shipping Policy.</motion.h1>
//           <motion.div variants={fadeUp} className="w-16 h-[2px] bg-[#C8A253] mx-auto"></motion.div>
//         </motion.div>
//       </section>

//       <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-20 -mt-10">
//         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white/80 backdrop-blur-xl p-10 md:p-16 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white text-center mb-16">
//           <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">At Truee Luxury, the journey of your masterpiece is as important as the product itself. We partner with the world’s most elite courier services to ensure your audio equipment arrives securely and promptly.</p>
//         </motion.div>

//         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-8">
          
//           {[
//             { icon: <Clock />, title: "Dispatch & Timelines", text: "All orders are meticulously inspected, beautifully packed, and dispatched within 24 to 48 hours of order confirmation. Bespoke or limited-edition items may require additional preparation time." },
//             { icon: <Truck />, title: "White-Glove Delivery", text: "We utilize premium logistics partners (such as BlueDart, DHL, and FedEx) for all domestic shipments. Standard delivery within India typically takes 3 to 5 business days." },
//             { icon: <Globe />, title: "International Shipping", text: "Truee Luxury caters to a global audience. International delivery times vary by destination, generally ranging from 7 to 14 business days. Customs and import duties are the responsibility of the recipient." },
//             { icon: <Package />, title: "Shipping Charges", text: "We offer complimentary insured shipping on all domestic orders above ₹10,000. For international orders or expedited delivery requests, shipping fees are dynamically calculated at checkout." },
//             { icon: <MapPin />, title: "Live Order Tracking", text: "Once your order leaves our boutique, you will receive an exclusive tracking link via email and SMS. Our concierge team constantly monitors your package until it reaches your hands." },
//             { icon: <ShieldCheck />, title: "Transit Insurance", text: "Every Truee Luxury shipment is fully insured against theft and accidental damage during transit. This coverage ends the moment the package is signed for at the delivery address." }
//           ].map((item, i) => (
//             <motion.div 
//               key={i} 
//               variants={fadeUp} 
//               className="group relative bg-white p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_rgba(200,162,83,0.1)] border border-gray-100 transition-all duration-500 overflow-hidden flex flex-col md:flex-row gap-8 items-start cursor-default"
//             >
//               {/* Pro-level rounded glowing line */}
//               <div className="absolute left-2 top-4 bottom-4 w-1.5 rounded-full bg-gray-100 group-hover:bg-[#C8A253] transition-colors duration-500"></div>
              
//               <div className="md:w-1/3 flex items-center gap-4 text-[#C8A253] pl-4">
//                 <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-[#C8A253] group-hover:text-white transition-colors duration-500">
//                   {item.icon}
//                 </div>
//                 <h2 className="text-xl font-serif text-black">{item.title}</h2>
//               </div>
              
//               <div className="md:w-2/3 text-gray-500 leading-relaxed text-sm relative">
//                 {item.text}
//               </div>
//             </motion.div>
//           ))}

//         </motion.div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Truck, Clock, ShieldCheck, Globe, MapPin, Package } from 'lucide-react';

// ⚡ ICON MAPPER: Database text to React Icons
const iconMap = {
  "Dispatch & Timelines": <Clock />,
  "White-Glove Delivery": <Truck />,
  "International Shipping": <Globe />,
  "Shipping Charges": <Package />,
  "Live Order Tracking": <MapPin />,
  "Transit Insurance": <ShieldCheck />
};

export default function ShippingPolicy() {
  // ⚡ BACKEND CONNECTION STATES
  const [shippingData, setShippingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchShippingData = async () => {
      try {
        // Backend API call ('shipping' pageType ke liye)
        const { data } = await axios.get('http://localhost:8080/api/v1/legal/get-policy/shipping');
        if (data?.success) {
          setShippingData(data.data);
        }
        setLoading(false);
      } catch (error) {
        console.log("Using default shipping policy data.");
        setLoading(false);
      }
    };

    fetchShippingData();
  }, []);

  const fadeUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } };
  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };

  // Default Sections (Fallback safe)
  const defaultSections = [
    { title: "Dispatch & Timelines", text: "All orders are meticulously inspected, beautifully packed, and dispatched within 24 to 48 hours of order confirmation. Bespoke or limited-edition items may require additional preparation time." },
    { title: "White-Glove Delivery", text: "We utilize premium logistics partners (such as BlueDart, DHL, and FedEx) for all domestic shipments. Standard delivery within India typically takes 3 to 5 business days." },
    { title: "International Shipping", text: "Truee Luxury caters to a global audience. International delivery times vary by destination, generally ranging from 7 to 14 business days. Customs and import duties are the responsibility of the recipient." },
    { title: "Shipping Charges", text: "We offer complimentary insured shipping on all domestic orders above ₹10,000. For international orders or expedited delivery requests, shipping fees are dynamically calculated at checkout." },
    { title: "Live Order Tracking", text: "Once your order leaves our boutique, you will receive an exclusive tracking link via email and SMS. Our concierge team constantly monitors your package until it reaches your hands." },
    { title: "Transit Insurance", text: "Every Truee Luxury shipment is fully insured against theft and accidental damage during transit. This coverage ends the moment the package is signed for at the delivery address." }
  ];

  const sectionsToShow = shippingData?.sections?.length > 0 ? shippingData.sections : defaultSections;

  // Premium Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-serif text-[#C8A253] text-xl animate-pulse">
        Preparing Global Logistics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#1a1a1a] overflow-hidden pb-24">
      
      {/* ⚡ CINEMATIC HERO */}
      <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Premium dark aesthetic image representing secure transit */}
        <div className="absolute inset-0 bg-cover bg-center opacity-40 grayscale-[20%]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=2000')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-black/40 to-black/80"></div>
        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 text-center px-6 mt-16">
          <motion.p variants={fadeUp} className="text-[#C8A253] text-[11px] font-bold tracking-[0.4em] uppercase mb-4">Global Logistics</motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-serif text-white drop-shadow-xl mb-6">
            {shippingData?.heroTitle || "Shipping Policy."}
          </motion.h1>
          <motion.div variants={fadeUp} className="w-16 h-[2px] bg-[#C8A253] mx-auto"></motion.div>
        </motion.div>
      </section>

      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-20 -mt-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white/80 backdrop-blur-xl p-10 md:p-16 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white text-center mb-16">
          <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
            {shippingData?.subtitle || "At Truee Luxury, the journey of your masterpiece is as important as the product itself. We partner with the world’s most elite courier services to ensure your audio equipment arrives securely and promptly."}
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-8">
          
          {sectionsToShow.map((item, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp} 
              className="group relative bg-white p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_rgba(200,162,83,0.1)] border border-gray-100 transition-all duration-500 overflow-hidden flex flex-col md:flex-row gap-8 items-start cursor-default"
            >
              {/* Pro-level rounded glowing line */}
              <div className="absolute left-2 top-4 bottom-4 w-1.5 rounded-full bg-gray-100 group-hover:bg-[#C8A253] transition-colors duration-500"></div>
              
              <div className="md:w-1/3 flex items-center gap-4 text-[#C8A253] pl-4">
                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-[#C8A253] group-hover:text-white transition-colors duration-500">
                  {/* Dynamic icon mapping */}
                  {iconMap[item.title] || <Package />}
                </div>
                <h2 className="text-xl font-serif text-black">{item.title}</h2>
              </div>
              
              <div className="md:w-2/3 text-gray-500 leading-relaxed text-sm relative">
                {item.text}
              </div>
            </motion.div>
          ))}

        </motion.div>
      </div>
    </div>
  );
}
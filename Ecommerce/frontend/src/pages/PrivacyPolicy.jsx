

// import React, { useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Lock, EyeOff, Database, Cookie, Share2, UserCheck, Clock, ShieldAlert, RefreshCcw } from 'lucide-react';

// export default function PrivacyPolicy() {
//   useEffect(() => { window.scrollTo(0, 0); }, []);

//   const fadeUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } };
//   const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };

//   return (
//     <div className="min-h-screen bg-[#fafafa] font-sans text-[#1a1a1a] overflow-hidden pb-24">
      
//       {/* ⚡ CINEMATIC HERO (Cleaned up duplicates) */}
//       <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-black">
//         <div className="absolute inset-0 bg-cover bg-center opacity-40 grayscale-[20%]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2000')" }}></div>
//         <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-black/40 to-black/80"></div>
//         <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 text-center px-6 mt-16">
//           <motion.p variants={fadeUp} className="text-[#C8A253] text-[11px] font-bold tracking-[0.4em] uppercase mb-4">Ironclad Security</motion.p>
//           <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-serif text-white drop-shadow-xl mb-6">Privacy Policy.</motion.h1>
//           <motion.div variants={fadeUp} className="w-16 h-[2px] bg-[#C8A253] mx-auto"></motion.div>
//         </motion.div>
//       </section>

//       <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-20 -mt-10">
//         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white/80 backdrop-blur-xl p-10 md:p-16 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white text-center mb-16">
//           <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">At Truee Luxury, your privacy is treated with the same meticulous care as our audio curations. We respect your personal data and are committed to protecting it according to global e-commerce standards.</p>
//         </motion.div>

//         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-8">
          
//           {[
//             { icon: <Database />, title: "Data Curated", text: "We collect information provided directly to us for account setup, purchases, and preferences to tailor your luxury experience." },
//             { icon: <EyeOff />, title: "Usage & Intent", text: "Data is utilized for order fulfillment, personalized white-glove support, and exclusive product drops. We do not engage in unsolicited tracking." },
//             { icon: <Cookie />, title: "Cookies & Tracking", text: "We use cookies to enhance your browsing experience. These help us understand site performance and provide a smoother interface for our users." },
//             { icon: <Share2 />, title: "Third-Party Sharing", text: "We share data only with trusted partners (Payment gateways like Razorpay/Stripe, and logistics partners) essential for processing and delivering your orders." },
//             { icon: <Clock />, title: "Data Retention", text: "We retain your personal information only for as long as is necessary for the purposes set out in this policy, or as required by law for tax and accounting purposes." },
//             { icon: <ShieldAlert />, title: "Children's Privacy", text: "Truee Luxury is intended for adult connoisseurs. We do not knowingly collect personally identifiable information from anyone under the age of 18." },
//             { icon: <UserCheck />, title: "Your Rights", text: "You have the right to access, rectify, or request the deletion of your personal data at any time by contacting our concierge." },
//             { icon: <RefreshCcw />, title: "Policy Updates", text: "We may update our privacy policy periodically. We will notify you of any significant changes by posting the new policy on this page." },
//             { icon: <Lock />, title: "Absolute Security", text: "We implement state-of-the-art encryption. Your information is never sold. Truee Luxury ensures your digital footprint remains as secure as your transactions." }
//           ].map((item, i) => (
//             <motion.div 
//               key={i} 
//               variants={fadeUp} 
//               className="group relative bg-white p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_rgba(200,162,83,0.1)] border border-gray-100 transition-all duration-500 overflow-hidden flex flex-col md:flex-row gap-8 items-start cursor-default"
//             >
//               {/* Added rounded-full and inset layout to the glowing line */}
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
import { Lock, EyeOff, Database, Cookie, Share2, UserCheck, Clock, ShieldAlert, RefreshCcw, Shield } from 'lucide-react';

// ⚡ ICON MAPPER: Database se aaye text ko React Icons se jodne ke liye
const iconMap = {
  "Data Curated": <Database />,
  "Usage & Intent": <EyeOff />,
  "Cookies & Tracking": <Cookie />,
  "Third-Party Sharing": <Share2 />,
  "Data Retention": <Clock />,
  "Children's Privacy": <ShieldAlert />,
  "Your Rights": <UserCheck />,
  "Policy Updates": <RefreshCcw />,
  "Absolute Security": <Lock />
};

export default function PrivacyPolicy() {
  // ⚡ BACKEND CONNECTION STATES
  const [policyData, setPolicyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchPolicyData = async () => {
      try {
        // Backend API call ('privacy' pageType ke liye)
        const { data } = await axios.get('http://localhost:8080/api/v1/legal/get-policy/privacy');
        if (data?.success) {
          setPolicyData(data.data);
        }
        setLoading(false);
      } catch (error) {
        console.log("Database connection error, using default luxury content.");
        setLoading(false);
      }
    };

    fetchPolicyData();
  }, []);

  const fadeUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } };
  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };

  // Default Sections (Agar DB khali ho toh ye chalega - Fallback safe)
  const defaultSections = [
    { title: "Data Curated", text: "We collect information provided directly to us for account setup, purchases, and preferences to tailor your luxury experience." },
    { title: "Usage & Intent", text: "Data is utilized for order fulfillment, personalized white-glove support, and exclusive product drops. We do not engage in unsolicited tracking." },
    { title: "Cookies & Tracking", text: "We use cookies to enhance your browsing experience. These help us understand site performance and provide a smoother interface for our users." },
    { title: "Third-Party Sharing", text: "We share data only with trusted partners (Payment gateways like Razorpay/Stripe, and logistics partners) essential for processing and delivering your orders." },
    { title: "Data Retention", text: "We retain your personal information only for as long as is necessary for the purposes set out in this policy, or as required by law for tax and accounting purposes." },
    { title: "Children's Privacy", text: "Truee Luxury is intended for adult connoisseurs. We do not knowingly collect personally identifiable information from anyone under the age of 18." },
    { title: "Your Rights", text: "You have the right to access, rectify, or request the deletion of your personal data at any time by contacting our concierge." },
    { title: "Policy Updates", text: "We may update our privacy policy periodically. We will notify you of any significant changes by posting the new policy on this page." },
    { title: "Absolute Security", text: "We implement state-of-the-art encryption. Your information is never sold. Truee Luxury ensures your digital footprint remains as secure as your transactions." }
  ];

  // Kaunsa data dikhana hai: Database wala ya Default wala?
  const sectionsToShow = policyData?.sections?.length > 0 ? policyData.sections : defaultSections;

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-serif text-[#C8A253] text-xl animate-pulse">
        Securing the Truee Vault...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#1a1a1a] overflow-hidden pb-24">
      
      {/* ⚡ CINEMATIC HERO */}
      <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-cover bg-center opacity-40 grayscale-[20%]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2000')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-black/40 to-black/80"></div>
        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 text-center px-6 mt-16">
          <motion.p variants={fadeUp} className="text-[#C8A253] text-[11px] font-bold tracking-[0.4em] uppercase mb-4">Ironclad Security</motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-serif text-white drop-shadow-xl mb-6">
            {policyData?.heroTitle || "Privacy Policy."}
          </motion.h1>
          <motion.div variants={fadeUp} className="w-16 h-[2px] bg-[#C8A253] mx-auto"></motion.div>
        </motion.div>
      </section>

      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-20 -mt-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white/80 backdrop-blur-xl p-10 md:p-16 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white text-center mb-16">
          <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
            {policyData?.subtitle || "At Truee Luxury, your privacy is treated with the same meticulous care as our audio curations. We respect your personal data and are committed to protecting it according to global e-commerce standards."}
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-8">
          
          {sectionsToShow.map((item, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp} 
              className="group relative bg-white p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_rgba(200,162,83,0.1)] border border-gray-100 transition-all duration-500 overflow-hidden flex flex-col md:flex-row gap-8 items-start cursor-default"
            >
              <div className="absolute left-2 top-4 bottom-4 w-1.5 rounded-full bg-gray-100 group-hover:bg-[#C8A253] transition-colors duration-500"></div>
              
              <div className="md:w-1/3 flex items-center gap-4 text-[#C8A253] pl-4">
                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-[#C8A253] group-hover:text-white transition-colors duration-500">
                  {/* Dynamic icon mapping logic, agar icon na mile toh default Shield dikhayega */}
                  {iconMap[item.title] || <Shield />}
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
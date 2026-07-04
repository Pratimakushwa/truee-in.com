

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Award, Scale, Copyright, AlertTriangle, ShieldCheck, User, FileText, Globe } from 'lucide-react';

// ⚡ ICON MAPPER: Database text ko React Icons se jodne ke liye
const iconMap = {
  "Agreement to Elite Standards": <Award />,
  "User Accounts & Security": <User />,
  "Intellectual Property": <Copyright />,
  "Products & Pricing": <Scale />,
  "Errors & Omissions": <FileText />,
  "Authenticity Promise": <ShieldCheck />,
  "Limitation of Liability": <AlertTriangle />,
  "Governing Law": <Globe />
};

export default function Terms() {
  // ⚡ BACKEND CONNECTION STATES
  const [termsData, setTermsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchTermsData = async () => {
      try {
        // Backend API call ('terms' pageType ke liye)
        const { data } = await axios.get('http://localhost:8080/api/v1/legal/get-policy/terms');
        if (data?.success) {
          setTermsData(data.data);
        }
        setLoading(false);
      } catch (error) {
        console.log("Using default terms data.");
        setLoading(false);
      }
    };

    fetchTermsData();
  }, []);

  const fadeUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } };
  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

  // Default Sections (Fallback safe - Changed 'content' to 'text' to match database schema)
  const defaultSections = [
    { title: "Agreement to Elite Standards", text: "By accessing or using the Truee Luxury boutique, you agree to be bound by these meticulously crafted Terms. Our platform is designed for connoisseurs who appreciate premium service." },
    { title: "User Accounts & Security", text: "If you create an elite account with us, you are entirely responsible for maintaining the confidentiality of your password and account details. You agree to accept responsibility for all activities that occur under your account." },
    { title: "Intellectual Property", text: "All content, logos, and designs on this site are the exclusive property of Truee Luxury. Unauthorized reproduction or use is strictly prohibited and will be met with severe legal action." },
    { title: "Products & Pricing", text: "All products are subject to availability. Quantities are strictly limited. We reserve the right to discontinue any product or alter pricing without prior notice, maintaining our standard of exclusivity." },
    { title: "Errors & Omissions", text: "Occasionally there may be information on our site that contains typographical errors, inaccuracies, or omissions related to product descriptions or pricing. We reserve the right to correct any errors and to cancel orders if any information is inaccurate." },
    { title: "Authenticity Promise", text: "We guarantee that all products sold are 100% genuine and sourced directly from original global manufacturers. Your trust is our most valuable asset." },
    { title: "Limitation of Liability", text: "Truee Luxury shall not be held liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our products or services." },
    { title: "Governing Law", text: "These Terms of Service and any separate agreements whereby we provide you services shall be governed by and construed in accordance with the laws of India, specifically under the jurisdiction of Bhopal, Madhya Pradesh." }
  ];

  const sectionsToShow = termsData?.sections?.length > 0 ? termsData.sections : defaultSections;

  // Premium Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-serif text-[#C8A253] text-xl animate-pulse">
        Establishing Legal Framework...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#1a1a1a] overflow-hidden pb-24">
      
      {/* ⚡ CINEMATIC HERO */}
      <section className="relative w-full h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-cover bg-center opacity-40 grayscale" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1458560871784-56d23406c091?auto=format&fit=crop&q=80&w=2000')" }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.9)_100%)]"></div>
        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 text-center px-6 mt-16 text-white">
          <motion.p variants={fadeUp} className="text-[#C8A253] rounded-2xl text-[11px] font-bold tracking-[0.4em] uppercase mb-4">Legal Framework</motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-serif drop-shadow-xl mb-6">
            {termsData?.heroTitle || "Terms & Conditions."}
          </motion.h1>
          <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
            Last Updated: {termsData?.lastUpdated || "June 2026"}
          </motion.p>
        </motion.div>
      </section>

      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-20 -mt-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-white flex flex-col items-center text-center mb-16">
          <p className="text-gray-600 font-serif text-lg italic">
            {termsData?.subtitle || '"Excellence is not just in our products, but in our principles."'}
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-6">
          {sectionsToShow.map((sec, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp} 
              className="group relative bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 hover:border-[#C8A253]/50 hover:shadow-[0_15px_40px_-10px_rgba(200,162,83,0.15)] transition-all duration-500 flex items-start justify-between cursor-default"
            >
              <div className="absolute rounded-full left-2 top-4 bottom-4 w-1.5 bg-gray-100 group-hover:bg-[#C8A253] transition-colors duration-500"></div>
              <div className="pl-6">
                <div className="flex items-center gap-3 mb-4 text-[#C8A253]">
                  {/* Dynamic icon mapping */}
                  {iconMap[sec.title] || <FileText />}
                  <h2 className="text-xl font-serif text-black group-hover:text-[#C8A253] transition-colors">{sec.title}</h2>
                </div>
                <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                  {sec.text || sec.content}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
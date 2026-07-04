
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ShieldCheck, Box, CreditCard, Truck, AlertOctagon, PackageCheck, Receipt, RefreshCcw, Ban, Landmark, Shield } from 'lucide-react';

// ⚡ ICON MAPPER: Database text to React Icons
const iconMap = {
  "Order Cancellations": <Ban />,
  "Return Window & Eligibility": <Box />,
  "Non-Returnable Items": <Receipt />,
  "Damaged or Defective Goods": <AlertOctagon />,
  "Initiating a Return": <Truck />,
  "Quality Inspection": <PackageCheck />,
  "Refund Processing & Timelines": <CreditCard />,
  "Exchanges": <RefreshCcw />,
  "Late or Missing Refunds": <Landmark />
};

export default function RefundPolicy() {
  const [refundData, setRefundData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchRefundData = async () => {
      try {
        const { data } = await axios.get('http://localhost:8080/api/v1/legal/get-policy/refund');
        if (data?.success) {
          setRefundData(data.data);
        }
        setLoading(false);
      } catch (error) {
        console.log("Using default refund policy data.");
        setLoading(false);
      }
    };

    fetchRefundData();
  }, []);

  const fadeUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } } };
  const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };

  // ⚡ ACTUAL E-COMMERCE STANDARD REFUND DATA (Fallback)
  const defaultSections = [
    { title: "Order Cancellations", text: "Orders can be cancelled for a full refund within 12 hours of placement. Once an order has been processed or dispatched from our warehouse, cancellation requests will no longer be accepted." },
    { title: "Return Window & Eligibility", text: "We offer a 7-day return window from the date of delivery. To be eligible, the item must be unused, unsealed, and in the exact same pristine condition that you received it. All original tags, manuals, and luxury packaging must remain perfectly intact." },
    { title: "Non-Returnable Items", text: "For hygiene and customization reasons, certain items cannot be returned. These include In-Ear Monitors (IEMs), customized/bespoke orders, limited-edition drops, and gift cards. Shipping and handling charges are strictly non-refundable." },
    { title: "Damaged or Defective Goods", text: "In the rare event that you receive a damaged or defective product, you must notify our Concierge team within 48 hours of delivery. Please provide a clear unboxing video and high-resolution photographs to expedite the replacement process." },
    { title: "Initiating a Return", text: "To start a return, contact our support team with your Order ID. Once approved, we will arrange a secure, white-glove pickup from your location via our premium logistic partners. Do not ship the product back without official authorization." },
    { title: "Quality Inspection", text: "Once your returned item reaches our facility, it will undergo a rigorous 48-hour quality check by our audio specialists. We reserve the right to reject the refund if the product shows signs of use, physical damage, or missing accessories." },
    { title: "Refund Processing & Timelines", text: "Upon successful inspection, your refund will be approved and processed immediately. The credited amount will reflect in your original payment method within 5 to 7 business days, depending on your bank's processing time." },
    { title: "Exchanges", text: "We only replace items if they are defective or damaged upon arrival. If you wish to exchange a product for a different color or model, you must initiate a standard return and place a fresh order on the website." },
    { title: "Late or Missing Refunds", text: "If you haven’t received a refund after 7 business days, please check your bank account again and contact your credit card company, as processing times vary. If the issue persists, kindly reach out to our support desk." }
  ];

  // ⚡ THE FIX: Decide konsa data dikhana hai (Database ya Default)
  const sectionsToShow = refundData?.sections?.length > 0 ? refundData.sections : defaultSections;

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-serif text-[#C8A253] text-xl animate-pulse">
        Processing Truee Guarantee...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-[#1a1a1a] overflow-hidden pb-24">
      
      {/* ⚡ CINEMATIC HERO */}
      <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-cover bg-center opacity-40 grayscale-[20%]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=2000')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-black/40 to-black/80"></div>
        
        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 text-center px-6 mt-16">
          <motion.p variants={fadeUp} className="text-[#C8A253] text-[11px] font-bold tracking-[0.4em] uppercase mb-4">Concierge Support</motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-serif text-white drop-shadow-xl mb-6">
            {refundData?.heroTitle || "Returns & Refunds."}
          </motion.h1>
          <motion.div variants={fadeUp} className="w-16 h-[2px] bg-[#C8A253] mx-auto"></motion.div>
        </motion.div>
      </section>

      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-20 -mt-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white/80 backdrop-blur-xl p-10 md:p-16 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white text-center mb-16">
          <ShieldCheck className="w-16 h-16 text-[#C8A253] mx-auto mb-6" strokeWidth={1} />
          <h2 className="text-3xl font-serif mb-6">The Truee Guarantee</h2>
          <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto text-lg">
            {refundData?.subtitle || "We stand behind every masterpiece we curate. If your product does not meet the exceptional standards of Truee Luxury, we offer a seamless 7-day white-glove return policy from the date of delivery."}
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-8">
          
          {/* ⚡ MAP CHANGED TO sectionsToShow */}
          {sectionsToShow.map((item, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp} 
              className="group relative bg-white p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_rgba(200,162,83,0.1)] border border-gray-100 transition-all duration-500 overflow-hidden flex flex-col md:flex-row gap-8 items-start cursor-default"
            >
              <div className="absolute left-2 top-4 bottom-4 w-1.5 rounded-full bg-gray-100 group-hover:bg-[#C8A253] transition-colors duration-500"></div>
              
              <div className="md:w-1/3 flex items-center gap-4 text-[#C8A253] pl-4">
                <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-[#C8A253] group-hover:text-white transition-colors duration-500">
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
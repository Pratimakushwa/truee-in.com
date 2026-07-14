import React from 'react';
import { Trophy, ShieldCheck, Truck, Headset } from 'lucide-react';

const features = [
  { icon: Trophy, title: 'Premium Quality', desc: 'Curated from top global brands' },
  { icon: ShieldCheck, title: 'Official Warranty', desc: 'Manufacturer backed protection' },
  { icon: Truck, title: 'Pan-India Shipping', desc: 'Fast & insured delivery' },
  { icon: Headset, title: '24/7 Support', desc: 'Dedicated expert assistance' },
];

const FeatureBar = () => (
  <section className="w-full bg-[#0A0A0A] py-12 px-4   md:px-8 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#C8A253]/50 to-transparent rounded-full" />

    <div className="max-w-[1250px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
      {features.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="flex items-center gap-4 group">
          <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#C8A253]/10 border border-[#C8A253]/20 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Icon size={24} strokeWidth={1.5} className="text-[#C8A253]" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm md:text-base font-semibold text-white leading-tight">{title}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default FeatureBar;

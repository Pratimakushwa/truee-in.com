import { Link } from 'react-router-dom';
import {
  ShieldCheck, Truck, RotateCcw, BadgeCheck, Lock, IndianRupee,
  Headphones, Award, FileCheck,
} from 'lucide-react';

const TRUST_ITEMS = [
  { icon: ShieldCheck, title: '100% Genuine Products', desc: 'Authorized brand partnerships only' },
  { icon: Lock, title: 'Secure Payments', desc: 'Razorpay verified & encrypted checkout' },
  { icon: Truck, title: 'Fast Pan-India Delivery', desc: '3–5 business days dispatch' },
  { icon: RotateCcw, title: 'Easy Returns', desc: 'Hassle-free return policy' },
  { icon: BadgeCheck, title: 'GST Invoice', desc: 'Business & personal invoices' },
  { icon: IndianRupee, title: 'Made for India', desc: 'Local warranty & support' },
  { icon: Headphones, title: 'Expert Support', desc: 'Dedicated customer care' },
  { icon: Award, title: 'Brand Warranty', desc: 'Official manufacturer warranty' },
];

export default function TrustSection() {
  return (
    <section className="relative w-full py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FCFAEF] via-white to-[#FAFAFA]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#C8A253]/40 to-transparent rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-[#8B6914] mb-3 px-4 py-1.5 rounded-full border border-[#C8A253]/25 bg-white/80">
            Why TRUEE
          </span>
          <h2 className="text-2xl md:text-4xl font-serif text-gray-900 mb-3">
            Shop with complete confidence
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Premium electronics, authentic products, and a shopping experience built for trust — just like India&apos;s best retail brands.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {TRUST_ITEMS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group p-4 md:p-5 rounded-2xl bg-white/80 border border-gray-100 hover:border-[#C8A253]/30 hover:shadow-lg hover:shadow-[#C8A253]/5 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-[#FCFAEF] border border-[#C8A253]/15 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Icon size={22} className="text-[#C8A253]" strokeWidth={1.8} />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-1">{title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-8">
          <Link
            to="/refund-policy"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#C8A253] transition-colors"
          >
            <FileCheck size={14} /> Return Policy
          </Link>
          <span className="hidden md:inline w-1 h-1 rounded-full bg-[#C8A253]/40" />
          <Link
            to="/ShippingPolicy"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#C8A253] transition-colors"
          >
            <Truck size={14} /> Shipping Info
          </Link>
          <span className="hidden md:inline w-1 h-1 rounded-full bg-[#C8A253]/40" />
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#C8A253] transition-colors"
          >
            <Headphones size={14} /> Contact Support
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#C8A253]/30 to-transparent rounded-full" />
    </section>
  );
}

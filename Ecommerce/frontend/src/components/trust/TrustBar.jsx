import { ShieldCheck, Truck, RotateCcw, BadgeCheck, Lock, IndianRupee } from 'lucide-react';

const DEFAULT_ITEMS = [
  { icon: ShieldCheck, title: '100% Genuine', desc: 'Authorized products only' },
  { icon: Lock, title: 'Secure Checkout', desc: 'Razorpay verified payments' },
  { icon: Truck, title: 'Fast Delivery', desc: '3–5 business days' },
  { icon: RotateCcw, title: 'Easy Returns', desc: 'Hassle-free policy' },
  { icon: BadgeCheck, title: 'GST Invoice', desc: 'Available on request' },
  { icon: IndianRupee, title: 'Made for India', desc: 'Local support & warranty' },
];

export default function TrustBar({ variant = 'default', className = '' }) {
  const isCompact = variant === 'compact';
  const isCheckout = variant === 'checkout';

  return (
    <section
      className={`w-full relative ${
        isCheckout
          ? 'bg-[#FCFAEF] border border-[#C8A253]/20 rounded-xl p-4'
          : 'bg-gradient-to-b from-white to-[#FAFAFA] border-y border-gray-100 py-6 md:py-8'
      } ${className}`}
      aria-label="Trust and service guarantees"
    >
      {!isCheckout && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 max-w-xl truee-divider-line" />
      )}
      <div className={`max-w-7xl mx-auto px-4 ${isCompact ? '' : 'md:px-8'}`}>
        {isCheckout && (
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#8B6914] mb-3 text-center">
            Shop with confidence
          </p>
        )}
        <div
          className={`grid gap-4 ${
            isCompact || isCheckout
              ? 'grid-cols-2 sm:grid-cols-3'
              : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
          }`}
        >
          {DEFAULT_ITEMS.slice(0, isCheckout ? 6 : 6).map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className={`flex items-start gap-2.5 ${
                isCheckout ? 'bg-white/60 rounded-lg p-2.5' : ''
              }`}
            >
              <div className="shrink-0 w-9 h-9 rounded-full bg-[#FCFAEF] border border-[#C8A253]/20 flex items-center justify-center">
                <Icon size={18} className="text-[#C8A253]" strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <p className={`font-semibold text-gray-900 leading-tight ${isCompact ? 'text-xs' : 'text-sm'}`}>
                  {title}
                </p>
                <p className={`text-gray-500 leading-snug ${isCompact ? 'text-[10px]' : 'text-xs'}`}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

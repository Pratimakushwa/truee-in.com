
import { ShieldCheck, Truck, RotateCcw, BadgeCheck, Lock, IndianRupee } from 'lucide-react';

const DEFAULT_ITEMS = [
  { icon: ShieldCheck, title: '100% Genuine' },
  { icon: Lock, title: 'Secure Checkout' },
  { icon: Truck, title: 'Fast Delivery' },
  { icon: RotateCcw, title: 'Easy Returns' },
  { icon: BadgeCheck, title: 'GST Invoice' },
  { icon: IndianRupee, title: 'Made for India' },
];

export default function TrustBar({ variant = 'default', className = '' }) {
  const isCompact = variant === 'compact';
  const isCheckout = variant === 'checkout';

  return (
    <section
      className={`w-full relative ${
        isCheckout
          ? 'bg-[#FCFAEF] border border-[#C8A253]/20 rounded-xl p-5'
          : 'bg-gradient-to-b from-white to-[#FAFAFA] border-y border-gray-100 py-6 md:py-8'
      } ${className}`}
    >
      {!isCheckout && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 max-w-xl truee-divider-line" />
      )}
      <div className={`max-w-7xl mx-auto px-4 ${isCompact ? '' : 'md:px-8'}`}>
        {isCheckout && (
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#8B6914] mb-4 text-center">
            Shop with confidence
          </p>
        )}
        <div
          className={`grid gap-3 ${
            isCompact || isCheckout
              ? 'grid-cols-2 sm:grid-cols-3'
              : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
          }`}
        >
          {DEFAULT_ITEMS.slice(0, 6).map(({ icon: Icon, title }) => (
            <div
              key={title}
              // ⚡ Yahan wapas flex-col laga diya taaki Icon upar aur Text neeche center mein aaye
              className={`flex ${
                isCheckout 
                  ? 'flex-col items-center justify-center text-center p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-[#C8A253]/10 gap-2' 
                  : 'items-center gap-3'
              }`}
            >
              <div className={`shrink-0 rounded-full flex items-center justify-center ${
                  isCheckout ? 'w-10 h-10 bg-[#fdfdfd] border border-[#C8A253]/30 shadow-inner' : 'w-9 h-9 bg-[#FCFAEF] border border-[#C8A253]/20'
              }`}>
                <Icon size={isCheckout ? 20 : 18} className="text-[#C8A253]" strokeWidth={2} />
              </div>
              <div className="w-full">
                <p className={`font-bold text-black tracking-wide ${
                  isCheckout ? 'text-[11px] sm:text-xs leading-tight' : (isCompact ? 'text-[11px]' : 'text-sm')
                }`}>
                  {title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
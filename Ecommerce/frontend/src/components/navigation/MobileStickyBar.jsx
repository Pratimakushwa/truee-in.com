import { Link, useLocation } from 'react-router-dom';
import { Home, Grid3X3, ShoppingBag, Heart, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

export default function MobileStickyBar({ onCartOpen }) {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axiosInstance.get('/cart');
        if (data.success) setCartCount(data.cart?.items?.length || 0);
      } catch {
        setCartCount(0);
      }
    };
    load();
    const handler = () => load();
    window.addEventListener('cartUpdated', handler);
    return () => window.removeEventListener('cartUpdated', handler);
  }, []);

  const handleCartOpen = () => {
    if (onCartOpen) onCartOpen();
    else window.dispatchEvent(new CustomEvent('openCart'));
  };

  const items = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/shop', icon: Grid3X3, label: 'Shop' },
    { to: '/wishlist', icon: Heart, label: 'Wishlist' },
    { to: user ? '/profile' : '/login', icon: User, label: user ? 'Account' : 'Login' },
  ];

  const isActive = (to) => (to === '/' ? pathname === '/' : pathname.startsWith(to));

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-[998] pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile navigation"
    >
      <div className="mx-3 mb-3 rounded-2xl border border-white/20 bg-white/90 backdrop-blur-xl shadow-[0_-4px_32px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-around px-2 py-2">
          {items.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 min-w-[56px] ${
                isActive(to)
                  ? 'text-[#C8A253] bg-[#FCFAEF]'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Icon size={20} strokeWidth={isActive(to) ? 2.2 : 1.8} />
              <span className="text-[9px] font-semibold tracking-wide">{label}</span>
            </Link>
          ))}

          <button
            type="button"
            onClick={handleCartOpen}
            className="relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl text-gray-500 hover:text-gray-900 transition-all min-w-[56px]"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-2 bg-[#0A0A0A] text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
            <span className="text-[9px] font-semibold tracking-wide">Cart</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

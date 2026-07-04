import { Link } from 'react-router-dom';

const LOGO_SRC = '/Truee_Luxury_Logo.png';

export default function AdminLogo({ collapsed = false, className = '' }) {
  return (
    <Link
      to="/admin/dashboard"
      className={`flex flex-col items-center group ${collapsed ? 'gap-0' : 'items-start gap-1'} ${className}`}
      aria-label="TRUEE Admin — Dashboard"
    >
      <img
        src={LOGO_SRC}
        alt="TRUEE"
        className={`object-contain transition-opacity group-hover:opacity-90 ${
          collapsed ? 'h-8 w-auto max-w-[40px]' : 'h-10 md:h-11 w-auto max-w-[140px]'
        }`}
      />
      {!collapsed && (
        <span className="text-[10px] text-gray-500 tracking-[0.2em] uppercase font-medium">
          Admin Console
        </span>
      )}
    </Link>
  );
}

export { LOGO_SRC };

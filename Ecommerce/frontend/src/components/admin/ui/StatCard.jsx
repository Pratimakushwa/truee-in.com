import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const formatValue = (value, format) => {
  if (value === null || value === undefined) return '—';
  if (format === 'currency') {
    return `₹${Number(value).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  }
  return Number(value).toLocaleString('en-IN');
};

export default function StatCard({
  label,
  value,
  change,
  changeLabel = 'vs previous',
  icon: Icon,
  iconBg = 'bg-[#FCFAEF]',
  iconColor = 'text-[#C8A253]',
  format = 'number',
  onClick,
  className = '',
}) {
  const isUp = change > 0;
  const isDown = change < 0;
  const TrendIcon = isUp ? TrendingUp : isDown ? TrendingDown : Minus;
  const trendColor = isUp ? 'text-emerald-600 bg-emerald-50' : isDown ? 'text-red-600 bg-red-50' : 'text-gray-500 bg-gray-100';

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      className={`admin-card p-5 ${onClick ? 'admin-card-interactive' : ''} ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide truncate">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2 tracking-tight">
            {formatValue(value, format)}
          </p>
          {change !== undefined && change !== null && (
            <div className="flex items-center gap-1.5 mt-2">
              <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${trendColor}`}>
                <TrendIcon size={11} />
                {Math.abs(change)}%
              </span>
              <span className="text-[10px] text-gray-400">{changeLabel}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`shrink-0 w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center`}>
            <Icon size={20} className={iconColor} strokeWidth={1.8} />
          </div>
        )}
      </div>
    </div>
  );
}

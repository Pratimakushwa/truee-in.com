const STATUS_STYLES = {
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
  Processing: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  Packed: 'bg-violet-50 text-violet-700 border-violet-200',
  Shipped: 'bg-sky-50 text-sky-700 border-sky-200',
  'Out for Delivery': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  Delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Completed: 'bg-green-50 text-green-800 border-green-200',
  Cancelled: 'bg-red-50 text-red-700 border-red-200',
  'Refund Initiated': 'bg-orange-50 text-orange-700 border-orange-200',
  Refunded: 'bg-gray-100 text-gray-700 border-gray-200',
  Returned: 'bg-rose-50 text-rose-700 border-rose-200',
  Paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Failed: 'bg-red-50 text-red-700 border-red-200',
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Inactive: 'bg-gray-100 text-gray-600 border-gray-200',
};

export default function StatusBadge({ status, className = '' }) {
  const style = STATUS_STYLES[status] || 'bg-gray-100 text-gray-600 border-gray-200';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${style} ${className}`}>
      {status || 'Unknown'}
    </span>
  );
}

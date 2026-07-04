export const ORDER_STATUSES = [
  'Pending',
  'Confirmed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered',
  'Completed',
  'Cancelled',
  'Refunded',
  'Returned',
];

export const CUSTOMER_TIMELINE = [
  'Pending',
  'Confirmed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered',
  'Completed',
];

export const getTimelineIndex = (status) => {
  if (['Cancelled', 'Refund Initiated', 'Refunded', 'Returned'].includes(status)) return -1;
  const idx = CUSTOMER_TIMELINE.indexOf(status);
  if (idx >= 0) return idx;
  // Legacy mapping
  const legacy = { Processing: 2, Shipped: 4, 'Out for Delivery': 5, Delivered: 6 };
  return legacy[status] ?? 0;
};

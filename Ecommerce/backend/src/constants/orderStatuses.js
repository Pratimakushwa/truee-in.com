const ORDER_STATUSES = [
  'Pending',
  'Confirmed',
  'Processing',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered',
  'Completed',
  'Cancelled',
  'Refund Initiated',
  'Refunded',
  'Returned',
];

const CUSTOMER_TIMELINE = [
  'Pending',
  'Confirmed',
  'Processing',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered',
  'Completed',
];

const TERMINAL_STATUSES = ['Cancelled', 'Refunded', 'Returned', 'Completed'];

module.exports = { ORDER_STATUSES, CUSTOMER_TIMELINE, TERMINAL_STATUSES };

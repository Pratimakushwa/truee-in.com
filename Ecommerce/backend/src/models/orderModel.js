// const mongoose = require('mongoose');

//   const orderItemSchema = new mongoose.Schema({
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true
//   },
//   name: { type: String, required: true }, // Order ke time ka naam
//   price: { type: Number, required: true }, // Order ke time ka price
//   image: { type: String, required: true }, // Order ke time ki image
//   quantity: { type: Number, required: true, min: 1 }
// });



// const orderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: false // Guest checkout allow karne ke liye optional kiya
//   },
//   guestEmail: { 
//     type: String // Guest customers ka email store karenge
//   },
//   orderItems: [orderItemSchema], // Upar wala schema yahan use kiya
  
//   shippingAddress: {
//     fullName: { type: String, required: true },
//     phone: { type: String, required: true },
//     addressLine1: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     pincode: { type: String, required: true }
//   },

//   paymentInfo: {
//     method: { 
//       type: String, 
//       enum: ['COD', 'Card', 'UPI', 'Razorpay'], 
//       default: 'COD' 
//     },
//     transactionId: { type: String }, // Jab real payment gateway lagega tab kaam aayega
//     paymentStatus: {
//       type: String,
//       enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
//       default: 'Pending'
//     }
//   },

//   orderStatus: {
//     type: String,
//     enum: ['Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'],
//     default: 'Processing'
//   },

//   itemsPrice: { type: Number, required: true, default: 0.0 }, // Sirf products ka total
//   shippingPrice: { type: Number, required: true, default: 0.0 }, // Delivery charge
//   totalAmount: { type: Number, required: true, default: 0.0 }, // Grand Total

//   deliveredAt: { type: Date }
  
// }, { 
//   timestamps: true // Yeh automatically 'createdAt' aur 'updatedAt' field bana dega
// });

// const Order = mongoose.model('Order', orderSchema);
// module.exports = Order;

// const mongoose = require('mongoose');

// const orderItemSchema = new mongoose.Schema({
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true
//   },
//   name: { type: String, required: true }, // Order ke time ka naam
//   price: { type: Number, required: true }, // Order ke time ka price
//   image: { type: String, required: true }, // Order ke time ki image
//   quantity: { type: Number, required: true, min: 1 }
// });

// const orderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: false // Guest checkout allow karne ke liye optional kiya
//   },
//   guestEmail: { 
//     type: String // Guest customers ka email store karenge
//   },
//   orderItems: [orderItemSchema], // Upar wala schema yahan use kiya
  
//   shippingAddress: {
//     fullName: { type: String, required: true },
//     phone: { type: String, required: true },
//     addressLine1: { type: String, required: true },
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     pincode: { type: String, required: true },
//     // ⚡ FIX 1: Country add kar diya taaki frontend ka data reject na ho
//     country: { type: String, default: 'India' } 
//   },

//   paymentInfo: {
//     method: { 
//       type: String, 
//       // ⚡ FIX 2: 'cod' aur 'razorpay' (small letters) add kar diye taaki frontend values se match kare
//       enum: ['cod', 'COD', 'Card', 'UPI', 'razorpay', 'Razorpay'], 
//       default: 'COD' 
//     },
//     transactionId: { type: String }, // Jab real payment gateway lagega tab kaam aayega
//     paymentStatus: {
//       type: String,
//       enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
//       default: 'Pending'
//     }
//   },

//   orderStatus: {
//     type: String,
//     enum: ['Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'],
//     default: 'Processing'
//   },

//   itemsPrice: { type: Number, required: true, default: 0.0 }, // Sirf products ka total
//   shippingPrice: { type: Number, required: true, default: 0.0 }, // Delivery charge
//   totalAmount: { type: Number, required: true, default: 0.0 }, // Grand Total

//   deliveredAt: { type: Date }
  
// }, { 
//   timestamps: true // Yeh automatically 'createdAt' aur 'updatedAt' field bana dega
// });

// const Order = mongoose.model('Order', orderSchema);
// module.exports = Order;

const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: { type: String, required: true }, // Order ke time ka naam
  price: { type: Number, required: true }, // Order ke time ka price
  image: { type: String, required: true }, // Order ke time ki image
  quantity: { type: Number, required: true, min: 1 }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Guest checkout allow karne ke liye optional kiya
  },
  guestEmail: { 
    type: String // Guest customers ka email store karenge
  },
  orderItems: [orderItemSchema], // Upar wala schema yahan use kiya
  
  shippingAddress: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    addressLine1: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    // ⚡ FIX 1: Country add kar diya taaki frontend ka data reject na ho
    country: { type: String, default: 'India' } 
  },

  paymentInfo: {
    method: { 
      type: String, 
      // ⚡ FIX 2: 'cod' aur 'razorpay' (small letters) add kar diye taaki frontend values se match kare
      enum: ['cod', 'COD', 'Card', 'UPI', 'razorpay', 'Razorpay'], 
      default: 'COD' 
    },
    transactionId: { type: String }, // Jab real payment gateway lagega tab kaam aayega
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
      default: 'Pending'
    }
  },

  orderStatus: {
    type: String,
    enum: [
      'Pending', 'Confirmed', 'Processing', 'Packed', 'Shipped',
      'Out for Delivery', 'Delivered', 'Completed', 'Cancelled',
      'Refund Initiated', 'Refunded', 'Returned',
    ],
    default: 'Pending',
  },

  statusHistory: [{
    status: { type: String, required: true },
    note: { type: String, default: '' },
    updatedAt: { type: Date, default: Date.now },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  }],

  // ⚡ NAYA ADD KIYA: Courier aur AWB (Tracking) details ke liye
  trackingDetails: {
    courierPartner: { type: String, default: '' },
    awbNumber: { type: String, default: '' },
    shippedAt: { type: Date }
  },

  itemsPrice: { type: Number, default: 0.0 },
  shippingPrice: { type: Number, default: 0.0 },
  totalAmount: { type: Number, required: true, default: 0.0 },
  discountAmount: { type: Number, default: 0 },
  couponApplied: { type: String, default: null },
  coinsRedeemed: { type: Number, default: 0, min: 0 },
  coinsEarned: { type: Number, default: 0, min: 0 },
  payableAmount: { type: Number, default: 0 },
  rewardStatus: {
    type: String,
    enum: ['NONE', 'PENDING', 'CREDITED', 'REVERSED'],
    default: 'NONE',
  },
  rewardCreditedAt: { type: Date },
  rewardIdempotencyKey: { type: String, sparse: true },

  deliveredAt: { type: Date }
  
}, { 
  timestamps: true // Yeh automatically 'createdAt' aur 'updatedAt' field bana dega
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
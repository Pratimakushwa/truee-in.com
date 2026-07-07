// // // const mongoose = require('mongoose');

// // // const userSchema = new mongoose.Schema({
// // //   name: { 
// // //     type: String, 
// // //     required: [true, 'Please provide a name'],
// // //     trim: true
// // //   },
// // //   email: { 
// // //     type: String, 
// // //     required: [true, 'Please provide an email'], 
// // //     unique: true, 
// // //     lowercase: true,
// // //     trim: true
// // //   },
// // //   password: { 
// // //     type: String, 
// // //     required: [true, 'Please provide a password'],
// // //     minlength: 8
// // //   },
  
// // //   // Access Control Gateway
// // //   role: { 
// // //     type: String, 
// // //     enum: ['customer', 'admin', 'super-admin'], 
// // //     default: 'customer' 
// // //   },

// // //   // Triggers the "Force Password Change" screen
// // //   isFirstLogin: {
// // //     type: Boolean,
// // //     default: true 
// // //   },

// // //   // Allows you to suspend users without deleting their data
// // //   isActive: {
// // //     type: Boolean,
// // //     default: true
// // //   }
// // // }, { 
// // //   timestamps: true 
// // // });

// // // module.exports = mongoose.model('User', userSchema);

// // // const mongoose = require('mongoose');

// // // const userSchema = new mongoose.Schema({
// // //   name: { 
// // //     type: String, 
// // //     required: [true, 'Please provide a name'],
// // //     trim: true
// // //   },
// // //   email: { 
// // //     type: String, 
// // //     required: [true, 'Please provide an email'], 
// // //     unique: true, 
// // //     lowercase: true,
// // //     trim: true
// // //   },
// // //   password: { 
// // //     type: String, 
// // //     required: [true, 'Please provide a password'],
// // //     minlength: 8
// // //   },
  
// // //   // ⚡ FIX: Ye dono fields add karni zaroori hain!
// // //   phone: {
// // //     type: String,
// // //     trim: true,
// // //     default: "" // Shuru mein khali rahega jab tak user add na kare
// // //   },
// // //   gender: {
// // //     type: String,
// // //     enum: ['Male', 'Female', 'Other'], // Options set kar diye
// // //     default: 'Female'
// // //   },

// // //   // Access Control Gateway
// // //   role: { 
// // //     type: String, 
// // //     enum: ['customer', 'admin', 'super-admin'], 
// // //     default: 'customer' 
// // //   },

// // //   // Triggers the "Force Password Change" screen
// // //   isFirstLogin: {
// // //     type: Boolean,
// // //     default: true 
// // //   },

// // //   // Allows you to suspend users without deleting their data
// // //   isActive: {
// // //     type: Boolean,
// // //     default: true
// // //   }
// // // }, { 
// // //   timestamps: true 
// // // });

// // // module.exports = mongoose.model('User', userSchema);

// // const mongoose = require('mongoose');

// // const userSchema = new mongoose.Schema({
// //   name: { 
// //     type: String, 
// //     required: [true, 'Please provide a name'],
// //     trim: true
// //   },
// //   email: { 
// //     type: String, 
// //     required: [true, 'Please provide an email'], 
// //     unique: true, 
// //     lowercase: true,
// //     trim: true
// //   },
// //   password: { 
// //     type: String, 
// //     required: [true, 'Please provide a password'],
// //     minlength: 8
// //   },
  
// //   // ⚡ PROFILE DETAILS (Phone & Gender)
// //   phone: {
// //     type: String,
// //     trim: true,
// //     default: "" 
// //   },
// //   gender: {
// //     type: String,
// //     enum: ['Male', 'Female', 'Other'], 
// //     default: 'Female'
// //   },

// //   // ⚡ ADDRESSES ARRAY (Address form ke liye zaroori)
// //   addresses: [{
// //     name: String,
// //     phone: String,
// //     pincode: String,
// //     locality: String,
// //     address: String,
// //     type: { type: String, default: 'Home' }
// //   }],

// //   // Access Control Gateway
// //   role: { 
// //     type: String, 
// //     enum: ['customer', 'admin', 'super-admin'], 
// //     default: 'customer' 
// //   },

// //   // Triggers the "Force Password Change" screen
// //   isFirstLogin: {
// //     type: Boolean,
// //     default: true 
// //   },

// //   // Allows you to suspend users without deleting their data
// //   isActive: {
// //     type: Boolean,
// //     default: true
// //   }
// // }, { 
// //   timestamps: true 
// // });

// // module.exports = mongoose.model('User', userSchema);
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { 
//     type: String, 
//     required: [true, 'Please provide a name'],
//     trim: true
//   },
//   email: { 
//     type: String, 
//     required: [true, 'Please provide an email'], 
//     unique: true, 
//     lowercase: true,
//     trim: true
//   },
//   password: { 
//     type: String, 
//     required: [true, 'Please provide a password'],
//     minlength: 8
//   },
  
//   // ⚡ PROFILE DETAILS
//   phone: {
//     type: String,
//     trim: true,
//     default: "" 
//   },
//   gender: {
//     type: String,
//     enum: ['Male', 'Female', 'Other'], 
//     default: 'Female'
//   },

//   // ⚡ FIX: Ye raha naya Addresses Schema jo Checkout aur Profile dono se perfectly match karega
//   addresses: [{
//     firstName: String,
//     lastName: String,
//     phone: String,
//     pincode: String,
//     addressLine1: String,
//     city: String,
//     state: String,
//     country: { type: String, default: 'India' },
//     type: { type: String, default: 'Home' }
//   }],

//   // Access Control Gateway
//   role: { 
//     type: String, 
//     enum: ['customer', 'admin', 'super-admin'], 
//     default: 'customer' 
//   },

//   // Triggers the "Force Password Change" screen
//   isFirstLogin: {
//     type: Boolean,
//     default: true 
//   },

//   // Allows you to suspend users without deleting their data
//   isActive: {
//     type: Boolean,
//     default: true
//   }
// }, { 
//   timestamps: true 
// });

// module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { 
//     type: String, 
//     required: [true, 'Please provide a name'],
//     trim: true
//   },
//   email: { 
//     type: String, 
//     required: [true, 'Please provide an email'], 
//     unique: true, 
//     lowercase: true,
//     trim: true
//   },
//   password: { 
//     type: String, 
//     required: [true, 'Please provide a password'],
//     minlength: 8
//   },
  
//   // ⚡ PROFILE DETAILS
//   phone: {
//     type: String,
//     trim: true,
//     default: "" 
//   },
//   gender: {
//     type: String,
//     enum: ['Male', 'Female', 'Other'], 
//     default: 'Female'
//   },

//   // ⚡ Addresses Schema
//   addresses: [{
//     firstName: String,
//     lastName: String,
//     phone: String,
//     pincode: String,
//     addressLine1: String,
//     city: String,
//     state: String,
//     country: { type: String, default: 'India' },
//     type: { type: String, default: 'Home' }
//   }],

//   // ⚡ NAYA FIX: Wishlist Array Add Kiya Hai Yahan 👇
//   wishlist: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Product' // Dhyan rakhna ki tumhara product model ka naam 'Product' hi ho
//     }
//   ],

//   // Access Control Gateway
//   role: { 
//     type: String, 
//     enum: ['customer', 'admin', 'super-admin'], 
//     default: 'customer' 
//   },

//   // Triggers the "Force Password Change" screen
//   isFirstLogin: {
//     type: Boolean,
//     default: true 
//   },

//   // Allows you to suspend users without deleting their data
//   isActive: {
//     type: Boolean,
//     default: true
//   }
// }, { 
//   timestamps: true 
// });

// module.exports = mongoose.model('User', userSchema);


// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { 
//     type: String, 
//     required: [true, 'Please provide a name'],
//     trim: true
//   },
//   email: { 
//     type: String, 
//     required: [true, 'Please provide an email'], 
//     unique: true, 
//     lowercase: true,
//     trim: true
//   },
//   password: { 
//     type: String, 
//     required: [true, 'Please provide a password'],
//     minlength: 8
//   },
  
//   // ⚡ PROFILE DETAILS
//   phone: {
//     type: String,
//     trim: true,
//     default: "" 
//   },
//   gender: {
//     type: String,
//     enum: ['Male', 'Female', 'Other'], 
//     default: 'Female'
//   },

//   // ⚡ Addresses Schema
//   addresses: [{
//     firstName: String,
//     lastName: String,
//     phone: String,
//     pincode: String,
//     addressLine1: String,
//     city: String,
//     state: String,
//     country: { type: String, default: 'India' },
//     type: { type: String, default: 'Home' }
//   }],

//   // ⚡ WISHLIST (Ye ab perfectly set hai)
//   wishlist: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Product' 
//     }
//   ],

//   // Access Control Gateway
//   role: { 
//     type: String, 
//     enum: ['customer', 'admin', 'super-admin'], 
//     default: 'customer' 
//   },

//   // Triggers the "Force Password Change" screen
//   isFirstLogin: {
//     type: Boolean,
//     default: true 
//   },

//   // Allows you to suspend users without deleting their data
//   isActive: {
//     type: Boolean,
//     default: true
//   }
// }, { 
//   timestamps: true 
// });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: { 
    type: String, 
    required: [true, 'Please provide an email'], 
    unique: true, 
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: [true, 'Please provide a password'],
    minlength: 8
  },
  
  // ⚡ PROFILE DETAILS
  phone: {
    type: String,
    trim: true,
    default: "" 
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'], 
    default: 'Female'
  },

  // ⚡ Addresses Schema
  addresses: [{
    firstName: String,
    lastName: String,
    phone: String,
    pincode: String,
    addressLine1: String,
    city: String,
    state: String,
    country: { type: String, default: 'India' },
    type: { type: String, default: 'Home' }
  }],

  // ⚡ WISHLIST
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product' 
    }
  ],

  // ⚡ COUPON STORAGE (Updated for Status)
  coupons: [{
    code: String,
    status: { type: String, enum: ['Available', 'Used', 'Expired'], default: 'Available' },
    usedAt: Date
  }],
  
  // Access Control Gateway
  role: { 
    type: String, 
    enum: ['customer', 'admin', 'super-admin'], 
    default: 'customer' 
  },

  // Triggers the "Force Password Change" screen
  isFirstLogin: {
    type: Boolean,
    default: true 
  },

  // Allows you to suspend users without deleting their data
  isActive: {
    type: Boolean,
    default: true
  },

  // ⚡ FORGOT PASSWORD (OTP Fields Added Here)
  otp: {
    type: String,
    default: null
  },
  otpExpire: {
    type: Date,
    default: null
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('User', userSchema);
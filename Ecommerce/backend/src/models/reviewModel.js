// const mongoose = require('mongoose');

// const reviewSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     product: {
//       type: mongoose.Schema.Types.Mixed,
//       required: true,
//     },
//     rating: {
//       type: Number,
//       required: [true, 'Please provide a rating'],
//       min: 1,
//       max: 5,
//     },
//     comment: {
//       type: String,
//       required: [true, 'Please provide a review comment'],
//     },
//   },
//   { timestamps: true }
// );

// const Review = mongoose.model('Review', reviewSchema);

// module.exports = Review;
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    rating: {
      type: Number,
      required: [true, 'Please provide a rating'],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, 'Please provide a review comment'],
    },
    // ⚡ NAYE FEATURES (ADMIN CONTROLS) YAHAN ADD KIYE HAIN ⚡
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending', // Default Pending rahega jab tak admin approve na kare
    },
    isFeatured: {
      type: Boolean,
      default: false, // Ise 'true' karne par hi ye Homepage slider par aayega
    }
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
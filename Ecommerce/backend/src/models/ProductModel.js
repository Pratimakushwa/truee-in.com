// // models/ProductModel.js ke andar apna schema is tarah update karein:
// const mongoose = require('mongoose');
// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true }, // Short description ke liye use kar sakte hain
//     brand: { type: String },
//     category: { type: String },
//     price: { type: Number, required: true },
//     discountPrice: { type: Number, default: 0 },
//     stock: { type: Number, default: 1 },
//     isActive: { type: Boolean, default: true },
//     seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     images: [{ public_id: String, url: String }],
//     variants: [{ color: String, size: String, stock: Number, price: Number, images: [{ public_id: String, url: String }] }],
//     flashDeal: { isActive: Boolean, dealPrice: Number, startTime: Date, endTime: Date },
    
//     // ⚡ NAYE PREMIUM FIELDS ⚡
// // Models/Product.js mein isse update karo:
// techSpecs: [{ 
//   category: String, 
//   description: String, // Purane data ke liye
//   details: [String]    // Naye Array data ke liye
// }], 
//    lifestyleFeatures: [{ title: String, description: String, imageUrl: String }], // e.g., [{ title: 'Waterproof', description: '...', imageUrl: '...' }]
//     highlights: [{ iconName: String, title: String }], // e.g., [{ iconName: 'Battery', title: '24-hour battery' }]
//     promotionalVideo: { url: String, thumbnailUrl: String }, 
//     inTheBox: [String], // e.g., ['Speaker', 'Charging Base', 'Cable']

//     boughtTogether: [{ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Product' 
//     }],
    
// }, { timestamps: true });
// module.exports = mongoose.model('Product', productSchema);

// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true }, 
//     brand: { type: String },
//     category: { type: String },
//     price: { type: Number, required: true },
//     discountPrice: { type: Number, default: 0 },
    
//     // ⚡ FIX: Main stock ab String (Text) hai
//     stock: { type: String, default: 'Available' }, 
    
//     isActive: { type: Boolean, default: true },
//     seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     images: [{ public_id: String, url: String }],
    
//     // ⚡ FIX: Variants ke andar ka stock bhi ab String (Text) hai
//     variants: [{ 
//         color: String, 
//         size: String, 
//         stock: String, 
//         price: Number, 
//         images: [{ public_id: String, url: String }] 
//     }],
    
//     flashDeal: { isActive: Boolean, dealPrice: Number, startTime: Date, endTime: Date },
    
//     techSpecs: [{ 
//       category: String, 
//       description: String, 
//       details: [String]    
//     }], 
//     lifestyleFeatures: [{ title: String, description: String, imageUrl: String }], 
//     highlights: [{ iconName: String, title: String }], 
//     promotionalVideo: { url: String, thumbnailUrl: String }, 
//     inTheBox: [String], 

//     boughtTogether: [{ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Product' 
//     }],
    
// }, { timestamps: true });

// module.exports = mongoose.model('Product', productSchema);

// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true }, 
//     brand: { type: String },
//     category: { type: String },
//     price: { type: Number, required: true },
//     discountPrice: { type: Number, default: 0 },
    
//     // ⚡ FIX: Main stock ab String (Text) hai
//     stock: { type: String, default: 'Available' }, 
    
//     isActive: { type: Boolean, default: true },
//     seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     images: [{ public_id: String, url: String }],
    
//     // ⚡ FIX: Variants ke andar ka stock bhi ab String (Text) hai
//     variants: [{ 
//         color: String, 
//         size: String, 
//         stock: String, 
//         price: Number, 
//         images: [{ public_id: String, url: String }] 
//     }],
    
//     flashDeal: { isActive: Boolean, dealPrice: Number, startTime: Date, endTime: Date },
    
//     techSpecs: [{ 
//       category: String, 
//       description: String, 
//       details: [String]    
//     }], 
//     lifestyleFeatures: [{ title: String, description: String, imageUrl: String }], 
//     highlights: [{ iconName: String, title: String }], 
//     promotionalVideo: { url: String, thumbnailUrl: String }, 
//     inTheBox: [String], 

//     boughtTogether: [{ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Product' 
//     }],
    
// }, { timestamps: true });

// // ⚡ FIX: Yahan par overwrite model error solve kiya hai ⚡
// module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);

// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true }, 
//     brand: { type: String },
//     category: { type: String },
//     price: { type: Number, required: true },
//     discountPrice: { type: Number, default: 0 },
    
//     // Main stock as String (Text)
//     stock: { type: String, default: 'Available' }, 
    
//     isActive: { type: Boolean, default: true },
//     seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     images: [{ public_id: String, url: String }],
    
//     // Variants stock as String (Text)
//     variants: [{ 
//         color: String, 
//         size: String, 
//         stock: String, 
//         price: Number, 
//         images: [{ public_id: String, url: String }] 
//     }],
    
//     flashDeal: { 
//         isActive: Boolean, 
//         dealPrice: Number, 
//         startTime: Date, 
//         endTime: Date 
//     },
    
//     techSpecs: [{ 
//       category: String, 
//       description: String, 
//       details: [String]    
//     }], 
    
//     lifestyleFeatures: [{ 
//         title: String, 
//         description: String, 
//         imageUrl: String 
//     }], 
    
//     highlights: [{ 
//         iconName: String, 
//         title: String 
//     }], 
    
//     // ⚡ FIX: Promotional Video fields (matching Controller)
//     promotionalVideo: { 
//         videoUrl: { type: String, default: '' }, 
//         thumbnailUrl: { type: String, default: '' } 
//     }, 
    
//     inTheBox: [String], 

//     boughtTogether: [{ 
//       type: mongoose.Schema.Types.ObjectId, 
//       ref: 'Product' 
//     }],
    
// }, { timestamps: true });

// // Check if model already exists to avoid OverwriteModelError
// module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }, 
    brand: { type: String },
    category: { type: String },
    
    // ⚡ CHANGE: Yahan se required: true hata diya hai
    price: { type: Number }, 
    
    discountPrice: { type: Number, default: 0 },
    
    // Main stock as String (Text)
    stock: { type: String, default: 'Available' }, 
    
    isActive: { type: Boolean, default: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    images: [{ public_id: String, url: String }],
    
    // Variants stock as String (Text)
    variants: [{ 
        color: String, 
        size: String, 
        stock: String, 
        price: Number, 
        images: [{ public_id: String, url: String }] 
    }],
    
    flashDeal: { 
        isActive: Boolean, 
        dealPrice: Number, 
        startTime: Date, 
        endTime: Date 
    },
    
    techSpecs: [{ 
      category: String, 
      description: String, 
      details: [String]    
    }], 
    
    lifestyleFeatures: [{ 
        title: String, 
        description: String, 
        imageUrl: String 
    }], 
    
    highlights: [{ 
        iconName: String, 
        title: String 
    }], 
    
    // ⚡ FIX: Promotional Video fields (matching Controller)
    promotionalVideo: { 
        videoUrl: { type: String, default: '' }, 
        thumbnailUrl: { type: String, default: '' } 
    }, 
    
    inTheBox: [String], 

    boughtTogether: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product' 
    }],
    
}, { timestamps: true });

// Check if model already exists to avoid OverwriteModelError
module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
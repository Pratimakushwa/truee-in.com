
// require('dotenv').config();

// const app = require("./src/app"); 
// const { connectDb } = require("./src/config/db");
// const dns = require('dns');

// // ⚡ Routes Import
// const couponRoutes = require('./src/routes/couponRoutes');
// const orderRoutes = require('./src/routes/orderRoutes'); 
// const wishlistRoutes = require('./src/routes/wishlistRoutes'); 
// const legalRoutes = require('./src/routes/legalRoutes');
// const contactRoutes = require('./src/routes/contactRoutes');
// const reviewRoutes = require('./src/routes/reviewRoutes'); // ⚡ YE ADD KARO

// // Upar jahan saare routes import hote hain wahan ye likho:
// const newsletterRoutes = require('./src/routes/newsletterRoute');
// // DNS configuration
// dns.setServers(['8.8.8.8', '8.8.4.4']);

// // Database connection
// connectDb();

// const PORT = process.env.PORT || 8080;

// // ==========================================
// // ⚡ ROUTES LINK (Sare routes yahan ek saath)
// // ==========================================
// app.use('/api/orders', orderRoutes);
// app.use('/api/wishlist', wishlistRoutes);
// app.use('/api/legal', legalRoutes);
// app.use('/api/v1/contact', contactRoutes);
// app.use('/api/coupons', couponRoutes);
// app.use('/api/reviews', reviewRoutes);
// app.use('/api/newsletter', newsletterRoutes);

// app.use((err, req, res, next) => {
//     // Isse humein terminal mein exact error dikhega
//     console.log("Backend Error received:", err); 
    
//     const statusCode = err.statusCode || 500;
//     const message = err.message || 'Something went wrong';

//     res.status(statusCode).json({
//         success: false,
//         message: message // Yahi message tumhare Toast mein jayega
//     });
// });

// // SERVER START
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}...`);
// });

// require('dotenv').config();

// const app = require("./src/app"); 
// const { connectDb } = require("./src/config/db");
// const dns = require('dns');

// // ⚡ Bloom Filter & Models Import
// const { emailFilter, couponFilter, productFilter } = require('./src/utils/bloomFilter');
// const User = require('./src/models/userModel');
// const Coupon = require('./src/models/Coupon');
// const Product = require('./src/models/ProductModel'); // ⚡ Naya Product Model Import

// // ⚡ Routes Import
// const couponRoutes = require('./src/routes/couponRoutes');
// const orderRoutes = require('./src/routes/orderRoutes'); 
// const wishlistRoutes = require('./src/routes/wishlistRoutes'); 
// const legalRoutes = require('./src/routes/legalRoutes');
// const contactRoutes = require('./src/routes/contactRoutes');
// const reviewRoutes = require('./src/routes/reviewRoutes'); 
// const newsletterRoutes = require('./src/routes/newsletterRoute');

// // DNS configuration
// dns.setServers(['8.8.8.8', '8.8.4.4']);

// // Database connection
// connectDb();

// // ==========================================
// // ⚡ BLOOM FILTER LOADER FUNCTIONS
// // ==========================================
// const loadEmailsToBloomFilter = async () => {
//     try {
//         const users = await User.find({}, 'email'); 
//         users.forEach(user => {
//             if (user.email) {
//                 emailFilter.add(user.email);
//             }
//         });
//         console.log(`✅ Email Bloom Filter Ready: ${users.length} emails loaded!`);
//     } catch (error) {
//         console.error("Bloom Filter email loading error:", error);
//     }
// };

// const loadCouponsToBloomFilter = async () => {
//     try {
//         const coupons = await Coupon.find({ status: 'Active' }, 'code'); 
//         coupons.forEach(coupon => {
//             if (coupon.code) {
//                 couponFilter.add(coupon.code.trim().toUpperCase());
//             }
//         });
//         console.log(`✅ Coupon Bloom Filter Ready: ${coupons.length} active coupons loaded!`);
//     } catch (error) {
//         console.error("Coupon Bloom Filter loading error:", error);
//     }
// };

// // ⚡ NAYA: Product IDs Load karne ka function
// const loadProductsToBloomFilter = async () => {
//     try {
//         const products = await Product.find({}, '_id'); 
//         products.forEach(product => {
//             if (product._id) {
//                 productFilter.add(product._id.toString());
//             }
//         });
//         console.log(`✅ Product Bloom Filter Ready: ${products.length} products loaded!`);
//     } catch (error) {
//         console.error("Product Bloom Filter loading error:", error);
//     }
// };

// // ⚡ Server start hote hi ab TEENO filters load honge
// loadEmailsToBloomFilter();
// loadCouponsToBloomFilter();
// loadProductsToBloomFilter(); 

// const PORT = process.env.PORT || 8080;

// // ==========================================
// // ⚡ ROUTES LINK (Sare routes yahan ek saath)
// // ==========================================
// app.use('/api/orders', orderRoutes);
// app.use('/api/wishlist', wishlistRoutes);
// app.use('/api/legal', legalRoutes);
// app.use('/api/v1/contact', contactRoutes);
// app.use('/api/coupons', couponRoutes);
// app.use('/api/reviews', reviewRoutes);
// app.use('/api/newsletter', newsletterRoutes);

// app.use((err, req, res, next) => {
//     console.log("Backend Error received:", err); 
    
//     const statusCode = err.statusCode || 500;
//     const message = err.message || 'Something went wrong';

//     res.status(statusCode).json({
//         success: false,
//         message: message 
//     });
// });

// // SERVER START
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}...`);
// });

require('dotenv').config();

const app = require("./src/app"); 
const { connectDb } = require("./src/config/db");
const { connectRedis } = require('./src/config/redisClient'); // ⚡ NAYA: Redis Import
const dns = require('dns');

// ⚡ Bloom Filter & Models Import
const { emailFilter, couponFilter, productFilter } = require('./src/utils/bloomFilter');
const User = require('./src/models/userModel');
const Coupon = require('./src/models/Coupon');
const Product = require('./src/models/ProductModel'); 

// ⚡ Routes Import
const couponRoutes = require('./src/routes/couponRoutes');
const orderRoutes = require('./src/routes/orderRoutes'); 
const wishlistRoutes = require('./src/routes/wishlistRoutes'); 
const legalRoutes = require('./src/routes/legalRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes'); 
const newsletterRoutes = require('./src/routes/newsletterRoute');

// DNS configuration
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Database aur Redis connection
connectDb();
connectRedis(); // ⚡ NAYA: Redis Database Connection Call

// ==========================================
// ⚡ BLOOM FILTER LOADER FUNCTIONS
// ==========================================
const loadEmailsToBloomFilter = async () => {
    try {
        const users = await User.find({}, 'email'); 
        users.forEach(user => {
            if (user.email) {
                emailFilter.add(user.email);
            }
        });
        console.log(`✅ Email Bloom Filter Ready: ${users.length} emails loaded!`);
    } catch (error) {
        console.error("Bloom Filter email loading error:", error);
    }
};

const loadCouponsToBloomFilter = async () => {
    try {
        const coupons = await Coupon.find({ status: 'Active' }, 'code'); 
        coupons.forEach(coupon => {
            if (coupon.code) {
                couponFilter.add(coupon.code.trim().toUpperCase());
            }
        });
        console.log(`✅ Coupon Bloom Filter Ready: ${coupons.length} active coupons loaded!`);
    } catch (error) {
        console.error("Coupon Bloom Filter loading error:", error);
    }
};

const loadProductsToBloomFilter = async () => {
    try {
        const products = await Product.find({}, '_id'); 
        products.forEach(product => {
            if (product._id) {
                productFilter.add(product._id.toString());
            }
        });
        console.log(`✅ Product Bloom Filter Ready: ${products.length} products loaded!`);
    } catch (error) {
        console.error("Product Bloom Filter loading error:", error);
    }
};

// ⚡ Server start hote hi ab TEENO filters load honge
loadEmailsToBloomFilter();
loadCouponsToBloomFilter();
loadProductsToBloomFilter(); 

const PORT = process.env.PORT || 8080;

// ==========================================
// ⚡ ROUTES LINK (Sare routes yahan ek saath)
// ==========================================
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/legal', legalRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/newsletter', newsletterRoutes);

app.use((err, req, res, next) => {
    console.log("Backend Error received:", err); 
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';

    res.status(statusCode).json({
        success: false,
        message: message 
    });
});

// SERVER START
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});

require('dotenv').config();

const app = require("./src/app"); 
const { connectDb } = require("./src/config/db");
const dns = require('dns');

// ⚡ Routes Import
const couponRoutes = require('./src/routes/couponRoutes');
const orderRoutes = require('./src/routes/orderRoutes'); 
const wishlistRoutes = require('./src/routes/wishlistRoutes'); 
const legalRoutes = require('./src/routes/legalRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes'); // ⚡ YE ADD KARO

// Upar jahan saare routes import hote hain wahan ye likho:
const newsletterRoutes = require('./src/routes/newsletterRoute');
// DNS configuration
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Database connection
connectDb();

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
    // Isse humein terminal mein exact error dikhega
    console.log("Backend Error received:", err); 
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';

    res.status(statusCode).json({
        success: false,
        message: message // Yahi message tumhare Toast mein jayega
    });
});

// SERVER START
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
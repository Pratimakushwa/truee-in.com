// require('dotenv').config();


// const app = require("./src/app");
// const { connectDb } = require("./src/config/db");
// const dns = require('dns');
// dns.setServers(['8.8.8.8', '8.8.4.4']);

// connectDb();
// const PORT = process.env.PORT;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}...`);
// });


// app.use((err, req, res, next) => {
//     console.error('GLOBAL ERROR HANDLER: ', err);
//     res.status(500).json({
//         success: false,
//         message: 'something is wrong'
//     });
// });

// require('dotenv').config();

// const express = require('express');
// const app = require("./src/app"); // Assuming app.js handles express initialization
// const { connectDb } = require("./src/config/db");
// const dns = require('dns');

// // ⚡ FIX: Yahan maine 'orderRoutes' kar diya hai (s laga diya hai)
// const orderRoutes = require('./src/routes/orderRoutes'); 

// // DNS configuration
// dns.setServers(['8.8.8.8', '8.8.4.4']);

// // Database connection
// connectDb();

// const PORT = process.env.PORT || 3000;

// // ⚡ MIDDLEWARE: Routes yahan link honge
// app.use('/api/orders', orderRoutes);

// // ⚡ GLOBAL ERROR HANDLER: Ye app.listen() ke upar hona chahiye
// app.use((err, req, res, next) => {
//     console.error('GLOBAL ERROR HANDLER: ', err);
//     res.status(500).json({
//         success: false,
//         message: 'Something is wrong on the server side.'
//     });
// });

// // Server start
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}...`);
// });

// require('dotenv').config();

// const express = require('express');
// const app = require("./src/app"); // Assuming app.js handles express initialization
// const { connectDb } = require("./src/config/db");
// const dns = require('dns');

// // ⚡ FIX: Yahan maine 'orderRoutes' kar diya hai (s laga diya hai)
// const orderRoutes = require('./src/routes/orderRoutes'); 

// // ⚡ NAYA FIX: Wishlist ka route yahan import karo 👇
// const wishlistRoutes = require('./src/routes/wishlistRoutes'); 

// // DNS configuration
// dns.setServers(['8.8.8.8', '8.8.4.4']);

// // Database connection
// connectDb();

// const PORT = process.env.PORT || 3000;

// // ⚡ MIDDLEWARE: Routes yahan link honge
// app.use('/api/orders', orderRoutes);

// // ⚡ NAYA FIX: Wishlist ko API se link karo 👇
// app.use('/api/wishlist', wishlistRoutes);

// // ⚡ GLOBAL ERROR HANDLER: Ye app.listen() ke upar hona chahiye
// app.use((err, req, res, next) => {
//     console.error('GLOBAL ERROR HANDLER: ', err);
//     res.status(500).json({
//         success: false,
//         message: 'Something is wrong on the server side.'
//     });
// });

// // Server start
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}...`);
// });

// require('dotenv').config();

// const app = require("./src/app"); 
// const { connectDb } = require("./src/config/db");
// const dns = require('dns');

// // ⚡ Routes Import
// const orderRoutes = require('./src/routes/orderRoutes'); 
// const wishlistRoutes = require('./src/routes/wishlistRoutes'); 

// // DNS configuration
// dns.setServers(['8.8.8.8', '8.8.4.4']);

// // Database connection
// connectDb();

// const PORT = process.env.PORT || 3000;

// // ⚡ Routes Link 
// app.use('/api/orders', orderRoutes);
// app.use('/api/wishlist', wishlistRoutes);

// // ⚡ GLOBAL ERROR HANDLER
// app.use((err, req, res, next) => {
//     console.error('GLOBAL ERROR HANDLER: ', err);
//     res.status(500).json({
//         success: false,
//         message: 'Something is wrong on the server side.'
//     });
// });

// // Server start
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}...`);
// });

require('dotenv').config();

const app = require("./src/app"); 
const { connectDb } = require("./src/config/db");
const dns = require('dns');

// ⚡ Routes Import
const orderRoutes = require('./src/routes/orderRoutes'); 
const wishlistRoutes = require('./src/routes/wishlistRoutes'); 

// DNS configuration (Database connection stable rakhne ke liye)
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Database connection
connectDb();

// Port setup (Tumhare pichle logs me port 8080 chal raha tha, toh env file se wo khud pick kar lega)
const PORT = process.env.PORT || 8080;

// ==========================================
// ⚡ ROUTES LINK
// ==========================================
// Yahan dhyan do: Sirf orderRoutes call ho raha hai, koi admin restriction nahi hai (Sahi setup)
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);


// ==========================================
// ⚡ GLOBAL ERROR HANDLER
// ==========================================
app.use((err, req, res, next) => {
    console.error('GLOBAL ERROR HANDLER: ', err);
    res.status(500).json({
        success: false,
        message: 'Something is wrong on the server side.'
    });
});

// ==========================================
// SERVER START
// ==========================================
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
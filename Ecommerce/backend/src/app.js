// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const errorMiddleware = require("./middleware/errorMiddleware");
// const app = express();


// app.use(cors({
//   origin: process.env.VITE_FRONTEND_URL, // Replace with your frontend domain
//   credentials: true // Allow cookies to be sent
// }));
// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/company", require("./routes/companyRoutes"));
// app.use("/api/auth",    require("./routes/authRoutes"));
// app.use("/api/Superadmin",   require("./routes/superAdminRoutes"));
// app.use("/api/products", require("./routes/productRoutes"));
// app.use("/api/reviews",  require("./routes/reviewRoutes"));
// app.use("/api/admin",    require("./routes/adminRoutes"));
// app.use("/api/cart",     require("./routes/addTocartRoutes"));
// app.use("/api/orders",   require("./routes/orderRoutes"));
// app.use("/api/history",  require("./routes/historyRoutes"));
// app.use("/api/home",  require("./routes/homeroutes"));
// app.use("/api/theme",  require("./routes/ThemeRoutes"));

// // Baaki app.use() ke sath isko daal dein
// app.use('/api/payment', require('./routes/paymentRoutes'));

// app.use(errorMiddleware);

// module.exports = app;

// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const errorMiddleware = require("./middleware/errorMiddleware");
// const app = express();

// app.use(cors({
//   origin: process.env.VITE_FRONTEND_URL, // Replace with your frontend domain
//   credentials: true // Allow cookies to be sent
// }));
// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/company", require("./routes/companyRoutes"));
// app.use("/api/auth",    require("./routes/authRoutes"));
// app.use("/api/Superadmin",   require("./routes/superAdminRoutes"));
// app.use("/api/products", require("./routes/productRoutes"));
// app.use("/api/reviews",  require("./routes/reviewRoutes"));
// app.use("/api/admin",    require("./routes/adminRoutes"));
// app.use("/api/cart",     require("./routes/addTocartRoutes"));
// app.use("/api/orders",   require("./routes/orderRoutes"));
// app.use("/api/history",  require("./routes/historyRoutes"));
// app.use("/api/home",  require("./routes/homeroutes"));
// app.use("/api/theme",  require("./routes/ThemeRoutes"));

// // ⚡ WISHLIST ROUTE ADD KIYA HAI YAHAN 👇
// app.use("/api/wishlist", require("./routes/wishlistRoutes"));

// app.use('/api/payment', require('./routes/paymentRoutes'));

// app.use(errorMiddleware);

// module.exports = app;

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/errorMiddleware");
const app = express();

app.use(cors({
  origin: process.env.VITE_FRONTEND_URL, // Replace with your frontend domain
  credentials: true // Allow cookies to be sent
}));
app.use(express.json());
app.use(cookieParser());

// ==========================================
// ⚡ ROUTES
// ==========================================
app.use("/api/company",    require("./routes/companyRoutes"));
app.use("/api/auth",       require("./routes/authRoutes"));
app.use("/api/Superadmin", require("./routes/superAdminRoutes"));
app.use("/api/products",   require("./routes/productRoutes"));
app.use("/api/reviews",    require("./routes/reviewRoutes"));
app.use("/api/admin",      require("./routes/adminRoutes"));
app.use("/api/cart",       require("./routes/addTocartRoutes"));
app.use("/api/orders",     require("./routes/orderRoutes"));
app.use("/api/history",    require("./routes/historyRoutes"));
app.use("/api/home",       require("./routes/homeroutes"));
app.use("/api/theme",      require("./routes/ThemeRoutes"));
app.use("/api/wishlist",   require("./routes/wishlistRoutes"));
app.use("/api/payment",    require("./routes/paymentRoutes"));
app.use("/api/legal",      require("./routes/legalRoutes"));
app.use("/api/v1/legal",   require("./routes/legalRoutes"));

// ⚡ COUPON ROUTE YAHAN ADD HO GAYA HAI 👇
app.use("/api/coupons",    require("./routes/couponRoutes"));

// ⚡ REWARD & WALLET ROUTES
app.use("/api/rewards",    require("./routes/rewardRoutes"));
app.use("/api/wallet",     require("./routes/walletRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/admin/rewards", require("./routes/adminRewardRoutes"));

// Initialize default reward settings on boot
const { ensureDefaultSettings } = require("./services/rewardConfigService");
ensureDefaultSettings().catch((err) => console.error("Reward settings init:", err.message));

// ==========================================
// ⚡ GLOBAL ERROR HANDLER
// ==========================================
app.use(errorMiddleware);

module.exports = app;
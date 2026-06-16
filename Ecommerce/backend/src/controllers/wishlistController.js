const User = require('../models/userModel');

// 1. Star click hone par Add/Remove (Toggle) karne ke liye
exports.toggleWishlist = async (req, res) => {
  try {
    const userId = req.user._id; // User ki ID token se aayegi
    const { productId } = req.body; // Product ki ID frontend se aayegi

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Check karte hain ki product pehle se wishlist mein hai ya nahi
    const isLiked = user.wishlist.includes(productId);

    if (isLiked) {
      user.wishlist.pull(productId); // Pehle se hai toh Remove karo
    } else {
      user.wishlist.push(productId); // Nahi hai toh Add karo
    }

    await user.save();
    res.status(200).json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. User ka wishlist page load hone par saare products bhejne ke liye
exports.getWishlist = async (req, res) => {
  try {
    // populate('wishlist') se un IDs ki jagah poori product detail aa jayegi
    const user = await User.findById(req.user._id).populate('wishlist');
    res.status(200).json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// const User=require('../models/userModel')
// // @desc    Get logged in user profile
// // @route   GET /api/users/profile
// // @access  Private
// const getUserProfile = async (req, res) => {
//   try {
//     // req.user._id auth middleware se aayega
//     const user = await User.findById(req.user._id).select('-password'); // password nahi bhejna

//     if (user) {
//       res.json({
//         success: true,
//         user: {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           phone: user.phone || '',
//           address: user.address || {},
//           role: user.role,
//         }
//       });
//     } else {
//       res.status(404).json({ success: false, message: 'User not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Server Error' });
//   }
// };

// // @desc    Update user profile
// // @route   PUT /api/users/profile
// // @access  Private
// const updateUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (user) {
//       // Jo fields frontend se aayengi, unko update karenge
//       user.name = req.body.name || user.name;
//       user.email = req.body.email || user.email;
//       user.phone = req.body.phone || user.phone;
      
//       // Agar address bheja hai toh update karein
//       if (req.body.address) {
//         user.address = req.body.address; 
//       }

//       // Agar naya password bheja hai toh usko update karein (Model me pre-save hash hona chahiye)
//       if (req.body.password) {
//         user.password = req.body.password;
//       }

//       const updatedUser = await user.save();

//       res.json({
//         success: true,
//         message: 'Profile updated successfully',
//         user: {
//           _id: updatedUser._id,
//           name: updatedUser.name,
//           email: updatedUser.email,
//           phone: updatedUser.phone,
//           address: updatedUser.address,
//           role: updatedUser.role,
//         }
//       });
//     } else {
//       res.status(404).json({ success: false, message: 'User not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Server Error' });
//   }
// };

// module.exports = {
//   getUserProfile,
//   updateUserProfile
// };
const User = require('../models/userModel'); // Make sure path is correct

// @desc    Get logged in user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    // req.user._id auth middleware se aayega (check req.user.id if _id is undefined)
    const userId = req.user._id || req.user.id;
    const user = await User.findById(userId).select('-password'); 

    if (user) {
      res.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone || '',
          gender: user.gender || 'Female', // ⚡ FIX: Gender add kiya
          addresses: user.addresses || [], // ⚡ FIX: 'address' ko 'addresses' (Array) kar diya
          role: user.role,
        }
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Update user profile (Profile Info & Manage Addresses se call hota hai)
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const user = await User.findById(userId);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.gender = req.body.gender || user.gender; // ⚡ FIX: Gender update ke liye
      
      // ⚡ FIX: 'address' ki jagah 'addresses' (Array) update karega
      if (req.body.addresses) {
        user.addresses = req.body.addresses; 
      }

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        success: true,
        message: 'Profile updated successfully',
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          phone: updatedUser.phone,
          gender: updatedUser.gender,
          addresses: updatedUser.addresses, // ⚡ FIX: Send updated array
          role: updatedUser.role,
        }
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// ⚡ FIX: NAYA FUNCTION - Checkout page se direct naya address save karne ke liye
// @desc    Add new address
// @route   POST /api/auth/address
// @access  Private
const addAddress = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Checkout page se aane wala data directly array mein push kar denge
    user.addresses.push(req.body); 
    await user.save();

    res.status(200).json({ 
      success: true, 
      message: 'Address saved successfully for future use', 
      addresses: user.addresses 
    });
  } catch (error) {
    console.error("Add Address Error:", error);
    res.status(500).json({ success: false, message: 'Server error while saving address' });
  }
};

// Teeno functions export kar do
module.exports = {
  getUserProfile,
  updateUserProfile,
  addAddress // ⚡ FIX: Isko export karna bahut zaroori tha
};
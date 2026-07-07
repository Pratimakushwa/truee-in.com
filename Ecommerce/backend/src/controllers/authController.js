

const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const Coupon = require('../models/Coupon'); // ⚡ Master Coupon Database Import kiya
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/expressError');

// ⚡ FORGOT PASSWORD KE LIYE NAYE IMPORTS
const otpGenerator = require('otp-generator');
const sendEmail = require('../utils/sendEmail');

// --- HELPER: VERIFY GOOGLE RECAPTCHA ---
const verifyGoogleRecaptcha = async (token) => {
  if (!token) return false;
  
  const secretKey = process.env.GOOGLE_RECAPTCHA_SECRET;
  const verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
  
  const formData = new URLSearchParams();
  formData.append('secret', secretKey);
  formData.append('response', token);

  try {
    const response = await fetch(verifyUrl, {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    
    const data = await response.json();
    return data.success; 
  } catch (err) {
    console.error('reCAPTCHA verification error:', err);
    return false;
  }
};


// --- LOGIN FUNCTION ---
exports.login = wrapAsync(async (req, res) => {
  const { email, password, captchaToken } = req.body;

  if (!email || !password) {
    throw new ExpressError(400, 'Email and password are required.');
  }

  // --- CAPTCHA VERIFICATION START ---
  if (!captchaToken) {
    throw new ExpressError(400, 'Security captcha token is missing.');
  }
  
  const isCaptchaValid = await verifyGoogleRecaptcha(captchaToken);
  if (!isCaptchaValid) {
    throw new ExpressError(400, 'reCAPTCHA verification failed. Are you a bot?');
  }
  // --- CAPTCHA VERIFICATION END ---

  const user = await User.findOne({ email });
  if (!user) {
    throw new ExpressError(404, 'User not found.');
  }

  if (!user.isActive) {
    throw new ExpressError(403, 'This account has been suspended.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ExpressError(400, 'Invalid credentials.');
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '1d' }
  );

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24,
    path: '/'
  };
  res.cookie('token', token, cookieOptions);
  console.log('✅ Token cookie set:', { userId: user._id, role: user.role });

  const guestId = req.headers['x-guest-id'];
  if (guestId) {
    const guestCart = await Cart.findOne({ guestId: guestId });
    if (guestCart) {
      const userCart = await Cart.findOne({ user: user._id });
      
      if (userCart) {
        userCart.items.push(...guestCart.items);
        await userCart.save();
        await Cart.findByIdAndDelete(guestCart._id);
      } else {
        guestCart.guestId = null;
        guestCart.user = user._id;
        await guestCart.save();
      }
    }
  }

  res.status(200).json({
    success: true,
    token: token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isFirstLogin: user.isFirstLogin
    }
  });
});

// --- GET USER PROFILE FUNCTION ---
exports.getProfile = wrapAsync(async (req, res) => {
    const userId = req.user?.id || req.user?._id;
    const user = await User.findById(userId);
    
    if (!user) {
        throw new ExpressError(404, 'User not found.');
    }
    
    res.status(200).json({
        success: true,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            addresses: user.addresses || [],
            coupons: user.coupons || [] 
        }
    });
});

// --- CUSTOMER REGISTRATION FUNCTION (DYNAMIC ADMIN LOGIC) ---
exports.registerCustomer = wrapAsync(async (req, res) => {
  const { name, email, password, phone, captchaToken } = req.body;

  if (!name || !email || !password) {
    throw new ExpressError(400, 'Name, email, and password are required.');
  }

  // --- CAPTCHA VERIFICATION START ---
  if (!captchaToken) {
    throw new ExpressError(400, 'Security captcha token is missing.');
  }
  
  const isCaptchaValid = await verifyGoogleRecaptcha(captchaToken);
  if (!isCaptchaValid) {
    throw new ExpressError(400, 'reCAPTCHA verification failed. Are you a bot?');
  }
  // --- CAPTCHA VERIFICATION END ---

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ExpressError(400, 'Email is already registered.');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // ⚡ DYNAMIC LOOKUP: Check if Admin created WELCOME500 or any First Order coupon
  let assignedCode = 'WELCOME500'; // Default fallback
  try {
    const adminCoupon = await Coupon.findOne({
      $or: [{ code: 'WELCOME500' }, { isFirstOrderOnly: true }],
      status: 'Active'
    });
    if (adminCoupon) {
      assignedCode = adminCoupon.code; 
    }
  } catch (err) {
    console.error("Admin coupon fetch failed, using default fallback:", err);
  }

  // ⚡ ASSIGNING THE DYNAMIC COUPON OBJECT
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    phone,
    role: 'customer',           
    isFirstLogin: false,
    coupons: [{ code: assignedCode, status: 'Available' }] 
  });
  await newUser.save();

  // --- GUEST CART MERGE LOGIC START ---
  const guestId = req.headers['x-guest-id'];
  if (guestId) {
    const guestCart = await Cart.findOne({ guestId: guestId });
    if (guestCart) {
      guestCart.guestId = null;
      guestCart.user = newUser._id;
      await guestCart.save();
    }
  }
  // --- GUEST CART MERGE LOGIC END ---

  const token = jwt.sign(
    { id: newUser._id, role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '1d' }
  );

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24,
    path: '/'
  };
  res.cookie('token', token, cookieOptions);

  res.status(201).json({
    success: true,
    message: 'Registration successful! Welcome gift added.',
    token: token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      coupons: newUser.coupons 
    }
  });
});

// --- FORCE PASSWORD UPDATE FUNCTION ---
exports.updateFirstPassword = wrapAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
    
  if (!currentPassword || !newPassword) {
    throw new ExpressError(400, 'Current password and new password are required.');
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    throw new ExpressError(404, 'User not found.');
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new ExpressError(400, 'Current password is incorrect.');
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  user.isFirstLogin = false;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password successfully updated. You may now access the dashboard.'
  });
});

// --- LOGOUT FUNCTION ---
exports.logout = wrapAsync(async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'User logged out successfully'
  });
});

// ========================================================
// ⚡ NEW FORGOT PASSWORD APIS ADDED BELOW
// ========================================================

// --- FORGOT PASSWORD - GENERATE & SEND OTP ---
// --- FORGOT PASSWORD - GENERATE & SEND PREMIUM OTP ---
// --- FORGOT PASSWORD - GENERATE & SEND PREMIUM OTP ---
// --- FORGOT PASSWORD - GENERATE & SEND PREMIUM OTP ---
exports.forgotPassword = wrapAsync(async (req, res) => {
  const { email } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) {
    throw new ExpressError(404, 'Email Not Registered');
  }

  const otp = otpGenerator.generate(6, { 
    upperCaseAlphabets: false, 
    specialChars: false, 
    lowerCaseAlphabets: false 
  });

  user.otp = otp;
  user.otpExpire = Date.now() + 10 * 60 * 1000; // 10 mins
  await user.save({ validateBeforeSave: false });

  // ⚡ PREMIUM HTML EMAIL TEMPLATE (Complete with all requirements)
  const emailHTML = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; padding: 40px 0; text-align: center; width: 100%;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.08);">
        
        <div style="background-color: #0a0a0a; padding: 40px 20px; text-align: center;">
          <img src="YAHAN_APNA_LIVE_R2_LOGO_LINK_DAALNA" alt="TRUEE" style="max-width: 140px; height: auto; display: block; margin: 0 auto;" />
          <p style="color: #888888; font-size: 12px; letter-spacing: 2px; margin-top: 15px; text-transform: uppercase;">Premium Experience</p>
        </div>
        
        <div style="padding: 45px 40px; text-align: left; color: #333333;">
          <h2 style="font-size: 24px; font-weight: 400; margin-top: 0; margin-bottom: 25px; color: #1a1a1a; letter-spacing: -0.5px;">Reset Your Password</h2>
          
          <p style="font-size: 15px; line-height: 1.6; margin-bottom: 20px; color: #444444;">Dear <strong>${user.name}</strong>,</p>
          
          <p style="font-size: 15px; line-height: 1.6; margin-bottom: 35px; color: #444444;">
            We received a request to reset the password associated with your Truee Luxury account. Please use the One-Time Password (OTP) below to proceed securely.
          </p>

          <div style="background-color: #0a0a0a; border-radius: 8px; padding: 30px; text-align: center; margin-bottom: 30px;">
            <span style="font-size: 42px; font-weight: 500; letter-spacing: 16px; color: #C8A253;">${otp}</span>
          </div>

          <p style="font-size: 14px; color: #444444; margin-bottom: 25px; font-weight: 500;">
            This OTP is valid for exactly 10 minutes.
          </p>

          <div style="background-color: #fff9e6; border-left: 4px solid #C8A253; padding: 15px 20px; margin-bottom: 25px;">
            <p style="font-size: 13px; color: #8a6d3b; margin: 0 0 8px 0; font-weight: bold;">Security Warning:</p>
            <ul style="font-size: 13px; color: #666666; margin: 0; padding-left: 20px; line-height: 1.5;">
                <li>Do not share this OTP with anyone.</li>
                <li>Truee Luxury will never ask for your OTP via phone, email, or SMS.</li>
            </ul>
          </div>

          <p style="font-size: 13px; color: #888888; line-height: 1.6; margin-bottom: 0;">
            If you did not request a password reset, please ignore this email. Your account will remain secure.
          </p>
        </div>
        
        <div style="background-color: #fafafa; border-top: 1px solid #eeeeee; padding: 30px 40px; text-align: left;">
          <h4 style="font-size: 14px; color: #1a1a1a; margin-top: 0; margin-bottom: 15px;">Need help?</h4>
          <p style="font-size: 13px; color: #666666; margin: 0 0 8px 0;">
            <strong>Email:</strong> <a href="mailto:support@trueeluxury.com" style="color: #C8A253; text-decoration: none;">support@trueeluxury.com</a>
          </p>
          <p style="font-size: 13px; color: #666666; margin: 0;">
            <strong>Phone:</strong> <a href="tel:+91XXXXXXXXXX" style="color: #C8A253; text-decoration: none;">+91-XXXXXXXXXX</a>
          </p>
        </div>

        <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
          <p style="font-size: 11px; color: #888888; margin: 0; letter-spacing: 0.5px;">&copy; ${new Date().getFullYear()} TRUEE LUXURY. ALL RIGHTS RESERVED.</p>
        </div>

      </div>
    </div>
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Action Required: Reset Your Truee Luxury Password', 
      message: `Your OTP is ${otp}`, // Plain text fallback for old clients
      html: emailHTML 
    });

    res.status(200).json({ success: true, message: `OTP sent to ${user.email}` });
  } catch (err) {
    user.otp = null;
    user.otpExpire = null;
    await user.save({ validateBeforeSave: false });
    console.error("Email send error:", err);
    throw new ExpressError(500, 'Email could not be sent');
  }
});
// --- VERIFY OTP ---
exports.verifyOTP = wrapAsync(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ExpressError(404, 'User not found');
  }

  if (user.otp !== otp) {
    throw new ExpressError(400, 'Invalid OTP');
  }
  
  if (user.otpExpire < Date.now()) {
    throw new ExpressError(400, 'OTP has expired. Please request a new one.');
  }

  res.status(200).json({ success: true, message: 'OTP Verified Successfully!' });
});

// --- RESET PASSWORD ---
exports.resetPassword = wrapAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ExpressError(404, 'User not found');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  user.password = hashedPassword;
  user.otp = null;
  user.otpExpire = null;
  
  await user.save({ validateBeforeSave: false });

  res.status(200).json({ success: true, message: 'Password Changed Successfully! You can now login.' });
});
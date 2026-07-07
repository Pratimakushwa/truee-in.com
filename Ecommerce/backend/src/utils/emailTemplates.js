// utils/emailTemplates.js

const forgotPasswordTemplate = (userName, otpCode) => {
  return `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; padding: 40px 0; text-align: center; width: 100%;">
      
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
        
        <!-- Header -->
        <div style="background-color: #0a0a0a; padding: 35px 20px; text-align: center;">
          <h1 style="color: #C8A253; margin: 0; font-family: Georgia, serif; letter-spacing: 6px; font-size: 26px; text-transform: uppercase;">TRUEE</h1>
          <p style="color: #888888; font-size: 12px; letter-spacing: 2px; margin-top: 5px; text-transform: uppercase;">Premium Experience</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 35px; text-align: left; color: #333333;">
          <h2 style="font-size: 22px; font-weight: 600; margin-top: 0; margin-bottom: 20px; color: #1a1a1a;">Reset Your Password</h2>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #444444;">Dear <strong>${userName}</strong>,</p>
          
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 35px; color: #444444;">
            We received a request to reset the password associated with your Truee Luxury account. Please use the One-Time Password (OTP) below to proceed securely.
          </p>

          <!-- VIP OTP Box -->
          <div style="background-color: #fafafa; border: 1px dashed #C8A253; border-radius: 12px; padding: 25px; text-align: center; margin-bottom: 35px;">
            <span style="font-size: 38px; font-weight: bold; letter-spacing: 14px; color: #0a0a0a;">${otpCode}</span>
          </div>

          <p style="font-size: 14px; color: #666666; margin-bottom: 15px; border-left: 3px solid #C8A253; padding-left: 10px;">
            ⏱️ For your security, this code will expire in exactly <strong>10 minutes</strong>.
          </p>
          
          <p style="font-size: 14px; color: #888888; line-height: 1.6;">
            If you did not request a password reset, please ignore this email or contact our support team immediately. Your account remains secure.
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f9f9f9; border-top: 1px solid #eeeeee; padding: 25px; text-align: center;">
          <p style="font-size: 12px; color: #999999; margin: 0 0 5px 0;">&copy; ${new Date().getFullYear()} Truee Luxury. All rights reserved.</p>
          <p style="font-size: 12px; color: #999999; margin: 0;">Need assistance? <a href="#" style="color: #C8A253; text-decoration: none;">Contact Support</a></p>
        </div>

      </div>
    </div>
  `;
};

module.exports = { forgotPasswordTemplate };
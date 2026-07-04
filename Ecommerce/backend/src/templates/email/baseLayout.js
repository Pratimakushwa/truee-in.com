const FRONTEND_URL = process.env.VITE_FRONTEND_URL || 'https://truee.in';
const BRAND_GOLD = '#C8A253';
const BRAND_DARK = '#0A0A0A';
const LOGO_URL = process.env.EMAIL_LOGO_URL || `${FRONTEND_URL}/Truee_Luxury_Logo.png`;

const baseLayout = ({ title, preheader = '', bodyContent }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  ${preheader ? `<span style="display:none;max-height:0;overflow:hidden;">${preheader}</span>` : ''}
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Inter,Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:${BRAND_DARK};padding:28px 32px;text-align:center;border-bottom:4px solid ${BRAND_GOLD};">
              <a href="${FRONTEND_URL}" style="text-decoration:none;display:inline-block;">
                <img
                  src="${LOGO_URL}"
                  alt="TRUEE — Premium Electronics"
                  width="140"
                  style="display:block;margin:0 auto;max-width:140px;height:auto;border:0;outline:none;"
                />
              </a>
              <p style="margin:12px 0 0;color:#9ca3af;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">Premium Electronics</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;color:#333;font-size:15px;line-height:1.65;">
              ${bodyContent}
            </td>
          </tr>
          <tr>
            <td style="background:#1A1A1A;padding:24px 32px;text-align:center;">
              <p style="margin:0 0 12px;color:${BRAND_GOLD};font-size:12px;font-weight:bold;">Need help?</p>
              <a href="mailto:${process.env.EMAIL_SUPPORT_FROM || 'support@truee.in'}" style="color:#fff;font-size:13px;text-decoration:none;margin:0 8px;">Support</a>
              <a href="${FRONTEND_URL}/contact" style="color:#fff;font-size:13px;text-decoration:none;margin:0 8px;">Contact</a>
              <a href="${FRONTEND_URL}" style="color:#fff;font-size:13px;text-decoration:none;margin:0 8px;">Shop</a>
              <p style="margin:16px 0 0;color:#666;font-size:11px;">
                <a href="${FRONTEND_URL}/privacy-policy" style="color:#888;text-decoration:none;">Privacy</a> ·
                <a href="${FRONTEND_URL}/terms" style="color:#888;text-decoration:none;">Terms</a> ·
                <a href="${FRONTEND_URL}/refund-policy" style="color:#888;text-decoration:none;">Returns</a>
              </p>
              <p style="margin:16px 0 0;">
                <img src="${LOGO_URL}" alt="TRUEE" width="72" style="max-width:72px;height:auto;opacity:0.85;border:0;" />
              </p>
              <p style="margin:12px 0 0;color:#555;font-size:10px;">© ${new Date().getFullYear()} TRUEE.IN — All rights reserved.</p>
              <p style="margin:8px 0 0;color:#444;font-size:10px;">This is an automated message. Please do not reply directly to this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const ctaButton = (text, href) => `
  <table cellpadding="0" cellspacing="0" style="margin:24px auto;">
    <tr>
      <td style="background:${BRAND_DARK};border-radius:8px;">
        <a href="${href}" style="display:inline-block;padding:14px 32px;color:#fff;font-weight:bold;text-decoration:none;font-size:14px;letter-spacing:1px;">${text}</a>
      </td>
    </tr>
  </table>`;

module.exports = { baseLayout, ctaButton, FRONTEND_URL, BRAND_GOLD, LOGO_URL };

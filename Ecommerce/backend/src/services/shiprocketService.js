// const axios = require('axios');

// // Shiprocket API ka Base URL
// const BASE_URL = 'https://apiv2.shiprocket.in/v1/external';

// /**
//  * 1. Shiprocket Authentication - Token lene ke liye
//  */
// const getShiprocketToken = async () => {
//   try {
//     const response = await axios.post(`${BASE_URL}/auth/login`, {
//       email: process.env.SHIPROCKET_EMAIL,
//       password: process.env.SHIPROCKET_PASSWORD,
//     });

//     console.log('✅ Shiprocket Token Successfully Generated!');
//     return response.data.token; // Ye humari chabi (token) hai
    
//   } catch (error) {
//     console.error('❌ Shiprocket Login Error:', error.response?.data || error.message);
//     throw new Error('Shiprocket authentication failed. Please check credentials in .env file.');
//   }
// };

// /**
//  * 2. Create Order in Shiprocket
//  * Ye function tumhare website ke order ko Shiprocket mein bhejega
//  */
// const createShiprocketOrder = async (orderPayload) => {
//   try {
//     // 1. Sabse pehle chabi (token) mangwao
//     const token = await getShiprocketToken();

//     // 2. Token aur Order Data Shiprocket ko bhejo
//     const response = await axios.post(`${BASE_URL}/orders/create/adhoc`, orderPayload, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}` // Token yahan use ho raha hai
//       }
//     });

//     console.log('✅ Shiprocket Order Created! ID:', response.data.order_id);
//     return response.data; 
    
//   } catch (error) {
//     console.error('❌ Shiprocket Create Order Error:', error.response?.data || error.message);
//     throw new Error('Shiprocket order creation failed.');
//   }
// };

// // Functions ko export kar rahe hain taaki baaki files isko use kar sakein
// module.exports = {
//   getShiprocketToken,
//   createShiprocketOrder,
// };

const axios = require('axios');

// Shiprocket API ka Base URL
const BASE_URL = 'https://apiv2.shiprocket.in/v1/external';

/**
 * 1. Shiprocket Authentication - Token lene ke liye
 */
const getShiprocketToken = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD,
    });

    return response.data.token; // Ye humari chabi (token) hai
    
  } catch (error) {
    console.error('❌ Shiprocket Login Error:', error.response?.data || error.message);
    throw new Error('Shiprocket authentication failed. Please check credentials in .env file.');
  }
};

/**
 * 2. Create Order in Shiprocket
 */
const createShiprocketOrder = async (orderPayload) => {
  try {
    const token = await getShiprocketToken();

    const response = await axios.post(`${BASE_URL}/orders/create/adhoc`, orderPayload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('✅ 1. Shiprocket Order Created! ID:', response.data.order_id);
    return response.data; 
    
  } catch (error) {
    console.error('❌ Shiprocket Create Order Error:', error.response?.data || error.message);
    throw new Error('Shiprocket order creation failed.');
  }
};

/**
 * 3. Generate AWB (Tracking Number) in Shiprocket
 * (Ye tumhari file mein MISSING tha!)
 */
const generateShiprocketAWB = async (shipmentId) => {
  try {
    const token = await getShiprocketToken();

    const response = await axios.post(`${BASE_URL}/courier/assign/awb`, {
      shipment_id: shipmentId
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    // Shiprocket data nested bhejta hai
    const awbData = response.data?.response?.data || response.data;
    console.log('✅ 2. Shiprocket AWB Generated! Tracking ID:', awbData.awb_code);
    return awbData;

  } catch (error) {
    console.error('❌ Shiprocket AWB Error:', error.response?.data || error.message);
    throw new Error('Shiprocket AWB generation failed.');
  }
};

/**
 * 4. Request Pickup in Shiprocket
 * (Ye bhi MISSING tha!)
 */
const requestShiprocketPickup = async (shipmentId) => {
  try {
    const token = await getShiprocketToken();

    const response = await axios.post(`${BASE_URL}/courier/generate/pickup`, {
      shipment_id: [shipmentId] // Pickup ke liye array mein bhejna padta hai
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('✅ 3. Shiprocket Pickup Requested!');
    return response.data;

  } catch (error) {
    console.error('❌ Shiprocket Pickup Error:', error.response?.data || error.message);
    throw new Error('Shiprocket pickup request failed.');
  }
};

// Sabko export karna zaroori hai taaki controller inko use kar sake
module.exports = {
  getShiprocketToken,
  createShiprocketOrder,
  generateShiprocketAWB,
  requestShiprocketPickup
};
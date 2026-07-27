const { BloomFilter } = require('bloomfilter');

// 1. Email Filter
const emailFilter = new BloomFilter(32000, 3);

// 2. Coupon Filter
const couponFilter = new BloomFilter(10000, 3);

// 3. Product Filter
const productFilter = new BloomFilter(64000, 4);

module.exports = { 
    emailFilter, 
    couponFilter, 
    productFilter 
};
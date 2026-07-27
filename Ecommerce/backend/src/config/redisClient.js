const { createClient } = require('redis');

// Redis client setup (Local ya Cloud, dono ke liye kaam karega)
const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.log('❌ Redis Client Error:', err));
redisClient.on('connect', () => console.log('✅ Redis Connected Successfully!'));

// Connect function
const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (error) {
        console.error("Redis Connection Failed:", error);
    }
};

module.exports = { redisClient, connectRedis };
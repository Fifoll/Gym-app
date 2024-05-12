export default {
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD || null,
    host: process.env.REDIS_HOST || 'localhost',
    redisTime: process.env.REDIS_TIME
}
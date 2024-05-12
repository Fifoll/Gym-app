import redis from 'redis';
import dbConfig from '../config/redis.js';

const redisClient = async () => {
    try {
        const client = redis.createClient({
            password: dbConfig.password,
            socket: {
                host: dbConfig.host,
                port: dbConfig.port
            }
        });
        await client.connect();
        return client;
    }
    catch (err) {
        console.error('Redis connection error: ', err);
    }
}

export default redisClient;

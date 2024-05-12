import redisClient from "../db/redis.js";
import dbConfig from "../config/redis.js";

export default async (userId, data) => {
    try {
        const dbClient = await redisClient();
        dbClient.set(userId.toString(), data, { EX: 60*dbConfig.redisTime });
    }
    catch(error) {
        console.log('Error in setting data to redis: ', error.message || error);
        return false;
    }
};
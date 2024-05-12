import redisClient from "../db/redis.js";

export default async (userId) => {
    try {
        const dbClient = await redisClient();
        const data = await dbClient.get(userId.toString());
        if (!data) return false;
        return data;
    }
    catch(error) {
        console.log('Error in getDataFromRedis: ', error.message || error);
        return false;
    }
};
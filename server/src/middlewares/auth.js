import jwt from 'jsonwebtoken';
import response from '../utils/response.js';
import redisGet from '../utils/getDataFromRedis.js';

export default async (req, res, next) => {
    try {
        const accessTokenInHeader = req.headers['authorization'];

        if (!accessTokenInHeader) return response(res, 401, 'Access Denied. No token provided.');

        const accessToken = accessTokenInHeader.split(' ')[1]; // get access token from header
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET); // decode access token
        const refreshToken = await redisGet(decoded.user.id); // get refresh token from redis

        if (!refreshToken) {
            return response(res, 401, 'Access Denied. No token provided.');
        }

        console.log("works");

        next();

    }
    catch (error) {
        console.error('Error in auth middleware:', error);
        return response(res, 500, 'Auth error ' + error.message || error);
    }
};
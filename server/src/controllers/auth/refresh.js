import jwt from 'jsonwebtoken';
import response from '../../utils/response.js';
import redisGet from '../../utils/getDataFromRedis.js';

const refresh = async (req, res) => {
    try {
        const refreshToken = await redisGet(req.body.id);
        if (!refreshToken) {
            return response(res, 401, 'Access Denied. No refresh token provided.');
        }

        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
            const accessToken = jwt.sign({ user: decoded.user }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return response(res, 200, 'Token refreshed', { accessToken });
        } catch (verificationError) {
            return response(res, 400, 'Invalid Token.');
        }
    } catch (error) {
        console.error('Error retrieving refresh token from Redis:', error);
        return response(res, 500, 'Internal Server Error');
    }
};

export default refresh;
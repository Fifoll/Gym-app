import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/user.js';
import response from '../../utils/response.js';
import redisSet from '../../utils/setDataToRedis.js';

const login = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ where: { email } });
        if (user) {
            const passwordCheck = await bcrypt.compare(req.body.password, user.password);
            if (passwordCheck) {
                const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
                const refreshToken = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1d' });
                await redisSet(user.id, refreshToken); // Save refresh token to Redis
                return response(res, 200, 'Login successful', { accessToken, refreshToken });
            }
        }
        response(res, 401, 'Auth failed');
    } catch (err) {
        response(res, 500, err.message);
    }
};

export default login;
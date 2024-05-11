import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/user.js';
import response from '../../utils/response.js';

const login = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({where: { email }});
        if(user) {
            const passwordCheck = await bcrypt.compare(req.body.password, user.password);
            if(passwordCheck) {
                const token = jwt.sign({email: user.email, userId: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'});
                response(res, 200, 'Auth successed', token);
                return;
            }
        }
        response(res, 401, 'Auth failed');
    } catch(err) {
        response(res, 500, err.message);
    }
};

// to do refresh token

export default login;
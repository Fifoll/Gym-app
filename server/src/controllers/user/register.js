import User from '../../models/user.js';
import bcrypt from 'bcrypt';
import response from '../../utils/response.js';

const validateData = (data) => {
    if (!data.email || !data.password) {
        throw new Error('Email and password are required');
    }
};

const checkUserExistence = async (email) => {
    return await User.findOne({ where: { email } });
};

const createUser = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({ email, password: hashedPassword });
};

const register = async (req, res) => {
    try {
        const data = req.body;
        validateData(data);

        const userExists = await checkUserExistence(data.email);

        if (!userExists) {
            await createUser(data.email, data.password);
            response(res, 201, 'User created successfully');
        } else {
            response(res, 409, `User with email ${data.email} already exists in database`);
        }
    } catch (err) {
        response(res, 500, err.message);
        console.error(err.message);
    }
};

export default register;
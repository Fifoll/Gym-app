import express from 'express';
import register from '../controllers/user/register.js';

const userRoutes = express.Router();

userRoutes.post('/register', register);


export default userRoutes;
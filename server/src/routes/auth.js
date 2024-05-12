import express from 'express';
import refresh from '../controllers/auth/refresh.js';

const authRoutes = express.Router();

authRoutes.post('/refresh', refresh);

export default authRoutes;
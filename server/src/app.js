import express from 'express';
import serverConfig from './config/server.js';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import auth from './middlewares/auth.js';

const app = express();

app.use(express.json());

app.use('/user', userRoutes);

app.use('/auth', authRoutes);

app.get('/', auth, (req, res) => {
    res.send("test");
});

app.listen(serverConfig.port, () => {
    console.log(`Server is running on http://${serverConfig.host}:${serverConfig.port}`);
});
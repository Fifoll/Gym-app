import express from 'express';
import serverConfig from './config/server.js';
import userRoutes from './routes/user.js';

const app = express();

app.use(express.json());

app.use('/user', userRoutes);

app.listen(serverConfig.port, () => {
    console.log(`Server is running on http://${serverConfig.host}:${serverConfig.port}`);
});
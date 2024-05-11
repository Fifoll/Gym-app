import express from 'express';
import serverConfig from './config/server.js';

const app = express();

app.listen(serverConfig.port, () => {
    console.log(`Server is running on http://${serverConfig.host}:${serverConfig.port}`);
});
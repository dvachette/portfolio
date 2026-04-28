import express from 'express';
import cors from 'cors';
import { config } from './config';
import { initBot } from './bot/client';
import { rateLimiter } from './middlewares/rateLimiter';
import { contactRouter } from './routes/contact';
import { projectsRouter } from './routes/projects';
import { uesRouter } from './routes/ues';


const app = express();

app.use(cors({
    origin: ['https://dvachette.fr', 'http://localhost', /^http:\/\/localhost:\d+$/],
}));
app.use(express.json());
app.use('/contact', rateLimiter);
app.use('/contact', contactRouter);
app.use('/projects', projectsRouter);
app.use('/ues', uesRouter);

async function start(): Promise<void> {
    await initBot();
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
}

start();
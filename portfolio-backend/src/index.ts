import express from 'express';
import cors from 'cors';
import { config } from './config';
import { initBot } from './bot/client';
import { rateLimiter } from './middlewares/rateLimiter';
import { contactRouter } from './routes/contact';

const app = express();

app.use(cors({
    origin: ['https://dvachette.fr', 'http://localhost', /^http:\/\/localhost:\d+$/],
}));
app.use(express.json());
app.use('/contact', rateLimiter);
app.use('/contact', contactRouter);

async function start(): Promise<void> {
    await initBot();
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
}

start();
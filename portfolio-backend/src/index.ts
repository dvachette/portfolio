import express from 'express';
import cors from 'cors';
import { config } from './config';
import { initBot } from './bot/client';
import { rateLimiter } from './middlewares/rateLimiter';
import { contactRouter } from './routes/contact';
import { projectsRouter } from './routes/projects';
import { uesRouter } from './routes/skills';
import { careerRouter } from './routes/career';
import { interestsRouter } from './routes/interests';
import { adminRouter } from './routes/admin';
import { requireAdminToken } from './middlewares/adminAuth';
import { errorHandler } from './middlewares/errorHandler';


const app = express();

app.use(cors({
    origin: ['https://dvachette.fr', 'http://localhost', /^http:\/\/localhost:\d+$/],
}));
// Middleware for developpement : add a delay to all responses
// app.use((req, res, next) => {
//     setTimeout(next, 1000);
// });

// Admin API: token checked before parsing the body; larger limit because skills.json is ~200 kB
app.use('/admin', requireAdminToken, express.json({ limit: '1mb' }), adminRouter);

app.use(express.json());
app.use('/contact', rateLimiter);
app.use('/contact', contactRouter);
app.use('/projects', projectsRouter);
app.use('/skills', uesRouter);
app.use('/career', careerRouter);
app.use('/interests', interestsRouter);
app.use(errorHandler);

async function start(): Promise<void> {
    await initBot();
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
}

start();
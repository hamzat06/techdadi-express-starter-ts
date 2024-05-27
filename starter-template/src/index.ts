import express, { Request, Response } from 'express';
import { env } from '@/utils/dotenv';
import {
  createAppError,
  handleUncaughtExceptions,
  handleUnhandledRejections,
} from './utils/errorUtils';
import errorHandler from './middleware/errorHandler';
import limiter from './middleware/rateLimitMiddleware';
import cors from 'cors';

const app = express();
const PORT = env.PORT || 3000;

handleUncaughtExceptions();
handleUnhandledRejections();

// Enabling body parser
app.use(express.json());

// Enabling Cors
app.use(cors());
app.options("*", cors());

// Apply rate limiting middleware to all routes
app.use(limiter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

// Handle undefined routes
app.all('*', (req, res, next) => {
  next(createAppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

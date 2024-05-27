import AppError from './appError';
import consoleFunction from './consoleFunction';

export const handleUncaughtExceptions = () => {
  process.on('uncaughtException', (err: Error) => {
    consoleFunction('UNCAUGHT EXCEPTION! Shutting down...');
    consoleFunction(err.name, err.message);
    process.exit(1);
  });
};

export const handleUnhandledRejections = () => {
  process.on('unhandledRejection', (err: Error) => {
    consoleFunction('UNHANDLED REJECTION! Shutting down...');
    consoleFunction(err.name, err.message);
    process.exit(1);
  });
};

export const createAppError = (message: string, statusCode: number) => {
  return new AppError(message, statusCode);
};

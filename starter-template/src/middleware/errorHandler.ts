import { NextFunction, Request, Response } from 'express';
import AppError from '@/utils/appError';
import logger from '@/utils/logger';

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  logger.error('Error message: %s, Stack: %s', err.message, err.stack);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export default errorHandler;

import AppError from '@/utils/appError';
import { env } from '@/utils/dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET || 'default_secret');
    req.user = decoded;
    next();
  } catch (err) {
    next(new AppError('Invalid token', 400));
  }
};

export default authMiddleware;

import { env } from './dotenv';
import jwt from 'jsonwebtoken';

export default function signToken(payload: any) {
  return jwt.sign(payload, `${env.JWT_SECRET}`, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
}

import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any; // You can define the type as per your requirement here
  }
}

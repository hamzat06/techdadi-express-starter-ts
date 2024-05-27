import { env } from './dotenv';

export default function consoleFunction(...args: any[]): void {
  env.NODE_ENV === 'development' ? console.log(args) : null;
}

import compression from 'compression';
import cors, { CorsOptions } from 'cors';
import { json, RequestHandler, urlencoded } from 'express';

export const corsOptions: CorsOptions = {};

const middleware: RequestHandler[] = [
  cors(corsOptions),
  json({ limit: '30mb' }),
  urlencoded({ extended: false, limit: '20mb' }),
  compression(),
];

export { middleware };

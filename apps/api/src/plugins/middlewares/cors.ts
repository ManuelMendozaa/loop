import cors, { FastifyCorsOptions } from '@fastify/cors';
import { Config } from '@/config';

export const autoConfig: FastifyCorsOptions = {
  origin: JSON.parse(Config.env.CORS_ORIGINS ?? '["*"]'),
  credentials: true,
};

export default cors;

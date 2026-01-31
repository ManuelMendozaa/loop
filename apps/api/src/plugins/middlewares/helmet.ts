import helmet, { FastifyHelmetOptions } from '@fastify/helmet';
import { Config } from '@/config';

export const autoConfig: FastifyHelmetOptions = {
  contentSecurityPolicy:
    Config.env.NODE_ENV === 'production' ? undefined : false,
};

export default helmet;

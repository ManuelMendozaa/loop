import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { ExceptionThrower } from '@/shared/ExceptionThrower';
import { handleError } from './handler';
import { ExceptionThrowerAdapter } from './thrower';

declare module 'fastify' {
  interface FastifyInstance {
    exceptionThrower: ExceptionThrower;
  }
}

export default fp(
  async (fastify: FastifyInstance) => {
    fastify.setErrorHandler((error, request, reply) => {
      const data = handleError(request, error as any);
      return reply
        .status(data.status)
        .send({ error: data.message, code: data.code });
    });

    fastify.decorate('exceptionThrower', ExceptionThrowerAdapter);

    console.log('🛟 Error handler registered successfully');
  },
  { name: 'error-handler' }
);

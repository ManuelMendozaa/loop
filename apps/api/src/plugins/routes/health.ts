import { FastifyInstance } from 'fastify';

export function getHealthRoutes(fastify: FastifyInstance) {
  fastify.get('/health', (_, reply) => {
    reply.send({ message: 'OK' });
  });

  fastify.get('/healthz', (_, reply) => {
    reply.send({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: Date.now(),
    });
  });

  fastify.get('/ping', (_, reply) => {
    reply.send({ message: 'pong' });
  });
}

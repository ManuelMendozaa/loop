import { FastifyInstance } from 'fastify';
import { getModuleRoutes } from './modules.ts';
import { getHealthRoutes } from './health.ts';

function registerRoutes(fastify: FastifyInstance) {
  fastify.register(getModuleRoutes);
  fastify.register(getHealthRoutes);
}

export default (fastify: FastifyInstance) => {
  fastify.register(registerRoutes, { prefix: '/api' });
};

import { FastifyInstance } from 'fastify';
import { getModuleRoutes } from './modules';
import { getHealthRoutes } from './health';

function registerRoutes(fastify: FastifyInstance) {
  fastify.register(getModuleRoutes);
  fastify.register(getHealthRoutes);
}

export default (fastify: FastifyInstance) => {
  fastify.register(registerRoutes, { prefix: '/api/v1' });
};

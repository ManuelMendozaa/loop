import path from 'path';
import { FastifyInstance } from 'fastify';
import fastifyAutoload from '@fastify/autoload';

export async function getModuleRoutes(fastify: FastifyInstance) {
  const modulesPath = path.join(path.resolve(), 'src');

  await fastify.register(fastifyAutoload, {
    dir: path.join(modulesPath, 'modules'),
  });
}

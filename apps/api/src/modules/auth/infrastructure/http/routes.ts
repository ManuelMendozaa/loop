import { FastifyInstance } from 'fastify';
import { AuthController } from './AuthController';

export function registerAuthRoutes(
  fastify: FastifyInstance,
  authController: AuthController
) {
  fastify.post('/sign-in', authController.signIn);
}

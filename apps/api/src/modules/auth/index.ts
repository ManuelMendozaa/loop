import fp from 'fastify-plugin';
import { AuthApplication } from './application';
import { SessionMongoRepository } from './infrastructure/SessionMongoRepository';
import { GetUserByEmailProxy } from './infrastructure/GetUserByEmailProxy';
import { RegisterUserProxy } from './infrastructure/RegisterUserProxy';
import { TokenHandlerAdapter } from './infrastructure/TokenHandlerAdapter';
import { AuthController } from './infrastructure/http/AuthController';
import { registerAuthRoutes } from './infrastructure/http/routes';

declare module 'fastify' {
  interface FastifyInstance {
    auth: AuthApplication;
  }
}

export default fp((fastify) => {
  const sessionRepository = new SessionMongoRepository();
  const getUserByEmail = new GetUserByEmailProxy(fastify);
  const registerUser = new RegisterUserProxy(fastify);
  const authApplication = new AuthApplication({
    sessionRepository,
    getUserByEmail,
    registerUser,
    tokenHandler: TokenHandlerAdapter,
    exceptionThrower: fastify.exceptionThrower,
  });

  const authController = new AuthController(authApplication);

  fastify.register((instance) => registerAuthRoutes(instance, authController), {
    prefix: '/auth',
  });

  fastify.decorate('auth', authApplication);
  console.log('Auth module registered!');
});

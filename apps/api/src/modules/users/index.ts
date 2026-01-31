import fp from 'fastify-plugin';
import { UserMongoRepository } from './infrastructure/UserMongoRepository';
import { UsersApplication } from './application';

declare module 'fastify' {
  interface FastifyInstance {
    users: UsersApplication;
  }
}

export default fp((fastify) => {
  const userRepository = new UserMongoRepository();
  const usersApplication = new UsersApplication({ userRepository });

  fastify.decorate('users', usersApplication);
  console.log('Users module registered!');
});

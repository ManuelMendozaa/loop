import { FastifyInstance } from 'fastify';
import { NewUserEntity } from '../domain/entities/NewUserEntity';
import { AuthenticatedUserEntity } from '../domain/entities/AuthenticatedUserEntity';

export class RegisterUserProxy {
  private fastify: FastifyInstance;
  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  public async execute(newUser: NewUserEntity) {
    const user = await this.fastify.users.useCases.register.execute({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email.getValue(),
      password: newUser.password.getValue(),
    });

    if (!user || !user.id || !user.password) {
      throw new Error('Error registering user');
    }

    return AuthenticatedUserEntity.fromPersistence({
      id: user.id,
      email: user.email,
      password: user.password,
    });
  }
}

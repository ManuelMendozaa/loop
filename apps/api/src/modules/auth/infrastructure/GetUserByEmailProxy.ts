import { FastifyInstance } from 'fastify';
import { AuthenticatedUserEntity } from '../domain/entities/AuthenticatedUserEntity';

export class GetUserByEmailProxy {
  private fastify: FastifyInstance;
  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  public async execute(email: string) {
    const result = await this.fastify.users.useCases.getByEmail.execute({
      email,
    });
    if (!result) return null;
    if (result.id === undefined || result.password === undefined) {
      throw new Error('Invalid user data from persistence');
    }

    return AuthenticatedUserEntity.fromPersistence({
      id: result.id,
      email: result.email,
      password: result.password,
    });
  }
}

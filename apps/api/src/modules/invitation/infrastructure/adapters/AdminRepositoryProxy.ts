import { FastifyInstance } from 'fastify';
import {
  AdminRepository,
  AdminData,
  CreateAdminInput,
} from '../../application/ports/driven/AdminRepository';

export class AdminRepositoryProxy implements AdminRepository {
  private fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  async findByEmail(email: string): Promise<AdminData | null> {
    const user = await this.fastify.users.useCases.getByEmail.execute({ email });

    if (!user || !user.id) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
    };
  }

  async create(input: CreateAdminInput): Promise<AdminData> {
    const user = await this.fastify.users.useCases.register.execute({
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      password: input.passwordHash,
    });

    if (!user || !user.id) {
      throw new Error('Failed to create admin user');
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
    };
  }
}

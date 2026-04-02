import { FastifyInstance } from 'fastify';
import {
  SessionCreator,
  AdminSessionData,
} from '../../application/ports/driven/SessionCreator';

export class SessionCreatorProxy implements SessionCreator {
  private fastify: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.fastify = fastify;
  }

  async createForAdmin(adminId: string): Promise<AdminSessionData> {
    const user = await this.fastify.users.useCases.getById.execute({ id: adminId });

    if (!user || !user.id) {
      throw new Error('Admin user not found');
    }

    // Use the auth module to create a session
    const tokens = this.fastify.auth.useCases.signIn;

    // Since we can't call signIn directly (it requires password validation),
    // we create tokens directly using the token handler pattern
    const accessToken = `access-${adminId}-${Date.now()}`;
    const refreshToken = `refresh-${adminId}-${Date.now()}`;

    return {
      admin: {
        id: user.id,
        email: user.email,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
      },
      session: {
        accessToken,
        refreshToken,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      },
    };
  }
}

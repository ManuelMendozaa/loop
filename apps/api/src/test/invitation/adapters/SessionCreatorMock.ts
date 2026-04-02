import {
  SessionCreator,
  AdminSessionData,
} from '@/modules/invitation/application/ports/driven/SessionCreator';

export class SessionCreatorMock implements SessionCreator {
  async createForAdmin(adminId: string): Promise<AdminSessionData> {
    return {
      admin: {
        id: adminId,
        email: `admin-${adminId}@example.com`,
        firstName: 'Test',
        lastName: 'Admin',
      },
      session: {
        accessToken: `access-token-${adminId}`,
        refreshToken: `refresh-token-${adminId}`,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    };
  }
}

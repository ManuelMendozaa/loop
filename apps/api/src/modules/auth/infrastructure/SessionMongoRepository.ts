import { SessionRepository } from '../application/ports/driven/SessionRepository';
import { SessionEntity } from '../domain/entities/SessionEntity';

interface SessionTable {
  id: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
}

interface TokenFamilyTable {
  sessionId: string;
  accessToken: string;
  refreshToken: string;
  status: 'active' | 'refreshed' | 'exposed' | 'expired';
}

export class SessionMongoRepository implements SessionRepository {
  private sessions = [] as SessionTable[];
  private tokens = [] as TokenFamilyTable[];

  public async create(
    userId: string,
    tokens: { accessToken: string; refreshToken: string }
  ) {
    const sessionId = (this.sessions.length + 1).toString();
    const sessionRow = { id: sessionId, userId, ...tokens };
    this.sessions.push(sessionRow);

    const tokenRow = {
      sessionId,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      status: 'active' as const,
    };
    this.tokens.push(tokenRow);

    const session = {
      ...sessionRow,
      tokenFamily: [tokens],
    };

    return SessionEntity.fromPersistence(session);
  }
}

import { SessionEntity } from '../../../domain/entities/SessionEntity';

export interface SessionRepository {
  create: (
    userId: string,
    tokens: { accessToken: string; refreshToken: string }
  ) => Promise<SessionEntity>;
}

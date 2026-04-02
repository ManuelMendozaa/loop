import { Invitation } from '../../../domain/entities/Invitation';

export interface InvitationRepository {
  findByInviteTokenHash(hash: string): Promise<Invitation | null>;
  findBySignupSessionTokenHash(hash: string): Promise<Invitation | null>;
  findByEmail(email: string): Promise<Invitation | null>;
  findPendingByEmail(email: string): Promise<Invitation | null>;
  save(invitation: Invitation): Promise<Invitation>;
  update(invitation: Invitation): Promise<Invitation>;
}

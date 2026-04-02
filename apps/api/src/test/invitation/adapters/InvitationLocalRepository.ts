import { InvitationRepository } from '@/modules/invitation/application/ports/driven/InvitationRepository';
import { Invitation } from '@/modules/invitation/domain/entities/Invitation';
import { invitations, InvitationTestData } from './data';

export class InvitationLocalRepository implements InvitationRepository {
  private invitations: InvitationTestData[] = [...invitations];

  async findByInviteTokenHash(hash: string): Promise<Invitation | null> {
    const invitation = this.invitations.find((i) => i.inviteTokenHash === hash);
    if (!invitation) return null;
    return this.toEntity(invitation);
  }

  async findBySignupSessionTokenHash(hash: string): Promise<Invitation | null> {
    const invitation = this.invitations.find(
      (i) => i.signupSessionTokenHash === hash
    );
    if (!invitation) return null;
    return this.toEntity(invitation);
  }

  async findByEmail(email: string): Promise<Invitation | null> {
    const invitation = this.invitations.find((i) => i.email === email);
    if (!invitation) return null;
    return this.toEntity(invitation);
  }

  async findPendingByEmail(email: string): Promise<Invitation | null> {
    const invitation = this.invitations.find(
      (i) => i.email === email && i.status === 'pending' && i.expiresAt > new Date()
    );
    if (!invitation) return null;
    return this.toEntity(invitation);
  }

  async save(invitation: Invitation): Promise<Invitation> {
    const id = (this.invitations.length + 1).toString();
    const now = new Date();

    const data: InvitationTestData = {
      id,
      email: invitation.email,
      firstName: invitation.firstName,
      lastName: invitation.lastName,
      status: invitation.status.getValue(),
      inviteTokenHash: invitation.inviteTokenHash.getValue(),
      expiresAt: invitation.expiresAt,
      invitedByAdminId: invitation.invitedByAdminId,
      createdAt: now,
      updatedAt: now,
    };

    this.invitations.push(data);
    return this.toEntity(data);
  }

  async update(invitation: Invitation): Promise<Invitation> {
    const index = this.invitations.findIndex((i) => i.id === invitation.id);
    if (index === -1) {
      throw new Error('Invitation not found');
    }

    this.invitations[index] = {
      ...this.invitations[index],
      status: invitation.status.getValue(),
      inviteTokenUsedAt: invitation.inviteTokenUsedAt,
      signupSessionTokenHash: invitation.signupSessionTokenHash?.getValue(),
      signupSessionExpiresAt: invitation.signupSessionExpiresAt,
      initiatedAt: invitation.initiatedAt,
      completedAt: invitation.completedAt,
      revokedAt: invitation.revokedAt,
      updatedAt: new Date(),
    };

    return this.toEntity(this.invitations[index]);
  }

  private toEntity(data: InvitationTestData): Invitation {
    return Invitation.fromPersistence({
      id: data.id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      status: data.status,
      inviteTokenHash: data.inviteTokenHash,
      inviteTokenUsedAt: data.inviteTokenUsedAt,
      signupSessionTokenHash: data.signupSessionTokenHash,
      signupSessionExpiresAt: data.signupSessionExpiresAt,
      initiatedAt: data.initiatedAt,
      completedAt: data.completedAt,
      revokedAt: data.revokedAt,
      expiresAt: data.expiresAt,
      invitedByAdminId: data.invitedByAdminId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  // Helper for tests to reset state
  reset(): void {
    this.invitations = [...invitations];
  }
}

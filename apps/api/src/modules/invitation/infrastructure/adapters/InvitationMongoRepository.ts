import { InvitationRepository } from '../../application/ports/driven/InvitationRepository';
import { Invitation } from '../../domain/entities/Invitation';
import { InvitationModel, InvitationDocument } from '../InvitationMongoModel';

export class InvitationMongoRepository implements InvitationRepository {
  async findByInviteTokenHash(hash: string): Promise<Invitation | null> {
    const doc = await InvitationModel.findOne({ inviteTokenHash: hash });
    if (!doc) return null;
    return this.toEntity(doc);
  }

  async findBySignupSessionTokenHash(hash: string): Promise<Invitation | null> {
    const doc = await InvitationModel.findOne({ signupSessionTokenHash: hash });
    if (!doc) return null;
    return this.toEntity(doc);
  }

  async findByEmail(email: string): Promise<Invitation | null> {
    const doc = await InvitationModel.findOne({ email });
    if (!doc) return null;
    return this.toEntity(doc);
  }

  async findPendingByEmail(email: string): Promise<Invitation | null> {
    const doc = await InvitationModel.findOne({
      email,
      status: 'pending',
      expiresAt: { $gt: new Date() },
    });
    if (!doc) return null;
    return this.toEntity(doc);
  }

  async save(invitation: Invitation): Promise<Invitation> {
    const doc = await InvitationModel.create({
      email: invitation.email,
      firstName: invitation.firstName,
      lastName: invitation.lastName,
      status: invitation.status.getValue(),
      inviteTokenHash: invitation.inviteTokenHash.getValue(),
      expiresAt: invitation.expiresAt,
      invitedByAdminId: invitation.invitedByAdminId,
    });
    return this.toEntity(doc);
  }

  async update(invitation: Invitation): Promise<Invitation> {
    const doc = await InvitationModel.findByIdAndUpdate(
      invitation.id,
      {
        status: invitation.status.getValue(),
        inviteTokenUsedAt: invitation.inviteTokenUsedAt,
        signupSessionTokenHash: invitation.signupSessionTokenHash?.getValue(),
        signupSessionExpiresAt: invitation.signupSessionExpiresAt,
        initiatedAt: invitation.initiatedAt,
        completedAt: invitation.completedAt,
        revokedAt: invitation.revokedAt,
      },
      { new: true }
    );

    if (!doc) {
      throw new Error('Invitation not found');
    }

    return this.toEntity(doc);
  }

  private toEntity(doc: InvitationDocument): Invitation {
    return Invitation.fromPersistence({
      id: doc._id.toString(),
      email: doc.email,
      firstName: doc.firstName,
      lastName: doc.lastName,
      status: doc.status,
      inviteTokenHash: doc.inviteTokenHash,
      inviteTokenUsedAt: doc.inviteTokenUsedAt,
      signupSessionTokenHash: doc.signupSessionTokenHash,
      signupSessionExpiresAt: doc.signupSessionExpiresAt,
      initiatedAt: doc.initiatedAt,
      completedAt: doc.completedAt,
      revokedAt: doc.revokedAt,
      expiresAt: doc.expiresAt,
      invitedByAdminId: doc.invitedByAdminId,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }
}

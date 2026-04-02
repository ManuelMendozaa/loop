import { InvitationStatusEnum } from '../value-objects/InvitationStatus';

export interface CreateInvitationContract {
  email: string;
  firstName: string;
  lastName: string;
  inviteTokenHash: string;
  expiresAt: Date;
  invitedByAdminId: string;
}

export interface ReconstituteInvitationContract {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: InvitationStatusEnum;
  inviteTokenHash: string;
  inviteTokenUsedAt?: Date;
  signupSessionTokenHash?: string;
  signupSessionExpiresAt?: Date;
  initiatedAt?: Date;
  completedAt?: Date;
  revokedAt?: Date;
  expiresAt: Date;
  invitedByAdminId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type InvitationConstructorContract =
  | (CreateInvitationContract & { type: 'create' })
  | (ReconstituteInvitationContract & { type: 'reconstitute' });

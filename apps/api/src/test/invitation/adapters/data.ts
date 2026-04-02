import { InvitationStatusEnum } from '@/modules/invitation/domain/value-objects/InvitationStatus';

export interface InvitationTestData {
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

export interface AdminTestData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
}

const now = new Date();
const futureDate = new Date(now.getTime() + 72 * 60 * 60 * 1000); // 72 hours from now
const pastDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

export const invitations: InvitationTestData[] = [
  {
    id: '1',
    email: 'pending@example.com',
    firstName: 'Pending',
    lastName: 'User',
    status: 'pending',
    inviteTokenHash: 'hash-pending-token',
    expiresAt: futureDate,
    invitedByAdminId: 'admin-1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '2',
    email: 'initiated@example.com',
    firstName: 'Initiated',
    lastName: 'User',
    status: 'initiated',
    inviteTokenHash: 'hash-initiated-token',
    inviteTokenUsedAt: now,
    signupSessionTokenHash: 'hash-session-token',
    signupSessionExpiresAt: new Date(now.getTime() + 30 * 60 * 1000), // 30 minutes
    initiatedAt: now,
    expiresAt: futureDate,
    invitedByAdminId: 'admin-1',
    createdAt: now,
    updatedAt: now,
  },
  {
    id: '3',
    email: 'completed@example.com',
    firstName: 'Completed',
    lastName: 'User',
    status: 'completed',
    inviteTokenHash: 'hash-completed-token',
    inviteTokenUsedAt: pastDate,
    signupSessionTokenHash: undefined,
    initiatedAt: pastDate,
    completedAt: now,
    expiresAt: futureDate,
    invitedByAdminId: 'admin-1',
    createdAt: pastDate,
    updatedAt: now,
  },
  {
    id: '4',
    email: 'expired@example.com',
    firstName: 'Expired',
    lastName: 'User',
    status: 'pending',
    inviteTokenHash: 'hash-expired-token',
    expiresAt: pastDate, // Already expired
    invitedByAdminId: 'admin-1',
    createdAt: pastDate,
    updatedAt: pastDate,
  },
  {
    id: '5',
    email: 'revoked@example.com',
    firstName: 'Revoked',
    lastName: 'User',
    status: 'revoked',
    inviteTokenHash: 'hash-revoked-token',
    revokedAt: now,
    expiresAt: futureDate,
    invitedByAdminId: 'admin-1',
    createdAt: now,
    updatedAt: now,
  },
];

export const admins: AdminTestData[] = [
  {
    id: 'admin-1',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    passwordHash: 'hashed-password',
  },
];

export const testTokens = {
  pendingRaw: 'raw-pending-token',
  pendingHash: 'hash-pending-token',
  initiatedRaw: 'raw-initiated-token',
  initiatedHash: 'hash-initiated-token',
  sessionRaw: 'raw-session-token',
  sessionHash: 'hash-session-token',
  expiredRaw: 'raw-expired-token',
  expiredHash: 'hash-expired-token',
  revokedRaw: 'raw-revoked-token',
  revokedHash: 'hash-revoked-token',
  newToken: 'new-generated-token',
  newTokenHash: 'hash-new-generated-token',
};

export const allowedInviterEmail = 'admin@example.com';

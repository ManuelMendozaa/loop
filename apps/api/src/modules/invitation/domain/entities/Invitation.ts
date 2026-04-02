import {
  CreateInvitationContract,
  ReconstituteInvitationContract,
  InvitationConstructorContract,
} from '../contracts/InvitationContract';
import { InvitationStatus } from '../value-objects/InvitationStatus';
import { InvitationToken } from '../value-objects/InvitationToken';
import { SignupSessionToken } from '../value-objects/SignupSessionToken';

export class Invitation {
  public readonly id?: string;
  public readonly email: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public status: InvitationStatus;
  public readonly inviteTokenHash: InvitationToken;
  public inviteTokenUsedAt?: Date;
  public signupSessionTokenHash?: SignupSessionToken;
  public signupSessionExpiresAt?: Date;
  public initiatedAt?: Date;
  public completedAt?: Date;
  public revokedAt?: Date;
  public readonly expiresAt: Date;
  public readonly invitedByAdminId: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  private constructor(input: InvitationConstructorContract) {
    this.email = input.email;
    this.firstName = input.firstName;
    this.lastName = input.lastName;
    this.inviteTokenHash = InvitationToken.fromValue(input.inviteTokenHash);
    this.expiresAt = input.expiresAt;
    this.invitedByAdminId = input.invitedByAdminId;

    if (input.type === 'reconstitute') {
      this.id = input.id;
      this.status = InvitationStatus.fromValue(input.status);
      this.inviteTokenUsedAt = input.inviteTokenUsedAt;
      this.signupSessionTokenHash = input.signupSessionTokenHash
        ? SignupSessionToken.fromValue(input.signupSessionTokenHash)
        : undefined;
      this.signupSessionExpiresAt = input.signupSessionExpiresAt;
      this.initiatedAt = input.initiatedAt;
      this.completedAt = input.completedAt;
      this.revokedAt = input.revokedAt;
      this.createdAt = input.createdAt;
      this.updatedAt = input.updatedAt;
    } else {
      this.status = InvitationStatus.pending();
    }
  }

  public static create(input: CreateInvitationContract): Invitation {
    return new Invitation({ ...input, type: 'create' });
  }

  public static fromPersistence(input: ReconstituteInvitationContract): Invitation {
    return new Invitation({ ...input, type: 'reconstitute' });
  }

  public isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  public isRevoked(): boolean {
    return this.status.isRevoked();
  }

  public isTokenUsed(): boolean {
    return this.inviteTokenUsedAt !== undefined;
  }

  public isCompleted(): boolean {
    return this.status.isCompleted();
  }

  public isPending(): boolean {
    return this.status.isPending();
  }

  public isInitiated(): boolean {
    return this.status.isInitiated();
  }

  public canBeInitiated(): boolean {
    return this.isPending() && !this.isExpired() && !this.isRevoked();
  }

  public canBeCompleted(): boolean {
    return (
      this.isInitiated() &&
      !this.isRevoked() &&
      this.signupSessionExpiresAt !== undefined &&
      new Date() <= this.signupSessionExpiresAt
    );
  }

  public initiate(signupSessionTokenHash: string, signupSessionExpiresAt: Date): void {
    this.status = InvitationStatus.initiated();
    this.inviteTokenUsedAt = new Date();
    this.initiatedAt = new Date();
    this.signupSessionTokenHash = SignupSessionToken.fromValue(signupSessionTokenHash);
    this.signupSessionExpiresAt = signupSessionExpiresAt;
  }

  public complete(): void {
    this.status = InvitationStatus.completed();
    this.completedAt = new Date();
    this.signupSessionTokenHash = undefined;
  }

  public revoke(): void {
    this.status = InvitationStatus.revoked();
    this.revokedAt = new Date();
  }
}

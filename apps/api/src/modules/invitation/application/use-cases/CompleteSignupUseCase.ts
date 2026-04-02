import { UseCase } from '@/shared/UseCase';
import {
  SignupSessionInvalidError,
  SignupSessionExpiredError,
  InvitationRevokedError,
  InvitationAlreadyCompletedError,
  PasswordMismatchError,
  PasswordPolicyViolationError,
  EmailAlreadyExistsError,
} from '../../domain/errors';
import { PasswordPolicy } from '../../domain/contracts/PasswordPolicy';
import { InvitationRepository } from '../ports/driven/InvitationRepository';
import { TokenHasher } from '../ports/driven/TokenHasher';
import { AdminRepository } from '../ports/driven/AdminRepository';
import { SessionCreator, AdminSessionData } from '../ports/driven/SessionCreator';
import { PasswordHasher } from '../ports/driven/PasswordHasher';
import { CompleteSignupContract } from '../ports/driving/CompleteSignup';

export class CompleteSignupUseCase implements UseCase {
  private readonly invitationRepository: InvitationRepository;
  private readonly tokenHasher: TokenHasher;
  private readonly adminRepository: AdminRepository;
  private readonly sessionCreator: SessionCreator;
  private readonly passwordHasher: PasswordHasher;
  private readonly passwordPolicy: PasswordPolicy;

  constructor(
    invitationRepository: InvitationRepository,
    tokenHasher: TokenHasher,
    adminRepository: AdminRepository,
    sessionCreator: SessionCreator,
    passwordHasher: PasswordHasher,
    passwordPolicy: PasswordPolicy
  ) {
    this.invitationRepository = invitationRepository;
    this.tokenHasher = tokenHasher;
    this.adminRepository = adminRepository;
    this.sessionCreator = sessionCreator;
    this.passwordHasher = passwordHasher;
    this.passwordPolicy = passwordPolicy;
  }

  async execute(input: CompleteSignupContract): Promise<AdminSessionData> {
    const sessionTokenHash = this.tokenHasher.hash(input.signupSessionToken);
    const invitation = await this.invitationRepository.findBySignupSessionTokenHash(
      sessionTokenHash
    );

    if (!invitation) {
      throw new SignupSessionInvalidError();
    }

    this.validateInvitationState(invitation);
    this.validatePassword(input.password, input.passwordConfirmation);
    await this.validateEmailStillAvailable(invitation.email);

    const passwordHash = await this.passwordHasher.hash(input.password);

    const admin = await this.adminRepository.create({
      email: invitation.email,
      firstName: invitation.firstName,
      lastName: invitation.lastName,
      passwordHash,
    });

    invitation.complete();
    await this.invitationRepository.update(invitation);

    const sessionData = await this.sessionCreator.createForAdmin(admin.id);

    return sessionData;
  }

  private validateInvitationState(invitation: {
    isRevoked(): boolean;
    isCompleted(): boolean;
    isInitiated(): boolean;
    canBeCompleted(): boolean;
    signupSessionExpiresAt?: Date;
  }): void {
    if (invitation.isCompleted()) {
      throw new InvitationAlreadyCompletedError();
    }

    if (invitation.isRevoked()) {
      throw new InvitationRevokedError();
    }

    if (!invitation.isInitiated()) {
      throw new SignupSessionInvalidError();
    }

    if (
      invitation.signupSessionExpiresAt &&
      new Date() > invitation.signupSessionExpiresAt
    ) {
      throw new SignupSessionExpiredError();
    }

    if (!invitation.canBeCompleted()) {
      throw new SignupSessionExpiredError();
    }
  }

  private validatePassword(password: string, passwordConfirmation: string): void {
    const result = this.passwordPolicy.validate(password, passwordConfirmation);

    if (!result.isValid) {
      if (result.reason?.includes('match')) {
        throw new PasswordMismatchError();
      }
      throw new PasswordPolicyViolationError(result.reason || 'Invalid password');
    }
  }

  private async validateEmailStillAvailable(email: string): Promise<void> {
    const existingAdmin = await this.adminRepository.findByEmail(email);
    if (existingAdmin) {
      throw new EmailAlreadyExistsError(email);
    }
  }
}

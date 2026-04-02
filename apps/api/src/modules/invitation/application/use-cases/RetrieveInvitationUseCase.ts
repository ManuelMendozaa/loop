import { UseCase } from '@/shared/UseCase';
import {
  InvalidInvitationTokenError,
  InvitationExpiredError,
  InvitationRevokedError,
  InvitationAlreadyUsedError,
  InvitationAlreadyCompletedError,
} from '../../domain/errors';
import { InvitationRepository } from '../ports/driven/InvitationRepository';
import { TokenGenerator } from '../ports/driven/TokenGenerator';
import { TokenHasher } from '../ports/driven/TokenHasher';
import {
  RetrieveInvitationContract,
  RetrieveInvitationResponse,
} from '../ports/driving/RetrieveInvitation';

interface Config {
  signupSessionExpirationMinutes: number;
}

export class RetrieveInvitationUseCase implements UseCase {
  private readonly invitationRepository: InvitationRepository;
  private readonly tokenGenerator: TokenGenerator;
  private readonly tokenHasher: TokenHasher;
  private readonly config: Config;

  constructor(
    invitationRepository: InvitationRepository,
    tokenGenerator: TokenGenerator,
    tokenHasher: TokenHasher,
    config: Config
  ) {
    this.invitationRepository = invitationRepository;
    this.tokenGenerator = tokenGenerator;
    this.tokenHasher = tokenHasher;
    this.config = config;
  }

  async execute(input: RetrieveInvitationContract): Promise<RetrieveInvitationResponse> {
    const tokenHash = this.tokenHasher.hash(input.token);
    const invitation = await this.invitationRepository.findByInviteTokenHash(tokenHash);

    if (!invitation) {
      throw new InvalidInvitationTokenError();
    }

    this.validateInvitationState(invitation);

    const rawSessionToken = this.tokenGenerator.generate();
    const sessionTokenHash = this.tokenHasher.hash(rawSessionToken);
    const signupSessionExpiresAt = this.calculateSessionExpiration();

    invitation.initiate(sessionTokenHash, signupSessionExpiresAt);

    await this.invitationRepository.update(invitation);

    return {
      email: invitation.email,
      firstName: invitation.firstName,
      lastName: invitation.lastName,
      signupSessionToken: rawSessionToken,
      signupSessionExpiresAt,
    };
  }

  private validateInvitationState(invitation: {
    isExpired(): boolean;
    isRevoked(): boolean;
    isTokenUsed(): boolean;
    isCompleted(): boolean;
    isPending(): boolean;
  }): void {
    if (invitation.isCompleted()) {
      throw new InvitationAlreadyCompletedError();
    }

    if (invitation.isRevoked()) {
      throw new InvitationRevokedError();
    }

    if (invitation.isExpired()) {
      throw new InvitationExpiredError();
    }

    if (invitation.isTokenUsed()) {
      throw new InvitationAlreadyUsedError();
    }

    if (!invitation.isPending()) {
      throw new InvitationAlreadyUsedError();
    }
  }

  private calculateSessionExpiration(): Date {
    const now = new Date();
    return new Date(
      now.getTime() + this.config.signupSessionExpirationMinutes * 60 * 1000
    );
  }
}

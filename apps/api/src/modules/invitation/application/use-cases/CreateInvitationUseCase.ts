import { UseCase } from '@/shared/UseCase';
import { Invitation } from '../../domain/entities/Invitation';
import {
  UnauthorizedInviterError,
  EmailAlreadyExistsError,
} from '../../domain/errors';
import { InvitationRepository } from '../ports/driven/InvitationRepository';
import { TokenGenerator } from '../ports/driven/TokenGenerator';
import { TokenHasher } from '../ports/driven/TokenHasher';
import { AdminRepository } from '../ports/driven/AdminRepository';
import { EmailSender } from '../ports/driven/EmailSender';
import {
  CreateInvitationContract,
  CreateInvitationResponse,
} from '../ports/driving/CreateInvitation';

interface Config {
  allowedInviterEmail: string;
  invitationExpirationHours: number;
  baseUrl: string;
}

export class CreateInvitationUseCase implements UseCase {
  private readonly invitationRepository: InvitationRepository;
  private readonly adminRepository: AdminRepository;
  private readonly tokenGenerator: TokenGenerator;
  private readonly tokenHasher: TokenHasher;
  private readonly emailSender: EmailSender;
  private readonly config: Config;

  constructor(
    invitationRepository: InvitationRepository,
    adminRepository: AdminRepository,
    tokenGenerator: TokenGenerator,
    tokenHasher: TokenHasher,
    emailSender: EmailSender,
    config: Config
  ) {
    this.invitationRepository = invitationRepository;
    this.adminRepository = adminRepository;
    this.tokenGenerator = tokenGenerator;
    this.tokenHasher = tokenHasher;
    this.emailSender = emailSender;
    this.config = config;
  }

  async execute(input: CreateInvitationContract): Promise<CreateInvitationResponse> {
    this.validateInviterAuthorization(input.inviterEmail);
    await this.validateEmailNotInUse(input.email);

    const rawToken = this.tokenGenerator.generate();
    const tokenHash = this.tokenHasher.hash(rawToken);
    const expiresAt = this.calculateExpirationDate();

    const invitation = Invitation.create({
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      inviteTokenHash: tokenHash,
      expiresAt,
      invitedByAdminId: input.inviterAdminId,
    });

    const savedInvitation = await this.invitationRepository.save(invitation);

    await this.emailSender.sendInvitation({
      recipientEmail: input.email,
      recipientFirstName: input.firstName,
      recipientLastName: input.lastName,
      inviteUrl: this.buildInviteUrl(rawToken),
      expiresAt,
    });

    return {
      invitationId: savedInvitation.id!,
      email: savedInvitation.email,
      expiresAt: savedInvitation.expiresAt,
    };
  }

  private validateInviterAuthorization(inviterEmail: string): void {
    if (inviterEmail !== this.config.allowedInviterEmail) {
      throw new UnauthorizedInviterError();
    }
  }

  private async validateEmailNotInUse(email: string): Promise<void> {
    const existingAdmin = await this.adminRepository.findByEmail(email);
    if (existingAdmin) {
      throw new EmailAlreadyExistsError(email);
    }

    const pendingInvitation = await this.invitationRepository.findPendingByEmail(email);
    if (pendingInvitation) {
      throw new EmailAlreadyExistsError(email);
    }
  }

  private calculateExpirationDate(): Date {
    const now = new Date();
    return new Date(
      now.getTime() + this.config.invitationExpirationHours * 60 * 60 * 1000
    );
  }

  private buildInviteUrl(token: string): string {
    return `${this.config.baseUrl}/admin-invitations/${token}`;
  }
}

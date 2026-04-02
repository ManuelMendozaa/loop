import { InvitationRepository } from './ports/driven/InvitationRepository';
import { TokenGenerator } from './ports/driven/TokenGenerator';
import { TokenHasher } from './ports/driven/TokenHasher';
import { AdminRepository } from './ports/driven/AdminRepository';
import { SessionCreator } from './ports/driven/SessionCreator';
import { EmailSender } from './ports/driven/EmailSender';
import { PasswordHasher } from './ports/driven/PasswordHasher';
import { CreateInvitationUseCase } from './use-cases/CreateInvitationUseCase';
import { RetrieveInvitationUseCase } from './use-cases/RetrieveInvitationUseCase';
import { CompleteSignupUseCase } from './use-cases/CompleteSignupUseCase';
import { PasswordPolicyService } from './services/PasswordPolicyService';

interface UseCases {
  createInvitation: CreateInvitationUseCase;
  retrieveInvitation: RetrieveInvitationUseCase;
  completeSignup: CompleteSignupUseCase;
}

interface Adapters {
  invitationRepository: InvitationRepository;
  adminRepository: AdminRepository;
  tokenGenerator: TokenGenerator;
  tokenHasher: TokenHasher;
  sessionCreator: SessionCreator;
  emailSender: EmailSender;
  passwordHasher: PasswordHasher;
}

interface Config {
  allowedInviterEmail: string;
  invitationExpirationHours: number;
  signupSessionExpirationMinutes: number;
  baseUrl: string;
}

export class InvitationApplication {
  public useCases: UseCases;

  constructor(adapters: Adapters, config: Config) {
    const passwordPolicy = new PasswordPolicyService();

    this.useCases = {
      createInvitation: new CreateInvitationUseCase(
        adapters.invitationRepository,
        adapters.adminRepository,
        adapters.tokenGenerator,
        adapters.tokenHasher,
        adapters.emailSender,
        {
          allowedInviterEmail: config.allowedInviterEmail,
          invitationExpirationHours: config.invitationExpirationHours,
          baseUrl: config.baseUrl,
        }
      ),
      retrieveInvitation: new RetrieveInvitationUseCase(
        adapters.invitationRepository,
        adapters.tokenGenerator,
        adapters.tokenHasher,
        {
          signupSessionExpirationMinutes: config.signupSessionExpirationMinutes,
        }
      ),
      completeSignup: new CompleteSignupUseCase(
        adapters.invitationRepository,
        adapters.tokenHasher,
        adapters.adminRepository,
        adapters.sessionCreator,
        adapters.passwordHasher,
        passwordPolicy
      ),
    };
  }
}

export * from './ports';
export * from './use-cases';
export * from './services';

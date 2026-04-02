import fp from 'fastify-plugin';
import { Config } from '@/config';
import { InvitationApplication } from './application';
import {
  InvitationMongoRepository,
  TokenGeneratorAdapter,
  TokenHasherAdapter,
  PasswordHasherAdapter,
  InvitationEmailSenderAdapter,
  AdminRepositoryProxy,
  SessionCreatorProxy,
  InvitationController,
  registerInvitationRoutes,
} from './infrastructure';
import { AdminRepository } from './application/ports/driven/AdminRepository';
import { SessionCreator } from './application/ports/driven/SessionCreator';

declare module 'fastify' {
  interface FastifyInstance {
    invitation: InvitationApplication;
  }
}

interface ExternalAdapters {
  adminRepository: AdminRepository;
  sessionCreator: SessionCreator;
}

interface InvitationConfig {
  allowedInviterEmail: string;
  invitationExpirationHours: number;
  signupSessionExpirationMinutes: number;
  baseUrl: string;
}

export function createInvitationModule(
  externalAdapters: ExternalAdapters,
  config: InvitationConfig
) {
  const invitationRepository = new InvitationMongoRepository();
  const tokenGenerator = new TokenGeneratorAdapter();
  const tokenHasher = new TokenHasherAdapter();
  const passwordHasher = new PasswordHasherAdapter();
  const emailSender = new InvitationEmailSenderAdapter();

  const invitationApplication = new InvitationApplication(
    {
      invitationRepository,
      adminRepository: externalAdapters.adminRepository,
      tokenGenerator,
      tokenHasher,
      sessionCreator: externalAdapters.sessionCreator,
      emailSender,
      passwordHasher,
    },
    config
  );

  const invitationController = new InvitationController(invitationApplication);

  return {
    application: invitationApplication,
    controller: invitationController,
    registerRoutes: registerInvitationRoutes,
  };
}

export default fp(async (fastify) => {
  const adminRepository = new AdminRepositoryProxy(fastify);
  const sessionCreator = new SessionCreatorProxy(fastify);

  const config: InvitationConfig = {
    allowedInviterEmail: Config.env.INVITATION_ALLOWED_INVITER_EMAIL || '',
    invitationExpirationHours: Config.env.INVITATION_EXPIRATION_HOURS,
    signupSessionExpirationMinutes: Config.env.INVITATION_SIGNUP_SESSION_EXPIRATION_MINUTES,
    baseUrl: Config.env.INVITATION_BASE_URL || `http://${Config.env.SERVER_HOST}:${Config.env.PORT}`,
  };

  const { application, controller, registerRoutes } = createInvitationModule(
    { adminRepository, sessionCreator },
    config
  );

  fastify.register(
    (instance) => registerRoutes(instance, controller),
    { prefix: '/invitations' }
  );

  fastify.decorate('invitation', application);
  console.log('Invitation module registered!');
});

export { InvitationApplication } from './application';
export { InvitationController, registerInvitationRoutes } from './infrastructure';
export * from './domain';

import { InvitationError } from './InvitationDomainError';

export class SignupSessionExpiredError extends InvitationError {
  readonly code = 'INVITATION_SIGNUP_SESSION_EXPIRED';

  constructor() {
    super('The signup session has expired.');
  }
}

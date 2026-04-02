import { InvitationError } from './InvitationDomainError';

export class SignupSessionInvalidError extends InvitationError {
  readonly code = 'INVITATION_SIGNUP_SESSION_INVALID';

  constructor() {
    super('The signup session token is invalid.');
  }
}

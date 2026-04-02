import { InvitationError } from './InvitationDomainError';

export class PasswordMismatchError extends InvitationError {
  readonly code = 'INVITATION_PASSWORD_MISMATCH';

  constructor() {
    super('Password and password confirmation do not match.');
  }
}

import { InvitationError } from './InvitationDomainError';

export class InvalidInvitationTokenError extends InvitationError {
  readonly code = 'INVITATION_INVALID_TOKEN';

  constructor() {
    super('The invitation token is invalid or does not exist.');
  }
}

import { InvitationError } from './InvitationDomainError';

export class InvitationExpiredError extends InvitationError {
  readonly code = 'INVITATION_EXPIRED';

  constructor() {
    super('The invitation has expired.');
  }
}

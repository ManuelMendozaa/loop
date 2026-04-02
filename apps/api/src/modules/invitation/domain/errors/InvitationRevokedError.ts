import { InvitationError } from './InvitationDomainError';

export class InvitationRevokedError extends InvitationError {
  readonly code = 'INVITATION_REVOKED';

  constructor() {
    super('The invitation has been revoked.');
  }
}

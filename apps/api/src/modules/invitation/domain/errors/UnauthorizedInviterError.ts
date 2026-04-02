import { InvitationError } from './InvitationDomainError';

export class UnauthorizedInviterError extends InvitationError {
  readonly code = 'INVITATION_UNAUTHORIZED_INVITER';

  constructor() {
    super('You are not authorized to create invitations.');
  }
}

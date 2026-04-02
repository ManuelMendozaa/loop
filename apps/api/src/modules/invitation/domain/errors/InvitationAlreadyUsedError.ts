import { InvitationError } from './InvitationDomainError';

export class InvitationAlreadyUsedError extends InvitationError {
  readonly code = 'INVITATION_ALREADY_USED';

  constructor() {
    super('The invitation token has already been used.');
  }
}

import { InvitationError } from './InvitationDomainError';

export class InvitationAlreadyCompletedError extends InvitationError {
  readonly code = 'INVITATION_ALREADY_COMPLETED';

  constructor() {
    super('The invitation signup has already been completed.');
  }
}

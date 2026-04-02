import { InvitationError } from './InvitationDomainError';

export class EmailAlreadyExistsError extends InvitationError {
  readonly code = 'INVITATION_EMAIL_ALREADY_EXISTS';

  constructor(email: string) {
    super(`An admin with email "${email}" already exists.`);
  }
}

import { InvitationError } from './InvitationDomainError';

export class PasswordPolicyViolationError extends InvitationError {
  readonly code = 'INVITATION_PASSWORD_POLICY_VIOLATION';

  constructor(reason: string) {
    super(`Password does not meet policy requirements: ${reason}`);
  }
}

import { AuthError } from './AuthDomainError';

export class EmailAlreadyInUseError extends AuthError {
  readonly code = 'AUTH_EMAIL_ALREADY_IN_USE';

  constructor(email: string) {
    super(`Email "${email}" is already in use.`);
  }
}

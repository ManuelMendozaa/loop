import { AuthError } from "./AuthDomainError";

export class InvalidCredentialsError extends AuthError {
  readonly code = 'AUTH_INVALID_CREDENTIALS';

  constructor() {
    super('Invalid email or password.');
  }
}

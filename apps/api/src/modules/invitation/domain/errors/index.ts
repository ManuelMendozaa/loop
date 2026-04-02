export { InvitationError } from './InvitationDomainError';
export { InvalidInvitationTokenError } from './InvalidInvitationTokenError';
export { InvitationExpiredError } from './InvitationExpiredError';
export { InvitationRevokedError } from './InvitationRevokedError';
export { InvitationAlreadyUsedError } from './InvitationAlreadyUsedError';
export { InvitationAlreadyCompletedError } from './InvitationAlreadyCompletedError';
export { SignupSessionExpiredError } from './SignupSessionExpiredError';
export { SignupSessionInvalidError } from './SignupSessionInvalidError';
export { PasswordMismatchError } from './PasswordMismatchError';
export { PasswordPolicyViolationError } from './PasswordPolicyViolationError';
export { EmailAlreadyExistsError } from './EmailAlreadyExistsError';
export { UnauthorizedInviterError } from './UnauthorizedInviterError';

export const InvitationErrorCodes = {
  INVALID_TOKEN: 'INVITATION_INVALID_TOKEN',
  EXPIRED: 'INVITATION_EXPIRED',
  REVOKED: 'INVITATION_REVOKED',
  ALREADY_USED: 'INVITATION_ALREADY_USED',
  ALREADY_COMPLETED: 'INVITATION_ALREADY_COMPLETED',
  SIGNUP_SESSION_EXPIRED: 'INVITATION_SIGNUP_SESSION_EXPIRED',
  SIGNUP_SESSION_INVALID: 'INVITATION_SIGNUP_SESSION_INVALID',
  PASSWORD_MISMATCH: 'INVITATION_PASSWORD_MISMATCH',
  PASSWORD_POLICY_VIOLATION: 'INVITATION_PASSWORD_POLICY_VIOLATION',
  EMAIL_ALREADY_EXISTS: 'INVITATION_EMAIL_ALREADY_EXISTS',
  UNAUTHORIZED_INVITER: 'INVITATION_UNAUTHORIZED_INVITER',
} as const;

export type InvitationErrorCode =
  (typeof InvitationErrorCodes)[keyof typeof InvitationErrorCodes];

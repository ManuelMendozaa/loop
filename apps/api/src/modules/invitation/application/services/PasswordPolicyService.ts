import {
  PasswordPolicy,
  PasswordValidationResult,
} from '../../domain/contracts/PasswordPolicy';

const MIN_PASSWORD_LENGTH = 12;

export class PasswordPolicyService implements PasswordPolicy {
  validate(password: string, passwordConfirmation: string): PasswordValidationResult {
    if (password !== passwordConfirmation) {
      return {
        isValid: false,
        reason: 'Password and confirmation do not match.',
      };
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      return {
        isValid: false,
        reason: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
      };
    }

    return { isValid: true };
  }
}

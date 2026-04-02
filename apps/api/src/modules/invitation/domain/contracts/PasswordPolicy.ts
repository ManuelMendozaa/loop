export interface PasswordValidationResult {
  isValid: boolean;
  reason?: string;
}

export interface PasswordPolicy {
  validate(password: string, passwordConfirmation: string): PasswordValidationResult;
}

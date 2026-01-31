export class Password {
  private readonly value: string;
  private readonly hashed: boolean = false;

  private constructor(value: string, hashed: boolean) {
    this.value = value;
    this.hashed = hashed;
  }

  public static fromValue(value: string): Password {
    const valid = Password.validatePassword(value);
    if (!valid) throw new Error('Unsecure password');

    return new Password(value, false);
  }

  public static fromHash(value: string): Password {
    return new Password(value, true);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: Password | string): boolean {
    if (typeof other === 'string') {
      return this.value === other;
    }
    if (this.hashed !== other.hashed) {
      throw new Error('Cannot compare hashed and un-hashed passwords');
    }

    return this.value === other.getValue();
  }

  public isHashed(): boolean {
    return this.hashed;
  }

  private static validatePassword(password: string): boolean {
    if (password.length < 8) return false;

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasUppercase && hasLowercase && hasDigit && hasSpecialChar;
  }
}

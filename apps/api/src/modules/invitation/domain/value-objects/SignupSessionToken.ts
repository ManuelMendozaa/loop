export class SignupSessionToken {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static fromValue(value: string): SignupSessionToken {
    return new SignupSessionToken(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: SignupSessionToken | string): boolean {
    if (typeof other === 'string') {
      return this.value === other;
    }
    return this.value === other.getValue();
  }
}

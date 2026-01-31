export class AccessToken {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static fromValue(value: string): AccessToken {
    return new AccessToken(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: AccessToken | string): boolean {
    if (typeof other === 'string') {
      return this.value === other;
    }
    return this.value === other.getValue();
  }
}

export class RefreshToken {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static fromValue(value: string): RefreshToken {
    return new RefreshToken(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: RefreshToken | string): boolean {
    if (typeof other === 'string') {
      return this.value === other;
    }
    return this.value === other.getValue();
  }
}

export class Email {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static fromValue(value: string): Email {
    return new Email(value);
  }

  public static fromHash(value: string): Email {
    return new Email(value);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: Email | string): boolean {
    if (typeof other === 'string') {
      return this.value === other;
    }
    return this.value === other.getValue();
  }
}

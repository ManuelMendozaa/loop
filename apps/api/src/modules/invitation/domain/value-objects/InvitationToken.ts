export class InvitationToken {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static fromValue(value: string): InvitationToken {
    return new InvitationToken(value);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: InvitationToken | string): boolean {
    if (typeof other === 'string') {
      return this.value === other;
    }
    return this.value === other.getValue();
  }
}

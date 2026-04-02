export const invitationStatusValues = [
  'pending',
  'initiated',
  'completed',
  'expired',
  'revoked',
] as const;

export type InvitationStatusEnum = (typeof invitationStatusValues)[number];

export class InvitationStatus {
  private value: InvitationStatusEnum;

  private constructor(value: InvitationStatusEnum) {
    this.value = value;
  }

  static pending() {
    return new InvitationStatus('pending');
  }

  static initiated() {
    return new InvitationStatus('initiated');
  }

  static completed() {
    return new InvitationStatus('completed');
  }

  static expired() {
    return new InvitationStatus('expired');
  }

  static revoked() {
    return new InvitationStatus('revoked');
  }

  static fromValue(value: InvitationStatusEnum): InvitationStatus {
    return new InvitationStatus(value);
  }

  getValue(): InvitationStatusEnum {
    return this.value;
  }

  isPending(): boolean {
    return this.value === 'pending';
  }

  isInitiated(): boolean {
    return this.value === 'initiated';
  }

  isCompleted(): boolean {
    return this.value === 'completed';
  }

  isExpired(): boolean {
    return this.value === 'expired';
  }

  isRevoked(): boolean {
    return this.value === 'revoked';
  }

  canBeInitiated(): boolean {
    return this.isPending();
  }

  canBeCompleted(): boolean {
    return this.isInitiated();
  }

  equals(other: InvitationStatus | InvitationStatusEnum): boolean {
    if (typeof other === 'string') {
      return this.value === other;
    }
    return this.value === other.getValue();
  }
}

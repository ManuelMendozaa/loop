export type ProfileStatusEnum = 'in_progress' | 'completed';

export class ProfileStatus {
  private value: ProfileStatusEnum;

  private constructor(value: ProfileStatusEnum) {
    this.value = value;
  }

  static inProgress() {
    return new ProfileStatus('in_progress');
  }

  static completed() {
    return new ProfileStatus('completed');
  }

  static fromValue(value: ProfileStatusEnum): ProfileStatus {
    return new ProfileStatus(value);
  }

  getValue(): ProfileStatusEnum {
    return this.value;
  }

  equals(other: ProfileStatus | string): boolean {
    if (typeof other === 'string') {
      return this.value === other;
    }
    return this.value === other.getValue();
  }
}

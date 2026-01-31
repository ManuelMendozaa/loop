export type UserStatusEnum = 'registering' | 'active' | 'suspended';

export class UserStatus {
  private value: UserStatusEnum;

  private constructor(value: UserStatusEnum) {
    this.value = value;
  }

  static registering() {
    return new UserStatus('registering');
  }

  static active() {
    return new UserStatus('active');
  }

  static suspended() {
    return new UserStatus('suspended');
  }

  static fromValue(value: UserStatusEnum): UserStatus {
    return new UserStatus(value);
  }

  getValue(): UserStatusEnum {
    return this.value;
  }

  equals(other: UserStatus | string): boolean {
    if (typeof other === 'string') {
      return this.value === other;
    }
    return this.value === other.getValue();
  }
}

import { PasswordHasher } from '@/modules/invitation/application/ports/driven/PasswordHasher';

export class PasswordHasherMock implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return `hashed-${password}`;
  }
}

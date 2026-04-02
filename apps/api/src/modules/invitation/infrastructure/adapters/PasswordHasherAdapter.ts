import argon2 from 'argon2';
import { PasswordHasher } from '../../application/ports/driven/PasswordHasher';

const ROUNDS = 12;

export class PasswordHasherAdapter implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return argon2.hash(password, { timeCost: ROUNDS });
  }
}

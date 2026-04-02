import { randomBytes } from 'crypto';
import { TokenGenerator } from '../../application/ports/driven/TokenGenerator';

export class TokenGeneratorAdapter implements TokenGenerator {
  private readonly tokenLength: number;

  constructor(tokenLength: number = 32) {
    this.tokenLength = tokenLength;
  }

  generate(): string {
    return randomBytes(this.tokenLength).toString('hex');
  }
}

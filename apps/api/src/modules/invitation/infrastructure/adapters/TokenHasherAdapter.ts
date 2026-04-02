import { createHash, timingSafeEqual } from 'crypto';
import { TokenHasher } from '../../application/ports/driven/TokenHasher';

export class TokenHasherAdapter implements TokenHasher {
  hash(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  compare(token: string, hash: string): boolean {
    const tokenHash = this.hash(token);
    try {
      return timingSafeEqual(Buffer.from(tokenHash), Buffer.from(hash));
    } catch {
      return false;
    }
  }
}

import { TokenHasher } from '@/modules/invitation/application/ports/driven/TokenHasher';
import { testTokens } from './data';

export class TokenHasherMock implements TokenHasher {
  private hashMap: Map<string, string> = new Map([
    [testTokens.pendingRaw, testTokens.pendingHash],
    [testTokens.initiatedRaw, testTokens.initiatedHash],
    [testTokens.sessionRaw, testTokens.sessionHash],
    [testTokens.expiredRaw, testTokens.expiredHash],
    [testTokens.revokedRaw, testTokens.revokedHash],
    [testTokens.newToken, testTokens.newTokenHash],
  ]);

  hash(token: string): string {
    return this.hashMap.get(token) || `hash-${token}`;
  }

  compare(token: string, hash: string): boolean {
    return this.hash(token) === hash;
  }

  // Helper for tests
  addMapping(raw: string, hashed: string): void {
    this.hashMap.set(raw, hashed);
  }
}

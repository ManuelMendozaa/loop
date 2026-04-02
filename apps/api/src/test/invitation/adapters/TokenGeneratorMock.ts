import { TokenGenerator } from '@/modules/invitation/application/ports/driven/TokenGenerator';
import { testTokens } from './data';

export class TokenGeneratorMock implements TokenGenerator {
  private tokens: string[] = [testTokens.newToken];
  private index = 0;

  generate(): string {
    const token = this.tokens[this.index % this.tokens.length];
    this.index++;
    return token;
  }

  // Helper for tests
  setNextToken(token: string): void {
    this.tokens = [token];
    this.index = 0;
  }

  setTokenSequence(tokens: string[]): void {
    this.tokens = tokens;
    this.index = 0;
  }
}

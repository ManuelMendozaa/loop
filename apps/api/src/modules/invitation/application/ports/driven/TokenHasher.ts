export interface TokenHasher {
  hash(token: string): string;
  compare(token: string, hash: string): boolean;
}

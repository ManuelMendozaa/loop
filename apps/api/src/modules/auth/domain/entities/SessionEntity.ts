import { SessionContract } from '../contracts/SessionContract';

export class SessionEntity {
  public readonly id?: string;
  public readonly accessToken: string;
  public readonly refreshToken: string;
  public readonly userId: string;

  private constructor(input: SessionContract) {
    this.id = input.id;
    this.accessToken = input.accessToken;
    this.refreshToken = input.refreshToken;
    this.userId = input.userId;
  }

  static fromPersistence(input: SessionContract) {
    return new SessionEntity(input);
  }
}

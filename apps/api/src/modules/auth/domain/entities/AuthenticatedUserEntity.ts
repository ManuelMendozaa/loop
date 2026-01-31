import { CreateAuthenticatedUserContract } from '../contracts/CreateAuthenticatedUserContract';
import { Password } from '../value-objects/Password';

export class AuthenticatedUserEntity {
  public readonly id: string;
  public email: string;
  public password: Password;

  private constructor(input: CreateAuthenticatedUserContract) {
    this.id = input.id;
    this.email = input.email;
    this.password = Password.fromHash(input.password);
  }

  static fromPersistence(input: CreateAuthenticatedUserContract) {
    return new AuthenticatedUserEntity(input);
  }
}

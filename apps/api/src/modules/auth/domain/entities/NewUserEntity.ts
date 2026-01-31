import { CreateNewUserContract } from '../contracts/CreateNewUserContract';
import { Email } from '../value-objects/Email';
import { Password } from '../value-objects/Password';

export class NewUserEntity {
  public firstName: string;
  public lastName: string;
  public email: Email;
  public password: Password;

  private constructor(input: CreateNewUserContract) {
    this.firstName = input.firstName;
    this.lastName = input.lastName;
    this.email = Email.fromValue(input.email);
    this.password = Password.fromValue(input.password);
  }

  static create(input: CreateNewUserContract): NewUserEntity {
    return new NewUserEntity(input);
  }
}

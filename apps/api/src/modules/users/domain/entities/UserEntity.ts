import { UserStatus } from '../value-objects/Status';
import {
  CreateUserContract,
  ReconstituteUserContract,
  RegisterUserContract,
} from '../contracts/CreateUserContract';
import { ProfileEntity } from '../value-objects/Profile';

export class UserEntity {
  public readonly id?: string;
  public firstName?: string;
  public lastName?: string;
  public email: string;
  public slug?: string;
  public password?: string;
  public status: UserStatus;
  public profile?: ProfileEntity;

  private constructor(input: CreateUserContract) {
    this.id = input.type === 'reconstitute' ? input.id : undefined;
    this.firstName = input.firstName;
    this.lastName = input.lastName;
    this.email = input.email;
    this.slug = input.type === 'reconstitute' ? input.slug : undefined;
    this.password = input.password;
    this.status = UserStatus.fromValue(input.status);

    if (input.type === 'reconstitute' && input.profile) {
      this.profile = ProfileEntity.fromPersistence(input.profile);
    }
  }

  public static register(input: RegisterUserContract) {
    return new UserEntity({
      ...input,
      type: 'register',
      status: 'registering',
    });
  }

  public static fromPersistence(input: ReconstituteUserContract) {
    return new UserEntity({ ...input, type: 'reconstitute' });
  }
}

import { AuthenticatedUserEntity } from '@/modules/auth/domain/entities/AuthenticatedUserEntity';
import { UsersApplication } from '@/modules/users/application';

export class GetUserByEmailProxy {
  private userApplication: UsersApplication;
  constructor(userApplication: UsersApplication) {
    this.userApplication = userApplication;
  }

  public async execute(email: string) {
    const result = await this.userApplication.useCases.getByEmail.execute({
      email,
    });
    if (!result) return null;
    if (result.id === undefined || result.password === undefined) {
      throw new Error('Invalid user data from persistence');
    }

    return AuthenticatedUserEntity.fromPersistence({
      id: result.id,
      email: result.email,
      password: result.password,
    });
  }
}

import { AuthenticatedUserEntity } from '@/modules/auth/domain/entities/AuthenticatedUserEntity';
import { NewUserEntity } from '@/modules/auth/domain/entities/NewUserEntity';
import { UsersApplication } from '@/modules/users/application';

export class RegisterUserProxy {
  private userApplication: UsersApplication;
  constructor(userApplication: UsersApplication) {
    this.userApplication = userApplication;
  }

  public async execute(newUser: NewUserEntity) {
    const user = await this.userApplication.useCases.register.execute({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email.getValue(),
      password: newUser.password.getValue(),
    });

    if (!user || !user.id || !user.password) {
      throw new Error('Error registering user');
    }

    return AuthenticatedUserEntity.fromPersistence({
      id: user.id,
      email: user.email,
      password: user.password,
    });
  }
}

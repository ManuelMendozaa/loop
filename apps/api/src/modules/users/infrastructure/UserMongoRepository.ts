import { UserRepository } from '@/modules/users/application/ports/driven/UserRepository';
import { UserEntity } from '@/modules/users/domain/entities/UserEntity';

export class UserMongoRepository implements UserRepository {
  private users = [] as any[];
  private profiles = [] as any[];

  public async create(user: UserEntity) {
    // Index-like validation
    const existingUser = this.users.find(
      (u) => u.email === user.email && u.active
    );
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const userId = (this.users.length + 1).toString();
    const userData = {
      id: userId,
      email: user.email,
      firstName: user.firstName!,
      lastName: user.lastName!,
      status: user.status.getValue(),
      password: user.password!,
      active: true,
    };

    const profileData = {
      userId,
      bio: '',
      avatarUrl: '',
      status: 'in_progress' as const,
    };

    this.users.push(userData);
    this.profiles.push(profileData);
    return UserEntity.fromPersistence({ ...userData, profile: profileData });
  }

  public async getById(userId: string) {
    const user = this.users.find((u) => u.id === userId);
    if (!user) return null;
    if (!user.active) return null;

    const profile = this.profiles.find((p) => p.userId === userId);
    if (!profile) return null;

    return UserEntity.fromPersistence({ ...user, profile });
  }

  public async getByEmail(email: string) {
    const user = this.users.find((u) => u.email === email);
    if (!user) return null;
    if (!user.active) return null;

    const profile = this.profiles.find((p) => p.userId === user.id);
    if (!profile) return null;

    return UserEntity.fromPersistence({ ...user, profile });
  }

  public async suspend(userId: string) {
    const user = await this.getById(userId);
    if (!user) return null;

    const suspendedUser = { ...user, suspended: true };
    return suspendedUser;
  }

  public async update(user: UserEntity) {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index === -1) return null;

    this.users[index] = {
      ...this.users[index],
      firstName: user.firstName!,
      lastName: user.lastName!,
      email: user.email,
      status: user.status.getValue(),
    };

    if (!user.profile) {
      return UserEntity.fromPersistence({ ...this.users[index] });
    }

    const profileIndex = this.profiles.findIndex((p) => p.userId === user.id);
    if (profileIndex !== -1) {
      this.profiles[profileIndex] = {
        ...this.profiles[profileIndex],
        bio: user.profile.bio!,
        avatarUrl: user.profile.avatarUrl!,
        status: user.profile.status.getValue(),
      };
    }

    return UserEntity.fromPersistence({
      ...this.users[index],
      profile: this.profiles[profileIndex],
    });
  }

  public async delete(userId: string) {
    const index = this.users.findIndex((u) => u.id === userId);
    if (index === -1) return null;

    this.users[index].active = false;
    return UserEntity.fromPersistence({ ...this.users[index] });
  }
}

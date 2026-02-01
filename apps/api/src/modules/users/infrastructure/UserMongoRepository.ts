import { UserRepository } from '@/modules/users/application/ports/driven/UserRepository';
import { UserEntity } from '@/modules/users/domain/entities/UserEntity';
import { User, UserDocument } from './UserMongoModel';

export class UserMongoRepository implements UserRepository {
  public async create(input: UserEntity) {
    const user = await User.create({
      email: input.email,
      firstName: input.firstName!,
      lastName: input.lastName!,
      status: input.status.getValue(),
      password: input.password!,
      isDeleted: false,
    });

    return this.toEntity(user);
  }

  public async getById(userId: string) {
    const user = await User.findById(userId).where({ isDeleted: false });
    if (!user) return null;
    return this.toEntity(user);
  }

  public async getByEmail(email: string) {
    const user = await User.findOne({ email, isDeleted: false });
    if (!user) return null;
    return this.toEntity(user);
  }

  public async suspend(userId: string) {
    const user = await User.findOneAndUpdate(
      { _id: userId, isDeleted: false },
      { status: 'suspended', active: false },
      { new: true }
    );
    if (!user) return null;

    return this.toEntity(user);
  }

  public async update(input: UserEntity) {
    const user = await User.findOneAndUpdate(
      { _id: input.id, isDeleted: false },
      {
        firstName: input.firstName!,
        lastName: input.lastName!,
        email: input.email,
        status: input.status.getValue(),
        password: input.password,
      },
      { new: true }
    );
    if (!user) return null;

    return this.toEntity(user);
  }

  public async delete(userId: string) {
    const user = await User.findOneAndUpdate(
      { _id: userId, isDeleted: false },
      { active: false },
      { new: true }
    );
    if (!user) return null;

    return this.toEntity(user);
  }

  private toEntity(doc: UserDocument): UserEntity {
    return UserEntity.fromPersistence({
      ...doc.toObject(),
      id: doc._id.toString(),
    });
  }
}

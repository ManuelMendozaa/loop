import { UserEntity } from '../../../domain/entities/UserEntity';

export abstract class UserRepository {
  abstract create(data: UserEntity): Promise<UserEntity | null>;
  abstract getById(userId: string): Promise<UserEntity | null>;
  abstract getByEmail(email: string): Promise<UserEntity | null>;
  abstract suspend(userId: string): Promise<UserEntity | null>;
  abstract update(data: UserEntity): Promise<UserEntity | null>;
  abstract delete(userId: string): Promise<UserEntity | null>;
}

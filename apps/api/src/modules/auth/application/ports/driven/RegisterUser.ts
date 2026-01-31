import { AuthenticatedUserEntity } from '../../../domain/entities/AuthenticatedUserEntity';
import { NewUserEntity } from '../../../domain/entities/NewUserEntity';

export interface RegisterUser {
  execute(user: NewUserEntity): Promise<AuthenticatedUserEntity>;
}

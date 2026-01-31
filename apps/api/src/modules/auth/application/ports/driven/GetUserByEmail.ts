import { AuthenticatedUserEntity } from '../../../domain/entities/AuthenticatedUserEntity';

export interface GetUserByEmail {
  execute(email: string): Promise<AuthenticatedUserEntity | null>;
}

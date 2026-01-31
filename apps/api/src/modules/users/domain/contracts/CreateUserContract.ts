import { ProfileEntityContract } from '../value-objects/Profile';
import { UserStatusEnum } from '../value-objects/Status';

export interface RegisterUserContract {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ReconstituteUserContract {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: UserStatusEnum;
  profile?: ProfileEntityContract;
}

export type CreateUserContract =
  | (RegisterUserContract & { type: 'register'; status: 'registering' })
  | (ReconstituteUserContract & { type: 'reconstitute' });

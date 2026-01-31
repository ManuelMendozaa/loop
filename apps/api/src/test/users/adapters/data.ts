import { ProfileStatusEnum } from '@/modules/users/domain/value-objects/ProfileStatus';
import { UserStatusEnum } from '@/modules/users/domain/value-objects/Status';

export const users = [
  {
    id: '1',
    email: 'johndoe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    status: 'active' as UserStatusEnum,
    password: 'hashedpassword123',
    active: true,
  },
  {
    id: '2',
    email: 'janedoe@example.com',
    firstName: 'Jane',
    lastName: 'Doe',
    status: 'suspended' as UserStatusEnum,
    password: 'hashedpassword456',
    active: true,
  },
];

export const profiles = [
  {
    userId: '1',
    bio: 'Hello, I am John Doe.',
    avatarUrl: 'http://example.com/john.jpg',
    status: 'completed' as ProfileStatusEnum,
  },
  {
    userId: '2',
    bio: 'Hello, I am Jane Doe.',
    avatarUrl: 'http://example.com/jane.jpg',
    status: 'completed' as ProfileStatusEnum,
  },
];

import { UsersApplication } from '@/modules/users/application';
import { UserLocalRepository } from './adapters/UserLocalRepository';
import { users } from './adapters/data';

describe('Users Application', () => {
  let usersApplication: UsersApplication;

  beforeAll(() => {
    const userRepository = new UserLocalRepository();
    usersApplication = new UsersApplication({ userRepository });
  });

  test('GetUserByEmail: existing email', async () => {
    const email = users[0].email;
    const user = await usersApplication.useCases.getByEmail.execute({ email });

    expect(user).not.toBeNull();
    expect(user?.email).toBe(email);
  });

  test('GetUserByEmail: non-existing email', async () => {
    const email = 'nonexistent@example.com';
    const user = await usersApplication.useCases.getByEmail.execute({ email });

    expect(user).toBeNull();
  });

  test('GetUserById: existing id', async () => {
    const id = users[0].id;
    const user = await usersApplication.useCases.getById.execute({ id });

    expect(user).not.toBeNull();
    expect(user?.id).toBe(id);
  });

  test('GetUserById: non-existing id', async () => {
    const id = '10';
    const user = await usersApplication.useCases.getById.execute({ id });

    expect(user).toBeNull();
  });

  test('RegisterUser: available email', async () => {
    const userData = {
      firstName: 'New',
      lastName: 'User',
      email: 'newuser@example.com',
      password: 'password123',
    };

    const user = await usersApplication.useCases.register.execute(userData);

    expect(user).not.toBeNull();
    expect(user?.id).toBeDefined();
    expect(user?.email).toBe(userData.email);
    expect(user?.profile?.status.getValue()).toBe('in_progress');
  });

  test('RegisterUser: unavailable email', async () => {
    let error = null;

    try {
      const userData = {
        firstName: 'New',
        lastName: 'User',
        email: users[0].email,
        password: 'password123',
      };

      await usersApplication.useCases.register.execute(userData);
    } catch (err) {
      error = err;
    }

    expect(error).not.toBeNull();
  });
});

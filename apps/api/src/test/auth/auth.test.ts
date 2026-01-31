import { UsersApplication } from '@/modules/users/application';
import { AuthApplication } from '@/modules/auth/application';
import { UserLocalRepository } from '../users/adapters/UserLocalRepository';
import { GetUserByEmailProxy } from './adapters/GetUserByEmailProxy';
import { RegisterUserProxy } from './adapters/RegisterUserProxy';
import { TokenHandlerAdapter } from './adapters/TokenHandlerAdapter';
import { SessionAmazingDBRepository } from './adapters/SessionAmazingDBRepository';
import { users } from '../users/adapters/data';

describe('Users Application', () => {
  let authApplication: AuthApplication;

  beforeAll(() => {
    const userRepository = new UserLocalRepository();
    const sessionRepository = new SessionAmazingDBRepository();

    const usersApplication = new UsersApplication({ userRepository });
    const getUserByEmailProxy = new GetUserByEmailProxy(usersApplication);
    const registerUserProxy = new RegisterUserProxy(usersApplication);

    authApplication = new AuthApplication({
      getUserByEmail: getUserByEmailProxy,
      registerUser: registerUserProxy,
      tokenHandler: TokenHandlerAdapter,
      sessionRepository,
    });
  });

  test('SignIn: valid credentials', async () => {
    const email = users[0].email;
    const password = users[0].password;
    const authResult = await authApplication.useCases.signIn.execute({
      email,
      password,
    });

    expect(authResult).not.toBeNull();
    expect(authResult.user.email).toBe(email);
    expect(authResult.session).toBeDefined();
    expect(authResult.session.accessToken).toBeDefined();
    expect(authResult.session.refreshToken).toBeDefined();
  });

  test('SignIn: invalid credentials', async () => {
    const email = users[0].email;
    const password = 'amazingly-wrong-password';

    const promise = authApplication.useCases.signIn.execute({
      email,
      password,
    });

    await promise.catch((err) => {
      expect(err).toBeDefined();
      expect(err.message).toBe('Invalid credentials'); // TODO: Improve this along with error handling
    });
  });

  test('SignUp: available email, secure password', async () => {
    const firstName = 'Larry';
    const lastName = 'Larson';
    const email = 'totally-available-email@example.com';
    const password = '@ma4ingl1-$3cURe#p4ssw0rd';

    const response = await authApplication.useCases.signUp.execute({
      firstName,
      lastName,
      email,
      password,
    });

    expect(response).not.toBeNull();
    expect(response.user).toBeDefined();
    expect(response.user.email).toBe(email);
    expect(response.session).toBeDefined();
    expect(response.session.accessToken).toBeDefined();
    expect(response.session.refreshToken).toBeDefined();
  });

  test('SignUp: available email, unsecure password', async () => {
    const firstName = 'Larry';
    const lastName = 'McLarson';
    const email = 'totally-available-email2@example.com';
    const password = 'amazingly-secure-password';

    const promise = authApplication.useCases.signUp.execute({
      firstName,
      lastName,
      email,
      password,
    });

    await promise.catch((err) => {
      expect(err).toBeDefined();
      expect(err.message).toBe('Unsecure password'); // TODO: Improve this along with error handling
    });
  });

  test('SignUp: unavailable email', async () => {
    const firstName = 'Larry';
    const lastName = 'McLarson';
    const email = users[0].email;
    const password = 'whatever-larry-is-not-signing-up-either-way';

    const promise = authApplication.useCases.signUp.execute({
      firstName,
      lastName,
      email,
      password,
    });

    await promise.catch((err) => {
      expect(err).toBeDefined();
      expect(err.message).toBe('Email not available'); // TODO: Improve this along with error handling
    });
  });
});

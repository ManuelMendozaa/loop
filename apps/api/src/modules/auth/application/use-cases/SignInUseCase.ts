import { UseCase } from '@/shared/UseCase';
import { InvalidCredentialsError } from '../../domain/errors/InvalidCredentialsError';
import { GetUserByEmail } from '../ports/driven/GetUserByEmail';
import { SignInContract } from '../ports/driving/SignIn';
import { TokenHandler } from '../ports/driven/TokenHandler';
import { SessionRepository } from '../ports/driven/SessionRepository';

export class SignInUseCase implements UseCase {
  private readonly getUserByEmail: GetUserByEmail;
  private readonly tokenHandler: TokenHandler;
  private readonly sessionRepository: SessionRepository;

  public constructor(
    getUserByEmail: GetUserByEmail,
    tokenHandler: TokenHandler,
    sessionRepository: SessionRepository,
  ) {
    this.getUserByEmail = getUserByEmail;
    this.tokenHandler = tokenHandler;
    this.sessionRepository = sessionRepository;
  }

  async execute(input: SignInContract) {
    const user = await this.getUserByEmail.execute(input.email);
    if (!user) throw new InvalidCredentialsError();

    if (!user.password.equals(input.password)) {
      throw new InvalidCredentialsError();
    }

    const tokens = this.tokenHandler.issueTokens(user.id);
    const session = await this.sessionRepository.create(user.id, tokens);

    return { user, session };
  }
}

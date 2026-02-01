import { UseCase } from '@/shared/UseCase';
import { NewUserEntity } from '../../domain/entities/NewUserEntity';
import { GetUserByEmail } from '../ports/driven/GetUserByEmail';
import { RegisterUser } from '../ports/driven/RegisterUser';
import { TokenHandler } from '../ports/driven/TokenHandler';
import { SignUpContract } from '../ports/driving/SignUp';
import { SessionRepository } from '../ports/driven/SessionRepository';
import { ExceptionThrower } from '@/shared/ExceptionThrower';

export class SignUpUseCase implements UseCase {
  private readonly getUserByEmail: GetUserByEmail;
  private readonly registerUser: RegisterUser;
  private readonly tokenHandler: TokenHandler;
  private readonly sessionRepository: SessionRepository;
  private readonly exceptionThrower: ExceptionThrower;

  public constructor(
    getUserByEmail: GetUserByEmail,
    registerUser: RegisterUser,
    tokenHandler: TokenHandler,
    sessionRepository: SessionRepository,
    exceptionThrower: ExceptionThrower
  ) {
    this.getUserByEmail = getUserByEmail;
    this.registerUser = registerUser;
    this.tokenHandler = tokenHandler;
    this.sessionRepository = sessionRepository;
    this.exceptionThrower = exceptionThrower;
  }

  async execute(input: SignUpContract) {
    const conflictUser = await this.getUserByEmail.execute(input.email);
    if (conflictUser) this.exceptionThrower.throw('registered-email');

    const newUser = NewUserEntity.create(input);
    const user = await this.registerUser.execute(newUser);

    const tokens = this.tokenHandler.issueTokens(user.id);
    const session = await this.sessionRepository.create(user.id, tokens);

    return { user, session };
  }
}

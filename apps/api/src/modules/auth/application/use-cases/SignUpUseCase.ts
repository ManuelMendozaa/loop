import { UseCase } from '@/shared/UseCase';
import { NewUserEntity } from '../../domain/entities/NewUserEntity';
import { GetUserByEmail } from '../ports/driven/GetUserByEmail';
import { RegisterUser } from '../ports/driven/RegisterUser';
import { TokenHandler } from '../ports/driven/TokenHandler';
import { SignUpContract } from '../ports/driving/SignUp';
import { SessionRepository } from '../ports/driven/SessionRepository';

export class SignUpUseCase implements UseCase {
  private readonly getUserByEmail: GetUserByEmail;
  private readonly registerUser: RegisterUser;
  private readonly tokenHandler: TokenHandler;
  private readonly sessionRepository: SessionRepository;

  public constructor(
    getUserByEmail: GetUserByEmail,
    registerUser: RegisterUser,
    tokenHandler: TokenHandler,
    sessionRepository: SessionRepository
  ) {
    this.getUserByEmail = getUserByEmail;
    this.registerUser = registerUser;
    this.tokenHandler = tokenHandler;
    this.sessionRepository = sessionRepository;
  }

  async execute(input: SignUpContract) {
    const conflictUser = await this.getUserByEmail.execute(input.email);
    if (conflictUser) throw new Error('Email not available');

    const newUser = NewUserEntity.create(input);
    const user = await this.registerUser.execute(newUser);

    const tokens = this.tokenHandler.issueTokens(user.id);
    const session = await this.sessionRepository.create(user.id, tokens);

    return { user, session };
  }
}

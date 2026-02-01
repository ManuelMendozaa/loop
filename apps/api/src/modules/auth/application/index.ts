import { SessionRepository } from './ports/driven/SessionRepository';
import { GetUserByEmail } from './ports/driven/GetUserByEmail';
import { RegisterUser } from './ports/driven/RegisterUser';
import { SignUpUseCase } from './use-cases/SignUpUseCase';
import { SignInUseCase } from './use-cases/SignInUseCase';
import { TokenHandler } from './ports/driven/TokenHandler';
import { ExceptionThrower } from '@/shared/ExceptionThrower';

interface UseCases {
  signUp: SignUpUseCase;
  signIn: SignInUseCase;
}

interface Adapters {
  registerUser: RegisterUser;
  getUserByEmail: GetUserByEmail;
  tokenHandler: TokenHandler;
  sessionRepository: SessionRepository;
  exceptionThrower: ExceptionThrower;
}

export class AuthApplication {
  public useCases: UseCases;

  constructor(adapters: Adapters) {
    this.useCases = {
      signUp: new SignUpUseCase(
        adapters.getUserByEmail,
        adapters.registerUser,
        adapters.tokenHandler,
        adapters.sessionRepository,
        adapters.exceptionThrower
      ),
      signIn: new SignInUseCase(
        adapters.getUserByEmail,
        adapters.tokenHandler,
        adapters.sessionRepository,
        adapters.exceptionThrower
      ),
    };
  }
}

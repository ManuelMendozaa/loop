import { UserRepository } from './ports/driven/UserRepository';
import { GetUserByEmailUseCase } from './use-cases/GetUserByEmailUseCase';
import { GetUserByIdUseCase } from './use-cases/GetUserByIdUseCase';
import { RegisterUserUseCase } from './use-cases/RegisterUserUseCase';

interface UseCases {
  register: RegisterUserUseCase;
  getById: GetUserByIdUseCase;
  getByEmail: GetUserByEmailUseCase;
}

interface Adapters {
  userRepository: UserRepository;
}

export class UsersApplication {
  public useCases: UseCases;

  constructor(adapters: Adapters) {
    this.useCases = {
      register: new RegisterUserUseCase(adapters.userRepository),
      getById: new GetUserByIdUseCase(adapters.userRepository),
      getByEmail: new GetUserByEmailUseCase(adapters.userRepository),
    };
  }
}

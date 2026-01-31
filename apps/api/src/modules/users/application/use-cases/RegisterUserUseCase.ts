import { UseCase } from '@/shared/UseCase';
import { UserEntity } from '../../domain/entities/UserEntity';
import { RegisterUserPortContract } from '../ports/driving/RegisterUserPort';
import { UserRepository } from '../ports/driven/UserRepository';

export class RegisterUserUseCase implements UseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(input: RegisterUserPortContract) {
    const user = UserEntity.register(input);
    const createdUser = await this.userRepository.create(user);
    return createdUser;
  }
}

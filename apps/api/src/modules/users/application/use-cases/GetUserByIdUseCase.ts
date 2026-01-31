import { UseCase } from '@/shared/UseCase';
import { UserRepository } from '../ports/driven/UserRepository';
import { GetUserByIdPortContract } from '../ports/driving/GetUserById';

export class GetUserByIdUseCase implements UseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(input: GetUserByIdPortContract) {
    const user = await this.userRepository.getById(input.id);
    return user;
  }
}

import { UseCase } from '@/shared/UseCase';
import { UserRepository } from '../ports/driven/UserRepository';
import { GetUserByEmailPortContract } from '../ports/driving/GetUserByEmail';

export class GetUserByEmailUseCase implements UseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(input: GetUserByEmailPortContract) {
    const user = await this.userRepository.getByEmail(input.email);
    return user;
  }
}

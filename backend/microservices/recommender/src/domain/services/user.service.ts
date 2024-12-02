import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository.interface';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}

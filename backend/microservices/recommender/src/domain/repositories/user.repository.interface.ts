import { User } from '../models/user.model';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
}

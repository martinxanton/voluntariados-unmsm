import { User } from '../../../domain/models/user.model';
import { IUserRepository } from '../../../domain/repositories/user.repository.interface';

export class MockStudentRepository implements IUserRepository {
  private students: User[] = [
    new User(1, 'Medicina', 21),
    new User(2, 'Ingeniería de Software', 18),
  ];

  constructor() {}

  findById(id: number): Promise<User | null> {
    const student = this.students.find((s) => s.id === id);
    return Promise.resolve(student);
  }
}

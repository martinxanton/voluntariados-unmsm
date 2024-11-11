import { Student } from 'src/domain/models/student.model';
import { IStudentRepository } from 'src/domain/repositories/student.repository.interface';

export class MockStudentRepository implements IStudentRepository {
  private students: Student[] = [
    new Student(1, 'Medicina', 21),
    new Student(2, 'Ingeniería de Software', 18),
  ];

  constructor() {}

  findById(id: number): Promise<Student | null> {
    const student = this.students.find((s) => s.id === id);
    return Promise.resolve(student);
  }
}
